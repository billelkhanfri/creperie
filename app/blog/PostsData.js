import { createSupabaseServer } from "../lib/supabase/server";
import BlogList from "../components/ALBlogs";

export default async function PostsData() {
  const supabase = await createSupabaseServer();

  const { data: posts, error } = await supabase.from("posts").select();


  if (error) {
    return <div>Erreur chargement posts</div>;
  }

  return <BlogList posts={posts ?? []} />;
}
