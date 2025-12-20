import { Suspense } from "react";
import PostsData from "./PostsData";

export default function BlogPage() {
  return (
    <section className="bg-base-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
         
          {/*  */}
          <main className="lg:col-span-3">
            <Suspense fallback={<div>Chargement articles...</div>}>
              <PostsData />
            </Suspense>
          </main>
       
      </div>
    </section>
  );
}
