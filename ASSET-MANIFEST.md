# ASSET MANIFEST — MJADE

Cập nhật: 2026-07-06 (Phase 3 — thay ảnh MJADE thật)

**Trạng thái chung:** phần lớn ảnh chính đã được thay bằng **ảnh MJADE THẬT** do
client cung cấp qua Google Drive (liệt kê trong spreadsheet tài nguyên của khách —
lookbook "Băng Ngọc Thanh Tâm" + các folder ảnh sản phẩm). Ảnh gốc là ảnh chụp
thật của thương hiệu, được xử lý (crop theo tỷ lệ chuẩn, chuyển WebP q82) bằng sharp.

Còn `TẠM` (chưa có ảnh thật phù hợp): **2 ảnh hoa tai** (chưa tìm được ảnh product-only
sạch trong kho — vẫn dùng stock cũ, đánh dấu `imageIsTemporary: true`).
Còn `THIẾU`: **certificate.svg** (chờ chứng thư thật — TUYỆT ĐỐI không dựng giả).

Nguồn ảnh thật (Google Drive folder ID, từ spreadsheet client):
`01-lookbook-bangngoc` = 16Je7nHy… · `04-tonghop-a` = 1i80Kh6U… · `05-tonghop-b` = 1xlG5yfi…

Không có ảnh nào hotlink từ bên ngoài; tất cả nằm trong `public/images/`.
Không dùng ảnh Pinterest hoặc ảnh của thương hiệu trang sức khác.

## Quy ước trạng thái

- `THẬT` — ảnh do MJADE cung cấp, dùng được lâu dài.
- `TẠM` — stock hợp lệ về bản quyền, đúng tông màu, cần thay bằng ảnh thật.
- `THIẾU` — chưa có file; đang dùng placeholder trung tính.

## public/images/home/

| File | Kích thước | Vị trí | Trạng thái | Nguồn ảnh thật | Ghi chú |
| --- | --- | --- | --- | --- | --- |
| hero-jade-woman.webp | 2200×1467 (3:2) | Hero trang chủ | **THẬT** | Section/Banner.jpg (model váy lụa trắng đeo lắc tay + nhẫn ngọc, cành hoa mơ, nền tối) | Cover NGANG do client gửi. |
| featured-pendant.webp | 1200×1500 (4:5) | Card SP nổi bật 1 | **THẬT** | folder 05 (chuỗi hạt ngọc + mặt dây, khay linen) | Dùng chung cho product detail MJ-P001. |
| featured-ring.webp | 1200×1500 (4:5) | Card SP nổi bật 2 | **THẬT** | folder 04 (3 nhẫn ngọc nguyên khối trên cành hoa, có logo MJADE) | Dùng chung cho MJ-R002. |
| featured-earrings-2.webp | 1200×1500 (4:5) | Card SP nổi bật 3 | TẠM | stock (hoa tai NGỌC drop) | ✅ Đã thay ảnh emerald+kim cương lệch tông bằng hoa tai ngọc đúng chất liệu. **Chờ ảnh hoa tai thật của MJADE.** |
| featured-bracelet.webp | 1200×1500 (4:5) | Card SP nổi bật 4 | **THẬT** | lookbook 01 (lắc tay hạt ngọc đeo trên cổ tay) | Dùng chung cho MJ-B004. |
| limited-pendant.webp | 1200×1200 (1:1) | Limited strip 1 | **THẬT** | folder 04 (chuỗi ngọc xanh lục trên lá) | |
| limited-ring.webp | 1200×1200 (1:1) | Limited strip 2 | **THẬT** | folder 04 (2 nhẫn ngọc trên tulip trắng) | |
| limited-earrings.webp | 1200×1200 (1:1) | Limited strip 3 | TẠM | (stock cũ) | **Chưa có ảnh hoa tai.** Cần thay. |
| limited-bangle.webp | 1200×1200 (1:1) | Limited strip 4 | **THẬT** | folder 05 (vòng bản ngọc nguyên khối, khay gỗ) | ✅ Đã sửa lỗi cũ (trước là ảnh nhẫn bản). |
| jade-inspection.webp | 1200×1500 (4:5) | Section câu chuyện trang chủ | **THẬT** | Section/Story.jpg (model váy xanh đeo chuỗi ngọc lục, cầm quạt, phông gỗ) | Client gửi. |
| certificate.svg | 900×1120 | (không còn dùng) | THAY THẾ | — | Đã thay bằng ảnh chứng thư THẬT trong `public/images/certificates/` (xem bên dưới). File svg giữ lại nhưng không tham chiếu. |

## public/images/certificates/

**Ảnh chứng thư THẬT** từ Myanmar Treasure Gemological Laboratory (client cung cấp, không có thông tin cá nhân khách). Dùng ở section kiểm định trang chủ + gallery trang /kiem-dinh. Ảnh gốc để trong `Giấy kiểm định/` (đã gitignore).

