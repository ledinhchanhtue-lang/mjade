export type Testimonial = {
  quote: string;
  name: string;
  role: string | null;
  /** Link bài feedback gốc do MJADE đăng — để khách kiểm chứng, không bịa */
  source: string;
};

/**
 * Trích từ các bài feedback THẬT do MJADE đăng công khai trên Facebook.
 * Chỉ chọn phần khách chia sẻ về cảm nhận nội tâm / trải nghiệm mua hàng / uy tín —
 * KHÔNG đưa các phát biểu về công dụng sức khỏe/làm đẹp như một sự thật.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Chiếc vòng không thay đổi mọi thứ. Nó giúp mình kết nối lại với sự cân bằng bên trong.",
    name: "Ms. Tammy",
    role: "Marketing Leader, AIA",
    source: "https://www.facebook.com/share/p/1BHstqhmeU/",
  },
  {
    quote:
      "Bén duyên với một chiếc nhẫn ngọc của MJADE, đến nay nó đã thành “vật bất ly thân” trong rất nhiều hành trình làm nghề của mình.",
    name: "Bích Tuyền",
    role: "MC / Voice Talent",
    source: "https://www.facebook.com/share/p/18qZxXshT3/",
  },
  {
    quote:
      "Sau khi đi khắp Sài Gòn, mình dừng lại ở MJADE — nơi đủ uy tín để đặt trọn niềm tin: 100% ngọc Myanmar, không gia nhiệt, không tẩm keo, kèm kiểm định rõ ràng.",
    name: "Chị Kim",
    role: null,
    source: "https://www.facebook.com/share/p/1BpP6NZsiX/",
  },
];
