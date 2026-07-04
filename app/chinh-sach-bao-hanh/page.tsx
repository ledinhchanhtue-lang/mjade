import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Prose from "@/components/ui/Prose";
import EditorialButton from "@/components/ui/EditorialButton";
import { warrantyPolicy } from "@/data/policies";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Chính Sách Bảo Hành | MJADE",
  description:
    "Chính sách bảo hành của MJADE: cam kết Type A trọn đời sản phẩm, bảo hành chế tác 12 tháng, chăm sóc và làm sạch miễn phí trọn đời.",
  alternates: { canonical: `${site.url}/chinh-sach-bao-hanh` },
};

export default function WarrantyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Hỗ trợ"
        title="Chính sách bảo hành"
        lead="Bảo hành của MJADE bắt đầu từ cam kết quan trọng nhất: sản phẩm đúng là ngọc phỉ thúy tự nhiên Type A."
      />
      <div className="px-5 pb-16 md:px-10 lg:px-[72px] lg:pb-20">
        <div className="mx-auto max-w-content">
          <Prose sections={warrantyPolicy} />
          <div className="mt-12 border-t border-border pt-8">
            <EditorialButton href="/lien-he-tu-van">Liên hệ hỗ trợ bảo hành</EditorialButton>
          </div>
        </div>
      </div>
    </>
  );
}
