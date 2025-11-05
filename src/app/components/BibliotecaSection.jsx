"use client";

import { useState } from "react";
import { useFetchModelos } from "../hooks/useFetchModelos";
import CardModelo from "./CardModelo";
import NavButtonsBiblioteca from "./NavButtonsBiblioteca";
import Spinner from "./Spinner";

function BibliotecaSection() {
  const [piso, setPiso] = useState(1);

  const { modelos, loading } = useFetchModelos(piso);
  const [searchTerm, setSearchTerm] = useState("");

  const descripcionPiso = {
    1: "Modelos social, dormitorio, sofás, comedores y más.",
    2: "Mesas de centro, butacas, paneles, puff, reclinables.",
    3: "Alfombras, cuadros, cojines, lámparas y accesorios.",
  };

  return (
    <section
      id="biblioteca"
      className="w-full flex flex-col items-center py-8 px-4 lg:px-64"
    >
      <h2 className="text-2xl font-medium mb-8 lg:text-4xl">Biblioteca</h2>

      <NavButtonsBiblioteca piso={piso} setPiso={setPiso} />

      {/* Aquí se mapearían los modelos 3D basados en el estado 'piso' */}

      {loading ? (
        <div className="flex items-center justify-center w-full mt-24">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center mb-8">
            <h3 className="text-xl font-medium mb-4">
              Piso {piso} - {descripcionPiso[piso]}
            </h3>
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
              <p className=" text-white">
                En total hay <span className="font-bold">{modelos.length}</span>{" "}
                modelos en este piso.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 w-full gap-4 mb-8 md:grid-cols-4 lg:grid-cols-5">
            {modelos
              .filter((modelo) =>
                modelo.nombre.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((modelo) => (
                <CardModelo key={modelo.id} modelo={modelo} />
              ))}
            {modelos.length === 0 && (
              <p className="col-span-full text-center text-gray-500 mt-8">
                No hay modelos disponibles en este piso.
              </p>
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default BibliotecaSection;
