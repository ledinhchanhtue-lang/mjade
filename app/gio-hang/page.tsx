import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import CartPageClient from "@/components/cart/CartPageClient";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Giỏ Hàng | MJADE",
  description:
    "Giỏ hàng của bạn tại MJADE. Hoàn tất đơn hàng và chọn hình thức nhận hàng phù hợp.",
  alternates: { canonical: `${site.url}/gio-hang` },
  robots: { index: false },
};

export default function CartPage() {
  return (
    <>
      <PageHeader
        eyebrow="Giỏ hàng"
        title="Giỏ hàng của bạn"
        lead="Kiểm tra các sản phẩm đã chọn và hoàn tất đơn hàng. MJADE sẽ liên hệ xác nhận và tư vấn hình thức nhận hàng, thanh toán phù hợp — kể cả với đơn quốc tế."
      />
      <div className="px-5 pb-16 md:px-10 lg:px-[72px] lg:pb-20">
        <div className="mx-auto max-w-content">
          <CartPageClient />
        </div>
      </div>
    </>
  );
}
