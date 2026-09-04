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
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <h1>Go To Sushi Bar</h1>
        <p className="admin-login-sub">Pārvaldības panelis</p>

        <label>
          E-pasts
          <input
            type="email"
            required
            autoComplete="username"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {error ? <p className="admin-login-error">{error}</p> : null}

        <button type="submit" className="btn btn-gold" disabled={loading}>
          {loading ? "Notiek pieteikšanās…" : "Pieteikties"}
        </button>
      </form>
    </div>
  );
}
