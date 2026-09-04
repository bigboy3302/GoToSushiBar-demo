// One-off setup script: creates the menu_items table on the client's Nhost project,
// tracks it in Hasura, grants public (anonymous) read access, and loads the transcribed
// menu from seed-data.ts. Safe to re-run — table/permission creation is idempotent and
// existing rows are replaced (truncate + re-insert) rather than duplicated.
//
// Usage: npm run db:setup
// Requires a .env.local (gitignored, never commit it) with:
//   NHOST_SUBDOMAIN=xdyttnhegqcopywhsqtk
//   NHOST_REGION=eu-central-1
//   NHOST_ADMIN_SECRET=<the real secret from the Nhost dashboard>

import { seedData, type SeedItem } from "./seed-data";
import { requireSetupEnv, hasuraEndpoints, runSql, runMetadata, sqlStr, sqlNum } from "../lib/nhost/hasuraAdmin";

const { subdomain, region, adminSecret } = requireSetupEnv();
const { sql: SQL_ENDPOINT, metadata: METADATA_ENDPOINT, graphql: GRAPHQL_ENDPOINT } = hasuraEndpoints(
  subdomain,
  region
);

async function main() {
  console.log(`Setting up menu_items on ${subdomain}.${region}...\n`);

  await runSql(
    SQL_ENDPOINT,
    adminSecret,
    `
    CREATE EXTENSION IF NOT EXISTS pgcrypto;

    CREATE TABLE IF NOT EXISTS public.menu_items (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      category text NOT NULL,
      subcategory_lv text NOT NULL,
      subcategory_en text NOT NULL,
      name_lv text NOT NULL,
      name_en text NOT NULL,
      description_lv text,
      description_en text,
      unit_lv text,
      unit_en text,
      price numeric(6,2) NOT NULL,
      sort_order integer NOT NULL DEFAULT 0,
      created_at timestamptz NOT NULL DEFAULT now()
    );
    `,
    "create table public.menu_items"
  );

  await runMetadata(
    METADATA_ENDPOINT,
    adminSecret,
    {
      type: "pg_track_table",
      args: { source: "default", table: { schema: "public", name: "menu_items" } },
    },
    "track menu_items in Hasura"
  );

  await runMetadata(
    METADATA_ENDPOINT,
    adminSecret,
    {
      type: "pg_create_select_permission",
      args: {
        source: "default",
        table: { schema: "public", name: "menu_items" },
        role: "public",
        permission: { columns: "*", filter: {}, allow_aggregations: false },
      },
    },
    "grant public read access"
  );

  const rows = seedData as SeedItem[];
  const values = rows
    .map(
      (r) =>
        `(${sqlStr(r.category)}, ${sqlStr(r.subcategory_lv)}, ${sqlStr(r.subcategory_en)}, ` +
        `${sqlStr(r.name_lv)}, ${sqlStr(r.name_en)}, ${sqlStr(r.description_lv)}, ${sqlStr(r.description_en)}, ` +
        `${sqlStr(r.unit_lv)}, ${sqlStr(r.unit_en)}, ${sqlNum(r.price)}, ${r.sort_order})`
    )
    .join(",\n");

  await runSql(SQL_ENDPOINT, adminSecret, `TRUNCATE public.menu_items;`, "clear existing rows");

  await runSql(
    SQL_ENDPOINT,
    adminSecret,
    `
    INSERT INTO public.menu_items
      (category, subcategory_lv, subcategory_en, name_lv, name_en, description_lv, description_en, unit_lv, unit_en, price, sort_order)
    VALUES
    ${values};
    `,
    `insert ${rows.length} menu rows`
  );

  // Sanity check via the same GraphQL endpoint the site will query at runtime.
  const check = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json", "x-hasura-admin-secret": adminSecret },
    body: JSON.stringify({ query: "query { menu_items_aggregate { aggregate { count } } }" }),
  }).then((r) => r.json());
  console.log(`\n✓ Verified via GraphQL: ${check?.data?.menu_items_aggregate?.aggregate?.count ?? "?"} rows in menu_items`);

  const flagged = rows.filter((r) => r.verify);
  if (flagged.length) {
    console.log(`\n${flagged.length} row(s) worth a human double-check against the physical menu:`);
    for (const r of flagged) {
      console.log(`  - [${r.category}/${r.subcategory_lv}] ${r.name_lv}: ${r.verify}`);
    }
  }

  console.log(`\nDone. Public GraphQL endpoint for the site: https://${subdomain}.graphql.${region}.nhost.run/v1`);
}

main();
