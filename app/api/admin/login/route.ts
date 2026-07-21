import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminConfigured, sessionToken, verifyPassword } from "@/lib/admin-auth";

export async function POST(req: Request) {
  if (!adminConfigured()) {
    return NextResponse.json(
      { error: "Server chưa đặt biến môi trường ADMIN_PASSWORD." },
      { status: 503 }
    );
  }
  const body = (await req.json().catch(() => ({}))) as { password?: string };
  if (!verifyPassword(body.password ?? "")) {
    return NextResponse.json({ error: "Mật khẩu không đúng." }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 giờ
  });
  return res;
}
