"use client";

import Image from "next/image";

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

function Gallery({ imgs }) {
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
    >
      {imgs.map((img, index) => (
        <a href={img.src} key={index}>
          <img
            // width={200}
            // height={200}
            src={img.src}
            alt={img.alt}
            className="mb-4 cursor-pointer rounded-lg"
          />
        </a>
      ))}
    </LightGallery>
  );
}

export default Gallery;
