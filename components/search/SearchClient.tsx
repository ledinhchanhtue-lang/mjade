"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { products, categoryLabels, colorLabels } from "@/data/products";
import ProductCard from "@/components/home/ProductCard";

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d");
}

const suggestions = ["Vòng bản", "Mặt dây chuyền", "Nhẫn", "Hoa tai", "Xanh lục", "MJ-P001"];

export default function SearchClient({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (q.length < 1) return null;
    return products.filter((p) => {
      const haystack = normalize(
        [
          p.name,
          p.productCode,
          categoryLabels[p.category],
          p.collection === "limited" ? "gioi han limited" : "signature",
          p.colorLabel ?? "",
          p.color ? colorLabels[p.color] : "",
        ].join(" ")
      );
      return q.split(/\s+/).every((term) => haystack.includes(term));
    });
  }, [query]);

  return (
    <div>
      <div className="relative max-w-xl">
        <label htmlFor="site-search" className="sr-only">
          Tìm kiếm sản phẩm
        </label>
        <Search
          size={18}
          strokeWidth={1.4}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary"
        />
        <input
          id="site-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tên sản phẩm, mã sản phẩm, loại, màu ngọc…"
          autoFocus
          className="w-full border border-border bg-white py-3.5 pl-11 pr-4 text-[14px] text-text-primary placeholder:text-text-secondary/70 focus:border-jade-deep focus:outline-none"
        />
      </div>

      {results === null ? (
        <div className="mt-6">
          <p className="text-[12px] uppercase tracking-[0.1em] text-text-secondary">Gợi ý tìm kiếm</p>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setQuery(s)}
                className="border border-border bg-white px-4 py-2 text-[12px] text-text-primary transition-colors hover:border-jade-deep hover:text-jade-deep"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : results.length > 0 ? (
        <>
          <p aria-live="polite" className="mt-6 text-[12px] text-text-secondary">
            {results.length} kết quả cho “{query}”
          </p>
          <div className="mt-4 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} showAvailability />
            ))}
          </div>
        </>
      ) : (
        <div aria-live="polite" className="mt-8 border border-dashed border-border bg-background-warm px-6 py-14 text-center">
          <p className="font-heading text-xl italic text-text-primary">
            Không tìm thấy kết quả cho “{query}”.
          </p>
          <p className="mt-2 text-[13px] text-text-secondary">
            Thử từ khóa khác, hoặc để MJADE tư vấn trực tiếp — có thể viên ngọc bạn tìm chưa
            được đăng trên website.
          </p>
        </div>
      )}
    </div>
  );
}
