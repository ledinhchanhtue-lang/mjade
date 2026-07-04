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
              Từ Myanmar đến
              <br />
              trái tim người phụ nữ Việt
            </h2>
            <p className="max-w-md text-[14px] leading-relaxed text-text-secondary">
              Mỗi viên ngọc là món quà của đất trời Myanmar, được chọn lọc
              bằng sự trân trọng và hiểu biết sâu sắc. MJADE kết nối vẻ đẹp
              truyền thống với phong cách sống hiện đại của người phụ nữ
              thành đạt.
            </p>
            <EditorialButton href="/cau-chuyen" variant="text" className="mt-1">
              Khám phá câu chuyện
            </EditorialButton>
          </Reveal>

          <Reveal delay={120} className="relative aspect-[4/5] w-full flex-1 lg:max-w-[420px]">
            <Image
              src="/images/home/jade-inspection.webp"
              alt="Bàn tay chuyên gia dùng nhíp phân loại các viên đá xanh lục bên kính loupe trên bàn kiểm định"
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
              Toàn bộ sản phẩm được đi kèm chứng thư kiểm định từ đơn vị
              kiểm định đá quý phù hợp.
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
