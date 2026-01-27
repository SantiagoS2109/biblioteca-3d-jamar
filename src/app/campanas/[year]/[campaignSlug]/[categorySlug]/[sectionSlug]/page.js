"use client";

import { use, useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import BotonVolver from "@/components/UI/BotonVolver";
import SectionContainer from "@/components/UI/SectionContainer";
import Spinner from "@/components/UI/Spinner";
import ModalCrearGallery from "@/components/UI/ModalCrearGallery";
import { useFetchSectionGalleries } from "@/hooks/useFetchSectionGalleries";
import { useFetchGalleryImages } from "@/hooks/useFetchGalleryImages";
import Gallery from "@/components/Gallery";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr";

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
  const [isExpanded, setIsExpanded] = useState(false);
  const { images, loading } = useFetchGalleryImages(gallery.id);

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
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-4">
          <CaretDown
            size={24}
            className={`text-gray-600 transition-transform ${
              isExpanded ? "rotate-0" : "-rotate-90"
            }`}
          />
          <div className="text-left">
            <h2 className="text-2xl font-bold text-gray-900">{gallery.name}</h2>
            {gallery.description && (
              <p className="text-sm text-gray-600 mt-1">
                {gallery.description}
              </p>
            )}
          </div>
        </div>
        <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full">
          {images.length} imagen{images.length !== 1 ? "es" : ""}
        </span>
      </button>

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
