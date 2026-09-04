"use client";

import { useLang } from "@/lib/i18n/LangContext";

const ITEMS = [
  { lv: "Cēsu vecpilsēta", en: "Cēsis old town" },
  { lv: "Svaigs katru dienu", en: "Fresh every day" },
  { lv: "Vasaras terase", en: "Summer terrace" },
  { lv: "Aizvešana & piegāde", en: "Takeaway & delivery" },
  { lv: "LV / EN", en: "LV / EN" },
];

export default function Ticker() {
  const { t } = useLang();
  const track = [...ITEMS, ...ITEMS];

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {track.map((item, i) => (
          <div className="ticker-item" key={i}>
            {t(item.lv, item.en)}
          </div>
        ))}
      </div>
    </div>
  );
}
