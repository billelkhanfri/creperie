import { Suspense } from "react";
import PostsData from "./PostsData";
import ActualitesData from "./ActualitesData";

export default function BlogPage() {
  return (
    <section className="bg-base-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <aside className="lg:col-span-1">
            <Suspense fallback={<div>Chargement actualités...</div>}>
              <ActualitesData />
            </Suspense>
          </aside>
          {/*  */}
          <main className="lg:col-span-3">
            <Suspense fallback={<div>Chargement articles...</div>}>
              <PostsData />
            </Suspense>
          </main>
        </div>
      </div>
    </section>
  );
}
