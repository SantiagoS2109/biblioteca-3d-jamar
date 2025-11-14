import { supabase } from "../lib/supabase/supabaseClient";
import { useState, useEffect } from "react";

export function useFetchModelos(piso) {
  console.log("Fetching modelos for piso:", piso);
  const [modelos, setModelos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModelos = async () => {
      const { data, error } = await supabase
        .from("biblioteca")
        .select("*")
        .eq("piso", piso);
      if (error) {
        console.error("Error fetching modelos:", error);
      } else {
        setModelos(data);
        setLoading(false);
      }
    };
    fetchModelos();
  }, [setModelos, setLoading, piso]);

  return { modelos, loading };
}
