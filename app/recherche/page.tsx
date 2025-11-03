"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "../lib/api";

export default function RecherchePage() {
  const params = useSearchParams();
  const metier = params.get("metier") || "";
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.searchArtisans(metier);
        setResults(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [metier]);

  if (loading) return <main className="p-6">Chargement...</main>;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Résultats pour : <span className="text-indigo-600">{metier}</span>
      </h1>

      {results.length === 0 ? (
        <p>Aucun artisan trouvé.</p>
      ) : (
        <ul className="space-y-4">
          {results.map((a) => (
            <li key={a.id} className="p-4 border rounded-lg bg-white shadow">
              <div className="font-semibold">{a.name}</div>
              <div className="text-sm text-gray-600">
                {a.trades?.join(", ")}
              </div>
              <div className="text-sm mt-1">⭐ {a.note ?? "-"} ({a.avisCount ?? 0} avis)</div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
