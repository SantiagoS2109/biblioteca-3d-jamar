import Link from "next/link";
import Img from "next/image";
import { LinkBreakIcon } from "@phosphor-icons/react/dist/ssr";
import { useFetchModeloImagenesByID } from "../hooks/useFetchModeloImagenesByID";
import Spinner from "./UI/Spinner";

function CardModelo({ modelo, piso }) {
  const URL =
    "https://xadmunjbkvgnhlswupdv.supabase.co/storage/v1/object/public/";

  const { modeloImagenes, loadingImagenes } = useFetchModeloImagenesByID(
    modelo.id,
  );

  const handleButtonClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Link
      href={`/producto/${modelo.id}`}
      className="flex flex-col bg-gray-100 border border-gray-200 rounded-xl overflow-hidden cursor-pointer transition-all duration-150 hover:border-gray-300 hover:-translate-y-px h-full"
    >
      {/* Imagen del modelo */}
      <div className="relative w-full h-[180px] flex items-center justify-center">
        {loadingImagenes ? (
          <div className="flex items-center justify-center h-full w-full">
            <Spinner />
          </div>
        ) : (
          <Img
            src={
              modeloImagenes?.[0]?.path_storage
                ? URL + `${modeloImagenes?.[0]?.path_storage}`
                : "/img/no-encontrado.png"
            }
            alt={modelo.nombre}
            width={800}
            height={800}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        )}

        {/* Badge "Retopología" */}

        {modelo.retopologia === "SI" && (
          <span className="absolute top-2 right-2 text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-800">
            Retopología
          </span>
        )}

        {/* Badge "No Link" */}
        {!modelo.link && (
          <span
            className={`absolute ${modelo.retopologia !== null ? "top-8" : "top-2"} right-2 font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-800`}
          >
            <LinkBreakIcon size={18} />
          </span>
        )}
      </div>

      {/* Información del modelo */}

      <div className="px-3 py-2.5 flex-grow">
        <p className="text-sm font-medium text-gray-900 ">{modelo.nombre}</p>
        <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-1">
          {piso !== 3 && <span>{modelo.categoria}</span>}
          {piso !== 3 && <span>·</span>}
          <span>{modelo.codigo}</span>
        </p>
      </div>

      {/* Acciones */}

      <div className="px-3 py-5 border-t border-gray-200 flex gap-4 ">
        {/* Botón secundario */}
        <button
          href={modelo.link || "#"}
          target={modelo.link ? "_blank" : undefined}
          onClick={handleButtonClick}
          className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs text-gray-500 border border-red-jamar rounded-lg hover:bg-red-jamar hover:text-white transition-colors duration-150 font-medium cursor-pointer"
        >
          Descargar 3D
        </button>
        {/*  Botón primario */}
        <button
          href={`/producto/${modelo.id}`}
          rel="noopener noreferrer"
          onClick={handleButtonClick}
          className="flex-1 flex items-center justify-center py-1.5 text-xs text-gray-500 rounded-lg border border-red-jamar hover:bg-red-jamar hover:text-white transition-colors duration-150 font-medium cursor-pointer"
        >
          Ver
        </button>
      </div>
    </Link>
  );
}

export default CardModelo;
