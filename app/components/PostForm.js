"use client";

import { useRouter } from "next/navigation";

export default function PostForm({ post, updateAction, deleteAction }) {
  const router = useRouter();

  async function handleUpdate(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await updateAction(post.id, formData);
    router.push("/admin/posts");
  }

  async function handleDelete() {
    if (!confirm("Voulez-vous vraiment supprimer ce post ?")) return;
    await deleteAction(post.id);
    router.push("/admin/posts");
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <form onSubmit={handleUpdate} className="space-y-5">
        <input name="title" defaultValue={post.title} required className="input input-bordered w-full" />
        <textarea name="excerpt" defaultValue={post.excerpt || ""} className="textarea textarea-bordered w-full" rows={3} />
        <textarea name="content" defaultValue={post.content || ""} className="textarea textarea-bordered w-full" rows={8} />
        {post.main_image?.url && (
          <div className="text-sm text-gray-500">
            Média actuel : <a href={post.main_image.url} target="_blank" rel="noreferrer" className="link ml-2">Voir</a>
          </div>
        )}
        <input type="file" name="media" accept="image/*,video/*" className="file-input file-input-bordered w-full" />
        <button type="submit" className="btn btn-primary w-full">Enregistrer</button>
      </form>
      <button onClick={handleDelete} className="btn btn-error w-full">Supprimer définitivement</button>
    </div>
  );
}
