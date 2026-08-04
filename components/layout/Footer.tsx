import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { footerColumns } from "@/data/footer";
import { site } from "@/data/site";
import Newsletter from "@/components/home/Newsletter";

export default function Footer() {
  const isJade = site.footerTheme === "jade";
  const footerBg = isJade
    ? "border-[#1b392d] bg-[#1b392d]"
    : "border-border bg-background";
  const titleColor = isJade ? "text-white" : "text-text-primary";
  const linkColor = isJade
    ? "text-white/70 hover:text-accent-warm"
    : "text-text-secondary hover:text-jade-deep";
  const detailBorder = isJade ? "border-white/15" : "border-border";
  const mutedText = isJade ? "text-white/70" : "text-text-secondary";

  return (
    <footer className={`border-t ${footerBg}`}>
      <div className="mx-auto max-w-page px-5 py-12 md:px-10 md:py-16 lg:px-[72px] lg:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          <div className="lg:col-span-1">
            <Newsletter variant={isJade ? "jade" : "light"} />
          </div>

          {footerColumns.map((column) => (
            <details
              key={column.title}
              open
              className={`group border-b py-4 md:border-none md:py-0 ${detailBorder}`}
            >
              <summary
                className={`flex cursor-pointer list-none items-center justify-between text-[12px] font-medium uppercase tracking-[0.12em] marker:content-none md:cursor-default md:pointer-events-none [&::-webkit-details-marker]:hidden ${titleColor}`}
              >
                {column.title}
                <ChevronDown
                  size={16}
                  strokeWidth={1.4}
                  className="transition-transform duration-300 group-open:rotate-180 md:hidden"
                />
              </summary>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={`text-[13px] transition-colors ${linkColor}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}

          <div className="lg:col-span-1">
            <Image
              src={site.logo.full}
              alt="MJADE — Đệ nhất ngọc phỉ thúy Myanmar"
              width={760}
              height={743}
              className="h-[88px] w-auto"
            />
            <p className={`mt-4 text-[13px] leading-relaxed ${mutedText}`}>
              Đánh thức viên ngọc trong bạn.
              <br />
              Meet your Inner Jade.
            </p>
            <p className={`mt-6 text-[12px] ${mutedText}`}>
              © 2026 MJADE. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
