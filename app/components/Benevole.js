import React from "react";
import CountUpClient from "./CountUp"; // importe le compteur client

const data = [
  {
    icon: "👥",
    color: "bg-primary",
    title: " Adhérents",
    number: 250,
    subtitle: "Chaque année, d'une soixantaine de nationalités différentes",
    description:
      "Le CAAA fait partie des associations qui ont créé l’UNION DIACONALE DU VAR.",
  },
  {
    icon: "🤝",
    color: "bg-secondary",
    title: " Bénévoles",
    number: 40,
    subtitle: "Assurent le suivi et l’enseignement des adhérents",
    description:
      "Nous valorisons l’engagement, la diversité et le partage culturel et éducatif.",
  },
];

export default function Benevole() {
  const now = new Date();
  const month = now.toLocaleString("fr-FR", { month: "long" });
  const year = now.getFullYear();

  return (
    <section className="py-20 px-6  bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-12 text-primary">
        Adhérents & Bénévoles
      </h2>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto">
        {data.map((item, index) => (
          <div
            key={index}
            className={`bg-white shadow-xl rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col justify-between hover:scale-[1.03] transition-all`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <div className="text-5xl sm:text-6xl">{item.icon}</div>
              <div>
                <div className="text-gray-400 text-sm uppercase">{month}</div>
                <div className={`text-2xl sm:text-3xl font-bold text-primary`}>
                  <CountUpClient number={item.number} />
                  {item.title}
                </div>
                <div className="text-gray-400 text-sm">{year}</div>
              </div>
            </div>

            <p className="text-gray-600 text-base sm:text-lg mt-4">
              {item.subtitle}
            </p>

            <div
              role="alert"
              className={`alert mt-6 ${item.color} text-white shadow-lg flex items-center gap-4 p-4 rounded-xl`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-medium text-sm sm:text-base">
                {item.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
