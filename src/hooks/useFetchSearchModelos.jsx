import { supabase } from "../lib/supabase/supabaseClient";
import { useState, useEffect } from "react";

export function useFetchSearchModelos(piso, searchTerm, piso3View) {
  const [modelos, setModelos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setModelos([]);
      setLoading(false);
      return;
    }

    const fetchSearchModelos = async () => {
      setLoading(true);
      const searchPattern = `%${searchTerm}%`;

      try {
        const { data, error } = await supabase
          .from("biblioteca")
          .select("*")
          .eq("piso", piso)
          .or(`nombre.ilike.${searchPattern},codigo.ilike.${searchPattern}`);

        if (error) {
          console.error("Error searching modelos:", error);
          setModelos([]);
        } else {
          setModelos(data || []);
        }
      } catch (err) {
        console.error("Error:", err);
        setModelos([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce: esperar 800ms después de que el usuario termine de escribir
    const timeoutId = setTimeout(() => {
      fetchSearchModelos();
    }, 800);

    return () => clearTimeout(timeoutId);
  }, [piso, searchTerm]);

  return { modelos, loading };
}
