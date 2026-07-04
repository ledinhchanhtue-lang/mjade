import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import SearchClient from "@/components/search/SearchClient";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Tìm Kiếm | MJADE",
  description: "Tìm kiếm sản phẩm ngọc phỉ thúy theo tên, mã sản phẩm, loại hoặc màu ngọc.",
  alternates: { canonical: `${site.url}/tim-kiem` },
  robots: { index: false },
};

type Props = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  return (
    <>
      <PageHeader eyebrow="Tìm kiếm" title="Bạn đang tìm điều gì?" />
      <div className="px-5 pb-16 md:px-10 lg:px-[72px] lg:pb-20">
        <div className="mx-auto max-w-content">
          <SearchClient initialQuery={q ?? ""} />
        </div>
      </div>
    </>
  );
}
