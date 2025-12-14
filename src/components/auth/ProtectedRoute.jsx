"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "./AuthProvider";
import Image from "next/image";

export default function ProtectedRoute({ children }) {
  const { session, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && session === null) {
      redirect("/auth");
    }
  }, [session, isLoading]);

  if (isLoading)
    return (
      <div className="flex h-dvh items-center justify-center">
        <Image
          src="https://www.jamar.com/cdn/shop/files/Logo-Jamar_new.svg?v=1721659704&width=100"
          alt="Logo"
          width={80}
          height={80}
          className="mb-4 h-24 w-24 animate-pulse"
        />
      </div>
    );
  if (session === null) return null;

  return <>{children}</>;
}
