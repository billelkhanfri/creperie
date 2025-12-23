import { createSupabaseServer } from "../../lib/supabase/server";
import Link from "next/link";

export default async function AdminPostsPage() {
  const supabase = await createSupabaseServer();

  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      "id, title, excerpt, content, main_image, author, published_at, slug"
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div className="p-6">
      {/* HEADER AVEC BOUTON */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Articles</h1>
        <Link
          href="/admin/posts/new"
          className="btn btn-primary btn-outline btn-md flex items-center gap-2"
        >
          + Nouvel article
        </Link>
      </div>

      {/* TABLEAU */}
      <div className="overflow-x-auto rounded-xl shadow-lg bg-base-100">
        <table className="table table-zebra w-full">
          <thead className="bg-accent text-neutral-content">
            <tr>
              <th>Titre</th>
              <th>Résumé</th>
              <th>Image</th>
              <th>Auteur</th>
              <th>Statut</th>
              <th>Publié</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {posts?.map((post) => (
              <tr
                key={post.id}
                className="hover:bg-primary/5 transition-colors"
              >
                {/* TITRE */}
                <td className="font-semibold">{post.title}</td>

                {/* EXCERPT */}
                <td className="max-w-xs truncate text-sm opacity-80">
                  {post.excerpt}
                </td>

                {/* IMAGE */}
                <td>
                  {post.main_image?.url ? (
                    <div className="avatar">
                      <div className="w-16 rounded-lg ring ring-primary/20">
                        <img
                          src={post.main_image.url}
                          alt={post.main_image.alt || post.title}
                        />
                      </div>
                    </div>
                  ) : (
                    <span className="opacity-40 text-sm">—</span>
                  )}
                </td>

                {/* AUTEUR */}
                <td>
                  <span className="badge badge-outline badge-info">
                    {post.author}
                  </span>
                </td>

                {/* STATUT */}
                <td>
                  {post.published_at ? (
                    <span className="badge badge-primary">Publié</span>
                  ) : (
                    <span className="badge badge-warning">Brouillon</span>
                  )}
                </td>

                {/* DATE */}
                <td className="text-sm">
                  {post.published_at
                    ? new Date(post.published_at).toLocaleDateString("fr-FR")
                    : "—"}
                </td>

                {/* ACTION */}
                <td>
                  <Link
                    href={`/admin/posts/${post.slug}`}
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    Modifier
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
