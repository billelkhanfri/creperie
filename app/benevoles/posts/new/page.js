"use client";
import { useState } from "react";
import { createSupabaseServer } from "@/app/lib/supabase/server";
import { useRouter } from "next/navigation";

export default function NewPost() {
  const supabase = createSupabaseServer();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [author, setAuthor] = useState("");
  const [mainImage, setMainImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("posts").insert([
      {
        title,
        slug,
        excerpt,
        content,
        published,
        author,
        main_image: mainImage,
        published_at: published ? new Date() : null,
      },
    ]);
    if (error) return alert(error.message);
    alert("Article créé !");
    router.push("/admin/posts");
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Créer un nouvel article</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="input input-bordered w-full"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="input input-bordered w-full"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <input
          className="input input-bordered w-full"
          placeholder="Résumé"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Contenu"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          className="input input-bordered w-full"
          placeholder="Auteur"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          className="input input-bordered w-full"
          placeholder="URL image"
          value={mainImage}
          onChange={(e) => setMainImage(e.target.value)}
        />
        <label className="flex items-center space-x-2">
          <span>Publié ?</span>
          <input
            type="checkbox"
            className="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
        </label>
        <button type="submit" className="btn btn-primary">
          Créer
        </button>
      </form>
    </div>
  );
}
