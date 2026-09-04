import { NextResponse } from "next/server";
import { createNhostServerClient } from "@/lib/nhost/serverClient";

export async function POST() {
  const nhost = createNhostServerClient();
  nhost.clearSession();
  return NextResponse.json({ ok: true });
}
