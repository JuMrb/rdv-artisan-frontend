"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "../lib/api";
import { Search } from "lucide-react";

type ArtisanResult = {
  id: string;
  name: string;
  trades: string[];
  note?: number;
  avisCount?: number;
  radiusKm?: number | null;
  statusValidation?: string;
};

export default function SearchPage() {
  const params = useSearchParams();
  const [metier, setMetier] = useState<string>(params.get("metier") ?? "");
  const [loc, setLoc] = useState<string>(params.get("loc") ?? "");
  const [results, setResults] = useState<ArtisanResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.searchArtisans(metier.trim().toLowerCase());
      setResults(Array.isArray(data) ? data : []);
    } catch (e: any) {
      setError(e?.message ?? "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  // 1er chargement
  useEffect(() => {
    if (metier) runSearch();
  }, []); // eslint-disable-line

  // submit du mini-form sur la page résultats
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const qs = new URLSearchParams();
    if (metier) qs.set("metier", metier);
    if (loc) qs.set("loc", loc);
    window.history.replaceState({}, "", `/recherche?${qs.toString()}`);
    runSearch();
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Résultats</h1>

      <form onSubmit={submit} className="grid md:grid-cols-3 gap-3 mb-6">
        <input
          value={metier}
          onChange={(e) => setMetier(e.target.value)}
          placeholder="Quel pro ? (ex: plombier)"
          className="rounded-lg border px-3 py-2 text-sm"
        />
        <input
          value={loc}
          onChange={(e) => setLoc(e.target.value)}
          placeholder="Où ? (optionnel)"
          className="rounded-lg border px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 text-white font-medium px-4 py-2.5 hover:bg-indigo-700 text-sm"
        >
          <Search className="w-4 h-4" />
          Relancer la recherche
        </button>
      </form>

      {loading && <p>Recherche en cours…</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && results.length === 0 && (
        <p className="text-gray-500">Aucun artisan trouvé.</p>
      )}

      <div className="grid gap-4">
        {results.map((a) => (
          <div key={a.id} className="p-4 border rounded-lg bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{a.name}</h3>
              {a.statusValidation === "APPROVED" && (
                <span className="text-xs text-green-700 bg-green-50 border border-green-200 px-2 py-1 rounded">
                  Vérifié ✅
                </span>
              )}
            </div>
            <p className="text-gray-600 text-sm mt-1">
              {a.trades?.join(", ") || "Métiers non précisés"}
            </p>
            <div className="text-sm text-gray-600 mt-2 flex gap-4">
              <span>⭐ {a.note ?? "—"} ({a.avisCount ?? 0} avis)</span>
              <span>Rayon : {a.radiusKm ?? "?"} km</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
