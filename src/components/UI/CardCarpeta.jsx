import Link from "next/link";

function CardCarpeta({ titulo, icon, color = "amber", link, description }) {
  return (
    <Link
      href={link || "/"}
      className={`block bg-${color}-200 relative w-full h-auto rounded-2xl mb-10 transition-transform hover:scale-105 cursor-pointer`}
    >
      <div
        className={`absolute bg-${color}-200  border-8 border-white rounded-full w-24 h-24 -top-10 right-1/2 translate-x-12`}
      >
        {icon}
      </div>

      <div className="p-6 pt-20 h-full flex flex-col items-center justify-center">
        <h2 className="text-xl md:text-lg font-medium text-center mb-2">
          {titulo}
        </h2>
        {description && (
          <p className="text-sm text-gray-600 text-center">{description}</p>
        )}
      </div>
    </Link>
  );
}

export default CardCarpeta;
