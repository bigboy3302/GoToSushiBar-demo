// Shared helpers for one-off setup scripts (scripts/*.ts, run via `tsx`, never
// imported by the deployed Next.js app). Talks to Hasura's raw SQL and metadata
// APIs directly with the admin secret — there's no Nhost SDK wrapper for those,
// unlike the GraphQL/storage/auth clients used at runtime.

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

export function loadEnvLocal() {
  const path = resolve(process.cwd(), ".env.local");
  if (!existsSync(path)) return;
  const content = readFileSync(path, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

export function requireSetupEnv() {
  loadEnvLocal();
  const subdomain = process.env.NHOST_SUBDOMAIN;
  const region = process.env.NHOST_REGION;
  const adminSecret = process.env.NHOST_ADMIN_SECRET;

  if (!subdomain || !region || !adminSecret) {
    console.error(
      "Missing NHOST_SUBDOMAIN, NHOST_REGION, or NHOST_ADMIN_SECRET.\n" +
        "Put them in a local .env.local (gitignored) — see README.md."
    );
    process.exit(1);
  }

  if (/^\{\{.*\}\}$/.test(adminSecret)) {
    console.error(
      `NHOST_ADMIN_SECRET looks like a template placeholder ("${adminSecret}"), not an actual secret.\n` +
        "Grab the real value from the Nhost dashboard: Settings -> Environment Variables -> " +
        "NHOST_ADMIN_SECRET -> click the eye icon to reveal it."
    );
    process.exit(1);
  }

  return { subdomain, region, adminSecret };
}

export function hasuraEndpoints(subdomain: string, region: string) {
  const base = `https://${subdomain}.hasura.${region}.nhost.run`;
  return {
    sql: `${base}/v2/query`,
    metadata: `${base}/v1/metadata`,
    graphql: `${base}/v1/graphql`,
  };
}

export function authEndpoints(subdomain: string, region: string) {
  return { base: `https://${subdomain}.auth.${region}.nhost.run/v1` };
}

export async function runSql(sqlEndpoint: string, adminSecret: string, sql: string, label: string) {
  const res = await fetch(sqlEndpoint, {
    method: "POST",
    headers: { "content-type": "application/json", "x-hasura-admin-secret": adminSecret },
    body: JSON.stringify({ type: "run_sql", args: { source: "default", sql } }),
  });
  const json = await res.json();
  if (!res.ok) {
    console.error(`✗ ${label} failed:`, JSON.stringify(json, null, 2));
    process.exit(1);
  }
  console.log(`✓ ${label}`);
  return json;
}

export async function runMetadata(
  metadataEndpoint: string,
  adminSecret: string,
  payload: Record<string, unknown>,
  label: string,
  ignoreIfExists = true
) {
  const res = await fetch(metadataEndpoint, {
    method: "POST",
    headers: { "content-type": "application/json", "x-hasura-admin-secret": adminSecret },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!res.ok) {
    const message = JSON.stringify(json);
    if (ignoreIfExists && /already/i.test(message)) {
      console.log(`= ${label} (already set)`);
      return json;
    }
    console.error(`✗ ${label} failed:`, message);
    process.exit(1);
  }
  console.log(`✓ ${label}`);
  return json;
}

export function sqlStr(value: string | null | undefined): string {
  if (value === null || value === undefined) return "NULL";
  return `'${value.replace(/'/g, "''")}'`;
}

export function sqlNum(value: number): string {
  return value.toFixed(2);
}
