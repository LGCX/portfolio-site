"use client";

import Image from "next/image";
import React from "react";

type AboutTwoColumnProps = {
  eyebrow?: string;
  title: React.ReactNode;
  paragraphs: string[];
  imageSrc: string;
  imageAlt?: string;
  imageWidthPx?: number; // controls the visual width of the image/card
  imageHeightPx?: number; // optional custom height
};

export default function AboutTwoColumn({
  eyebrow = "About",
  title,
  paragraphs,
  imageSrc,
  imageAlt = "",
  imageWidthPx = 400,
  imageHeightPx = 400,
}: AboutTwoColumnProps) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-12 gap-x-16 lg:grid-cols-2 items-start">
          {/* Left: Copy */}
          <div>
            <div className="h-1 w-full bg-black/50 mb-6" />
            {eyebrow && (
              <p className="photonegative-text text-sm font-semibold text-black-600 tracking-wide uppercase mb-4">
                {eyebrow}
              </p>
            )}
            <h2 className="photonegative-text text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-6">
              {title}
            </h2>
            <div className="space-y-5 text-slate-600 text-lg">
              {paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

          {/* Right: Image card */}
          <div className="relative flex items-center justify-center">
            <div
              className="rounded-xl overflow-hidden shadow-xl ring-1 ring-slate-900/10"
              style={{ width: imageWidthPx }}
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={imageWidthPx}
                height={imageHeightPx}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
            {/* Soft drop shadow halo */}
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[28px] bg-slate-900/5 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}


