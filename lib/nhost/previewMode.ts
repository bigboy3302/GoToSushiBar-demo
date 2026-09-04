import "server-only";
import { verifyAdminSession } from "./adminSession";

// A bare ?preview=1 is never enough on its own — it only takes effect when
// the request also carries a validated admin session, so a public visitor
// appending the same query param just gets the normal published page.
export async function resolveMode(searchParams?: { preview?: string }): Promise<"draft" | "published"> {
  if (searchParams?.preview === "1") {
    const session = await verifyAdminSession();
    if (session) return "draft";
  }
  return "published";
}
