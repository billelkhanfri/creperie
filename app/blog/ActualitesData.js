import { createSupabaseServer } from "../lib/supabase/server";
import SidebarActualite from "../components/SidebarActualite";

export default async function ActualitesData() {
  const supabase = await createSupabaseServer();

  const { data: actualites, error } = await supabase
    .from("actualites")
    .select();

  if (error) {
    return <div>Erreur chargement actualités</div>;
  }

  return <SidebarActualite actualites={actualites ?? []} />;
}
