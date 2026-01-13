import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";

export const useFetchGalleryImages = (galleryId) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        setLoading(true);

        const { data, error: supabaseError } = await supabase
          .from("gallery_images")
          .select("*")
          .eq("gallery_id", galleryId)
          .order("orden", { ascending: true });

        if (supabaseError) throw supabaseError;

        // Mapear para obtener URLs de Supabase
        const imagesWithUrls = (data || []).map((img) => ({
          id: img.id,
          title: img.title || "Imagen",
          src:
            "https://xadmunjbkvgnhlswupdv.supabase.co/storage/v1/object/public/" +
            img.path_storage,
          orden: img.orden,
        }));

        setImages(imagesWithUrls);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (galleryId) {
      fetchGalleryImages();
    }
  }, [galleryId]);

  return { images, loading, error };
};
