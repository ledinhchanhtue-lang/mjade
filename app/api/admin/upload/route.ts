import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin-auth";
import { isSafeImagePath, writeImage } from "@/lib/admin-store";

/** Node runtime; cho phép chạy lâu hơn khi commit ảnh lên GitHub. */
export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Upload ảnh: lưu thẳng file gốc vào public/images/... (không xử lý server-side).
 * Việc tối ưu kích thước/định dạng do Next/Image (Vercel) đảm nhiệm khi hiển thị,
 * nên không cần thư viện native (sharp) — tránh lỗi 500 trên serverless.
 */
const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/pjpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Dữ liệu upload không hợp lệ." }, { status: 400 });
  }

  const file = form.get("file");
  const requested = String(form.get("path") ?? "");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Chưa chọn ảnh." }, { status: 400 });
  }
  if (file.size > 12 * 1024 * 1024) {
    return NextResponse.json({ error: "Ảnh quá lớn (giới hạn 12MB)." }, { status: 400 });
  }

  // Đuôi file theo loại thật; nếu không nhận diện được thì lấy theo đường dẫn yêu cầu.
  const ext =
    EXT_BY_TYPE[file.type] ??
    requested.match(/\.(webp|png|jpe?g)$/i)?.[1]?.toLowerCase().replace("jpeg", "jpg");
  if (!ext) {
    return NextResponse.json(
      { error: "Định dạng ảnh không hỗ trợ (dùng JPG, PNG hoặc WEBP)." },
      { status: 400 }
    );
  }

  // Ép đuôi của đường dẫn đích khớp loại file thật (tránh lưu JPG dưới tên .webp).
  const target = requested.replace(/\.[^.]+$/, "." + ext);
  if (!isSafeImagePath(target)) {
    return NextResponse.json(
      { error: "Đường dẫn ảnh không hợp lệ (phải trong public/images/, đuôi webp/png/jpg)." },
      { status: 400 }
    );
  }

  try {
    const buf = Buffer.from(await file.arrayBuffer());
    const res = await writeImage(target, buf, `content(admin): cập nhật ảnh ${target}`);
    return NextResponse.json({
      ok: true,
      path: "/" + target.replace(/^public\//, ""),
      bytes: buf.length,
      ...res,
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Lưu ảnh thất bại." },
      { status: 500 }
    );
  }
}
