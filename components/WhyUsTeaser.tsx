"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n/LangContext";

export default function WhyUsTeaser() {
  const { t } = useLang();

  return (
    <section className="about">
      <div className="wrap about-grid">
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
        <div className="about-body">
          <p>
            {t(
              "Vecpilsētas sirdī, Rīgas ielā 9 — ērti sasniedzams kājāmejot, ar vietu gan iekštelpās, gan uz sezonas terases.",
              "In the heart of Old Town at Rīgas iela 9 — an easy walk from anywhere downtown, with seating indoors and on a seasonal terrace."
            )}
          </p>
          <Link className="btn btn-outline" href="/about" style={{ marginTop: 8 }}>
            {t("Uzzināt vairāk", "Learn more")}
          </Link>
        </div>
      </div>
    </section>
  );
}
