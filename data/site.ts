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
};

/** Nguồn dữ liệu: `content/site.json` — chỉnh sửa được qua trang /admin. */
export const site = raw as Site;

export type ConsultChannel = string;
