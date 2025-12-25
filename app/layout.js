import "./globals.css";
import Navbar from "./components/Navigation";
import Footer from "./components/Footer";
import LayoutClient from "./components/LayoutClient";
import { createSupabaseServer } from "./lib/supabase/server";
import LayoutContent from "./components/LayoutContent";


export const metadata = {
  title: "CAAA — coeur de ville - Toulon",
  description:
    "l'alphabétisation, l'apprentissage du Français Langue Etrangère et l'accompagnement à la scolarité des enfants",
};

export default async function RootLayout({ children }) {
  const supabase = await createSupabaseServer();

  const { data: actualites, error } = await supabase
    .from("actualites")
    .select();

  return (
    <html data-theme="corporate" lang="fr">
      <body className="flex flex-col min-h-screen">
        <header className="border-b border-gray-200 max-w-7xl w-full mx-auto">
          <Navbar />
        </header>
<LayoutContent></LayoutContent>
        <LayoutClient actualites={actualites ?? []}>
         
          {children}
          </LayoutClient>

        <Footer />
      </body>
    </html>
  );
}
