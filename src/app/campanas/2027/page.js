"use client";

import React, { useState } from "react";
import BotonVolver from "@/components/UI/BotonVolver";
import SectionContainer from "@/components/UI/SectionContainer";
import Link from "next/link";
import Image from "next/image";
import { campañas2025 } from "@/data/2025/campañas";

function Page2025() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <SectionContainer>
      <BotonVolver href="/campanas" />
      <h1 className="text-2xl font-medium mb-8 lg:text-4xl">Campañas 2025</h1>

      <div className="grid grid-cols-1 md:flex w-full md:h-[450px] gap-0">
        {campañas2025.map((campana) => {
          const isHovered = hoveredId === campana.id;
          const flexGrow = hoveredId === null ? 1 : isHovered ? 2 : 0.8;

          return (
            <Link
              key={campana.id}
              href={`/campanas/2025/${campana.slug}`}
              className={`group relative overflow-hidden cursor-pointer rounded-lg transition-all duration-500 ${
                isHovered ? "z-10 shadow-lg" : ""
              }`}
              onMouseEnter={() => setHoveredId(campana.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(campana.id)}
              onBlur={() => setHoveredId(null)}
              style={{ flexBasis: 0, flexGrow }}
            >
              <Image
                width={800}
                height={800}
                src={campana.image}
                alt={campana.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-2xl font-semibold text-center px-4">
                  {campana.title}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </SectionContainer>
  );
}

export default Page2025;
