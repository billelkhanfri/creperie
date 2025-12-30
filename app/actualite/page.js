import { createSupabaseServer } from "../lib/supabase/server";
import ActualitesCarousel from "../components/ActualiteCarousel"; // import client component
import ActualitesClient  from "../components/ActualitesClient";
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

  const data = actualites?.length > 1 ? actualites : mockActualites;
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
          Découvrez toutes les actions, projets et moments forts de
          l’association CAAA.
        </p>
      </div>
   <ActualitesClient data={data} />
    
    </section>
  );
}
