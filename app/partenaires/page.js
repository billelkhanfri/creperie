import Image from "next/image";

const partenaires = [
  { name: "Partenaire 1", logo: "/assets/partenaires/p1.avif" },
  { name: "Partenaire 2", logo: "/assets/partenaires/p2.avif" },
  { name: "Partenaire 3", logo: "/assets/partenaires/p3.avif" },
  { name: "Partenaire 4", logo: "/assets/partenaires/p4.avif" },
  { name: "Partenaire 5", logo: "/assets/partenaires/p5.avif" },
  { name: "Partenaire 6", logo: "/assets/partenaires/p7.avif" },
  { name: "Partenaire 7", logo: "/assets/partenaires/p6.avif" },
];

export default function PartenairesPage() {
  return (
    <main className="min-h-screen bg-base-100">
      {/* HERO */}
      <section className="py-10 px-6 text-center max-w-7xl mx-auto">
      
        <h1 className="text-4xl font-bold text-center mb-8 px-6 py-4 rounded-xl bg-primary/10 text-primary shadow-sm">
          Nos partenaires
        </h1>

        <p className="text-base-content/70 text-lg">
          Nous collaborons avec des partenaires de confiance pour offrir des
          solutions performantes et durables.
        </p>
      </section>

      {/* GRID PARTENAIRES */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {partenaires.map((partenaire) => (
            <div
              key={partenaire.name}
              className="card bg-base-200 hover:bg-base-300 transition shadow-sm"
            >
              <div className="card-body flex items-center justify-center p-6">
                <Image
                  src={partenaire.logo}
                  alt={partenaire.name}
                  width={100}
                  height={100}
                  className="object-cocer grayscale hover:grayscale-0 transition"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
