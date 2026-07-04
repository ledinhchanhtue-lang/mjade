import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/data/faq";

export default function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item) => (
        <details key={item.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[15px] font-medium text-text-primary marker:content-none [&::-webkit-details-marker]:hidden">
            {item.q}
            <ChevronDown
              size={18}
              strokeWidth={1.4}
              className="mt-0.5 flex-none text-jade-deep transition-transform duration-300 group-open:rotate-180"
            />
          </summary>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-text-secondary">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
