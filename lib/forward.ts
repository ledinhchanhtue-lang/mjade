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

/**
 * Gửi đơn hàng về email MJADE qua Web3Forms (miễn phí, không cần backend mail).
 * Cần biến môi trường WEB3FORMS_KEY (access key gắn với hòm mail nhận đơn).
 * Chưa có key thì ghi log server để không mất đơn.
 */
export async function sendOrderEmail(fields: {
  name: string;
  phone: string;
  email?: string;
  address?: string;
  note?: string;
  payment?: string;
  to?: string;
  items: { name: string; code: string; price: string }[];
}): Promise<{ sent: boolean }> {
  const key = process.env.WEB3FORMS_KEY;
  const message = [
    fields.to ? `Đơn gửi tới: ${fields.to}` : null,
    `Khách hàng: ${fields.name}`,
    `Số điện thoại: ${fields.phone}`,
    fields.email ? `Email: ${fields.email}` : null,
    fields.address ? `Địa chỉ nhận hàng: ${fields.address}` : null,
    fields.payment ? `Hình thức thanh toán: ${fields.payment}` : null,
    fields.note ? `Ghi chú: ${fields.note}` : null,
    "",
    "Sản phẩm đặt mua:",
    ...fields.items.map((it, i) => `${i + 1}. ${it.name} (${it.code}) — ${it.price}`),
  ]
    .filter(Boolean)
    .join("\n");

  if (!key) {
    console.log("[MJADE:order]", message);
    return { sent: false };
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: key,
        subject: `Đơn hàng mới từ website MJADE — ${fields.name}`,
        from_name: "MJADE Website",
        replyto: fields.email || undefined,
        message,
      }),
    });
    if (!res.ok) {
      console.error(`[MJADE:order] web3forms responded ${res.status}`);
      console.log("[MJADE:order]", message);
      return { sent: false };
    }
    return { sent: true };
  } catch (err) {
    console.error("[MJADE:order] web3forms error", err);
    console.log("[MJADE:order]", message);
    return { sent: false };
  }
}

export function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
}

export function isValidPhone(v: string): boolean {
  return /^[+\d][\d\s().-]{6,19}$/.test(v.trim());
}
