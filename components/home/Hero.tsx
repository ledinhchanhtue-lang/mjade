"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import EditorialButton from "@/components/ui/EditorialButton";
import SectionLabel from "@/components/ui/SectionLabel";
import TrustItem from "@/components/home/TrustItem";
import { trustPoints } from "@/data/services";
import { heroBlock } from "@/data/home";

const SLIDE_MS = 5000;

export default function Hero() {
  const slides = (
    heroBlock.images && heroBlock.images.length > 0
      ? heroBlock.images
      : [heroBlock.image]
  ).filter(Boolean);

  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => clearInterval(t);
  }, [slides.length]);

  const pos = heroBlock.textPosition ?? "right";
  const blockPos =
    pos === "left"
      ? "mr-auto items-start text-left"
      : pos === "center"
        ? "mx-auto items-center text-center"
        : "ml-auto items-start text-left";
  const trustCols = pos === "center" ? "justify-items-center" : "";

  return (
    <section className="relative w-full overflow-hidden bg-[#1b1b1b]">
      <div className="relative min-h-[560px] w-full md:min-h-[620px] lg:min-h-[720px]">
        {slides.map((src, i) => (
          <Image
            key={src + i}
            src={src}
            alt={i === 0 ? heroBlock.imageAlt : ""}
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover object-center transition-opacity duration-1000 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Lớp phủ tối để chữ trắng đọc rõ trên ảnh */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/15 to-black/60" />

        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-page items-center px-5 py-12 md:px-10 lg:px-[72px]">
            <div className={`flex max-w-xl flex-col gap-6 text-white md:w-[48%] lg:w-[46%] ${blockPos}`}>
              <SectionLabel tone="light">{heroBlock.eyebrow}</SectionLabel>

              <h1 className="font-heading text-[42px] leading-[1.02] text-white sm:text-[52px] lg:text-[clamp(52px,5vw,76px)]">
                {heroBlock.titleLine1}
                <br />
                <em className="italic text-white">{heroBlock.titleLine2}</em>
              </h1>

              <p className="max-w-md text-[14px] leading-relaxed text-white/80 md:text-[15px]">
                {heroBlock.body}
              </p>

              <div className={`grid grid-cols-2 gap-x-6 gap-y-7 pt-2 sm:grid-cols-3 lg:gap-x-5 ${trustCols}`}>
                {trustPoints.map((point) => (
                  <TrustItem key={point.title} {...point} tone="light" />
                ))}
              </div>

              <div className="pt-2">
                <EditorialButton href={heroBlock.ctaHref}>{heroBlock.ctaLabel}</EditorialButton>
              </div>
            </div>
          </div>
        </div>

        {/* Chấm chỉ báo slide */}
        {slides.length > 1 ? (
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ảnh ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        ) : null}

        {heroBlock.imageCaption ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-black/55 to-transparent px-5 py-4 md:block md:px-10 lg:px-[72px]">
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/80">
              {heroBlock.imageCaption}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
