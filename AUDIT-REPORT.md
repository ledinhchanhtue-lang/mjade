# MJADE — AUDIT REPORT (Final Acceptance)

Ngày audit: 2026-07-15 · URL: https://mjade.vercel.app
Người thực hiện: QA/UX/Next.js audit tự động + thủ công.
Phương pháp: crawler nội bộ (fetch toàn bộ anchor/img), lint/typecheck/build, kiểm tra
responsive & a11y qua trình duyệt (JS đo `scrollWidth`/breakpoint), test 3 API form.

> Nguyên tắc: KHÔNG chỉ báo cáo — mọi lỗi tìm thấy đã được sửa ngay trong lần audit này
> (xem cột **Trạng thái** và mục "Đã sửa trong audit").

---

## 1. Tổng quan kết quả

| Hạng mục | Kết quả |
| --- | --- |
| Route 404 (menu/footer/CTA/card) | ✅ 0 — crawler kiểm 38 internal link, không có 404 |
| Broken image | ✅ 0 — kiểm 28 ảnh, tất cả 200 |
| Link `href="#"` | ✅ 0 |
| Control giả (search/cart/currency/language) | ✅ Không còn (đã gỡ selector tiền tệ/ngôn ngữ; search→/tim-kiem; cart=đặt giữ) |
| Lorem / Coming soon / TODO / sample | ✅ 0 (grep sạch) |
| Form validation/loading/success/error | ✅ 3 API validate đúng (valid→200, invalid→400) |
| Responsive overflow ngang | ✅ 0 — 7 route × 7 breakpoint (390/430/768/1024/1280/1440/1920) |
| Ảnh đồng bộ art direction | ✅ (sau khi thay 2 ảnh hoa tai emerald+kim cương → jade) |
| Ảnh sai loại | ✅ Đã sửa (hoa tai) |
| Giấy kiểm định giả | ✅ Không — dùng ảnh chứng thư THẬT (Myanmar Treasure Lab) |
| SEO metadata các page chính | ✅ title/desc/canonical/OG/Twitter đủ |
| Build production | ✅ thành công (38 trang) |
| Lint | ✅ 0 lỗi |
| Typecheck | ✅ 0 lỗi (đã thêm script `typecheck`) |
| Console error | ✅ Không |
| H1 mỗi trang | ✅ đúng 1 |
| Ảnh thiếu alt | ✅ 0 |
| Icon control thiếu aria-label | ✅ 0 |
| prefers-reduced-motion | ✅ có |

---

## 2. Toàn bộ route (đều 200)

`/` · `/bo-suu-tap` · `/bo-suu-tap-gioi-han` · `/san-pham/[slug]` (8 SSG) · `/ve-mjade` ·
`/ngoc-phi-thuy` · `/kiem-dinh` · `/cau-chuyen` · `/showroom` · `/lien-he-tu-van` ·
`/giao-hang-quoc-te` · `/tin-tuc` · `/tin-tuc/[slug]` (4 SSG) · `/cam-nang-ngoc` ·
`/huong-dan-mua-hang` · `/chinh-sach-bao-hanh` · `/chinh-sach-doi-tra` ·
`/cau-hoi-thuong-gap` · `/tim-kiem` · `/gio-hang` · `/api/{consult,newsletter,reserve}` ·
`/sitemap.xml` · `/robots.txt` · 404 page riêng.

- Menu chính (6 mục) + footer + CTA + product card: **không mục nào 404**.
- Route chưa có nội dung "thật cuối cùng" vẫn có layout hoàn chỉnh + copy trung thực,
  không dùng "coming soon".

## 3. Route 404 / link chết
**Không có.** Crawler không tìm thấy link nội bộ nào trả ≥400, không có `href="#"`.

## 4. Image missing / sai mục đích
- Missing: **0**.
- Sai mục đích (trước audit): `featured-earrings.webp` và `hoa-tai-ngoc-phi-thuy-vang-18k-1.webp`
  là ảnh **hoa tai emerald + kim cương, nền lạnh** → lệch art direction & sai chất liệu.
  → **Đã thay** bằng ảnh hoa tai **ngọc phỉ thúy (jade drop)**, đổi tên file bust cache,
  cập nhật `products.ts` + alt. Vẫn `imageIsTemporary: true` (chờ ảnh thật của khách).

## 5. Button/CTA không hoạt động
**Không có.** Tất cả CTA trỏ route hợp lệ hoặc submit form thật. Cart = luồng "đặt giữ"
(không giả lập thanh toán). Icon search → `/tim-kiem`. Icon cart → `/gio-hang`.

## 6. Form chưa functional
**Không có.** `consult`/`newsletter`/`reserve` đều validate server-side (test: valid→200,
invalid→400; reserve còn validate slug sản phẩm). Có honeypot chống spam, loading/success/error state.
Chưa nối webhook thật → hiện log server với prefix `[MJADE:kind]` (không mất lead).

## 7. Control giả
**Không có.** Selector tiền tệ/ngôn ngữ đã gỡ (chưa hỗ trợ đa tiền tệ/ngôn ngữ thật).
Không có icon account giả.

## 8. Responsive
**Không lỗi.** 0 overflow ngang trên 7 route × 7 breakpoint. Grid sản phẩm co giãn
2→3→4 cột. Filter mobile bằng bottom sheet. Menu mobile: focus trap + Escape + khóa scroll
+ đóng khi chọn route + touch target ≥44px.

## 9. SEO
- Đủ: title, description, canonical, Open Graph, Twitter card, robots.txt, sitemap.xml (28 URL).
- Schema: Organization, Product, BreadcrumbList, Article, FAQPage (/ngoc-phi-thuy,
  /cau-hoi-thuong-gap). **Đã sửa:** thêm FAQPage schema còn thiếu cho `/kiem-dinh`.

## 10. Accessibility
1 H1/trang · alt đầy đủ · icon control có aria-label · focus state · dialog focus trap +
Escape · prefers-reduced-motion · touch target đủ lớn. Không phát hiện lỗi.

## 11. Performance (định tính)
next/image toàn site · hero `priority` · ảnh dưới fold lazy · WebP · lucide-react import
theo tên (không import cả thư viện) · motion nhẹ (fade-up) · không animation nặng · không
console error. (Lighthouse số chính thức: xem CLIENT-HANDOFF, cần chạy trên môi trường có Chrome.)

## 12. Nội dung cần khách xác nhận
1. Ảnh sản phẩm thật **2 SP hoa tai** (hiện dùng jade placeholder, đã đánh dấu tạm).
2. **Giá thật** (`priceVnd` đang là số đặt tạm).
3. **Email chính thức** (đang `lienhe@mjade.vn` placeholder; SĐT + 4 showroom đã là thật).
4. **Webhook** cho 3 form (điền env trên Vercel).
5. Duyệt **pháp lý** nội dung chính sách bảo hành/đổi trả/giao hàng.
6. Testimonial: đã đăng 3 khách (Tammy/Bích Tuyền/Kim); chị Xuân tạm bỏ vì nội dung nói
   công dụng làm đẹp da (không trình bày như sự thật khoa học) — chờ text duyệt lại.

---

## Đã sửa trong audit này
1. Thêm script `npm run typecheck` (`tsc --noEmit`).
2. Thay 2 ảnh hoa tai emerald+kim cương (homepage card + product detail) → ảnh ngọc phỉ thúy;
   đổi tên file bust cache; cập nhật `products.ts` + alt.
3. Thêm FAQPage JSON-LD cho `/kiem-dinh`.
