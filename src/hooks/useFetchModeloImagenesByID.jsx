import { supabase } from "../lib/supabase/supabaseClient";
import { useState, useEffect } from "react";

export function useFetchModeloImagenesByID(id) {
  console.log("Fetching modelo images for id:", id);
  const [modeloImagenes, setModeloImagenes] = useState(null);
  const [loadingImagenes, setLoadingImagenes] = useState(true);

  useEffect(() => {
    const fetchModeloImagenesByID = async () => {
      const { data, error } = await supabase
        .from("modeloImagenes")
        .select("*")
        .eq("modelo_id", id)
        .order("orden");
      if (error) {
        console.error("Error fetching modelo:", error);
      } else {
        setModeloImagenes(data);
        setLoadingImagenes(false);
        console.log("Fetched modelo images:", data);
      }
    };
    fetchModeloImagenesByID();
  }, [setModeloImagenes, setLoadingImagenes, id]);

  return { modeloImagenes, loadingImagenes };
}
