import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="w-full bg-background-warm px-5 py-14 md:px-10 lg:px-[72px] lg:py-20">
      <div className="mx-auto max-w-content">
        <div className="text-center">
          <SectionLabel>Ngọc nữ của MJADE</SectionLabel>
          <h2 className="mt-3 font-heading text-[28px] leading-tight text-text-primary md:text-[36px]">
            Những chia sẻ thật <em className="italic text-jade-deep">từ khách hàng</em>
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 100}
              className="flex flex-col border border-border bg-white p-7"
            >
              <Image
                src={t.image}
                alt={t.imageAlt}
                width={480}
                height={480}
                className="mb-5 h-16 w-16 rounded-full object-cover ring-1 ring-border/70"
              />
              <p className="font-heading text-[18px] italic leading-relaxed text-text-primary md:text-[19px]">
                “{t.quote}”
              </p>
              <div className="mt-auto pt-6">
                <p className="text-[13px] font-medium text-text-primary">{t.name}</p>
                {t.role && <p className="mt-0.5 text-[12px] text-text-secondary">{t.role}</p>}
                <a
                  href={t.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-[11px] uppercase tracking-[0.1em] text-jade-deep transition-opacity hover:opacity-70"
                >
                  Xem bài gốc trên Facebook →
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
