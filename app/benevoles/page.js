"use client";

import BenevolesDashboardLayout from "../components/BenevolesDashboardLayout";

export default function BenevolesHomePage() {
  return (
    <BenevolesDashboardLayout>
      <h1 className="text-3xl font-bold mb-4">Bienvenue 👋</h1>

      <p className="mb-6">
        Vous êtes connecté à l’espace bénévoles. Utilisez le menu à gauche pour
        gérer les contenus.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold text-lg">Articles</h2>
          <p>Gérer les articles publiés</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold text-lg">Actualités</h2>
          <p>Ajouter et modifier les actualités</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold text-lg">Profil</h2>
          <p>Gérer vos informations</p>
        </div>
      </div>
    </BenevolesDashboardLayout>
  );
}
