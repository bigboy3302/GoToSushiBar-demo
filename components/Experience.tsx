"use client";

import { useLang } from "@/lib/i18n/LangContext";

const ITEMS = [
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 3v18M4 21h16M6 21c0-5 2.7-8 6-8s6 3 6 8" />
        <path d="M2 12a10 10 0 0 1 20 0z" />
      </svg>
    ),
    title: { lv: "Vasaras terase", en: "Summer terrace" },
    desc: { lv: "Sezonāla āra sēdvieta vecpilsētas ielā.", en: "Seasonal outdoor seating right on the old-town street." },
  },
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M3 7h13v10H3z" />
        <path d="M16 10h3l2 3v4h-5z" />
        <circle cx="7" cy="19" r="1.6" />
        <circle cx="18" cy="19" r="1.6" />
      </svg>
    ),
    title: { lv: "Aizvešana un piegāde", en: "Takeaway & delivery" },
    desc: { lv: "Pasūti pa telefonu un saņem restorānā vai ar piegādi.", en: "Order by phone for pickup or delivery." },
  },
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M4 20V10l8-6 8 6v10" />
        <path d="M9 20v-6h6v6" />
      </svg>
    ),
    title: { lv: "Pasākumi & catering", en: "Events & catering" },
    desc: { lv: "Vieta un ēdienkarte lielākām kompānijām.", en: "Space and menus for bigger groups." },
  },
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="4" y="4" width="16" height="16" rx="1" />
        <path d="M9 8v8M9 8h3.5a2 2 0 1 1 0 4H9" />
      </svg>
    ),
    title: { lv: "Bezmaksas stāvvieta", en: "Free parking" },
    desc: { lv: "Ērti piebraukt, vienalga no kuras puses vecpilsētai.", en: "Easy to reach the old town by car." },
  },
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <ellipse cx="7" cy="7" rx="1.6" ry="2.1" />
        <ellipse cx="12" cy="5.3" rx="1.6" ry="2.1" />
        <ellipse cx="17" cy="7" rx="1.6" ry="2.1" />
        <ellipse cx="19" cy="12" rx="1.8" ry="2.3" />
        <path d="M6 20c-1-4 2-7 6-7s7 3 6 7c-1 1.5-3 1-6 1s-5 .5-6-1z" />
      </svg>
    ),
    title: { lv: "Draudzīgi pret suņiem", en: "Pet-friendly" },
    desc: { lv: "Suns var gaidīt kopā ar jums uz terases.", en: "Dogs are welcome with you on the terrace." },
  },
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="8" cy="8" r="2.4" />
        <circle cx="17" cy="8" r="2" />
        <path d="M3 20c0-3.5 2.3-6 5-6s5 2.5 5 6" />
        <path d="M14 20c.2-2.8 1.8-5 4-5s4.2 2.2 4.5 5" />
      </svg>
    ),
    title: { lv: "Ģimenēm draudzīgi", en: "Family-friendly" },
    desc: { lv: "Vieta ir domāta arī vakariņām ar bērniem.", en: "Just as easy to bring the kids along." },
  },
];

export default function Experience() {
  const { t } = useLang();

  return (
    <section className="exp" id="experience">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">{t("Pieredze", "Experience")}</span>
            <h2>
              {t(
                <>
                  Vairāk nekā
                  <br />
                  galds
                </>,
                <>
                  More than
                  <br />a table
                </>
              )}
            </h2>
          </div>
          <p>
            {t(
              "Neatkarīgi no tā, vai nākat uz vakariņām, pasūtāt līdzi vai plānojat pasākumu — esam sagatavojušies.",
              "Whether you're in for dinner, ordering takeaway, or planning an event — we've got you covered."
            )}
          </p>
          <hr className="rule" />
        </div>

        <div className="exp-grid">
          {ITEMS.map((item, i) => (
            <div className="exp-item" key={i}>
              {item.icon}
              <h3>{t(item.title.lv, item.title.en)}</h3>
              <p>{t(item.desc.lv, item.desc.en)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
