import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import FaqList from "@/components/ui/FaqList";
import EditorialButton from "@/components/ui/EditorialButton";
import SectionLabel from "@/components/ui/SectionLabel";
import { generalFaq, certificationFaq } from "@/data/faq";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Câu Hỏi Thường Gặp | MJADE",
  description:
    "Giải đáp các câu hỏi thường gặp về ngọc phỉ thúy Type A, kiểm định, giao hàng quốc tế, bảo hành và đổi trả tại MJADE.",
  alternates: { canonical: `${site.url}/cau-hoi-thuong-gap` },
};

export default function FaqPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [...generalFaq, ...certificationFaq].map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <PageHeader
        eyebrow="Hỗ trợ"
        title="Câu hỏi thường gặp"
        lead="Chưa tìm thấy câu trả lời? Đội ngũ MJADE luôn sẵn sàng trò chuyện trực tiếp cùng bạn."
      />
      <div className="px-5 pb-16 md:px-10 lg:px-[72px] lg:pb-20">
        <div className="mx-auto flex max-w-content flex-col gap-12">
          <section>
            <SectionLabel className="mb-5">Về sản phẩm &amp; dịch vụ</SectionLabel>
            <FaqList items={generalFaq} />
          </section>
          <section>
            <SectionLabel className="mb-5">Về kiểm định</SectionLabel>
            <FaqList items={certificationFaq} />
          </section>
          <div>
            <EditorialButton href="/lien-he-tu-van">Đặt câu hỏi cho MJADE</EditorialButton>
          </div>
        </div>
      </div>
    </>
  );
}
