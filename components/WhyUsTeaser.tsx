"use client";

import Link from "next/link";
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

export default function WhyUsTeaser() {
  const { t } = useLang();

  return (
    <section className="about">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">{t("Kāpēc mēs", "Why us")}</span>
            <h2>
              {t(
                <>
                  Vecpilsēta.
                  <br />
                  Svaigums.
                </>,
                <>
                  Old town.
                  <br />
                  Fresh fish.
                </>
              )}
            </h2>
          </div>
        </div>

        <div className="exp-grid">
          {POINTS.map((point, i) => (
            <div className="exp-item" key={i}>
              <p>{t(point.lv, point.en)}</p>
            </div>
          ))}
        </div>

        <p style={{ marginTop: "clamp(28px, 4vw, 40px)" }}>
          <Link className="btn btn-ghost" href="/about">
            {t("Uzzināt vairāk", "Learn more")}
          </Link>
        </p>
      </div>
    </section>
  );
}
