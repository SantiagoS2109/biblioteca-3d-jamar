"use client";

import Link from "next/link";
import { use } from "react";
import { CubeIcon } from "@phosphor-icons/react/dist/ssr";
import { useFetchModelosByID } from "../../../hooks/useFetchModelosByID";
import { useFetchModeloImagenesByID } from "../../../hooks/useFetchModeloImagenesByID";
import Spinner from "@/components/UI/Spinner";
import EmblaCarouselWithLightGallery from "@/components/UI/EmblaCarouselWithLightGallery";
import BotonVolver from "@/components/UI/BotonVolver";
import SectionContainer from "@/components/UI/SectionContainer";

function ProductPage({ params }) {
  const { slug } = use(params);
  const { modelo, loading } = useFetchModelosByID(slug);
  const { modeloImagenes, loadingImagenes } = useFetchModeloImagenesByID(slug);

  const imgsModelo = modeloImagenes?.map((img) => ({
    id: img.id,
    title: "Modelo Image_" + img.orden,
    image:
      "https://xadmunjbkvgnhlswupdv.supabase.co/storage/v1/object/public/" +
      img.path_storage,
  }));

  return (
    <SectionContainer id="producto">
      <BotonVolver />

      {loading ? (
        <div className="flex items-center justify-center w-full mt-24">
          <Spinner />
        </div>
      ) : (
        <section className="md:grid md:grid-cols-2 md:gap-12 ">
          <div className="w-3/4 justify-self-center mt-8 md:mt-0">
            {!loadingImagenes && (
              <EmblaCarouselWithLightGallery
                slides={imgsModelo}
                options={{ loop: true }}
              />
            )}
          </div>

          <div>
            <h1 className="text-xl font-bold mt-8 mb-2">{modelo.nombre}</h1>
            <div className="flex justify-between items-center mb-6">
              <p className="text-red-jamar font-medium italic">
                {modelo.codigo}
              </p>

              <div className="bg-red-200 px-4 py-1 w-fit rounded-full">
                <p className="text-red-jamar font-bold">Piso {modelo.piso}</p>
              </div>
            </div>

            {modelo?.link && (
              <Link
                href={modelo?.link || "#"}
                rel="noopener noreferrer"
                target="_blank"
                className="bg-red-jamar w-fit h-fit px-3 py-2 flex gap-2 items-center justify-center rounded-lg cursor-pointer hover:bg-red-400 transition-colors duration-300"
              >
                <CubeIcon size={24} className="inline text-white" />
                <p className="text-sm font-medium text-white">
                  Descargar modelo
                </p>
              </Link>
            )}
          </div>
        </section>
      )}
    </SectionContainer>
  );
}

export default ProductPage;
