"use client";

import { useState } from "react";
import { supabaseClient } from "../lib/supabase/client";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const supabase = supabaseClient();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // reset message

    const { data, error } = await supabase.auth.resetPasswordForEmail(
      email,

      {
        redirectTo: "https://caaa-theta.vercel.app/nouveau-mot-de-passe",
      }
    );

    if (error) {
      setMessage(`Erreur : ${error.message}`);
      console.error(error);
    } else {
      setMessage(
        "Email de réinitialisation envoyé ! Vérifie ta boîte mail et clique sur le lien."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 w-full max-w-sm mx-auto mt-10"
    >
      <input
        type="email"
        placeholder="Ton email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Réinitialiser le mot de passe
      </button>
      {message && <p className="mt-2 text-center">{message}</p>}
    </form>
  );
}
