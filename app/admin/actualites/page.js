import { createSupabaseServer } from "../../lib/supabase/server";
import Link from "next/link";

export default async function AdminactusPage() {
  const supabase = await createSupabaseServer();

  const { data: actualites, error } = await supabase
    .from("actualites")
    .select("id, title, category, date, content, image, created_at, slug")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div className="p-6">
      {/* HEADER AVEC BOUTON */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Actualités</h1>
        <Link
          href="/admin/actualites/new"
          className="btn btn-primary btn-md btn-outline flex items-center gap-2"
        >
          + Nouvelle actualité
        </Link>
      </div>

      {/* TABLEAU */}
      <div className="overflow-x-auto rounded-xl shadow-lg bg-base-100">
        <table className="table table-zebra w-full">
          <thead className="bg-accent text-neutral-content">
            <tr>
              <th>Titre</th>
              <th>Catégorie</th>
              <th>Image</th>
              <th>Statut</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {actualites?.map((actu) => (
              <tr
                key={actu.id}
                className="hover:bg-primary/5 transition-colors"
              >
                {/* TITRE */}
                <td className="font-semibold">{actu.title}</td>

                {/* CATÉGORIE */}
                <td className="max-w-xs truncate text-sm opacity-80">
                  {actu.category}
                </td>

                {/* IMAGE */}
                <td>
                  {actu.image?.url ? (
                    <div className="avatar">
                      <div className="w-16 rounded-lg ring ring-primary/20">
                        <img
                          src={actu.image.url}
                          alt={actu.title || "Image actualité"}
                        />
                      </div>
                    </div>
                  ) : (
                    <span className="opacity-40 text-sm">—</span>
                  )}
                </td>

                {/* STATUT */}
                <td>
                  {actu.created_at ? (
                    <span className="badge badge-primary">Publié</span>
                  ) : (
                    <span className="badge badge-warning">Brouillon</span>
                  )}
                </td>

                {/* DATE */}
                <td className="text-sm">
                  {actu.date
                    ? new Date(actu.date).toLocaleDateString("fr-FR")
                    : "—"}
                </td>

                {/* ACTION */}
                <td>
                  <Link
                    href={`/admin/actualites/${actu.slug}`}
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
