import { createSupabaseServer } from "../lib/supabase/server";
import ActualitesCarousel from "../components/ActualiteCarousel"; // import client component
import Link from "next/link";
export default async function ActualitesData() {
  const supabase = await createSupabaseServer();

  const { data: actualites, error } = await supabase
    .from("actualites")
    .select("*");

  const mockActualites = [
    {
      id: 1,
      slug: "atelier-jeunesse",
      title: "Atelier jeunesse : initiation au numérique",
      category: "Éducation",
      date: "2025-01-12",
      image: {
        url: "https://picsum.photos/600/400?random=1",
        alt: "Atelier jeunesse",
      },
    },
    {
      id: 2,
      slug: "solidarite-hiver",
      title: "Campagne de solidarité hivernale",
      category: "Solidarité",
      date: "2025-01-05",
      image: {
        url: "https://picsum.photos/600/400?random=2",
        alt: "Solidarité hiver",
      },
    },
    {
      id: 3,
      slug: "sortie-culturelle",
      title: "Sortie culturelle au musée",
      category: "Culture",
      date: "2024-12-20",
      image: {
        url: "https://picsum.photos/600/400?random=3",
        alt: "Sortie culturelle",
      },
    },
  ];

  if (error) {
    return <div>Erreur chargement actualités</div>;
  }

  const data = actualites?.length > 2 ? actualites : mockActualites;
  const latestImages = data.filter((a) => a.image?.url).slice(0, 4);

  return (
    <section className="bg-base-100 p-6">
      {/* Carousel Client */}
      <ActualitesCarousel slides={latestImages} />
      {/* Header */}
      <div className="mb-16 max-w-7xl mx-auto mt-4">
        <h1 className="text-4xl font-bold text-center mb-8 px-6 py-4 rounded-xl bg-primary/10 text-primary shadow-sm">
          Nos Actualités
        </h1>
<p className="text-gray-500 text-lg">
  Découvrez toutes les actions, projets et moments forts de l’association CAAA.
</p>
      </div>

      {/* Grid Articles reste inchangé */}
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data.slice(0, 6).map((actu) => (
          <li key={actu.slug}>
            <Link
              href={`/actualite/${actu.slug}`}
              className="group block rounded-2xl overflow-hidden bg-base-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={actu.image?.url}
                  alt={actu.image?.alt || actu.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {actu.category && (
                  <span className="absolute top-3 left-3 badge badge-primary badge-sm">
                    {actu.category}
                  </span>
                )}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h2 className="text-lg font-semibold leading-snug line-clamp-2">
                  {actu.title}
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  {actu.date &&
                    new Date(actu.date).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                </p>
                <span className="mt-auto inline-block text-primary font-medium text-sm group-hover:underline">
                  Lire la suite →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
