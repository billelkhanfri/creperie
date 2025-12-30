"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";

const ITEMS_PER_PAGE = 5;

export default function BlogList({ posts = [] }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const isVideo = (url = "") => /\.(mp4|webm|ogg)$/i.test(url);

  /* 🔍 FILTER BY SEARCH */
  const filteredPosts = useMemo(() => {
    return posts.filter((post) =>
      post?.title?.toLowerCase().includes(search.toLowerCase())
    );
  }, [posts, search]);

  /* 📄 PAGINATION */
  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);

  const paginatedPosts = filteredPosts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  function handleSearch(value) {
    setPage(1);
    setSearch(value);
  }

  return (
    <section className="bg-base-100 p-6">
      {/* HEADER */}
      <div className="mb-16 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8 px-6 py-4 rounded-xl bg-primary/10 text-primary shadow-sm">
          Nos articles
        </h1>
        <p className="text-gray-500 text-lg">
          Découvrez nos actions, nos projets et les moments forts de la vie
          associative.
        </p>
      </div>

      {/* 🔍 SEARCH (same design as actualités) */}
      <div className="max-w-xl mx-auto mb-12">
        <div className="relative">
          <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Rechercher un article..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="
              w-full
              pl-12 pr-4 py-3
              rounded-2xl
              bg-base-100
              shadow-sm
              border border-base-300
              focus:outline-none
              focus:ring-2 focus:ring-primary/40
              focus:border-primary
              transition
            "
          />
        </div>
      </div>

      {/* 📰 GRID */}
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedPosts.map((post) => {
          const mediaUrl = post?.main_image?.url;
          const title = post?.title ?? "Sans titre";
          const excerpt = post?.excerpt ?? "";
          const slug = post?.slug ?? "";

          return (
            <li key={slug}>
              <Link
                href={`/blog/${slug}`}
                className="
                  group
                  relative
                  flex flex-col
                  h-full
                  rounded-2xl
                  overflow-hidden
                  bg-base-100
                  shadow-sm
                  hover:shadow-2xl
                  transition-all duration-300
                "
              >
                {/* MEDIA */}
                <div className="relative h-52 overflow-hidden">
                  {mediaUrl ? (
                    isVideo(mediaUrl) ? (
                      <video
                        src={mediaUrl}
                        muted
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <Image
                        src={mediaUrl}
                        alt={title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
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

                {/* CONTENT */}
                <div className="flex flex-col flex-1 p-6">
                  <h2 className="text-lg font-semibold leading-snug line-clamp-2 mb-3 group-hover:text-primary transition">
                    {title}
                  </h2>

                  <p className="text-sm text-gray-500 line-clamp-2 mb-6">
                    {excerpt || "Aucun résumé disponible"}
                  </p>

                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">
                      Lire la suite
                    </span>
                    <span className="text-primary transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* ❌ EMPTY STATE */}
      {paginatedPosts.length === 0 && (
        <p className="text-center text-gray-500 mt-20">
          Aucun article ne correspond à votre recherche.
        </p>
      )}

      {/* 📄 PAGINATION (same style) */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-14">
          {Array.from({ length: totalPages }).map((_, i) => {
            const active = page === i + 1;
            return (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`
                  min-w-[40px] h-10
                  rounded-xl
                  text-sm font-medium
                  transition-all
                  ${
                    active
                      ? "bg-primary text-primary-content shadow-md"
                      : "bg-base-100 border border-base-300 text-gray-600 hover:bg-primary/10 hover:text-primary"
                  }
                `}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
