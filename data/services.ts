export type TrustPoint = {
  title: string;
  icon: "gem" | "store" | "badge";
};

export const trustPoints: TrustPoint[] = [
  { title: "100% Phỉ Thúy\nMyanmar Type A", icon: "gem" },
  { title: "Showroom trải nghiệm\ntrực tiếp", icon: "store" },
  { title: "Kiểm định\nuy tín", icon: "badge" },
];

export type ServicePanelItem = {
  icon: "user" | "shield";
  title: string;
  description: string;
  linkLabel: string;
  href: string;
};

export const servicePanels: ServicePanelItem[] = [
  {
    icon: "user",
    title: "Tư vấn Khám Ngọc",
    description:
      "Nếu bạn có một ngọc phẩm trước đó chưa rõ nguồn gốc và chất lượng, hãy mang đến cửa hàng MJADE gần nhất để được hỗ trợ Khám Ngọc.",
    linkLabel: "Đặt lịch Khám Ngọc",
    href: "/lien-he-tu-van",
  },
  {
    icon: "shield",
    title: "Kiểm định Quốc Tế",
    description:
      "Kiểm định uy tín từ Myanmar Treasure Gemological Laboratory, thẩm định công nghệ bởi GIA (America) và FGA (London).",
    linkLabel: "Tìm hiểu kiểm định",
    href: "/kiem-dinh",
  },
];

export const certificationChecklist: string[] = [
  "Ngọc phỉ thúy Myanmar Type A 100% tự nhiên.",
  "Kiểm định từ Myanmar Treasure Gemological Laboratory (thẩm định công nghệ bởi GIA America & FGA London).",
  "Cam kết minh bạch về sản phẩm.",
  "Có thông tin nhận diện và mã sản phẩm.",
];
