import ModalImagenes from "@/components/ModalImagenes";
import BibliotecaSection from "@/components/BibliotecaSection";
import HeroSection from "@/components/HeroSection";
import NuevoModelo from "@/components/NuevoModelo";
import LinksSection from "@/components/LinksSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <LinksSection />
      <BibliotecaSection />
      <NuevoModelo />
      <ModalImagenes />
    </>
  );
}
