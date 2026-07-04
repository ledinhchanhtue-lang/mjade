import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Prose from "@/components/ui/Prose";
import EditorialButton from "@/components/ui/EditorialButton";
import SectionLabel from "@/components/ui/SectionLabel";
import { shippingInfo } from "@/data/policies";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Giao Hàng Quốc Tế — Phục Vụ Người Việt Khắp Nơi | MJADE",
  description:
    "MJADE giao trang sức ngọc phỉ thúy đến Mỹ, Canada, Úc, châu Âu và Đông Á — có tư vấn vận chuyển, bảo hiểm và chứng từ đầy đủ cho từng đơn.",
  alternates: { canonical: `${site.url}/giao-hang-quoc-te` },
};

export default function InternationalShippingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Giao hàng quốc tế"
        title={
          <>
            Khoảng cách không là rào cản
            <br />
            <em className="italic text-jade-deep">giữa bạn và viên ngọc của mình.</em>
          </>
        }
        lead="MJADE phục vụ cộng đồng người Việt ở khắp nơi trên thế giới — từ tư vấn qua video call đến vận chuyển có bảo hiểm và chứng từ đầy đủ."
      />

      <div className="px-5 pb-6 md:px-10 lg:px-[72px]">
        <div className="mx-auto max-w-content">
          <SectionLabel>Điểm đến tiêu biểu</SectionLabel>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {site.shippingDestinations.map((d) => (
              <li
                key={d}
                className="border border-border bg-white px-4 py-2 text-[12px] uppercase tracking-[0.08em] text-text-primary"
              >
                {d}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[12px] text-text-secondary">
            Điểm đến khác? Liên hệ để MJADE kiểm tra phương án vận chuyển cho bạn.
          </p>
        </div>
      </div>

      <div className="px-5 py-12 md:px-10 lg:px-[72px] lg:py-14">
        <div className="mx-auto max-w-content">
          <Prose sections={shippingInfo} />
          <div className="mt-12 flex flex-wrap items-center gap-5 border-t border-border pt-8">
            <EditorialButton href="/lien-he-tu-van">Tư vấn đơn hàng quốc tế</EditorialButton>
            <EditorialButton href="/chinh-sach-doi-tra" variant="text">
              Chính sách đổi trả
            </EditorialButton>
          </div>
        </div>
      </div>
    </>
  );
}
