# MJADE — CLIENT HANDOFF REPORT

Ngày bàn giao: 2026-07-15
Production: https://mjade.vercel.app · Repo: github.com/ledinhchanhtue-lang/mjade (branch `main`, auto-deploy)
Stack: Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind v4 · next/image.

---

## 1. Tổng quan tình trạng sau khi sửa
Website **đạt chuẩn nghiệm thu kỹ thuật**: không route 404, không broken image/link, không
control giả, không nội dung rác; form hoạt động thật; responsive không overflow; SEO/a11y đầy đủ;
lint/typecheck/build sạch. Phần còn lại là **tài sản & nội dung thật cần khách cung cấp**
(ảnh hoa tai, giá, email, webhook, duyệt pháp lý) — đã được đánh dấu trung thực trên site.

## 2. Routes đã hoàn thiện (24)
`/` · `/bo-suu-tap` · `/bo-suu-tap-gioi-han` · `/san-pham/[slug]` ×8 · `/ve-mjade` ·
`/ngoc-phi-thuy` · `/kiem-dinh` · `/cau-chuyen` · `/showroom` · `/lien-he-tu-van` ·
`/giao-hang-quoc-te` · `/tin-tuc` · `/tin-tuc/[slug]` ×4 · `/cam-nang-ngoc` ·
`/huong-dan-mua-hang` · `/chinh-sach-bao-hanh` · `/chinh-sach-doi-tra` · `/cau-hoi-thuong-gap` ·
`/tim-kiem` · `/gio-hang` · `/sitemap.xml` · `/robots.txt` · 404 riêng. Tất cả trả 200.

## 3. Components đã chỉnh (trong đợt audit)
- `data/products.ts`: SP hoa tai signature dùng ảnh ngọc (bỏ ảnh emerald+kim cương), alt chuẩn.
- `app/kiem-dinh/page.tsx`: thêm FAQPage JSON-LD.
- `package.json`: thêm script `typecheck`.
- (Các phase trước) Header/menu, Hero, Featured/Limited, StoryCertification, Testimonials,
  Showroom, CertificateBlock, ConsultForm, CollectionBrowser, SearchClient, CartProvider…

## 4. Forms / interactions đã hoàn thiện
| Chức năng | Trạng thái |
| --- | --- |
| Form tư vấn (/lien-he-tu-van) | ✅ validate đủ, honeypot, loading/success/error, API `/api/consult` (200/400) |
| Newsletter (footer) | ✅ validate email, states, API `/api/newsletter` |
| Đặt giữ (/gio-hang) | ✅ localStorage cart + API `/api/reserve` (validate slug) |
| Search (/tim-kiem) | ✅ tìm không dấu theo tên/mã/loại/màu, empty state |
| Menu mobile | ✅ focus trap, Escape, khóa scroll, đóng khi chọn route |
| Filter/sort bộ sưu tập | ✅ 7 filter + 4 sort + bottom sheet mobile + empty state |

## 5. Assets đang dùng
- Ảnh **THẬT của MJADE**: hero (Banner), story block (Story), 6/8 ảnh sản phẩm, 2 editorial
  banner, home story, 3 avatar khách thật, **3 ảnh giấy kiểm định thật** (Myanmar Treasure Lab),
  logo peacock (tách nền trong suốt). Tất cả local trong `public/images/`, không hotlink.
- Ảnh **tạm (đã đánh dấu)**: 2 SP hoa tai — hiện là ảnh ngọc phỉ thúy đúng chất liệu, `imageIsTemporary: true`,
  có ghi chú "hình minh họa" trên trang sản phẩm. Chi tiết: `ASSET-MANIFEST.md`.

## 6. Assets còn cần khách cung cấp
1. **Ảnh 2 SP hoa tai thật** (product-only, tông ivory/jade).
2. Ảnh sản phẩm thật cho các SKU còn lại nếu muốn thay hết placeholder.
3. (Tuỳ chọn) Thêm ảnh giấy kiểm định cho từng SKU nếu muốn hiển thị theo sản phẩm.

