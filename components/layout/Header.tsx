"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, User, ShoppingBag, Menu, ChevronDown } from "lucide-react";
import { navigation } from "@/data/navigation";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        scrolled
          ? "border-border bg-background/95 backdrop-blur-sm"
          : "border-border/70 bg-background"
      }`}
    >
      <div className="mx-auto flex max-w-page items-center justify-between px-5 py-4 md:px-10 lg:px-[72px]">
        <div className="flex flex-1 items-center gap-6">
          <button
            type="button"
            aria-label="Tìm kiếm sản phẩm"
            className="hidden text-text-primary transition-colors hover:text-jade-deep md:inline-flex"
          >
            <Search size={19} strokeWidth={1.4} />
          </button>
          <button
            type="button"
            aria-label="Mở menu"
            onClick={() => setMobileOpen(true)}
            className="inline-flex text-text-primary md:hidden"
          >
            <Menu size={24} strokeWidth={1.4} />
          </button>
        </div>

        <Link
          href="/"
          className="flex-none font-heading text-[26px] tracking-[0.08em] text-text-primary md:text-[32px] lg:text-[40px]"
          aria-label="MJADE — Trang chủ"
        >
          MJADE
        </Link>

        <div className="flex flex-1 items-center justify-end gap-5 md:gap-6">
          <button
            type="button"
            className="hidden items-center gap-1 text-[11px] font-medium uppercase tracking-[0.1em] text-text-primary transition-colors hover:text-jade-deep md:inline-flex"
          >
            VND đ
            <span className="text-text-secondary">|</span>
            VI
            <ChevronDown size={12} strokeWidth={1.4} />
          </button>
          <button
            type="button"
            aria-label="Tài khoản"
            className="hidden text-text-primary transition-colors hover:text-jade-deep md:inline-flex"
          >
            <User size={19} strokeWidth={1.4} />
          </button>
          <button
            type="button"
            aria-label="Giỏ hàng"
            className="inline-flex text-text-primary transition-colors hover:text-jade-deep"
          >
            <ShoppingBag size={19} strokeWidth={1.4} />
          </button>
        </div>
      </div>

      <nav
        aria-label="Điều hướng chính"
        className="hidden border-t border-border/60 md:block"
      >
        <ul className="mx-auto flex max-w-page items-center justify-center gap-9 px-10 py-3.5 lg:gap-10">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-[11px] font-medium uppercase tracking-[0.12em] text-text-primary transition-colors hover:text-jade-deep"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
