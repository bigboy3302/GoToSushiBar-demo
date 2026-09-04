"use client";

import { useLang } from "@/lib/i18n/LangContext";

export default function CTABand() {
  const { t } = useLang();

  return (
    <section className="cta-band">
      <div className="wrap cta-inner">
        <h2>{t("Rezervē galdiņu uz terases.", "Reserve a table on the terrace.")}</h2>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <a className="btn btn-gold" href="tel:+37124204050">
            {t("Zvanīt tagad", "Call now")}
          </a>
          <a className="btn btn-ghost" href="mailto:gotosushibar@gmail.com">
            {t("Rakstīt e-pastu", "Send an email")}
          </a>
        </div>
      </div>
    </section>
  );
}
