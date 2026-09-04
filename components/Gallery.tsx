"use client";

import { useLang } from "@/lib/i18n/LangContext";

export type GalleryImage = { url: string; altLv: string | null; altEn: string | null };

export default function Gallery({ images }: { images: GalleryImage[] }) {
  const { t } = useLang();

  if (images.length === 0) return null;

  return (
    <section className="gallery">
      <div className="wrap">
        <div className="gallery-grid reveal">
          {images.map((image, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={image.url} src={image.url} alt={(t(image.altLv, image.altEn) as string) || `Foto ${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
