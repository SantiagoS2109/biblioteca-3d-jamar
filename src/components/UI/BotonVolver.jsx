import { CaretLeftIcon } from "@phosphor-icons/react/dist/ssr";

function BotonVolver() {
  const handleVolver = () => {
    window.history.back();
  };

  return (
    <button onClick={handleVolver} className="w-fit mb-4 cursor-pointer">
      <div className="bg-gray-200/60 w-12 h-12 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-300/60 transition-colors">
        <CaretLeftIcon size={30} className="inline" />
      </div>
    </button>
  );
}

export default BotonVolver;
