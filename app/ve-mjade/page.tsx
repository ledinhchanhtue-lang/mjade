import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/ui/PageHeader";
import SectionLabel from "@/components/ui/SectionLabel";
import EditorialButton from "@/components/ui/EditorialButton";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Về MJADE — Thương Hiệu Ngọc Phỉ Thúy Tuyển Chọn",
  description:
    "MJADE là thương hiệu ngọc phỉ thúy Myanmar Type A tuyển chọn — không qua trung gian, tư vấn cá nhân hóa, minh bạch nguồn gốc, phục vụ khách hàng trong nước và quốc tế.",
  alternates: { canonical: `${site.url}/ve-mjade` },
};

const blocks: { eyebrow: string; heading: string; body: string[] }[] = [
  {
    eyebrow: "Vì sao MJADE ra đời",
    heading: "Một thị trường cần sự minh bạch",
    body: [
      "Thị trường ngọc phỉ thúy đầy những sản phẩm xử lý hóa chất được bán như ngọc tự nhiên. Người mua thiệt hại không chỉ tiền bạc — mà cả niềm tin vào một món trang sức lẽ ra được truyền qua nhiều thế hệ.",
      "MJADE ra đời để làm điều ngược lại: chỉ bán ngọc phỉ thúy Myanmar Type A tự nhiên, nói đúng về từng sản phẩm, và chịu trách nhiệm trọn đời với cam kết của mình.",
    ],
  },
  {
    eyebrow: "Không qua trung gian",
    heading: "Từ nguồn ngọc đến tay bạn",
    body: [
      "MJADE tuyển chọn ngọc trực tiếp từ nguồn Myanmar thay vì mua lại qua nhiều lớp trung gian. Điều đó cho phép chúng tôi biết rõ nguồn gốc từng viên ngọc, kiểm soát chất lượng từ khâu thô — và giữ mức giá tương xứng với giá trị thật.",
    ],
  },
  {
    eyebrow: "Khách hàng của MJADE",
    heading: "Người phụ nữ hiểu giá trị của mình",
    body: [
      "Khách hàng của MJADE là những người phụ nữ thành đạt, có chính kiến — ở Việt Nam và ở khắp nơi trên thế giới. Họ không tìm món trang sức để phô trương; họ tìm một vật phẩm đồng hành, một câu chuyện riêng, một vẻ đẹp trầm tĩnh phản chiếu nội lực của chính mình.",
      "Vì vậy trải nghiệm MJADE được thiết kế quanh sự riêng tư: tư vấn 1-1, xem ngọc theo lịch hẹn, và hỗ trợ chu đáo cho khách hàng ở xa.",
    ],
  },
  {
    eyebrow: "Chuyên môn",
    heading: "Tuyển chọn bằng hiểu biết",
    body: [
      "Mỗi viên ngọc trước khi thành sản phẩm MJADE đều đi qua quy trình đánh giá về màu sắc, độ trong, kết cấu và độ an toàn của chế tác. Chúng tôi từ chối nhiều hơn là lựa chọn — bởi một thương hiệu tuyển chọn chỉ có giá trị khi dám nói 'không' với đá kém.",
    ],
  },
  {
    eyebrow: "Minh bạch",
    heading: "Nói đúng, bán đúng, chịu trách nhiệm",
    body: [
      "Mọi sản phẩm đi kèm chứng thư kiểm định và mã sản phẩm riêng. MJADE khuyến khích khách kiểm định lại độc lập — nếu kết quả không đúng cam kết Type A, chúng tôi hoàn tiền 100%, không giới hạn thời gian.",
    ],
  },
  {
    eyebrow: "Quốc tế",
    heading: "Phục vụ người Việt ở khắp nơi",
    body: [
      "Từ California đến Sydney, từ Praha đến Tokyo — MJADE đồng hành cùng cộng đồng người Việt xa quê qua tư vấn video call, vận chuyển quốc tế có bảo hiểm và chứng từ đầy đủ. Khoảng cách địa lý không nên là rào cản giữa bạn và viên ngọc dành cho mình.",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Về MJADE"
        title={
          <>
            Thương hiệu ngọc tuyển chọn,
            <br />
            <em className="italic text-jade-deep">không phải cửa hàng trang sức phổ thông.</em>
          </>
        }
        lead="MJADE tồn tại với một niềm tin giản dị: người phụ nữ xứng đáng được sở hữu viên ngọc thật, với thông tin thật, qua một trải nghiệm được thiết kế riêng cho mình."
      />

      <div className="relative mx-5 aspect-[2000/1100] max-h-[420px] overflow-hidden md:mx-10 lg:mx-[72px]">
        <Image
          src="/images/editorial/story-hero.webp"
          alt="Dây chuyền vàng điểm đá xanh lục trên nền áo dệt màu ngà, ánh sáng ấm"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <section className="px-5 py-14 md:px-10 lg:px-[72px] lg:py-20">
        <div className="mx-auto grid max-w-content grid-cols-1 gap-x-14 gap-y-12 md:grid-cols-2">
          {blocks.map((b) => (
            <div key={b.heading}>
              <SectionLabel>{b.eyebrow}</SectionLabel>
              <h2 className="mt-3 font-heading text-[24px] leading-snug text-text-primary md:text-[28px]">
                {b.heading}
              </h2>
              {b.body.map((p) => (
                <p key={p.slice(0, 40)} className="mt-3 text-[14px] leading-relaxed text-text-secondary">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-background-warm px-5 py-14 text-center md:px-10 lg:px-[72px]">
        <p className="mx-auto max-w-2xl font-heading text-[24px] italic leading-snug text-text-primary md:text-[30px]">
          “Chúng tôi không bán đá quý. Chúng tôi giúp bạn tìm viên ngọc sẽ đi cùng bạn nhiều thập kỷ.”
        </p>
        <div className="mt-8 flex justify-center">
          <EditorialButton href="/lien-he-tu-van">Đặt lịch tư vấn riêng</EditorialButton>
        </div>
      </section>
    </>
  );
}
