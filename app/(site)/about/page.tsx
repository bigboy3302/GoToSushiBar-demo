import type { Metadata } from "next";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import { getSiteMedia } from "@/lib/nhost/getSiteMedia";
import { resolveMode } from "@/lib/nhost/previewMode";

export const metadata: Metadata = {
  title: "Par mums — Go To Sushi Bar",
};

const GALLERY_SLOTS = Array.from({ length: 8 }, (_, i) => `gallery_${i + 1}`);

export default async function AboutPage({ searchParams }: { searchParams: { preview?: string } }) {
  const mode = await resolveMode(searchParams);
  const media = await getSiteMedia(mode);

  const galleryImages = GALLERY_SLOTS.map((key) => media[key])
    .filter((slot): slot is NonNullable<typeof slot> => Boolean(slot?.image_url))
    .map((slot) => ({ url: slot.image_url as string, altLv: slot.alt_lv, altEn: slot.alt_en }));

  return (
    <>
      <About photoUrl={media.about_photo?.image_url ?? null} />
      <Gallery images={galleryImages} />
    </>
  );
}
