import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export function createSupabaseServer() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase env variables missing");
  }

  // cookies() fonctionne uniquement côté serveur
  const cookieStore = cookies();

  return createClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll().map((c) => ({
          name: c.name,
          value: c.value,
          options: {}, // Next.js cookies() ne fournit pas directement options
        }));
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options || {});
        });
      },
    },
  });
}
