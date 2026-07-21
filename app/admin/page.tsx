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
    const envUrl = "https://vercel.com/tuele-s-projects/mjade/settings/environment-variables";
    return (
      <div className="mx-auto max-w-2xl px-5 py-16">
        <h1 className="font-heading text-[28px] text-text-primary">Bật trang quản trị</h1>
        <p className="mt-3 text-[14px] leading-relaxed text-text-secondary">
          Trang quản trị đã sẵn sàng. Chỉ còn một bước cuối mà vì lý do bảo mật phải do chính
          bạn làm: <strong className="text-text-primary">đặt mật khẩu đăng nhập</strong>. Mật khẩu
          được cất ở phần cài đặt của Vercel thay vì trong mã nguồn — vì mã nguồn của website
          đang công khai trên GitHub, ai cũng đọc được.
        </p>

        <ol className="mt-7 flex flex-col gap-5">
          <li className="border-l-2 border-jade-deep pl-4">
            <p className="text-[14px] font-medium text-text-primary">1. Mở trang cài đặt</p>
            <a
              href={envUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-[13px] text-jade-deep underline underline-offset-4"
            >
              Bấm vào đây để mở Environment Variables của project mjade →
            </a>
          </li>
          <li className="border-l-2 border-border pl-4">
            <p className="text-[14px] font-medium text-text-primary">2. Thêm mật khẩu</p>
            <p className="mt-1 text-[13px] leading-relaxed text-text-secondary">
              Key: <code className="bg-background-warm px-1">ADMIN_PASSWORD</code> · Value:
              mật khẩu bạn tự chọn · tick cả Production, Preview, Development · bấm <em>Save</em>.
            </p>
          </li>
          <li className="border-l-2 border-border pl-4">
            <p className="text-[14px] font-medium text-text-primary">3. Deploy lại</p>
            <p className="mt-1 text-[13px] leading-relaxed text-text-secondary">
              Tab <em>Deployments</em> → deploy trên cùng → nút <strong>⋯</strong> →{" "}
              <em>Redeploy</em>. Chờ ~1 phút rồi tải lại trang này.
            </p>
          </li>
        </ol>

        <p className="mt-8 border-t border-border pt-5 text-[13px] leading-relaxed text-text-secondary">
          Muốn <strong className="text-text-primary">lưu được thay đổi</strong> ra website, thêm
          tiếp 3 biến: <code>GITHUB_TOKEN</code>, <code>GITHUB_REPO</code>,{" "}
          <code>GITHUB_BRANCH</code>. Hướng dẫn tạo token có trong file{" "}
          <code>ADMIN-GUIDE.md</code>. Nếu chỉ đặt mật khẩu, bạn vẫn vào xem và thử giao diện
          được, nhưng bấm Lưu sẽ báo lỗi.
        </p>
      </div>
    );
  }

  if (!(await isAuthed())) return <AdminLogin />;

  return <AdminApp githubReady={githubConfigured()} />;
}
