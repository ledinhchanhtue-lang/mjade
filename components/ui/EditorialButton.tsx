import Link from "next/link";
import { ArrowRight } from "lucide-react";

type EditorialButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "text";
  className?: string;
};

export default function EditorialButton({
  href,
  children,
  variant = "primary",
  className = "",
}: EditorialButtonProps) {
  if (variant === "text") {
    return (
      <Link
        href={href}
        className={`group inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-jade-deep transition-colors hover:text-accent-warm ${className}`}
      >
        {children}
        <ArrowRight
          size={14}
          strokeWidth={1.5}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 border border-text-primary/70 bg-white px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.14em] text-text-primary transition-colors duration-300 hover:border-jade-deep hover:bg-jade-deep hover:text-white ${className}`}
    >
      {children}
      <ArrowRight
        size={14}
        strokeWidth={1.5}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </Link>
  );
}
