import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import ProductCard from "@/components/home/ProductCard";
import ServicePanel from "@/components/home/ServicePanel";
import { featuredProducts } from "@/data/products";

export default function FeaturedCollection() {
  return (
    <section className="bg-white px-5 py-12 md:px-10 md:py-16 lg:px-[72px] lg:py-20">
      <div className="mx-auto max-w-content">
        <Reveal>
          <SectionLabel>Bộ sưu tập nổi bật</SectionLabel>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-5 lg:gap-6">
          {featuredProducts.map((product, index) => (
            <Reveal key={product.id} delay={index * 80}>
              <ProductCard product={product} />
            </Reveal>
          ))}
          <Reveal delay={featuredProducts.length * 80} className="col-span-2 lg:col-span-1">
            <ServicePanel />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
