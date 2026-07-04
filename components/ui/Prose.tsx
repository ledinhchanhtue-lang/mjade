import type { PolicySection } from "@/data/policies";

/** Render một dãy section biên tập: heading + đoạn văn + bullet list mảnh */
export default function Prose({ sections }: { sections: PolicySection[] }) {
  return (
    <div className="flex flex-col gap-10">
      {sections.map((s) => (
        <section key={s.heading}>
          <h2 className="font-heading text-[22px] leading-snug text-text-primary md:text-[26px]">
            {s.heading}
          </h2>
          {s.body.filter(Boolean).map((p) => (
            <p key={p.slice(0, 40)} className="mt-3 max-w-2xl text-[14px] leading-relaxed text-text-secondary">
              {p}
            </p>
          ))}
          {s.list ? (
            <ul className="mt-4 flex max-w-2xl flex-col gap-2.5">
              {s.list.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[14px] leading-relaxed text-text-secondary">
                  <span aria-hidden className="mt-[9px] h-px w-4 flex-none bg-jade-deep" />
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </div>
  );
}
