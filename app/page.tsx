"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function HomePage() {
  const [metier, setMetier] = useState("");
  const [localisation, setLocalisation] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qs = new URLSearchParams();
    if (metier) qs.set("metier", metier);
    if (localisation) qs.set("loc", localisation);
    window.location.href = `/recherche?${qs.toString()}`;
  };

  return (
    <main className="flex-1 bg-gray-50">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-10">
        <div>
          <div className="inline-flex items-center text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-indigo-600 mr-2" />
            Artisans vérifiés, dispo près de chez vous
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
            Trouvez un artisan fiable{" "}
            <br className="hidden md:block" />
            et réservez en ligne en 2 minutes.
          </h1>

          <p className="text-gray-600 mt-4 text-base md:text-lg">
            Plombier, électricien, chauffage, toiture… Comparez les notes
            laissées par d&apos;autres particuliers et bloquez un créneau
            instantanément.
          </p>

          {/* Search Card */}
          <div className="bg-white shadow-lg rounded-2xl p-4 md:p-6 mt-8 border">
            <form onSubmit={onSubmit} className="grid md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="text-sm text-gray-700 font-medium mb-1">
                  Quel professionnel ?
                </label>
                <input
                  value={metier}
                  onChange={(e) => setMetier(e.target.value)}
                  placeholder="Plombier, Électricien..."
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-700 font-medium mb-1">
                  Où ?
                </label>
                <input
                  value={localisation}
                  onChange={(e) => setLocalisation(e.target.value)}
                  placeholder="75018 Paris, Lyon 3..."
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 text-white font-medium px-4 py-2.5 hover:bg-indigo-700 text-sm"
                >
                  <Search className="w-4 h-4" />
                  <span>Rechercher</span>
                </button>
              </div>
            </form>

            <p className="text-xs text-gray-500 mt-3">
              Pas d&apos;engagement. Paiement uniquement après intervention.
            </p>
          </div>
        </div>

        {/* Bloc avis / stats */}
        <div className="bg-white rounded-2xl border shadow-md p-6 flex flex-col gap-6">
          <div>
            <div className="text-2xl font-semibold text-gray-900 flex items-baseline gap-2">
              4,8 / 5
              <span className="text-sm text-yellow-500">★★★★★</span>
            </div>
            <div className="text-sm text-gray-500">Basé sur 1 245 avis vérifiés</div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl border bg-gray-50">
              <div className="text-sm text-gray-900 font-medium">
                « Intervention nickel, rendez-vous dès le lendemain »
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Sophie · Fuite sous évier · Toulouse
              </div>
            </div>

            <div className="p-4 rounded-xl border bg-gray-50">
              <div className="text-sm text-gray-900 font-medium">
                « Prix clair annoncé avant, pas de mauvaise surprise »
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Karim · Panne chauffe-eau · Lyon
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-gray-50 rounded-xl p-3 border">
              <div className="text-lg font-semibold text-gray-900">+250</div>
              <div className="text-[11px] text-gray-500 leading-tight">
                Artisans vérifiés
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 border">
              <div className="text-lg font-semibold text-gray-900">24h</div>
              <div className="text-[11px] text-gray-500 leading-tight">
                Délai moyen
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 border">
              <div className="text-lg font-semibold text-gray-900">0€</div>
              <div className="text-[11px] text-gray-500 leading-tight">
                Prise de RDV
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section métiers */}
      <section className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Besoin d’un pro rapidement ?
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-sm">
            {[
              "Plombier",
              "Électricien",
              "Chauffagiste",
              "Serrurier",
              "Toiture / Couverture",
              "Rénovation intérieure",
            ].map((m) => (
              <a
                key={m}
                href={`/recherche?metier=${encodeURIComponent(m)}`}
                className="border rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-3 px-3 text-center"
              >
                {m}
              </a>
            ))}
          </div>

          <div className="text-right mt-4">
            <button className="text-sm text-indigo-600 hover:underline font-medium">
              Voir tous les métiers →
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
