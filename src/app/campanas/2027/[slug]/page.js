"use client";

import { use } from "react";
import BotonVolver from "@/components/UI/BotonVolver";
import SectionContainer from "@/components/UI/SectionContainer";
import { campañas2025 } from "@/data/2025/campañas";
// import { ondara } from "@/data/2025/campañas";
import CardCarpeta from "@/components/UI/CardCarpeta";
import {
  CouchIcon,
  FileTextIcon,
  ImagesIcon,
  InfoIcon,
  PaletteIcon,
  PanoramaIcon,
  StorefrontIcon,
  VideoIcon,
} from "@phosphor-icons/react/dist/ssr";

function Campañas2025Page({ params }) {
  const { slug } = use(params);

  const campana = campañas2025.find((c) => c.slug === slug);

  const contenidoCampana = [
    {
      titulo: "Exhibición en Tiendas",
      color: "bg-amber-200",
      icon: <StorefrontIcon size={48} className="text-foreground m-4" />,
      link: `/campanas/2025/${slug}/exhibicion-en-tiendas`,
    },
    {
      titulo: "Información de Producto",
      color: "bg-blue-200",
      icon: <InfoIcon size={48} className="text-foreground m-4" />,
    },
    {
      titulo: "Moodboard - Colores de la Colección",
      color: "bg-red-200",
      icon: <PaletteIcon size={48} className="text-foreground m-4" />,
    },
    {
      titulo: "Productos Ambiente Editorial",
      color: "bg-teal-200",
      icon: <CouchIcon size={48} className="text-foreground m-4" />,
    },
    {
      titulo: "Productos Fondo Blanco",
      color: "bg-green-200",
      icon: <ImagesIcon size={48} className="text-foreground m-4" />,
    },
    {
      titulo: "Renders Finales ONDARA",
      color: "bg-lime-200",
      icon: <PanoramaIcon size={48} className="text-foreground m-4" />,
    },
    {
      titulo: "Videos",
      color: "bg-gray-200",
      icon: <VideoIcon size={48} className="text-foreground m-4" />,
    },
    {
      titulo: "Visualización Resumenes de Producto",
      color: "bg-purple-200",
      icon: <FileTextIcon size={48} className="text-foreground m-4" />,
    },
  ];

  return (
    <SectionContainer>
      <BotonVolver href="/campanas/2025" />
      <h1 className="text-2xl font-medium mb-8 lg:text-4xl">
        Campaña {campana?.title}
      </h1>

      <div className="w-full grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-4 first-of-type:mt-12">
        {contenidoCampana.map((item, index) => (
          <CardCarpeta
            key={index}
            titulo={item.titulo}
            icon={item.icon}
            color={item.color}
            link={item.link}
          />
        ))}
      </div>
      <div className="w-full grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-4 first-of-type:mt-12"></div>
    </SectionContainer>
  );
}

export default Campañas2025Page;
