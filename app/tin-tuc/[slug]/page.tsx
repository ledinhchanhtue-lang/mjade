import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import EditorialButton from "@/components/ui/EditorialButton";
import SectionLabel from "@/components/ui/SectionLabel";
import { articles, getArticle } from "@/data/articles";
import { site } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} | MJADE`,
    description: article.excerpt,
    alternates: { canonical: `${site.url}/tin-tuc/${article.slug}` },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const dateLabel = new Date(article.date).toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { "@type": "Organization", name: "MJADE" },
    publisher: { "@type": "Organization", name: "MJADE" },
    ...(article.image ? { image: `${site.url}${article.image}` } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <Breadcrumbs
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Tin tức", href: "/tin-tuc" },
          { label: article.title },
        ]}
      />

      <article className="px-5 py-10 md:px-10 lg:px-[72px] lg:py-14">
        <div className="mx-auto max-w-2xl">
          <SectionLabel>
            {article.category === "cam-nang" ? "Cẩm nang ngọc" : "Tin tức"}
          </SectionLabel>
          <h1 className="mt-4 font-heading text-[30px] leading-tight text-text-primary md:text-[40px]">
            {article.title}
          </h1>
          <p className="mt-3 text-[12px] uppercase tracking-[0.1em] text-text-secondary">
            {dateLabel} · {article.readingMinutes} phút đọc
          </p>

          {article.image ? (
            <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden bg-background-warm">
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes="(min-width: 768px) 672px, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}

          <div className="mt-10 flex flex-col gap-10">
            {article.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="font-heading text-[22px] leading-snug text-text-primary md:text-[26px]">
                  {s.heading}
                </h2>
                {s.body.map((p) => (
                  <p key={p.slice(0, 40)} className="mt-3 text-[15px] leading-[1.8] text-text-secondary">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-5 border-t border-border pt-8">
            <EditorialButton href="/bo-suu-tap">Xem bộ sưu tập</EditorialButton>
            <EditorialButton href="/tin-tuc" variant="text">
              Đọc bài khác
            </EditorialButton>
          </div>
        </div>
      </article>
    </>
  );
}
