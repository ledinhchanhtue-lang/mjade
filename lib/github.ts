/**
 * Lớp ghi file vào GitHub (Git-based CMS).
 * Admin lưu -> commit vào repo -> Vercel tự deploy -> site cập nhật (~1 phút).
 *
 * Env cần có (đặt trên Vercel → Settings → Environment Variables):
 *   GITHUB_TOKEN   Personal Access Token (fine-grained, quyền Contents: Read and write)
 *   GITHUB_REPO    dạng "owner/repo", ví dụ "ledinhchanhtue-lang/mjade"
 *   GITHUB_BRANCH  mặc định "main"
 */

const API = "https://api.github.com";

export function githubConfigured(): boolean {
  return Boolean(process.env.GITHUB_TOKEN && process.env.GITHUB_REPO);
}

function cfg() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";
  if (!token || !repo) throw new Error("Chưa cấu hình GITHUB_TOKEN / GITHUB_REPO");
  return { token, repo, branch };
}

function headers(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
  };
}

/** Lấy nội dung file text từ GitHub (nguồn sự thật mới nhất). null nếu chưa có. */
export async function getTextFile(path: string): Promise<{ text: string; sha: string } | null> {
  const { token, repo, branch } = cfg();
  const r = await fetch(
    `${API}/repos/${repo}/contents/${encodeURI(path)}?ref=${encodeURIComponent(branch)}`,
    { headers: headers(token), cache: "no-store" }
  );
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`GitHub GET ${path} lỗi ${r.status}`);
  const j = (await r.json()) as { content: string; sha: string };
  return { text: Buffer.from(j.content, "base64").toString("utf8"), sha: j.sha };
}

async function getSha(path: string): Promise<string | undefined> {
  const { token, repo, branch } = cfg();
  const r = await fetch(
    `${API}/repos/${repo}/contents/${encodeURI(path)}?ref=${encodeURIComponent(branch)}`,
    { headers: headers(token), cache: "no-store" }
  );
  if (r.status === 404) return undefined;
  if (!r.ok) throw new Error(`GitHub SHA ${path} lỗi ${r.status}`);
  const j = (await r.json()) as { sha: string };
  return j.sha;
}

/** Ghi (tạo/ghi đè) một file vào repo bằng 1 commit. */
export async function putFile(opts: {
  path: string;
  contentBase64: string;
  message: string;
}): Promise<{ commit: string }> {
  const { token, repo, branch } = cfg();
  const sha = await getSha(opts.path);
  const r = await fetch(`${API}/repos/${repo}/contents/${encodeURI(opts.path)}`, {
    method: "PUT",
    headers: headers(token),
    body: JSON.stringify({
      message: opts.message,
      content: opts.contentBase64,
      branch,
      ...(sha ? { sha } : {}),
    }),
  });
  if (!r.ok) {
    const t = await r.text();
    throw new Error(`GitHub PUT ${opts.path} lỗi ${r.status}: ${t.slice(0, 200)}`);
  }
  const j = (await r.json()) as { commit?: { sha?: string } };
  return { commit: j.commit?.sha ?? "" };
}
