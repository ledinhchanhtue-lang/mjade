import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/ui/PageHeader";
import SectionLabel from "@/components/ui/SectionLabel";
import EditorialButton from "@/components/ui/EditorialButton";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Câu Chuyện MJADE — Meet Your Inner Jade",
  description:
    "Trong mỗi chúng ta đều ẩn chứa một viên ngọc. MJADE dùng ngọc phỉ thúy Myanmar Type A như một nhân duyên để bạn trở về với ánh sáng bên trong chính mình.",
  alternates: { canonical: `${site.url}/cau-chuyen` },
};

const chapters: { eyebrow: string; heading: string; body: string[] }[] = [
  {
    eyebrow: "Khởi nguồn",
    heading: "Trong mỗi chúng ta đều ẩn chứa một viên ngọc",
    body: [
      "Bạn có tin không, rằng trong mỗi chúng ta đều ẩn chứa một viên ngọc? Ẩn sau những vai trò, những hành trình, những ước mơ và hoài bão. Viên ngọc trong ta không bao giờ mất đi — chỉ là bị lớp bụi của cuộc đời phủ mờ ánh sáng vốn có.",
      "MJADE ra đời từ niềm tin ấy: rằng vẻ đẹp quý giá nhất không đến từ bên ngoài, mà là ánh sáng luôn sẵn có bên trong mỗi người.",
    ],
  },
  {
    eyebrow: "Chất liệu",
    heading: "Kết tinh của đất trời và thời gian",
    body: [
      "Chúng tôi dày công tuyển chọn ngọc phỉ thúy Myanmar Type A 100% tự nhiên — những viên ngọc được khai sinh từ lòng đất mẹ qua hàng triệu năm, kết tinh năng lượng của đất trời, sự nhẫn nại của thời gian, và vẻ đẹp thuần khiết không thể sao chép.",
      "Ngọc phỉ thúy thay MJADE gieo một nhân duyên: để bạn dừng lại, chạm vào ánh sáng bên trong, và nhận ra rằng bạn luôn có thể lấp lánh dù cuộc đời bao lần thử thách.",
    ],
  },
  {
    eyebrow: "Triết lý",
    heading: "Tôn vinh sự thật, không chạy theo hoàn hảo",
    body: [
      "Mỗi thiết kế của MJADE không chạy theo sự hoàn hảo, mà tôn vinh sự thật và vẻ đẹp đến từ bên trong. Những vân đá, những điểm không đều của ngọc tự nhiên không phải khuyết điểm — chúng là dấu ấn độc bản, là câu chuyện riêng của từng viên ngọc và của từng người đeo.",
      "Bởi viên ngọc quý nhất không nằm trên cổ hay trong tay, mà nằm trong ánh mắt biết soi sáng chính mình.",
    ],
  },
  {
    eyebrow: "Đồng hành",
    heading: "Meet your Inner Jade",
    body: [
      "MJADE không chỉ làm đẹp cho bạn, mà cùng bạn đi trên hành trình thức tỉnh và trở về. Chúng tôi mong muốn mỗi người, khi có duyên chạm vào ngọc, đều tìm lại được sự an nhiên, tự tin và ánh sáng bên trong chính mình — rồi lan tỏa ánh sáng đó qua chính sự hiện diện của họ.",
      "Meet your Inner Jade. Vẻ đẹp thật sự là ánh sáng lấp lánh bên trong chính bạn.",
    ],
  },
  {
    eyebrow: "Sự thật",
    heading: "Nền của cái đẹp là sự chân thật",
    body: [
      "Câu chuyện đẹp chỉ có giá trị khi dựa trên sự thật. Vì vậy MJADE cam kết ngọc phỉ thúy Myanmar Type A 100% tự nhiên, không qua xử lý — mỗi sản phẩm đi kèm chứng thư kiểm định, mã đối chiếu riêng, và khuyến khích bạn kiểm định lại độc lập.",
    ],
  },
];

export default function StoryPage() {
  return (
    <>
      <PageHeader
        tone="warm"
        eyebrow="Câu chuyện MJADE"
        title={
          <>
            Đánh thức
            <br />
            <em className="italic text-jade-deep">viên ngọc trong bạn.</em>
          </>
        }
      />

      <div className="relative aspect-[2000/1100] max-h-[480px] w-full overflow-hidden">
        <Image
          src="/images/editorial/story-hero.webp"
          alt="Dây chuyền vàng điểm đá xanh lục trên áo dệt màu ngà trong ánh sáng ấm"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="px-5 py-14 md:px-10 lg:px-[72px] lg:py-20">
        <div className="mx-auto flex max-w-2xl flex-col gap-14">
          {chapters.map((c) => (
            <section key={c.heading}>
              <SectionLabel>{c.eyebrow}</SectionLabel>
              <h2 className="mt-3 font-heading text-[26px] leading-snug text-text-primary md:text-[32px]">
                {c.heading}
              </h2>
              {c.body.map((p) => (
                <p key={p.slice(0, 40)} className="mt-4 text-[15px] leading-[1.8] text-text-secondary">
                  {p}
                </p>
              ))}
            </section>
          ))}

          <section className="border-y border-border py-10 text-center">
            <p className="font-heading text-[22px] italic leading-relaxed text-text-primary md:text-[26px]">
              “Viên ngọc quý nhất không nằm trên cổ hay trong tay, mà nằm trong
              ánh mắt biết soi sáng chính mình.”
            </p>
          </section>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <EditorialButton href="/bo-suu-tap">Khám phá bộ sưu tập</EditorialButton>
            <EditorialButton href="/lien-he-tu-van" variant="text">
              Trò chuyện cùng MJADE
            </EditorialButton>
          </div>
        </div>
      </div>
    </>
  );
}
