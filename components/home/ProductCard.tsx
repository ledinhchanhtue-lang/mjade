import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";
import AvailabilityBadge from "@/components/product/AvailabilityBadge";

type ProductCardProps = {
  product: Product;
  showAvailability?: boolean;
};

export default function ProductCard({ product, showAvailability = false }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col bg-background-warm">
      <Link
        href={`/san-pham/${product.slug}`}
        className="flex h-full flex-col"
        aria-label={product.name}
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src={product.thumbnail}
            alt={product.imageAlt}
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1.5 px-4 py-4">
          <h3 className="whitespace-pre-line text-[13px] leading-snug text-text-primary md:text-[14px]">
            {product.shortName}
          </h3>
          <p className="text-[13px] text-accent-warm">{formatPrice(product)}</p>
          {showAvailability ? <AvailabilityBadge availability={product.availability} /> : null}
        </div>
      </Link>
    </article>
  );
}
