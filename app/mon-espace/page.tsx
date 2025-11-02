"use client";

import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Clock, CheckCircle, XCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";

// Petit badge statut pour les rendez-vous
function StatutBadge({ statut }: { statut: string }) {
  if (statut === "PENDING") {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-full px-2 py-0.5">
        <Clock className="w-3 h-3" /> En attente
      </span>
    );
  }
  if (statut === "ACCEPTED") {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-green-50 text-green-700 border border-green-200 rounded-full px-2 py-0.5">
        <CheckCircle className="w-3 h-3" /> Confirmé
      </span>
    );
  }
  if (statut === "REFUSED") {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-red-50 text-red-600 border border-red-200 rounded-full px-2 py-0.5">
        <XCircle className="w-3 h-3" /> Refusé
      </span>
    );
  }
  return null;
}

export default function MonEspacePage() {
  const { user } = useAuth();

  // Ces données sont simulées pour la maquette :
  const rdvClientMock = [
    {
      id: "rdv1",
      artisanName: "Plomberie Durand",
      date: "Mardi 4 février 2025",
      heure: "09:30",
      adresse: "12 rue des Fleurs, Toulouse",
      statut: "PENDING", // en attente d'acceptation par l'artisan
    },
    {
      id: "rdv2",
      artisanName: "Éco-Chauffe Services",
      date: "Jeudi 6 février 2025",
      heure: "14:00",
      adresse: "12 rue des Fleurs, Toulouse",
      statut: "ACCEPTED",
    },
  ];

  const interventionsArtisanMock = [
    {
      id: "job1",
      clientName: "Sophie Martin",
      date: "Mardi 4 février 2025",
      heure: "09:30",
      adresse: "12 rue des Fleurs, Toulouse",
      description: "Fuite sous évier depuis ce matin. Eau coupée.",
      statut: "PENDING",
    },
    {
      id: "job2",
      clientName: "Karim B.",
      date: "Jeudi 6 février 2025",
      heure: "14:00",
      adresse: "9 rue du Parc, Toulouse",
      description: "Plus d'eau chaude. Chauffe-eau à vérifier.",
      statut: "ACCEPTED",
    },
  ];

  // ⚠ Cas 1 : personne pas connectée
  if (!user) {
    return (
      <main className="bg-gray-50 min-h-screen flex justify-center p-4 md:p-8 w-full">
        <div className="w-full max-w-sm bg-white rounded-xl border shadow-sm p-6 text-center space-y-4">
          <div className="text-sm font-semibold text-gray-900">Mon espace</div>
          <div className="text-xs text-gray-600">
            Connectez-vous pour voir vos rendez-vous.
          </div>
          <Link
            href="/login"
            className="inline-block w-full text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg py-2"
          >
            Se connecter
          </Link>
          <div className="text-[11px] text-gray-500 leading-relaxed">
            Pas encore de compte ? Créez un compte particulier ou artisan.
          </div>
        </div>
      </main>
    );
  }

  // ⚠ Cas 2 : vue CLIENT / PARTICULIER
  if (user.role === "client") {
    return (
      <main className="bg-gray-50 min-h-screen flex justify-center p-4 md:p-8 w-full">
        <div className="w-full max-w-2xl space-y-6">
          {/* header */}
          <div className="bg-white border rounded-xl shadow-sm p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-gray-900">
                Bonjour {user.name}
              </div>
              <div className="text-xs text-gray-600">
                Voici vos rendez-vous à venir
              </div>
            </div>
            <Link
              href="/recherche"
              className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg px-4 py-2 text-center"
            >
              Prendre un nouveau rendez-vous
            </Link>
          </div>

          {/* liste rendez-vous */}
          <div className="bg-white border rounded-xl shadow-sm p-5">
            <div className="text-sm font-semibold text-gray-900 mb-4">
              Mes rendez-vous
            </div>

            <div className="space-y-4">
              {rdvClientMock.map((rdv) => (
                <div
                  key={rdv.id}
                  className="border rounded-lg p-4 bg-gray-50 text-sm text-gray-700"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="font-medium text-gray-900">
                      {rdv.artisanName}
                    </div>
                    <StatutBadge statut={rdv.statut} />
                  </div>

                  <div className="text-xs text-gray-600 mt-2">
                    {rdv.date} · {rdv.heure}
                  </div>
                  <div className="text-[11px] text-gray-500">{rdv.adresse}</div>

                  {rdv.statut === "ACCEPTED" && (
                    <div className="text-[11px] text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2 mt-3">
                      Rendez-vous confirmé par l&apos;artisan. Vous recevrez un
                      rappel la veille.
                    </div>
                  )}

                  {rdv.statut === "PENDING" && (
                    <div className="text-[11px] text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 mt-3">
                      En attente de validation. L&apos;artisan peut encore
                      ajuster l&apos;horaire.
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-[11px] text-gray-500 text-center mt-4 leading-relaxed">
              Vous pourrez laisser un avis après l&apos;intervention.
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ⚠ Cas 3 : vue ARTISAN
  if (user.role === "artisan") {
    return (
      <main className="bg-gray-50 min-h-screen flex justify-center p-4 md:p-8 w-full">
        <div className="w-full max-w-3xl space-y-6">
          {/* Header artisan */}
          <div className="bg-white border rounded-xl shadow-sm p-5 flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <div className="font-semibold text-gray-900">
                Bonjour {user.name}
              </div>

              {user.statusValidation === "PENDING" && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-full px-2 py-0.5">
                  <ShieldCheck className="w-3 h-3" />
                  Profil en validation
                </span>
              )}

              {user.statusValidation === "APPROVED" && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-green-50 text-green-700 border border-green-200 rounded-full px-2 py-0.5">
                  <ShieldCheck className="w-3 h-3" />
                  Profil approuvé
                </span>
              )}
            </div>

            <div className="text-xs text-gray-600">
              Voici vos interventions à venir. Vous pouvez accepter ou refuser.
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <Link
                href="/artisan/1"
                className="px-3 py-1.5 rounded-lg border bg-white hover:bg-gray-50"
              >
                Voir ma fiche publique
              </Link>
              <button className="px-3 py-1.5 rounded-lg border bg-white hover:bg-gray-50">
                Gérer mes créneaux
              </button>
            </div>
          </div>

          {/* Interventions */}
          <div className="bg-white border rounded-xl shadow-sm p-5">
            <div className="text-sm font-semibold text-gray-900 mb-4">
              Demandes de rendez-vous / Interventions à venir
            </div>

            <div className="space-y-4">
              {interventionsArtisanMock.map((job) => (
                <div
                  key={job.id}
                  className="border rounded-lg p-4 bg-gray-50 text-sm text-gray-700"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="font-medium text-gray-900">
                      {job.clientName}
                    </div>
                    <StatutBadge statut={job.statut} />
                  </div>

                  <div className="text-xs text-gray-600 mt-2">
                    {job.date} · {job.heure}
                  </div>
                  <div className="text-[11px] text-gray-500">{job.adresse}</div>

                  <div className="text-[11px] text-gray-700 bg-white border border-gray-200 rounded-lg px-3 py-2 mt-3 leading-relaxed">
                    {job.description}
                  </div>

                  {job.statut === "PENDING" && (
                    <div className="flex flex-wrap gap-2 mt-3 text-xs">
                      <button className="rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium px-3 py-1.5">
                        Accepter
                      </button>
                      <button className="rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium px-3 py-1.5">
                        Refuser
                      </button>
                      <button className="rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium px-3 py-1.5">
                        Proposer autre horaire
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-[11px] text-gray-500 text-center mt-4 leading-relaxed">
              Quand vous marquez une intervention comme "terminée", le
              client pourra laisser un avis. Ces avis alimentent votre note
              publique.
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ⚠ Cas 4 : admin (on fera la vraie page /admin plus tard)
  return (
    <main className="bg-gray-50 min-h-screen flex justify-center p-4 md:p-8 w-full">
      <div className="w-full max-w-sm bg-white rounded-xl border shadow-sm p-6 text-center space-y-4">
        <div className="text-sm font-semibold text-gray-900">Mon espace</div>
        <div className="text-xs text-gray-600">
          Rôle non pris en charge ici.
        </div>
      </div>
    </main>
  );
}
