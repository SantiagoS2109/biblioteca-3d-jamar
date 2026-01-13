"use client";

import { use } from "react";
import Link from "next/link";
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
import { useFetchCampaignDetails } from "@/hooks/useFetchCampaignDetails";

// Mapeo de iconos disponibles
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

function CampaignDetailPage({ params }) {
  const { year, campaignSlug } = use(params);
  const { campaign, sections, loading, error } = useFetchCampaignDetails(
    parseInt(year),
    campaignSlug
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

  if (error || !campaign) {
    return (
      <SectionContainer>
        <BotonVolver />
        <div className="text-center mt-24">
          <p className="text-red-500">
            Error: {error || "Campaña no encontrada"}
          </p>
        </div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer id="campana">
      <BotonVolver />

      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{campaign.name}</h1>
        {campaign.description && (
          <p className="text-gray-600">{campaign.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sections.map((section) => {
          const IconComponent = iconMap[section.icon];
          return (
            <CardCarpeta
              key={section.id}
              titulo={section.name}
              color={section.color}
              link={`/campanas/${year}/${campaignSlug}/${section.slug}`}
              icon={
                IconComponent ? (
                  <IconComponent size={48} className="text-foreground m-4" />
                ) : null
              }
            />
          );
        })}
      </div>
    </SectionContainer>
  );
}

export default CampaignDetailPage;
