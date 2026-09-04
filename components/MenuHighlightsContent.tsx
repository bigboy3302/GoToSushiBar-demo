"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n/LangContext";
import type { MenuItemRow } from "@/lib/nhost/getMenu";

export default function MenuHighlightsContent({ items }: { items: MenuItemRow[] }) {
  const { t } = useLang();

  return (
    <section className="menu">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">{t("Ēdienkarte", "Menu")}</span>
            <h2>{t("Daži iecienītāki", "A few favourites")}</h2>
          </div>
          <p>
            {t(
              "Neliela izlase no pilnās ēdienkartes — suši, virtuves ēdieni un bārs.",
              "A small taste of the full menu — sushi, kitchen dishes, and the bar."
            )}
          </p>
          <hr className="rule" />
        </div>

        <ul className="menu-list">
          {items.map((item) => (
            <li className="menu-item" key={item.id}>
              <span className="name">{t(item.name_lv, item.name_en)}</span>
              <span className="leader" aria-hidden="true" />
              <span className="price">€{item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <p style={{ marginTop: "clamp(28px, 4vw, 40px)" }}>
          <Link className="btn btn-gold" href="/menu">
            {t("Skatīt visu ēdienkarti", "See the full menu")}
          </Link>
        </p>
      </div>
    </section>
  );
}
