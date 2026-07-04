import Image from "next/image";
import EditorialButton from "@/components/ui/EditorialButton";
import SectionLabel from "@/components/ui/SectionLabel";
import TrustItem from "@/components/home/TrustItem";
import { trustPoints } from "@/data/services";

export default function Hero() {
  return (
    <section className="w-full bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 md:items-stretch">
        <div className="order-2 flex flex-col justify-center gap-6 px-5 py-10 sm:px-8 md:order-1 md:px-10 md:py-12 lg:px-[72px] lg:py-16">
          <SectionLabel>Ngọc phỉ thúy Myanmar Type A</SectionLabel>

          <h1 className="font-heading text-[42px] leading-[1.02] text-text-primary sm:text-[52px] lg:text-[clamp(52px,5vw,76px)]">
            Vẻ đẹp thuần khiết.
            <br />
            <em className="italic text-jade-deep">Giá trị vĩnh bền.</em>
          </h1>

          <p className="max-w-md text-[14px] leading-relaxed text-text-secondary md:text-[15px]">
            MJADE tuyển chọn ngọc phỉ thúy Myanmar Type A 100%, không qua
            trung gian. Mỗi món trang sức là một câu chuyện về thiên nhiên,
            văn hóa và sự tinh tế.
          </p>

          <div className="grid grid-cols-2 gap-x-6 gap-y-7 pt-2 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-5">
            {trustPoints.map((point) => (
              <TrustItem key={point.title} {...point} />
            ))}
          </div>

          <div className="pt-2">
            <EditorialButton href="/bo-suu-tap">Khám phá ngay</EditorialButton>
          </div>
        </div>

        <div className="relative order-1 aspect-[10/7] w-full md:order-2 md:aspect-auto md:h-full md:min-h-[440px] lg:min-h-[500px]">
          <Image
            src="/images/home/hero-jade-woman.webp"
            alt="Người phụ nữ mặc áo dệt màu ngà đeo dây chuyền vàng điểm đá xanh lục, ánh sáng cửa sổ ấm"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-[center_35%] md:object-center"
          />
        </div>
      </div>
    </section>
  );
}
