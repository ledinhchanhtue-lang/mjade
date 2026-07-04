import Link from "next/link";
import EditorialButton from "@/components/ui/EditorialButton";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center px-5 py-24 text-center md:py-32">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-jade-deep">404</p>
      <h1 className="mt-4 max-w-xl font-heading text-[34px] leading-tight text-text-primary md:text-[44px]">
        Trang bạn tìm
        <br />
        <em className="italic text-jade-deep">chưa tồn tại.</em>
      </h1>
      <p className="mt-4 max-w-md text-[14px] leading-relaxed text-text-secondary">
        Có thể đường dẫn đã thay đổi. Mời bạn quay về trang chủ hoặc khám phá bộ sưu tập.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
        <EditorialButton href="/">Về trang chủ</EditorialButton>
        <Link
          href="/bo-suu-tap"
          className="text-[11px] font-medium uppercase tracking-[0.12em] text-jade-deep underline-offset-4 hover:underline"
        >
          Xem bộ sưu tập
        </Link>
      </div>
    </div>
  );
}
