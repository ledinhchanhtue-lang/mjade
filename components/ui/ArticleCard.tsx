import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/data/articles";

export default function ArticleCard({ article }: { article: Article }) {
  const dateLabel = new Date(article.date).toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="group flex h-full flex-col border border-border bg-white">
      <Link href={`/tin-tuc/${article.slug}`} className="flex h-full flex-col">
        {article.image ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-background-warm">
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="(min-width: 1024px) 30vw, 90vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
            />
          </div>
        ) : (
          <div className="flex aspect-[16/9] w-full items-center justify-center bg-background-warm">
            <span className="font-heading text-3xl italic text-jade-soft">MJADE</span>
          </div>
        )}
        <div className="flex flex-1 flex-col gap-2 px-5 py-5">
          <p className="text-[11px] uppercase tracking-[0.1em] text-text-secondary">
            {article.category === "cam-nang" ? "Cẩm nang ngọc" : "Tin tức"} · {dateLabel} ·{" "}
            {article.readingMinutes} phút đọc
          </p>
          <h3 className="font-heading text-[20px] leading-snug text-text-primary group-hover:text-jade-deep">
            {article.title}
          </h3>
          <p className="text-[13px] leading-relaxed text-text-secondary">{article.excerpt}</p>
        </div>
      </Link>
    </article>
  );
}
