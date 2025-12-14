"use client";

import { useState, createContext, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase/supabaseClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuperUser, setIsSuperUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Obtiene la sesión actual al montar el componente
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        setSession(null);
        setUser(null);
        setIsSuperUser(false);
      } else {
        setSession(data.session);
        setUser(data.session?.user ?? null);

        // Verificar si es superusuario
        if (data.session?.user) {
          await checkSuperUserStatus(data.session.user);
        }
      }
      setIsLoading(false);
    };

    getSession();

    // Suscríbete a los cambios de sesión
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      // Verificar si es superusuario
      if (session?.user) {
        await checkSuperUserStatus(session.user);
      } else {
        setIsSuperUser(false);
      }

      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Función para verificar si el usuario es superusuario
  const checkSuperUserStatus = async (user) => {
    try {
      // Verificar desde raw_user_meta_data
      const isSuperFromMetadata = user.user_metadata?.is_superuser === true;
      setIsSuperUser(isSuperFromMetadata);
    } catch (error) {
      console.error("Error checking superuser status:", error);
      setIsSuperUser(false);
    }
  };

  const signUp = async (email, password, userData) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    });
    return { error };
  };

  const signIn = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  const value = {
    user,
    session,
    isLoading,
    isSuperUser,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
