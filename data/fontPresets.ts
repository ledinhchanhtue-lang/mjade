/**
 * Metadata "phẳng" của các cặp font — dùng cho trang /admin (client component).
 * Loader next/font thật nằm ở app/fonts.ts (chỉ chạy phía server).
 */
export type FontPresetOption = {
  key: string;
  label: string;
  heading: string;
  body: string;
  note: string;
};

export const FONT_PRESET_OPTIONS: FontPresetOption[] = [
  {
    key: "classic",
    label: "Cổ điển",
    heading: "Playfair Display",
    body: "Montserrat",
    note: "Mặc định — trang nhã, cổ điển, đúng tinh thần thương hiệu.",
  },
  {
    key: "elegant",
    label: "Thanh lịch",
    heading: "Cormorant Garamond",
    body: "Be Vietnam Pro",
    note: "Serif mảnh, thanh thoát; chữ tiếng Việt tối ưu.",
  },
  {
    key: "modern",
    label: "Hiện đại",
    heading: "Lora",
    body: "Inter",
    note: "Dễ đọc, hiện đại, trung tính.",
  },
  {
    key: "soft",
    label: "Mềm mại",
    heading: "EB Garamond",
    body: "Nunito Sans",
    note: "Nét bo tròn, ấm áp, thân thiện.",
  },
  {
    key: "diamond",
    label: "Kim cương (Diamond Hedge)",
    heading: "Cormorant Garamond",
    body: "Montserrat",
    note: "Serif Garamond thanh mảnh + Montserrat — đúng phong cách website Diamond Hedge, có tiếng Việt.",
  },
];

/** Link Google Fonts để xem trước font ngay trong trang admin. */
export const FONT_PREVIEW_HREF =
  "https://fonts.googleapis.com/css2?" +
  [
    "family=Playfair+Display:ital,wght@0,400;0,600;1,500",
    "family=Montserrat:wght@400;600",
    "family=Cormorant+Garamond:ital,wght@0,400;0,600;1,500",
    "family=Be+Vietnam+Pro:wght@400;600",
    "family=Lora:ital,wght@0,400;0,600;1,500",
    "family=Inter:wght@400;600",
    "family=EB+Garamond:ital,wght@0,400;0,600;1,500",
    "family=Nunito+Sans:wght@400;600",
  ].join("&") +
  "&display=swap";
