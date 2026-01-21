"use client";

import { FolderIcon } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase/supabaseClient";

function ModalCarpetaCampaña({ campaign, categories }) {
  console.log("Campaign in ModalCarpetaCampaña:", campaign);
  console.log("Categories in ModalCarpetaCampaña:", categories);

  const optionsColors = [
    { label: "Verde", value: "green" },
    { label: "Rojo", value: "red" },
    { label: "Azul", value: "blue" },
    { label: "Morado", value: "purple" },
    { label: "Teal", value: "teal" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    category_id: "",
    name: "",
    slug: campaign ? campaign.slug + "-" : "",
    color: "",
    order: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category_id || !formData.name || !formData.slug) {
      toast.error("Campos necesarios faltantes.");
      return;
    }

    const { error } = await supabase.from("campaign_sections").insert([
      {
        category_id: formData.category_id,
        name: formData.name,
        slug: formData.slug,
        color: formData.color,
        order: Number(formData.order),
      },
    ]);

    if (error) {
      toast.error("Error al crear la carpeta. Inténtalo de nuevo.");
      console.error("Error al crear la carpeta:", error);
    } else {
      toast.success("Carpeta creada exitosamente.");
      setFormData({
        category_id: "",
        name: "",
        slug: campaign ? campaign.slug + "-" : "",
        color: "",
        order: "",
      });
    }

    setIsOpen(false); // Cerrar el modal después de enviar
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bottom-4 right-4 w-14 h-14 bg-red-600 text-white flex items-center justify-center rounded-full shadow-lg cursor-pointer hover:bg-red-700 transition-all duration-300 fixed"
      >
        <FolderIcon size={32} />
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
          <h2 className="text-xl font-medium mb-4">
            Añadir nueva carpeta - {campaign?.name}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <select
              value={formData.category_id}
              onChange={(e) =>
                setFormData({ ...formData, category_id: e.target.value })
              }
              className="border border-gray-300 rounded px-3 py-2 w-full"
            >
              <option value="">Selecciona una categoría</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <div className="flex gap-2">
              <input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                type="text"
                placeholder="Nombre de la carpeta"
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />

              <input
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                type="text"
                placeholder="Slug"
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>

            <select
              value={formData.color}
              onChange={(e) =>
                setFormData({ ...formData, color: e.target.value })
              }
              className="border border-gray-300 rounded px-3 py-2 w-full"
            >
              <option value="">Color</option>
              {optionsColors.map((color) => (
                <option key={color.value} value={color.value}>
                  {color.label}
                </option>
              ))}
            </select>

            <input
              value={formData.order}
              onChange={(e) =>
                setFormData({ ...formData, order: e.target.value })
              }
              type="text"
              placeholder="Orden de la carpeta"
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />

            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Crear Carpeta
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ModalCarpetaCampaña;
