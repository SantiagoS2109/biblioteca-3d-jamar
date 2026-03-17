"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useFetchModelos } from "../hooks/useFetchModelos";
import CardModelo from "./CardModelo";
import NavButtonsBiblioteca from "./NavButtonsBiblioteca";
import Spinner from "./UI/Spinner";

function BibliotecaSection() {
  const searchParams = useSearchParams();

  const [piso, setPiso] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [piso3View, setPiso3View] = useState("modelo");

  const [contenedor, setContenedor] = useState("3866");

  // Sincronizar el estado con la URL
  useEffect(() => {
    const pisoFromUrl = searchParams.get("piso");
    const piso3ViewFromUrl = searchParams.get("view");

    if (pisoFromUrl) {
      setPiso(parseInt(pisoFromUrl, 10));
    }
    if (piso3ViewFromUrl) {
      setPiso3View(piso3ViewFromUrl);
    }
  }, [searchParams]);

  // Actualizar la URL cuando cambia el piso (sin recargar la página)
  const handlePisoChange = (newPiso) => {
    setPiso(newPiso);
    window.history.pushState(null, "", `?piso=${newPiso}`);
  };

  // Actualizar la URL cuando cambia la vista del piso 3 (sin recargar la página)
  const handlePiso3ViewChange = (newView) => {
    setPiso3View(newView);
    window.history.pushState(null, "", `?piso=3&view=${newView}`);
  };

  const { modelos, loading } = useFetchModelos(piso, piso3View);

  const descripcionPiso = {
    1: "Modelos social, dormitorio, sofás, comedores y más.",
    2: "Mesas de centro, butacas, paneles, puff, reclinables.",
    3: "Alfombras, cuadros, cojines, lámparas y accesorios.",
  };

  const contenedorCodigos = Array.from(
    new Set(modelos.map((m) => m.contenedor).filter(Boolean)),
  );

  const modelosFiltrados = modelos
    .filter((m) => (piso !== 3 ? true : m.tipo === piso3View))
    .filter((m) => {
      if (piso !== 3) return true;
      if (piso3View === "contenedor") {
        if (!contenedor) return true;
        return m.contenedor === contenedor;
      }
      return true; // piso3View === 'modelo'
    })
    .filter((m) => m.nombre.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <section
      id="biblioteca"
      className="w-full flex flex-col items-center py-8 px-4 lg:px-32"
    >
      <h2 className="text-2xl font-medium mb-4">Biblioteca</h2>

      <NavButtonsBiblioteca piso={piso} setPiso={handlePisoChange} />

      {piso === 3 && (
        <div className="flex justify-center mb-12">
          <div className="relative flex bg-gray-100 rounded-full p-1 w-fit">
            {/* Fondo animado que se desliza */}
            <div
              className="absolute top-1 bottom-1 rounded-full bg-red-jamar transition-all duration-300 ease-out"
              style={{
                left:
                  piso3View === "modelo" ? "0.25rem" : "calc(50% + 0.25rem)",
                width: "calc(50% - 0.5rem)",
              }}
            />

            {/* Botones */}
            <button
              onClick={() => handlePiso3ViewChange("modelo")}
              className={`relative z-10 px-6 py-2 rounded-full font-medium transition-colors duration-300 ${
                piso3View === "modelo"
                  ? "text-white"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Modelos
            </button>

            <button
              onClick={() => handlePiso3ViewChange("contenedor")}
              className={`relative z-10 px-6 py-2 rounded-full font-medium transition-colors duration-300 ${
                piso3View === "contenedor"
                  ? "text-white"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Contenedores
            </button>
          </div>
        </div>
      )}

      {piso === 3 && piso3View === "contenedor" && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {contenedorCodigos.map((codigo) => (
            <button
              key={codigo}
              onClick={() => setContenedor(codigo)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                contenedor === codigo
                  ? "bg-red-jamar text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {codigo}
            </button>
          ))}
        </div>
      )}

      {/* Aquí se mapearían los modelos 3D basados en el estado 'piso' */}

      {loading ? (
        <div className="flex items-center justify-center w-full mt-24">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center mb-8">
            <span className="font-medium mb-4">
              Piso {piso} - {descripcionPiso[piso]}
            </span>
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                placeholder="Buscar modelo..."
                className="border-2 border-gray-300 p-4 rounded-full w-full mb-8 transition-all duration-300 outline-0 focus:ring-2 focus:ring-offset-2 focus:ring-red-jamar/65 "
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
              {searchTerm && (
                <button
                  className="absolute right-6 top-4.5 transform text-gray-500 hover:text-gray-800 cursor-pointer"
                  onClick={() => setSearchTerm("")}
                >
                  X
                </button>
              )}
            </div>

            <div className="flex justify-center bg-red-400 rounded-2xl py-2 px-4 w-fit">
              <p className="text-white">
                En total hay{" "}
                <span className="font-bold">{modelosFiltrados.length}</span>{" "}
                modelos en este piso.
              </p>
            </div>
          </div>

          <div className="w-full">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6">
              {modelosFiltrados.map((modelo) => (
                <CardModelo key={modelo.id} modelo={modelo} />
              ))}
              {modelos.length === 0 && (
                <p className="col-span-full text-center text-gray-500 mt-8">
                  No hay modelos disponibles en este piso.
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default BibliotecaSection;
