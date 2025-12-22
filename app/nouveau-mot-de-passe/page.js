"use client";
import { useState } from "react";
import { supabaseClient } from "../lib/supabase/client";
import { useSearchParams } from "next/navigation";

export default function NewPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const code = searchParams.get("code"); // récupère le code dans l'URL
  const supabase = supabaseClient();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!code) {
      setMessage("Code invalide.");
      return;
    }
    const { data, error } = await supabase.auth.updateUser({
      password,
      emailChangeToken: code, // ⚠️ passe le code ici
    });

    if (error) setMessage(`Erreur : ${error.message}`);
    else
      setMessage(
        "Mot de passe mis à jour ! Vous pouvez maintenant vous connecter."
      );
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 w-full max-w-sm mx-auto mt-10"
    >
      <input
        type="password"
        placeholder="Nouveau mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Changer le mot de passe
      </button>
      {message && <p className="mt-2 text-center">{message}</p>}
    </form>
  );
}
