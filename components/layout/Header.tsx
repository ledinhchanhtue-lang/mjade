"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Menu } from "lucide-react";
import { navigation } from "@/data/navigation";
import { site } from "@/data/site";
import { useCart } from "@/components/cart/CartProvider";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { count, ready } = useCart();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function isActive(href: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  const isJade = site.headerTheme === "jade";

  // Lớp màu theo tông header (kem mặc định / xanh ngọc).
  const headerBg = isJade
    ? scrolled
      ? "border-white/15 bg-jade-deep/95 backdrop-blur-sm"
      : "border-jade-deep bg-jade-deep"
    : scrolled
      ? "border-border bg-background/95 backdrop-blur-sm"
      : "border-border/70 bg-background";
  const iconLink = isJade
    ? "text-white/90 transition-colors hover:text-accent-warm"
    : "text-text-primary transition-colors hover:text-jade-deep";
  const brandText = isJade ? "text-white" : "text-text-primary";
  const navBorder = isJade ? "border-white/15" : "border-border/60";

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${headerBg}`}
    >
      <div className="mx-auto flex max-w-page items-center justify-between px-5 py-4 md:px-10 lg:px-[72px]">
        <div className="flex flex-1 items-center gap-6">
          <Link
            href="/tim-kiem"
            aria-label="Tìm kiếm sản phẩm"
            className={`hidden md:inline-flex ${iconLink}`}
          >
            <Search size={19} strokeWidth={1.4} />
          </Link>
          <button
            type="button"
            aria-label="Mở menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className={`inline-flex min-h-11 min-w-11 items-center justify-center md:hidden ${iconLink}`}
          >
            <Menu size={24} strokeWidth={1.4} />
          </button>
        </div>

        <Link
          href="/"
          className="flex flex-none items-center gap-2 md:gap-2.5"
          aria-label="MJADE — Trang chủ"
        >
          <Image
            src={site.logo.emblem}
            alt=""
            width={560}
            height={442}
            priority
            className="h-8 w-auto md:h-9 lg:h-10"
          />
          <span
            className={`font-heading text-[24px] tracking-[0.08em] md:text-[30px] lg:text-[38px] ${brandText}`}
          >
            MJADE
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-end gap-5 md:gap-6">
          <Link
            href="/lien-he-tu-van"
            className={`hidden text-[11px] font-medium uppercase tracking-[0.1em] lg:inline-flex ${iconLink}`}
          >
            Đặt lịch Khám Ngọc
          </Link>
          <Link
            href="/gio-hang"
            aria-label={`Danh sách đặt giữ${ready && count > 0 ? ` (${count} sản phẩm)` : ""}`}
            className={`relative inline-flex ${iconLink}`}
          >
            <ShoppingBag size={19} strokeWidth={1.4} />
            {ready && count > 0 ? (
              <span
                aria-hidden
                className={`absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-medium ${
                  isJade ? "bg-accent-warm text-jade-deep" : "bg-jade-deep text-white"
                }`}
              >
                {count}
              </span>
            ) : null}
          </Link>
        </div>
      </div>

      <nav aria-label="Điều hướng chính" className={`hidden border-t md:block ${navBorder}`}>
        <ul className="mx-auto flex max-w-page items-center justify-center gap-9 px-10 py-3.5 lg:gap-10">
          {navigation.map((item) => {
            const active = isActive(item.href);
            const navLink = isJade
              ? active
                ? "border-accent-warm text-white"
                : "border-transparent text-white/85 hover:text-accent-warm"
              : active
                ? "border-jade-deep text-jade-deep"
                : "border-transparent text-text-primary hover:text-jade-deep";
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`border-b pb-1 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors ${navLink}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
