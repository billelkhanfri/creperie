"use server";

import { createSupabaseServer } from "../lib/supabase/server";

export async function updatePost(postId, formData) {
  const supabase = await createSupabaseServer();

  const title = formData.get("title")?.toString().trim();
  const excerpt = formData.get("excerpt")?.toString().trim() || null;
  const content = formData.get("content")?.toString().trim() || null;
  const file = formData.get("media");

  if (!title) throw new Error("Le titre est obligatoire");

  const newSlug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  let mainImage = null;

  if (file && file.size > 0) {
    const extension = file.name.split(".").pop();
    const fileName = `${newSlug}-${crypto.randomUUID()}.${extension}`;
    const filePath = `posts/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("media")
      .upload(filePath, file, { contentType: file.type, upsert: false });

    if (uploadError) throw new Error(uploadError.message);

    const { publicUrl } = supabase.storage.from("media").getPublicUrl(filePath);

    mainImage = {
      url: publicUrl,
      alt: title,
      type: file.type.startsWith("video") ? "video" : "image",
    };
  }

  await supabase
    .from("posts")
    .update({ title, slug: newSlug, excerpt, content, main_image: mainImage, updated_at: new Date().toISOString() })
    .eq("id", postId);
}

export async function deletePost(postId) {
  const supabase = await createSupabaseServer();
  await supabase.from("posts").delete().eq("id", postId);
}
