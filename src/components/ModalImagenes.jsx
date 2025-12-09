"use client";

import { ImageIcon } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { useFetchModelos } from "../hooks/useFetchModelos";
import { supabase } from "../lib/supabase/supabaseClient";
import toast from "react-hot-toast";

function ModalImagenes({ onUploaded }) {
  const [isOpen, setIsOpen] = useState(false);
  const { modelos, loading } = useFetchModelos(1);

  const [selectedModelId, setSelectedModelId] = useState("");
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState({}); // opcional

  function handleFilesChange(e) {
    setFiles(Array.from(e.target.files));
  }

  function extractOrdenFromFilename(filename, fallbackIndex) {
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
    const m = nameWithoutExt.match(/_(\d+)$/);
    if (m) return parseInt(m[1], 10);
    return fallbackIndex + 1;
  }

  async function handleUpload() {
    const modelId = selectedModelId;
    if (!modelId) {
      alert("Falta modelId");
      return;
    }

    if (!files.length) return;
    setUploading(true);
    const bucket = "modelos";
    const uploadedEntries = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Sanitize filename or build your preferred filename:
      // Mantengo el nombre original para extraer el orden: `${file.name}`
      const path = `${modelId}/${file.name}`;
      try {
        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(path, file, { cacheControl: "3600", upsert: false });

        if (uploadError) {
          toast.error("Error al subir archivo: " + uploadError.message);
          // Puedes permitir reintentos o notificar al usuario
          continue;
        }

        const { data: publicData } = supabase.storage
          .from(bucket)
          .getPublicUrl(path);

        const orden = extractOrdenFromFilename(file.name, i);
        uploadedEntries.push({
          path_storage: path,
          public_url: publicData?.publicUrl || null,
          orden,
        });

        setProgress((prev) => ({ ...prev, [file.name]: "done" }));
      } catch (err) {
        console.error("Error subiendo archivo", err);
        setProgress((prev) => ({ ...prev, [file.name]: "error" }));
      }
    }

    // Insertar directamente usando Supabase client
    try {
      const rows = uploadedEntries.map((img) => ({
        modelo_id: modelId,
        path_storage: `modelos/${img.path_storage}`,
        orden: Number(img.orden) || 0,
      }));

      const { data, error } = await supabase
        .from("modeloImagenes")
        .insert(rows)
        .select();
      if (error) {
        toast.error(
          "Error al crear registros en la base de datos" + error.message
        );
      } else {
        onUploaded?.(data);
      }
    } catch (err) {
      toast.error("Error al crear registros en la base de datos");
    } finally {
      setUploading(false);
      setFiles([]);
      setSelectedModelId("");
      setIsOpen(false);
      toast.success("Imágenes subidas correctamente");
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    handleUpload();
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bottom-32 right-4 w-20 h-20 bg-red-600 text-white flex items-center justify-center rounded-full shadow-lg cursor-pointer hover:bg-red-700 transition-all duration-300 fixed"
      >
        <ImageIcon size={48} />
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
          <h2 className="text-2xl font-medium mb-4">Añadir imágenes</h2>

          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <select
              value={selectedModelId}
              onChange={(e) => setSelectedModelId(e.target.value)}
              className="border-2 border-gray-300 p-2 rounded-xl"
            >
              <option value="">Selecciona un modelo</option>
              {modelos &&
                modelos.map((modelo) => (
                  <option key={modelo.id} value={modelo.id}>
                    {modelo.nombre}
                  </option>
                ))}
            </select>

            <input
              type="file"
              multiple
              onChange={handleFilesChange}
              className="border-2 border-gray-300 p-2 rounded-xl transition-all outline-none focus:ring-2 focus:ring-offset-4 focus:ring-red-jamar/65"
            />
            <button
              type="submit"
              disabled={uploading || !files.length || !selectedModelId}
              className="bg-red-jamar text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300 disabled:opacity-50"
            >
              {uploading ? "Subiendo..." : "Subir imágenes"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ModalImagenes;
