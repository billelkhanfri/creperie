"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

const ITEMS_PER_PAGE = 6;

export default function ActualitesClient({ data }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tous");
  const [page, setPage] = useState(1);

  // 🔹 catégories dynamiques
  const categories = useMemo(() => {
    const cats = data.map((a) => a.category).filter(Boolean);
    return ["Tous", ...new Set(cats)];
  }, [data]);

  // 🔹 filtre texte + catégorie
  const filtered = useMemo(() => {
    return data.filter((a) => {
      const matchText =
        a.title.toLowerCase().includes(search.toLowerCase());

      const matchCategory =
        category === "Tous" || a.category === category;

      return matchText && matchCategory;
    });
  }, [data, search, category]);

  // 🔹 pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // reset page quand filtre change
  function handleFilterChange(fn) {
    setPage(1);
    fn();
  }

  return (
    <>
     {/* 🔍 SEARCH BAR */}
<div className="max-w-xl mx-auto mb-10">
  <div className="relative">
    <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
      🔍
    </span>
    <input
      type="text"
      placeholder="Rechercher une actualité..."
      value={search}
      onChange={(e) =>
        handleFilterChange(() => setSearch(e.target.value))
      }
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
 {/* 🏷️ FILTRE CATÉGORIES */}
<div className="flex flex-wrap justify-center gap-3 mt-14 mb-6">
  {categories.map((cat) => {
    const active = category === cat;
    return (
      <button
        key={cat}
        onClick={() =>
          handleFilterChange(() => setCategory(cat))
        }
        className={`
          px-5 py-2
          rounded-full
          text-sm font-medium
          transition-all
          ${
            active
              ? "bg-primary text-primary-content shadow-md scale-105"
              : "bg-base-100 border border-base-300 text-gray-600 hover:bg-primary/10 hover:text-primary"
          }
        `}
      >
        {cat}
      </button>
    );
  })}
</div>

      {/* 📰 GRID */}
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-14">
        {paginated.map((actu) => (
        <li key={actu.slug}>
  <Link
    href={`/actualite/${actu.slug}`}
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
    {/* IMAGE */}
    <div className="relative h-52 overflow-hidden">
      <img
        src={actu.image?.url}
        alt={actu.image?.alt || actu.title}
        className="
          h-full w-full object-cover
          transition-transform duration-500
          group-hover:scale-110
        "
      />

      {/* overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      {/* catégorie */}
      {actu.category && (
        <span className="
          absolute top-4 left-4
          px-3 py-1
          rounded-full
          text-xs font-semibold
          bg-primary text-primary-content
          shadow-md
        ">
          {actu.category}
        </span>
      )}
    </div>

    {/* CONTENT */}
    <div className="flex flex-col flex-1 p-6">
      <h2 className="
        text-lg font-semibold leading-snug
        line-clamp-2
        mb-3
        group-hover:text-primary
        transition
      ">
        {actu.title}
      </h2>

      <p className="text-sm text-gray-500 mb-6">
        {new Date(actu.date).toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      {/* CTA */}
      <div className="mt-auto flex items-center justify-between">
        <span className="text-sm font-medium text-primary">
          Lire la suite
        </span>
        <span className="
          text-primary
          transition-transform
          group-hover:translate-x-1
        ">
          →
        </span>
      </div>
    </div>
  </Link>
</li>
        ))}
      </ul>

      {/* 📄 PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`btn btn-sm ${
                page === i + 1 ? "btn-primary" : "btn-outline"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

    
    </>
  );
}
