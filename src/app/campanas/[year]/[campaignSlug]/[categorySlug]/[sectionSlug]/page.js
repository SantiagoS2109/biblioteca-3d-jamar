"use client";

import { use, useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import BotonVolver from "@/components/UI/BotonVolver";
import SectionContainer from "@/components/UI/SectionContainer";
import Spinner from "@/components/UI/Spinner";
import ModalCrearGallery from "@/components/UI/ModalCrearGallery";
import { useFetchSectionGalleries } from "@/hooks/useFetchSectionGalleries";
import { useFetchGalleryImages } from "@/hooks/useFetchGalleryImages";
import Gallery from "@/components/Gallery";
import {
  PlusIcon,
  CaretDownIcon,
  DownloadIcon,
} from "@phosphor-icons/react/dist/ssr";

function SectionPage({ params }) {
  const { year, campaignSlug, categorySlug, sectionSlug } = use(params);
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const {
    section,
    galleries,
    loading: galleriesLoading,
  } = useFetchSectionGalleries(
    parseInt(year),
    campaignSlug,
    categorySlug,
    sectionSlug,
  );

  const handleGalleryCreated = () => {
    setRefreshKey((prev) => prev + 1); // Forzar recarga de galleries
  };

  if (galleriesLoading) {
    return (
      <SectionContainer>
        <div className="flex items-center justify-center w-full mt-24">
          <Spinner />
        </div>
      </SectionContainer>
    );
  }

  if (!section) {
    return (
      <SectionContainer>
        <BotonVolver />
        <div className="text-center mt-24">
          <p className="text-red-500">Sección no encontrada</p>
        </div>
      </SectionContainer>
    );
  }

  const bucketPath = `${year}/${campaignSlug}/${categorySlug}/${sectionSlug}`;

  return (
    <SectionContainer id="seccion">
      <BotonVolver />

      <div className="mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-medium mb-2">{section.name}</h1>
          {section.description && (
            <p className="text-gray-600">{section.description}</p>
          )}
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-red-jamar text-white px-4 py-2 rounded-lg hover:bg-red-jamar/80 transition-colors"
        >
          <PlusIcon size={20} />
          Nueva Galería
        </button>
      </div>

      <div className="space-y-4">
        {galleries.map((gallery) => (
          <GalleryCard key={`${gallery.id}-${refreshKey}`} gallery={gallery} />
        ))}
      </div>

      <ModalCrearGallery
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        sectionId={section.id}
        onGalleryCreated={handleGalleryCreated}
        bucketPath={bucketPath}
      />
    </SectionContainer>
  );
}

function GalleryCard({ gallery }) {
  const { images, loading } = useFetchGalleryImages(gallery.id);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadGallery = async () => {
    if (images.length === 0) return;

    setIsDownloading(true);

    try {
      const zip = new JSZip();
      const folder = zip.folder(gallery.name);

      // Descargar todas las imágenes y agregarlas al ZIP
      const downloadPromises = images.map(async (image, index) => {
        try {
          const response = await fetch(image.src);
          const blob = await response.blob();

          // Generar nombre de archivo único
          const fileName = `${image.title || `imagen-${index + 1}`}`;
          folder.file(fileName, blob);
        } catch (error) {
          console.error(`Error descargando imagen ${index + 1}:`, error);
        }
      });

      await Promise.all(downloadPromises);

      // Generar y descargar el ZIP
      const content = await zip.generateAsync({ type: "blob" });
      const fileName = `${gallery.name.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.zip`;
      saveAs(content, fileName);
    } catch (error) {
      console.error("Error creando ZIP:", error);
      alert("Error al descargar las imágenes. Por favor intenta de nuevo.");
    } finally {
      setIsDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Header desplegable */}
      <div className="w-full flex items-center justify-between p-6 bg-gray-50 hover:bg-gray-100 transition-colors">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-4 flex-1 text-left"
        >
          <CaretDownIcon
            size={24}
            className={`text-gray-600 transition-transform ${
              isExpanded ? "rotate-0" : "-rotate-90"
            }`}
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{gallery.name}</h2>
            {gallery.description && (
              <p className="text-sm text-gray-600 mt-1">
                {gallery.description}
              </p>
            )}
          </div>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full">
            {images.length} imagen{images.length !== 1 ? "es" : ""}
          </span>

          {images.length > 0 && (
            <button
              onClick={downloadGallery}
              disabled={isDownloading}
              className="flex w-12 h-12 items-center gap-2 bg-red-400 text-white justify-center rounded-full hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
              title="Descargar todas las imágenes"
            >
              <DownloadIcon size={24} />
            </button>
          )}
        </div>
      </div>

      {/* Contenido desplegable */}
      {isExpanded && (
        <div className="p-6 border-t border-gray-200">
          {images.length > 0 ? (
            <Gallery imgs={images} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No hay imágenes en esta galería</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SectionPage;
