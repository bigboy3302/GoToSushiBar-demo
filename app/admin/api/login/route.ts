import { NextResponse } from "next/server";
import { createNhostServerClient } from "@/lib/nhost/serverClient";
import { isAllowedEmail } from "@/lib/nhost/adminSession";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email || !password) {
    return NextResponse.json({ error: "Ievadiet e-pastu un paroli." }, { status: 400 });
  }

  const nhost = createNhostServerClient();

  try {
    const res = await nhost.auth.signInEmailPassword({ email, password });
    const session = res.body.session;

    if (!session?.user?.email || !isAllowedEmail(session.user.email)) {
      nhost.clearSession();
      return NextResponse.json({ error: "Šim kontam nav piekļuves administrēšanai." }, { status: 403 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Nepareizs e-pasts vai parole." }, { status: 401 });
  }
}
