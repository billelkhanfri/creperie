import React from "react";
import Image from "next/image";

const missions = [
  {
    title: "Entraide & Intégration",
    text: "Animer et gérer les initiatives qui favorisent l’entraide et l’intégration.",
    img: "/assets/entraides.jpg",
    newLabel: "",
  },
  {
    title: "Lien social",
    text: "Contribuer au renforcement du lien social et de la citoyenneté.",
    img: "/assets/lien.jpg",
    newLabel: "nouveau (example)",
  },
  {
    title: "Formation & Culture",
    text: "Favoriser la formation et le développement culturel des enfants et des adultes.",
    img: "/assets/formation.jpg",
    newLabel: "",
  },
  {
    title: "Accompagnement",
    text: "Accompagner les familles dans leurs projets de vie.",
    img: "/assets/accompagnement.jpg",
    newLabel: "",
  },
];

function MissionCard({ title, text, img, newLabel }) {
  return (
    <div className="card rounded-xl bg-base-100 w-full max-w-xs shadow-sm h-full flex flex-col">
      <figure className="h-48 overflow-hidden">
        <Image
          src={img}
          className="w-full h-full object-cover"
          alt={title}
          width={400}
          height={200}
        />
      </figure>

      <div className="card-body flex flex-col flex-grow">
        <h2 className="card-title">{title}</h2>

        {newLabel && <div className="badge badge-secondary">{newLabel}</div>}

        <p className="flex-grow">{text}</p>
      </div>
    </div>
  );
}


export default function Missions() {
  return (
    <section className="py-16 bg-gray-100">
            <h2 className="text-4xl font-bold text-center mb-12 text-primary">

     Nos Missions</h2>

      {/* ⭐ Responsive container */}
      <div className="container mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          {missions.map((m) => (
            <MissionCard key={m.title} {...m} />
          ))}
        </div>
      </div>
    </section>
  );
}
