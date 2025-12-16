"use client";

import { useEffect, useState } from "react";
import BenevolesDashboardLayout from "@/app/components/BenevolesDashboardLayout";

export default function ActualitesClient() {
  const [actualites, setActualites] = useState([]);

  useEffect(() => {
    import("@/lib/supabase/server").then(({ createSupabaseServer }) => {
      const supabase = createSupabaseServer();
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
