"use client";

import { useState } from "react";

const ROUTES: { path: string; label: string }[] = [
  { path: "/", label: "Sākums" },
  { path: "/menu", label: "Ēdienkarte" },
  { path: "/about", label: "Par mums" },
  { path: "/experience", label: "Pieredze" },
  { path: "/location", label: "Atrašanās vieta" },
];

export default function AdminPreviewPage() {
  const [active, setActive] = useState(ROUTES[0].path);

  return (
    <section className="admin-section">
      <h2>Priekšskatījums</h2>
      <p className="admin-section-sub">
        Šeit redzamas jūsu melnraksta izmaiņas — tādas, kādas tās izskatīsies pēc publicēšanas. Citi apmeklētāji tās
        neredz.
      </p>

      <div className="admin-preview-tabs">
        {ROUTES.map((route) => (
          <a
            key={route.path}
            className={route.path === active ? "is-active" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setActive(route.path);
            }}
            href={route.path}
          >
            {route.label}
          </a>
        ))}
      </div>

      <div className="admin-preview-frame">
        <iframe key={active} src={`${active}?preview=1`} title="Priekšskatījums" />
      </div>
    </section>
  );
}
