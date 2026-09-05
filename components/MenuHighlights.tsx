import { getMenu } from "@/lib/nhost/getMenu";
import type { MenuCategory, MenuItemRow } from "@/lib/nhost/getMenu";
import MenuHighlightsContent from "./MenuHighlightsContent";

const CATEGORIES: { key: MenuCategory; lv: string; en: string }[] = [
  { key: "sushi", lv: "Suši", en: "Sushi" },
  { key: "food", lv: "Ēdieni", en: "Food" },
  { key: "drinks", lv: "Dzērieni", en: "Drinks" },
];
const PER_CATEGORY = 3;

export type MenuHighlightGroup = { key: MenuCategory; lv: string; en: string; items: MenuItemRow[] };

export default async function MenuHighlights({ mode = "published" }: { mode?: "draft" | "published" }) {
  const menu = await getMenu(mode);

  const groups: MenuHighlightGroup[] = CATEGORIES.map((category) => ({
    ...category,
    items: menu[category.key]
      .flatMap((sub) => sub.items)
      .sort((a, b) => a.sort_order - b.sort_order)
      .slice(0, PER_CATEGORY),
  })).filter((group) => group.items.length > 0);

  if (groups.length === 0) return null;

  return <MenuHighlightsContent groups={groups} />;
}
