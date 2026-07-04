export type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

export const footerColumns: FooterColumn[] = [
  {
    title: "Về MJADE",
    links: [
      { label: "Câu chuyện thương hiệu", href: "/cau-chuyen" },
      { label: "Ngọc phỉ thúy là gì?", href: "/ngoc-phi-thuy" },
      { label: "Cam kết chất lượng", href: "/kiem-dinh" },
      { label: "Tin tức", href: "/tin-tuc" },
    ],
  },
  {
    title: "Hỗ trợ",
    links: [
      { label: "Hướng dẫn mua hàng", href: "/huong-dan-mua-hang" },
      { label: "Chính sách bảo hành", href: "/chinh-sach-bao-hanh" },
      { label: "Chính sách đổi trả", href: "/chinh-sach-doi-tra" },
      { label: "Câu hỏi thường gặp", href: "/cau-hoi-thuong-gap" },
    ],
  },
  {
    title: "Dịch vụ",
    links: [
      { label: "Tư vấn cá nhân hóa", href: "/lien-he-tu-van" },
      { label: "Đặt lịch tư vấn", href: "/lien-he-tu-van" },
      { label: "Giao hàng quốc tế", href: "/giao-hang-quoc-te" },
      { label: "Cẩm nang ngọc", href: "/cam-nang-ngoc" },
    ],
  },
];

export const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" as const },
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" as const },
  { label: "Youtube", href: "https://youtube.com", icon: "youtube" as const },
];
