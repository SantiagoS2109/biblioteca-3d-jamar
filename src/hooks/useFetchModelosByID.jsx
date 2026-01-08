import toast from "react-hot-toast";
import { supabase } from "../lib/supabase/supabaseClient";
import { useState, useEffect } from "react";

export function useFetchModelosByID(id) {
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
        toast.error("Error fetching modelo: " + error.message);
      } else {
        setModelo(data);
        setLoading(false);
      }
    };
    fetchModeloByID();
  }, [setModelo, setLoading, id]);

  return { modelo, loading };
}
