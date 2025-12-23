import { createSupabaseServer } from "../lib/supabase/server";
import Image from "next/image";
import Link from "next/link";

export default async function ActualitesData() {
  const supabase = await createSupabaseServer();

  const { data: actualites, error } = await supabase
    .from("actualites")
    .select("*");

  if (error) {
    return <div>Erreur chargement actualités</div>;
  }
console.log(actualites); const mockActualites = [
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
const data = actualites?.length >2 ? actualites : mockActualites;
const latestImages = data.filter((a) => a.image?.url).slice(0, 4);

   return (
     <section className="bg-base-100 p-6">
       {/* CAROUSEL */}
       <div className="mb-16">
         <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-2">
           {latestImages.map((actu) => (
             <Link
               key={actu.slug}
               href={`/actualite/${actu.slug}`}
               className="relative min-w-[85%] sm:min-w-[60%] lg:min-w-[40%] h-64 rounded-2xl overflow-hidden snap-center group"
             >
               {/* IMAGE */}
               <img
                 src={actu.image.url}
                 alt={actu.image.alt || actu.title}
                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
               />

               {/* OVERLAY */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

               {/* TEXTE */}
               <div className="absolute bottom-4 left-4 right-4 text-white">
                 {actu.category && (
                   <span className="badge badge-primary badge-sm mb-2">
                     {actu.category}
                   </span>
                 )}

                 <h2 className="text-xl font-bold leading-tight line-clamp-2">
                   {actu.title}
                 </h2>
               </div>
             </Link>
           ))}
         </div>
       </div>

       {/* Header */}
       <div className="mb-16 max-w-7xl mx- auto">
         <span className="badge badge-warning mb-4">Actualités</span>

         <h1 className="text-4xl font-bold text-center mb-8 px-6 py-4 rounded-xl bg-primary/10 text-primary shadow-sm">
           Nos Actualités
         </h1>

         <p className="text-gray-500 text-lg">
           Découvrez nos actions, nos projets et les moments forts de la vie
           associative.
         </p>
       </div>
       <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
         {data.slice(0, 6).map((actu) => (
           <li key={actu.slug}>
             <Link
               href={`/actualite/${actu.slug}`}
               className="group block rounded-2xl overflow-hidden bg-base-100 shadow-sm hover:shadow-xl transition-all duration-300"
             >
               {/* IMAGE */}
               <div className="relative h-48 overflow-hidden">
                 <img
                   src={actu.image?.url}
                   alt={actu.image?.alt || actu.title}
                   className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                 />

                 {/* BADGE */}
                 {actu.category && (
                   <span className="absolute top-3 left-3 badge badge-primary badge-sm">
                     {actu.category}
                   </span>
                 )}
               </div>

               {/* TEXTE */}
               <div className="p-5 space-y-2">
                 <h2 className="text-lg font-semibold leading-snug line-clamp-2">
                   {actu.title}
                 </h2>

                 <p className="text-sm text-gray-500">
                   {actu.date &&
                     new Date(actu.date).toLocaleDateString("fr-FR", {
                       day: "numeric",
                       month: "long",
                       year: "numeric",
                     })}
                 </p>

                 <span className="inline-block text-primary font-medium text-sm mt-2 group-hover:underline">
                   Lire la suite →
                 </span>
               </div>
             </Link>
           </li>
         ))}
       </ul>

       {/* Articles */}
       <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"></div>
     </section>
   );
  }

