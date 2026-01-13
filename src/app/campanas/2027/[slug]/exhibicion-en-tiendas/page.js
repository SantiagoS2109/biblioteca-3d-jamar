import Gallery from "@/components/Gallery";
import BotonVolver from "@/components/UI/BotonVolver";
import SectionContainer from "@/components/UI/SectionContainer";

function page() {
  const imgs = [
    {
      src: "/img/campañas/años/2025.webp",
      alt: "Imagen Exhibición en Tiendas Ondara",
    },
    {
      src: "/img/campañas/años/2026.webp",
      alt: "Imagen Exhibición en Tiendas Ondara",
    },
    {
      src: "/img/campañas/años/2025.webp",
      alt: "Imagen Exhibición en Tiendas Ondara",
    },
    {
      src: "/img/campañas/años/2026.webp",
      alt: "Imagen Exhibición en Tiendas Ondara",
    },
    {
      src: "/img/campañas/años/2025.webp",
      alt: "Imagen Exhibición en Tiendas Ondara",
    },
    {
      src: "/img/campañas/años/2026.webp",
      alt: "Imagen Exhibición en Tiendas Ondara",
    },
    {
      src: "/img/campañas/años/2025.webp",
      alt: "Imagen Exhibición en Tiendas Ondara",
    },
    {
      src: "/img/campañas/años/2026.webp",
      alt: "Imagen Exhibición en Tiendas Ondara",
    },
    {
      src: "/img/campañas/años/2025.webp",
      alt: "Imagen Exhibición en Tiendas Ondara",
    },
    {
      src: "/img/campañas/años/2026.webp",
      alt: "Imagen Exhibición en Tiendas Ondara",
    },
    {
      src: "/img/campañas/años/2025.webp",
      alt: "Imagen Exhibición en Tiendas Ondara",
    },
    {
      src: "/img/campañas/años/2026.webp",
      alt: "Imagen Exhibición en Tiendas Ondara",
    },
  ];

  return (
    <SectionContainer>
      <BotonVolver href="/campanas/2025/ondara" />
      <h1 className="text-3xl font-bold mb-6">Exhibición en Tiendas</h1>

      <div className="w-full">
        <Gallery imgs={imgs} />
      </div>
    </SectionContainer>
  );
}

export default page;
