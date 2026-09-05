"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n/LangContext";
import HighlightPoints from "./HighlightPoints";
import PhotoPlaceholder from "./PhotoPlaceholder";

const CONTACT_ICONS = {
  phone: (
    <svg viewBox="0 0 24 24">
      <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2C10.5 20 4 13.5 4 6a2 2 0 0 1 1-2z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24">
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="M4 6.5l8 6.5 8-6.5" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24">
      <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.4" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  ),
};

export default function About({ photoUrl }: { photoUrl?: string | null }) {
  const { t } = useLang();

  return (
    <section className="about" id="about">
      <div className="wrap about-media-grid">
        <div className="about-photo">
          {photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photoUrl} alt={t("Go To Sushi Bar interjers", "Go To Sushi Bar interior") as string} />
          ) : (
            <PhotoPlaceholder label={t("Interjera foto — drīzumā", "Interior photo — coming soon") as string} />
          )}
        </div>
        <div className="about-copy">
          <span className="eyebrow">{t("Par mums", "About")}</span>
          <h2>
            {t(
              <>
                Vecpilsēta.
                <br />
                Svaigums.
                <br />
                Nekāda steiga.
              </>,
              <>
                Old town.
                <br />
                Fresh fish.
                <br />
                No rush.
              </>
            )}
          </h2>
          <div className="about-body">
            <p>
              {t(
                <>
                  Go To Sushi Bar atrodas Cēsu vecpilsētas sirdī, Rīgas ielā 9 — <strong>ērti sasniedzams kājāmejot</strong>,
                  ar vietu gan iekštelpās, gan uz sezonas terases. Vasarā galdiņi iznāk ārā, un vakars pie sušu bāra kļūst
                  par daļu no pastaigas pa vecpilsētu.
                </>,
                <>
                  Go To Sushi Bar sits in the heart of Cēsis Old Town at Rīgas iela 9 — <strong>an easy walk</strong> from
                  anywhere downtown, with seating indoors and on a seasonal terrace. Come summer, the tables move outside
                  and dinner becomes part of the evening stroll through the old town.
                </>
              )}
            </p>
            <p>
              {t(
                "Strādājam arī pēc ēdiena aizvešanas un piegādes principa, uzņemam grupas un pasākumus, un priecājamies gan par ģimenēm, gan par suņa pastaigas pārtraukumu pie mums.",
                "We also do takeaway and delivery, host groups and events, and we're just as happy to see a family in for dinner as a dog walk that turns into a table on the terrace."
              )}
            </p>
          </div>
          <Link className="btn btn-dark" href="/location">
            {t("Sazinieties ar mums", "Get in touch")}
          </Link>
        </div>
      </div>

      <div className="wrap">
        <hr className="rule about-rule" />
        <HighlightPoints />
      </div>

      <div className="wrap about-contact">
        <span className="eyebrow">{t("Kontakti", "Contact")}</span>
        <div className="about-contact-grid">
          <a className="about-contact-item" href="tel:+37124204050">
            {CONTACT_ICONS.phone}
            <span>+371 24 204 050</span>
          </a>
          <a className="about-contact-item" href="mailto:gotosushibar@gmail.com">
            {CONTACT_ICONS.mail}
            <span>gotosushibar@gmail.com</span>
          </a>
          <Link className="about-contact-item" href="/location">
            {CONTACT_ICONS.pin}
            <span>Rīgas iela 9, Cēsis</span>
          </Link>
          <div className="about-contact-item">
            {CONTACT_ICONS.clock}
            <span>{t("P–C 11–22 · Pk–S 11–24 · Sv 11–22", "Mon–Thu 11–22 · Fri–Sat 11–00 · Sun 11–22")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
