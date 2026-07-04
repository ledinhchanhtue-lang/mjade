type SectionLabelProps = {
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
};

export default function SectionLabel({
  children,
  tone = "dark",
  className = "",
}: SectionLabelProps) {
  return (
    <p
      className={`text-[11px] font-medium uppercase tracking-[0.14em] ${
        tone === "dark" ? "text-jade-deep" : "text-white"
      } ${className}`}
    >
      {children}
    </p>
  );
}
