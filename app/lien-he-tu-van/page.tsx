import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/components/ui/PageHeader";
import ConsultForm from "@/components/forms/ConsultForm";
import { UserRound, Video, ShieldCheck } from "lucide-react";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Liên Hệ Tư Vấn Riêng | MJADE",
  description:
    "Đặt lịch tư vấn cá nhân hóa cùng MJADE — xem ngọc trực tiếp hoặc qua video call, hỗ trợ khách hàng trong nước và quốc tế.",
  alternates: { canonical: `${site.url}/lien-he-tu-van` },
};

const promises = [
  {
    icon: UserRound,
    title: "Tư vấn riêng, không ràng buộc",
    body: "Mỗi buổi tư vấn là cuộc trò chuyện riêng giữa bạn và chuyên gia MJADE — không áp lực mua hàng.",
  },
  {
    icon: Video,
    title: "Xem ngọc từ xa",
    body: "Khách ở nước ngoài được hỗ trợ video call với ánh sáng trung thực, quay cận vân ngọc và giấy kiểm định.",
  },
  {
    icon: ShieldCheck,
    title: "Riêng tư tuyệt đối",
    body: "Thông tin của bạn chỉ dùng để liên hệ tư vấn, không chia sẻ cho bên thứ ba.",
  },
];

type Props = { searchParams: Promise<{ sp?: string }> };

export default async function ConsultPage({ searchParams }: Props) {
  const { sp } = await searchParams;

  return (
    <>
      <PageHeader
        eyebrow="Liên hệ tư vấn"
        title={
          <>
            Lắng nghe câu chuyện của bạn,
            <br />
            <em className="italic text-jade-deep">để gợi ý viên ngọc dành riêng cho bạn.</em>
          </>
        }
        lead="Điền thông tin bên dưới, MJADE sẽ chủ động liên hệ trong khung giờ bạn chọn — qua kênh bạn thấy thoải mái nhất."
      />

      <div className="px-5 pb-16 md:px-10 lg:px-[72px] lg:pb-20">
        <div className="mx-auto grid max-w-content grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
          <Suspense>
            <ConsultForm defaultInterest={sp} />
          </Suspense>

          <aside className="flex flex-col gap-8 lg:border-l lg:border-border lg:pl-10">
            {promises.map((p) => (
              <div key={p.title}>
                <p.icon size={22} strokeWidth={1.3} className="text-jade-deep" />
                <p className="mt-3 text-[12px] font-medium uppercase tracking-[0.12em] text-text-primary">
                  {p.title}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-text-secondary">{p.body}</p>
              </div>
            ))}
            <div className="border-t border-border pt-6">
              <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-primary">
                Hotline
              </p>
              <a
                href={`tel:${site.phone}`}
                className="mt-2 inline-block text-[14px] text-jade-deep underline-offset-4 hover:underline"
              >
                {site.phone}
              </a>
              <p className="mt-4 text-[12px] font-medium uppercase tracking-[0.12em] text-text-primary">
                Email trực tiếp
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 inline-block text-[14px] text-jade-deep underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
            </div>

            <div className="border-t border-border pt-6">
              <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-text-primary">
                Hệ thống cửa hàng
              </p>
              <ul className="mt-3 flex flex-col gap-3">
                {site.stores.map((s) => (
                  <li key={s.address} className="text-[13px] leading-relaxed text-text-secondary">
                    <span className="font-medium text-text-primary">{s.city}</span>
                    <br />
                    {s.address}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
