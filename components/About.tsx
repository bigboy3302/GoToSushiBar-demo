"use client";

import { useLang } from "@/lib/i18n/LangContext";
import HighlightPoints from "./HighlightPoints";
import PhotoPlaceholder from "./PhotoPlaceholder";

export default function About({ photoUrl }: { photoUrl?: string | null }) {
  const { t } = useLang();

  return (
    <section className="about" id="about">
      <div className="wrap">
        <div className="about-photo">
          {photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photoUrl} alt={t("Go To Sushi Bar interjers", "Go To Sushi Bar interior") as string} />
          ) : (
            <PhotoPlaceholder label={t("Interjera foto — drīzumā", "Interior photo — coming soon") as string} />
          )}
        </div>
      </div>
      <div className="wrap about-grid">
        <div>
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
        </div>
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
      </div>

      <div className="wrap">
        <hr className="rule about-rule" />
        <HighlightPoints />
      </div>
    </section>
  );
}
