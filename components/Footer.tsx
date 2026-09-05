"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n/LangContext";
import BrandMark from "./BrandMark";

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="pub-dark">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <BrandMark />
            <p>
              {t(
                "Suši bārs Cēsu vecpilsētā — ēdiens uz vietas, aizvešanai un piegādei.",
                "A sushi bar in Cēsis Old Town — dine in, takeaway, or delivery."
              )}
            </p>
          </div>
          <div className="foot-col">
            <h4>{t("Kontakti", "Contact")}</h4>
            <a href="tel:+37124204050">+371 24 204 050</a>
            <a href="mailto:gotosushibar@gmail.com">gotosushibar@gmail.com</a>
            <span>Rīgas iela 9, Cēsis</span>
          </div>
          <div className="foot-col">
            <h4>{t("Sadaļas", "Sections")}</h4>
            <Link href="/about">{t("Par mums", "About")}</Link>
            <Link href="/menu">{t("Ēdienkarte", "Menu")}</Link>
            <Link href="/experience">{t("Pieredze", "Experience")}</Link>
            <Link href="/location">{t("Atrašanās vieta", "Location")}</Link>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {year} Go To Sushi Bar · Cēsis</span>
        </div>
      </div>
    </footer>
  );
}
