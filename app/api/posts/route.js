import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase/server";

export async function GET(req) {
  const supabase = createSupabaseServer(); // ✅ serveur only

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  let query = supabase.from("posts").select("*");

  if (slug) {
    query = query.eq("slug", slug); // filtre seulement, mais ne limite pas
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Toujours renvoyer le tableau complet, même si un slug correspond
  return NextResponse.json(data);
}
