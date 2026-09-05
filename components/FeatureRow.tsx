"use client";

import { useLang } from "@/lib/i18n/LangContext";

const ITEMS = [
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" />
        <circle cx="12" cy="9" r="2.4" />
      </svg>
    ),
    lv: "Cēsu vecpilsēta",
    en: "Cēsis old town",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M20 4c0 8-4 13-11 13H5v-2c0-9 6-13 15-13v2z" />
        <path d="M9 17c0-4 2-7 6-9" />
      </svg>
    ),
    lv: "Svaigs katru dienu",
    en: "Fresh every day",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v3M12 18.5v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2.5 12h3M18.5 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
      </svg>
    ),
    lv: "Vasaras terase",
    en: "Summer terrace",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M4 10l1.5-4h13L20 10" />
        <path d="M4 10h16v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9z" />
        <path d="M9 14v-3M15 14v-3" />
      </svg>
    ),
    lv: "Aizvešana un piegāde",
    en: "Takeaway & delivery",
  },
];

export default function FeatureRow() {
  const { t } = useLang();

  return (
    <section className="feature-row">
      <div className="wrap feature-row-grid">
        {ITEMS.map((item, i) => (
          <div className="feature-row-item" key={i}>
            {item.icon}
            <span>{t(item.lv, item.en)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
