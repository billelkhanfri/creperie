"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./SidebarActualite";
import { IoChevronForward } from "react-icons/io5";
import { CgClose } from "react-icons/cg";

export default function LayoutClient({ children, actualites }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const hideSidebarPaths = ["/admin"];
  const showSidebar = !hideSidebarPaths.includes(pathname);

  return (
    <>
      {/* Bouton menu MOBILE */}
      {showSidebar && (
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden fixed top-20 left-0 z-50 bg-primary text-white p-3 rounded-r-xl shadow-lg"
        >
          <IoChevronForward  size={22}/>
        </button>
      )}

      <main className="flex flex-1 w-full max-w-7xl mx-auto">
        {/* SIDEBAR DESKTOP */}
        {showSidebar && (
          <aside className="hidden lg:block w-64 border-r border-gray-200">
            <Sidebar actualites={actualites} />
          </aside>
        )}

        {/* CONTENU */}
        <section className="flex-1 p-4">{children}</section>
      </main>

      {/* SIDEBAR MOBILE (DRAWER) */}
      {showSidebar && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setOpen(false)}
            className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
              open ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          />

          {/* Drawer */}
          <aside
            className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300
            ${open ? "translate-x-0" : "-translate-x-full"}`}
          >
            <div className="  p-4 border-b">
              <button onClick={() => setOpen(false)}>
                <CgClose size={20} />
              </button>
            </div>

            <Sidebar actualites={actualites} />
          </aside>
        </>
      )}
    </>
  );
}
