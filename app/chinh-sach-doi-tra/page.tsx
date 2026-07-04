import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Prose from "@/components/ui/Prose";
import EditorialButton from "@/components/ui/EditorialButton";
import { returnPolicy } from "@/data/policies";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Chính Sách Đổi Trả | MJADE",
  description:
    "Chính sách đổi trả của MJADE: đổi trả trong 7 ngày, hoàn tiền 100% nếu sản phẩm không đúng cam kết Type A, áp dụng cho cả đơn quốc tế.",
  alternates: { canonical: `${site.url}/chinh-sach-doi-tra` },
};

export default function ReturnPolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Hỗ trợ"
        title="Chính sách đổi trả"
        lead="Rõ ràng và công bằng — để quyết định của bạn luôn nhẹ nhàng."
      />
      <div className="px-5 pb-16 md:px-10 lg:px-[72px] lg:pb-20">
        <div className="mx-auto max-w-content">
          <Prose sections={returnPolicy} />
          <div className="mt-12 border-t border-border pt-8">
            <EditorialButton href="/lien-he-tu-van">Liên hệ về đơn hàng</EditorialButton>
          </div>
        </div>
      </div>
    </>
  );
}
