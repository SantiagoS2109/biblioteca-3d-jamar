"use client";

// import { Button, TextField } from "@mui/material";
import { WarningCircleIcon } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message);
      } else {
        router.push("/");
      }
    } catch (err) {
      setError("Ocurrió un error al iniciar sesión");
      toast.error("Ocurrió un error al iniciar sesión");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      {error && (
        <div className="flex items-center justify-center gap-2 rounded-xl border border-red-400 p-4 font-medium text-red-400">
          <WarningCircleIcon className="inline-block h-6 w-6" />
          <span>{error}</span>
        </div>
      )}

      <input
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Correo electrónico"
        aria-label="Correo electrónico"
        className="border-2 border-gray-300 p-4 rounded-full w-full transition-all duration-300 outline-0 focus:ring-2 focus:ring-offset-2 focus:ring-red-jamar/65 "
        type="email"
      />

      <input
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        aria-label="Contraseña"
        className="border-2 border-gray-300 p-4 rounded-full w-full mb-8 transition-all duration-300 outline-0 focus:ring-2 focus:ring-offset-2 focus:ring-red-jamar/65 "
        type="password"
      />

      <button
        type="submit"
        disabled={isLoading}
        className="bg-red-jamar text-white font-bold py-3 rounded-full w-full hover:bg-red-400 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Cargando..." : "Iniciar Sesión"}
      </button>
    </form>
  );
}

export default LoginForm;
