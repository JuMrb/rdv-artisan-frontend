"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, registerArtisan } = useAuth();
  const [tab, setTab] = useState<"login" | "register">("login");

  // login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // register
  const [companyName, setCompanyName] = useState("");
  const [rEmail, setREmail] = useState("");
  const [rPassword, setRPassword] = useState("");
  // UI
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setErr(null);
    try {
      await login(email.trim(), password);
      router.push("/mon-espace");
    } catch (e: any) {
      setErr(e?.message ?? "Échec de connexion");
    } finally { setLoading(false); }
  };

  const submitRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setErr(null);
    try {
      await registerArtisan(companyName.trim(), rEmail.trim(), rPassword);
      router.push("/mon-espace");
    } catch (e: any) {
      setErr(e?.message ?? "Échec d'inscription");
    } finally { setLoading(false); }
  };

  return (
    <main className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Se connecter / S’inscrire</h1>

      <div className="flex gap-2 mb-4">
        <button
          className={`px-3 py-1 rounded ${tab === "login" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
          onClick={() => setTab("login")}
        >
          Connexion
        </button>
        <button
          className={`px-3 py-1 rounded ${tab === "register" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
          onClick={() => setTab("register")}
        >
          Inscription artisan
        </button>
      </div>

      {err && <p className="text-red-600 text-sm mb-3">{err}</p>}

      {tab === "login" ? (
        <form onSubmit={submitLogin} className="space-y-3 bg-white p-4 border rounded">
          <input className="w-full border rounded px-3 py-2" placeholder="Email"
                 value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input className="w-full border rounded px-3 py-2" placeholder="Mot de passe" type="password"
                 value={password} onChange={(e)=>setPassword(e.target.value)} />
          <button disabled={loading} className="w-full bg-indigo-600 text-white rounded py-2">
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      ) : (
        <form onSubmit={submitRegister} className="space-y-3 bg-white p-4 border rounded">
          <input className="w-full border rounded px-3 py-2" placeholder="Nom de l’entreprise"
                 value={companyName} onChange={(e)=>setCompanyName(e.target.value)} />
          <input className="w-full border rounded px-3 py-2" placeholder="Email"
                 value={rEmail} onChange={(e)=>setREmail(e.target.value)} />
          <input className="w-full border rounded px-3 py-2" placeholder="Mot de passe" type="password"
                 value={rPassword} onChange={(e)=>setRPassword(e.target.value)} />
          <button disabled={loading} className="w-full bg-indigo-600 text-white rounded py-2">
            {loading ? "Création..." : "Créer mon compte artisan"}
          </button>
        </form>
      )}
    </main>
  );
}
