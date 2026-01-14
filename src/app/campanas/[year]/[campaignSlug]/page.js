"use client";

import { use } from "react";
import Link from "next/link";
import BotonVolver from "@/components/UI/BotonVolver";
import SectionContainer from "@/components/UI/SectionContainer";
import CardCarpeta from "@/components/UI/CardCarpeta";
import Spinner from "@/components/UI/Spinner";
import { useFetchCampaignDetails } from "@/hooks/useFetchCampaignDetails";

// // Mapeo de iconos
// const iconMap = {
//   StorefrontIcon: () => require("@phosphor-icons/react/dist/ssr").StorefrontIcon,
//   InfoIcon: () => require("@phosphor-icons/react/dist/ssr").InfoIcon,
//   PaletteIcon: () => require("@phosphor-icons/react/dist/ssr").PaletteIcon,
//   CouchIcon: () => require("@phosphor-icons/react/dist/ssr").CouchIcon,
//   ImagesIcon: () => require("@phosphor-icons/react/dist/ssr").ImagesIcon,
//   PanoramaIcon: () => require("@phosphor-icons/react/dist/ssr").PanoramaIcon,
//   FileTextIcon: () => require("@phosphor-icons/react/dist/ssr").FileTextIcon,
//   VideoIcon: () => require("@phosphor-icons/react/dist/ssr").VideoIcon,
// };

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
        <BotonVolver href={`/#biblioteca`} />
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
        <h1 className="text-3xl font-medium mb-2">{campaign.name}</h1>
        {campaign.description && (
          <p className="text-gray-600">{campaign.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sections.map((section) => {
          // const IconComponent = iconMap[section.icon_type]?.();
          return (
            <CardCarpeta
              key={section.id}
              titulo={section.name}
              color={section.color}
              link={`/campanas/${year}/${campaignSlug}/${section.slug}`}
              // icon={
              //   IconComponent ? (
              //     <IconComponent size={48} className="text-foreground m-4" />
              //   ) : null
              // }
            />
          );
        })}
      </div>
    </SectionContainer>
  );
}

export default CampaignDetailPage;
