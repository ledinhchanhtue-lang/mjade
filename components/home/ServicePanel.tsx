import { UserRound, ShieldCheck } from "lucide-react";
import EditorialButton from "@/components/ui/EditorialButton";
import { servicePanels } from "@/data/services";

const icons = {
  user: UserRound,
  shield: ShieldCheck,
};

export default function ServicePanel() {
  return (
    <div className="flex flex-col divide-y divide-border bg-background-warm sm:col-span-2 lg:col-span-1 lg:divide-y">
      {servicePanels.map((panel) => {
        const Icon = icons[panel.icon];
        return (
          <div key={panel.title} className="flex flex-1 flex-col gap-3 px-6 py-8">
            <Icon size={22} strokeWidth={1.3} className="text-jade-deep" />
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-primary">
              {panel.title}
            </p>
            <p className="text-[13px] leading-relaxed text-text-secondary">
              {panel.description}
            </p>
            <EditorialButton href={panel.href} variant="text" className="mt-1">
              {panel.linkLabel}
            </EditorialButton>
          </div>
        );
      })}
    </div>
  );
}
