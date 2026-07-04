"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X, Search, ShoppingBag, ArrowRight } from "lucide-react";
import { navigation } from "@/data/navigation";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;

    firstLinkRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 md:hidden ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-text-primary/30 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu điều hướng"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[380px] flex-col overflow-y-auto bg-white transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <span className="font-heading text-2xl tracking-wide text-text-primary">MJADE</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng menu"
            className="flex min-h-11 min-w-11 items-center justify-center text-text-primary"
          >
            <X size={22} strokeWidth={1.4} />
          </button>
        </div>

        <nav aria-label="Điều hướng chính" className="flex flex-col px-6 py-4">
          {navigation.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              ref={index === 0 ? firstLinkRef : undefined}
              onClick={onClose}
              className="border-b border-border/70 py-4 text-[13px] font-medium uppercase tracking-[0.12em] text-text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-4 px-6 py-4">
          <Link
            href="/tim-kiem"
            onClick={onClose}
            className="flex items-center gap-3 text-[13px] text-text-primary"
          >
            <Search size={18} strokeWidth={1.4} />
            Tìm kiếm sản phẩm
          </Link>
          <Link
            href="/gio-hang"
            onClick={onClose}
            className="flex items-center gap-3 text-[13px] text-text-primary"
          >
            <ShoppingBag size={18} strokeWidth={1.4} />
            Danh sách đặt giữ
          </Link>
        </div>

        <div className="mt-auto px-6 pb-8 pt-4">
          <Link
            href="/lien-he-tu-van"
            onClick={onClose}
            className="group flex items-center justify-center gap-3 border border-jade-deep bg-jade-deep px-6 py-4 text-[11px] font-medium uppercase tracking-[0.14em] text-white"
          >
            Đặt lịch tư vấn riêng
            <ArrowRight size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
