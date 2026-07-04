import { NextResponse } from "next/server";
import { forwardToWebhook, isValidEmail } from "@/lib/forward";

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid-json" }, { status: 400 });
  }

  const email = String(data.email ?? "").trim();
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "email" }, { status: 400 });
  }

  await forwardToWebhook(process.env.NEWSLETTER_WEBHOOK_URL, "newsletter", { email });

  return NextResponse.json({ ok: true });
}
