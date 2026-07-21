import { cookies } from "next/headers";
import crypto from "node:crypto";

export const ADMIN_COOKIE = "mjade_admin";

/** Đã đặt mật khẩu admin chưa (env ADMIN_PASSWORD). */
export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

/** Giá trị cookie phiên — dẫn xuất từ mật khẩu, đổi mật khẩu là mọi phiên hết hiệu lực. */
export function sessionToken(): string {
  const pw = process.env.ADMIN_PASSWORD || "";
  return crypto.createHmac("sha256", pw).update("mjade-admin-session-v1").digest("hex");
}

/** So sánh mật khẩu an toàn trước tấn công đo thời gian. */
export function verifyPassword(input: string): boolean {
  const pw = process.env.ADMIN_PASSWORD || "";
  if (!pw) return false;
  const a = Buffer.from(String(input));
  const b = Buffer.from(pw);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/** Kiểm tra phiên đăng nhập hiện tại (dùng trong server component & API route). */
export async function isAuthed(): Promise<boolean> {
  if (!adminConfigured()) return false;
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === sessionToken();
}
