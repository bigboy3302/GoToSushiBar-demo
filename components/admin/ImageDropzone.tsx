"use client";

import { useRef, useState } from "react";

export default function ImageDropzone({
  label,
  initialImageUrl,
  onChange,
  compact = false,
}: {
  label: string;
  initialImageUrl: string | null;
  onChange: (imageUrl: string | null) => Promise<{ ok: boolean; error?: string }>;
  compact?: boolean;
}) {
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [dragOver, setDragOver] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function uploadFile(file: File) {
    setBusy(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/admin/api/upload", { method: "POST", body: formData });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Augšupielāde neizdevās.");
        return;
      }
      const result = await onChange(json.url);
      if (!result.ok) {
        setError(result.error ?? "Neizdevās saglabāt.");
        return;
      }
      setImageUrl(json.url);
    } catch {
      setError("Radās neparedzēta kļūda.");
    } finally {
      setBusy(false);
    }
  }

  async function handleRemove() {
    setBusy(true);
    setError(null);
    try {
      const result = await onChange(null);
      if (!result.ok) {
        setError(result.error ?? "Neizdevās saglabāt.");
        return;
      }
      setImageUrl(null);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className={`admin-dropzone${compact ? " admin-dropzone--compact" : ""}${dragOver ? " is-dragover" : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file) uploadFile(file);
      }}
    >
      {!compact ? <span className="admin-dropzone-label">{label}</span> : null}

      <div
        className="admin-dropzone-preview"
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label={label}
      >
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt="" />
        ) : (
          <span className="admin-dropzone-empty">
            {busy ? "…" : compact ? "+ Foto" : "Ievelciet attēlu šeit vai klikšķiniet"}
          </span>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) uploadFile(file);
          e.target.value = "";
        }}
      />

      {imageUrl ? (
        <div className="admin-dropzone-row">
          <button type="button" className="btn btn-outline" onClick={() => inputRef.current?.click()} disabled={busy}>
            {compact ? "Mainīt" : "Aizstāt"}
          </button>
          <button type="button" className="btn btn-outline" onClick={handleRemove} disabled={busy}>
            {compact ? "×" : "Noņemt"}
          </button>
        </div>
      ) : null}

      {error ? <span className="admin-login-error">{error}</span> : null}
    </div>
  );
}
