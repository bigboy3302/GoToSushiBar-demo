import "server-only";
import { createNhostClient, withAdminSession, type NhostClient } from "@nhost/nhost-js";

let cached: NhostClient | null = null;

// A Hasura-admin-secret-authenticated client for server-side mutations (menu
// CRUD, draft/publish, storage uploads). Bypasses Hasura's permission system
// entirely — there is no browser-facing role in this app, so every write goes
// through here, gated by verifyAdminSession() at the call site, never by Hasura
// row permissions. Never import this from a "use client" file.
export function getAdminNhostClient(): NhostClient {
  if (cached) return cached;
  cached = createNhostClient({
    subdomain: process.env.NHOST_SUBDOMAIN!,
    region: process.env.NHOST_REGION!,
    configure: [withAdminSession({ adminSecret: process.env.NHOST_ADMIN_SECRET! })],
  });
  return cached;
}
