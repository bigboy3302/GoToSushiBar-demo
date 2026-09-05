"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n/LangContext";
import PhotoPlaceholder from "./PhotoPlaceholder";

export default function Hero({ heroImageUrl }: { heroImageUrl?: string | null }) {
  const { t } = useLang();

  return (
    <section className="hero pub-dark">
      {heroImageUrl ? (
        <div className="hero-photo" style={{ backgroundImage: `url(${heroImageUrl})` }} aria-hidden="true" />
      ) : (
        <div className="hero-photo" aria-hidden="true">
          <PhotoPlaceholder label={t("Restorāna foto — drīzumā", "Restaurant photo — coming soon") as string} />
        </div>
      )}
      <div className="wrap hero-content">
        <span className="eyebrow hero-line-1">
          {t("Suši bārs · Rīgas iela 9, Cēsis", "Sushi bar · Rīgas iela 9, Cēsis")}
        </span>
        <h1 className="hero-line-2">
          {t(
            <>
              Suši, kas pārvērš
              <br />
              vakaru par <em>notikumu</em>.
            </>,
            <>
              Sushi that turns
              <br />
              an evening into an <em>occasion</em>.
            </>
          )}
        </h1>
        <p className="hero-sub hero-line-3">
          {t(
            "Svaigi ruļļi, rāmais Cēsu vecpilsētas ritms un vasaras terase Rīgas ielā — pusdienās, uz aizvešanu vai lielai kompānijai.",
            "Fresh rolls, the quiet rhythm of Cēsis Old Town, and a summer terrace on Rīgas iela — for lunch, takeaway, or a table for the whole group."
          )}
        </p>
        <div className="hero-ctas hero-line-4">
          <Link className="btn btn-red" href="/menu">
            {t("Skatīt ēdienkarti", "View the menu")}
          </Link>
          <a className="btn btn-outline" href="tel:+37124204050">
            {t("Zvanīt · 24 204 050", "Call · 24 204 050")}
          </a>
        </div>
        <div className="hero-meta hero-line-4">
          <span>
            <strong>{t("P–Ceturtd", "Mon–Thu")}</strong> 11:00–22:00
          </span>
          <span>
            <strong>{t("Piektd–Sestd", "Fri–Sat")}</strong> 11:00–00:00
          </span>
          <span>
            <strong>{t("Svētdien", "Sunday")}</strong> 11:00–22:00
          </span>
        </div>
      </div>
    </section>
  );
}
