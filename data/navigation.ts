import raw from "@/content/navigation.json";

export type NavItem = {
  label: string;
  href: string;
};

/** Nguồn dữ liệu: `content/navigation.json` — chỉnh sửa được qua trang /admin. */
export const navigation = raw.navigation as NavItem[];
