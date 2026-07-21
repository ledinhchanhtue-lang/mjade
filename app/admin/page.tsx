import type { Metadata } from "next";
import { adminConfigured, isAuthed } from "@/lib/admin-auth";
import { githubConfigured } from "@/lib/github";
import AdminApp from "@/components/admin/AdminApp";
import AdminLogin from "@/components/admin/AdminLogin";

export const metadata: Metadata = {
  title: "Quản trị nội dung | MJADE",
  robots: { index: false, follow: false },
};

/** Luôn render động để đọc cookie phiên đăng nhập. */
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!adminConfigured()) {
    return (
      <div className="mx-auto max-w-xl px-5 py-20">
        <h1 className="font-heading text-[26px] text-text-primary">Chưa bật trang quản trị</h1>
        <p className="mt-3 text-[13px] leading-relaxed text-text-secondary">
          Để dùng trang này, cần đặt biến môi trường <code>ADMIN_PASSWORD</code> trên Vercel
          (Settings → Environment Variables) rồi deploy lại. Xem hướng dẫn chi tiết trong file{" "}
          <code>ADMIN-GUIDE.md</code> của dự án.
        </p>
      </div>
    );
  }

  if (!(await isAuthed())) return <AdminLogin />;

  return <AdminApp githubReady={githubConfigured()} />;
}
