import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";

export const useFetchCategorySections = (year, campaignSlug, categorySlug) => {
  const [category, setCategory] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!year || !campaignSlug || !categorySlug) {
      return;
    }

    const fetchCategorySections = async () => {
      try {
        setLoading(true);
        setError(null);

        // Obtener campaña
        const { data: campaignData, error: campaignError } = await supabase
          .from("campaigns")
          .select("id")
          .eq("slug", campaignSlug)
          .eq("year", year)
          .single();

        if (campaignError) {
          throw campaignError;
        }

        // Obtener categoría
        const { data: categoryData, error: categoryError } = await supabase
          .from("campaign_categories")
          .select("*")
          .eq("campaign_id", campaignData.id)
          .eq("slug", categorySlug)
          .single();

        if (categoryError) {
          throw categoryError;
        }

        setCategory(categoryData);

        // Obtener secciones de la categoría
        const { data: sectionsData, error: sectionsError } = await supabase
          .from("campaign_sections")
          .select("*")
          .eq("category_id", categoryData.id)
          .order("order", { ascending: true });

        if (sectionsError) {
          throw sectionsError;
        }

        setSections(sectionsData || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorySections();
  }, [year, campaignSlug, categorySlug]);

  return { category, sections, loading, error };
};
