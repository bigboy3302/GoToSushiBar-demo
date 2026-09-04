"use client";

import { useLang } from "@/lib/i18n/LangContext";

const MAPS_QUERY = encodeURIComponent("Rīgas iela 9, Cēsis, LV-4101");
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
const MAPS_EMBED = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`;

export default function Location() {
  const { t } = useLang();

  return (
    <section className="location" id="location">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">{t("Atrašanās vieta", "Location")}</span>
            <h2>Rīgas iela 9</h2>
          </div>
          <p>
            {t(
              "Cēsu vecpilsētas centrā, dažu soļu attālumā no galvenajām apskates vietām.",
              "Right in the middle of Cēsis Old Town, a few steps from the main sights."
            )}
          </p>
          <hr className="rule" />
        </div>

        <div className="loc-grid">
          <div className="loc-details">
            <dl>
              <div className="row">
                <dt>{t("Adrese", "Address")}</dt>
                <dd>
                  <a href={MAPS_LINK} target="_blank" rel="noopener">
                    Rīgas iela 9, Cēsis, LV-4101 ↗
                  </a>
                </dd>
              </div>
              <div className="row">
                <dt>{t("Tālrunis", "Phone")}</dt>
                <dd>
                  <a href="tel:+37124204050">+371 24 204 050</a>
                </dd>
              </div>
              <div className="row">
                <dt>E-pasts</dt>
                <dd>
                  <a href="mailto:gotosushibar@gmail.com">gotosushibar@gmail.com</a>
                </dd>
              </div>
              <div className="row">
                <dt>{t("Maksājumi", "Payments")}</dt>
                <dd>{t("Karte un skaidra nauda", "Card and cash accepted")}</dd>
              </div>
            </dl>
          </div>

          <div className="hours-card">
            <h3>{t("Darba laiks", "Opening hours")}</h3>
            <div className="hours-row">
              <span>{t("Pirmdiena–Ceturtdiena", "Monday–Thursday")}</span>
              <span>11:00–22:00</span>
            </div>
            <div className="hours-row">
              <span>{t("Piektdiena–Sestdiena", "Friday–Saturday")}</span>
              <span>11:00–00:00</span>
            </div>
            <div className="hours-row">
              <span>{t("Svētdiena", "Sunday")}</span>
              <span>11:00–22:00</span>
            </div>
          </div>
        </div>

        <div className="map-frame">
          <iframe
            src={MAPS_EMBED}
            title={t("Karte — Go To Sushi Bar, Rīgas iela 9, Cēsis", "Map — Go To Sushi Bar, Rīgas iela 9, Cēsis") as string}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
