import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";

export const useFetchCampaigns = (year) => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const { data, error: supabaseError } = await supabase
          .from("campaigns")
          .select("*")
          .eq("year", year)
          .order("order", { ascending: true });

        if (supabaseError) throw supabaseError;
        setCampaigns(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (year) {
      fetchCampaigns();
    }
  }, [year]);

  return { campaigns, loading, error };
};
