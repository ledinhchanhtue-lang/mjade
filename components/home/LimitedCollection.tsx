import Image from "next/image";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import EditorialButton from "@/components/ui/EditorialButton";
import Reveal from "@/components/ui/Reveal";
import { limitedPieces } from "@/data/products";

export default function LimitedCollection() {
  return (
    <section className="bg-white px-5 py-12 md:px-10 lg:px-[72px] lg:py-20">
      <div className="mx-auto flex max-w-page flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
        <Reveal className="flex flex-col gap-5 lg:w-[36%]">
          <SectionLabel>Bộ sưu tập giới hạn</SectionLabel>
          <h2 className="font-heading text-[30px] leading-tight text-text-primary md:text-[36px] lg:text-[40px]">
            Hiếm có. Độc bản.
            <br />
            Dành riêng cho bạn.
          </h2>
          <div>
            <EditorialButton href="/bo-suu-tap-gioi-han">Xem bộ sưu tập</EditorialButton>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:w-[64%]">
          {limitedPieces.map((piece, index) => (
            <Reveal key={piece.id} delay={index * 80}>
              <Link
                href={`/san-pham/${piece.slug}`}
                className="relative block aspect-square w-full overflow-hidden"
              >
                <Image
                  src={piece.image}
                  alt={piece.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 30vw, 45vw"
                  className="object-cover transition-transform duration-500 ease-out hover:scale-[1.025]"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
