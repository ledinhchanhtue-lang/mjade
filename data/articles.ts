import raw from "@/content/articles.json";

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: "cam-nang" | "tin-tuc";
  date: string; // ISO
  readingMinutes: number;
  image: string | null;
  sections: { heading: string; body: string[] }[];
};

/** Nguồn dữ liệu: `content/articles.json` — chỉnh sửa được qua trang /admin. */
export const articles = raw.articles as Article[];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export const guideArticles = articles.filter((a) => a.category === "cam-nang");
export const newsArticles = articles;
