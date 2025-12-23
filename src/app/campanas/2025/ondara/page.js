import SectionContainer from "@/components/UI/SectionContainer";
import BotonVolver from "@/components/UI/BotonVolver";
import Gallery from "@/components/Gallery";

function PageOndara() {
  const imgsOndara = [
    {
      src: "/img/campañas/2025.webp",
      alt: "Ondara 1",
    },
    {
      src: "/img/campañas/2026.webp",
      alt: "Ondara 2",
    },
    {
      src: "/img/campañas/2026.webp",
      alt: "Ondara 2",
    },
    {
      src: "/img/campañas/2026.webp",
      alt: "Ondara 2",
    },
    {
      src: "/img/campañas/2026.webp",
      alt: "Ondara 2",
    },
    {
      src: "/img/campañas/2026.webp",
      alt: "Ondara 2",
    },
  ];

  return (
    <SectionContainer>
      <BotonVolver href="/campanas/2025" />
      <h1 className="text-2xl font-medium mb-8 lg:text-4xl">Campaña Ondara</h1>

      <div className="w-full bg-red-400">
        <Gallery imgs={imgsOndara} />
      </div>
    </SectionContainer>
  );
}

export default PageOndara;
