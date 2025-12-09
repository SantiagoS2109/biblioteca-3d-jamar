import ModalImagenes from "@/components/ModalImagenes";
import BibliotecaSection from "../components/BibliotecaSection";
import HeroSection from "../components/HeroSection";
import NuevoModelo from "../components/NuevoModelo";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BibliotecaSection />
      <NuevoModelo />
      <ModalImagenes />
    </>
  );
}
