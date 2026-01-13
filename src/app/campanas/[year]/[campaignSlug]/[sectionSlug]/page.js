"use client";

import { use } from "react";
import BotonVolver from "@/components/UI/BotonVolver";
import SectionContainer from "@/components/UI/SectionContainer";
import Spinner from "@/components/UI/Spinner";
import { useFetchSectionGalleries } from "@/hooks/useFetchSectionGalleries";
import { useFetchGalleryImages } from "@/hooks/useFetchGalleryImages";
import Gallery from "@/components/Gallery";

function SectionPage({ params }) {
  const { year, campaignSlug, sectionSlug } = use(params);
  const {
    section,
    galleries,
    loading: galleriesLoading,
  } = useFetchSectionGalleries(parseInt(year), campaignSlug, sectionSlug);

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

  return (
    <SectionContainer id="seccion">
      <BotonVolver />

      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{section.name}</h1>
        {section.description && (
          <p className="text-gray-600">{section.description}</p>
        )}
      </div>

      <div className="space-y-16">
        {galleries.map((gallery) => (
          <GalleryCard key={gallery.id} gallery={gallery} />
        ))}
      </div>
    </SectionContainer>
  );
}

function GalleryCard({ gallery }) {
  const { images, loading } = useFetchGalleryImages(gallery.id);
  console.log("Gallery images:", images);

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