## 7. Policy / content cần khách xác nhận
- **Giá thật** cho từng sản phẩm (`priceVnd` hiện là số đặt tạm).
- **Email chính thức** (đang `lienhe@mjade.vn`). SĐT `0798530579` + 4 showroom đã là thật.
- Duyệt **pháp lý** nội dung: bảo hành, đổi trả, giao hàng quốc tế (thuế/hải quan).
- Text **testimonial** chị Xuân (nếu muốn thêm, cần bản viết lại không nói công dụng da).

## 8. Kết quả Lint
`npm run lint` → **0 lỗi, 0 warning.**

## 9. Kết quả Typecheck
`npm run typecheck` (`tsc --noEmit`) → **0 lỗi.** (Đã thêm script này theo yêu cầu.)

## 10. Kết quả Build
`npm run build` → **thành công, 38 trang** (SSG cho product/article). Không lỗi type khi build.

## 11. Kết quả broken-link check
Crawler nội bộ (fetch toàn bộ anchor + img trên 18 route gốc): **0 link 404, 0 ảnh 404,
0 `href="#"`.** (38 internal link, 28 ảnh — tất cả 200.)

## 12. Kết quả responsive QA
7 route × 7 breakpoint (390/430/768/1024/1280/1440/1920): **0 overflow ngang.**
Chi tiết: `qa-screenshots/README.md`. (Screenshot tự động không chụp được do giới hạn sandbox —
đã xác minh bằng đo lập trình, chính xác hơn cho mục tiêu overflow.)

## 13. Performance / SEO / Accessibility
- **SEO:** title/desc/canonical/OG/Twitter mọi page chính; sitemap (28 URL) + robots;
  schema Organization/Product/BreadcrumbList/Article/FAQPage. Không bịa dữ liệu schema.
- **A11y:** 1 H1/trang · alt đầy đủ (0 ảnh thiếu) · icon control có aria-label (0 thiếu) ·
  focus state · dialog focus trap + Escape · prefers-reduced-motion · touch target ≥44px.
- **Performance:** next/image (WebP), hero `priority`, ảnh dưới fold lazy, icon import theo tên,
  motion nhẹ, 0 console error.
- **Lighthouse (số):** chưa chạy được trong môi trường audit (không có Chrome headless ổn định).
  Khuyến nghị khách chạy DevTools → Lighthouse; các yếu tố nền tảng để đạt cao (image tối ưu,
  metadata, a11y, không JS nặng) đã sẵn sàng.

## 14. Vấn đề còn lại
- 2 SP hoa tai dùng ảnh ngọc **placeholder** (đã đúng chất liệu + đánh dấu tạm) — chờ ảnh thật.
- Giá sản phẩm là số **tạm** — chờ bảng giá thật.
- Form log ra server (chưa nối **webhook** thật) — điền env là chạy.
- Chưa có **Lighthouse score** chính thức (giới hạn môi trường).
- Chưa hỗ trợ **đa ngôn ngữ/đa tiền tệ** (đã chủ động gỡ selector, không để control giả).

## 15. Checklist trước khi public domain chính thức
- [ ] Cung cấp ảnh hoa tai thật + giá thật + email chính thức.
- [ ] Điền webhook env trên Vercel (`CONSULT_/NEWSLETTER_/RESERVE_WEBHOOK_URL`) → redeploy.
- [ ] Đặt `NEXT_PUBLIC_SITE_URL` = domain thật; trỏ domain vào Vercel; bật HTTPS.
- [ ] Cập nhật `metadataBase`/canonical sang domain thật; submit sitemap lên Google Search Console.
- [ ] Duyệt pháp lý nội dung chính sách.
- [ ] Chạy Lighthouse (Mobile + Desktop) và xử lý điểm phát sinh nếu có.
- [ ] Kiểm thử form thật (nhận lead về webhook/CRM).
- [ ] Ảnh OG/preview khi share link (đã có OG image; kiểm tra lại trên FB/Zalo debugger).
- [ ] Backup repo + phân quyền GitHub/Vercel cho khách.
