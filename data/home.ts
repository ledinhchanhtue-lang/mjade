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
