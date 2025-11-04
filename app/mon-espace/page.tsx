"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function MonEspace() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  if (loading || !user) return <main className="p-6">Chargement...</main>;

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Mon espace</h1>
      <p className="text-gray-700">Bienvenue {user.companyName || user.email}.</p>
      <div className="mt-4">
        <button onClick={logout} className="bg-gray-200 rounded px-3 py-1">
          Se déconnecter
        </button>
      </div>
    </main>
  );
}
