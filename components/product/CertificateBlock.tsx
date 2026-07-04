import Link from "next/link";
import { BadgeCheck, FileText } from "lucide-react";
import type { Product } from "@/data/products";

export default function CertificateBlock({ product }: { product: Product }) {
  return (
    <section aria-labelledby="cert-heading" className="border border-border bg-background-warm px-6 py-6">
      <h2
        id="cert-heading"
        className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.12em] text-text-primary"
      >
        <BadgeCheck size={16} strokeWidth={1.4} className="text-jade-deep" />
        Kiểm định &amp; minh bạch
      </h2>

      <dl className="mt-4 flex flex-col gap-2 text-[13px]">
        <div className="flex justify-between gap-4">
          <dt className="text-text-secondary">Cam kết</dt>
          <dd className="text-right text-text-primary">Ngọc phỉ thúy tự nhiên Type A</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-text-secondary">Mã sản phẩm</dt>
          <dd className="text-right text-text-primary">{product.productCode}</dd>
        </div>
        {product.certificateAvailable && product.certificateIssuer ? (
          <div className="flex justify-between gap-4">
            <dt className="text-text-secondary">Đơn vị kiểm định</dt>
            <dd className="text-right text-text-primary">{product.certificateIssuer}</dd>
          </div>
        ) : null}
        {product.certificateAvailable && product.certificateNumber ? (
          <div className="flex justify-between gap-4">
            <dt className="text-text-secondary">Số chứng thư</dt>
            <dd className="text-right text-text-primary">{product.certificateNumber}</dd>
          </div>
        ) : null}
      </dl>

      {product.certificateAvailable && product.certificateImage ? (
        <a
          href={product.certificatePdf ?? product.certificateImage}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-jade-deep underline-offset-4 hover:underline"
        >
          <FileText size={14} strokeWidth={1.5} />
          Xem chứng thư kiểm định
        </a>
      ) : (
        <p className="mt-4 border border-dashed border-border bg-white px-4 py-3 text-[12px] leading-relaxed text-text-secondary">
          Chứng thư kiểm định thực tế sẽ được cập nhật. Khi nhận hàng, sản phẩm luôn đi kèm
          chứng thư bản cứng từ đơn vị kiểm định độc lập.
        </p>
      )}

      <p className="mt-3 text-[12px] leading-relaxed text-text-secondary">
        Bạn có thể kiểm định lại sản phẩm tại bất kỳ đơn vị độc lập nào — nếu kết quả không
        đúng cam kết, MJADE hoàn tiền 100%.{" "}
        <Link href="/kiem-dinh" className="text-jade-deep underline-offset-4 hover:underline">
          Tìm hiểu quy trình kiểm định
        </Link>
        .
      </p>
    </section>
  );
}
