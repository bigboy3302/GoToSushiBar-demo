// One-off setup script: adds the schema the admin panel needs on top of the
// existing menu_items table — an image_url column, a site_media table for
// fixed named photo slots, and draft "shadow" copies of both that the admin
// panel edits freely (publishing copies draft -> published in one transaction).
// Safe to re-run.
//
// Usage: npx tsx scripts/admin-schema-setup.ts

import { requireSetupEnv, hasuraEndpoints, runSql, runMetadata } from "../lib/nhost/hasuraAdmin";

const { subdomain, region, adminSecret } = requireSetupEnv();
const { sql: SQL_ENDPOINT, metadata: METADATA_ENDPOINT } = hasuraEndpoints(subdomain, region);

const GALLERY_SLOTS = Array.from({ length: 8 }, (_, i) => `gallery_${i + 1}`);
const FIXED_SLOTS = ["hero_bg", "about_photo", ...GALLERY_SLOTS];

async function main() {
  console.log(`Setting up admin-panel schema on ${subdomain}.${region}...\n`);

  await runSql(
    SQL_ENDPOINT,
    adminSecret,
    `ALTER TABLE public.menu_items ADD COLUMN IF NOT EXISTS image_url text;`,
    "add menu_items.image_url"
  );

  await runSql(
    SQL_ENDPOINT,
    adminSecret,
    `
    CREATE TABLE IF NOT EXISTS public.site_media (
      slot_key text PRIMARY KEY,
      image_url text,
      alt_lv text,
      alt_en text,
      updated_at timestamptz NOT NULL DEFAULT now()
    );
    `,
    "create table public.site_media"
  );

  await runSql(
    SQL_ENDPOINT,
    adminSecret,
    `CREATE TABLE IF NOT EXISTS public.menu_items_draft (LIKE public.menu_items INCLUDING ALL);`,
    "create table public.menu_items_draft"
  );

  await runSql(
    SQL_ENDPOINT,
    adminSecret,
    `CREATE TABLE IF NOT EXISTS public.site_media_draft (LIKE public.site_media INCLUDING ALL);`,
    "create table public.site_media_draft"
  );

  const slotValues = FIXED_SLOTS.map((key) => `('${key}')`).join(", ");
  await runSql(
    SQL_ENDPOINT,
    adminSecret,
    `INSERT INTO public.site_media (slot_key) VALUES ${slotValues} ON CONFLICT (slot_key) DO NOTHING;`,
    `seed ${FIXED_SLOTS.length} site_media slot rows`
  );

  await runSql(
    SQL_ENDPOINT,
    adminSecret,
    `INSERT INTO public.menu_items_draft SELECT * FROM public.menu_items ON CONFLICT (id) DO NOTHING;`,
    "seed menu_items_draft from menu_items"
  );

  await runSql(
    SQL_ENDPOINT,
    adminSecret,
    `INSERT INTO public.site_media_draft SELECT * FROM public.site_media ON CONFLICT (slot_key) DO NOTHING;`,
    "seed site_media_draft from site_media"
  );

  // Track + public-read site_media (mirrors the existing menu_items grant).
  await runMetadata(
    METADATA_ENDPOINT,
    adminSecret,
    { type: "pg_track_table", args: { source: "default", table: { schema: "public", name: "site_media" } } },
    "track site_media in Hasura"
  );
  await runMetadata(
    METADATA_ENDPOINT,
    adminSecret,
    {
      type: "pg_create_select_permission",
      args: {
        source: "default",
        table: { schema: "public", name: "site_media" },
        role: "public",
        permission: { columns: "*", filter: {}, allow_aggregations: false },
      },
    },
    "grant public read access on site_media"
  );

  // Track the draft tables too, but grant NO role any permission on them —
  // Hasura default-denies, so they stay invisible to anonymous/public GraphQL
  // queries. Only the admin-secret path (used by server actions) can read/write them.
  await runMetadata(
    METADATA_ENDPOINT,
    adminSecret,
    { type: "pg_track_table", args: { source: "default", table: { schema: "public", name: "menu_items_draft" } } },
    "track menu_items_draft in Hasura"
  );
  await runMetadata(
    METADATA_ENDPOINT,
    adminSecret,
    { type: "pg_track_table", args: { source: "default", table: { schema: "public", name: "site_media_draft" } } },
    "track site_media_draft in Hasura"
  );

  // storage.files: public read (so <img> tags work without auth), no write
  // permission for any browser-facing role — all writes go through server
  // code using the admin secret directly.
  await runMetadata(
    METADATA_ENDPOINT,
    adminSecret,
    { type: "pg_track_table", args: { source: "default", table: { schema: "storage", name: "files" } } },
    "track storage.files in Hasura"
  );
  await runMetadata(
    METADATA_ENDPOINT,
    adminSecret,
    {
      type: "pg_create_select_permission",
      args: {
        source: "default",
        table: { schema: "storage", name: "files" },
        role: "public",
        permission: { columns: "*", filter: {}, allow_aggregations: false },
      },
    },
    "grant public read access on storage.files"
  );

  console.log("\nDone.");
}

main();
