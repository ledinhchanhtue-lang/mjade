import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { footerColumns } from "@/data/footer";
import Newsletter from "@/components/home/Newsletter";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-page px-5 py-12 md:px-10 md:py-16 lg:px-[72px] lg:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          <div className="lg:col-span-1">
            <Newsletter />
          </div>

          {footerColumns.map((column) => (
            <details
              key={column.title}
              open
              className="group border-b border-border py-4 md:border-none md:py-0"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between text-[12px] font-medium uppercase tracking-[0.12em] text-text-primary marker:content-none md:cursor-default md:pointer-events-none [&::-webkit-details-marker]:hidden">
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
                      className="text-[13px] text-text-secondary transition-colors hover:text-jade-deep"
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
              src="/images/brand/mjade-logo.png"
              alt="MJADE — Đệ nhất ngọc phỉ thúy Myanmar"
              width={760}
              height={743}
              className="h-[88px] w-auto"
            />
            <p className="mt-4 text-[13px] leading-relaxed text-text-secondary">
              Đánh thức viên ngọc trong bạn.
              <br />
              Meet your Inner Jade.
            </p>
            <p className="mt-6 text-[12px] text-text-secondary">
              © 2026 MJADE. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
