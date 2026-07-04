"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import { socialLinks } from "@/data/footer";

const socialIcons = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
};

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div>
      <p className="font-heading text-xl italic text-text-primary">Kết nối cùng MJADE</p>
      <p className="mt-3 text-[13px] leading-relaxed text-text-secondary">
        Nhận cập nhật bộ sưu tập mới, câu chuyện ngọc và ưu đãi đặc quyền.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 flex max-w-[320px]">
        <label htmlFor="newsletter-email" className="sr-only">
          Địa chỉ email
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          placeholder="Nhập email của bạn"
          className="w-full border border-border bg-white px-4 py-3 text-[13px] text-text-primary placeholder:text-text-secondary focus:border-jade-deep"
        />
        <button
          type="submit"
          aria-label="Đăng ký nhận tin"
          className="flex shrink-0 items-center justify-center border border-l-0 border-border bg-jade-deep px-4 text-white transition-colors hover:bg-text-primary"
        >
          <ArrowRight size={16} strokeWidth={1.5} />
        </button>
      </form>
      <p aria-live="polite" className="mt-2 min-h-[1em] text-[12px] text-jade-deep">
        {submitted ? "Cảm ơn bạn đã đăng ký." : ""}
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
