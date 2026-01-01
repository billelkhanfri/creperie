"use client";

import { useEffect, useState } from "react";
import { supabaseClient } from "../lib/supabase/client";
import SidebarEventsClient from "./SidebarEventsClient";

export default function SidebarActualite() {
  // Stocke la liste des événements
  const [events, setEvents] = useState([]);

  // Gère l’état de chargement
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      /*
        👉 On récupère TOUS les événements
        (passés + futurs)
      */
      const { data, error } = await supabaseClient()
        .from("evenements")
        .select("id, title, date")
        .order("date", { ascending: true }); // tri du plus ancien au plus récent

      if (error) {
        console.error("Supabase error:", error);
      } else {
        setEvents(data || []);
      }

      setLoading(false);
    }

    fetchEvents();
  }, []);

  // Optionnel : loader
  if (loading) {
    return <p className="text-sm text-gray-400">Chargement…</p>;
  }

  return <SidebarEventsClient events={events} />;
}
