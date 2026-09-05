"use client";

import { useLang } from "@/lib/i18n/LangContext";

const POINTS = [
  {
    lv: "Vecpilsētas sirdī, Rīgas ielā 9 — ērti sasniedzams kājāmejot.",
    en: "In the heart of Old Town at Rīgas iela 9 — an easy walk from anywhere downtown.",
  },
  {
    lv: "Vasarā galdiņi iznāk uz terases, ziemā — mājīgi iekštelpās.",
    en: "Come summer, tables move to the terrace; in winter, cosy indoor seating.",
  },
  {
    lv: "Ēdiens uz vietas, aizvešanai un ar piegādi — kā ērtāk, tā labi.",
    en: "Dine in, takeaway, or delivery — whatever suits you.",
  },
];

export default function HighlightPoints() {
  const { t } = useLang();

  return (
    <div className="highlight-list">
      {POINTS.map((point, i) => (
        <div className="highlight-item" key={i}>
          <span className="highlight-num">{String(i + 1).padStart(2, "0")}</span>
          <p>{t(point.lv, point.en)}</p>
        </div>
      ))}
    </div>
  );
}
