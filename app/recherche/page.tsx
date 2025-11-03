"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "../lib/api";

function ResultsInner() {
  const params = useSearchParams(); // <-- OK car dans un <Suspense>
  const metier = params.get("metier") || "";

  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
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
    }
    if (metier) load();
    else {
      setResults([]);
      setLoading(false);
    }
  }, [metier]);

  if (loading) return <main className="p-6">Chargement…</main>;
  if (error) return <main className="p-6 text-red-600">{error}</main>;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Résultats {metier ? <>pour : <span className="text-indigo-600">{metier}</span></> : null}
      </h1>

      {results.length === 0 ? (
        <p>Aucun artisan trouvé.</p>
      ) : (
        <ul className="space-y-4">
          {results.map((a) => (
            <li key={a.id} className="p-4 border rounded-lg bg-white shadow">
              <div className="font-semibold">{a.name}</div>
              <div className="text-sm text-gray-600">{a.trades?.join(", ")}</div>
              <div className="text-sm mt-1">
                ⭐ {a.note ?? "-"} ({a.avisCount ?? 0} avis)
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default function RecherchePage() {
  return (
    <Suspense fallback={<main className="p-6">Chargement…</main>}>
      <ResultsInner />
    </Suspense>
  );
}
