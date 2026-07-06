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

const defaultCare = [
  "Tránh va đập mạnh và tiếp xúc với hóa chất tẩy rửa.",
  "Lau nhẹ bằng vải mềm ẩm sau khi sử dụng.",
  "Cất riêng trong hộp lót vải mềm, tránh cọ xát với trang sức khác.",
  "Định kỳ mang đến MJADE để được kiểm tra và làm sạch chuyên sâu.",
];

const defaultShipping =
  "Giao hàng toàn quốc và quốc tế. Đơn hàng quốc tế được tư vấn phương án vận chuyển và bảo hiểm phù hợp trước khi gửi.";

export const products: Product[] = [
  {
    id: "p-001",
    slug: "mat-day-chuyen-ngoc-phi-thuy",
    name: "Mặt dây chuyền Ngọc phỉ thúy",
    shortName: "Mặt dây chuyền\nNgọc phỉ thúy",
    productCode: "MJ-P001",
    category: "mat-day-chuyen",
    collection: "signature",
    priceVnd: 28900000,
    availability: "con-hang",
    stockQuantity: null,
    limited: false,
    featured: true,
    images: ["/images/products/mat-day-chuyen-ngoc-phi-thuy-1.webp"],
    thumbnail: "/images/home/featured-pendant.webp",
    imageAlt: "Chuỗi hạt ngọc phỉ thúy sắc xanh nhạt với mặt dây tròn nhỏ, đặt trên khay vải linen trong nắng ấm",
    imageIsTemporary: false,
    jadeType: "Jadeite Type A",
    origin: "Myanmar",
    color: "xanh-luc",
    colorLabel: "Xanh lục",
    translucency: null,
    texture: null,
    dimensions: null,
    weight: null,
    metal: null,
    certificateAvailable: false,
    certificateIssuer: null,
    certificateNumber: null,
    certificateImage: null,
    certificatePdf: null,
    certificateVerificationUrl: null,
    shortDescription:
      "Mặt dây chuyền ngọc phỉ thúy dáng giọt thanh mảnh, tôn nét dịu dàng cho vùng cổ.",
    story:
      "Viên ngọc được tuyển chọn vì sắc xanh trong trẻo và độ đồng đều hiếm gặp. Thiết kế tối giản để chính viên ngọc là điểm nhấn duy nhất — phù hợp cả trang phục công sở lẫn áo dài trong những dịp trang trọng.",
    careInstructions: defaultCare,
    shippingNotes: defaultShipping,
    seoTitle: "Mặt dây chuyền Ngọc phỉ thúy Myanmar Type A | MJADE",
    seoDescription:
      "Mặt dây chuyền ngọc phỉ thúy Myanmar Type A tuyển chọn, thiết kế thanh mảnh tối giản. Cam kết minh bạch nguồn gốc.",
  },
  {
    id: "p-002",
    slug: "nhan-ngoc-phi-thuy-boc-vang-trang",
    name: "Nhẫn ngọc phỉ thúy nguyên khối",
    shortName: "Nhẫn ngọc phỉ thúy\nnguyên khối",
    productCode: "MJ-R002",
    category: "nhan",
    collection: "signature",
    priceVnd: 32500000,
    availability: "chi-con-1",
    stockQuantity: 1,
    limited: false,
    featured: true,
    images: ["/images/products/nhan-ngoc-phi-thuy-boc-vang-trang-1.webp"],
    thumbnail: "/images/home/featured-ring.webp",
    imageAlt: "Ba chiếc nhẫn ngọc phỉ thúy nguyên khối sắc xanh nhạt gác trên cành hoa mảnh, nền ngà",
    imageIsTemporary: false,
    jadeType: "Jadeite Type A",
    origin: "Myanmar",
    color: "xanh-nhat",
    colorLabel: "Xanh nhạt",
    translucency: null,
    texture: null,
    dimensions: null,
    weight: null,
    metal: null,
    certificateAvailable: false,
    certificateIssuer: null,
    certificateNumber: null,
    certificateImage: null,
    certificatePdf: null,
    certificateVerificationUrl: null,
    shortDescription:
      "Nhẫn ngọc phỉ thúy nguyên khối, phom tròn trơn tối giản để chính chất ngọc lên tiếng.",
    story:
      "Nhẫn được chế tác từ một khối ngọc nguyên vẹn, không đế kim loại — dạng chế tác đòi hỏi chất ngọc thật sự bền và đều. Dáng trơn trầm tĩnh gợi sự vững vàng, được nhiều khách hàng chọn làm quà tự thưởng cho một cột mốc riêng.",
    careInstructions: defaultCare,
    shippingNotes: defaultShipping,
    seoTitle: "Nhẫn Ngọc phỉ thúy nguyên khối Myanmar Type A | MJADE",
    seoDescription:
      "Nhẫn ngọc phỉ thúy Myanmar Type A nguyên khối, phom tròn trơn tối giản. Chỉ còn một chiếc. Tư vấn riêng và giao hàng quốc tế.",
  },
  {
    id: "p-003",
    slug: "hoa-tai-ngoc-phi-thuy-vang-18k",
    name: "Hoa tai ngọc phỉ thúy vàng 18K",
    shortName: "Hoa tai ngọc phỉ thúy\nvàng 18K",
    productCode: "MJ-E003",
    category: "hoa-tai",
    collection: "signature",
    priceVnd: 24800000,
    availability: "con-hang",
    stockQuantity: null,
    limited: false,
    featured: true,
    images: ["/images/products/hoa-tai-ngoc-phi-thuy-vang-18k-1.webp"],
    thumbnail: "/images/home/featured-earrings.webp",
    imageAlt: "Đôi hoa tai đá xanh lục đính đá trắng trên đôn gốm màu ngà",
    imageIsTemporary: true,
    jadeType: "Jadeite Type A",
    origin: "Myanmar",
    color: "xanh-luc",
    colorLabel: "Xanh lục",
    translucency: null,
    texture: null,
    dimensions: null,
    weight: null,
    metal: "Vàng 18K",
    certificateAvailable: false,
    certificateIssuer: null,
    certificateNumber: null,
    certificateImage: null,
    certificatePdf: null,
    certificateVerificationUrl: null,
    shortDescription:
      "Đôi hoa tai ngọc phỉ thúy nhỏ xinh, chuyển động nhẹ theo từng bước đi.",
    story:
      "Hai viên ngọc được chọn cùng một mạch đá để sắc độ tiệp nhau khi đeo. Kiểu dáng thả ngắn giúp khuôn mặt mềm mại mà không phô trương — điểm nhấn tinh tế cho cả ngày dài.",
    careInstructions: defaultCare,
    shippingNotes: defaultShipping,
    seoTitle: "Hoa tai Ngọc phỉ thúy vàng 18K | MJADE",
    seoDescription:
      "Hoa tai ngọc phỉ thúy Myanmar Type A vàng 18K, hai viên tiệp sắc từ cùng mạch đá. Bao kiểm định.",
  },
  {
    id: "p-004",
    slug: "lac-tay-ngoc-phi-thuy-thiet-ke-rieng",
    name: "Lắc tay ngọc phỉ thúy thiết kế riêng",
    shortName: "Lắc tay ngọc phỉ thúy\nthiết kế riêng",
    productCode: "MJ-B004",
    category: "vong-tay",
    collection: "signature",
    priceVnd: 36900000,
    availability: "lien-he",
    stockQuantity: null,
    limited: false,
    featured: true,
    images: ["/images/products/lac-tay-ngoc-phi-thuy-thiet-ke-rieng-1.webp"],
    thumbnail: "/images/home/featured-bracelet.webp",
    imageAlt: "Lắc tay kết từ những hạt ngọc phỉ thúy tròn sắc xanh nhạt, đeo trên cổ tay áo lụa trắng",
    imageIsTemporary: false,
    jadeType: "Jadeite Type A",
    origin: "Myanmar",
    color: "xanh-luc",
    colorLabel: "Xanh lục",
    translucency: null,
    texture: null,
    dimensions: null,
    weight: null,
    metal: null,
    certificateAvailable: false,
    certificateIssuer: null,
    certificateNumber: null,
    certificateImage: null,
    certificatePdf: null,
    certificateVerificationUrl: null,
    shortDescription:
      "Lắc tay kết từ những hạt ngọc phỉ thúy tuyển chọn, có thể điều chỉnh theo cổ tay.",
    story:
      "Mỗi hạt ngọc trên lắc được chọn thủ công để giữ dải sắc xanh chuyển tự nhiên. Dịch vụ thiết kế riêng cho phép điều chỉnh số hạt, charm và kích thước theo cổ tay của bạn.",
    careInstructions: defaultCare,
    shippingNotes: defaultShipping,
    seoTitle: "Lắc tay Ngọc phỉ thúy thiết kế riêng | MJADE",
    seoDescription:
      "Lắc tay ngọc phỉ thúy Myanmar Type A thiết kế riêng theo cổ tay. Tư vấn cá nhân hóa cùng chuyên gia MJADE.",
  },
  {
    id: "p-101",
    slug: "mat-day-chuyen-gioi-han",
    name: "Mặt dây chuyền Ngọc phỉ thúy — Bộ sưu tập giới hạn",
    shortName: "Mặt dây chuyền\ngiới hạn",
    productCode: "MJ-L101",
    category: "mat-day-chuyen",
    collection: "limited",
    priceVnd: null,
    availability: "lien-he",
    stockQuantity: 1,
    limited: true,
    featured: false,
    images: ["/images/products/mat-day-chuyen-gioi-han-1.webp"],
    thumbnail: "/images/home/limited-pendant.webp",
    imageAlt: "Chuỗi hạt ngọc phỉ thúy sắc xanh lục vắt trên phiến lá xanh, nền ngà",
    imageIsTemporary: false,
    jadeType: "Jadeite Type A",
    origin: "Myanmar",
    color: "xanh-dam",
    colorLabel: "Xanh đậm",
    translucency: null,
    texture: null,
    dimensions: null,
    weight: null,
    metal: null,
    certificateAvailable: false,
    certificateIssuer: null,
    certificateNumber: null,
    certificateImage: null,
    certificatePdf: null,
    certificateVerificationUrl: null,
    shortDescription:
      "Thiết kế độc bản trong bộ sưu tập giới hạn, dành cho người tìm một dấu ấn riêng.",
    story:
      "Viên ngọc chủ của thiết kế này có sắc độ và vân đá không lặp lại. Vì vậy chiếc mặt dây chuyền chỉ được chế tác một lần — khi đã có chủ nhân, thiết kế không được sản xuất lại.",
    careInstructions: defaultCare,
    shippingNotes: defaultShipping,
    seoTitle: "Mặt dây chuyền Ngọc phỉ thúy giới hạn | MJADE",
    seoDescription:
      "Mặt dây chuyền ngọc phỉ thúy độc bản thuộc bộ sưu tập giới hạn MJADE. Liên hệ tư vấn riêng.",
  },
  {
    id: "p-102",
    slug: "nhan-ngoc-gioi-han",
    name: "Nhẫn Ngọc phỉ thúy — Bộ sưu tập giới hạn",
    shortName: "Nhẫn ngọc\ngiới hạn",
    productCode: "MJ-L102",
    category: "nhan",
    collection: "limited",
    priceVnd: null,
    availability: "da-dat-truoc",
    stockQuantity: 1,
    limited: true,
    featured: false,
    images: ["/images/products/nhan-ngoc-gioi-han-1.webp"],
    thumbnail: "/images/home/limited-ring.webp",
    imageAlt: "Hai chiếc nhẫn ngọc phỉ thúy nguyên khối tựa trên một bông tulip trắng, nền ngà",
    imageIsTemporary: false,
    jadeType: "Jadeite Type A",
    origin: "Myanmar",
    color: "xanh-luc",
    colorLabel: "Xanh lục",
    translucency: null,
    texture: null,
    dimensions: null,
    weight: null,
    metal: null,
    certificateAvailable: false,
    certificateIssuer: null,
    certificateNumber: null,
    certificateImage: null,
    certificatePdf: null,
    certificateVerificationUrl: null,
    shortDescription: "Nhẫn ngọc độc bản, hiện đã có khách đặt trước.",
    story:
      "Thiết kế lấy cảm hứng từ những khu vườn buổi sớm — cụm ngọc nhỏ xếp tự nhiên như giọt sương trên lá. Sản phẩm hiện đã được đặt trước; bạn có thể đăng ký tư vấn để nhận thông tin về những thiết kế tương tự.",
    careInstructions: defaultCare,
    shippingNotes: defaultShipping,
    seoTitle: "Nhẫn Ngọc phỉ thúy giới hạn | MJADE",
    seoDescription:
      "Nhẫn ngọc phỉ thúy độc bản thuộc bộ sưu tập giới hạn MJADE. Đăng ký tư vấn thiết kế tương tự.",
  },
  {
    id: "p-103",
    slug: "hoa-tai-ngoc-gioi-han",
    name: "Hoa tai Ngọc phỉ thúy — Bộ sưu tập giới hạn",
    shortName: "Hoa tai ngọc\ngiới hạn",
    productCode: "MJ-L103",
    category: "hoa-tai",
    collection: "limited",
    priceVnd: null,
    availability: "lien-he",
    stockQuantity: 1,
    limited: true,
    featured: false,
    images: ["/images/products/hoa-tai-ngoc-gioi-han-1.webp"],
    thumbnail: "/images/home/limited-earrings.webp",
    imageAlt: "Hoa tai ngọc xanh lục dáng giọt đeo trên tai, ánh sáng tự nhiên",
    imageIsTemporary: true,
    jadeType: "Jadeite Type A",
    origin: "Myanmar",
    color: "xanh-luc",
    colorLabel: "Xanh lục",
    translucency: null,
    texture: null,
    dimensions: null,
    weight: null,
    metal: "Vàng 14K",
    certificateAvailable: false,
    certificateIssuer: null,
    certificateNumber: null,
    certificateImage: null,
    certificatePdf: null,
    certificateVerificationUrl: null,
    shortDescription:
      "Hoa tai ngọc dáng giọt mộc mạc, tôn vẻ tự nhiên của chất ngọc.",
    story:
      "Đôi ngọc giữ dáng giọt nguyên bản với rất ít can thiệp chế tác — dành cho người yêu vẻ đẹp tự nhiên, không cầu kỳ. Chuyển động nhẹ của viên ngọc bắt sáng dịu theo từng nhịp bước.",
    careInstructions: defaultCare,
    shippingNotes: defaultShipping,
    seoTitle: "Hoa tai Ngọc phỉ thúy giới hạn | MJADE",
    seoDescription:
      "Hoa tai ngọc phỉ thúy dáng giọt thuộc bộ sưu tập giới hạn MJADE. Liên hệ tư vấn riêng.",
  },
  {
    id: "p-104",
    slug: "vong-ban-ngoc-gioi-han",
    name: "Vòng bản Ngọc phỉ thúy — Bộ sưu tập giới hạn",
    shortName: "Vòng bản ngọc\ngiới hạn",
    productCode: "MJ-L104",
    category: "vong-ban",
    collection: "limited",
    priceVnd: null,
    availability: "lien-he",
    stockQuantity: null,
    limited: true,
    featured: false,
    images: ["/images/products/vong-ban-ngoc-gioi-han-1.webp"],
    thumbnail: "/images/home/limited-bangle.webp",
    imageAlt: "Vòng bản ngọc phỉ thúy nguyên khối sắc xanh nhạt đặt trên khay gỗ, nắng ấm chiếu qua",
    imageIsTemporary: false,
    jadeType: "Jadeite Type A",
    origin: "Myanmar",
    color: "xanh-nhat",
    colorLabel: "Xanh nhạt",
    translucency: null,
    texture: null,
    dimensions: null,
    weight: null,
    metal: null,
    certificateAvailable: false,
    certificateIssuer: null,
    certificateNumber: null,
    certificateImage: null,
    certificatePdf: null,
    certificateVerificationUrl: null,
    shortDescription:
      "Vòng bản ngọc phỉ thúy nguyên khối — món trang sức truyền thống được yêu thích nhất.",
    story:
      "Vòng bản là dạng chế tác đòi hỏi khối ngọc nguyên vẹn và tay nghề cao nhất: chỉ một đường vân nứt, cả khối ngọc không thể thành vòng. Mỗi chiếc vòng bản vì thế là kết tinh của sự may mắn địa chất và kiên nhẫn của người thợ.",
    careInstructions: defaultCare,
    shippingNotes: defaultShipping,
    seoTitle: "Vòng bản Ngọc phỉ thúy giới hạn | MJADE",
    seoDescription:
      "Vòng bản ngọc phỉ thúy Myanmar Type A nguyên khối, tuyển chọn giới hạn. Đặt lịch xem ngọc cùng MJADE.",
  },
];

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
