import raw from "@/content/home.json";

export type TrustPoint = {
  title: string;
  icon: "gem" | "store" | "badge";
};

export type ServicePanelItem = {
  icon: "user" | "shield";
  title: string;
  description: string;
  linkLabel: string;
  href: string;
};

/** Nguồn dữ liệu: `content/home.json` — chỉnh sửa được qua trang /admin. */
export const trustPoints = raw.trustPoints as TrustPoint[];
export const servicePanels = raw.servicePanels as ServicePanelItem[];
export const certificationChecklist = raw.certificationChecklist as string[];
