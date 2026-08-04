import { Gem, Store, BadgeCheck } from "lucide-react";
import type { TrustPoint } from "@/data/services";

const icons = {
  gem: Gem,
  store: Store,
  badge: BadgeCheck,
};

export default function TrustItem({
  title,
  icon,
  tone = "dark",
}: TrustPoint & { tone?: "dark" | "light" }) {
  const Icon = icons[icon];
  const light = tone === "light";

  return (
    <div className="flex flex-col items-start gap-3">
      <Icon
        size={22}
        strokeWidth={1.3}
        className={light ? "text-white" : "text-jade-deep"}
      />
      <p
        className={`whitespace-pre-line text-[12px] leading-snug ${
          light ? "text-white/85" : "text-text-secondary"
        }`}
      >
        {title}
      </p>
    </div>
  );
}
