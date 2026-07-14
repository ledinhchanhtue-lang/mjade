import Image from "next/image";
import { Check } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import EditorialButton from "@/components/ui/EditorialButton";
import Reveal from "@/components/ui/Reveal";
import { certificationChecklist } from "@/data/services";

export default function StoryCertification() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col gap-8 bg-background-warm px-5 py-12 sm:px-8 md:px-10 lg:flex-row lg:items-center lg:gap-10 lg:px-[72px] lg:py-20">
          <Reveal className="flex flex-1 flex-col gap-5">
            <SectionLabel>Câu chuyện MJADE</SectionLabel>
            <h2 className="font-heading text-[30px] leading-tight text-text-primary md:text-[36px] lg:text-[42px]">
              Trong mỗi chúng ta
              <br />
              đều ẩn chứa một viên ngọc
            </h2>
            <p className="max-w-md text-[14px] leading-relaxed text-text-secondary">
              Viên ngọc ấy không bao giờ mất đi, chỉ là bị lớp bụi cuộc đời
              phủ mờ ánh sáng vốn có. MJADE không chạy theo sự hoàn hảo, mà
              tôn vinh sự thật và vẻ đẹp đến từ bên trong — cùng bạn đi trên
              hành trình thức tỉnh và trở về.
            </p>
            <EditorialButton href="/cau-chuyen" variant="text" className="mt-1">
              Khám phá câu chuyện
            </EditorialButton>
          </Reveal>

          <Reveal delay={120} className="relative aspect-[4/5] w-full flex-1 lg:max-w-[420px]">
            <Image
              src="/images/home/jade-inspection.webp"
              alt="Người phụ nữ áo lụa trắng đeo vòng ngọc phỉ thúy, ánh nhìn trầm tĩnh"
              fill
              sizes="(min-width: 1024px) 30vw, 90vw"
              className="object-cover"
            />
          </Reveal>
        </div>

        <div className="flex flex-col gap-8 bg-white px-5 py-12 sm:px-8 md:px-10 lg:flex-row lg:items-center lg:gap-10 lg:px-[72px] lg:py-20">
          <Reveal className="flex flex-1 flex-col gap-5">
            <SectionLabel>Kiểm định &amp; cam kết</SectionLabel>
            <h2 className="font-heading text-[30px] leading-tight text-text-primary md:text-[36px] lg:text-[42px]">
              Uy tín tạo nên
              <br />
              niềm tin
            </h2>
            <p className="max-w-md text-[14px] leading-relaxed text-text-secondary">
              Toàn bộ sản phẩm đi kèm chứng thư kiểm định từ Myanmar Treasure
              Gemological Laboratory — thẩm định công nghệ bởi GIA (America) và
              FGA (London).
            </p>
            <ul className="flex flex-col gap-2.5">
              {certificationChecklist.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[13px] text-text-secondary">
                  <Check size={16} strokeWidth={1.6} className="mt-0.5 flex-none text-jade-deep" />
                  {item}
                </li>
              ))}
            </ul>
            <EditorialButton href="/kiem-dinh" variant="text" className="mt-1">
              Xem mẫu kiểm định
            </EditorialButton>
          </Reveal>

          <Reveal delay={120} className="relative aspect-[4/5] w-full flex-1 lg:max-w-[360px]">
            <Image
              src="/images/home/certificate.svg"
              alt="Placeholder giấy chứng nhận kiểm định, ảnh giấy kiểm định thực tế sẽ được cập nhật"
              fill
              sizes="(min-width: 1024px) 26vw, 90vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
