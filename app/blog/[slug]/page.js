import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { createSupabaseServer } from "../../lib/supabase/server";

export default async function PostPage({ params }) {
  const { slug } = await params;
console.log("slug", slug)
  if (!slug) notFound();

  const supabase = await createSupabaseServer();

  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug.toLowerCase())
    .single();
console.log(post)
  if (error || !post) notFound();

  const isVideo = (url = "") => /\.(mp4|webm|ogg)$/i.test(url);

  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "long",
    timeZone: "Europe/Paris",
  }).format(new Date(post.published_at));

  return (
    <section className="py-20 px-6 lg:px-32">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="btn btn-ghost mb-8">
          ← Retour
        </Link>

        <div className="relative h-72 md:h-96 rounded-3xl overflow-hidden mb-8">
          <figure className="relative h-full bg-gray-200 overflow-hidden">
            {post?.main_image?.url ? (
              isVideo(post.main_image.url) ? (
                <video
                  src={post.main_image.url}
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={post.main_image.url}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              )
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                Aucun média
              </div>
            )}
          </figure>
        </div>

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        <div className="text-sm text-gray-400 mb-8">
          {post.author} • {formattedDate}
        </div>

        <div className="prose prose-lg max-w-none">{post.content}</div>
      </div>
    </section>
  );
}
