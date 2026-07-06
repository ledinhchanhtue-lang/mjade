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
    heading: "Trả lại ánh sáng vốn có",
    body: [
      "Trong mỗi chúng ta đều ẩn chứa một viên ngọc — chỉ là bị lớp bụi cuộc đời phủ mờ ánh sáng vốn có. MJADE ra đời để dùng ngọc phỉ thúy như một nhân duyên, giúp bạn dừng lại và chạm vào ánh sáng bên trong chính mình.",
      "Chúng tôi chọn con đường của sự thật: chỉ ngọc Myanmar Type A 100% tự nhiên, nói đúng về từng sản phẩm, và tôn vinh vẻ đẹp đến từ bên trong thay vì chạy theo sự hoàn hảo bề mặt.",
    ],
  },
  {
    eyebrow: "Tầm nhìn",
    heading: "Biểu tượng của vẻ đẹp tự nhiên và tỉnh thức",
    body: [
      "Trở thành biểu tượng, hình mẫu về vẻ đẹp của tự nhiên và tỉnh thức — nơi những viên ngọc phỉ thúy kể câu chuyện về hành trình trở về với bản thể, để mỗi người nhận ra rằng: họ vốn đã là một viên ngọc sáng.",
    ],
  },
  {
    eyebrow: "Sứ mệnh",
    heading: "Tôn vinh vẻ đẹp tự nhiên và năng lượng tỉnh thức",
    body: [
      "Tôn vinh vẻ đẹp tự nhiên và năng lượng tỉnh thức của con người hiện đại, thông qua những thiết kế ngọc phỉ thúy tinh tế, chân thật và mang sức sống của đất trời.",
      "MJADE mong muốn mỗi người, khi có duyên chạm vào ngọc, đều tìm lại được sự an nhiên, tự tin và ánh sáng bên trong chính mình — rồi lan tỏa ánh sáng đó qua sự hiện diện của họ.",
    ],
  },
  {
    eyebrow: "Định vị",
    heading: "Sang trọng kín đáo (Low-key Luxury)",
    body: [
      "MJADE dành cho những người trân trọng chiều sâu hơn sự phô trương. Ngọc phỉ thúy với sắc xanh trầm và độ bóng sâu là vẻ đẹp kín đáo — chỉ thật sự tỏa sáng với người hiểu nó.",
      "Đó là thứ quý giá bạn sở hữu cho chính mình, không cần bất kỳ ai cũng phải nhận ra giá trị thực sự của nó.",
    ],
  },
  {
    eyebrow: "Khác biệt",
    heading: "Vẻ đẹp được kể bằng câu chuyện thật",
    body: [
      "MJADE không cạnh tranh bằng độ lấp lánh chói lòa. Sự độc bản của chúng tôi là tự nhiên và có sẵn trong chất liệu: mỗi viên ngọc Type A là duy nhất trên đời, và những điểm 'không hoàn hảo' của nó chính là câu chuyện về sự thật và chiều sâu cá nhân.",
      "Sự tương đồng giữa viên ngọc không thể sao chép và bản thể độc nhất của người đeo — đó là điều MJADE trân trọng nhất.",
    ],
  },
  {
    eyebrow: "Cam kết",
    heading: "Authentic — làm thật, sống thật",
    body: [
      "Mọi sản phẩm đi kèm chứng thư kiểm định và mã sản phẩm riêng. MJADE khuyến khích khách kiểm định lại độc lập — nếu kết quả không đúng cam kết Type A, chúng tôi hoàn tiền 100%. Từ trong nước đến cộng đồng người Việt khắp nơi, chúng tôi đồng hành qua tư vấn cá nhân hóa và vận chuyển quốc tế có bảo hiểm.",
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
          “Mjade — Meet your Inner Jade. Vẻ đẹp thật sự là ánh sáng lấp lánh
          bên trong chính bạn.”
        </p>
        <div className="mt-8 flex justify-center">
          <EditorialButton href="/lien-he-tu-van">Đặt lịch tư vấn riêng</EditorialButton>
        </div>
      </section>
    </>
  );
}
