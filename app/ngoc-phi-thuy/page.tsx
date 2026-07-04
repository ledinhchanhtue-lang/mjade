import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import FaqList from "@/components/ui/FaqList";
import EditorialButton from "@/components/ui/EditorialButton";
import SectionLabel from "@/components/ui/SectionLabel";
import { educationSections, culturalNote } from "@/data/education";
import { generalFaq } from "@/data/faq";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Ngọc Phỉ Thúy Là Gì? Kiến Thức Từ A–Z | MJADE",
  description:
    "Tìm hiểu ngọc phỉ thúy (jadeite): phân biệt Type A/B/C, cách đánh giá màu sắc, độ trong, kết cấu, cách quan sát sản phẩm và vì sao kiểm định quan trọng.",
  alternates: { canonical: `${site.url}/ngoc-phi-thuy` },
};

export default function EducationPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: generalFaq.slice(0, 5).map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <PageHeader
        eyebrow="Kiến thức về ngọc"
        title={
          <>
            Hiểu ngọc phỉ thúy,
            <br />
            <em className="italic text-jade-deep">trước khi chọn ngọc cho mình.</em>
          </>
        }
        lead="MJADE tin rằng khách hàng hiểu biết là khách hàng hạnh phúc nhất. Trang này tổng hợp kiến thức nền tảng về ngọc phỉ thúy — trung thực, không thổi phồng."
      />

      <div className="px-5 pb-16 md:px-10 lg:px-[72px] lg:pb-20">
        <div className="mx-auto grid max-w-content grid-cols-1 gap-12 lg:grid-cols-[240px_1fr]">
          {/* TOC */}
          <nav aria-label="Mục lục" className="hidden lg:block">
            <div className="sticky top-[140px] flex flex-col gap-2.5 border-l border-border pl-5">
              {educationSections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-[12px] leading-snug text-text-secondary transition-colors hover:text-jade-deep"
                >
                  {s.heading}
                </a>
              ))}
            </div>
          </nav>

          <div className="flex max-w-3xl flex-col gap-12">
            {educationSections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-[140px]">
                <h2 className="font-heading text-[24px] leading-snug text-text-primary md:text-[28px]">
                  {s.heading}
                </h2>
                {s.body.map((p) => (
                  <p key={p.slice(0, 40)} className="mt-3 text-[14px] leading-relaxed text-text-secondary">
                    {p}
                  </p>
                ))}
                {s.list ? (
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {s.list.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[14px] leading-relaxed text-text-secondary">
                        <span aria-hidden className="mt-[9px] h-px w-4 flex-none bg-jade-deep" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <section className="border border-border bg-background-warm px-6 py-6">
              <SectionLabel>{culturalNote.heading}</SectionLabel>
              {culturalNote.body.map((p) => (
                <p key={p.slice(0, 40)} className="mt-3 text-[14px] leading-relaxed text-text-secondary">
                  {p}
                </p>
              ))}
            </section>

            <section id="cau-hoi-thuong-gap" className="scroll-mt-[140px]">
              <h2 className="mb-6 font-heading text-[24px] leading-snug text-text-primary md:text-[28px]">
                Câu hỏi thường gặp
              </h2>
              <FaqList items={generalFaq.slice(0, 5)} />
              <p className="mt-4 text-[13px] text-text-secondary">
                Xem đầy đủ tại{" "}
                <Link href="/cau-hoi-thuong-gap" className="text-jade-deep underline-offset-4 hover:underline">
                  Câu hỏi thường gặp
                </Link>
                .
              </p>
            </section>

            <div className="flex flex-wrap items-center gap-5 border-t border-border pt-8">
              <EditorialButton href="/bo-suu-tap">Xem bộ sưu tập</EditorialButton>
              <EditorialButton href="/kiem-dinh" variant="text">
                Tìm hiểu quy trình kiểm định
              </EditorialButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
