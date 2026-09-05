"use client";

import { useLang } from "@/lib/i18n/LangContext";
import type { GroupedMenu, MenuCategory, MenuItemRow, MenuSubcategory } from "@/lib/nhost/getMenu";
import PhotoPlaceholder from "./PhotoPlaceholder";

const TABS: { key: MenuCategory; lv: string; en: string; icon: React.ReactNode }[] = [
  {
    key: "sushi",
    lv: "Suši",
    en: "Sushi",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    key: "food",
    lv: "Ēdieni",
    en: "Food",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M4 11a8 8 0 0 1 16 0z" />
        <path d="M3 11h18" />
        <path d="M5 15c1 3 3 5 7 5s6-2 7-5" />
      </svg>
    ),
  },
  {
    key: "drinks",
    lv: "Dzērieni",
    en: "Drinks",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M7 4h10l-1.2 14.5a2 2 0 0 1-2 1.5H10.2a2 2 0 0 1-2-1.5L7 4z" />
        <path d="M6.3 8h11.4" />
      </svg>
    ),
  },
];

function ItemCard({ item }: { item: MenuItemRow }) {
  const { t } = useLang();
  return (
    <div className="menu-item-card">
      <div className="menu-item-card-photo">
        <PhotoPlaceholder label={t(item.name_lv, item.name_en) as string} />
      </div>
      <div className="menu-item-card-body">
        <span className="name">{t(item.name_lv, item.name_en)}</span>
        <span className="price">€{item.price.toFixed(2)}</span>
      </div>
    </div>
  );
}

function MenuItemRow_({ item }: { item: MenuItemRow }) {
  const { t } = useLang();
  const unit = t(item.unit_lv, item.unit_en);
  const description = t(item.description_lv, item.description_en);
  const small = [unit, description].filter(Boolean).join(" · ");
  return (
    <li className="menu-item">
      <span className="name">
        {t(item.name_lv, item.name_en)}
        {small ? <small>{small}</small> : null}
      </span>
      <span className="leader" aria-hidden="true" />
      <span className="price">€{item.price.toFixed(2)}</span>
    </li>
  );
}

function SubcategoryBlock({ sub, featured = false }: { sub: MenuSubcategory; featured?: boolean }) {
  const { t } = useLang();
  const cardItems = featured ? sub.items.slice(0, 3) : [];
  const listItems = featured ? sub.items.slice(3) : sub.items;

  return (
    <div className="menu-cat">
      <span className="eyebrow">{t(sub.subcategory_lv, sub.subcategory_en)}</span>
      <h3>{t(sub.subcategory_lv, sub.subcategory_en)}</h3>

      {cardItems.length > 0 ? (
        <div className="menu-item-card-grid">
          {cardItems.map((item) => (
            <ItemCard item={item} key={item.id} />
          ))}
        </div>
      ) : null}

      {listItems.length > 0 ? (
        <ul className="menu-list">
          {listItems.map((item) => (
            <MenuItemRow_ item={item} key={item.id} />
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default function MenuContent({ menu }: { menu: GroupedMenu }) {
  const { t } = useLang();
  const hasAnyItems = TABS.some((tab) => menu[tab.key].length > 0);

  return (
    <section className="menu" id="menu">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">{t("Ēdienkarte", "Menu")}</span>
            <h2>{t("Ēdienkarte", "Menu")}</h2>
          </div>
          <p>
            {t(
              "Pilna ēdienkarte — suši, virtuves ēdieni un bārs. Sastāvdaļas var mainīties, par alergēniem vaicājiet personālam.",
              "The full menu — sushi, kitchen dishes, and the bar. Ingredients may vary; ask staff about allergens."
            )}
          </p>
          <hr className="rule" />
        </div>

        {hasAnyItems ? (
          <div className="menu-tabs">
            <input type="radio" name="menu-tab" id="tab-sushi" className="menu-tab-input" defaultChecked />
            <input type="radio" name="menu-tab" id="tab-food" className="menu-tab-input" />
            <input type="radio" name="menu-tab" id="tab-drinks" className="menu-tab-input" />

            <div className="menu-tab-nav">
              {TABS.map((tab) => (
                <label key={tab.key} htmlFor={`tab-${tab.key}`} className="menu-tab-label">
                  {tab.icon}
                  {t(tab.lv, tab.en)}
                </label>
              ))}
            </div>

            {TABS.map((tab) => (
              <div className="menu-panel" id={`panel-${tab.key}`} key={tab.key}>
                <div className="menu-panel-photo">
                  <PhotoPlaceholder label={t(`${tab.lv} — foto drīzumā`, `${tab.en} — photo coming soon`) as string} />
                </div>
                <div className="menu-grid">
                  {menu[tab.key].map((sub, i) => (
                    <SubcategoryBlock sub={sub} featured={i === 0} key={sub.subcategory_lv} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="menu-empty">
            {t("Ēdienkarte tiek atjaunota — drīz būs pieejama šeit.", "The menu is being updated — it will be available here shortly.")}
          </p>
        )}
      </div>
    </section>
  );
}
