export const site = {
  name: "MJADE",
  url: "https://mjade.vercel.app",
  tagline: "Tinh túy từ thiên nhiên. Tận tâm trong từng trải nghiệm.",
  description:
    "MJADE tuyển chọn trang sức ngọc phỉ thúy Myanmar Type A 100%, có kiểm định, nguồn gốc minh bạch và trải nghiệm tư vấn cá nhân hóa.",
  email: "lienhe@mjade.vn",
  consultChannels: ["Điện thoại", "Zalo", "WhatsApp", "Email"] as const,
  shippingDestinations: [
    "Việt Nam",
    "Hoa Kỳ",
    "Canada",
    "Úc",
    "Đức",
    "Pháp",
    "Séc",
    "Nhật Bản",
    "Hàn Quốc",
    "Đài Loan",
    "Singapore",
  ],
};

export type ConsultChannel = (typeof site.consultChannels)[number];
