"use client";

import { use, useState } from "react";
import Link from "next/link";
import SectionContainer from "@/components/UI/SectionContainer";
import BotonVolver from "@/components/UI/BotonVolver";
import Spinner from "@/components/UI/Spinner";
import { useFetchCampaigns } from "@/hooks/useFetchCampaigns";
import CardCarpeta from "@/components/UI/CardCarpeta";
import Image from "next/image";

function CampaignsYearPage({ params }) {
  const { year } = use(params);
  const { campaigns, loading, error } = useFetchCampaigns(parseInt(year));
  const [hoveredId, setHoveredId] = useState(null);

  const URL_BUCKET =
    "https://xadmunjbkvgnhlswupdv.supabase.co/storage/v1/object/public/";

  if (loading) {
    return (
      <SectionContainer>
        <div className="flex items-center justify-center w-full mt-24">
          <Spinner />
        </div>
      </SectionContainer>
    );
  }

  if (error) {
    return (
      <SectionContainer>
        <BotonVolver />
        <div className="text-center mt-24">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer id="campanas">
      <BotonVolver />

      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Campañas {year}</h1>
      </div>

      <div className="grid grid-cols-1 md:flex w-full md:h-[450px] gap-0">
        {campaigns.map((campaign) => {
          const isHovered = hoveredId === campaign.id;
          const flexGrow = hoveredId === null ? 1 : isHovered ? 2 : 0.8;

          return (
            <Link
              key={campaign.id}
              href={`/campanas/${year}/${campaign.slug}`}
              className={`group relative overflow-hidden cursor-pointer rounded-lg transition-all duration-500 ${
                isHovered ? "z-10 shadow-lg" : ""
              }`}
              onMouseEnter={() => setHoveredId(campaign.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(campaign.id)}
              onBlur={() => setHoveredId(null)}
              style={{ flexBasis: 0, flexGrow }}
            >
              <Image
                width={800}
                height={800}
                src={URL_BUCKET + campaign.path_portada}
                alt={campaign.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-2xl font-semibold text-center px-4">
                  {campaign.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </SectionContainer>
  );
}

export default CampaignsYearPage;
