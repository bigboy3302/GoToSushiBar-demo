"use client";

import { useRef, useState } from "react";
import { upsertSiteMediaSlot } from "@/app/admin/actions";

export default function ImageDropzone({
  slotKey,
  label,
  initialImageUrl,
}: {
  slotKey: string;
  label: string;
  initialImageUrl: string | null;
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
      const result = await upsertSiteMediaSlot({ slotKey, imageUrl: json.url });
      if (!result.ok) {
        setError(result.error);
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
      const result = await upsertSiteMediaSlot({ slotKey, imageUrl: null });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setImageUrl(null);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className={`admin-dropzone${dragOver ? " is-dragover" : ""}`}
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
      <span className="admin-dropzone-label">{label}</span>

      <div className="admin-dropzone-preview" onClick={() => inputRef.current?.click()} role="button" tabIndex={0}>
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt="" />
        ) : (
          <span className="admin-dropzone-empty">{busy ? "Augšupielādē…" : "Ievelciet attēlu šeit vai klikšķiniet"}</span>
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
          <button type="button" className="btn btn-ghost" onClick={() => inputRef.current?.click()} disabled={busy}>
            Aizstāt
          </button>
          <button type="button" className="btn btn-ghost" onClick={handleRemove} disabled={busy}>
            Noņemt
          </button>
        </div>
      ) : null}

      {error ? <span className="admin-login-error">{error}</span> : null}
    </div>
  );
}
