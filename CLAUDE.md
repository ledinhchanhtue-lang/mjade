@AGENTS.md

# MJADE — Tài liệu dự án cho Claude Code

> File này là "bộ nhớ" của dự án: lịch sử, kiến trúc, quy ước và việc còn dang dở.
> Đọc kỹ trước khi sửa code. Cập nhật file này khi có thay đổi lớn.

---

## 1. Dự án là gì

Website e-commerce **trang sức ngọc phỉ thúy (jadeite) Myanmar Type A 100%** cho thương hiệu MJADE.

- **Khách hàng mục tiêu:** phụ nữ Việt 30–45 tuổi thành đạt, Việt kiều (Mỹ/Canada/Úc/EU/Đông Á), trung lưu và cận cao cấp.
- **Định vị:** thương hiệu ngọc TUYỂN CHỌN + tư vấn cá nhân hóa — KHÔNG phải cửa hàng trang sức phổ thông.
- **USP bắt buộc thể hiện:** Type A 100% tự nhiên · không qua trung gian · bao kiểm định · nguồn gốc minh bạch · mỗi viên ngọc một câu chuyện · bộ sưu tập giới hạn · tư vấn riêng · giao hàng quốc tế.

### Link quan trọng
| Gì | Đâu |
|---|---|
| Production | https://mjade.vercel.app |
| GitHub repo | https://github.com/ledinhchanhtue-lang/mjade (branch `main`, auto-deploy khi push) |
| Vercel project | tuele-s-projects/mjade (account `ledinhchanhtue-5572`) |

---

## 2. Nguyên tắc thiết kế BẤT DI BẤT DỊCH

Đã được client duyệt — **không tự ý đổi hướng**:

- **"Quiet luxury"**: editorial, nữ tính, nhẹ nhàng, nhiều khoảng trắng. KHÔNG dark theme, KHÔNG dashboard, KHÔNG gradient lòe loẹt, KHÔNG glassmorphism, KHÔNG bo góc lớn (max 2–4px), KHÔNG shadow đậm, KHÔNG animation bay nhảy.
- **Palette** (định nghĩa trong `app/globals.css`): nền ivory `#F7F5EE`, beige ấm `#EDE7D9`, jade nhạt `#C8DCC9`, jade vừa `#8FB69A`, jade đậm `#3E5A46`, chữ chính `#2E332D`, chữ phụ `#6F736C`, border `#DED9CF`, trắng ấm `#FFFDF9`, accent vàng đồng `#C7B28E`. Tỷ lệ ~65% ivory / 20% beige / 10% jade / 5% accent.
- **Typography:** heading = Playfair Display (400–600, italic cho dòng nhấn); body/nav = Montserrat (400–600). Eyebrow 11–12px uppercase tracking 0.14em. Nav 11px. Body 13–15px. Cả hai font load subset `vietnamese` qua `next/font/google` trong `app/layout.tsx`.
- **Motion:** chỉ fade-up 12–18px (component `Reveal`), image scale ≤1.025, arrow dịch 4px, duration 450–700ms, tôn trọng `prefers-reduced-motion` (đã set global trong globals.css).
- **Ảnh:** jade là màu mạnh duy nhất, nền ivory/beige, ánh sáng ấm. KHÔNG ảnh Pinterest / ảnh thương hiệu khác / hotlink. Tất cả ảnh local trong `public/images/`.
- **Trung thực tuyệt đối:** KHÔNG bịa tên lab kiểm định, số chứng thư, số đo sản phẩm, countdown giả, "chỉ còn 1 chiếc duy nhất trên đời" không căn cứ. Field thiếu dữ liệu = `null` và không render. Ý nghĩa tâm linh của ngọc chỉ trình bày là giá trị văn hóa/niềm tin, không phải công dụng khoa học.

---

## 3. Tech stack & lệnh

- **Next.js 16.2.10** (App Router, Turbopack) + **React 19** + **TypeScript strict** + **Tailwind CSS v4** (tokens qua `@theme inline` trong globals.css, KHÔNG có tailwind.config) + **lucide-react** + **sharp**.
- Path alias `@/*` → root. Không có thư mục `src/`.

