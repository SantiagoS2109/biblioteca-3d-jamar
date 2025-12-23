import Link from "next/link";
import { CaretLeftIcon } from "@phosphor-icons/react/dist/ssr";

function BotonVolver({ href }) {
  return (
    <Link href={href} className="w-fit mb-4">
      <div className="bg-gray-200/60 w-12 h-12 flex items-center justify-center rounded-full text-gray-400 underline">
        <CaretLeftIcon size={30} className="inline" />
      </div>
    </Link>
  );
}

export default BotonVolver;
