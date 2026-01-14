import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";

export const useFetchCampaignCategories = (year, campaignSlug) => {
  const [campaign, setCampaign] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaignCategories = async () => {
      try {
        setLoading(true);

        // Obtener campaña
        const { data: campaignData, error: campaignError } = await supabase
          .from("campaigns")
          .select("*")
          .eq("slug", campaignSlug)
          .eq("year", year)
          .single();

        if (campaignError) throw campaignError;
        setCampaign(campaignData);

        // Obtener categorías de la campaña
        const { data: categoriesData, error: categoriesError } = await supabase
          .from("campaign_categories")
          .select("*")
          .eq("campaign_id", campaignData.id)
          .order("order", { ascending: true });

        if (categoriesError) throw categoriesError;
        setCategories(categoriesData || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (year && campaignSlug) {
      fetchCampaignCategories();
    }
  }, [year, campaignSlug]);

  return { campaign, categories, loading, error };
};
