import Link from "next/link";
import Img from "next/image";

function CardModelo({ modelo }) {
  return (
    <Link className="min-h-[260px] " href={`${modelo.link} `}>
      <div className="bg-gray-200/70 h-full p-4 rounded-xl transition-all cursor-pointer hover:shadow-lg hover:scale-101">
        <Img
          src={modelo.linkImagen || "/img/no-encontrado.png"}
          alt={modelo.nombre}
          width={200}
          height={200}
          className="w-full rounded-md"
        />
        <p className="mt-2 font-bold leading-4.5">{modelo.nombre}</p>
        <p className="mt-2 italic text-red-500">{modelo.codigo}</p>
      </div>
    </Link>
  );
}

export default CardModelo;
