"use client"; // obligatoire pour le state

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function BlogList({ posts }) {
  console.log(posts)
  const [showAll, setShowAll] = useState(false);
  const initialCount = 3;
  const displayedPosts = showAll ? posts : posts.slice(0, initialCount);

  return (
    <section className="  bg-base-100">
      <div className="mb-16 max-w-4xl">
        <span className="badge badge-warning  mb-4">Blog</span>
        <h1 className="text-4xl font-bold text-center mb-8 px-6 py-4 rounded-xl bg-primary/10 text-primary shadow-sm">
          Nos articles
        </h1>

        <p className="text-gray-500 text-lg">
          Découvrez nos actions, nos projets et les moments forts de la vie
          associative.
        </p>
      </div>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {displayedPosts.map((post) => (
          <div key={post.slug} className="card bg-base-100 shadow-xl">
             <figure className="relative h-56">
              <Image
                src={
                  post.main_image.url
                  
                   
                }
                alt={post.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </figure> 

            <div className="card-body">
              <h2 className="card-title">{post.title}</h2>
              <p className="text-gray-500">
                {post.excerpt.length > 100
                  ? post.excerpt.slice(0, 100).trim() + "..."
                  : post.excerpt}
              </p>
              <div className="card-actions justify-end">
                <Link
                  href={`/blog/${post.slug}`}
                  className="btn btn-primary btn-sm"
                >
                  Lire plus
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!showAll && (
        <div className="text-center mt-16">
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
