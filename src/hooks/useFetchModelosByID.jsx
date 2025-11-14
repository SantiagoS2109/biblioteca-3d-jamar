import { supabase } from "../lib/supabase/supabaseClient";
import { useState, useEffect } from "react";

export function useFetchModelosByID(id) {
  console.log("Fetching modelo for id:", id);
  const [modelo, setModelo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModeloByID = async () => {
      const { data, error } = await supabase
        .from("biblioteca")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error("Error fetching modelo:", error);
      } else {
        setModelo(data);
        setLoading(false);
      }
    };
    fetchModeloByID();
  }, [setModelo, setLoading, id]);

  return { modelo, loading };
}
