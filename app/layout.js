import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "CAAA — coeur de ville - Toulon",
  description: "Crêpes maison, produits locaux et ambiance moderne.",
};

export default function RootLayout({ children }) {
  return (
    <html data-theme="corporate" lang="fr">
      <body className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="border-b border-gray-200 max-w-7xl w-full mx-auto">
          <Navbar />
        </header>

        {/* Contenu */}

        <main className="flex-1  mx-auto w-full ">{children}</main>

        {/* Footer */}
        <Footer></Footer>
      </body>
    </html>
  );
}
