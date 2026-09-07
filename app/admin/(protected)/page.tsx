import { getSiteMedia } from "@/lib/nhost/getSiteMedia";
import SiteMediaGrid from "@/components/admin/SiteMediaGrid";
import PublishBar from "@/components/admin/PublishBar";

const SLOTS: { key: string; label: string }[] = [
  { key: "hero_bg", label: "Galvenais attēls (sākumlapas fons)" },
  { key: "about_photo", label: "Foto sadaļai \"Par mums\"" },
  { key: "gallery_1", label: "Galerijas attēls 1" },
  { key: "gallery_2", label: "Galerijas attēls 2" },
  { key: "gallery_3", label: "Galerijas attēls 3" },
  { key: "gallery_4", label: "Galerijas attēls 4" },
  { key: "gallery_5", label: "Galerijas attēls 5" },
  { key: "gallery_6", label: "Galerijas attēls 6" },
  { key: "gallery_7", label: "Galerijas attēls 7" },
  { key: "gallery_8", label: "Galerijas attēls 8" },
];

export default async function AdminDashboardPage() {
  const media = await getSiteMedia("draft");
  const slots = SLOTS.map((slot) => ({ ...slot, imageUrl: media[slot.key]?.image_url ?? null }));

  return (
    <>
      <section className="admin-section">
        <h2>Fotogrāfijas</h2>
        <p className="admin-section-sub">
          Ievelciet attēlu katrā laukā vai klikšķiniet, lai izvēlētos failu. Skatiet, kā tas izskatīsies, sadaļā
          "Priekšskatījums", pirms publicējat.
        </p>
        <SiteMediaGrid slots={slots} />
      </section>

      <PublishBar />
    </>
  );
}
