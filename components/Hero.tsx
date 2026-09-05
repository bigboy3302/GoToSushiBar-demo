"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n/LangContext";
import HeroCanvas from "./HeroCanvas";

export default function Hero({ heroImageUrl }: { heroImageUrl?: string | null }) {
  const { t } = useLang();

  return (
    <section className="hero">
      {heroImageUrl ? (
        <div className="hero-photo" style={{ backgroundImage: `url(${heroImageUrl})` }} aria-hidden="true" />
      ) : (
        <>
          <HeroCanvas />
          <div className="hero-photo-note" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="1.4" />
              <circle cx="8" cy="8" r="2" fill="none" stroke="currentColor" strokeWidth="1.4" />
              <path d="M3 17l5.5-5.5 3.5 3.5 4-5 5 5.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t("Restorāna foto — drīzumā", "Restaurant photo — coming soon")}
          </div>
        </>
      )}
      <svg className="hero-ghost" viewBox="0 0 1000 140" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <text
          x="500"
          y="105"
          textAnchor="middle"
          lengthAdjust="spacingAndGlyphs"
          textLength="960"
        >
          GO TO SUSHI BAR
        </text>
      </svg>
      <div className="wrap hero-grid">
        <div>
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
            <Link className="btn btn-gold" href="/menu">
              {t("Skatīt ēdienkarti", "View the menu")}
            </Link>
            <a className="btn btn-ghost" href="tel:+37124204050">
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
        <div className="hero-mark" aria-hidden="true">
          <svg viewBox="0 0 300 300">
            <g className="hero-mark-spin">
              <circle cx="150" cy="150" r="118" fill="none" stroke="var(--line)" strokeWidth="1" />
              <circle cx="150" cy="150" r="96" fill="none" stroke="var(--line)" strokeWidth="1" strokeDasharray="2 8" />
            </g>
            <circle cx="150" cy="150" r="70" fill="var(--gold)" opacity="0.14" />
            <circle cx="150" cy="150" r="70" fill="none" stroke="var(--gold)" strokeWidth="1.5" />
            <path
              d="M96 172c18 14 38 14 54 4s34-10 54 4"
              fill="none"
              stroke="var(--gold-soft)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M90 150c18 14 38 14 54 4s34-10 56 4"
              fill="none"
              stroke="var(--jade-soft)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.8"
            />
            <path
              d="M96 128c18 14 38 14 54 4s34-10 54 4"
              fill="none"
              stroke="var(--gold-soft)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
