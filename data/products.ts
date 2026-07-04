export type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  imageAlt: string;
};

export const featuredProducts: Product[] = [
  {
    id: "mat-day-chuyen-ngoc-phi-thuy",
    name: "Mặt dây chuyền\nNgọc phỉ thúy",
    price: "28.900.000 ₫",
    image: "/images/home/featured-pendant.jpg",
    imageAlt: "Mặt dây chuyền đá quý xanh lục bọc bạc đính đá trên nền xanh rêu",
  },
  {
    id: "nhan-ngoc-phi-thuy-vang-trang",
    name: "Nhẫn ngọc phỉ thúy\nbọc vàng trắng",
    price: "32.500.000 ₫",
    image: "/images/home/featured-ring.jpg",
    imageAlt: "Bộ sưu tập nhẫn ngọc phỉ thúy xanh đậm trên nền lông trắng ngà",
  },
  {
    id: "hoa-tai-ngoc-phi-thuy-vang-18k",
    name: "Hoa tai ngọc phỉ thúy\nvàng 18K",
    price: "24.800.000 ₫",
    image: "/images/home/featured-earrings.jpg",
    imageAlt: "Đôi hoa tai đá xanh lục đính đá trắng trên đôn gốm màu ngà",
  },
  {
    id: "lac-tay-ngoc-phi-thuy-thiet-ke-rieng",
    name: "Lắc tay ngọc phỉ thúy\nthiết kế riêng",
    price: "36.900.000 ₫",
    image: "/images/home/featured-bracelet.jpg",
    imageAlt: "Vòng tay hạt đá xanh lục đặt trên khối đá trắng, nền vải màu ghi ấm",
  },
];

export type LimitedPiece = {
  id: string;
  image: string;
  imageAlt: string;
};

export const limitedPieces: LimitedPiece[] = [
  {
    id: "limited-pendant",
    image: "/images/home/limited-pendant.jpg",
    imageAlt: "Mặt dây chuyền đá xanh lục bọc bạc đặt trên đĩa đá màu kem",
  },
  {
    id: "limited-ring",
    image: "/images/home/limited-ring.jpg",
    imageAlt: "Cận cảnh nhẫn đính đá xanh lục trên nền vàng ngà",
  },
  {
    id: "limited-earrings",
    image: "/images/home/limited-earrings.jpg",
    imageAlt: "Bàn tay đeo nhẫn ngọc phỉ thúy chạm nhẹ lên vai áo lụa thêu hoa",
  },
  {
    id: "limited-bangle",
    image: "/images/home/limited-bangle.jpg",
    imageAlt: "Những viên ngọc xanh lục được mài bóng trên nền trắng ngà",
  },
];
