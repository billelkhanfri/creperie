import "./globals.css";
import ClientLayout from "./components/ClientLayout";

export const metadata = {
  title: "CAAA — coeur de ville - Toulon",
  description: "Crêpes maison, produits locaux et ambiance moderne.",
};

export default function RootLayout({ children }) {
  return (
    <html data-theme="corporate" lang="fr">
      <body className="flex flex-col min-h-screen">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
