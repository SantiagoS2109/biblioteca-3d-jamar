import Link from "next/link";
import Img from "next/image";
import { LinkBreakIcon } from "@phosphor-icons/react/dist/ssr";

function CardModelo({ modelo }) {
  return (
    <Link
      className="min-h-[260px] "
      href={`${modelo.link} `}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="relative bg-gray-200/70 h-full p-4 rounded-xl transition-all cursor-pointer hover:shadow-lg hover:scale-101">
        <Img
          src={modelo.linkImagen || "/img/no-encontrado.png"}
          alt={modelo.nombre}
          width={200}
          height={200}
          className="w-full rounded-md"
        />
        <p className="mt-2 font-bold leading-4.5">{modelo.nombre}</p>
        <p className="mt-2 italic text-red-500">{modelo.codigo}</p>

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
