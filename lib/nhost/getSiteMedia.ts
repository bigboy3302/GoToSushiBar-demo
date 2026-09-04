import { getAdminNhostClient } from "./adminClient";

export type SiteMediaSlot = {
  slot_key: string;
  image_url: string | null;
  alt_lv: string | null;
  alt_en: string | null;
};

export type SiteMedia = Record<string, SiteMediaSlot>;

const FIELDS = `slot_key image_url alt_lv alt_en`;

function bySlot(rows: SiteMediaSlot[]): SiteMedia {
  const out: SiteMedia = {};
  for (const row of rows) out[row.slot_key] = row;
  return out;
}

export async function getSiteMedia(mode: "draft" | "published" = "published"): Promise<SiteMedia> {
  if (mode === "draft") return getDraftSiteMedia();

  const endpoint = process.env.NHOST_GRAPHQL_URL;
  if (!endpoint) return {};

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ query: `query SiteMedia { site_media { ${FIELDS} } }` }),
      next: { revalidate: 60, tags: ["site-media"] },
    });
    if (!res.ok) return {};
    const json = await res.json();
    const rows: SiteMediaSlot[] = json?.data?.site_media ?? [];
    return bySlot(rows);
  } catch {
    return {};
  }
}

async function getDraftSiteMedia(): Promise<SiteMedia> {
  try {
    const nhost = getAdminNhostClient();
    const res = await nhost.graphql.request<{ site_media_draft: SiteMediaSlot[] }>(
      { query: `query SiteMediaDraft { site_media_draft { ${FIELDS} } }` },
      { cache: "no-store" }
    );
    return bySlot(res.body?.data?.site_media_draft ?? []);
  } catch {
    return {};
  }
}
