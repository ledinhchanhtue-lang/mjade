import type { Metadata } from "next";
import { MapPin, Phone } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import EditorialButton from "@/components/ui/EditorialButton";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Hệ Thống Showroom MJADE | Ngọc Phỉ Thúy Myanmar Type A",
  description:
    "Ghé showroom MJADE tại TP.HCM, Hà Nội và Nha Trang để trải nghiệm trực tiếp ngọc phỉ thúy Myanmar Type A và được tư vấn, Khám Ngọc cùng chuyên gia.",
  alternates: { canonical: `${site.url}/showroom` },
};

export default function ShowroomPage() {
  return (
    <>
      <PageHeader
        eyebrow="Hệ thống showroom"
        title={
          <>
            Đến gặp viên ngọc của bạn,
            <br />
            <em className="italic text-jade-deep">trực tiếp tại showroom.</em>
          </>
        }
        lead="MJADE mời bạn ghé showroom để tận tay cảm nhận chất ngọc dưới ánh sáng thật, được tư vấn riêng và hỗ trợ Khám Ngọc cùng chuyên gia."
      />

      <section className="px-5 pb-16 md:px-10 lg:px-[72px] lg:pb-24">
        <div className="mx-auto grid max-w-content grid-cols-1 gap-5 md:grid-cols-2">
          {site.stores.map((store, i) => (
            <div
              key={store.address}
              className="flex flex-col border border-border bg-white p-7 md:p-8"
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-jade-deep">
                Showroom {i + 1}
              </p>
              <p className="mt-3 font-heading text-[22px] text-text-primary md:text-[24px]">
                {store.city}
              </p>
              <p className="mt-3 flex items-start gap-2.5 text-[14px] leading-relaxed text-text-secondary">
                <MapPin size={17} strokeWidth={1.5} className="mt-0.5 flex-none text-jade-deep" />
                {store.address}
              </p>
              <a
                href={`tel:${site.phone}`}
                className="mt-2 flex items-center gap-2.5 text-[14px] text-text-secondary transition-colors hover:text-jade-deep"
              >
                <Phone size={17} strokeWidth={1.5} className="flex-none text-jade-deep" />
                {site.phone}
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  "MJADE " + store.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block text-[11px] font-medium uppercase tracking-[0.12em] text-jade-deep underline-offset-4 hover:underline"
              >
                Xem bản đồ →
              </a>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-content border-t border-border pt-10 text-center">
          <p className="mx-auto max-w-xl text-[14px] leading-relaxed text-text-secondary">
            Muốn được phục vụ chu đáo hơn? Đặt lịch trước để chuyên gia MJADE
            chuẩn bị sẵn những viên ngọc phù hợp với bạn.
          </p>
          <div className="mt-6 flex justify-center">
            <EditorialButton href="/lien-he-tu-van">Đặt lịch Khám Ngọc</EditorialButton>
          </div>
        </div>
      </section>
    </>
  );
}
