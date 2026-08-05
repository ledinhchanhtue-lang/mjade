import raw from "@/content/home.json";

export type HomeBlock = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
  /** Dòng chú thích nhỏ hiển thị trên ảnh (vd: tên người mẫu/đại sứ). Tuỳ chọn. */
  imageCaption?: string;
  /** Danh sách ảnh cho slideshow hero (tự cuộn). Trống = dùng `image`. */
  images?: string[];
  /** Vị trí khối chữ trên hero: "left" | "center" | "right". Mặc định "right". */
  textPosition?: string;
};

export type TestimonialsSection = {
  eyebrow: string;
  titlePlain: string;
  titleItalic: string;
};

/** Nguồn dữ liệu: `content/home.json` — chỉnh sửa được qua trang /admin. */
export const heroBlock = raw.hero as HomeBlock;
export const storyBlock = raw.story as HomeBlock;
export const certificationBlock = raw.certification as HomeBlock;
export const testimonialsSection = raw.testimonialsSection as TestimonialsSection;
