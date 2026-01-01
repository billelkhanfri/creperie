"use client";

import Image from "next/image";

export default function History() {
  const historyTexts = [
    "Le CAAA-Coeur de Ville-UDV, association loi 1901, a été créé en juillet 1972 par des Sœurs Blanches pour soutenir les femmes du centre-ville de Toulon.",
    "Pour répondre aux besoins d’un public en évolution, nos missions se sont orientées vers le soutien scolaire et le français langue étrangère, tout en valorisant les arts et la culture.",
    "Aujourd’hui, nous continuons à accompagner les familles et à favoriser l’intégration culturelle et sociale de tous."
  ];

  return (
    <section className="py-16 px-6  bg-base-100">
      <h2 className="text-4xl font-bold text-center mb-12 text-primary">
        Notre Histoire
      </h2>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch gap-12">
        {/* Texte à gauche */}
        <div className="lg:w-1/2 flex flex-col justify-center space-y-6">
          {historyTexts.map((text, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-4 h-4 mt-2 bg-primary rounded-full" />
              <p className="text-lg font-light leading-relaxed text-gray-700">
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* Image à droite */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <div className="relative w-full h-full rounded-2xl shadow-2xl overflow-hidden group">
            <Image
              src="/assets/histoire.webp"
              alt="Histoire CAAA"
              fill
              style={{ objectFit: "cover" }}
              className="transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-40" />
          </div>
        </div>
      </div>
    </section>
  );
}
