export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 text-sm mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <div className="text-white font-semibold mb-3 text-sm">
            Rendez-vous Bâtiment
          </div>
          <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
            Mise en relation simple, artisans vérifiés, avis authentiques.
            On vous évite les mauvaises surprises.
          </p>
        </div>
        <div>
          <div className="text-white font-medium mb-3 text-sm">Particuliers</div>
          <ul className="space-y-2 text-xs">
            <li>Rechercher un artisan</li>
            <li>Comment ça marche</li>
            <li>Questions fréquentes</li>
          </ul>
        </div>
        <div>
          <div className="text-white font-medium mb-3 text-sm">Artisans</div>
          <ul className="space-y-2 text-xs">
            <li>Devenir partenaire</li>
            <li>Recevoir des demandes</li>
            <li>Connexion pro</li>
          </ul>
        </div>
      </div>
      <div className="text-[11px] text-gray-500 border-t border-gray-800 py-4 text-center">
        © 2025 Rendez-vous Bâtiment — Tous droits réservés
      </div>
    </footer>
  );
}
