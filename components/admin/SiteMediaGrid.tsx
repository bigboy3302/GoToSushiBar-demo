"use client";

import ImageDropzone from "./ImageDropzone";
import { upsertSiteMediaSlot } from "@/app/admin/actions";

export default function SiteMediaGrid({
  slots,
}: {
  slots: { key: string; label: string; imageUrl: string | null }[];
}) {
  return (
    <div className="admin-media-grid">
      {slots.map((slot) => (
        <ImageDropzone
          key={slot.key}
          label={slot.label}
          initialImageUrl={slot.imageUrl}
          onChange={(imageUrl) => upsertSiteMediaSlot({ slotKey: slot.key, imageUrl })}
        />
      ))}
    </div>
  );
}
