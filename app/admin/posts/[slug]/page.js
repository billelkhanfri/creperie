import PostForm from "../../../components/PostForm";
import { createSupabaseServer } from "../../../lib/supabase/server";
import { updatePost, deletePost } from "../../../components/ActionServer";

export default async function EditPostPage({ params }) {
  const { slug } = await params;
  const supabase = await createSupabaseServer();
  const { data: post, error } = await supabase.from("posts").select("*").eq("slug", slug).single();
  if (error || !post) return <div>Post introuvable</div>;
  return <PostForm post={post} updateAction={updatePost} deleteAction={deletePost} />;
}
