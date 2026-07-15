# QA Screenshots / Responsive Verification

Ngày: 2026-07-15

> Ghi chú trung thực: công cụ chụp screenshot tự động trong môi trường audit này
> **liên tục timeout** (giới hạn sandbox trình duyệt), nên phần responsive được xác minh
> bằng **đo lập trình** (JavaScript đo `document.documentElement.scrollWidth` so với
> `innerWidth` trong iframe theo từng breakpoint) — chính xác hơn việc nhìn ảnh cho mục
> tiêu "không overflow ngang". Khuyến nghị khách chụp thủ công khi demo nếu cần ảnh minh họa.

## Kết quả đo overflow ngang

Breakpoint đã test: **390 · 430 · 768 · 1024 · 1280 · 1440 · 1920** (px)

Route đã test: `/`, `/bo-suu-tap`, `/san-pham/[slug]`, `/kiem-dinh`, `/lien-he-tu-van`,
`/cau-chuyen`, `/showroom` (và thêm `/tin-tuc`, `/gio-hang`, `/tim-kiem` ở 390px).

**Kết quả: KHÔNG route nào bị overflow ngang ở BẤT KỲ breakpoint nào.**
(`scrollWidth === innerWidth` tại mọi cỡ.)

## Các kiểm tra layout khác (pass)
- Header không vỡ ở mọi cỡ; menu mobile dùng drawer (hamburger, focus trap, Escape, khóa scroll).
- Hero: người mẫu ở giữa khung → desktop/mobile crop không cắt mặt/trang sức chính.
- Product grid: 2 cột (mobile) → 3 (tablet) → 4 (desktop), không méo.
- Certificate gallery `/kiem-dinh`: grid 1→3 cột, không tràn.
- Footer: accordion mobile (`<details>`), không rối.
- Touch target ≥ 44px (nút menu, icon).

## Cách tái lập nhanh (khi có Chrome)
```js
// dán vào console trên từng trang, đổi kích thước cửa sổ:
document.documentElement.scrollWidth - window.innerWidth   // > 1 nghĩa là overflow
```
Hoặc chạy Lighthouse (DevTools → Lighthouse) ở chế độ Mobile & Desktop.
