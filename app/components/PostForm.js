"use client";

import { useRouter } from "next/navigation";

export default function PostForm({
  post,
  createAction,
  updateAction,
  deleteAction,
}) {
  const router = useRouter();
  const isEdit = Boolean(post?.id);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (isEdit) {
      await updateAction(post.id, formData);
    } else {
      await createAction(formData);
    }

    router.push("/admin/posts");
  }

  async function handleDelete() {
    if (!confirm("Voulez-vous vraiment supprimer ce post ?")) return;
    await deleteAction(post.id);
    router.push("/admin/posts");
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="title"
          defaultValue={post?.title || ""}
          required
          className="input input-bordered w-full"
            placeholder="Titre"
        />

        <textarea
          name="excerpt"
          defaultValue={post?.excerpt || ""}
          className="textarea textarea-bordered w-full"
          rows={3}
                placeholder="Résumé"
        />

        <textarea
          name="content"
          defaultValue={post?.content || ""}
          className="textarea textarea-bordered w-full"
          rows={8}
                placeholder="Contenu"
        />

        {post?.main_image?.url && (
          <div className="text-sm text-gray-500">
            Média actuel :
            <a
              href={post.main_image.url}
              target="_blank"
              rel="noreferrer"
              className="link ml-2"
            >
              Voir
            </a>
          </div>
        )}

        <input
          type="file"
          name="file"
          accept="image/*,video/*"
          className="file-input file-input-bordered w-full"
        />

        <button type="submit" className="btn btn-primary w-full">
          {isEdit ? "Enregistrer" : "Créer le post"}
        </button>
      </form>

      {isEdit && (
        <button onClick={handleDelete} className="btn btn-error w-full">
          Supprimer définitivement
        </button>
      )}
    </div>
  );
}
