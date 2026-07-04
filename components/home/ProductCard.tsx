import Image from "next/image";
import type { Product } from "@/data/products";

export default function ProductCard({ name, price, image, imageAlt }: Product) {
  return (
    <article className="group flex flex-col bg-background-warm">
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-col gap-1.5 px-4 py-4">
        <h3 className="whitespace-pre-line text-[13px] leading-snug text-text-primary md:text-[14px]">
          {name}
        </h3>
        <p className="text-[13px] text-accent-warm">{price}</p>
      </div>
    </article>
  );
}
