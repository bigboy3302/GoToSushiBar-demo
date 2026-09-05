"use client";

import { useState, useTransition } from "react";
import { publishChanges } from "@/app/admin/actions";

export default function PublishBar() {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ kind: "success" | "error"; text: string } | null>(null);

  function handlePublish() {
    setMessage(null);
    startTransition(async () => {
      const result = await publishChanges();
      if (result.ok) {
        setMessage({ kind: "success", text: "Izmaiņas ir publicētas — tās tagad redzamas visiem apmeklētājiem." });
      } else {
        setMessage({ kind: "error", text: result.error });
      }
    });
  }

  return (
    <div className="admin-publish-bar">
      <p className="admin-publish-note">
        Izmaiņas vispirms tiek saglabātas melnrakstā. Neviens apmeklētājs tās neredz, kamēr nenospiežat šo pogu.
      </p>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {message ? <span className={`admin-toast is-${message.kind}`}>{message.text}</span> : null}
        <button type="button" className="btn btn-red" onClick={handlePublish} disabled={pending}>
          {pending ? "Publicē…" : "Publicēt izmaiņas"}
        </button>
      </div>
    </div>
  );
}
