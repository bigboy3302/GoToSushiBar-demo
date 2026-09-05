// One-off script: creates the two /admin accounts (owner + developer support).
// Safe to re-run for accounts that don't exist yet — an email that's already
// registered is reported and skipped, not overwritten.
//
// IMPORTANT ordering: run this BEFORE disabling public sign-up in the Nhost
// dashboard (Settings -> Authentication) — that toggle must be flipped off
// only AFTER these two accounts exist, otherwise this script can't create them.
// The in-code ADMIN_ALLOWED_EMAILS allow-list (see lib/nhost/adminSession.ts)
// is the real enforcement mechanism regardless of that dashboard toggle.
//
// Usage: npx tsx scripts/admin-users-setup.ts

import { randomBytes } from "node:crypto";
import { createNhostClient } from "@nhost/nhost-js";
import { requireSetupEnv, hasuraEndpoints, runSql, sqlStr } from "../lib/nhost/hasuraAdmin";

const { subdomain, region, adminSecret } = requireSetupEnv();
const { sql: SQL_ENDPOINT } = hasuraEndpoints(subdomain, region);

const ALLOWED_EMAILS = (process.env.ADMIN_ALLOWED_EMAILS ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

if (ALLOWED_EMAILS.length === 0) {
  console.error("ADMIN_ALLOWED_EMAILS is empty — set it in .env.local first (see README.md).");
  process.exit(1);
}

function generatePassword(): string {
  return randomBytes(18).toString("base64url");
}

async function main() {
  console.log(`Creating admin accounts on ${subdomain}.${region}...\n`);

  const nhost = createNhostClient({ subdomain, region });
  const created: string[] = [];

  for (const email of ALLOWED_EMAILS) {
    const password = generatePassword();
    try {
      const res = await nhost.auth.signUpEmailPassword({ email, password });
      if (res.status >= 200 && res.status < 300) {
        console.log(`✓ created ${email}`);
        console.log(`  password: ${password}`);
        created.push(email);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (/already|exists|registered/i.test(message)) {
        console.log(`= ${email} already exists, skipping`);
      } else {
        console.error(`✗ failed to create ${email}:`, message);
      }
    }
  }

  if (created.length > 0) {
    // Bypasses the email-verification-link flow — this only flips the same
    // boolean Nhost's own verification link would have set, it does not
    // fabricate a password hash or bypass any permission model.
    await runSql(
      SQL_ENDPOINT,
      adminSecret,
      `UPDATE auth.users SET email_verified = true WHERE email IN (${created.map(sqlStr).join(", ")});`,
      `mark ${created.length} account(s) email-verified`
    );
  }

  console.log(
    "\nDone. Save the printed password(s) somewhere safe now — they aren't shown again.\n" +
      "Next: disable public sign-up in the Nhost dashboard (Settings -> Authentication)."
  );
}

main();
