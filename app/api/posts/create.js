// app/api/posts/create.js
import { createSupabaseServer } from "@/app/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  const supabase = createSupabaseServer(); // ✅ serveur only

  try {
    const body = await req.json();
    const { title, slug, excerpt, content, author, main_image, published_at } =
      body;

    // Vérifications simples
    if (!title || !slug) {
      return NextResponse.json(
        { error: "title et slug sont requis" },
        { status: 400 }
      );
    }

    // Si published_at n'est pas une date valide, on met now()
    const publishedAtDate = published_at ? new Date(published_at) : new Date();

    if (isNaN(publishedAtDate)) {
      return NextResponse.json(
        { error: "published_at invalide" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.from("posts").insert([
      {
        title,
        slug,
        excerpt: excerpt || null,
        content: content || null,
        author: author || "CAAA",
        main_image: main_image || null,
        published_at: publishedAtDate.toISOString(),
      },
    ]);

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data[0]);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
