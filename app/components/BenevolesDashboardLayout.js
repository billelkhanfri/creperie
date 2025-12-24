"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabaseClient } from "../lib/supabase/client";
import Link from "next/link";

export default function BenevolesDashboardLayout({ children }) {
  const supabase = supabaseClient();
  const router = useRouter();
  const pathname = usePathname();


 

 

  return (
    <>
      <aside className="w-64 bg-secondary h-screen text-white flex flex-col justify-between">
        <div>
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
            <Link
              href="/admin/evenements"
              className={`p-2 rounded ${
                pathname === "/admin/evenements"
                  ? "bg-primary"
                  : "hover:bg-neutral"
              }`}
            >
              Evénements
            </Link>
          </nav>
        </div>

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

      <main>{children}</main>
    </>
  );
}
