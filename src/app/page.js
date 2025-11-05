import BibliotecaSection from "./components/BibliotecaSection";
import HeroSection from "./components/HeroSection";
import NavBarSection from "./components/NavBarSection";
import NuevoModelo from "./components/NuevoModelo";

export default function Home() {
  return (
    <div className="font-sans min-h-screen gap-16 relative">
      <NavBarSection />
      <HeroSection />
      <BibliotecaSection />
      <NuevoModelo />
    </div>
  );
}
