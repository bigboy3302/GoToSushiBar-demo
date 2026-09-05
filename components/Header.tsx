"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/i18n/LangContext";
import BrandMark from "./BrandMark";

const NAV_LINKS = [
  { href: "/about", lv: "Par mums", en: "About" },
  { href: "/menu", lv: "Ēdienkarte", en: "Menu" },
  { href: "/experience", lv: "Pieredze", en: "Experience" },
  { href: "/location", lv: "Atrašanās vieta", en: "Location" },
];

export default function Header() {
  const { lang, setLang, t } = useLang();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (drawerOpen && !dialog.open) dialog.showModal();
    if (!drawerOpen && dialog.open) dialog.close();
  }, [drawerOpen]);

  function closeDrawer() {
    setDrawerOpen(false);
  }

  return (
    <header id="siteHeader" className="pub-dark">
      <div className="nav-row">
        <BrandMark />
        <nav className="primary">
          <div className="navlinks">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={pathname === link.href ? "is-active" : undefined}>
                {t(link.lv, link.en)}
              </Link>
            ))}
          </div>
          <div className="lang-toggle" role="group" aria-label="Language / Valoda">
            <button type="button" aria-pressed={lang === "lv"} onClick={() => setLang("lv")}>
              LV
            </button>
            <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>
              EN
            </button>
          </div>
          <button
            ref={triggerRef}
            type="button"
            className="hamburger"
            aria-expanded={drawerOpen}
            aria-controls="mobile-drawer"
            aria-label={t("Atvērt izvēlni", "Open menu") as string}
            onClick={() => setDrawerOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </div>

      <dialog
        id="mobile-drawer"
        ref={dialogRef}
        aria-label={t("Izvēlne", "Menu") as string}
        onClose={() => {
          setDrawerOpen(false);
          triggerRef.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) closeDrawer();
        }}
      >
        <div className="drawer-panel">
          <button
            type="button"
            className="drawer-close"
            aria-label={t("Aizvērt izvēlni", "Close menu") as string}
            onClick={closeDrawer}
          >
            ×
          </button>
          <nav className="drawer-links">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={pathname === link.href ? "is-active" : undefined}
                onClick={closeDrawer}
              >
                {t(link.lv, link.en)}
              </Link>
            ))}
          </nav>
          <a className="btn btn-red drawer-tel" href="tel:+37124204050" onClick={closeDrawer}>
            +371 24 204 050
          </a>
          <div className="lang-toggle drawer-lang" role="group" aria-label="Language / Valoda">
            <button
              type="button"
              aria-pressed={lang === "lv"}
              onClick={() => {
                setLang("lv");
                closeDrawer();
              }}
            >
              LV
            </button>
            <button
              type="button"
              aria-pressed={lang === "en"}
              onClick={() => {
                setLang("en");
                closeDrawer();
              }}
            >
              EN
            </button>
          </div>
        </div>
      </dialog>
    </header>
  );
}
