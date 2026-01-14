import Link from "next/link";
import Img from "next/image";
import { LinkBreakIcon } from "@phosphor-icons/react/dist/ssr";
import { useFetchModeloImagenesByID } from "../hooks/useFetchModeloImagenesByID";
import Spinner from "./UI/Spinner";

function CardModelo({ modelo }) {
  const URL =
    "https://xadmunjbkvgnhlswupdv.supabase.co/storage/v1/object/public/";

  const { modeloImagenes, loadingImagenes } = useFetchModeloImagenesByID(
    modelo.id
  );

  return (
    <Link
      className="min-h-[260px] "
      href={`/producto/${modelo.id}`}
      rel="noopener noreferrer"
    >
      <div className="relative flex flex-col gap-2 bg-gray-200/70 h-full p-4 rounded-xl transition-all cursor-pointer hover:shadow-lg hover:scale-101">
        {loadingImagenes ? (
          <div className="flex items-center justify-center h-full">
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
            width={200}
            height={200}
            className="w-full rounded-md"
            loading="lazy"
          />
        )}

        <div className="h-full flex flex-col justify-between gap-2">
          <p className="font-bold leading-4.5">{modelo.nombre}</p>
          <p className="italic text-red-500">{modelo.codigo}</p>
        </div>

        {!modelo.link && (
          <div className="absolute w-10 h-10 bg-red-300 bottom-2 right-2 rounded-full">
            <LinkBreakIcon className="w-6 h-6 m-2 text-red-jamar" />
          </div>
        )}
      </div>
    </Link>
  );
}

export default CardModelo;
