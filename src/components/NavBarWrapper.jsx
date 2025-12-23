"use client";

import { usePathname } from "next/navigation";
import NavBarSection from "@/components/NavBarSection";

export default function NavBarWrapper() {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/auth');

  if (isAuthPage) {
    return null;
  }

  return <NavBarSection />;
}
