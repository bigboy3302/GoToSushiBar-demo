import "server-only";
import { cookies } from "next/headers";
import { createServerClient, type NhostClient } from "@nhost/nhost-js";
import type { Session, SessionStorageBackend } from "@nhost/nhost-js/session";

export const SESSION_COOKIE = "nhost-session";

// Backed by next/headers cookies(). Reading is always safe. Writing (when
// refreshSession() persists a rotated token) is only actually permitted by
// Next.js inside a Server Action or Route Handler — calling it from a plain
// Server Component render throws. We swallow that specific case: the auth
// *check* still works either way, we just skip persisting the refreshed
// token in read-only contexts (middleware refreshes it for real on the next
// request via its own request/response-cookie storage).
function cookieStorage(): SessionStorageBackend {
  return {
    get(): Session | null {
      const raw = cookies().get(SESSION_COOKIE)?.value;
      if (!raw) return null;
      try {
        return JSON.parse(raw) as Session;
      } catch {
        return null;
      }
    },
    set(value: Session) {
      try {
        cookies().set(SESSION_COOKIE, JSON.stringify(value), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 30,
        });
      } catch {
        // Read-only context (Server Component render) — safe to ignore.
      }
    },
    remove() {
      try {
        cookies().delete(SESSION_COOKIE);
      } catch {
        // Read-only context (Server Component render) — safe to ignore.
      }
    },
  };
}

export function createNhostServerClient(): NhostClient {
  return createServerClient({
    subdomain: process.env.NHOST_SUBDOMAIN!,
    region: process.env.NHOST_REGION!,
    storage: cookieStorage(),
  });
}
