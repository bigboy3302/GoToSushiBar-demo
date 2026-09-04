"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/admin/api/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Pieteikšanās neizdevās.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Radās neparedzēta kļūda. Mēģiniet vēlreiz.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login">
      <div className="grain" aria-hidden="true" />

      <svg className="admin-login-ring" viewBox="0 0 300 300" aria-hidden="true">
        <circle cx="150" cy="150" r="118" fill="none" stroke="var(--line)" strokeWidth="1" />
        <circle cx="150" cy="150" r="96" fill="none" stroke="var(--line)" strokeWidth="1" strokeDasharray="2 8" />
        <circle cx="150" cy="150" r="70" fill="var(--gold)" opacity="0.1" />
        <circle cx="150" cy="150" r="70" fill="none" stroke="var(--gold)" strokeWidth="1.5" />
        <path
          d="M96 172c18 14 38 14 54 4s34-10 54 4"
          fill="none"
          stroke="var(--gold-soft)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M90 150c18 14 38 14 54 4s34-10 56 4"
          fill="none"
          stroke="var(--jade-soft)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M96 128c18 14 38 14 54 4s34-10 54 4"
          fill="none"
          stroke="var(--gold-soft)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>

      <form className="admin-login-card" onSubmit={handleSubmit}>
        <a className="admin-login-brand" href="/">
          <span>Go To Sushi Bar</span>
          <small>CĒSU VECPILSĒTA</small>
        </a>

        <div className="admin-login-heading">
          <span className="eyebrow">Pārvaldības panelis</span>
          <h1>Laipni lūdzam atpakaļ</h1>
        </div>

        <label>
          E-pasts
          <input
            type="email"
            required
            autoComplete="username"
            placeholder="vards@epasts.lv"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Parole
          <input
            type="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {error ? <p className="admin-login-error">{error}</p> : null}

        <button type="submit" className="btn btn-gold" disabled={loading}>
          {loading ? "Notiek pieteikšanās…" : "Pieteikties"}
        </button>

        <a className="admin-login-back" href="/">
          ← Atpakaļ uz sākumlapu
        </a>
      </form>
    </div>
  );
}
