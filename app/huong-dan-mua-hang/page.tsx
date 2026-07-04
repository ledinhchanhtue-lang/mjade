import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Prose from "@/components/ui/Prose";
import EditorialButton from "@/components/ui/EditorialButton";
import { buyingGuide } from "@/data/policies";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Hướng Dẫn Mua Hàng | MJADE",
  description:
    "Quy trình mua trang sức ngọc phỉ thúy tại MJADE: chọn sản phẩm, xem ngọc trực tiếp hoặc qua video call, xác nhận đơn và nhận hàng kèm chứng thư.",
  alternates: { canonical: `${site.url}/huong-dan-mua-hang` },
};

export default function BuyingGuidePage() {
  return (
    <>
      <PageHeader
        eyebrow="Hỗ trợ"
        title="Hướng dẫn mua hàng"
        lead="Bốn bước đơn giản — được thiết kế để bạn luôn thấy rõ ràng và yên tâm ở từng khâu."
      />
      <div className="px-5 pb-16 md:px-10 lg:px-[72px] lg:pb-20">
        <div className="mx-auto max-w-content">
          <Prose sections={buyingGuide} />
          <div className="mt-12 border-t border-border pt-8">
            <EditorialButton href="/bo-suu-tap">Bắt đầu từ bộ sưu tập</EditorialButton>
          </div>
        </div>
      </div>
    </>
  );
}
