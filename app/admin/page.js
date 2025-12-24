
"use client";
import { supabaseClient } from "../lib/supabase/client";
import { useEffect, useState } from "react";
import ResetPassword from "../components/ResetPassword"
export default  function BenevolesHomePage() {

   const supabase =  supabaseClient();
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

useEffect(() => {
  const fetchUserProfile = async () => {
    const { data: sessionData } = await supabase.auth.getSession();

    if (!sessionData?.session) {
      router.push("/admin/login");
      return;
    }

    const userId = sessionData.session.user.id;

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("first_name")
      .eq("id", userId)
      .maybeSingle();

    if (error) console.error("Error fetching profile:", error);
    setUserName(profile?.first_name || "Utilisateur");

    if (error) {
      console.error("Error fetching profile:", error);
    } else if (profile) {
      setUserName(profile.first_name); // vérifie que profile existe
    }

    setLoading(false);
  };

  fetchUserProfile();
}, []);

if (loading) return <p className="p-8">Chargement...</p>;


  return (
    <>
      <h1 className="text-3xl font-bold mb-2">
        Bienvenue <span className="text-primary">{userName} 👋</span>
      </h1>

      <p className="mb-8 text-gray-600">
        Vous êtes connecté à l’espace admin. Gérez vos informations et la
        sécurité de votre compte.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 🧍 Carte Profil */}
        <div className="bg-white rounded-xl shadow p-6 space-y-6">
          {/* Infos */}
          <div>
            <h2 className="text-xl font-semibold">Profil</h2>
            <p className="text-gray-500 text-sm">Informations personnelles</p>

            <div className="mt-4">
              <p className="text-sm text-gray-600">Prénom</p>
              <p className="font-medium">{userName}</p>
            </div>
          </div>

          {/* Séparateur */}
          <div className="border-t pt-4" />

          {/* 🔐 Sécurité */}
          <div>
            <h3 className="font-semibold text-lg">Sécurité</h3>
            <p className="text-sm text-gray-500 mb-4">
              Modifier ou réinitialiser votre mot de passe
            </p>

            <ResetPassword />
          </div>
        </div>
      </div>
    </>
  );

}
