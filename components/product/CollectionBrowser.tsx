"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import type { Availability, JadeColor, Product, ProductCategory } from "@/data/products";
import { availabilityLabels, categoryLabels, colorLabels } from "@/data/products";
import ProductCard from "@/components/home/ProductCard";

type SortKey = "moi-nhat" | "gia-tang" | "gia-giam" | "gioi-han";

const sortLabels: Record<SortKey, string> = {
  "moi-nhat": "Mới nhất",
  "gia-tang": "Giá tăng dần",
  "gia-giam": "Giá giảm dần",
  "gioi-han": "Bộ sưu tập giới hạn",
};

const priceBands = [
  { id: "duoi-25", label: "Dưới 25 triệu", test: (v: number) => v < 25_000_000 },
  { id: "25-35", label: "25 – 35 triệu", test: (v: number) => v >= 25_000_000 && v <= 35_000_000 },
  { id: "tren-35", label: "Trên 35 triệu", test: (v: number) => v > 35_000_000 },
  { id: "lien-he", label: "Giá liên hệ", test: () => false },
] as const;

type PriceBandId = (typeof priceBands)[number]["id"];

const selectCls =
  "border border-border bg-white px-3 py-2 text-[12px] text-text-primary focus:border-jade-deep focus:outline-none";

export default function CollectionBrowser({ products }: { products: Product[] }) {
  const [category, setCategory] = useState<ProductCategory | "">("");
  const [color, setColor] = useState<JadeColor | "">("");
  const [price, setPrice] = useState<PriceBandId | "">("");
  const [metal, setMetal] = useState("");
  const [availability, setAvailability] = useState<Availability | "">("");
  const [certified, setCertified] = useState(false);
  const [collection, setCollection] = useState<"" | "signature" | "limited">("");
  const [sort, setSort] = useState<SortKey>("moi-nhat");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const metals = useMemo(
    () => [...new Set(products.map((p) => p.metal).filter(Boolean))] as string[],
    [products]
  );

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (category && p.category !== category) return false;
      if (color && p.color !== color) return false;
      if (metal && p.metal !== metal) return false;
      if (availability && p.availability !== availability) return false;
      if (certified && !p.certificateAvailable) return false;
      if (collection && p.collection !== collection) return false;
      if (price) {
        if (price === "lien-he") return p.priceVnd == null;
        if (p.priceVnd == null) return false;
        const band = priceBands.find((b) => b.id === price);
        if (band && !band.test(p.priceVnd)) return false;
      }
      return true;
    });

    switch (sort) {
      case "gia-tang":
        list = [...list].sort((a, b) => (a.priceVnd ?? Infinity) - (b.priceVnd ?? Infinity));
        break;
      case "gia-giam":
        list = [...list].sort((a, b) => (b.priceVnd ?? -1) - (a.priceVnd ?? -1));
        break;
      case "gioi-han":
        list = [...list].sort((a, b) => Number(b.limited) - Number(a.limited));
        break;
      default:
        break;
    }
    return list;
  }, [products, category, color, price, metal, availability, certified, collection, sort]);

  const activeCount =
    Number(!!category) +
    Number(!!color) +
    Number(!!price) +
    Number(!!metal) +
    Number(!!availability) +
    Number(certified) +
    Number(!!collection);

  function clearAll() {
    setCategory("");
    setColor("");
    setPrice("");
    setMetal("");
    setAvailability("");
    setCertified(false);
    setCollection("");
  }

  const filterControls = (
    <>
      <select aria-label="Loại sản phẩm" value={category} onChange={(e) => setCategory(e.target.value as ProductCategory | "")} className={selectCls}>
        <option value="">Loại sản phẩm</option>
        {Object.entries(categoryLabels).map(([k, v]) => (
          <option key={k} value={k}>{v}</option>
        ))}
      </select>
      <select aria-label="Màu ngọc" value={color} onChange={(e) => setColor(e.target.value as JadeColor | "")} className={selectCls}>
        <option value="">Màu ngọc</option>
        {Object.entries(colorLabels).map(([k, v]) => (
          <option key={k} value={k}>{v}</option>
        ))}
      </select>
      <select aria-label="Khoảng giá" value={price} onChange={(e) => setPrice(e.target.value as PriceBandId | "")} className={selectCls}>
        <option value="">Khoảng giá</option>
        {priceBands.map((b) => (
          <option key={b.id} value={b.id}>{b.label}</option>
        ))}
      </select>
      <select aria-label="Chất liệu kim loại" value={metal} onChange={(e) => setMetal(e.target.value)} className={selectCls}>
        <option value="">Chất liệu</option>
        {metals.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
      <select aria-label="Tình trạng" value={availability} onChange={(e) => setAvailability(e.target.value as Availability | "")} className={selectCls}>
        <option value="">Tình trạng</option>
        {Object.entries(availabilityLabels).map(([k, v]) => (
          <option key={k} value={k}>{v}</option>
        ))}
      </select>
      <select aria-label="Bộ sưu tập" value={collection} onChange={(e) => setCollection(e.target.value as "" | "signature" | "limited")} className={selectCls}>
        <option value="">Bộ sưu tập</option>
        <option value="signature">Signature</option>
        <option value="limited">Giới hạn</option>
      </select>
      <label className="flex cursor-pointer items-center gap-2 text-[12px] text-text-primary">
        <input
          type="checkbox"
          checked={certified}
          onChange={(e) => setCertified(e.target.checked)}
          className="h-4 w-4 accent-[#3E5A46]"
        />
        Có chứng thư
      </label>
    </>
  );

  return (
    <div>
      {/* Filter bar desktop */}
      <div className="hidden flex-wrap items-center gap-3 border-y border-border py-4 md:flex">
        {filterControls}
        {activeCount > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.1em] text-text-secondary hover:text-jade-deep"
          >
            <X size={13} strokeWidth={1.5} /> Xóa lọc ({activeCount})
          </button>
        )}
        <div className="ml-auto">
          <select aria-label="Sắp xếp" value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className={selectCls}>
            {Object.entries(sortLabels).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter trigger mobile */}
      <div className="flex items-center justify-between border-y border-border py-3 md:hidden">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.1em] text-text-primary"
        >
          <SlidersHorizontal size={15} strokeWidth={1.5} />
          Bộ lọc{activeCount > 0 ? ` (${activeCount})` : ""}
        </button>
        <select aria-label="Sắp xếp" value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className={selectCls}>
          {Object.entries(sortLabels).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
      </div>

      {/* Bottom sheet mobile */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Bộ lọc sản phẩm">
          <button
            type="button"
            aria-label="Đóng bộ lọc"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-text-primary/30"
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[80vh] overflow-y-auto bg-white px-5 pb-8 pt-5">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <p className="text-[12px] font-medium uppercase tracking-[0.12em]">Bộ lọc</p>
              <button type="button" aria-label="Đóng" onClick={() => setDrawerOpen(false)}>
                <X size={20} strokeWidth={1.4} />
              </button>
            </div>
            <div className="mt-4 flex flex-col gap-3 [&>select]:w-full">{filterControls}</div>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="flex-1 border border-jade-deep bg-jade-deep px-4 py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-white"
              >
                Xem {filtered.length} sản phẩm
              </button>
              {activeCount > 0 && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="border border-border px-4 py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-text-secondary"
                >
                  Xóa lọc
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      <p aria-live="polite" className="mt-5 text-[12px] text-text-secondary">
        {filtered.length} sản phẩm
      </p>
      {filtered.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} showAvailability />
          ))}
        </div>
      ) : (
        <div className="mt-8 border border-dashed border-border bg-background-warm px-6 py-14 text-center">
          <p className="font-heading text-xl italic text-text-primary">
            Chưa có sản phẩm khớp bộ lọc này.
          </p>
          <p className="mt-2 text-[13px] text-text-secondary">
            Thử bỏ bớt điều kiện lọc, hoặc để MJADE tư vấn riêng cho nhu cầu của bạn.
          </p>
        </div>
      )}
    </div>
  );
}
