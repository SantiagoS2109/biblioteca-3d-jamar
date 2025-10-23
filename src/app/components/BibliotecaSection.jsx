"use client";

import { useState } from "react";

function BibliotecaSection() {
  const [piso, setPiso] = useState(1);

  return (
    <section className="w-full flex flex-col items-center py-8 px-4 lg:px-64 bg-red-300">
      <h2 className="text-2xl font-medium mb-8 lg:text-4xl">Biblioteca</h2>

      <div className="grid grid-cols-3 w-full gap-4 mb-8 lg:grid-cols-6">
        <button
          onClick={() => setPiso(1)}
          className="bg-white text-black font-medium py-2 px-4 rounded-full cursor-pointer hover:bg-gray-100 transition"
        >
          Piso 1
        </button>
        <button
          onClick={() => setPiso(2)}
          className="bg-white text-black font-medium py-2 px-4 rounded-full cursor-pointer hover:bg-gray-100 transition"
        >
          Piso 2
        </button>
        <button
          onClick={() => setPiso(3)}
          className="bg-white text-black font-medium py-2 px-4 rounded-full cursor-pointer hover:bg-gray-100 transition"
        >
          Piso 3
        </button>
      </div>

      <div className="grid grid-cols-2 w-full gap-4 mb-8 lg:grid-cols-6">
        {/* Aquí se mapearían los modelos 3D basados en el estado 'piso' */}
        <h2>Piso {piso}</h2>
      </div>
    </section>
  );
}

export default BibliotecaSection;
