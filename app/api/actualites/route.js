import { NextResponse } from "next/server";
import { createSupabaseServer } from "../lib/supabase/server";

export async function GET(req) {
  const supabase = createSupabaseServer(); // ✅ serveur only

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  let query = supabase
    .from("actualites")
    .select("*")
    .order("date", { ascending: false });

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
