"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import toast from "react-hot-toast";
import { CouchIcon } from "@phosphor-icons/react/dist/ssr";

function NuevoModelo() {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    codigo: "",
    nombre: "",
    link: "",
    piso: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.codigo ||
      !formData.nombre ||
      !formData.link ||
      !formData.piso
    ) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    const { error } = await supabase.from("biblioteca").insert([
      {
        codigo: formData.codigo,
        nombre: formData.nombre,
        link: formData.link,
        piso: Number(formData.piso),
      },
    ]);

    if (error) {
      toast.error("Error al agregar el modelo. Inténtalo de nuevo.");
      console.error("Error al agregar el modelo:", error);
    } else {
      toast.success("Modelo agregado exitosamente.");
      setFormData({
        codigo: "",
        nombre: "",
        link: "",
        piso: "",
      });
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bottom-4 right-4 w-20 h-20 bg-red-600 text-white flex items-center justify-center rounded-full shadow-lg cursor-pointer hover:bg-red-700 transition-all duration-300 fixed"
      >
        <CouchIcon size={48} />
      </button>

      <div
        className={`fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center transition-opacity duration-300 z-50 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className="bg-white p-8 rounded-lg w-96 z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-medium mb-4">Añadir nuevo modelo</h2>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <InputField
              placeholder="Código del modelo"
              value={formData.codigo}
              onChange={(e) =>
                setFormData({ ...formData, codigo: e.target.value })
              }
            />

            <InputField
              placeholder="Nombre del modelo"
              value={formData.nombre}
              onChange={(e) =>
                setFormData({ ...formData, nombre: e.target.value })
              }
            />

            <InputField
              placeholder="URL del modelo"
              value={formData.link}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
            />

            <select
              className="border-2 border-gray-300 p-2 rounded-xl transition-all outline-none focus:ring-2 focus:ring-offset-4 focus:ring-red-jamar/65"
              value={formData.piso}
              onChange={(e) =>
                setFormData({ ...formData, piso: e.target.value })
              }
            >
              <option value="">Selecciona el piso</option>
              <option value="1">Piso 1</option>
              <option value="2">Piso 2</option>
              <option value="3">Piso 3</option>
            </select>
            <button
              type="submit"
              className="btn-primario bg-red-jamar text-white"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default NuevoModelo;

function InputField({ placeholder, value, onChange }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="border-2 border-gray-300 p-2 rounded-xl transition-all outline-none focus:ring-2 focus:ring-offset-4 focus:ring-red-jamar/65"
      value={value}
      onChange={onChange}
    />
  );
}
