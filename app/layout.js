

import "./globals.css";
import Navbar from "./components/navbar";


export const metadata = {
  title: "Crêperie Moderne — Toulon",
  description: "Crêpes maison, produits locaux et ambiance moderne.",
};

export default function RootLayout({ children }) {

  return (
    <html lang="fr">
      <body className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="border-b border-gray-200">
          <Navbar/>
        </header>

        {/* Contenu */}
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 text-center py-4 text-sm text-gray-500">
          © {new Date().getFullYear()} Crêperie Moderne — Toulon
        </footer>
      </body>
    </html>
  );
}
