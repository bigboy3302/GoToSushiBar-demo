import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@nhost/nhost-js";
import type { Session, SessionStorageBackend } from "@nhost/nhost-js/session";
import { SESSION_COOKIE } from "@/lib/nhost/serverClient";

export const config = {
  matcher: ["/admin/:path*"],
};

const ALLOWED_EMAILS = (process.env.ADMIN_ALLOWED_EMAILS ?? "")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

const PUBLIC_PATHS = ["/admin/login", "/admin/api/login", "/admin/api/logout"];

export async function middleware(request: NextRequest) {
  if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) return NextResponse.next();

  const response = NextResponse.next();

  // Middleware uses NextRequest/NextResponse cookies (not next/headers) —
  // both reading and writing are safe here, so this is the one place we can
  // do a real proactive refresh and persist it before the token expires.
  const storage: SessionStorageBackend = {
    get(): Session | null {
      const raw = request.cookies.get(SESSION_COOKIE)?.value;
      if (!raw) return null;
      try {
        return JSON.parse(raw) as Session;
      } catch {
        return null;
      }
    },
    set(value: Session) {
      response.cookies.set(SESSION_COOKIE, JSON.stringify(value), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
    },
    remove() {
      response.cookies.delete(SESSION_COOKIE);
    },
  };

  const nhost = createServerClient({
    subdomain: process.env.NHOST_SUBDOMAIN!,
    region: process.env.NHOST_REGION!,
    storage,
  });

  const session = await nhost.refreshSession(60);
  const email = session?.user?.email?.toLowerCase();

  if (!email || !ALLOWED_EMAILS.includes(email)) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return response;
}
