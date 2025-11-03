"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      await login(email, password);
      router.replace("/mon-espace");
    } catch (e: any) {
      setErr(e?.message || "Connexion impossible");
    } finally {
      setBusy(false);
    }
  };

  if (loading) return null;

  return (
    <main className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Connexion pro</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="pro@exemple.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Mot de passe</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button
          type="submit"
          disabled={busy}
          className="w-full bg-indigo-600 text-white rounded px-4 py-2 font-medium hover:bg-indigo-700 disabled:opacity-50"
        >
          {busy ? "Connexion..." : "Se connecter"}
        </button>
      </form>

      <p className="text-sm text-gray-500 mt-4">
        Pas de compte ? Contacte-nous pour être vérifié et visible.
      </p>
    </main>
  );
}
