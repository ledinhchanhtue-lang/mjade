import fs from "node:fs/promises";
import path from "node:path";
import { githubConfigured, getTextFile, putFile } from "@/lib/github";

/** Chỉ cho phép sửa đúng các file nội dung này. */
export const CONTENT_FILES = [
  "products.json",
  "articles.json",
  "site.json",
  "home.json",
  "testimonials.json",
  "navigation.json",
] as const;

export type ContentFile = (typeof CONTENT_FILES)[number];

export function isContentFile(f: string): f is ContentFile {
  return (CONTENT_FILES as readonly string[]).includes(f);
}

/** Ảnh chỉ được ghi vào public/images/... với đuôi an toàn. */
export function isSafeImagePath(p: string): boolean {
  return (
    /^public\/images\/[A-Za-z0-9/_-]+\.(webp|png|jpg|jpeg)$/.test(p) && !p.includes("..")
  );
}

/** Đọc nội dung: ưu tiên GitHub (mới nhất), fallback file local khi chạy dev. */
export async function readContent(file: ContentFile): Promise<unknown> {
  if (githubConfigured()) {
    const f = await getTextFile(`content/${file}`);
    if (f) return JSON.parse(f.text);
  }
  const local = path.join(process.cwd(), "content", file);
  return JSON.parse(await fs.readFile(local, "utf8"));
}

export type SaveResult = { mode: "github" | "local"; commit?: string };

/** Ghi nội dung: commit lên GitHub nếu đã cấu hình, ngược lại ghi file local (dev). */
export async function writeContent(
  file: ContentFile,
  data: unknown,
  message: string
): Promise<SaveResult> {
  const text = JSON.stringify(data, null, 2) + "\n";
  if (githubConfigured()) {
    const res = await putFile({
      path: `content/${file}`,
      contentBase64: Buffer.from(text, "utf8").toString("base64"),
      message,
    });
    return { mode: "github", commit: res.commit };
  }
  await fs.writeFile(path.join(process.cwd(), "content", file), text, "utf8");
  return { mode: "local" };
}

/** Ghi ảnh (buffer) vào public/images/... */
export async function writeImage(
  repoPath: string,
  buf: Buffer,
  message: string
): Promise<SaveResult> {
  if (githubConfigured()) {
    const res = await putFile({
      path: repoPath,
      contentBase64: buf.toString("base64"),
      message,
    });
    return { mode: "github", commit: res.commit };
  }
  const abs = path.join(process.cwd(), repoPath);
  await fs.mkdir(path.dirname(abs), { recursive: true });
  await fs.writeFile(abs, buf);
  return { mode: "local" };
}
