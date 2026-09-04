import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import WhyUsTeaser from "@/components/WhyUsTeaser";
import MenuHighlights from "@/components/MenuHighlights";
import CTABand from "@/components/CTABand";
import { getSiteMedia } from "@/lib/nhost/getSiteMedia";
import { resolveMode } from "@/lib/nhost/previewMode";

export default async function Home({ searchParams }: { searchParams: { preview?: string } }) {
  const mode = await resolveMode(searchParams);
  const media = await getSiteMedia(mode);

  return (
    <>
      <Hero heroImageUrl={media.hero_bg?.image_url ?? null} />
      <Ticker />
      <WhyUsTeaser />
      <MenuHighlights mode={mode} />
      <CTABand />
    </>
  );
}
