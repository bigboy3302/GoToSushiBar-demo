import "server-only";
import { createNhostServerClient } from "./serverClient";
import type { Session } from "@nhost/nhost-js/session";

const ALLOWED_EMAILS = (process.env.ADMIN_ALLOWED_EMAILS ?? "")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

export function isAllowedEmail(email: string): boolean {
  return ALLOWED_EMAILS.includes(email.toLowerCase());
}

// The load-bearing auth check: refreshSession() round-trips to Nhost's auth
// server, so a tampered/forged/expired cookie is rejected here even though
// httpOnly only stops page JS from reading it, not devtools-level tampering.
// Only trust the allow-list check that runs AFTER this — never a raw decoded
// cookie value. Safe to call from Server Components, Server Actions, and
// Route Handlers (see lib/nhost/serverClient.ts for why).
export async function verifyAdminSession(): Promise<Session | null> {
  const nhost = createNhostServerClient();
  const session = await nhost.refreshSession(60);
  const email = session?.user?.email;
  if (!email || !isAllowedEmail(email)) return null;
  return session;
}
