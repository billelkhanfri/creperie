"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "../../lib/supabase/client";

export default function BenevolesLogin() {
  const supabase = supabaseClient;
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!supabase) {
    return <div>Configuration Supabase manquante</div>;
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/benevoles");
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
          space-y-6
        "
      >
        <h1 className="text-2xl md:text-3xl font-bold text-center">
          Connexion Bénévole
        </h1>

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

        <button type="submit" className="btn btn-primary w-full text-base">
          Se connecter
        </button>
      </form>
    </div>
  );
}
