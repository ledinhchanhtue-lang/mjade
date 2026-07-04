"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LoaderCircle, X } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { getProduct, formatPrice } from "@/data/products";
import AvailabilityBadge from "@/components/product/AvailabilityBadge";
import EditorialButton from "@/components/ui/EditorialButton";

type Status = "idle" | "loading" | "success" | "error";

const inputCls =
  "w-full border border-border bg-white px-4 py-3 text-[14px] text-text-primary placeholder:text-text-secondary/70 focus:border-jade-deep focus:outline-none";
const labelCls = "mb-1.5 block text-[12px] font-medium uppercase tracking-[0.1em] text-text-primary";

export default function CartPageClient() {
  const { items, remove, clear, ready } = useCart();
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const rows = items
    .map((i) => getProduct(i.slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const values = Object.fromEntries(fd.entries()) as Record<string, string>;

    const errors: Record<string, string> = {};
    if (!values.name || values.name.trim().length < 2) errors.name = "Vui lòng nhập họ và tên.";
    if (!values.phone || !/^[+\d][\d\s().-]{6,19}$/.test(values.phone.trim()))
      errors.phone = "Số điện thoại chưa hợp lệ.";
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, slugs: rows.map((p) => p.slug) }),
      });
      if (!res.ok) throw new Error("bad-status");
      setStatus("success");
      clear();
    } catch {
      setStatus("error");
    }
  }

  if (!ready) {
    return <p className="text-[13px] text-text-secondary">Đang tải danh sách…</p>;
  }

  if (status === "success") {
    return (
      <div className="border border-jade-pale bg-white px-8 py-14 text-center">
        <p className="font-heading text-2xl italic text-jade-deep">
          Yêu cầu đặt giữ đã được gửi.
        </p>
        <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-text-secondary">
          MJADE sẽ liên hệ xác nhận trong thời gian sớm nhất. Sản phẩm chỉ được giữ chính thức
          sau khi hai bên xác nhận qua điện thoại hoặc tin nhắn.
        </p>
        <div className="mt-7 flex justify-center">
          <EditorialButton href="/bo-suu-tap">Tiếp tục xem bộ sưu tập</EditorialButton>
        </div>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="border border-dashed border-border bg-background-warm px-6 py-16 text-center">
        <p className="font-heading text-2xl italic text-text-primary">
          Danh sách đặt giữ đang trống.
        </p>
        <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-text-secondary">
          Khi tìm thấy món ngọc ưng ý, bạn có thể thêm vào đây để gửi yêu cầu đặt giữ —
          MJADE sẽ xác nhận và giữ sản phẩm cho bạn.
        </p>
        <div className="mt-7 flex justify-center">
          <EditorialButton href="/bo-suu-tap">Khám phá bộ sưu tập</EditorialButton>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]">
      <ul className="flex flex-col divide-y divide-border border-y border-border">
        {rows.map((p) => (
          <li key={p.slug} className="flex gap-5 py-5">
            <Link href={`/san-pham/${p.slug}`} className="relative block h-28 w-24 flex-none overflow-hidden bg-background-warm">
              <Image src={p.thumbnail} alt={p.imageAlt} fill sizes="96px" className="object-cover" />
            </Link>
            <div className="flex flex-1 flex-col gap-1">
              <Link
                href={`/san-pham/${p.slug}`}
                className="text-[14px] font-medium text-text-primary hover:text-jade-deep"
              >
                {p.name}
              </Link>
              <p className="text-[12px] uppercase tracking-[0.08em] text-text-secondary">
                {p.productCode}
              </p>
              <p className="text-[13px] text-accent-warm">{formatPrice(p)}</p>
              <AvailabilityBadge availability={p.availability} />
            </div>
            <button
              type="button"
              onClick={() => remove(p.slug)}
              aria-label={`Bỏ ${p.name} khỏi danh sách`}
              className="self-start p-1 text-text-secondary transition-colors hover:text-text-primary"
            >
              <X size={18} strokeWidth={1.4} />
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} noValidate className="flex h-fit flex-col gap-5 border border-border bg-background-warm px-6 py-7">
        <div>
          <p className="font-heading text-[22px] text-text-primary">Gửi yêu cầu đặt giữ</p>
          <p className="mt-2 text-[13px] leading-relaxed text-text-secondary">
            Chưa phải thanh toán. MJADE sẽ liên hệ xác nhận, tư vấn và thống nhất phương thức
            phù hợp — kể cả với đơn quốc tế.
          </p>
        </div>

        <div>
          <label htmlFor="rv-name" className={labelCls}>
            Họ và tên *
          </label>
          <input id="rv-name" name="name" type="text" required autoComplete="name" className={inputCls} />
          {fieldErrors.name && (
            <p role="alert" className="mt-1 text-[12px] text-red-800">
              {fieldErrors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="rv-phone" className={labelCls}>
            Số điện thoại *
          </label>
          <input id="rv-phone" name="phone" type="tel" required autoComplete="tel" className={inputCls} />
          {fieldErrors.phone && (
            <p role="alert" className="mt-1 text-[12px] text-red-800">
              {fieldErrors.phone}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="rv-email" className={labelCls}>
            Email
          </label>
          <input id="rv-email" name="email" type="email" autoComplete="email" className={inputCls} />
        </div>
        <div>
          <label htmlFor="rv-note" className={labelCls}>
            Ghi chú
          </label>
          <textarea id="rv-note" name="note" rows={3} className={inputCls} placeholder="Thời gian muốn được liên hệ, quốc gia nhận hàng…" />
        </div>

        {status === "error" && (
          <p role="alert" className="text-[13px] text-red-800">
            Gửi chưa thành công. Vui lòng thử lại.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="group inline-flex items-center justify-center gap-3 border border-jade-deep bg-jade-deep px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-text-primary disabled:opacity-60"
        >
          {status === "loading" ? (
            <>
              Đang gửi
              <LoaderCircle size={14} strokeWidth={1.5} className="animate-spin" />
            </>
          ) : (
            <>
              Gửi yêu cầu đặt giữ
              <ArrowRight size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </button>
        <p className="text-[12px] leading-relaxed text-text-secondary">
          Thông tin chỉ dùng để xác nhận yêu cầu này, không chia sẻ cho bên thứ ba.
        </p>
      </form>
    </div>
  );
}
