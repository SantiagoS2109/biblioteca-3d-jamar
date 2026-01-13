"use client";

import { useEffect } from "react";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-autoplay.css";
import "lightgallery/css/lg-rotate.css";

import LightGallery from "lightgallery/react/Lightgallery.es5";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgAutoplay from "lightgallery/plugins/autoplay";
import lgVideo from "lightgallery/plugins/video";
import lgRotate from "lightgallery/plugins/rotate";

// Load flickr-justified-gallery dynamically to avoid SSR/runtime errors

import "@/app/globals.css";

function Gallery({ imgs }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    let mounted = true;
    (async () => {
      try {
        const mod = await import("flickr-justified-gallery");
        const fj = mod && (mod.default || mod);
        if (!mounted || !fj) return;
        fj(document.querySelectorAll(".gallery"), {
          itemSelector: ".gallery__item",
          rowHeight: 160,
          lastRow: "start",
          gutter: 12,
          rowHeightTolerance: 0.1,
          calculateItemsHeight: true,
        });
      } catch (e) {
        console.error("Failed to load flickr-justified-gallery:", e);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <LightGallery
      speed={500}
      plugins={[lgThumbnail, lgZoom, lgAutoplay, lgVideo, lgRotate]}
      mode="lg-fade"
      addClass="custom-class"
      mobileSettings={{
        controls: true,
        showCloseIcon: true,
        download: true,
      }}
      isMobile={true}
      thumbnail={true}
      elementClassNames={"gallery"}
    >
      {imgs.map((img, index) => (
        <a
          data-lg-size="4500-3167"
          className="gallery__item"
          data-src={img.src}
          key={index}
        >
          <img
            src={img.src}
            alt={img.alt || img.title}
            className="img-responsive rounded-lg"
          />
        </a>
      ))}
    </LightGallery>
  );
}

export default Gallery;
