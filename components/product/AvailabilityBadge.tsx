import type { Availability } from "@/data/products";
import { availabilityLabels } from "@/data/products";

const tones: Record<Availability, string> = {
  "con-hang": "text-jade-deep",
  "chi-con-1": "text-accent-warm",
  "da-dat-truoc": "text-text-secondary",
  "da-ban": "text-text-secondary line-through",
  "lien-he": "text-jade-deep",
};

export default function AvailabilityBadge({ availability }: { availability: Availability }) {
  return (
    <span className={`text-[11px] font-medium uppercase tracking-[0.1em] ${tones[availability]}`}>
      {availabilityLabels[availability]}
    </span>
  );
}
