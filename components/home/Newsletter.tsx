"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import { socialLinks } from "@/data/footer";

const socialIcons = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
};

type Status = "idle" | "loading" | "success" | "invalid" | "error";

export default function Newsletter() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setStatus("invalid");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("bad-status");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const feedback: Record<Status, string> = {
    idle: "",
    loading: "",
    success: "Cảm ơn bạn đã đăng ký. Hẹn gặp bạn trong bản tin gần nhất.",
    invalid: "Email chưa hợp lệ, vui lòng kiểm tra lại.",
    error: "Đăng ký chưa thành công, vui lòng thử lại sau.",
  };

  return (
    <div>
      <p className="font-heading text-xl italic text-text-primary">Kết nối cùng MJADE</p>
      <p className="mt-3 text-[13px] leading-relaxed text-text-secondary">
        Nhận cập nhật bộ sưu tập mới, câu chuyện ngọc và ưu đãi đặc quyền.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-5 flex max-w-[320px]">
        <label htmlFor="newsletter-email" className="sr-only">
          Địa chỉ email
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="Nhập email của bạn"
          className="w-full border border-border bg-white px-4 py-3 text-[13px] text-text-primary placeholder:text-text-secondary focus:border-jade-deep focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          aria-label="Đăng ký nhận tin"
          className="flex w-12 shrink-0 items-center justify-center border border-l-0 border-border bg-jade-deep text-white transition-colors hover:bg-text-primary disabled:opacity-70"
        >
          {status === "loading" ? (
            <LoaderCircle size={16} strokeWidth={1.5} className="animate-spin" />
          ) : (
            <ArrowRight size={16} strokeWidth={1.5} />
          )}
        </button>
      </form>
      <p
        aria-live="polite"
        className={`mt-2 min-h-[1.2em] text-[12px] ${
          status === "success" ? "text-jade-deep" : "text-red-800"
        }`}
      >
        {feedback[status]}
      </p>
      <p className="mt-1 text-[11px] leading-relaxed text-text-secondary">
        Email chỉ dùng để gửi bản tin MJADE, có thể hủy bất cứ lúc nào.
      </p>

      <div className="mt-6 flex items-center gap-4">
        {socialLinks.map((social) => {
          const Icon = socialIcons[social.icon];
          return (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-primary transition-colors hover:text-jade-deep"
            >
              <Icon size={18} strokeWidth={1.4} />
            </a>
          );
        })}
      </div>
    </div>
  );
}
