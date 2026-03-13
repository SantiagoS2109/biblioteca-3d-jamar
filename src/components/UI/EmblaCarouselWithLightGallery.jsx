"use client";

import React, { useRef, useEffect, useState } from "react";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";
import lgRotate from "lightgallery/plugins/rotate";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-rotate.css";

const EmblaCarouselWithLightGallery = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const galleryRef = useRef(null);
  const galleryInstanceRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  // Inicializar LightGallery cuando está montado
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && galleryRef.current && typeof window !== "undefined") {
      // Importar dinámicamente lightgallery en el cliente
      import("lightgallery").then((lgModule) => {
        const lg = lgModule.default;

        // Inicializar LightGallery con los elementos del DOM
        galleryInstanceRef.current = lg(galleryRef.current, {
          plugins: [lgZoom, lgVideo, lgRotate],
          selector: "a.gallery-item",
          download: true,
          rotate: true,
          zoom: true,
          speed: 500,
        });

        // Agregar listener para el botón de descarga
        if (galleryRef.current) {
          galleryRef.current.addEventListener("lgAfterOpen", () => {
            const downloadBtn = document.querySelector(".lg-download");
            if (downloadBtn) {
              // Remover listeners anteriores para evitar duplicados
              const newDownloadBtn = downloadBtn.cloneNode(true);
              downloadBtn.parentNode.replaceChild(newDownloadBtn, downloadBtn);

              newDownloadBtn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                const currentIndex = galleryInstanceRef.current?.index || 0;
                const currentSlide = slides[currentIndex];
                if (currentSlide) {
                  downloadImage(
                    currentSlide.image,
                    `modelo-${currentSlide.orden || currentSlide.id}.png`,
                  );
                }
              });
            }
          });
        }
      });

      return () => {
        if (galleryInstanceRef.current) {
          galleryInstanceRef.current.destroy();
          galleryInstanceRef.current = null;
        }
      };
    }
  }, [mounted, slides]);

  const handleImageClick = (index) => {
    const galleryLinks = galleryRef.current?.querySelectorAll("a.gallery-item");
    if (galleryLinks && galleryLinks[index]) {
      galleryLinks[index].click();
    }
  };

  const downloadImage = async (imageUrl, imageName) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = imageName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error descargando imagen:", error);
    }
  };

  return (
    <>
      {/* LightGallery container (oculto) */}
      <div ref={galleryRef} className="hidden">
        {slides.map((img) => (
          <a
            key={img.id}
            href={img.image}
            className="gallery-item"
            data-src={img.image}
            data-sub-html={`<h4>${img.title}</h4>`}
          >
            <img src={img.image} alt={img.title} />
          </a>
        ))}
      </div>

      {/* Carrusel */}
      <section className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {slides.map((img, index) => (
              <div
                key={img.id}
                className="flex w-full flex-[0_0_100%] items-center justify-center rounded-2xl cursor-pointer group"
                onClick={() => handleImageClick(index)}
              >
                <Image
                  width={500}
                  height={500}
                  priority
                  src={img.image}
                  alt={img.title}
                  className="rounded-2xl object-contain group-hover:opacity-80 transition-opacity duration-300"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="embla__controls">
          <div className="embla__buttons">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>

          <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={"embla__dot".concat(
                  index === selectedIndex ? " embla__dot--selected" : "",
                )}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default EmblaCarouselWithLightGallery;
