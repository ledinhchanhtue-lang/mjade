import Image from "next/image";
import EditorialButton from "@/components/ui/EditorialButton";
import SectionLabel from "@/components/ui/SectionLabel";
import TrustItem from "@/components/home/TrustItem";
import { trustPoints } from "@/data/services";
import { heroBlock } from "@/data/home";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#1b1b1b]">
      <div className="relative min-h-[560px] w-full md:min-h-[620px] lg:min-h-[720px]">
        <Image
          src={heroBlock.image}
          alt={heroBlock.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Lớp phủ tối để chữ trắng đọc rõ trên ảnh */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/15 to-black/60" />

        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-page items-center px-5 py-12 md:px-10 lg:px-[72px]">
            <div className="ml-auto flex max-w-xl flex-col gap-6 text-white md:w-[48%] lg:w-[46%]">
              <SectionLabel tone="light">{heroBlock.eyebrow}</SectionLabel>

              <h1 className="font-heading text-[42px] leading-[1.02] text-white sm:text-[52px] lg:text-[clamp(52px,5vw,76px)]">
                {heroBlock.titleLine1}
                <br />
                <em className="italic text-white">{heroBlock.titleLine2}</em>
              </h1>

              <p className="max-w-md text-[14px] leading-relaxed text-white/80 md:text-[15px]">
                {heroBlock.body}
              </p>

              <div className="grid grid-cols-2 gap-x-6 gap-y-7 pt-2 sm:grid-cols-3 lg:gap-x-5">
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

        {heroBlock.imageCaption ? (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-5 py-4 md:px-10 lg:px-[72px]">
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/80">
              {heroBlock.imageCaption}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
