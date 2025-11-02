"use client";

import { useState } from "react";
import { api } from "./lib/api";

type ArtisanResult = {
  id: string;
  name: string | null;
  trades: string[];
  note: number;
  avisCount: number;
  radiusKm: number | null;
  statusValidation: string;
};

export default function HomePage() {
  const [metier, setMetier] = useState("");
  const [loading, setLoading] = useState(false);
  const [artisans, setArtisans] = useState<ArtisanResult[] | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await api.searchArtisans(metier);
      setArtisans(res);
    } catch (err: any) {
      setErrorMsg(err.message || "Erreur de recherche");
      setArtisans([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      {/* HEADER HERO */}
      <section className="w-full max-w-3xl text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Trouver un artisan qualifié près de chez vous
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Plomberie, électricité, chauffage, serrurerie... Prenez rendez-vous
          en ligne en quelques clics.
        </p>
      </section>

      {/* BARRE DE RECHERCHE */}
      <section className="w-full max-w-3xl bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-8">
        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-4 md:flex-row md:items-end"
        >
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Quel type d'artisan recherchez-vous ?
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Ex : Plombier, Électricien..."
              value={metier}
              onChange={(e) => setMetier(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg px-4 py-2 disabled:opacity-50"
          >
            {loading ? "Recherche..." : "Rechercher"}
          </button>
        </form>

        {errorMsg && (
          <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg p-2 mt-4">
            {errorMsg}
          </div>
        )}
      </section>

      {/* RÉSULTATS */}
      <section className="w-full max-w-3xl">
        {artisans === null ? (
          // état initial : pas de recherche encore
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 text-sm text-gray-700">
            <h2 className="text-base font-semibold text-gray-900 mb-2">
              Comment ça marche ?
            </h2>
            <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
              <li>Vous cherchez un artisan (ex: « plombier »).</li>
              <li>Vous choisissez un pro bien noté.</li>
              <li>Vous prenez un créneau en ligne.</li>
              <li>Le pro confirme le rendez-vous 🔒.</li>
            </ol>
            <p className="text-[11px] text-gray-500 mt-4">
              Tous les artisans sont vérifiés manuellement avant d’apparaître.
            </p>
          </div>
        ) : artisans.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 text-center text-sm text-gray-600">
            Aucun artisan trouvé pour « {metier} ».
          </div>
        ) : (
          <ul className="space-y-4">
            {artisans.map((a) => (
              <li
                key={a.id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col md:flex-row md:items-start"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold text-gray-900">
                      {a.name || "Artisan"}
                    </div>
                    {a.statusValidation === "APPROVED" && (
                      <span className="text-[10px] font-medium text-green-700 bg-green-100 border border-green-200 rounded px-2 py-[2px]">
                        Vérifié ✅
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-gray-600 mt-1">
                    {a.trades && a.trades.length > 0
                      ? a.trades.join(" • ")
                      : "Métier non renseigné"}
                  </div>

                  <div className="text-[11px] text-gray-500 mt-2 flex flex-wrap gap-3">
                    <span>
                      ⭐ {a.note.toFixed(1)} ({a.avisCount} avis)
                    </span>
                    {a.radiusKm != null && (
                      <span>Intervention ~ {a.radiusKm} km</span>
                    )}
                  </div>
                </div>

                <div className="mt-4 md:mt-0">
                  <a
                    href={`#`}
                    className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg px-3 py-2 inline-block"
                  >
                    Voir le profil
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* FOOTER */}
      <footer className="text-[11px] text-gray-400 mt-12 mb-8 text-center">
        © {new Date().getFullYear()} RDV Artisan – Tous droits réservés.
      </footer>
    </main>
  );
}
