import Link from "next/link";

export type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Đường dẫn" className="px-5 pt-6 md:px-10 lg:px-[72px]">
      <ol className="mx-auto flex max-w-content flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.1em] text-text-secondary">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-jade-deep">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-text-primary">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
