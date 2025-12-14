import ModalImagenes from "@/components/ModalImagenes";
import BibliotecaSection from "@/components/BibliotecaSection";
import HeroSection from "@/components/HeroSection";
import NuevoModelo from "@/components/NuevoModelo";
import NavBarSection from "@/components/NavBarSection";

export default function Home() {
  return (
    <>
      <NavBarSection />
      <HeroSection />
      <BibliotecaSection />
      <NuevoModelo />
      <ModalImagenes />
    </>
  );
}
