import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/ui/PageHeader";
import SectionLabel from "@/components/ui/SectionLabel";
import FaqList from "@/components/ui/FaqList";
import EditorialButton from "@/components/ui/EditorialButton";
import CertLookup from "@/components/forms/CertLookup";
import { certificationFaq } from "@/data/faq";
import { site } from "@/data/site";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Kiểm Định Ngọc Phỉ Thúy Type A | MJADE",
  description:
    "Quy trình kiểm định và cam kết minh bạch của MJADE: chứng thư đi kèm từng sản phẩm, mã sản phẩm đối chiếu, hoàn tiền 100% nếu không đúng cam kết Type A.",
  alternates: { canonical: `${site.url}/kiem-dinh` },
};

const flow = [
  {
    step: "01",
    title: "Tuyển chọn từ nguồn",
    body: "Ngọc được đánh giá ngay từ khâu thô tại nguồn Myanmar — loại bỏ đá xử lý trước khi đưa vào chế tác.",
  },
  {
    step: "02",
    title: "Kiểm định độc lập",
    body: "Sản phẩm hoàn thiện được kiểm định tại Myanmar Treasure Gemological Laboratory — chuyên gia đạt chứng chỉ GIA (America) và FGA (London), thiết bị quang phổ chuyên dụng.",
  },
  {
    step: "03",
    title: "Gắn mã sản phẩm",
    body: "Mỗi sản phẩm nhận một mã riêng (ví dụ MJ-P001) in trên thẻ và hóa đơn, đối chiếu 1-1 với chứng thư.",
  },
  {
    step: "04",
    title: "Giao kèm chứng thư",
    body: "Chứng thư bản cứng đi cùng sản phẩm đến tay bạn — trong nước lẫn quốc tế.",
  },
];

const certFields = [
  "Loại đá: Jadeite (ngọc phỉ thúy)",
  "Kết luận xử lý: Natural / Type A — không tẩm nhựa, không nhuộm màu",
  "Màu sắc, kích thước và trọng lượng của sản phẩm",
  "Mã số chứng thư để tra cứu và đối chiếu",
];

