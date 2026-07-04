import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  products,
  getProduct,
  formatPrice,
  categoryLabels,
  availabilityLabels,
} from "@/data/products";
import { site } from "@/data/site";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import EditorialButton from "@/components/ui/EditorialButton";
import SectionLabel from "@/components/ui/SectionLabel";
import AvailabilityBadge from "@/components/product/AvailabilityBadge";
import CertificateBlock from "@/components/product/CertificateBlock";
import AddToCartButton from "@/components/product/AddToCartButton";
import ProductCard from "@/components/home/ProductCard";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.seoTitle,
    description: product.seoDescription,
    alternates: { canonical: `${site.url}/san-pham/${product.slug}` },
    openGraph: {
      title: product.seoTitle,
      description: product.seoDescription,
      images: [{ url: product.thumbnail }],
    },
  };
}

const specRows: { label: string; get: (p: NonNullable<ReturnType<typeof getProduct>>) => string | null }[] = [
  { label: "Loại ngọc", get: (p) => p.jadeType },
  { label: "Xuất xứ", get: (p) => p.origin },
  { label: "Màu sắc", get: (p) => p.colorLabel },
  { label: "Độ trong", get: (p) => p.translucency },
  { label: "Kết cấu", get: (p) => p.texture },
  { label: "Kích thước", get: (p) => p.dimensions },
  { label: "Trọng lượng", get: (p) => p.weight },
  { label: "Chất liệu kim loại", get: (p) => p.metal },
];

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .concat(products.filter((p) => p.slug !== product.slug && p.category !== product.category))
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.productCode,
    image: `${site.url}${product.thumbnail}`,
    description: product.shortDescription,
    brand: { "@type": "Brand", name: "MJADE" },
    ...(product.priceVnd != null
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "VND",
            price: product.priceVnd,
            availability:
              product.availability === "da-ban"
                ? "https://schema.org/SoldOut"
                : "https://schema.org/InStock",
            url: `${site.url}/san-pham/${product.slug}`,
          },
        }
      : {}),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: site.url },
      { "@type": "ListItem", position: 2, name: "Bộ sưu tập", item: `${site.url}/bo-suu-tap` },
      { "@type": "ListItem", position: 3, name: product.name },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumbLd]) }}
      />
      <Breadcrumbs
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Bộ sưu tập", href: "/bo-suu-tap" },
          { label: product.shortName.replace("\n", " ") },
        ]}
      />

      <div className="mx-auto grid max-w-content grid-cols-1 gap-10 px-5 py-8 md:px-10 lg:grid-cols-2 lg:gap-14 lg:px-[72px] lg:py-12">
        {/* Gallery */}
        <div className="flex flex-col gap-4">
          {product.images.map((img, i) => (
            <div key={img} className="relative aspect-[4/5] w-full overflow-hidden bg-background-warm">
              <Image
                src={img}
                alt={`${product.imageAlt}${product.images.length > 1 ? ` — góc ${i + 1}` : ""}`}
                fill
                priority={i === 0}
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
          {product.imageIsTemporary ? (
            <p className="text-[11px] leading-relaxed text-text-secondary">
              Hình ảnh minh họa theo tông sản phẩm. Ảnh chụp thực tế của chính sản phẩm sẽ được
              gửi trong buổi tư vấn riêng.
            </p>
          ) : null}
        </div>

        {/* Info panel */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-[140px] lg:self-start">
          <div>
            <SectionLabel>{categoryLabels[product.category]}</SectionLabel>
            <h1 className="mt-3 font-heading text-[30px] leading-tight text-text-primary md:text-[36px]">
              {product.name}
            </h1>
            <div className="mt-4 flex flex-wrap items-baseline gap-4">
              <p className="text-[20px] text-accent-warm">{formatPrice(product)}</p>
              <AvailabilityBadge availability={product.availability} />
            </div>
            <p className="mt-2 text-[12px] uppercase tracking-[0.1em] text-text-secondary">
              Mã sản phẩm: {product.productCode}
            </p>
          </div>

          <p className="max-w-xl text-[14px] leading-relaxed text-text-secondary">
            {product.shortDescription}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <EditorialButton href={`/lien-he-tu-van?sp=${product.productCode}`}>
              Đặt lịch xem ngọc
            </EditorialButton>
            <EditorialButton href={`/lien-he-tu-van?sp=${product.productCode}`} variant="text" className="sm:self-center">
              Nhận tư vấn riêng
            </EditorialButton>
          </div>
          <AddToCartButton product={product} />

          {/* Specs — chỉ hiện khi có dữ liệu */}
          <dl className="divide-y divide-border border-y border-border">
            {specRows.map(({ label, get }) => {
              const value = get(product);
              if (!value) return null;
              return (
                <div key={label} className="flex justify-between gap-6 py-2.5 text-[13px]">
                  <dt className="text-text-secondary">{label}</dt>
                  <dd className="text-right text-text-primary">{value}</dd>
                </div>
              );
            })}
            <div className="flex justify-between gap-6 py-2.5 text-[13px]">
              <dt className="text-text-secondary">Tình trạng</dt>
              <dd className="text-right text-text-primary">
                {availabilityLabels[product.availability]}
              </dd>
            </div>
          </dl>

          <CertificateBlock product={product} />
        </div>
      </div>

      {/* Story */}
      <section className="bg-background-warm px-5 py-12 md:px-10 lg:px-[72px] lg:py-16">
        <div className="mx-auto grid max-w-content grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <SectionLabel>Câu chuyện của viên ngọc</SectionLabel>
            <h2 className="mt-4 font-heading text-[26px] leading-snug text-text-primary md:text-[32px]">
              {product.limited ? "Một thiết kế không lặp lại" : "Vì sao MJADE chọn viên ngọc này"}
            </h2>
            <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-text-secondary">
              {product.story}
            </p>
          </div>
          <div>
            <SectionLabel>Bảo quản &amp; đồng hành</SectionLabel>
            <ul className="mt-4 flex flex-col gap-2.5">
              {product.careInstructions.map((c) => (
                <li key={c} className="flex items-start gap-3 text-[14px] leading-relaxed text-text-secondary">
                  <span aria-hidden className="mt-[9px] h-px w-4 flex-none bg-jade-deep" />
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-xl text-[13px] leading-relaxed text-text-secondary">
              {product.shippingNotes}{" "}
              <Link href="/giao-hang-quoc-te" className="text-jade-deep underline-offset-4 hover:underline">
                Chi tiết giao hàng quốc tế
              </Link>
              {" · "}
              <Link href="/chinh-sach-doi-tra" className="text-jade-deep underline-offset-4 hover:underline">
                Chính sách đổi trả
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="px-5 py-12 md:px-10 lg:px-[72px] lg:py-16">
        <div className="mx-auto max-w-content">
          <SectionLabel>Có thể bạn cũng thích</SectionLabel>
          <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} showAvailability />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
