"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

// en haut du composant, juste avant le return (ou directement inline)
const displayName =
  user?.fullName || user?.companyName || user?.email || "Utilisateur";

const roleLabel =
  user?.role === "ARTISAN"
    ? "Artisan"
    : user?.role === "ADMIN"
    ? "Admin"
    : "Particulier";


  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-white bg-indigo-600 font-bold text-lg w-10 h-10 flex items-center justify-center rounded-lg">
            RB
          </div>
          <div className="font-semibold text-gray-900 leading-tight text-sm">
            Rendez-vous
            <br />
            Bâtiment
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <Link className="hover:text-gray-900" href="/recherche">
            Trouver un artisan
          </Link>
          <Link className="hover:text-gray-900" href="/inscription/artisan">
            Pro ? Inscription
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-gray-900 font-medium leading-tight text-sm">
                  {displayName}
                </div>
                <div className="text-[11px] text-gray-500 leading-tight">
                  {roleLabel}
                </div>

                <Link
                  href={user.role === "admin" ? "/admin" : "/mon-espace"}
                  className="text-[11px] text-indigo-600 font-medium hover:underline"
                >
                  Mon espace
                </Link>
              </div>

              <button
                onClick={logout}
                className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 text-xs hover:bg-gray-50"
              >
                Déconnexion
              </button>
            </div>
          ) : (
            <Link
              className="px-3 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700"
              href="/login"
            >
              Se connecter
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
