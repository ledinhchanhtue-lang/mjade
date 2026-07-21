"use client";

import { useState } from "react";
import { Button, Field, Input } from "./ui";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      const r = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const j = (await r.json()) as { error?: string };
      if (!r.ok) throw new Error(j.error || "Đăng nhập thất bại");
      location.reload();
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Đăng nhập thất bại");
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-5">
      <h1 className="font-heading text-[28px] text-text-primary">Quản trị MJADE</h1>
      <p className="mt-2 text-[13px] text-text-secondary">
        Nhập mật khẩu quản trị để tiếp tục.
      </p>
      <form onSubmit={submit} className="mt-6 flex flex-col gap-4">
        <Field label="Mật khẩu">
          <Input
            type="password"
            value={password}
            autoFocus
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        {err ? <p className="text-[12px] text-red-600">{err}</p> : null}
        <Button type="submit" disabled={busy || !password}>
          {busy ? "Đang kiểm tra…" : "Đăng nhập"}
        </Button>
      </form>
    </div>
  );
}
