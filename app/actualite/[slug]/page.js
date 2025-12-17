import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function ActualitePage({ params }) {
  // ✅ params = Promise (Next 15 / App Router)
  const { slug } = await params;

  if (!slug) notFound();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/actualites/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    if (res.status === 404) notFound();
    throw new Error("Erreur lors du chargement de l’actualité");
  }

  const actualite = await res.json();

  if (!actualite) notFound();

  // 🗓️ date
  const formattedDate = actualite.date
    ? new Date(actualite.date).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

  // 🖼️ image sécurisée (Supabase JSON)
  const imageUrl = actualite.image?.url || "/logo.png";
  const imageAlt = actualite.image?.alt || actualite.title;

  return (
    <section className="bg-base-100">
      <div className="max-w-3xl mx-auto px-6 py-20">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:underline">
            Accueil
          </Link>
          {" / "}
          <Link href="/blog" className="hover:underline">
            Actualités
          </Link>
          {" / "}
          <span>{actualite.title}</span>
        </div>

        {/* Image */}
        <div className="relative h-72 md:h-96 rounded-3xl overflow-hidden mb-8">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </div>

        {/* Catégorie */}
        {actualite.category && (
          <span className="badge badge-primary badge-outline mb-4">
            {actualite.category}
          </span>
        )}

        {/* Titre & date */}
        <h1 className="text-4xl font-bold mb-2">{actualite.title}</h1>
        <p className="text-gray-500 mb-10">{formattedDate}</p>

        {/* Contenu */}
        <article className="prose prose-lg max-w-none">
          {actualite.content}
        </article>
      </div>
    </section>
  );
}
