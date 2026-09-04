import type { Metadata } from "next";
import { resolveMode } from "@/lib/nhost/previewMode";
import MenuSection from "@/components/MenuSection";

export const metadata: Metadata = {
  title: "Ēdienkarte — Go To Sushi Bar",
};

export default async function MenuPage({ searchParams }: { searchParams: { preview?: string } }) {
  const mode = await resolveMode(searchParams);
  return <MenuSection mode={mode} />;
}
