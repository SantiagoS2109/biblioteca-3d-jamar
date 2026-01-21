"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import {
  XIcon,
  PlusIcon,
  UploadIcon,
  ImageIcon,
} from "@phosphor-icons/react/dist/ssr";

function ModalCrearGallery({
  isOpen,
  onClose,
  sectionId,
  onGalleryCreated,
  bucketPath,
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith("image/"),
      );
      setImages((prev) => [...prev, ...files]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const files = Array.from(e.target.files).filter((file) =>
        file.type.startsWith("image/"),
      );
      setImages((prev) => [...prev, ...files]);
    }
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadImage = async (file, galleryId) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${bucketPath}/${galleryId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("campanas")
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    return filePath;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || images.length === 0) {
      alert("Por favor ingresa un nombre y selecciona al menos una imagen");
      return;
    }

    setUploading(true);

    try {
      // Generar slug a partir del nombre
      let baseSlug = formData.name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "") // Remover caracteres especiales
        .replace(/\s+/g, "-") // Reemplazar espacios con guiones
        .replace(/-+/g, "-") // Remover guiones múltiples
        .replace(/^-|-$/g, ""); // Remover guiones al inicio y final

      if (!baseSlug) {
        baseSlug = `galeria-${Date.now()}`;
      }

      // Verificar si el slug ya existe y generar uno único
      let slug = baseSlug;
      let counter = 1;
      let slugExists = true;

      while (slugExists) {
        const { data: existingGallery } = await supabase
          .from("section_galleries")
          .select("id")
          .eq("section_id", sectionId)
          .eq("slug", slug)
          .single();

        if (!existingGallery) {
          slugExists = false;
        } else {
          slug = `${baseSlug}-${counter}`;
          counter++;
        }
      }

      // Crear la gallery
      const { data: gallery, error: galleryError } = await supabase
        .from("section_galleries")
        .insert([
          {
            section_id: sectionId,
            name: formData.name.trim(),
            slug: slug,
            description: formData.description.trim() || null,
            order: 0, // TODO: calcular orden basado en las existentes
          },
        ])
        .select()
        .single();

      if (galleryError) throw galleryError;

      // Subir imágenes y crear registros
      const imagePromises = images.map(async (file, index) => {
        const filePath = await uploadImage(file, gallery.id);

        return supabase.from("gallery_images").insert([
          {
            gallery_id: gallery.id,
            path_storage: "campanas/" + filePath,
            title: file.name,
            orden: index,
          },
        ]);
      });

      const imageResults = await Promise.all(imagePromises);

      // Verificar si alguna subida falló
      const failedUploads = imageResults.filter((result) => result.error);
      if (failedUploads.length > 0) {
        console.error("Errores en subida de imágenes:", failedUploads);
        // TODO: manejar errores de subida
      }

      // Resetear formulario
      setFormData({ name: "", description: "" });
      setImages([]);
      onGalleryCreated();
      onClose();
    } catch (error) {
      console.error("Error creando gallery:", error);
      alert("Error al crear la galería. Por favor intenta de nuevo.");
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Crear Nueva Galería</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <XIcon size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Nombre de la galería */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de la Galería *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Fotos principales, Detalles del producto..."
              required
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción (opcional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe el contenido de esta galería..."
            />
          </div>

          {/* Subida de imágenes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imágenes *
            </label>

            {/* Área de drop */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <UploadIcon size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">
                Arrastra y suelta imágenes aquí, o{" "}
                <label className="text-blue-500 hover:text-blue-600 cursor-pointer">
                  selecciona archivos
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              </p>
              <p className="text-sm text-gray-500">
                PNG, JPG, GIF hasta 10MB cada uno
              </p>
            </div>

            {/* Vista previa de imágenes */}
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((file, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <XIcon size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
              disabled={uploading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-jamar text-white hover:bg-red-jamar/80 rounded-md disabled:opacity-50"
              disabled={
                uploading || !formData.name.trim() || images.length === 0
              }
            >
              {uploading ? "Creando..." : "Crear Galería"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalCrearGallery;
