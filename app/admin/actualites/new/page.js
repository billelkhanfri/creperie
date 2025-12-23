import ActualiteForm from "../../../components/ActualiteForm";
import { createSupabaseServer } from "../../../lib/supabase/server";
import { redirect } from "next/navigation";

export default function NewActualitePage() {
  async function createActualite(formData) {
    "use server";


    const supabase = await createSupabaseServer();
const {
  data: { user },
  error: userError,
} = await supabase.auth.getUser();

if (!user) {
  throw new Error("Non autorisé");
}
    const title = formData.get("title");
    const file = formData.get("image"); // fichier image
    
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

    let imageUrl = null;

    // ✅ Upload de l'image si fournie
    if (file && file.size > 0) {
      const ext = file.name.split(".").pop();
      const fileName = `${slug}-${crypto.randomUUID()}.${ext}`;
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

      imageUrl = data.publicUrl;
    }

    const { error } = await supabase.from("actualites").insert({
      title,
      slug,
      category: formData.get("category"),
      content: formData.get("content"),
      date: formData.get("date"),
      image: imageUrl
        ? {
            alt: title,
            url: imageUrl,
          }
        : null,
    });

    if (error) {
      throw new Error(error.message);
    }

    redirect("/admin/actualites");
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <ActualiteForm action={createActualite} />
    </div>
  );
}
