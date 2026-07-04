import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import SectionLabel from "@/components/ui/SectionLabel";
import EditorialButton from "@/components/ui/EditorialButton";
import AvailabilityBadge from "@/components/product/AvailabilityBadge";
import { limitedProducts, formatPrice } from "@/data/products";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Bộ Sưu Tập Giới Hạn — Ngọc Phỉ Thúy Độc Bản | MJADE",
  description:
    "Những thiết kế ngọc phỉ thúy tuyển chọn với số lượng giới hạn. Mỗi viên ngọc mang cấu trúc, sắc độ và dấu ấn riêng — không lặp lại.",
  alternates: { canonical: `${site.url}/bo-suu-tap-gioi-han` },
};

export default function LimitedCollectionPage() {
  return (
    <>
      <PageHeader
        tone="warm"
        eyebrow="Bộ sưu tập giới hạn"
        title={
          <>
            Hiếm có. Độc bản.
            <br />
            <em className="italic text-jade-deep">Dành riêng cho bạn.</em>
          </>
        }
        lead="Tuyển chọn với số lượng giới hạn. Mỗi viên ngọc mang cấu trúc, sắc độ và dấu ấn riêng — khi đã có chủ nhân, thiết kế không được sản xuất lại. Trạng thái sản phẩm được cập nhật theo từng thời điểm."
      />

      <section className="px-5 py-12 md:px-10 lg:px-[72px] lg:py-16">
        <div className="mx-auto flex max-w-content flex-col gap-14">
          {limitedProducts.map((p, i) => (
            <article
              key={p.id}
              className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <Link href={`/san-pham/${p.slug}`} className="relative block aspect-square w-full overflow-hidden bg-background-warm">
                <Image
                  src={p.thumbnail}
                  alt={p.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-cover transition-transform duration-500 hover:scale-[1.025]"
                />
              </Link>
              <div>
                <SectionLabel>{p.productCode}</SectionLabel>
                <h2 className="mt-3 font-heading text-[26px] leading-snug text-text-primary md:text-[32px]">
                  <Link href={`/san-pham/${p.slug}`} className="hover:text-jade-deep">
                    {p.name}
                  </Link>
                </h2>
                <div className="mt-3 flex flex-wrap items-baseline gap-4">
                  <p className="text-[16px] text-accent-warm">{formatPrice(p)}</p>
                  <AvailabilityBadge availability={p.availability} />
                </div>
                <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-text-secondary">
                  {p.story}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-5">
                  <EditorialButton href={`/san-pham/${p.slug}`}>Xem chi tiết</EditorialButton>
                  <EditorialButton href={`/lien-he-tu-van?sp=${p.productCode}`} variant="text">
                    Nhận tư vấn riêng
                  </EditorialButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-background-warm px-5 py-12 text-center md:px-10 lg:px-[72px]">
        <div className="mx-auto max-w-2xl">
          <p className="font-heading text-[24px] italic leading-snug text-text-primary md:text-[28px]">
            Bạn đang tìm một viên ngọc không nằm trong danh sách này?
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-text-secondary">
            MJADE nhận tuyển chọn ngọc theo yêu cầu riêng — sắc độ, phom dáng và ngân sách của bạn.
          </p>
          <div className="mt-6 flex justify-center">
            <EditorialButton href="/lien-he-tu-van">Đặt lịch tư vấn</EditorialButton>
          </div>
        </div>
      </section>
    </>
  );
}
