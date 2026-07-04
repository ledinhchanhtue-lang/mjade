# ASSET MANIFEST — MJADE

Cập nhật: 2026-07-04 (Phase 2)

**Trạng thái chung:** toàn bộ ảnh production là **ảnh stock có giấy phép từ Pexels**
(miễn phí thương mại, không cần ghi công — pexels.com/license), đã được xử lý
(crop, đồng bộ tỷ lệ, chuyển WebP) bằng sharp. Chúng khớp tông màu ivory–jade
của thương hiệu nhưng **chưa phải ảnh sản phẩm MJADE thật** — mọi file có trạng
thái `TẠM` bên dưới cần thay bằng ảnh chụp thật trước khi chạy chiến dịch bán hàng.

Không có ảnh nào hotlink từ bên ngoài; tất cả nằm trong `public/images/`.
Không dùng ảnh Pinterest hoặc ảnh của thương hiệu trang sức khác.

## Quy ước trạng thái

- `THẬT` — ảnh do MJADE cung cấp, dùng được lâu dài.
- `TẠM` — stock hợp lệ về bản quyền, đúng tông màu, cần thay bằng ảnh thật.
- `THIẾU` — chưa có file; đang dùng placeholder trung tính.

## public/images/home/

| File | Kích thước | Vị trí | Trạng thái | Nguồn (Pexels ID) | Art direction khi thay | Ưu tiên |
| --- | --- | --- | --- | --- | --- | --- |
| hero-jade-woman.webp | 2200×1500 | Hero trang chủ | TẠM | 27969667 | Người phụ nữ Việt/Á Đông 32–45t, áo lụa ivory, MỘT mặt dây jade + nhẫn + hoa tai nhỏ, tóc búi thấp, trang điểm tự nhiên, ánh sáng cửa sổ, người bên phải khung, khoảng trống trái. Không bridal, không chandelier. | **P0** |
| featured-pendant.webp | 1200×1500 (4:5) | Card SP nổi bật 1 | TẠM | 10561322 | Một mặt dây jadeite + dây chuyền gọn, nền ivory, bố cục centered editorial. | **P0** |
| featured-ring.webp | 1200×1500 (4:5) | Card SP nổi bật 2 | TẠM | 16242337 | MỘT nhẫn jadeite hoàn thiện đúng sản phẩm thật, nền ivory. | **P0** |
| featured-earrings.webp | 1200×1500 (4:5) | Card SP nổi bật 3 | TẠM | 13595669 | Một đôi hoa tai jadeite thanh lịch hiện đại, nền ivory, không quá nhiều bạc. | **P0** |
| featured-bracelet.webp | 1200×1500 (4:5) | Card SP nổi bật 4 | TẠM | 11157508 | Một lắc tay jadeite hoàn thiện, sản phẩm chiếm phần lớn khung. | **P0** |
| limited-pendant.webp | 1200×1200 (1:1) | Limited strip 1 | TẠM ⚠️ nền xanh rêu, chưa đúng palette lụa champagne | 21235148 | Mặt dây jade trên lụa champagne, macro editorial. | **P0 — thay sớm nhất** |
| limited-ring.webp | 1200×1200 (1:1) | Limited strip 2 | TẠM | 13780712 | Nhẫn jade trên linen ivory hoặc đeo trên tay, ánh sáng ấm. | P1 |
| limited-earrings.webp | 1200×1200 (1:1) | Limited strip 3 | TẠM | 7360327 | Đôi hoa tai jade, macro trên đá kem hoặc đeo trên tai. | P1 |
| limited-bangle.webp | 1200×1200 (1:1) | Limited strip 4 | TẠM ⚠️ ảnh hiện tại là nhẫn bản jade, chưa phải vòng bản đeo tay | 7347433 | MỘT vòng bản jadeite nguyên khối hoàn thiện trên nền lụa/đá kem. | **P0 — thay sớm nhất** |
| jade-inspection.webp | 1200×1500 (4:5) | Section kiểm định trang chủ | TẠM (đã crop bỏ smartwatch) | 13613422 | Chuyên gia soi ngọc jadeite bằng nhíp + loupe, palette ivory, jade là chủ thể trung tâm. | P1 |
| certificate.svg | 900×1120 | Section kiểm định + trang /kiem-dinh | THIẾU (placeholder trung tính có chủ đích) | vẽ tay | **Chỉ dùng chứng thư THẬT của MJADE.** Che thông tin cá nhân nếu cần, giữ nguyên tên lab và kết quả. Hỗ trợ ảnh hoặc PDF qua các field certificateImage/certificatePdf trong data/products.ts. | **P0** |

## public/images/products/

Ảnh chi tiết sản phẩm (4:5, 1200×1500) — hiện dùng lại nguồn tương ứng ở trên, trạng thái `TẠM`:

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
| story-hero.webp | 2000×1100 | /cau-chuyen, /ve-mjade | TẠM (nguồn 27969667) |
| inspection-wide.webp | 1600×1000 | /kiem-dinh, bài viết | TẠM (nguồn 13613422) |

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