```bash
npm run dev          # dev server (cổng 3000) — hoặc dùng preview_start "mjade-dev" (.claude/launch.json)
npm run lint         # eslint
npx tsc --noEmit     # typecheck
npm run build        # production build
git push             # => Vercel tự deploy production
```

⚠️ **Lưu ý môi trường Windows:** repo này nằm trong đường dẫn có dấu tiếng Việt (`D:\Công việc\MJade`) — luôn quote đường dẫn trong lệnh shell. Warning CRLF khi git add là bình thường, bỏ qua.

⚠️ **lucide-react v1.23**: KHÔNG có icon `Facebook`/`Instagram`/`Youtube` — dùng SVG tự vẽ trong `components/ui/SocialIcons.tsx`.

---

## 4. Kiến trúc code

### Data layer (`data/`) — nguồn sự thật duy nhất, không hardcode nội dung trong component
| File | Chứa gì |
|---|---|
| `products.ts` | **Product model đầy đủ** (8 sản phẩm: 4 signature + 4 limited), types, labels, `formatPrice()`, `getProduct()`. Có các field certificate (certificateAvailable/Issuer/Number/Image/Pdf/VerificationUrl) và `imageIsTemporary` đánh dấu ảnh stock tạm. |
| `navigation.ts` | Menu chính 7 mục |
| `footer.ts` | 3 cột link footer + social links |
| `site.ts` | Tên, URL, email, kênh tư vấn, danh sách quốc gia giao hàng |
| `services.ts` | 5 USP hero (trustPoints), 2 service panel, checklist kiểm định trang chủ |
| `faq.ts` | FAQ chung + FAQ kiểm định |
| `education.ts` | Nội dung trang /ngoc-phi-thuy (11 section + culturalNote) |
| `articles.ts` | 4 bài viết (3 cẩm nang + 1 tin tức) render ở /tin-tuc và /cam-nang-ngoc |
| `policies.ts` | Hướng dẫn mua hàng, bảo hành, đổi trả, giao hàng quốc tế |

### Components
- `components/ui/` — SectionLabel, EditorialButton (primary/text), Reveal (IntersectionObserver fade-up), PageHeader (header editorial mọi trang con), Prose (render PolicySection[]), Breadcrumbs, FaqList (details/summary), ArticleCard, SocialIcons.
- `components/layout/` — Header (client: sticky, active nav, cart badge, search link, ĐÃ GỠ selector tiền tệ/ngôn ngữ vì chưa hỗ trợ thật), MobileMenu (focus trap, Escape, khóa scroll), Footer (accordion mobile bằng `<details>`).
- `components/home/` — Hero, TrustItem, FeaturedCollection, ProductCard (nhận `product: Product`, link tới detail), ServicePanel, StoryCertification, LimitedCollection, Newsletter (client, gọi API).
- `components/product/` — AvailabilityBadge, CertificateBlock (chỉ render field có thật, placeholder trung thực khi chưa có chứng thư), AddToCartButton (ẩn khi đã bán/đặt trước), CollectionBrowser (client: filter 7 tiêu chí + sort 4 kiểu + bottom sheet mobile).
- `components/forms/` — ConsultForm (validation đầy đủ + states), CertLookup (UI tra cứu, backend chưa nối — trả hướng dẫn thật, không kết quả giả).
- `components/cart/` — CartProvider (context + localStorage key `mjade-cart-v1`, bọc toàn app trong layout), CartPageClient (danh sách + form gửi yêu cầu đặt giữ).
- `components/search/` — SearchClient (tìm không dấu — hàm `normalize()` strip diacritics).

### API routes (`app/api/`) — pattern "webhook forward"
`consult`, `newsletter`, `reserve` — validate server-side rồi POST tới webhook cấu hình qua env (`lib/forward.ts`). **Chưa có webhook thì log ra console với prefix `[MJADE:kind]`** (xem được trong Vercel Functions log) — không mất lead. Xem `.env.example`.

