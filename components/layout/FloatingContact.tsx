import { MessageCircle } from "lucide-react";
import { FacebookIcon } from "@/components/ui/SocialIcons";
import { site } from "@/data/site";

/**
 * Nút chat nổi góc phải màn hình để khách gặp tư vấn viên qua Zalo / Facebook.
 * Ẩn tự động nếu không cấu hình link (sửa trong /admin).
 */
/** Chuẩn hoá giá trị Zalo: nhận link đầy đủ (http…) hoặc số điện thoại. */
function zaloHref(raw: string | undefined): string | null {
  const v = raw?.trim();
  if (!v) return null;
  if (/^https?:\/\//i.test(v)) return v;
  const digits = v.replace(/[^0-9]/g, "");
  return digits ? `https://zalo.me/${digits}` : null;
}

export default function FloatingContact() {
  const fb = site.facebookUrl?.trim();
  const zalo = zaloHref(site.zaloUrl ?? site.zaloPhone);
  if (!fb && !zalo) return null;

  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-2.5 md:bottom-6 md:right-6">
      {zalo ? (
        <a
          href={zalo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Nhắn Zalo với tư vấn viên MJADE"
          className="flex items-center gap-2 rounded-full bg-jade-deep px-4 py-2.5 text-white shadow-md transition-colors hover:bg-text-primary"
        >
          <MessageCircle size={18} strokeWidth={1.6} />
          <span className="text-[12px] font-medium">Zalo tư vấn</span>
        </a>
      ) : null}
      {fb ? (
        <a
          href={fb}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Nhắn Facebook với tư vấn viên MJADE"
          className="flex items-center gap-2 rounded-full bg-jade-deep px-4 py-2.5 text-white shadow-md transition-colors hover:bg-text-primary"
        >
          <FacebookIcon size={18} strokeWidth={1.6} />
          <span className="text-[12px] font-medium">Facebook</span>
        </a>
      ) : null}
    </div>
  );
}
