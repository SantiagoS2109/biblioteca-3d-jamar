"use client";

import { use, useState } from "react";
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

      <div className="space-y-16">
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-6">{gallery.name}</h2>
      {gallery.description && (
        <p className="text-gray-600 mb-6">{gallery.description}</p>
      )}
      {images.length > 0 && <Gallery imgs={images} />}
    </div>
  );
}

export default SectionPage;
