"use client";

import { useRef, useState } from "react";

/**
 * Ô chọn/đổi ảnh. Khi upload, file được resize + nén WebP ở server và lưu với
 * TÊN MỚI (thêm hậu tố thời gian) để trình duyệt/Vercel không phục vụ ảnh cũ trong cache.
 */
export default function ImageField({
  label,
  value,
  onChange,
  width,
  height,
  hint,
}: {
  label: string;
  value: string;
  onChange: (path: string) => void;
  width?: number;
  height?: number;
  hint?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function upload(file: File) {
    setBusy(true);
    setErr(null);
    setMsg(null);
    try {
      // đặt tên file mới để tránh cache ảnh cũ
      const clean = (value || "/images/home/anh.webp").replace(/^\//, "");
      const dir = clean.slice(0, clean.lastIndexOf("/"));
      const base = clean.slice(clean.lastIndexOf("/") + 1).replace(/\.[^.]+$/, "");
      const stamp = Date.now().toString(36);
      const newPublicPath = `/${dir}/${base.replace(/-[a-z0-9]{6,}$/, "")}-${stamp}.webp`;

      const fd = new FormData();
      fd.append("file", file);
      fd.append("path", "public" + newPublicPath);
      if (width) fd.append("width", String(width));
      if (height) fd.append("height", String(height));

      const r = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const j = (await r.json()) as { path?: string; error?: string; width?: number; height?: number };
      if (!r.ok) throw new Error(j.error || "Upload thất bại");
      onChange(j.path!);
      setMsg(`Đã tải lên (${j.width}×${j.height}). Nhớ bấm "Lưu thay đổi".`);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload thất bại");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-text-secondary">
        {label}
      </span>
      <div className="flex items-start gap-3">
        <div className="relative h-24 w-24 flex-none overflow-hidden border border-border bg-background-warm">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : null}
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            disabled={busy}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void upload(f);
            }}
            className="text-[12px] text-text-secondary file:mr-3 file:border file:border-border file:bg-white file:px-3 file:py-1.5 file:text-[11px] file:uppercase file:tracking-[0.1em]"
          />
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full border border-border bg-white px-2 py-1 text-[11px] text-text-secondary"
          />
          {hint ? <span className="text-[11px] text-text-secondary">{hint}</span> : null}
          {busy ? <span className="text-[11px] text-jade-deep">Đang xử lý ảnh…</span> : null}
          {msg ? <span className="text-[11px] text-jade-deep">{msg}</span> : null}
          {err ? <span className="text-[11px] text-red-600">{err}</span> : null}
        </div>
      </div>
    </div>
  );
}
