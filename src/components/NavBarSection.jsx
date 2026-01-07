"use client";

import Image from "next/image";
import Link from "next/link";
import { ListIcon, UserIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { useState, useEffect } from "react";
import { useAuth } from "./auth/AuthProvider";
import { usePathname } from "next/navigation";

function NavBarSection() {
  const { session, isLoading, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLogOut, setIsOpenLogOut] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const pathName = usePathname();

  const items = [
    { label: "Biblioteca", href: "/#biblioteca", pathName: "/" },
    { label: "Campañas", href: "/campanas", pathName: "/campanas" },
  ];

  session && session.user
    ? items.push({
        label: "Herramientas",
        href: "/herramientas",
        pathName: "/herramientas",
      })
    : null;

  const handleModalToggle = () => {
    setIsOpenModal(!isOpenModal);
    setIsOpenLogOut(false);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsOpenLogOut(false);
  };

  const handleLogOutToggle = () => {
    setIsOpenLogOut(!isOpenLogOut);
  };

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
    <>
      <nav
        className={`bg-background h-24 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur transition-shadow duration-300 md:rounded-b-3xl md:px-12 xl:px-24 ${
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
          className={`bg-background supports-[backdrop-filter]:bg-background/80 absolute top-15 left-0 flex w-full flex-col items-center gap-4 rounded-b-3xl p-4 transition-transform duration-300 md:flex-row md:bg-transparent md:w-fit
          ${
            isOpen ? "translate-y-9" : "-translate-y-124"
          } shadow-md md:static md:translate-y-0 md:items-center md:shadow-none`}
        >
          <ul className="flex flex-col items-center gap-4 md:flex-row md:gap-12 font-medium text-foreground/60 transition">
            {items.map((item) => (
              <li
                key={item.href}
                className={`inline-block hover:text-foreground/100 ${
                  pathName === item.pathName ? "text-red-jamar/100" : ""
                }`}
              >
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            <li className="inline-block relative">
              {session && session.user ? (
                <>
                  <button
                    onClick={handleLogOutToggle}
                    className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-all duration-300 cursor-pointer"
                    aria-label="User menu"
                  >
                    <UserIcon size={32} className="text-white" />
                  </button>
                  {isOpenLogOut && (
                    <div
                      className={
                        "absolute top-12 right-0 w-40 h-18 rounded-2xl bg-white transition-all duration-300 flex items-center justify-center shadow-lg flex-col p-4"
                      }
                    >
                      <button
                        onClick={handleModalToggle}
                        className="text-white bg-red-jamar px-4 py-2 rounded-full cursor-pointer"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  className="bg-red-jamar hover:bg-red-jamar/60 text-white px-4 py-2 rounded-full transition-all duration-300"
                  href="/auth/login"
                >
                  Iniciar Sesión
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center transition-opacity duration-300 z-50 ${
          isOpenModal ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpenModal(false)}
      >
        <div
          className="bg-white p-8 rounded-lg w-96 z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-medium mb-4">
            ¿Seguro desea cerrar sesión?
          </h2>

          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={() => setIsOpenModal(false)}
              className="px-4 py-2 font-medium bg-gray-200 rounded-full hover:bg-gray-300 transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 font-medium bg-red-jamar text-white rounded-full hover:bg-red-jamar/60 transition cursor-pointer"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBarSection;
