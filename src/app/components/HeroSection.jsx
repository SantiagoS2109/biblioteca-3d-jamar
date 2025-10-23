function HeroSection() {
  return (
    <section className="w-full relative flex items-center p-4 h-[400px] bg-[url('/img/Hero.png')] bg-cover bg-center rounded-b-4xl shadow-xl lg:px-64 lg:h-[600px] mb-4">
      <div className="absolute inset-0 bg-black opacity-50 z-0 rounded-b-4xl"></div>
      <div className="z-10 flex flex-col items-start ">
        <h1 className="text-3xl font-medium text-white mb-4 lg:text-5xl lg:w-xl">
          Bienvenido a <br /> Repositorio 3D JAMAR
        </h1>

        <p className="text-white mb-4 text-lg lg:text-2xl lg:w-md">
          Explora y visualiza modelos 3D de mobiliario con facilidad
        </p>

        <button className="bg-[#e53733] text-white font-medium py-2 px-4 rounded-full cursor-pointer hover:bg-red-600 transition">
          Ver biblioteca
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
