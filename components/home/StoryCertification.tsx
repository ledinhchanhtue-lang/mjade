import Image from "next/image";
import { Check } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import EditorialButton from "@/components/ui/EditorialButton";
import Reveal from "@/components/ui/Reveal";
import { certificationChecklist } from "@/data/services";
import { storyBlock, certificationBlock } from "@/data/home";

export default function StoryCertification() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col gap-8 bg-background-warm px-5 py-12 sm:px-8 md:px-10 lg:flex-row lg:items-center lg:gap-10 lg:px-[72px] lg:py-20">
          <Reveal className="flex flex-1 flex-col gap-5">
            <SectionLabel>{storyBlock.eyebrow}</SectionLabel>
            <h2 className="font-heading text-[30px] leading-tight text-text-primary md:text-[36px] lg:text-[42px]">
              {storyBlock.titleLine1}
              <br />
              {storyBlock.titleLine2}
            </h2>
            <p className="max-w-md text-[14px] leading-relaxed text-text-secondary">
              {storyBlock.body}
            </p>
            <EditorialButton href={storyBlock.ctaHref} variant="text" className="mt-1">
              {storyBlock.ctaLabel}
            </EditorialButton>
          </Reveal>

          <Reveal delay={120} className="relative aspect-[4/5] w-full flex-1 lg:max-w-[420px]">
            <Image
              src={storyBlock.image}
              alt={storyBlock.imageAlt}
              fill
              sizes="(min-width: 1024px) 30vw, 90vw"
              className="object-cover"
            />
          </Reveal>
        </div>

        <div className="flex flex-col gap-8 bg-white px-5 py-12 sm:px-8 md:px-10 lg:flex-row lg:items-center lg:gap-10 lg:px-[72px] lg:py-20">
          <Reveal className="flex flex-1 flex-col gap-5">
            <SectionLabel>{certificationBlock.eyebrow}</SectionLabel>
            <h2 className="font-heading text-[30px] leading-tight text-text-primary md:text-[36px] lg:text-[42px]">
              {certificationBlock.titleLine1}
              <br />
              {certificationBlock.titleLine2}
            </h2>
            <p className="max-w-md text-[14px] leading-relaxed text-text-secondary">
              {certificationBlock.body}
            </p>
            <ul className="flex flex-col gap-2.5">
              {certificationChecklist.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[13px] text-text-secondary">
                  <Check size={16} strokeWidth={1.6} className="mt-0.5 flex-none text-jade-deep" />
                  {item}
                </li>
              ))}
            </ul>
            <EditorialButton href={certificationBlock.ctaHref} variant="text" className="mt-1">
              {certificationBlock.ctaLabel}
            </EditorialButton>
          </Reveal>

          <Reveal delay={120} className="relative aspect-[3/4] w-full flex-1 lg:max-w-[360px]">
            <Image
              src={certificationBlock.image}
              alt={certificationBlock.imageAlt}
              fill
              sizes="(min-width: 1024px) 26vw, 90vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
