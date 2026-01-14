import Link from "next/link";

function CardCarpeta({ titulo, icon, color, link }) {
  return (
    <Link
      href={link ? link : "/"}
      className={`bg-${color}-200 relative w-full h-32 rounded-2xl mb-10`}
    >
      <div
        className={`absolute bg-${color}-200 border-8 border-white rounded-full w-24 h-24 -top-10 right-1/2 translate-x-12`}
      >
        {icon}
      </div>

      <div className="p-6 pt-20 h-full flex items-center justify-center">
        <h2 className="text-xl md:text-lg font-medium mb-2 text-center">
          {titulo}
        </h2>
      </div>
    </Link>
  );
}

export default CardCarpeta;
