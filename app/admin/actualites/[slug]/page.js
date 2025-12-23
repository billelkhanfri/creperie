import { createSupabaseServer } from "../../../lib/supabase/server";
import { redirect } from "next/navigation";

export default async function EditActualitePage({ params }) {
  const { slug } = await params;

  const supabase = await createSupabaseServer();

  // 🔹 Récupération de l'actualité
  const { data: actualite, error } = await supabase
    .from("actualites")
    .select("*")
    .eq("slug", slug.toLowerCase())
    .single();

  if (error || !actualite) {
    return <div>Actualité introuvable</div>;
  }

  // 🔹 UPDATE
  async function updateActualite(formData) {
    "use server";

    const supabase =await createSupabaseServer();

    const title = formData.get("title")?.toString().trim();
    const category = formData.get("category")?.toString().trim() || null;
    const date = formData.get("date")?.toString().trim() || null;
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

    let media = actualite.image ?? null;

    // 🔹 Upload nouveau média si fourni
    if (file && file.size > 0) {
      const extension = file.name.split(".").pop();
      const fileName = `${newSlug}-${crypto.randomUUID()}.${extension}`;
      const filePath = `actualites/${fileName}`;

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

      media = {
        url: data.publicUrl,
        alt: title,
        type: isVideo ? "video" : "image",
      };
    }

    await supabase
      .from("actualites")
      .update({
        title,
        slug: newSlug,
        category,
        date,
        content,
        image: media,
        updated_at: new Date().toISOString(),
      })
      .eq("id", actualite.id);

    redirect("/admin/actualites");
  }

  // 🔹 DELETE
  async function deleteActualite() {
    "use server";

    const supabase = await createSupabaseServer();

    await supabase.from("actualites").delete().eq("id", actualite.id);

    redirect("/admin/actualites");
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* FORM UPDATE */}
      <form action={updateActualite} className="space-y-4">
        <h1 className="text-2xl font-bold">Modifier l’actualité</h1>

        {/* Titre */}
        <input
          name="title"
          defaultValue={actualite.title}
          className="input input-bordered w-full"
          required
        />

        {/* Catégorie */}
        <input
          name="category"
          defaultValue={actualite.category || ""}
          className="input input-bordered w-full"
        />

        {/* Date */}
        <input
          type="date"
          name="date"
          className="input input-bordered w-full"
          defaultValue={
            actualite.date
              ? new Date(actualite.date).toISOString().split("T")[0]
              : ""
          }
        />

        {/* Contenu */}
        <textarea
          name="content"
          defaultValue={actualite.content || ""}
          className="textarea textarea-bordered w-full"
          rows={8}
        />

        {/* Média actuel */}
        {actualite.image?.url && (
          <div className="text-sm text-gray-500">
            Média actuel :
            <a href={actualite.image.url} target="_blank" className="link ml-2">
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
      <form action={deleteActualite}>
        <button
          className="btn btn-error w-full"
          // onClick={(e) => {
          //   if (!confirm("Voulez-vous vraiment supprimer cette actualité ?"))
          //     e.preventDefault();
          // }}
        >
          Supprimer définitivement
        </button>
      </form>
    </div>
  );
}
