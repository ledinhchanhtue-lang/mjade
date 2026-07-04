import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import CartPageClient from "@/components/cart/CartPageClient";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Danh Sách Đặt Giữ | MJADE",
  description:
    "Danh sách sản phẩm bạn muốn đặt giữ. Gửi yêu cầu để MJADE xác nhận và giữ sản phẩm cho bạn.",
  alternates: { canonical: `${site.url}/gio-hang` },
  robots: { index: false },
};

export default function CartPage() {
  return (
    <>
      <PageHeader
        eyebrow="Đặt giữ sản phẩm"
        title="Danh sách đặt giữ của bạn"
        lead="Với trang sức ngọc độc bản, MJADE dùng hình thức đặt giữ thay vì thanh toán trực tuyến — để bạn luôn được tư vấn kỹ và xem ngọc trước khi quyết định."
      />
      <div className="px-5 pb-16 md:px-10 lg:px-[72px] lg:pb-20">
        <div className="mx-auto max-w-content">
          <CartPageClient />
        </div>
      </div>
    </>
  );
}
