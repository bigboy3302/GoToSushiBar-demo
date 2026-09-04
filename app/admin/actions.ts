"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { verifyAdminSession } from "@/lib/nhost/adminSession";
import { getAdminNhostClient } from "@/lib/nhost/adminClient";
import type { MenuCategory } from "@/lib/nhost/getMenu";

export type ActionResult = { ok: true } | { ok: false; error: string };

async function requireAdmin(): Promise<ActionResult | null> {
  const session = await verifyAdminSession();
  if (!session) return { ok: false, error: "Nepieciešama pieteikšanās." };
  return null;
}

function graphqlError(res: { body: { errors?: { message: string }[] } }): string | null {
  return res.body.errors?.length ? res.body.errors[0].message : null;
}

// ---------- Site media (fixed photo slots) ----------

export async function upsertSiteMediaSlot(input: {
  slotKey: string;
  imageUrl: string | null;
  altLv?: string | null;
  altEn?: string | null;
}): Promise<ActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const nhost = getAdminNhostClient();
  const res = await nhost.graphql.request({
    query: `
      mutation UpsertSiteMediaDraft($slot_key: String!, $image_url: String, $alt_lv: String, $alt_en: String, $updated_at: timestamptz!) {
        insert_site_media_draft_one(
          object: { slot_key: $slot_key, image_url: $image_url, alt_lv: $alt_lv, alt_en: $alt_en, updated_at: $updated_at }
          on_conflict: { constraint: site_media_draft_pkey, update_columns: [image_url, alt_lv, alt_en, updated_at] }
        ) {
          slot_key
        }
      }
    `,
    variables: {
      slot_key: input.slotKey,
      image_url: input.imageUrl,
      alt_lv: input.altLv ?? null,
      alt_en: input.altEn ?? null,
      updated_at: new Date().toISOString(),
    },
  });

  const error = graphqlError(res);
  if (error) return { ok: false, error };
  revalidatePath("/admin");
  revalidatePath("/admin/preview");
  return { ok: true };
}

// ---------- Menu items (draft) ----------

export type MenuItemInput = {
  category: MenuCategory;
  subcategory_lv: string;
  subcategory_en: string;
  name_lv: string;
  name_en: string;
  description_lv: string | null;
  description_en: string | null;
  unit_lv: string | null;
  unit_en: string | null;
  price: number;
  sort_order: number;
  image_url: string | null;
};

export async function createMenuItem(input: MenuItemInput): Promise<ActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const nhost = getAdminNhostClient();
  const res = await nhost.graphql.request({
    query: `
      mutation CreateMenuItemDraft($object: menu_items_draft_insert_input!) {
        insert_menu_items_draft_one(object: $object) { id }
      }
    `,
    variables: { object: input },
  });

  const error = graphqlError(res);
  if (error) return { ok: false, error };
  revalidatePath("/admin/menu");
  revalidatePath("/admin/preview");
  return { ok: true };
}

export async function updateMenuItem(id: string, input: Partial<MenuItemInput>): Promise<ActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const nhost = getAdminNhostClient();
  const res = await nhost.graphql.request({
    query: `
      mutation UpdateMenuItemDraft($id: uuid!, $changes: menu_items_draft_set_input!) {
        update_menu_items_draft_by_pk(pk_columns: { id: $id }, _set: $changes) { id }
      }
    `,
    variables: { id, changes: input },
  });

  const error = graphqlError(res);
  if (error) return { ok: false, error };
  revalidatePath("/admin/menu");
  revalidatePath("/admin/preview");
  return { ok: true };
}

export async function deleteMenuItem(id: string): Promise<ActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const nhost = getAdminNhostClient();
  const res = await nhost.graphql.request({
    query: `
      mutation DeleteMenuItemDraft($id: uuid!) {
        delete_menu_items_draft_by_pk(id: $id) { id }
      }
    `,
    variables: { id },
  });

  const error = graphqlError(res);
  if (error) return { ok: false, error };
  revalidatePath("/admin/menu");
  revalidatePath("/admin/preview");
  return { ok: true };
}

// ---------- Publish (draft -> published, one transaction) ----------

type DraftMenuRow = MenuItemInput & { id: string };
type DraftSiteMediaRow = { slot_key: string; image_url: string | null; alt_lv: string | null; alt_en: string | null };

export async function publishChanges(): Promise<ActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const nhost = getAdminNhostClient();

  const draftRes = await nhost.graphql.request<{
    menu_items_draft: DraftMenuRow[];
    site_media_draft: DraftSiteMediaRow[];
  }>(
    {
      query: `
        query DraftSnapshot {
          menu_items_draft {
            id category subcategory_lv subcategory_en name_lv name_en
            description_lv description_en unit_lv unit_en price sort_order image_url
          }
          site_media_draft { slot_key image_url alt_lv alt_en }
        }
      `,
    },
    { cache: "no-store" }
  );

  const draftError = graphqlError(draftRes);
  if (draftError) return { ok: false, error: draftError };

  const menuItems = draftRes.body.data?.menu_items_draft ?? [];
  const mediaItems = draftRes.body.data?.site_media_draft ?? [];

  const publishRes = await nhost.graphql.request({
    query: `
      mutation Publish($menuItems: [menu_items_insert_input!]!, $mediaItems: [site_media_insert_input!]!) {
        delete_menu_items(where: {}) { affected_rows }
        insert_menu_items(objects: $menuItems) { affected_rows }
        delete_site_media(where: {}) { affected_rows }
        insert_site_media(objects: $mediaItems) { affected_rows }
      }
    `,
    variables: { menuItems, mediaItems },
  });

  const publishError = graphqlError(publishRes);
  if (publishError) return { ok: false, error: publishError };

  revalidateTag("menu");
  revalidateTag("site-media");
  revalidatePath("/");
  revalidatePath("/menu");
  revalidatePath("/about");
  revalidatePath("/experience");
  revalidatePath("/location");
  revalidatePath("/admin");
  revalidatePath("/admin/preview");

  return { ok: true };
}
