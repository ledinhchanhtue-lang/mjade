import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin-auth";
import { isContentFile, readContent, writeContent } from "@/lib/admin-store";

async function guard() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
  }
  return null;
}

export async function GET(req: Request) {
  const denied = await guard();
  if (denied) return denied;

  const file = new URL(req.url).searchParams.get("file") ?? "";
  if (!isContentFile(file)) {
    return NextResponse.json({ error: "Tên file không hợp lệ." }, { status: 400 });
  }
  try {
    return NextResponse.json({ file, data: await readContent(file) });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Không đọc được nội dung." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const denied = await guard();
  if (denied) return denied;

  const body = (await req.json().catch(() => ({}))) as {
    file?: string;
    data?: unknown;
    message?: string;
  };
  if (!body.file || !isContentFile(body.file)) {
    return NextResponse.json({ error: "Tên file không hợp lệ." }, { status: 400 });
  }
  if (body.data === undefined || body.data === null) {
    return NextResponse.json({ error: "Thiếu dữ liệu." }, { status: 400 });
  }
  try {
    const res = await writeContent(
      body.file,
      body.data,
      body.message || `content(admin): cập nhật ${body.file}`
    );
    return NextResponse.json({ ok: true, ...res });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Lưu thất bại." },
      { status: 500 }
    );
  }
}
