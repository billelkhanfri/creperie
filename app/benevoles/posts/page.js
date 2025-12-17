"use client";

import { useEffect, useState } from "react";
import { supabaseClient } from "../../lib/supabase/client";
import BenevolesDashboardLayout from "../../components/BenevolesDashboardLayout";

export default function BenevolesPosts() {
  const supabase = supabaseClient;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <BenevolesDashboardLayout>
      <h1 className="text-3xl font-bold mb-4">Articles / Actualités</h1>
      {posts.length === 0 ? (
        <p>Aucun article disponible pour le moment.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="p-4 bg-white rounded shadow">
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      )}
    </BenevolesDashboardLayout>
  );
}
