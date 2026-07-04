import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/ui/PageHeader";
import SectionLabel from "@/components/ui/SectionLabel";
import EditorialButton from "@/components/ui/EditorialButton";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Câu Chuyện MJADE — Từ Myanmar Đến Trái Tim Người Phụ Nữ Việt",
  description:
    "Hành trình của một viên ngọc phỉ thúy: từ nguồn đá Myanmar, qua bàn tay tuyển chọn, đến những khoảnh khắc đời thường của người phụ nữ hiện đại.",
  alternates: { canonical: `${site.url}/cau-chuyen` },
};

const chapters: { eyebrow: string; heading: string; body: string[] }[] = [
  {
    eyebrow: "Khởi nguồn",
    heading: "Từ lòng đất Myanmar",
    body: [
      "Hàng triệu năm trước, dưới áp suất khổng lồ của những đứt gãy địa chất, jadeite hình thành — hiếm hoi và chậm rãi. Miền bắc Myanmar là nơi duy nhất trên thế giới cho ra ngọc phỉ thúy chất lượng trang sức với trữ lượng đáng kể.",
      "Mỗi viên ngọc rời khỏi lòng đất đã mang sẵn cấu trúc, sắc độ và vân đá không lặp lại. Việc của MJADE chỉ là tìm ra viên xứng đáng — và kể đúng câu chuyện của nó.",
    ],
  },
  {
    eyebrow: "Tuyển chọn",
    heading: "Từ chối nhiều hơn lựa chọn",
    body: [
      "Phần lớn đá đi qua tay MJADE không được chọn. Màu chưa đủ sâu, độ trong chưa đạt, hay đơn giản là viên đá không có 'thần' — chúng tôi để lại. Bởi một thương hiệu tuyển chọn được định nghĩa bằng những gì nó dám từ chối.",
    ],
  },
  {
    eyebrow: "Người chọn ngọc",
    heading: "Người phụ nữ chọn ngọc",
    body: [
      "Cô ấy có thể là nữ doanh nhân ở Sài Gòn, người mẹ hai con ở California, hay cô gái vừa nhận vị trí mới ở Singapore. Điểm chung của họ: tự chủ, có đức tin riêng, và trân trọng những giá trị thật.",
      "Với họ, viên ngọc không phải trang sức phô trương — mà là khoảng lặng nhỏ giữa nhịp sống vội, một lời nhắc về nội lực của chính mình, một vật phẩm sẽ theo họ qua những cột mốc quan trọng.",
    ],
  },
  {
    eyebrow: "Khoảnh khắc thật",
    heading: "Trong đời sống thường ngày",
    body: [
      "Ngọc phỉ thúy của MJADE không nằm trong két. Nó đi làm cùng chủ nhân dưới lớp áo sơ mi lụa, xuất hiện trong buổi họp quan trọng, trong bữa cơm gia đình ngày Tết, trong khoảnh khắc cô ấy chạm nhẹ lên mặt dây chuyền để tự nhắc mình: bình tĩnh, vững vàng.",
      "Một món ngọc riêng tư — không phải thứ xa xỉ đại trà.",
    ],
  },
  {
    eyebrow: "Sự thật",
    heading: "Kiểm định và minh bạch",
    body: [
      "Câu chuyện đẹp chỉ có giá trị khi dựa trên sự thật. Vì vậy mỗi sản phẩm MJADE đi kèm chứng thư kiểm định độc lập, mã đối chiếu riêng và cam kết hoàn tiền 100% nếu không đúng Type A.",
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
            Từ Myanmar đến
            <br />
            <em className="italic text-jade-deep">trái tim người phụ nữ Việt.</em>
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
              “Mỗi viên ngọc là món quà của đất trời Myanmar, được chọn lọc bằng sự trân trọng
              và hiểu biết sâu sắc.”
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
