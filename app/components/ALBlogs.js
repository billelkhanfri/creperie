"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function BlogList({ posts = [] }) {
  const [showAll, setShowAll] = useState(false);
  const INITIAL_COUNT = 3;

  const displayedPosts = showAll ? posts : posts.slice(0, INITIAL_COUNT);

  const isVideo = (url = "") => /\.(mp4|webm|ogg)$/i.test(url);

  return (
    <section className="bg-base-100 p-6">
      {/* Header */}
      <div className="mb-16 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8 px-6 py-4 rounded-xl bg-primary/10 text-primary shadow-sm">
          Nos articles
        </h1>

        <p className="text-gray-500 text-lg">
          Découvrez nos actions, nos projets et les moments forts de la vie
          associative.
        </p>
      </div>

      {/* Articles */}
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {displayedPosts.map((post) => {
          const mediaUrl = post?.main_image?.url;
          const title = post?.title ?? "Sans titre";
          const excerpt = post?.excerpt ?? "";
          const slug = post?.slug ?? "";

          return (
            <li key={slug}>
              <Link
                href={`/blog/${slug}`}
                className="
  group block
 h-full
 flex flex-col
  rounded-2xl overflow-hidden
  bg-base-100 shadow-sm hover:shadow-xl
  transition-all duration-300
"
              >
                {/* MEDIA */}
                <div className="relative h-48 overflow-hidden">
                  {mediaUrl ? (
                    isVideo(mediaUrl) ? (
                      <video
                        src={mediaUrl}
                        muted
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <Image
                        src={mediaUrl}
                        alt={title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm bg-gray-100">
                      Aucun média
                    </div>
                  )}

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>

                {/* TEXTE */}
                <div className="p-5 flex flex-col flex-1 gap-2">
                  <h2 className="text-lg font-semibold leading-snug line-clamp-2">
                    {title}
                  </h2>

                  <p className="text-sm text-gray-500 line-clamp-2 mt-2">
                    {excerpt || "Aucun résumé disponible"}
                  </p>

                  {/* CTA */}
                  <div className="mt-auto flex justify-end">
                    <span className="text-primary font-medium text-sm group-hover:underline">
                      Lire la suite →
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Load more */}
      {!showAll && posts.length > INITIAL_COUNT && (
        <div className="text-center mt-16 ">
          <button
            onClick={() => setShowAll(true)}
            className="btn btn-outline btn-primary"
          >
            Voir tous les articles
          </button>
        </div>
      )}
    </section>
  );
}
