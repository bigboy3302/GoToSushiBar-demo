import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/nhost/adminSession";
import { getAdminNhostClient } from "@/lib/nhost/adminClient";

export async function POST(request: Request) {
  const session = await verifyAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof Blob)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  const nhost = getAdminNhostClient();
  const res = await nhost.storage.uploadFiles({ "file[]": [file] });
  const uploaded = res.body.processedFiles?.[0];
  if (!uploaded) {
    return NextResponse.json({ error: "Upload failed" }, { status: 502 });
  }

  const url = `${nhost.storage.baseURL}/files/${uploaded.id}`;
  return NextResponse.json({ url, fileId: uploaded.id });
}
