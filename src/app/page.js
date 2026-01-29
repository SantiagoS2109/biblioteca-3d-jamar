import { Suspense } from "react";
import ModalImagenes from "@/components/ModalImagenes";
import BibliotecaSection from "@/components/BibliotecaSection";
import HeroSection from "@/components/HeroSection";
import NuevoModelo from "@/components/NuevoModelo";
import LinksSection from "@/components/LinksSection";
import Spinner from "@/components/UI/Spinner";

export default function Home() {
  return (
    <>
      <HeroSection />
      <LinksSection />
      <Suspense
        fallback={
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        }
      >
        <BibliotecaSection />
      </Suspense>
      <NuevoModelo />
      <ModalImagenes />
    </>
  );
}