### Mô hình thương mại: KHÔNG thanh toán online
Cart = "danh sách đặt giữ". CTA là "GỬI YÊU CẦU ĐẶT GIỮ" / "ĐẶT LỊCH XEM NGỌC" / "NHẬN TƯ VẤN RIÊNG". Đừng thêm nút mua/thanh toán khi chưa có hệ thống thật.

### SEO
Metadata + canonical từng trang; `app/sitemap.ts`, `app/robots.ts` (chặn /api, /gio-hang, /tim-kiem); JSON-LD: Organization (layout), Product + BreadcrumbList (product detail), Article (bài viết), FAQPage (/cau-hoi-thuong-gap, /ngoc-phi-thuy). Chỉ đưa vào schema giá trị có thật.

---

## 5. Toàn bộ routes (23, tất cả 200)

`/` · `/bo-suu-tap` · `/bo-suu-tap-gioi-han` · `/san-pham/[slug]` (8 SSG) · `/ve-mjade` · `/ngoc-phi-thuy` · `/kiem-dinh` · `/cau-chuyen` · `/lien-he-tu-van` (nhận `?sp=MÃ-SP` để pre-select sản phẩm) · `/giao-hang-quoc-te` · `/tin-tuc` · `/tin-tuc/[slug]` (4 SSG) · `/cam-nang-ngoc` · `/huong-dan-mua-hang` · `/chinh-sach-bao-hanh` · `/chinh-sach-doi-tra` · `/cau-hoi-thuong-gap` · `/tim-kiem` (`?q=`) · `/gio-hang` · `/api/consult|newsletter|reserve` · `/sitemap.xml` · `/robots.txt` · 404 page riêng.

---

## 6. Hệ ảnh — trạng thái & quy trình thay

**Chi tiết từng file trong `ASSET-MANIFEST.md` (luôn cập nhật file đó khi đụng vào ảnh).**

Tóm tắt: toàn bộ ảnh hiện tại là **stock Pexels có giấy phép** (ID ghi trong manifest), xử lý qua sharp → WebP, đồng bộ 4:5 (sản phẩm) / 1:1 (limited) / 2200×1500 (hero). Chúng đúng TÔNG nhưng **chưa phải sản phẩm MJADE thật** — `imageIsTemporary: true` trong products.ts và có dòng ghi chú minh bạch trên trang product detail.

**Cần thay sớm nhất (P0):** `certificate.svg` (chờ chứng thư thật — TUYỆT ĐỐI không dựng giả), `limited-pendant.webp` (nền xanh rêu lệch palette), `limited-bangle.webp` (đang là nhẫn bản jade, chưa phải vòng bản đeo tay), hero (cần buổi chụp thật: người mẫu VN 32–45t bên phải khung, 1 mặt dây + 1 nhẫn + hoa tai nhỏ, áo lụa ivory).

**Quy trình thay ảnh thật:** ghi đè đúng tên file (giữ tỷ lệ) → sửa `imageAlt` + set `imageIsTemporary: false` trong products.ts → cập nhật ASSET-MANIFEST.md.

**Script xử lý ảnh:** dùng sharp qua script node tạm (mẫu ở scratchpad phase 2 — resize/crop/webp q82). Chạy script từ TRONG thư mục dự án để resolve được sharp.

---

## 7. Lịch sử các phase

### Phase 1 (2026-07-04): Trang chủ + deploy
- Scaffold create-next-app (phải scaffold ở temp dir vì tên thư mục "MJade" viết hoa bị npm từ chối, rồi copy về).
- Dựng design tokens, trang chủ 6 section theo ảnh reference client gửi, đủ QA (lint/type/build/responsive).
- Deploy: tạo repo GitHub qua `gh` (user auth device-flow `gh auth login` — mã nhập tại github.com/login/device), `vercel link --project mjade` (tên thư mục viết hoa+dấu cách bị Vercel từ chối nên phải chỉ định `--project`), `vercel git connect`, deploy prod. Từ đó `git push` = auto deploy.

