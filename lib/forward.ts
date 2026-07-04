/**
 * Chuyển tiếp dữ liệu form tới webhook cấu hình qua biến môi trường.
 * Trả về true nếu gửi thành công, false nếu chưa cấu hình hoặc lỗi.
 * Khi chưa có webhook, request vẫn được ghi log server để không mất liên hệ của khách.
 */
export async function forwardToWebhook(
  envUrl: string | undefined,
  kind: string,
  payload: Record<string, unknown>
): Promise<{ forwarded: boolean }> {
  const body = { kind, receivedAt: new Date().toISOString(), ...payload };

  if (!envUrl) {
    console.log(`[MJADE:${kind}]`, JSON.stringify(body));
    return { forwarded: false };
  }

  try {
    const res = await fetch(envUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.error(`[MJADE:${kind}] webhook responded ${res.status}`);
      console.log(`[MJADE:${kind}]`, JSON.stringify(body));
      return { forwarded: false };
    }
    return { forwarded: true };
  } catch (err) {
    console.error(`[MJADE:${kind}] webhook error`, err);
    console.log(`[MJADE:${kind}]`, JSON.stringify(body));
    return { forwarded: false };
  }
}

export function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
}

export function isValidPhone(v: string): boolean {
  return /^[+\d][\d\s().-]{6,19}$/.test(v.trim());
}
