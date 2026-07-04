import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import ArticleCard from "@/components/ui/ArticleCard";
import EditorialButton from "@/components/ui/EditorialButton";
import { guideArticles } from "@/data/articles";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Cẩm Nang Ngọc Phỉ Thúy | MJADE",
  description:
    "Cẩm nang từ MJADE: cách nhận biết ngọc phỉ thúy Type A, ý nghĩa văn hóa của ngọc và cách chăm sóc trang sức ngọc đúng cách.",
  alternates: { canonical: `${site.url}/cam-nang-ngoc` },
};

export default function GuidePage() {
  return (
    <>
      <PageHeader
        eyebrow="Dịch vụ"
        title="Cẩm nang ngọc"
        lead="Những bài viết nền tảng giúp bạn hiểu, chọn và giữ gìn món ngọc của mình."
      />
      <div className="px-5 pb-16 md:px-10 lg:px-[72px] lg:pb-20">
        <div className="mx-auto max-w-content">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {guideArticles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
          <p className="mt-8 text-[13px] text-text-secondary">
            Muốn tìm hiểu có hệ thống? Bắt đầu từ trang{" "}
            <Link href="/ngoc-phi-thuy" className="text-jade-deep underline-offset-4 hover:underline">
              Ngọc phỉ thúy là gì
            </Link>
            .
          </p>
          <div className="mt-8">
            <EditorialButton href="/lien-he-tu-van">Hỏi trực tiếp chuyên gia</EditorialButton>
          </div>
        </div>
      </div>
    </>
  );
}
