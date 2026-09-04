import { getMenu } from "@/lib/nhost/getMenu";
import type { MenuCategory, MenuItemRow } from "@/lib/nhost/getMenu";
import MenuHighlightsContent from "./MenuHighlightsContent";

const CATEGORIES: MenuCategory[] = ["sushi", "food", "drinks"];
const PER_CATEGORY = 2;

export default async function MenuHighlights({ mode = "published" }: { mode?: "draft" | "published" }) {
  const menu = await getMenu(mode);

  const items: MenuItemRow[] = CATEGORIES.flatMap((category) =>
    menu[category]
      .flatMap((sub) => sub.items)
      .sort((a, b) => a.sort_order - b.sort_order)
      .slice(0, PER_CATEGORY)
  );

  if (items.length === 0) return null;

  return <MenuHighlightsContent items={items} />;
}
