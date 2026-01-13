import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";

export const useFetchCampaignDetails = (year, campaignSlug) => {
  const [campaign, setCampaign] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaignDetails = async () => {
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

        // Obtener secciones de la campaña
        const { data: sectionsData, error: sectionsError } = await supabase
          .from("campaign_sections")
          .select("*")
          .eq("campaign_id", campaignData.id)
          .order("order", { ascending: true });

        if (sectionsError) throw sectionsError;
        setSections(sectionsData || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (year && campaignSlug) {
      fetchCampaignDetails();
    }
  }, [year, campaignSlug]);

  return { campaign, sections, loading, error };
};
