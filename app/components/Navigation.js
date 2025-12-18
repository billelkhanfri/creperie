"use client";

import Link from "next/link";
import Image from "next/image";
import { HeartHandshake } from "lucide-react";

const navLinks = [
  { label: "Accueil", to: "/" },
  { label: "Activités", to: "/activities" },
  { label: "Blog", to: "/blog" },
  { label: "Partenaires", to: "/partenaires" },
  { label: "Les talents", to: "/talents" },
  { label: "Espace bénévoles", to: "/login" },
];

export default function Navbar() {
  return (
    <header className="navbar bg-base-100 shadow-sm px-4">
      {/* LEFT : Logo + Menu Mobile */}
      <div className="navbar-start">
        {/* Mobile dropdown */}
        <div className="dropdown lg:hidden">
          <button tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
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
