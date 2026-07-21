import raw from "@/content/testimonials.json";

export type Testimonial = {
  quote: string;
  name: string;
  role: string | null;
  /** Ảnh chân dung khách hàng do MJADE cung cấp (khách trong các bài feedback thật) */
  image: string;
  imageAlt: string;
  /** Link bài feedback gốc do MJADE đăng — để khách kiểm chứng, không bịa */
  source: string;
};

/**
 * Nguồn dữ liệu: `content/testimonials.json` — chỉnh sửa được qua trang /admin.
 * Chỉ đăng phần khách chia sẻ về cảm nhận/trải nghiệm — KHÔNG đưa phát biểu về
 * công dụng sức khỏe/làm đẹp như một sự thật.
 */
export const testimonials = raw.testimonials as Testimonial[];
