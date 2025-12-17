"use client";

import { useEffect, useState } from "react";
import BenevolesDashboardLayout from "../../components/BenevolesDashboardLayout";
import { supabaseClient } from "../../lib/supabase/client";

export default function ActualitesClient() {
  const [actualites, setActualites] = useState([]);

  useEffect(() => {
  const supabase = supabaseClient;}
);

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
