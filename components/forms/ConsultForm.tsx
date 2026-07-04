"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { site } from "@/data/site";
import { products } from "@/data/products";

type Status = "idle" | "loading" | "success" | "error";

const inputCls =
  "w-full border border-border bg-white px-4 py-3 text-[14px] text-text-primary placeholder:text-text-secondary/70 focus:border-jade-deep focus:outline-none";
const labelCls = "mb-1.5 block text-[12px] font-medium uppercase tracking-[0.1em] text-text-primary";

export default function ConsultForm({ defaultInterest }: { defaultInterest?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const values = Object.fromEntries(fd.entries()) as Record<string, string>;

    const errors: Record<string, string> = {};
    if (!values.name || values.name.trim().length < 2) errors.name = "Vui lòng nhập họ và tên.";
    if (!values.phone || !/^[+\d][\d\s().-]{6,19}$/.test(values.phone.trim()))
      errors.phone = "Số điện thoại chưa hợp lệ.";
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      errors.email = "Email chưa hợp lệ.";
    if (!values.message || values.message.trim().length < 5)
      errors.message = "Vui lòng cho MJADE biết bạn cần tư vấn điều gì.";

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("bad-status");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-jade-pale bg-white px-8 py-12 text-center">
        <p className="font-heading text-2xl italic text-jade-deep">Cảm ơn bạn.</p>
        <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-text-secondary">
          MJADE đã nhận được thông tin và sẽ liên hệ với bạn trong khung giờ bạn chọn.
          Mọi trao đổi đều riêng tư và không ràng buộc mua hàng.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-[11px] font-medium uppercase tracking-[0.12em] text-jade-deep underline-offset-4 hover:underline"
        >
          Gửi thêm yêu cầu khác
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div>
        <label htmlFor="cf-name" className={labelCls}>
          Họ và tên *
        </label>
        <input id="cf-name" name="name" type="text" required autoComplete="name" className={inputCls} />
        {fieldErrors.name && (
          <p role="alert" className="mt-1 text-[12px] text-red-800">
            {fieldErrors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="cf-phone" className={labelCls}>
          Số điện thoại *
        </label>
        <input id="cf-phone" name="phone" type="tel" required autoComplete="tel" className={inputCls} />
        {fieldErrors.phone && (
          <p role="alert" className="mt-1 text-[12px] text-red-800">
            {fieldErrors.phone}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="cf-email" className={labelCls}>
          Email
        </label>
        <input id="cf-email" name="email" type="email" autoComplete="email" className={inputCls} />
        {fieldErrors.email && (
          <p role="alert" className="mt-1 text-[12px] text-red-800">
            {fieldErrors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="cf-country" className={labelCls}>
          Quốc gia / thành phố đang sinh sống
        </label>
        <input
          id="cf-country"
          name="country"
          type="text"
          placeholder="Ví dụ: TP.HCM, California, Sydney…"
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="cf-channel" className={labelCls}>
          Kênh liên hệ mong muốn
        </label>
        <select id="cf-channel" name="channel" className={inputCls} defaultValue={site.consultChannels[0]}>
          {site.consultChannels.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="cf-interest" className={labelCls}>
          Sản phẩm quan tâm
        </label>
        <select id="cf-interest" name="interest" className={inputCls} defaultValue={defaultInterest ?? ""}>
          <option value="">Chưa xác định — cần gợi ý</option>
          {products.map((p) => (
            <option key={p.slug} value={p.productCode}>
              {p.name} ({p.productCode})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="cf-budget" className={labelCls}>
          Khoảng ngân sách <span className="normal-case text-text-secondary">(tùy chọn)</span>
        </label>
        <select id="cf-budget" name="budget" className={inputCls} defaultValue="">
          <option value="">Không muốn tiết lộ</option>
          <option>Dưới 20 triệu</option>
          <option>20 – 50 triệu</option>
          <option>50 – 100 triệu</option>
          <option>Trên 100 triệu</option>
        </select>
      </div>

      <div>
        <label htmlFor="cf-occasion" className={labelCls}>
          Dịp sử dụng <span className="normal-case text-text-secondary">(tùy chọn)</span>
        </label>
        <input
          id="cf-occasion"
          name="occasion"
          type="text"
          placeholder="Tự thưởng, quà tặng mẹ, kỷ niệm…"
          className={inputCls}
        />
      </div>

      <div className="md:col-span-2">
        <label htmlFor="cf-time" className={labelCls}>
          Khung giờ thuận tiện để liên hệ
        </label>
        <select id="cf-time" name="contactTime" className={inputCls} defaultValue="Giờ hành chính (VN)">
          <option>Giờ hành chính (VN)</option>
          <option>Buổi tối 19h–21h (VN)</option>
          <option>Cuối tuần</option>
          <option>Theo múi giờ nước ngoài — ghi rõ ở phần nội dung</option>
        </select>
      </div>

      <div className="md:col-span-2">
        <label htmlFor="cf-message" className={labelCls}>
          Nội dung cần tư vấn *
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          required
          placeholder="Bạn đang tìm món ngọc thế nào? Cho ai? Điều gì quan trọng nhất với bạn?"
          className={inputCls}
        />
        {fieldErrors.message && (
          <p role="alert" className="mt-1 text-[12px] text-red-800">
            {fieldErrors.message}
          </p>
        )}
      </div>

      <div className="md:col-span-2">
        {status === "error" && (
          <p role="alert" className="mb-3 text-[13px] text-red-800">
            Gửi chưa thành công. Vui lòng thử lại, hoặc liên hệ trực tiếp qua email {site.email}.
          </p>
        )}
        <button
          type="submit"
          disabled={status === "loading"}
          className="group inline-flex items-center gap-3 border border-text-primary/70 bg-white px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.14em] text-text-primary transition-colors duration-300 hover:border-jade-deep hover:bg-jade-deep hover:text-white disabled:opacity-60"
        >
          {status === "loading" ? (
            <>
              Đang gửi
              <LoaderCircle size={14} strokeWidth={1.5} className="animate-spin" />
            </>
          ) : (
            <>
              Gửi yêu cầu tư vấn
              <ArrowRight
                size={14}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </>
          )}
        </button>
        <p className="mt-4 max-w-xl text-[12px] leading-relaxed text-text-secondary">
          Thông tin của bạn chỉ dùng để MJADE liên hệ tư vấn, không chia sẻ cho bên thứ ba
          và không dùng để gửi quảng cáo khi chưa có sự đồng ý.
        </p>
      </div>
    </form>
  );
}
