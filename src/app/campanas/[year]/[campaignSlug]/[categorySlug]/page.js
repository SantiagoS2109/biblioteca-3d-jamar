"use client";

import { use } from "react";
import {
  Storefront,
  Info,
  Palette,
  Couch,
  Images,
  Panorama,
  FileText,
  Video,
} from "@phosphor-icons/react";
import BotonVolver from "@/components/UI/BotonVolver";
import SectionContainer from "@/components/UI/SectionContainer";
import CardCarpeta from "@/components/UI/CardCarpeta";
import Spinner from "@/components/UI/Spinner";
import { useFetchCategorySections } from "@/hooks/useFetchCategorySections";

// Mapeo de iconos
const iconMap = {
  StorefrontIcon: Storefront,
  InfoIcon: Info,
  PaletteIcon: Palette,
  CouchIcon: Couch,
  ImagesIcon: Images,
  PanoramaIcon: Panorama,
  FileTextIcon: FileText,
  VideoIcon: Video,
};

function CategoryPage({ params }) {
  const { year, campaignSlug, categorySlug } = use(params);
  const { category, sections, loading, error } = useFetchCategorySections(
    parseInt(year),
    campaignSlug,
    categorySlug
  );

  if (loading) {
    return (
      <SectionContainer>
        <div className="flex items-center justify-center w-full mt-24">
          <Spinner />
        </div>
      </SectionContainer>
    );
  }

  if (error || !category) {
    return (
      <SectionContainer>
        <BotonVolver />
        <div className="text-center mt-24">
          <p className="text-red-500">
            Error: {error || "Categoría no encontrada"}
          </p>
        </div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer id="categoria">
      <BotonVolver />

      <div className="mb-12">
        <h1 className="text-3xl font-medium mb-2">{category.name}</h1>
        {category.description && (
          <p className="text-gray-600">{category.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sections.map((section) => {
          const IconComponent = iconMap[section.icon_type];
          return (
            <CardCarpeta
              key={section.id}
              titulo={section.name}
              color={section.color}
              link={`/campanas/${year}/${campaignSlug}/${categorySlug}/${section.slug}`}
              icon={
                IconComponent ? (
                  <IconComponent size={48} className="text-foreground m-4" />
                ) : null
              }
              description={section.description}
            />
          );
        })}
      </div>
    </SectionContainer>
  );
}

export default CategoryPage;
