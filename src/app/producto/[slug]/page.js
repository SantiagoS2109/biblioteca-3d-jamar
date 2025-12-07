"use client";

import Link from "next/link";
import { use } from "react";
import { CaretLeftIcon, CubeIcon } from "@phosphor-icons/react/dist/ssr";
import { useFetchModelosByID } from "../../../hooks/useFetchModelosByID";
import Spinner from "@/components/Spinner";
import EmblaCarousel from "@/components/EmblaCarousel";

function ProductPage({ params }) {
  const { slug } = use(params);
  const { modelo, loading } = useFetchModelosByID(slug);

  const imgs = [
    {
      id: 1,
      title: "Img 1",
      image: modelo?.linkImagen,
    },
    {
      id: 2,
      title: "Img 2",
      image: modelo?.linkImagen,
    },
    {
      id: 3,
      title: "Img 3",
      image: modelo?.linkImagen,
    },
  ];

  console.log("Modelo fetched:", modelo);

  return (
    <section id="producto" className="w-full flex flex-col py-8 px-4 lg:px-64">
      <Link href="/#biblioteca" className="w-fit">
        <div className="bg-gray-200/60 w-12 h-12 flex items-center justify-center rounded-full text-gray-400 underline">
          <CaretLeftIcon size={30} className="inline" />
        </div>
      </Link>

      {loading ? (
        <div className="flex items-center justify-center w-full mt-24">
          <Spinner />
        </div>
      ) : (
        <section className="md:grid md:grid-cols-2 md:gap-12">
          <div>
            <div>
              <EmblaCarousel slides={imgs} options={{ loop: true }} />
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold mt-8 mb-2">{modelo.nombre}</h1>
            <div className="flex justify-between items-center mb-6">
              <p className="text-red-jamar font-medium italic">
                {modelo.codigo}
              </p>

              <div className="bg-red-200 px-4 py-1 w-fit rounded-full">
                <p className="text-red-jamar font-bold text-lg">
                  Piso {modelo.piso}
                </p>
              </div>
            </div>

            <Link
              href={modelo.link}
              rel="noopener noreferrer"
              target="_blank"
              className="bg-red-jamar w-fit h-fit px-3 py-2 flex gap-4 items-center justify-center rounded-lg cursor-pointer hover:bg-red-400 transition-colors duration-300"
            >
              <CubeIcon size={40} className="inline text-white" />
              <p className="font-medium text-white">Descargar modelo</p>
            </Link>
          </div>
        </section>
      )}
    </section>
  );
}

export default ProductPage;
