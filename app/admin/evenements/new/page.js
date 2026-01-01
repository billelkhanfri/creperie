
import { createSupabaseServer } from "../../../lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function NewEventPage() {
  async function createEvent(formData) {
    "use server";


    const supabase = await createSupabaseServer();
const {
  data: { user },
  error: userError,
} = await supabase.auth.getUser();

if (!user) {
  throw new Error("Non autorisé");
}

   const title = formData.get("title");
    const date = formData.get("date");

        const { error } = await supabase.from("evenements").insert({
      title,
     
      date
   ,
    });

    if (error) {
      throw new Error(error.message);
    }

    redirect("/admin/evenements");
  }

   return (
<section className="py-16 px-6"> 

     <div className="max-w-3xl mx-auto space-y-6">
         <Link href="/admin/evenements" className="btn btn-ghost mb-8">
          ← Retour
        </Link>
      {/* Formulaire Update */}
      <form action={createEvent} className="card bg-base-100 shadow p-6 space-y-4">
                 <h1 className="text-2xl font-bold">Evénement </h1>

        <input
          name="title"
          placeholder="Titre"
          defaultValue=""
          required
          className="input input-bordered w-full"
          />
        
        {/* Date */}
        <input
          type="date"
          placeholder="Date"
          name="date"
          className="input input-bordered w-full"
          defaultValue={
            
            new Date().toISOString().split("T")[0]
            
          }
          />
      
        <button type="submit" className="btn btn-primary w-full">
          Enregistrer
        </button>
      </form>

      
    </div>
          </section>
     
    )
}