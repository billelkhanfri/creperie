import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase/server";

export async function POST(req) {
  const supabase = createSupabaseServer(); // ✅ serveur only

  try {
    const body = await req.json();
    const { slug, title, category, date, image, content } = body;

    if (!slug || !title || !category || !date || !content) {
      return NextResponse.json(
        { error: "slug, title, category, date et content sont requis" },
        { status: 400 }
      );
    }

    const insertDate = new Date(date);
    if (isNaN(insertDate)) {
      return NextResponse.json({ error: "date invalide" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("actualites")
      .insert([
        {
          slug,
          title,
          category,
          date: insertDate.toISOString().split("T")[0],
          image: image || null,
          content,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}
