import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import CollectionBrowser from "@/components/product/CollectionBrowser";
import { products } from "@/data/products";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Bộ Sưu Tập Ngọc Phỉ Thúy Myanmar Type A | MJADE",
  description:
    "Khám phá bộ sưu tập trang sức ngọc phỉ thúy Myanmar Type A của MJADE: vòng bản, nhẫn, mặt dây chuyền, hoa tai và lắc tay — tuyển chọn kỹ, minh bạch nguồn gốc.",
  alternates: { canonical: `${site.url}/bo-suu-tap` },
};

export default function CollectionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Bộ sưu tập"
        title={
          <>
            Mỗi viên ngọc,
            <br />
            <em className="italic text-jade-deep">một dấu ấn riêng.</em>
          </>
        }
        lead="Từng sản phẩm trong bộ sưu tập được MJADE tuyển chọn trực tiếp từ nguồn ngọc Myanmar — không qua trung gian, cam kết Type A tự nhiên và minh bạch thông tin."
      />
      <div className="px-5 pb-16 md:px-10 lg:px-[72px] lg:pb-20">
        <div className="mx-auto max-w-content">
          <CollectionBrowser products={products} />
        </div>
      </div>
    </>
  );
}
