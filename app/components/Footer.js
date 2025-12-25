"use client";

import Link from "next/link";
import { Phone, MapPin, Mail } from "lucide-react";

const contactItems = [
  {
    icon: <MapPin className="w-5 h-5" />,
    text: "Traverse des Capucins, 83000 Toulon",
    href: "https://maps.app.goo.gl/VYiYVHZ5x4pX1RqA7",
  },
  {
    icon: <Phone className="w-5 h-5" />,
    text: "04 94 62 07 67",
    href: "tel:0494620767",
  },
  {
    icon: <Phone className="w-5 h-5" />,
    text: "06 95 53 81 26",
    href: "tel:0695538126",
  },
  {
    icon: <Mail className="w-5 h-5" />,
    text: "caaa.asso@gmail.com",
    href: "mailto:caaa.asso@gmail.com",
  },
];

const socialLinks = [
  {
    href: "https://www.facebook.com/p/CAAA-Toulon-100067025841795/",
    label: "Facebook",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M9 8H6v4h3v12h5V12h3.6L18 8h-4V6c0-.95.19-1.33 1.1-1.33H18V0h-3.8C10.6 0 9 1.58 9 4.6V8z" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/caaacoeurdeville/",
    label: "Instagram",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37a4 4 0 11-7.74 1.27 4 4 0 017.74-1.27z" />
        <circle cx="17.5" cy="6.5" r="1.5" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (


    <footer className="bg-gradient-to-t from-blue-700 to-blue-600 max-w-7xl w-full mx-auto text-white p-6">

      <div className="container mx-auto grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">
            Association CAAA – Cœur de Ville
          </h2>
          <p className="text-sm opacity-80">
            Soutenir, accompagner et intégrer par la langue et les activités
            sociales.
          </p>
          <p className="text-xs opacity-70">
            © {new Date().getFullYear()} – Tous droits réservés
          </p>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contact</h3>
          {contactItems.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              {item.icon}

              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {item.text}
                </a>
              ) : (
                <p>{item.text}</p>
              )}
            </div>
          ))}
        </div>

        {/* Social */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Suivez-nous</h3>
          <div className="flex gap-5">
            {socialLinks.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="hover:scale-110 transition"
                aria-label={item.label}
              >
                {item.svg}
              </Link>
            ))}
          </div>
        </div>

        {/* Google Map */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Nous trouver</h3>
          <div className="rounded-xl overflow-hidden shadow-lg border border-white/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2899.467422648823!2d5.93016051571863!3d43.125160479142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c92a3372784b05%3A0x7e2f44d7084ff1cd!2sTraverse%20des%20Capucins%2C%2083000%20Toulon!5e0!3m2!1sfr!2sfr!4v1700000000000"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </footer>
  );
}
