import { NextResponse } from "next/server";
import { createSupabaseServer } from "../../../lib/supabase/server";

export async function GET(req, context) {
  const supabase = createSupabaseServer(); // ✅ serveur only

  // 🔥 params est une Promise dans ta version de Next
  const { slug } = await context.params;

  if (!slug) {
    return NextResponse.json(null, { status: 400 });
  }

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug.toLowerCase()) // normalize en minuscules
    .limit(1);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // ❌ Aucun post trouvé → 404
  if (!data || data.length === 0) {
    return NextResponse.json(null, { status: 404 });
  }

  // ✅ Un seul post
  return NextResponse.json(data[0]);
}
