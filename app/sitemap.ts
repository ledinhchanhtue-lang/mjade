import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { articles } from "@/data/articles";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/bo-suu-tap",
    "/bo-suu-tap-gioi-han",
    "/ve-mjade",
    "/ngoc-phi-thuy",
    "/kiem-dinh",
    "/cau-chuyen",
    "/showroom",
    "/lien-he-tu-van",
    "/giao-hang-quoc-te",
    "/tin-tuc",
    "/cam-nang-ngoc",
    "/huong-dan-mua-hang",
    "/chinh-sach-bao-hanh",
    "/chinh-sach-doi-tra",
    "/cau-hoi-thuong-gap",
  ].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const productRoutes = products.map((p) => ({
    url: `${site.url}/san-pham/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const articleRoutes = articles.map((a) => ({
    url: `${site.url}/tin-tuc/${a.slug}`,
    lastModified: a.date,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...productRoutes, ...articleRoutes];
}
