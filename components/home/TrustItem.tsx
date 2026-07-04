import { Gem, HandCoins, BadgeCheck, BookOpen, Sparkles } from "lucide-react";
import type { TrustPoint } from "@/data/services";

const icons = {
  gem: Gem,
  handshake: HandCoins,
  badge: BadgeCheck,
  book: BookOpen,
  sparkles: Sparkles,
};

export default function TrustItem({ title, icon }: TrustPoint) {
  const Icon = icons[icon];

  return (
    <div className="flex flex-col items-start gap-3">
      <Icon size={22} strokeWidth={1.3} className="text-jade-deep" />
      <p className="whitespace-pre-line text-[12px] leading-snug text-text-secondary">
        {title}
      </p>
    </div>
  );
}
