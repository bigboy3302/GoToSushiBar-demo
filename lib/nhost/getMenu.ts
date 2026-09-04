import { getAdminNhostClient } from "./adminClient";

export type MenuCategory = "sushi" | "food" | "drinks";

export type MenuItemRow = {
  id: string;
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

export type MenuSubcategory = {
  subcategory_lv: string;
  subcategory_en: string;
  items: MenuItemRow[];
};

export type GroupedMenu = Record<MenuCategory, MenuSubcategory[]>;

const FIELDS = `
  id
  category
  subcategory_lv
  subcategory_en
  name_lv
  name_en
  description_lv
  description_en
  unit_lv
  unit_en
  price
  sort_order
  image_url
`;

const PUBLISHED_QUERY = `
  query MenuItems {
    menu_items(order_by: [{ category: asc }, { sort_order: asc }]) {
      ${FIELDS}
    }
  }
`;

function emptyMenu(): GroupedMenu {
  return { sushi: [], food: [], drinks: [] };
}

export async function getMenu(mode: "draft" | "published" = "published"): Promise<GroupedMenu> {
  if (mode === "draft") return getDraftMenu();

  const endpoint = process.env.NHOST_GRAPHQL_URL;
  if (!endpoint) return emptyMenu();

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ query: PUBLISHED_QUERY }),
      next: { revalidate: 60, tags: ["menu"] },
    });

    if (!res.ok) return emptyMenu();

    const json = await res.json();
    const rows: MenuItemRow[] = json?.data?.menu_items ?? [];
    return groupByCategory(rows);
  } catch {
    return emptyMenu();
  }
}

async function getDraftMenu(): Promise<GroupedMenu> {
  try {
    const nhost = getAdminNhostClient();
    const res = await nhost.graphql.request<{ menu_items_draft: MenuItemRow[] }>(
      {
        query: `
          query MenuItemsDraft {
            menu_items_draft(order_by: [{ category: asc }, { sort_order: asc }]) {
              ${FIELDS}
            }
          }
        `,
      },
      { cache: "no-store" }
    );
    const rows = res.body?.data?.menu_items_draft ?? [];
    return groupByCategory(rows);
  } catch {
    return emptyMenu();
  }
}

function groupByCategory(rows: MenuItemRow[]): GroupedMenu {
  const grouped = emptyMenu();

  for (const row of rows) {
    const bucket = grouped[row.category];
    if (!bucket) continue;
    let sub = bucket.find((s) => s.subcategory_lv === row.subcategory_lv);
    if (!sub) {
      sub = { subcategory_lv: row.subcategory_lv, subcategory_en: row.subcategory_en, items: [] };
      bucket.push(sub);
    }
    sub.items.push(row);
  }

  return grouped;
}
