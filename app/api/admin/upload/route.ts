import { NextResponse } from "next/server";
import sharp from "sharp";
import { isAuthed } from "@/lib/admin-auth";
import { isSafeImagePath, writeImage } from "@/lib/admin-store";

/** Upload ảnh: tự resize + nén WebP rồi commit vào public/images/... */
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
  const target = String(form.get("path") ?? "");
  const width = Number(form.get("width") ?? 0) || undefined;
  const height = Number(form.get("height") ?? 0) || undefined;
  const fitRaw = String(form.get("fit") ?? "cover");
  const fit = fitRaw === "inside" ? "inside" : "cover";

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Chưa chọn ảnh." }, { status: 400 });
  }
  if (file.size > 12 * 1024 * 1024) {
    return NextResponse.json({ error: "Ảnh quá lớn (giới hạn 12MB)." }, { status: 400 });
  }
  if (!isSafeImagePath(target)) {
    return NextResponse.json(
      { error: "Đường dẫn ảnh không hợp lệ (phải trong public/images/, đuôi webp/png/jpg)." },
      { status: 400 }
    );
  }

  try {
    const input = Buffer.from(await file.arrayBuffer());
    let img = sharp(input).rotate();
    if (width || height) {
      img = img.resize({ width, height, fit, withoutEnlargement: fit === "inside" });
    }
    const out = target.endsWith(".png")
      ? await img.png({ compressionLevel: 9 }).toBuffer()
      : target.endsWith(".jpg") || target.endsWith(".jpeg")
        ? await img.jpeg({ quality: 86 }).toBuffer()
        : await img.webp({ quality: 84 }).toBuffer();

    const meta = await sharp(out).metadata();
    const res = await writeImage(target, out, `content(admin): cập nhật ảnh ${target}`);
    return NextResponse.json({
      ok: true,
      path: "/" + target.replace(/^public\//, ""),
      bytes: out.length,
      width: meta.width,
      height: meta.height,
      ...res,
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Xử lý ảnh thất bại." },
      { status: 500 }
    );
  }
}
