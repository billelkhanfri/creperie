"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "../lib/supabase/client.js";

export default function BenevolesLogin() {
  const supabase = supabaseClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // ← état pour le message d'erreur

  if (!supabase) {
    return <div>Configuration Supabase manquante</div>;
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Traduction simple des erreurs les plus courantes
      if (error.message.includes("Invalid login credentials")) {
        setErrorMessage("Email ou mot de passe incorrect");
      } else if (error.message.includes("email")) {
        setErrorMessage("Email invalide");
      } else if (error.message.includes("password")) {
        setErrorMessage("Mot de passe invalide");
      } else {
        setErrorMessage(error.message); // sinon, affiche le message brut
      }
      return;
    }

    // Si connexion réussie
    setErrorMessage("");
    router.push("/admin");
  };

  return (
    <div className="h-[60vh] flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="
          w-full
          max-w-sm
          md:max-w-md
          bg-white
          p-6
          md:p-10
          rounded-2xl
          shadow
          md:shadow-lg
          space-y-4
        "
      >
        <h1 className="text-xl font-bold text-center">Admin CAAA</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full"
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered w-full"
          required
        />

        {errorMessage && (
          <p className="text-red-500 text-sm text-center">{errorMessage}</p>
        )}

        <button type="submit" className="btn btn-primary w-full text-base">
          Se connecter
        </button>
      </form>
    </div>
  );
}