export default function CertificationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kiểm định & cam kết"
        title={
          <>
            Uy tín tạo nên
            <br />
            <em className="italic text-jade-deep">niềm tin.</em>
          </>
        }
        lead="Trong thế giới ngọc, lời nói không đủ. MJADE xây dựng niềm tin bằng chứng thư kiểm định độc lập, mã sản phẩm đối chiếu và một cam kết hoàn tiền không giới hạn thời gian."
      />

      {/* Vì sao kiểm định */}
      <section className="px-5 py-4 md:px-10 lg:px-[72px]">
        <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionLabel>Vì sao kiểm định quan trọng</SectionLabel>
            <h2 className="mt-3 font-heading text-[26px] leading-snug text-text-primary md:text-[32px]">
              Mắt thường không thể kết luận
            </h2>
            <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-text-secondary">
              Công nghệ xử lý ngọc ngày nay tinh vi đến mức người có kinh nghiệm lâu năm cũng
              có thể nhầm. Chỉ thiết bị quang phổ tại phòng kiểm định mới phát hiện được dấu
              vết nhựa polymer hay thuốc nhuộm trong cấu trúc đá.
            </p>
            <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-text-secondary">
              Type A — tự nhiên hoàn toàn — là phân loại duy nhất giữ giá trị theo thời gian.
              Đó là lý do MJADE chỉ bán Type A, và chứng minh điều đó bằng giấy tờ.
            </p>
          </div>
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-background-warm">
            <Image
              src="/images/editorial/inspection-wide.webp"
              alt="Vòng, nhẫn và chuỗi ngọc phỉ thúy trên khay linen dưới ánh nắng tự nhiên"
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Quy trình */}
      <section className="px-5 py-14 md:px-10 lg:px-[72px] lg:py-20">
        <div className="mx-auto max-w-content">
          <SectionLabel>Quy trình minh bạch của MJADE</SectionLabel>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {flow.map((f) => (
              <div key={f.step} className="border-t border-jade-deep/40 pt-5">
                <p className="font-heading text-[28px] text-jade-soft">{f.step}</p>
                <p className="mt-2 text-[13px] font-medium uppercase tracking-[0.1em] text-text-primary">
                  {f.title}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-text-secondary">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chứng thư gồm gì + mẫu */}
      <section className="bg-background-warm px-5 py-14 md:px-10 lg:px-[72px] lg:py-20">
        <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionLabel>Chứng thư kiểm định gồm những gì</SectionLabel>
            <ul className="mt-6 flex flex-col gap-3">
              {certFields.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[14px] leading-relaxed text-text-secondary">
                  <Check size={16} strokeWidth={1.6} className="mt-0.5 flex-none text-jade-deep" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-xl border-l-2 border-jade-deep pl-4 text-[14px] leading-relaxed text-text-primary">
              Nếu bất kỳ đơn vị kiểm định độc lập nào kết luận sản phẩm không đúng cam kết
              Type A — MJADE hoàn tiền 100%, không giới hạn thời gian.
            </p>
          </div>
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[360px]">
            <Image
              src="/images/certificates/certificate-front.webp"
              alt="Chứng thư kiểm định Myanmar Treasure Gemological Laboratory — Natural Jadeite Type A"
              fill
              sizes="(min-width: 1024px) 30vw, 80vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mẫu chứng thư thực tế */}
      <section className="px-5 py-14 md:px-10 lg:px-[72px] lg:py-16">
        <div className="mx-auto max-w-content">
          <SectionLabel>Mẫu chứng thư thực tế</SectionLabel>
          <h2 className="mt-3 font-heading text-[24px] leading-snug text-text-primary md:text-[30px]">
            Chứng thư từ Myanmar Treasure Gemological Laboratory
          </h2>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-text-secondary">
            Mỗi sản phẩm MJADE đi kèm một chứng thư kiểm định độc lập như dưới đây — thẩm định
            công nghệ bởi chuyên gia đạt chứng chỉ GIA (America) và FGA (London), kết luận rõ
            ràng Natural Jadeite (Type A).
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                src: "/images/certificates/certificate-front.webp",
                alt: "Mặt trước chứng thư — Natural Jadeite Type A, mã ID No.10101054179",
                caption: "Mặt trước — kết luận Natural Jadeite (Type A)",
              },
              {
                src: "/images/certificates/certificate-detail.webp",
                alt: "Trang thông số kỹ thuật và chữ ký chuyên gia GIA, FGA London",
                caption: "Thông số kỹ thuật & chữ ký chuyên gia GIA · FGA",
              },
              {
                src: "/images/certificates/certificate-hand.webp",
                alt: "Chứng thư kiểm định thực tế cầm trên tay tại showroom MJADE",
                caption: "Chứng thư bản cứng đi kèm sản phẩm",
              },
            ].map((c) => (
              <figure key={c.src}>
                <div className="relative aspect-[3/4] w-full overflow-hidden border border-border bg-background-warm">
                  <Image
                    src={c.src}
                    alt={c.alt}
                    fill
                    sizes="(min-width: 640px) 30vw, 90vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-[12px] leading-relaxed text-text-secondary">
                  {c.caption}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-6 text-[12px] italic leading-relaxed text-text-secondary">
            Ảnh chụp một chứng thư thực tế làm ví dụ. Mã số trên chứng thư của bạn được đối
            chiếu 1-1 với sản phẩm nhận được.
          </p>
        </div>
      </section>

      {/* Tra cứu */}
      <section className="px-5 py-14 md:px-10 lg:px-[72px]">
        <div className="mx-auto max-w-content">
          <CertLookup />
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 pb-16 md:px-10 lg:px-[72px] lg:pb-20">
        <div className="mx-auto max-w-content">
          <h2 className="mb-6 font-heading text-[24px] leading-snug text-text-primary md:text-[28px]">
            Câu hỏi thường gặp về kiểm định
          </h2>
          <FaqList items={certificationFaq} />
          <div className="mt-8 flex justify-start">
            <EditorialButton href="/lien-he-tu-van">Đặt lịch tư vấn cùng chuyên gia</EditorialButton>
          </div>
        </div>
      </section>
    </>
  );
}
