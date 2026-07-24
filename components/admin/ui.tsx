"use client";

import type { ReactNode } from "react";

export const inputCls =
  "w-full border border-border bg-white px-3 py-2 text-[13px] text-text-primary focus:border-jade-deep focus:outline-none";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-text-secondary">
        {label}
      </span>
      {children}
      {hint ? <span className="text-[11px] text-text-secondary">{hint}</span> : null}
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputCls} ${props.className ?? ""}`} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`${inputCls} min-h-[90px] leading-relaxed ${props.className ?? ""}`}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${inputCls} ${props.className ?? ""}`} />;
}

export function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border border-border bg-white p-5">
      <h3 className="mb-4 font-heading text-[19px] text-text-primary">{title}</h3>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}

export function Button({
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "danger" }) {
  const base =
    "inline-flex items-center justify-center px-4 py-2 text-[12px] font-medium uppercase tracking-[0.1em] transition-colors disabled:opacity-50";
  const styles = {
    primary: "bg-jade-deep text-white hover:opacity-90",
    ghost: "border border-border text-text-primary hover:border-jade-deep hover:text-jade-deep",
    danger: "border border-red-300 text-red-700 hover:bg-red-50",
  }[variant];
  return <button {...props} className={`${base} ${styles} ${props.className ?? ""}`} />;
}

export function Row({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>;
}

export function Guide({ children }: { children: ReactNode }) {
  return (
    <div className="border-l-2 border-jade-light bg-background-warm px-4 py-3 text-[12px] leading-relaxed text-text-secondary">
      {children}
    </div>
  );
}
