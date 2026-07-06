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
| hero-jade-woman.webp | 1500×1875 (4:5) | Hero trang chủ | **THẬT** | lookbook 01 (model áo lụa trắng, mặt dây jade lavender + vòng, uống trà) | Người mẫu bên phải khung, khoảng trống trái cho chữ — đúng art direction. |
| featured-pendant.webp | 1200×1500 (4:5) | Card SP nổi bật 1 | **THẬT** | folder 05 (chuỗi hạt ngọc + mặt dây, khay linen) | Dùng chung cho product detail MJ-P001. |
| featured-ring.webp | 1200×1500 (4:5) | Card SP nổi bật 2 | **THẬT** | folder 04 (3 nhẫn ngọc nguyên khối trên cành hoa, có logo MJADE) | Dùng chung cho MJ-R002. |
| featured-earrings.webp | 1200×1500 (4:5) | Card SP nổi bật 3 | TẠM | (stock cũ) | **Chưa có ảnh hoa tai product-only sạch trong kho.** Cần thay. |
| featured-bracelet.webp | 1200×1500 (4:5) | Card SP nổi bật 4 | **THẬT** | lookbook 01 (lắc tay hạt ngọc đeo trên cổ tay) | Dùng chung cho MJ-B004. |
| limited-pendant.webp | 1200×1200 (1:1) | Limited strip 1 | **THẬT** | folder 04 (chuỗi ngọc xanh lục trên lá) | |
| limited-ring.webp | 1200×1200 (1:1) | Limited strip 2 | **THẬT** | folder 04 (2 nhẫn ngọc trên tulip trắng) | |
| limited-earrings.webp | 1200×1200 (1:1) | Limited strip 3 | TẠM | (stock cũ) | **Chưa có ảnh hoa tai.** Cần thay. |
| limited-bangle.webp | 1200×1200 (1:1) | Limited strip 4 | **THẬT** | folder 05 (vòng bản ngọc nguyên khối, khay gỗ) | ✅ Đã sửa lỗi cũ (trước là ảnh nhẫn bản). |
| jade-inspection.webp | 1200×1500 (4:5) | Section câu chuyện trang chủ | **THẬT** | lookbook 01 (chân dung model áo trắng đeo vòng ngọc) | Đã đổi alt trong StoryCertification.tsx. |
| certificate.svg | 900×1120 | Section kiểm định + trang /kiem-dinh | THIẾU (placeholder trung tính có chủ đích) | — | **Chỉ dùng chứng thư THẬT của MJADE.** Hỗ trợ ảnh/PDF qua field certificateImage/certificatePdf trong data/products.ts. **P0** |

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
