export const site = {
  name: "MJADE",
  url: "https://mjade.vercel.app",
  brandLine: "Meet your Inner Jade",
  tagline: "Đánh thức viên ngọc trong bạn.",
  essence: "Vẻ đẹp thật sự là ánh sáng lấp lánh bên trong chính bạn.",
  description:
    "MJADE tuyển chọn trang sức ngọc phỉ thúy Myanmar Type A 100% tự nhiên — đồng hành cùng bạn trên hành trình trở về với ánh sáng bên trong. Bao kiểm định, minh bạch nguồn gốc, tư vấn cá nhân hóa.",
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
