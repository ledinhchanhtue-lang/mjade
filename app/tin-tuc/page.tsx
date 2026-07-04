import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ArticleCard from "@/components/ui/ArticleCard";
import { newsArticles } from "@/data/articles";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Tin Tức & Cẩm Nang | MJADE",
  description:
    "Tin tức từ MJADE và cẩm nang kiến thức về ngọc phỉ thúy: cách nhận biết Type A, ý nghĩa văn hóa và cách chăm sóc trang sức ngọc.",
  alternates: { canonical: `${site.url}/tin-tuc` },
};

export default function NewsPage() {
  const sorted = [...newsArticles].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PageHeader
        eyebrow="Tin tức & cẩm nang"
        title="Chuyện về ngọc, viết chậm rãi."
        lead="Kiến thức, câu chuyện và cập nhật từ MJADE — không giật gân, không thổi phồng."
      />
      <div className="px-5 pb-16 md:px-10 lg:px-[72px] lg:pb-20">
        <div className="mx-auto grid max-w-content grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </div>
    </>
  );
}
