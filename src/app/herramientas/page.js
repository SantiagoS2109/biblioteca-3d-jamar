import ProtectedRoute from "@/components/auth/ProtectedRoute";
import BotonVolver from "@/components/UI/BotonVolver";
import SectionContainer from "@/components/UI/SectionContainer";
import Link from "next/link";

function HerramientasPage() {
  const tableData = [
    {
      plataforma: "https://app.asana.com/0/profile/1208383552261461",
      usuario: "admin@jamar.com",
      credenciales: "InJause2024*",
    },
    {
      plataforma: "https://app.runwayml.com/login",
      usuario: "admin@jamar.com",
      credenciales: "InJause2024*",
    },
    {
      plataforma: "https://midjourney.com/account",
      usuario: "admin@jamar.com",
      credenciales: "InJause2024*",
    },
    {
      plataforma: "https://magnific.ai/",
      usuario: "admin@jamar.com",
      credenciales: "InJause2024*",
    },
    {
      plataforma: "https://krea.ai/pricing",
      usuario: "admin@jamar.com",
      credenciales: "Jamar2025**",
    },
    {
      plataforma: "https://app.presti.ai/pricing",
      usuario: "admin@jamar.com",
      credenciales: "InJause2024*",
    },
    {
      plataforma: "https://archsynth.com/#pricing",
      usuario: "admin@jamar.com",
      credenciales: "InJause2024*",
    },
    {
      plataforma: "https://decoritt.wondershare.com/pricing.html",
      usuario: "admin@jamar.com",
      credenciales: "Jamar2030++",
    },
    {
      plataforma: "https://lumalabs.ai/dream-machine",
      usuario: "injousejamar@gmail.com",
      credenciales: "InJouse2025**",
    },
    {
      plataforma: "https://elements.envato.com/es/",
      usuario: "admin@jamar.com",
      credenciales: "Samsung20215*",
    },
    {
      plataforma: "https://higgsfield.ai/auth/sso-callback",
      usuario: "injousejamar@gmail.com",
      credenciales: "InJouse2025**",
    },
    {
      plataforma: "https://3dskyfree.com/subscription-details",
      usuario: "admin@jamar.com",
      credenciales: "InJouse2025**",
    },
  ];

  return (
    <ProtectedRoute>
      <SectionContainer id="herramientas">
        <BotonVolver href="/" />
        <h2 className="text-2xl font-medium mb-8 lg:text-4xl">
          Acceso a herramientas
        </h2>

        <div className="relative overflow-x-auto shadow-xs rounded-xl border border-gray-200">
          <table className="w-full text-sm text-left rtl:text-right text-body md:text-lg">
            <thead className="text-sm text-body bg-gray-100 border-b rounded-base border-gray-200 md:text-lg">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">
                  Plataforma
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Usuario
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Credenciales
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr
                  key={index}
                  className="bg-neutral-primary border-b border-gray-200"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                  >
                    <Link href={item.plataforma}>{item.plataforma}</Link>
                  </th>
                  <td className="px-6 py-4">{item.usuario}</td>
                  <td className="px-6 py-4">{item.credenciales}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionContainer>
    </ProtectedRoute>
  );
}

export default HerramientasPage;
