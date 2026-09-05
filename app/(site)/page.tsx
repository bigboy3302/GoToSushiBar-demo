import Hero from "@/components/Hero";
import FeatureRow from "@/components/FeatureRow";
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
      <FeatureRow />
      <WhyUsTeaser />
      <MenuHighlights mode={mode} />
      <CTABand />
    </>
  );
}
