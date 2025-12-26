
import { createSupabaseServer } from "../../../lib/supabase/server";
import { redirect } from "next/navigation";

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

     <div className="max-w-3xl mx-auto space-y-6">
      {/* Formulaire Update */}
      <form action={createEvent} className="space-y-5">
        <input
          name="title"
          defaultValue=""
          required
          className="input input-bordered w-full"
        />
        
        {/* Date */}
        <input
          type="date"
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
     
    )
}