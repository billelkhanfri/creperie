"use client";

import Link from "next/link";
import Image from "next/image";
import { HeartHandshake } from "lucide-react";
import { useEffect, useState } from "react";
import { RiHome8Line } from "react-icons/ri";
import { CiMenuKebab } from "react-icons/ci";

import { supabaseClient } from "../lib/supabase/client";

export default function Navbar() {
  const supabase = supabaseClient;
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLogged(!!data.session);
      setLoading(false);
    };
    checkSession();
  }, []);
  if (loading) return null; // évite le clignotement

  const navLinks = [
    { label: "Accueil", to: "/" },
    { label: "Activités", to: "/activities" },
    { label: "Blog", to: "/blog" },
    { label: "Partenaires", to: "/partenaires" },
    { label: "Les talents", to: "/talents" },
    { label: "Espace bénévoles", to: isLogged ? "/admin" : "/login" },
  ];

  return (
    <header className="navbar bg-base-100 shadow-sm px-4">
      {/* LEFT : Logo + Menu Mobile */}
      <div className="navbar-start gap-4">
        {/* Mobile dropdown */}
        <div className="dropdown lg:hidden">
          <button tabIndex={0} className="btn btn-ghost">
           
            <CiMenuKebab size={30} className="text-[#0432F4]"/>
          </button>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[100] mt-3 w-52 p-2 shadow"
          >
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link href={link.to} className=" hover:text-primary transition">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={40}
            style={{ height: "auto" }} // garde le ratio
          />
        </Link>
      </div>

      {/* CENTER : Desktop navigation */}
      <div className="navbar-center hidden lg:flex">
        <nav className="menu menu-horizontal px-1">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link href={link.to} className=" hover:text-primary transition">
                {link.label}
              </Link>
            </li>
          ))}
        </nav>
      </div>

      {/* RIGHT : CTA Contact */}
      <div className="navbar-end">
        <Link
          href="https://www.helloasso.com/associations/union-diaconale-du-var/formulaires/6?_ga=2.232942622.184921141.1614845505-700122102.1614674721"
          className="flex items-center gap-2 font-semibold  transition btn btn-warning rounded-lg"
        >
          <HeartHandshake size={18} />
          Faire un don
        </Link>
      </div>
    </header>
  );
}
