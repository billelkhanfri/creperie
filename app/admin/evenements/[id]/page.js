import { createSupabaseServer } from "../../../lib/supabase/server";


import { redirect } from "next/navigation";export default async function EditEventPage({ params }) {
  const { id } = await params;
  const supabase = await createSupabaseServer();

  // 🔹 Récupération du post
  const { data: event, error } = await supabase
    .from("evenements")
    .select("*")
    .eq("id", id)
    .single();
      if (error || !event) return <div>Evénement introuvable</div>;
      // 🔹 Server Action pour UPDATE
  async function updateEvent(formData) {
    "use server";

    const supabase = await createSupabaseServer();
    const title = formData.get("title")?.toString().trim();
    const date = formData.get("date")?.toString().trim() || null;
   
    if (!title) throw new Error("Le titre est obligatoire"); 
    // 🔹 Update dans Supabase
    const { data, error } = await supabase
  .from("evenements")
  .update({
    title,
    date,
  
  })
  .eq("id", id)
  .select();

if (error) {
  console.error("UPDATE ERROR:", error);
  throw new Error(error.message);
}

console.log("UPDATED:", data);


  
    redirect("/admin/evenements");
  }
   // 🔹 Server Action pour DELETE avec confirmation
  async function deleteEvent(formData) {
    "use server";

    const confirmDelete = formData.get("confirm");
    if (confirmDelete !== "yes") {
      // Annule si pas confirmé
      return;
    }

    const supabase = await createSupabaseServer();
    await supabase.from("evenements").delete().eq("id", id);
    redirect("/admin/evenements");
  }

   return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Formulaire Update */}
      <form action={updateEvent} className="space-y-5">
        <input
          name="title"
          defaultValue={event.title}
          required
          className="input input-bordered w-full"
        />
        
        {/* Date */}
        <input
          type="date"
          name="date"
          className="input input-bordered w-full"
          defaultValue={
            event.date
              ? new Date(event.date).toISOString().split("T")[0]
              : ""
          }
        />
      
        <button type="submit" className="btn btn-primary w-full">
          Enregistrer
        </button>
      </form>

      {/* Formulaire Delete avec confirmation */}
      <form
        action={deleteEvent}
      
      >
        <input type="hidden" name="confirm" value="yes" />
        <button type="submit" className="btn btn-error w-full">
          Supprimer définitivement
        </button>
      </form>
    </div>
  );
}
