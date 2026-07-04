import SectionLabel from "@/components/ui/SectionLabel";

type PageHeaderProps = {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  tone?: "plain" | "warm";
};

export default function PageHeader({ eyebrow, title, lead, tone = "plain" }: PageHeaderProps) {
  return (
    <header
      className={`px-5 py-14 md:px-10 md:py-20 lg:px-[72px] ${
        tone === "warm" ? "bg-background-warm" : "bg-background"
      }`}
    >
      <div className="mx-auto max-w-content">
        <SectionLabel>{eyebrow}</SectionLabel>
        <h1 className="mt-5 max-w-3xl font-heading text-[34px] leading-tight text-text-primary md:text-[44px] lg:text-[52px]">
          {title}
        </h1>
        {lead ? (
          <p className="mt-5 max-w-2xl text-[14px] leading-relaxed text-text-secondary md:text-[15px]">
            {lead}
          </p>
        ) : null}
      </div>
    </header>
  );
}
