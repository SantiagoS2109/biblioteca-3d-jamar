import BibliotecaSection from "./components/BibliotecaSection";
import HeroSection from "./components/HeroSection";
import NavBarSection from "./components/NavBarSection";

export default function Home() {
  return (
    <div className="font-sans items-center justify-items-center min-h-screen gap-16 ">
      <NavBarSection />
      <HeroSection />
      <BibliotecaSection />
    </div>
  );
}
