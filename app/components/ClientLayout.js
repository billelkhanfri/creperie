"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ClientLayout({ children }) {
  return (
    <>
      <header className="border-b border-gray-200 max-w-7xl w-full mx-auto">
        <Navbar />
      </header>

      <main className="flex-1 mx-auto w-full">{children}</main>

      <Footer />
    </>
  );
}
