"use client";

import { use } from "react";
import {
  BookIcon,
  ShoppingBagIcon,
  ImageIcon,
} from "@phosphor-icons/react/dist/ssr";
import BotonVolver from "@/components/UI/BotonVolver";
import SectionContainer from "@/components/UI/SectionContainer";
import CardCarpeta from "@/components/UI/CardCarpeta";
import Spinner from "@/components/UI/Spinner";
import { useFetchCampaignCategories } from "@/hooks/useFetchCampaignCategories";
import ModalCarpetaCampaña from "@/components/ModalCarpetaCampaña";

const categoryIcons = {
  toolkit: BookIcon,
  contenido: ShoppingBagIcon,
  catalogo: ImageIcon,
};

function CampaignDetailPage({ params }) {
  const { year, campaignSlug } = use(params);
  const { campaign, categories, loading, error } = useFetchCampaignCategories(
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

      <ModalCarpetaCampaña campaign={campaign} categories={categories} />

      <div className="mb-12">
        <h1 className="text-3xl font-medium mb-2">{campaign.name}</h1>
        {campaign.description && (
          <p className="text-gray-600">{campaign.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => {
          const IconComponent =
            categoryIcons[category.slug.split("-")[0]] || ImageIcon;
          return (
            <CardCarpeta
              key={category.id}
              titulo={category.name}
              color={category.color}
              link={`/campanas/${year}/${campaignSlug}/${category.slug}`}
              icon={
                IconComponent ? (
                  <IconComponent size={48} className="text-foreground m-4" />
                ) : null
              }
              description={category.description}
            />
          );
        })}
      </div>
    </SectionContainer>
  );
}

export default CampaignDetailPage;
