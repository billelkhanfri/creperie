import { createSupabaseServer } from "../../lib/supabase/server";

export async function GET(req) {
  const supabase = await createSupabaseServer(); // ✅ serveur only

  const { data } = await supabase.from("actualites").select("*");
  return Response.json(data);
}

export async function POST(req) {
  const body = await req.json();
  await supabase.from("actualites").insert(body);
}
