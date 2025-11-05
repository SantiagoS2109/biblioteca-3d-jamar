import Link from "next/link";
import NavBarSection from "./components/NavBarSection";

function NotFound() {
  return (
    <div className="font-sans min-h-screen gap-16 relative">
      <NavBarSection />

      <div className="flex flex-col items-center justify-center mt-20">
        <h1 className="text-4xl font-bold mb-4">404 - Página no encontrada</h1>
        <p className="text-lg mb-8">
          Lo sentimos, la página que estás buscando no existe.
        </p>
        <Link
          href="/"
          className="px-4 py-2 bg-red-jamar text-white rounded hover:bg-red-600 transition"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
