"use client";

import { usePathname } from "next/navigation";

/** Ẩn header/footer của site khi đang ở trang quản trị /admin. */
export default function HideOnAdmin({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <>{children}</>;
}
