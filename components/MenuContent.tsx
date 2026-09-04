"use client";

import { useLang } from "@/lib/i18n/LangContext";
import type { GroupedMenu, MenuCategory, MenuSubcategory } from "@/lib/nhost/getMenu";

const TABS: { key: MenuCategory; lv: string; en: string }[] = [
  { key: "sushi", lv: "Suši", en: "Sushi" },
  { key: "food", lv: "Ēdieni", en: "Food" },
  { key: "drinks", lv: "Dzērieni", en: "Drinks" },
];

function SubcategoryBlock({ sub }: { sub: MenuSubcategory }) {
  const { t } = useLang();
  return (
    <div className="menu-cat">
      <span className="eyebrow">{t(sub.subcategory_lv, sub.subcategory_en)}</span>
      <h3>{t(sub.subcategory_lv, sub.subcategory_en)}</h3>
      <ul className="menu-list">
        {sub.items.map((item) => {
          const unit = t(item.unit_lv, item.unit_en);
          const description = t(item.description_lv, item.description_en);
          const small = [unit, description].filter(Boolean).join(" · ");
          return (
            <li className="menu-item" key={item.id}>
              <span className="name">
                {t(item.name_lv, item.name_en)}
                {small ? <small>{small}</small> : null}
              </span>
              <span className="leader" aria-hidden="true" />
              <span className="price">€{item.price.toFixed(2)}</span>
            </li>
          );
        })}
      </ul>
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
                  {t(tab.lv, tab.en)}
                </label>
              ))}
            </div>

            {TABS.map((tab) => (
              <div className="menu-panel" id={`panel-${tab.key}`} key={tab.key}>
                <div className="menu-grid">
                  {menu[tab.key].map((sub) => (
                    <SubcategoryBlock sub={sub} key={sub.subcategory_lv} />
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
