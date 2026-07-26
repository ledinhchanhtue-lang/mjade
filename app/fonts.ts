import {
  Playfair_Display,
  Montserrat,
  Cormorant_Garamond,
  Be_Vietnam_Pro,
  Lora,
  Inter,
  EB_Garamond,
  Nunito_Sans,
} from "next/font/google";

/**
 * Các font khả dụng cho website. Mỗi font giữ một biến CSS riêng; preset được
 * chọn (trong content/site.json) sẽ trỏ --font-heading / --font-body sang đúng
 * cặp qua inline style ở layout. Chỉ cặp mặc định (classic) được preload để
 * trang nhẹ; các cặp khác nạp khi được chọn.
 */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  display: "swap",
});
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  display: "swap",
});
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
});
const beVietnam = Be_Vietnam_Pro({
  variable: "--font-bevietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
});
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
});
const ebGaramond = EB_Garamond({
  variable: "--font-ebgaramond",
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
});
const nunitoSans = Nunito_Sans({
  variable: "--font-nunitosans",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
});

export type FontPresetKey = "classic" | "elegant" | "modern" | "soft";

export type FontPreset = {
  key: FontPresetKey;
  label: string;
  headingFamily: string;
  bodyFamily: string;
  /** className của next/font để gắn vào <html> (định nghĩa biến CSS của font). */
  headingClass: string;
  bodyClass: string;
  /** giá trị gán cho --font-heading / --font-body. */
  headingCss: string;
  bodyCss: string;
};

export const FONT_PRESETS: Record<FontPresetKey, FontPreset> = {
  classic: {
    key: "classic",
    label: "Cổ điển",
    headingFamily: "Playfair Display",
    bodyFamily: "Montserrat",
    headingClass: playfair.variable,
    bodyClass: montserrat.variable,
    headingCss: 'var(--font-playfair), "Playfair Display", serif',
    bodyCss: 'var(--font-montserrat), "Montserrat", sans-serif',
  },
  elegant: {
    key: "elegant",
    label: "Thanh lịch",
    headingFamily: "Cormorant Garamond",
    bodyFamily: "Be Vietnam Pro",
    headingClass: cormorant.variable,
    bodyClass: beVietnam.variable,
    headingCss: 'var(--font-cormorant), "Cormorant Garamond", serif',
    bodyCss: 'var(--font-bevietnam), "Be Vietnam Pro", sans-serif',
  },
  modern: {
    key: "modern",
    label: "Hiện đại",
    headingFamily: "Lora",
    bodyFamily: "Inter",
    headingClass: lora.variable,
    bodyClass: inter.variable,
    headingCss: 'var(--font-lora), "Lora", serif',
    bodyCss: 'var(--font-inter), "Inter", sans-serif',
  },
  soft: {
    key: "soft",
    label: "Mềm mại",
    headingFamily: "EB Garamond",
    bodyFamily: "Nunito Sans",
    headingClass: ebGaramond.variable,
    bodyClass: nunitoSans.variable,
    headingCss: 'var(--font-ebgaramond), "EB Garamond", serif',
    bodyCss: 'var(--font-nunitosans), "Nunito Sans", sans-serif',
  },
};

export function getFontPreset(key: string | undefined | null): FontPreset {
  return FONT_PRESETS[(key ?? "") as FontPresetKey] ?? FONT_PRESETS.classic;
}
