import raw from "@/content/products.json";

export type ProductCategory =
  | "vong-ban"
  | "vong-tay"
  | "nhan"
  | "mat-day-chuyen"
  | "day-chuyen"
  | "hoa-tai";

export type Availability =
  | "con-hang"
  | "chi-con-1"
  | "da-dat-truoc"
  | "da-ban"
  | "lien-he";

export type JadeColor = "xanh-luc" | "xanh-dam" | "xanh-nhat" | "trang" | "lavender";

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  productCode: string;
  category: ProductCategory;
  collection: "signature" | "limited";
  priceVnd: number | null; // null = liên hệ tư vấn
  availability: Availability;
  stockQuantity: number | null;
  limited: boolean;
  featured: boolean;
  images: string[];
  thumbnail: string;
  imageAlt: string;
  /** true khi ảnh hiện tại là ảnh stock tạm, chưa phải ảnh sản phẩm thật */
  imageIsTemporary: boolean;
  jadeType: "Jadeite Type A" | null;
  origin: string | null;
  color: JadeColor | null;
  colorLabel: string | null;
  translucency: string | null;
  texture: string | null;
  dimensions: string | null;
  weight: string | null;
  metal: string | null;
  certificateAvailable: boolean;
  certificateIssuer: string | null;
  certificateNumber: string | null;
  certificateImage: string | null;
  certificatePdf: string | null;
  certificateVerificationUrl: string | null;
  shortDescription: string;
  story: string;
  careInstructions: string[];
  shippingNotes: string;
  seoTitle: string;
  seoDescription: string;
};

export const categoryLabels: Record<ProductCategory, string> = {
  "vong-ban": "Vòng bản",
  "vong-tay": "Vòng tay",
  nhan: "Nhẫn",
  "mat-day-chuyen": "Mặt dây chuyền",
  "day-chuyen": "Dây chuyền",
  "hoa-tai": "Hoa tai",
};

export const availabilityLabels: Record<Availability, string> = {
  "con-hang": "Còn hàng",
  "chi-con-1": "Chỉ còn 1",
  "da-dat-truoc": "Đã đặt trước",
  "da-ban": "Đã bán",
  "lien-he": "Liên hệ tư vấn",
};

export const colorLabels: Record<JadeColor, string> = {
  "xanh-luc": "Xanh lục",
  "xanh-dam": "Xanh đậm",
  "xanh-nhat": "Xanh nhạt",
  trang: "Trắng",
  lavender: "Tím lavender",
};

/**
 * Nguồn dữ liệu: `content/products.json` — chỉnh sửa được qua trang /admin.
 * Giữ nguyên kiểu Product để toàn bộ component không phải thay đổi.
 */
export const products = raw.products as Product[];

export const featuredProducts = products.filter((p) => p.featured);
export const limitedProducts = products.filter((p) => p.limited);

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(p: Product): string {
  if (p.priceVnd == null) return "Liên hệ tư vấn";
  return new Intl.NumberFormat("vi-VN").format(p.priceVnd) + " ₫";
}

/** Dùng cho image strip trang chủ (limited collection) */
export const limitedPieces = limitedProducts.map((p) => ({
  id: p.id,
  slug: p.slug,
  image: p.thumbnail,
  imageAlt: p.imageAlt,
}));
