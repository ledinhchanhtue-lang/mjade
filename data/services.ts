export type TrustPoint = {
  title: string;
  icon: "gem" | "handshake" | "badge" | "book" | "sparkles";
};

export const trustPoints: TrustPoint[] = [
  { title: "Ngọc phỉ thúy\nMyanmar Type A\n100% tự nhiên", icon: "gem" },
  { title: "Không qua\ntrung gian", icon: "handshake" },
  { title: "Bao kiểm định\nuy tín", icon: "badge" },
  { title: "Kể chuyện\nmỗi viên ngọc", icon: "book" },
  { title: "Bộ sưu tập\ngiới hạn", icon: "sparkles" },
];

export type ServicePanelItem = {
  icon: "user" | "truck";
  title: string;
  description: string;
  linkLabel: string;
  href: string;
};

export const servicePanels: ServicePanelItem[] = [
  {
    icon: "user",
    title: "Tư vấn cá nhân hóa",
    description:
      "Lắng nghe câu chuyện của bạn, để gợi ý viên ngọc dành riêng cho bạn.",
    linkLabel: "Đặt lịch tư vấn",
    href: "/lien-he-tu-van",
  },
  {
    icon: "truck",
    title: "Giao hàng quốc tế",
    description: "Giao hàng nhanh và có phương án bảo hiểm phù hợp.",
    linkLabel: "Tìm hiểu thêm",
    href: "/giao-hang-quoc-te",
  },
];

export const certificationChecklist: string[] = [
  "Ngọc phỉ thúy Myanmar Type A 100% tự nhiên.",
  "Bao kiểm định.",
  "Cam kết minh bạch về sản phẩm.",
  "Có thông tin nhận diện và mã sản phẩm.",
];
