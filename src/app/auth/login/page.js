import BotonVolver from "@/components/BotonVolver";
import Image from "next/image";
import LoginForm from "@/components/auth/LoginForm";

function page() {
  return (
    <main className="h-dvh flex bg-[url('/img/Hero.png')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="flex bg-white shadow-2xl flex-col items-center gap-8 py-6 rounded-e-3xl px-8 min-w-lg z-10">
        <div className="self-start">
          <BotonVolver href={"/#biblioteca"} />
        </div>
        <Image
          src="https://www.jamar.com/cdn/shop/files/Logo-Jamar_new.svg?v=1721659704&width=100"
          alt="Logo"
          width={200}
          height={200}
          priority
          quality={100}
          loading="eager"
          className="h-8 w-auto mb-8"
        />

        <div className="self-start">
          <h1 className="text-center text-2xl font-bold">
            Bienvenido de vuelta,
          </h1>
          <p>inicia sesión para continuar</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}

export default page;
