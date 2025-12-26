import { createSupabaseServer } from "../../lib/supabase/server";
import Link from "next/link";

export default async function AdminEventsPage() {
  const supabase = await createSupabaseServer();

  const { data: events, error } = await supabase
    .from("evenements")
    .select("id, title, date")
    .order("date", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div className="p-6">
      {/* HEADER AVEC BOUTON */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Événements</h1>
        <Link
          href="/admin/evenements/new"
          className="btn btn-primary btn-md btn-outline flex items-center gap-2"
        >
          + Nouvel événement
        </Link>
      </div>

      {/* TABLEAU */}
      <div className="overflow-x-auto rounded-xl shadow-lg bg-base-100">
        <table className="table table-zebra w-full">
          <thead className="bg-accent text-neutral-content">
            <tr>
              <th>Titre</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {events?.map((event) => (
              <tr
                key={event.id}
                className="hover:bg-primary/5 transition-colors"
              >
                {/* TITRE */}
                <td className="font-semibold">{event.title}</td>

                {/* DATE */}
                <td className="text-sm">
                  {event.date
                    ? new Date(event.date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "—"}
                </td>

                {/* ACTION */}
                <td>
                  <Link
                    href={`/admin/evenements/${event.id}`}
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
