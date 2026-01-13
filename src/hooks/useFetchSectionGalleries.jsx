import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";

export const useFetchSectionGalleries = (year, campaignSlug, sectionSlug) => {
  const [section, setSection] = useState(null);
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSectionGalleries = async () => {
      try {
        setLoading(true);

        // Obtener campaña
        const { data: campaignData, error: campaignError } = await supabase
          .from("campaigns")
          .select("id")
          .eq("slug", campaignSlug)
          .eq("year", year)
          .single();

        if (campaignError) throw campaignError;

        // Obtener sección
        const { data: sectionData, error: sectionError } = await supabase
          .from("campaign_sections")
          .select("*")
          .eq("campaign_id", campaignData.id)
          .eq("slug", sectionSlug)
          .single();

        if (sectionError) throw sectionError;
        setSection(sectionData);

        // Obtener galerías de la sección
        const { data: galleriesData, error: galleriesError } = await supabase
          .from("section_galleries")
          .select("*")
          .eq("section_id", sectionData.id)
          .order("order", { ascending: true });

        if (galleriesError) throw galleriesError;
        setGalleries(galleriesData || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (year && campaignSlug && sectionSlug) {
      fetchSectionGalleries();
    }
  }, [year, campaignSlug, sectionSlug]);

  return { section, galleries, loading, error };
};
