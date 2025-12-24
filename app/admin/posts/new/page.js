import PostForm from "../../../components/PostForm";
import { createSupabaseServer } from "../../../lib/supabase/server";
import { redirect } from "next/navigation";

export default function NewPostPage() {
  async function createPost(formData) {
    "use server";

    const supabase = createSupabaseServer();

    // 🔹 Récupération sécurisée des champs
    const title = formData.get("title")?.toString().trim();
    const excerpt = formData.get("excerpt")?.toString().trim() || null;
    const content = formData.get("content")?.toString().trim() || null;
    const file = formData.get("image");

    if (!title) {
      throw new Error("Le titre est obligatoire");
    }

    function slugify(text) {
      return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // enlève accents
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
    }

    const baseSlug = slugify(title);
    let slug = baseSlug;
    let counter = 1;

    // 🔒 évite les doublons
    while (true) {
      const { data } = await supabase
        .from("actualites")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();

      if (!data) break;

      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    let mainImage = null;

    // 🔹 Upload média (image OU vidéo)
    if (file && file.size > 0) {
      const extension = file.name.split(".").pop();
      const fileName = `${slug}-${crypto.randomUUID()}.${extension}`;
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

      // 🔹 Détection type média
      const isVideo = file.type.startsWith("video");

      mainImage = {
        url: data.publicUrl,
        alt: title,
        type: isVideo ? "video" : "image",
      };
    }

    // 🔹 Insertion sécurisée
    const { error } = await supabase.from("posts").insert({
      title,
      slug,
      excerpt,
      content,
      main_image: mainImage,
    });

    if (error) {
      throw new Error(error.message);
    }

    redirect("/admin/posts");
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <PostForm action={createPost} />
    </div>
  );
}
