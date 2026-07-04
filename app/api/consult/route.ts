import { NextResponse } from "next/server";
import { forwardToWebhook, isValidEmail, isValidPhone } from "@/lib/forward";

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid-json" }, { status: 400 });
  }

  const name = String(data.name ?? "").trim();
  const phone = String(data.phone ?? "").trim();
  const email = String(data.email ?? "").trim();
  const message = String(data.message ?? "").trim();

  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: "name" }, { status: 400 });
  }
  if (!isValidPhone(phone)) {
    return NextResponse.json({ ok: false, error: "phone" }, { status: 400 });
  }
  if (email && !isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "email" }, { status: 400 });
  }

  await forwardToWebhook(process.env.CONSULT_WEBHOOK_URL, "consult", {
    name,
    phone,
    email,
    country: String(data.country ?? "").trim(),
    channel: String(data.channel ?? "").trim(),
    interest: String(data.interest ?? "").trim(),
    budget: String(data.budget ?? "").trim(),
    occasion: String(data.occasion ?? "").trim(),
    contactTime: String(data.contactTime ?? "").trim(),
    message,
  });

  return NextResponse.json({ ok: true });
}
