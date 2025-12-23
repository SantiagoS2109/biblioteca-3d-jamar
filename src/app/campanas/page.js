import BotonVolver from "@/components/UI/BotonVolver";
import SectionContainer from "@/components/UI/SectionContainer";
import Link from "next/link";

function CampanasPage() {
  const añosCampañas = [
    { año: "2025", link: "/campanas/2025", img: "" },
    { año: "2026", link: "/campanas/2026", img: "" },
  ];

  return (
    <SectionContainer id="campanas">
      <BotonVolver href="/" />
      <h2 className="text-2xl font-medium mb-8 lg:text-4xl">Campañas</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        {añosCampañas.map((campaña) => (
          <Link
            key={campaña.año}
            href={campaña.link}
            className={`relative col-span-3 md:col-span-1 bg-[url('/img/campañas/${campaña.año}.webp')] bg-cover h-48 rounded-lg flex items-center justify-center md:h-72`}
          >
            <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
            <p className="text-center px-4 text-8xl font-bold text-white z-10">
              {campaña.año}
            </p>
          </Link>
        ))}
      </div>
    </SectionContainer>
  );
}

export default CampanasPage;
