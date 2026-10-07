import { NextResponse } from "next/server";

/**
 * Chế độ bảo trì toàn site. Bật bằng biến môi trường MAINTENANCE_MODE=1 trên Vercel.
 * Khi bật, MỌI trang (gồm cả /admin, /api) trả về trang "Đang bảo trì" (HTTP 503).
 * Tắt bảo trì: xoá biến MAINTENANCE_MODE (hoặc đặt khác "1") rồi deploy lại.
 *
 * Next 16: dùng file convention `proxy` (thay cho `middleware` đã deprecated).
 */
export const config = {
  // Chặn mọi đường dẫn trừ tài nguyên nội bộ của Next và favicon.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

const PAGE = `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<title>MJADE — Đang bảo trì</title>
<style>
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  html, body { height: 100%; margin: 0; }
  body {
    display: flex; align-items: center; justify-content: center;
    background: #f7f5ee; color: #2e332d;
    font-family: Georgia, "Times New Roman", serif;
    padding: 24px; text-align: center;
  }
  .card { max-width: 520px; }
  .eyebrow {
    font-family: -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase;
    color: #6f736c; margin: 0 0 20px;
  }
  .brand { font-size: 44px; letter-spacing: 0.1em; margin: 0 0 24px; color: #3e5a46; }
  h1 { font-size: 24px; font-weight: 400; line-height: 1.35; margin: 0 0 14px; }
  p { font-family: -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 14px; line-height: 1.7; color: #6f736c; margin: 0 0 8px; }
  .rule { width: 48px; height: 1px; background: #c7b28e; margin: 28px auto; border: 0; }
</style>
</head>
<body>
  <div class="card">
    <p class="eyebrow">The 1st Mystic Jade</p>
    <div class="brand">MJADE</div>
    <h1>Website đang được bảo trì &amp; nâng cấp</h1>
    <hr class="rule" />
    <p>Chúng tôi sẽ sớm quay lại để phục vụ bạn.</p>
    <p>We are polishing something beautiful. Please check back soon.</p>
  </div>
</body>
</html>`;

export function proxy() {
  if (process.env.MAINTENANCE_MODE === "1") {
    return new NextResponse(PAGE, {
      status: 503,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-store",
        "retry-after": "3600",
      },
    });
  }
  return NextResponse.next();
}
