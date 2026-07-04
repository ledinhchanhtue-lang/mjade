import { NextResponse } from "next/server";
import { forwardToWebhook, isValidEmail, isValidPhone } from "@/lib/forward";
import { getProduct } from "@/data/products";

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
  const slugs = Array.isArray(data.slugs) ? data.slugs.map(String) : [];

  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: "name" }, { status: 400 });
  }
  if (!isValidPhone(phone)) {
    return NextResponse.json({ ok: false, error: "phone" }, { status: 400 });
  }
  if (email && !isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "email" }, { status: 400 });
  }
  if (slugs.length === 0) {
    return NextResponse.json({ ok: false, error: "empty" }, { status: 400 });
  }

  const items = slugs
    .map((s) => getProduct(s))
    .filter(Boolean)
    .map((p) => ({ slug: p!.slug, name: p!.name, code: p!.productCode }));

  if (items.length === 0) {
    return NextResponse.json({ ok: false, error: "unknown-products" }, { status: 400 });
  }

  await forwardToWebhook(process.env.RESERVE_WEBHOOK_URL, "reserve", {
    name,
    phone,
    email,
    note: String(data.note ?? "").trim(),
    items,
  });

  return NextResponse.json({ ok: true });
}
