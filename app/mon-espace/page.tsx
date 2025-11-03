"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  if (loading || !user) return null;

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">
          Bonjour {user.companyName || user.email}
        </h1>
        <button
          onClick={logout}
          className="text-sm text-red-600 border border-red-200 px-3 py-1.5 rounded hover:bg-red-50"
        >
          Déconnexion
        </button>
      </div>

      <div className="grid gap-4">
        <section className="border rounded p-4 bg-white">
          <h2 className="font-semibold mb-2">Mes infos</h2>
          <p>Email : {user.email}</p>
          <p>Rôle : {user.role}</p>
        </section>

        <section className="border rounded p-4 bg-white">
          <h2 className="font-semibold mb-2">Prochaines étapes</h2>
          <ul className="list-disc pl-5 text-sm text-gray-700">
            <li>Compléter la fiche artisan (métiers, rayon, assurances, etc.).</li>
            <li>Ouvrir des créneaux de disponibilité.</li>
            <li>Activer la prise de rendez-vous.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
