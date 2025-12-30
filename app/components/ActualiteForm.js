"use client";


export default function ActualiteForm({ initialData = {}, action }) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <form action={action} className="card bg-base-100 shadow p-6 space-y-4">
      <h2 className="text-xl font-bold">Actualité</h2>

      {/* TITRE */}
      <input
        name="title"
        className="input input-bordered w-full"
        placeholder="Titre"
        defaultValue={initialData.title || ""}
        required
      />

      {/* CATÉGORIE */}
      <input
        name="category"
        className="input input-bordered w-full"
        placeholder="Catégorie"
        defaultValue={initialData.category || ""}
        required
      />

      {/* DATE */}
      <input
        type="date"
        name="date"
        className="input input-bordered w-full"
        defaultValue={
          initialData.date
            ? new Date(initialData.date).toISOString().split("T")[0]
            : today
        }
      />

      {/* IMAGE / VIDÉO */}
      <input
        type="file"
        name="image"
        accept="image/*,video/*"
        className="file-input file-input-bordered w-full"
      />

      {/* CONTENU */}
      <textarea
        name="content"
        className="textarea textarea-bordered w-full min-h-[150px]"
        placeholder="Contenu"
        defaultValue={initialData.content || ""}
        required
      />

      <button type="submit" className="btn btn-primary w-full">
        Enregistrer
      </button>
    </form>
  );
}
