"use client";

import { useEffect, useState } from "react";
import BenevolesDashboardLayout from "@/app/components/BenevolesDashboardLayout";

export default function ActualitesPage() {
  const [actualites, setActualites] = useState([]);

  useEffect(() => {
    // import dynamique côté client uniquement
    import("@/app/lib/supabase").then(({ getSupabase }) => {
      const supabase = getSupabase();

      supabase
        .from("actualites")
        .select("*")
        .order("created_at", { ascending: false })
        .then(({ data }) => setActualites(data));
    });
  }, []);

  return (
    <BenevolesDashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Actualités</h1>

      {actualites.map((a) => (
        <div key={a.id} className="bg-white p-4 rounded shadow mb-4">
          <h2 className="text-xl font-bold">{a.title}</h2>
          <p>{a.content}</p>
        </div>
      ))}
    </BenevolesDashboardLayout>
  );
}