| File | Nội dung |
| --- | --- |
| certificate-front.webp | Mặt trước: Gem Report, ID No.10101054179, Natural Jadeite (Type A) + vòng ngọc trong hộp |
| certificate-detail.webp | Trang thông số (47.13g, RI 1.66, SG 3.33, hardness 7) + chữ ký chuyên gia GIA (AJP) & FGA (London), dấu GEM-A member |
| certificate-hand.webp | Chứng thư cầm trên tay tại showroom |

## public/images/products/

Ảnh chi tiết sản phẩm (4:5, 1200×1500). **6/8 đã là ảnh MJADE THẬT** (`imageIsTemporary: false`);
2 sản phẩm hoa tai (`hoa-tai-*`) vẫn `TẠM`. Lưu ý: khi thay ảnh thật đã set `metal: null` cho các
món ngọc nguyên khối (ảnh cho thấy không có đế kim loại) — giữ đúng nguyên tắc không bịa thông số:

| File | Sản phẩm (slug) |
| --- | --- |
| mat-day-chuyen-ngoc-phi-thuy-1.webp | mat-day-chuyen-ngoc-phi-thuy |
| nhan-ngoc-phi-thuy-boc-vang-trang-1.webp | nhan-ngoc-phi-thuy-boc-vang-trang |
| hoa-tai-ngoc-phi-thuy-vang-18k-1.webp | hoa-tai-ngoc-phi-thuy-vang-18k |
| lac-tay-ngoc-phi-thuy-thiet-ke-rieng-1.webp | lac-tay-ngoc-phi-thuy-thiet-ke-rieng |
| mat-day-chuyen-gioi-han-1.webp | mat-day-chuyen-gioi-han |
| nhan-ngoc-gioi-han-1.webp | nhan-ngoc-gioi-han |
| hoa-tai-ngoc-gioi-han-1.webp | hoa-tai-ngoc-gioi-han |
| vong-ban-ngoc-gioi-han-1.webp | vong-ban-ngoc-gioi-han |

Khi có ảnh thật: mỗi sản phẩm nên có 2–4 ảnh (chính diện, nghiêng, đeo trên người,
cận vân ngọc) — thêm đường dẫn vào mảng `images` trong `data/products.ts`.

## public/images/editorial/

| File | Kích thước | Vị trí | Trạng thái |
| --- | --- | --- | --- |
| story-hero.webp | 2000×1100 | /cau-chuyen, /ve-mjade | **THẬT** — lookbook 01 (model tựa cửa, đeo vòng + hoa tai ngọc) |
| inspection-wide.webp | 1600×1000 | /kiem-dinh, bài viết | **THẬT** — folder 05 (vòng + nhẫn + chuỗi ngọc trên khay linen, nắng) |

## public/images/brand/

Logo peacock thật của MJADE ("ĐỆ NHẤT NGỌC PHỈ THỦY"). **Trích từ watermark trên ảnh sản phẩm**
(folder 04, file 09) bằng sharp: crop sát → `linear()` làm sạch nền → **key màu trắng thành alpha
trong suốt** (raw buffer: pixel sáng + ít bão hòa → alpha 0, có ramp mềm ở rìa). PNG nền trong suốt
thật — hiển thị đẹp trên mọi nền, không cần blend hack.

| File | Nội dung | Vị trí | Ghi chú |
| --- | --- | --- | --- |
| mjade-emblem.png | Chỉ hình peacock (nền trong suốt) | Header (cạnh wordmark "MJADE") | 560×442, chừa biên đủ đầu peacock (fix "cụt logo"), hiển thị 32–40px |
| mjade-logo.png | Logo đầy đủ (peacock + MJADE + slogan, nền trong suốt) | Footer | 760×743, hiển thị 88px |

⚠️ Đây là bản trích từ ảnh, **chưa phải file logo gốc**. Nên xin client file logo chính thức
(PNG nền trong suốt hoặc SVG) để thay, cho nét ở mọi kích thước. **P1**.

## public/images/certificates/

Trống — dành cho ảnh/PDF chứng thư thật. Đặt file theo mã sản phẩm
(vd `MJ-P001.webp`, `MJ-P001.pdf`) rồi điền vào `certificateImage`/`certificatePdf`
của sản phẩm tương ứng trong `data/products.ts`.

## public/images/placeholders/

Trống — dự phòng cho placeholder trung tính khi thêm sản phẩm chưa có ảnh.

## public/reference/

`mjade-homepage-reference.png` — **THIẾU**. Ảnh reference gửi qua chat không thể
ghi ra đĩa tự động; lưu tay vào đường dẫn này (không dùng trong production).

## Quy trình thay ảnh thật

1. Chụp theo art direction ở cột tương ứng (hệ ánh sáng ấm, nền ivory/beige, jade là màu mạnh duy nhất).
2. Xuất WebP (hoặc JPG chất lượng cao — Next/sharp sẽ tự tối ưu).
3. Ghi đè đúng tên file, giữ nguyên tỷ lệ khung.
4. Cập nhật `imageAlt` và đặt `imageIsTemporary: false` trong `data/products.ts`.
5. Xóa dòng cảnh báo tương ứng trong file này.
