"use client";

import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";

/**
 * Giao diện tra cứu chứng thư. Backend tra cứu chưa được kết nối —
 * form trả về trạng thái hướng dẫn thay vì kết quả giả.
 */
export default function CertLookup() {
  const [submitted, setSubmitted] = useState<{ code: string } | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const code = String(fd.get("code") ?? "").trim();
    if (!code) return;
    setSubmitted({ code });
  }

  return (
    <div className="border border-border bg-background-warm px-6 py-7">
      <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-primary">
        Tra cứu theo mã sản phẩm
      </p>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="cert-code" className="sr-only">
          Mã sản phẩm
        </label>
        <input
          id="cert-code"
          name="code"
          type="text"
          placeholder="Ví dụ: MJ-P001"
          className="w-full border border-border bg-white px-4 py-3 text-[13px] text-text-primary placeholder:text-text-secondary/70 focus:border-jade-deep focus:outline-none"
        />
        <label htmlFor="cert-number" className="sr-only">
          Số chứng thư (tùy chọn)
        </label>
        <input
          id="cert-number"
          name="certNumber"
          type="text"
          placeholder="Số chứng thư (nếu có)"
          className="w-full border border-border bg-white px-4 py-3 text-[13px] text-text-primary placeholder:text-text-secondary/70 focus:border-jade-deep focus:outline-none"
        />
        <button
          type="submit"
          className="inline-flex shrink-0 items-center justify-center gap-2 border border-jade-deep bg-jade-deep px-6 py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-text-primary"
        >
          <Search size={14} strokeWidth={1.5} />
          Tra cứu
        </button>
      </form>

      <p aria-live="polite" className="mt-4 text-[13px] leading-relaxed text-text-secondary">
        {submitted
          ? `Hệ thống tra cứu trực tuyến đang được hoàn thiện. Vui lòng gửi mã "${submitted.code}" qua email hoặc kênh tư vấn — MJADE sẽ đối chiếu và phản hồi chứng thư tương ứng trong vòng 24 giờ.`
          : "Mỗi sản phẩm MJADE có mã riêng in trên thẻ sản phẩm và hóa đơn. Nhập mã để đối chiếu với chứng thư kiểm định tương ứng."}
      </p>
    </div>
  );
}
