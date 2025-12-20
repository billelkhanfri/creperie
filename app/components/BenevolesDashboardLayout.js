"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabaseClient } from "../lib/supabase/client";
import Link from "next/link";

export default function BenevolesDashboardLayout({ children }) {
  const supabase = supabaseClient;
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data?.session) router.push("/admin/login");
      else setLoading(false);
    };
    checkSession();
  }, [router]);

  if (loading) return <p className="p-8">Chargement...</p>;

  return (
    <>
      <aside className="w-64 bg-secondary text-white">
      

        <nav className="p-4 flex flex-col gap-2">
          <Link
            href="/admin"
            className={`p-2 rounded ${
              pathname === "/admin" ? "bg-primary" : "hover:bg-neutral"
            }`}
          >
            Accueil
          </Link>

          <Link
            href="/admin/posts"
            className={`p-2 rounded ${
              pathname === "/admin/posts" ? "bg-primary" : "hover:bg-neutral"
            }`}
          >
            Articles
          </Link>

          <Link
            href="/admin/actualites"
            className={`p-2 rounded ${
              pathname === "/admin/actualites"
                ? "bg-primary"
                : "hover:bg-neutral"
            }`}
          >
            Actualités
          </Link>
        </nav>

        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.push("/login");
          }}
          className="m-4 bg-accent hover:bg-red-600 p-2 rounded"
        >
          Déconnexion
        </button>
      </aside>
    </>
  );
}

<aside className="w-64 bg-base-100 shadow">
  <ul className="menu p-4">
    <li>
      <Link href="/admin">Dashboard</Link>
    </li>
    <li>
      <Link href="/admin/posts">Posts</Link>
    </li>
    <li>
      <Link href="/admin/actualites">Actualités</Link>
    </li>
  </ul>
</aside>;
