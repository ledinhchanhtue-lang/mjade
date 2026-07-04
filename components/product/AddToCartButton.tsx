"use client";

import Link from "next/link";
import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import type { Product } from "@/data/products";

/** Chỉ render cho sản phẩm còn có thể đặt giữ (không phải đã bán / đã đặt trước) */
export default function AddToCartButton({ product }: { product: Product }) {
  const { add, has, ready } = useCart();

  if (product.availability === "da-ban" || product.availability === "da-dat-truoc") {
    return null;
  }

  const inCart = ready && has(product.slug);

  if (inCart) {
    return (
      <Link
        href="/gio-hang"
        className="inline-flex items-center justify-center gap-2 border border-jade-deep bg-jade-pale/40 px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.14em] text-jade-deep"
      >
        <Check size={14} strokeWidth={1.6} />
        Đã thêm — xem danh sách đặt giữ
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => add(product.slug)}
      className="inline-flex items-center justify-center gap-2 border border-border bg-white px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.14em] text-text-primary transition-colors duration-300 hover:border-jade-deep hover:text-jade-deep"
    >
      <ShoppingBag size={14} strokeWidth={1.5} />
      Thêm vào danh sách đặt giữ
    </button>
  );
}
