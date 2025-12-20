import { createSupabaseServer } from "../../../lib/supabase/server";
import { redirect } from "next/navigation";

export default async function EditPostPage({ params }) {
  const { slug } = await params;

  const supabase = createSupabaseServer();

  // 🔹 Récupération du post
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug.toLowerCase())
    .single();

  if (error || !post) {
    return <div>Post introuvable</div>;
  }

  // 🔹 UPDATE
  async function updatePost(formData) {
    "use server";

    const supabase = createSupabaseServer();

    const title = formData.get("title")?.toString().trim();
    const excerpt = formData.get("excerpt")?.toString().trim() || null;
    const content = formData.get("content")?.toString().trim() || null;
    const file = formData.get("media");

    if (!title) {
      throw new Error("Le titre est obligatoire");
    }

    // 🔹 Slug recalculé
    const newSlug = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    let mainImage = post.main_image ?? null;

    // 🔹 Upload nouveau média si fourni
    if (file && file.size > 0) {
      const extension = file.name.split(".").pop();
      const fileName = `${newSlug}-${crypto.randomUUID()}.${extension}`;
      const filePath = `posts/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(filePath, file, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      const { data } = supabase.storage.from("media").getPublicUrl(filePath);

      const isVideo = file.type.startsWith("video");

      mainImage = {
        url: data.publicUrl,
        alt: title,
        type: isVideo ? "video" : "image",
      };
    }

    await supabase
      .from("posts")
      .update({
        title,
        slug: newSlug,
        excerpt,
        content,
        main_image: mainImage,
        updated_at: new Date().toISOString(),
      })
      .eq("id", post.id);

    redirect("/admin/posts");
  }

  // 🔹 DELETE
  async function deletePost() {
    "use server";

    const supabase = createSupabaseServer();

    await supabase.from("posts").delete().eq("id", post.id);

    redirect("/admin/posts");
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* FORM UPDATE */}
      <form action={updatePost} className="space-y-4">
        <h1 className="text-2xl font-bold">Modifier l’article</h1>

        {/* Titre */}
        <input
          name="title"
          defaultValue={post.title}
          className="input input-bordered w-full"
          required
        />

        {/* Extrait */}
        <textarea
          name="excerpt"
          defaultValue={post.excerpt || ""}
          className="textarea textarea-bordered w-full"
          rows={3}
        />

        {/* Contenu */}
        <textarea
          name="content"
          defaultValue={post.content || ""}
          className="textarea textarea-bordered w-full"
          rows={8}
        />

        {/* Média actuel */}
        {post.main_image?.url && (
          <div className="text-sm text-gray-500">
            Média actuel :
            <a href={post.main_image.url} target="_blank" className="link ml-2">
              Voir
            </a>
          </div>
        )}

        {/* Upload nouveau média */}
        <input
          type="file"
          name="media"
          accept="image/*,video/*"
          className="file-input file-input-bordered w-full"
        />

        <button className="btn btn-primary w-full">
          Enregistrer les modifications
        </button>
      </form>

      {/* DELETE */}
      <form action={deletePost}>
        <button className="btn btn-error w-full">
          Supprimer définitivement
        </button>
      </form>
    </div>
  );
}
