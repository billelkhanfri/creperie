import Link from "next/link";

export default function SidebarActualite({ actualites }) {
  return (
    <div className="card bg-base-200 shadow-md sticky top-24">
      <div className="card-body p-5">
        <h3 className="text-xl font-bold">Actualités</h3>
        <div className="divider my-2" />

        <ul className="space-y-4">
          {actualites.slice(0, 5).map((actu) => (
            <li key={actu.slug}>
              <Link
                href={`/actualite/${actu.slug}`}
                className="block rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-200 bg-base-100"
              >
                {/* IMAGE */}
                {actu.image?.url && (
                  <div className="relative w-full h-32">
                    <img
                      src={actu.image.url}
                      alt={actu.title}
                      className="w-full h-full object-cover"
                    />
                    {/* BADGE CATÉGORIE SUR IMAGE */}
                    <span className="absolute top-2 left-2 badge badge-sm badge-primary">
                      {actu.category}
                    </span>
                  </div>
                )}

                {/* CONTENU TEXTE */}
                <div className="p-3">
                  <p className="font-medium leading-snug line-clamp-2">
                    {actu.title}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{actu.date}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
