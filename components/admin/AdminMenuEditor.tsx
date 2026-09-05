"use client";

import { useState, useTransition } from "react";
import { createMenuItem, updateMenuItem, deleteMenuItem, type MenuItemInput } from "@/app/admin/actions";
import type { MenuCategory, MenuItemRow } from "@/lib/nhost/getMenu";

const CATEGORIES: { key: MenuCategory; label: string }[] = [
  { key: "sushi", label: "Suši" },
  { key: "food", label: "Ēdieni" },
  { key: "drinks", label: "Dzērieni" },
];

const emptyForm: MenuItemInput = {
  category: "sushi",
  subcategory_lv: "",
  subcategory_en: "",
  name_lv: "",
  name_en: "",
  description_lv: "",
  description_en: "",
  unit_lv: "",
  unit_en: "",
  price: 0,
  sort_order: 0,
  image_url: null,
};

export default function AdminMenuEditor({
  itemsByCategory,
}: {
  itemsByCategory: Record<MenuCategory, MenuItemRow[]>;
}) {
  const [active, setActive] = useState<MenuCategory>("sushi");

  return (
    <div>
      <div className="admin-preview-tabs">
        {CATEGORIES.map((c) => (
          <a
            key={c.key}
            href="#"
            className={c.key === active ? "is-active" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setActive(c.key);
            }}
          >
            {c.label} ({itemsByCategory[c.key].length})
          </a>
        ))}
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th style={{ width: "26%" }}>Nosaukums (LV / EN)</th>
            <th style={{ width: "18%" }}>Apakškategorija (LV / EN)</th>
            <th style={{ width: "22%" }}>Apraksts (LV / EN)</th>
            <th style={{ width: "10%" }}>Cena €</th>
            <th style={{ width: "8%" }}>Kārtība</th>
            <th style={{ width: "16%" }}></th>
          </tr>
        </thead>
        <tbody>
          {itemsByCategory[active].map((item) => (
            <MenuItemRowEditor key={item.id} item={item} />
          ))}
        </tbody>
      </table>

      <NewMenuItemForm category={active} />
    </div>
  );
}

function MenuItemRowEditor({ item }: { item: MenuItemRow }) {
  const [form, setForm] = useState<MenuItemInput>({
    category: item.category,
    subcategory_lv: item.subcategory_lv,
    subcategory_en: item.subcategory_en,
    name_lv: item.name_lv,
    name_en: item.name_en,
    description_lv: item.description_lv,
    description_en: item.description_en,
    unit_lv: item.unit_lv,
    unit_en: item.unit_en,
    price: item.price,
    sort_order: item.sort_order,
    image_url: item.image_url,
  });
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof MenuItemInput>(key: K, value: MenuItemInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSave() {
    setError(null);
    startTransition(async () => {
      const result = await updateMenuItem(item.id, form);
      if (!result.ok) setError(result.error);
    });
  }

  function handleDelete() {
    if (!confirm(`Dzēst "${item.name_lv}"?`)) return;
    setError(null);
    startTransition(async () => {
      const result = await deleteMenuItem(item.id);
      if (!result.ok) setError(result.error);
    });
  }

  return (
    <tr>
      <td>
        <input value={form.name_lv} onChange={(e) => set("name_lv", e.target.value)} placeholder="Nosaukums (LV)" />
        <input
          value={form.name_en}
          onChange={(e) => set("name_en", e.target.value)}
          placeholder="Name (EN)"
          style={{ marginTop: 6 }}
        />
      </td>
      <td>
        <input
          value={form.subcategory_lv}
          onChange={(e) => set("subcategory_lv", e.target.value)}
          placeholder="Apakškategorija (LV)"
        />
        <input
          value={form.subcategory_en}
          onChange={(e) => set("subcategory_en", e.target.value)}
          placeholder="Subcategory (EN)"
          style={{ marginTop: 6 }}
        />
      </td>
      <td>
        <textarea
          value={form.description_lv ?? ""}
          onChange={(e) => set("description_lv", e.target.value)}
          placeholder="Apraksts (LV)"
        />
        <textarea
          value={form.description_en ?? ""}
          onChange={(e) => set("description_en", e.target.value)}
          placeholder="Description (EN)"
          style={{ marginTop: 6 }}
        />
      </td>
      <td>
        <input
          type="number"
          step="0.01"
          value={form.price}
          onChange={(e) => set("price", Number(e.target.value))}
        />
      </td>
      <td>
        <input
          type="number"
          value={form.sort_order}
          onChange={(e) => set("sort_order", Number(e.target.value))}
        />
      </td>
      <td>
        <div className="admin-row-actions">
          <button type="button" className="btn btn-red" onClick={handleSave} disabled={pending}>
            Saglabāt
          </button>
          <button type="button" className="btn btn-outline" onClick={handleDelete} disabled={pending}>
            Dzēst
          </button>
        </div>
        {error ? <span className="admin-login-error">{error}</span> : null}
      </td>
    </tr>
  );
}

function NewMenuItemForm({ category }: { category: MenuCategory }) {
  const [form, setForm] = useState<MenuItemInput>({ ...emptyForm, category });
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof MenuItemInput>(key: K, value: MenuItemInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleCreate() {
    if (!form.name_lv.trim()) {
      setError("Nosaukums (LV) ir obligāts.");
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await createMenuItem({ ...form, category });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setForm({ ...emptyForm, category });
    });
  }

  return (
    <div className="admin-new-item">
      <h3 style={{ fontSize: "1rem", marginTop: 0 }}>Pievienot jaunu ēdienu</h3>
      <table className="admin-table">
        <tbody>
          <tr>
            <td>
              <input value={form.name_lv} onChange={(e) => set("name_lv", e.target.value)} placeholder="Nosaukums (LV)" />
              <input
                value={form.name_en}
                onChange={(e) => set("name_en", e.target.value)}
                placeholder="Name (EN)"
                style={{ marginTop: 6 }}
              />
            </td>
            <td>
              <input
                value={form.subcategory_lv}
                onChange={(e) => set("subcategory_lv", e.target.value)}
                placeholder="Apakškategorija (LV)"
              />
              <input
                value={form.subcategory_en}
                onChange={(e) => set("subcategory_en", e.target.value)}
                placeholder="Subcategory (EN)"
                style={{ marginTop: 6 }}
              />
            </td>
            <td>
              <input
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => set("price", Number(e.target.value))}
                placeholder="Cena €"
              />
            </td>
            <td>
              <button type="button" className="btn btn-red" onClick={handleCreate} disabled={pending}>
                Pievienot
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      {error ? <span className="admin-login-error">{error}</span> : null}
    </div>
  );
}
