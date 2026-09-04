import { getMenu } from "@/lib/nhost/getMenu";
import MenuContent from "./MenuContent";

export default async function MenuSection({ mode = "published" }: { mode?: "draft" | "published" }) {
  const menu = await getMenu(mode);
  return <MenuContent menu={menu} />;
}
