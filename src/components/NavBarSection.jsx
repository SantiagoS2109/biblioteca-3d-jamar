"use client";

import Image from "next/image";
import Link from "next/link";
import { ListIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { useState, useEffect } from "react";

function NavBarSection() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [hasShadow, setHasShadow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHasShadow(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    const target = document.querySelector("#top-anchor");
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      const navbarHeight = document.querySelector("nav").offsetHeight;
      const targetPosition = target.offsetTop - navbarHeight; // Ajusta el desplazamiento
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false); // Cierra el menú en mobile
  };

  return (
    <nav
      className={`bg-background supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur transition-shadow duration-300 md:rounded-b-3xl md:px-12 xl:px-24 ${
        hasShadow ? "shadow-md" : ""
      }`}
    >
      <Link
        href="/"
        className="text-sm font-medium text-foreground/60 hover:text-foreground/100 transition"
      >
        <Image
          src="https://www.jamar.com/cdn/shop/files/Logo-Jamar_new.svg?v=1721659704&width=100"
          alt="Jamar Logo"
          width={200}
          height={200}
          className="w-32 md:w-40 object-contain"
        />
      </Link>

      {/* Botón Hamburguesa */}
      <button
        onClick={toggleMenu}
        className="text-red-jamar md:hidden"
        aria-label="Toggle menu"
      >
        {isOpen ? <XIcon size={32} /> : <ListIcon size={32} />}
      </button>

      {/* Menu */}
      <div
        className={`bg-background supports-[backdrop-filter]:bg-background/80 absolute top-16 left-0 flex w-full flex-col items-center gap-4 rounded-b-3xl p-4 transition-transform duration-300 md:flex-row md:bg-transparent md:w-fit
           ${
             isOpen ? "translate-y-1" : "-translate-y-124"
           } shadow-md md:static md:translate-y-0 md:items-center md:shadow-none`}
      >
        <ul className="flex flex-col items-center gap-4 md:flex-row md:gap-12 font-medium text-foreground/60 transition">
          <li className="inline-block hover:text-foreground/100">
            <Link href="#biblioteca">Biblioteca</Link>
          </li>
          <li className="inline-block hover:text-foreground/100">
            <Link href="#modelos-3d">Campañas</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBarSection;
