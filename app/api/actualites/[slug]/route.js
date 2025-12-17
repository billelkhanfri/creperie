import { NextResponse } from "next/server";

import { createSupabaseServer } from "../../../lib/supabase/server";

export async function GET(req, context) {
  const supabase = createSupabaseServer(); // ✅ serveur only
  // context.params est une Promise dans Next.js App Router
  const params = await context.params;
  const slug = params.slug;

  if (!slug) return NextResponse.json(null, { status: 400 });

  const { data, error } = await supabase
    .from("actualites")
    .select("*")
    .eq("slug", slug.toLowerCase()) // normalize en minuscules
    .limit(1);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  if (!data || data.length === 0)
    return NextResponse.json(null, { status: 404 });

  return NextResponse.json(data[0]);
}
