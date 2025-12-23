"use client";

import { useState } from "react";
import { supabaseClient } from "../lib/supabase/client";

export default function ForgotPassword() {
  const supabase = supabaseClient();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://caaa-theta.vercel.app/nouveau-mot-de-passe",
    });

    if (error) {
      setStatus("error");
      setMessage("Erreur lors de l’envoi. Vérifie l’adresse email.");
    } else {
      setStatus("success");
      setMessage(
        "📩 Email envoyé ! Vérifie ta boîte mail et clique sur le lien pour définir un nouveau mot de passe."
      );
      setEmail("");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-sm w-full">
      <h3 className="font-semibold text-lg mb-2">Mot de passe</h3>
      <p className="text-sm text-gray-500 mb-4">
        Un lien de réinitialisation sera envoyé par email.
      </p>

      {/* FORMULAIRE */}
      {status !== "success" && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === "loading"}
            className="border rounded px-3 py-2 focus:outline-none focus:ring"
          />

          <button
            type="submit"
            disabled={status === "loading"}
            className={`rounded py-2 text-white transition ${
              status === "loading"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {status === "loading"
              ? "Envoi en cours..."
              : "Réinitialiser le mot de passe"}
          </button>
        </form>
      )}

      {/* MESSAGE */}
      {message && (
        <p
          className={`mt-4 text-sm ${
            status === "error" ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