### Phase 2 (2026-07-04): Production hoàn chỉnh
- Thay toàn bộ hệ ảnh theo art direction chuẩn (bỏ hero glamour/bridal, đồng bộ product cards, crop smartwatch khỏi ảnh inspection bằng sharp extract).
- 18 route mới + product detail + form tư vấn/newsletter/đặt giữ hoạt động thật + search + SEO đầy đủ (chi tiết như mục 4–5).
- Commit `9852ba7`.

### Phase 3 (2026-07-06): Tích hợp tài nguyên thật của client
Client gửi Google Sheet tài nguyên (link Drive lookbook/ảnh sản phẩm + Branding Guideline + info sản phẩm + size chart + 4 feedback KH). Đọc qua WebFetch/curl (Drive folder enumerate được bằng cách bóc file ID 33-char từ HTML rồi tải qua `drive.usercontent.google.com/download?id=…`).
- **Nội dung brand THẬT** thay copy placeholder: định vị "Low-key Luxury / Tỉnh thức", tagline **"Meet your Inner Jade — Đánh thức viên ngọc trong bạn"**, essence "Vẻ đẹp thật sự là ánh sáng lấp lánh bên trong chính bạn". Sửa `data/site.ts`, `Hero.tsx`, `StoryCertification.tsx`, `app/cau-chuyen`, `app/ve-mjade` (Tầm nhìn/Sứ mệnh/Lời hứa nguyên văn client), `data/education.ts` (thêm Imperial Jade + chủng Băng Chủng/Lão Khanh Chủng).
- **Ảnh MJADE THẬT** (16 file) thay hero + 2 editorial banner + home story + 6/8 ảnh sản phẩm. Xử lý sharp từ lookbook 01 + folder sản phẩm 04/05. Đã set `imageIsTemporary: false` + `metal: null` cho món ngọc nguyên khối (ảnh không có đế kim loại). Chi tiết ASSET-MANIFEST.md.
- **Chưa xử lý:** ảnh 2 SP hoa tai (chưa có ảnh product-only sạch → giữ stock tạm); testimonial (feedback FB nói về công dụng làm đẹp da — KHÔNG bịa trích dẫn, chờ text client duyệt); info-sản-phẩm PDF (scan ảnh, chưa OCR).

### Việc CHƯA làm / cần client xác nhận
1. **Từ MJADE:** giá thật (hiện `priceVnd` là số đặt tạm), ảnh 2 SP hoa tai, chứng thư thật + tên lab, email/SĐT/Zalo thật (đang là `lienhe@mjade.vn` placeholder trong `data/site.ts`), địa chỉ showroom, text testimonial duyệt để đăng, duyệt pháp lý nội dung chính sách.
2. **Kỹ thuật còn mở:** webhook thật cho 3 form (điền env trên Vercel dashboard rồi redeploy) · tiếng Anh + USD (CHỈ làm khi có bản dịch/bảng giá thật — đó là lý do selector bị gỡ) · backend tra cứu chứng thư (CertLookup đã có UI + chỗ nối API) · Lighthouse audit chưa chạy chính thức · ảnh reference gốc cần lưu tay vào `public/reference/mjade-homepage-reference.png`.

---

## 8. Quy ước khi làm việc tiếp

- Nội dung mới → thêm vào `data/*.ts`, không hardcode trong page/component.
- Trang editorial mới → dùng PageHeader + Prose/FaqList cho đồng bộ.
- Luôn chạy `npx tsc --noEmit && npm run lint && npm run build` trước khi push (push = deploy thẳng production).
- Server component mặc định; chỉ `"use client"` khi có state/effect thật sự.
- Alt text tiếng Việt mô tả ĐÚNG nội dung ảnh (kể cả khi ảnh là stock tạm).
- Giữ giọng copy: điềm tĩnh, hiểu biết, nữ tính, không thổi phồng, không giật gân, xưng "MJADE" và gọi khách là "bạn".
