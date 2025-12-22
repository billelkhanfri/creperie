
"use client";
import { supabaseClient } from "../lib/supabase/client";
import { useEffect, useState } from "react";
import ResetPassword from "../components/ResetPassword"
export default  function BenevolesHomePage() {

   const supabase = supabaseClient();
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
      <h1 className="text-3xl font-bold mb-4">
        Bienvenue <span className="text-primary">{userName || "Utilisateur"} 👋 </span>
      </h1>
<ResetPassword/>
      <p className="mb-6">
        Vous êtes connecté à l’espace admin. Utilisez le menu à gauche pour
        gérer les contenus.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold text-lg">Profil</h2>
          <p>Gérer vos informations</p>
        </div>
      </div>
    </>
  );
}
