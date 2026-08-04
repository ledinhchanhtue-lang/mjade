import raw from "@/content/site.json";

export type Store = { city: string; address: string };

export type Site = {
  name: string;
  url: string;
  brandLine: string;
  tagline: string;
  essence: string;
  descriptor: string;
  description: string;
  email: string;
  phone: string;
  logo: { emblem: string; full: string };
  stores: Store[];
  consultChannels: string[];
  shippingDestinations: string[];
  /** Kiểu chữ toàn website — chọn qua /admin. Thiếu = "classic". */
  fontPreset?: string;
  /** Tông màu thanh header — "ivory" (mặc định) hoặc "jade". */
  headerTheme?: string;
  /** Tông màu footer — "ivory" (mặc định) hoặc "jade". */
  footerTheme?: string;
  /** Link trang/Messenger Facebook cho nút chat nổi. Trống = ẩn nút. */
  facebookUrl?: string;
  /** Số điện thoại Zalo cho nút chat nổi. Trống = ẩn nút. */
  zaloPhone?: string;
  /** Email nhận đơn hàng — sửa được trong /admin. */
  orderEmail?: string;
  /** Nhãn nút & tiêu đề khu vực mua hàng — sửa được trong /admin. */
  commerce?: {
    addLabel?: string;
    inCartLabel?: string;
    checkoutTitle?: string;
    checkoutIntro?: string;
    checkoutButton?: string;
    successTitle?: string;
    successBody?: string;
    /** Thông tin thanh toán — chuyển khoản. */
    bankHolder?: string;
    bankNumber?: string;
    bankName?: string;
  };
};

/** Nguồn dữ liệu: `content/site.json` — chỉnh sửa được qua trang /admin. */
export const site = raw as Site;

export type ConsultChannel = string;
