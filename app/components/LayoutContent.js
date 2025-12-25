"use client";
import { usePathname } from "next/navigation";
import HeroVideo from "../components/HeroVideo";

export default function LayoutContent({ children }) {
  const pathname = usePathname();

  return (
    <>
      {/* Hero seulement sur la home */}
      {pathname === "/" && <HeroVideo />}
      {children}
    </>
  );
}
