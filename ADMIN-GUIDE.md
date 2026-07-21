# Hướng dẫn dùng trang quản trị `/admin`

Trang quản trị cho phép sửa **nội dung, hình ảnh, sản phẩm, bài viết và logo** của website
mà không cần biết code.

**Địa chỉ:** `https://mjade.vercel.app/admin`

---

## 1. Nguyên lý hoạt động (đọc 30 giây)

Website MJADE là site tĩnh (chạy rất nhanh, không cần máy chủ database). Vì vậy trang admin
hoạt động theo cơ chế **Git-based CMS**:

```
Bạn sửa ở /admin  →  hệ thống lưu vào GitHub  →  Vercel tự build lại  →  website cập nhật
                                                   (khoảng 1 phút)
```

Nghĩa là: **sau khi bấm "Lưu thay đổi", chờ khoảng 1 phút rồi tải lại trang web** thì mới thấy
thay đổi. Đây không phải lỗi — đổi lại là site chạy nhanh và mọi thay đổi đều có lịch sử,
lỡ sai có thể khôi phục.

---

## 2. Bật trang quản trị (làm 1 lần)

### Bước 1 — Đặt mật khẩu admin

1. Vào <https://vercel.com> → chọn project **mjade** → **Settings** → **Environment Variables**.
2. Thêm biến:
   - Name: `ADMIN_PASSWORD`
   - Value: *mật khẩu bạn tự chọn* (nên dài, khó đoán, không dùng lại mật khẩu Facebook/email)
   - Environment: chọn cả **Production**, **Preview**, **Development**
3. Bấm **Save**.

> ⚠️ Không chia sẻ mật khẩu này qua chat/email công khai. Ai có mật khẩu đều sửa được website.

### Bước 2 — Cho phép admin lưu thay đổi (GitHub token)

1. Vào <https://github.com/settings/personal-access-tokens> → **Generate new token** →
   chọn loại **Fine-grained token**.
2. Cấu hình:
   - **Repository access**: Only select repositories → chọn repo **mjade**
   - **Permissions** → Repository permissions → **Contents**: chọn **Read and write**
   - **Expiration**: chọn thời hạn (nên đặt lịch nhắc gia hạn trước khi hết hạn)
3. Bấm **Generate token** rồi **copy** chuỗi token (chỉ hiện 1 lần).
4. Quay lại Vercel → Environment Variables → thêm 3 biến:
   - `GITHUB_TOKEN` = token vừa copy
   - `GITHUB_REPO` = `ledinhchanhtue-lang/mjade`
   - `GITHUB_BRANCH` = `main`

### Bước 3 — Deploy lại

Vercel → tab **Deployments** → deploy mới nhất → **⋯** → **Redeploy**.
Xong: mở `https://mjade.vercel.app/admin` và đăng nhập bằng mật khẩu ở Bước 1.

> Nếu chưa làm Bước 2, trang admin vẫn mở được nhưng sẽ báo *"chưa cấu hình GITHUB_TOKEN"*
> và **không lưu được** trên production.

---

## 3. Các mục trong trang quản trị

### Tab "Nội dung trang"
- **Khối Hero / Câu chuyện / Kiểm định**: sửa tiêu đề, đoạn mô tả, chữ trên nút, đường dẫn nút và **đổi ảnh**.
- **3 điểm mạnh (USP)** dưới hero: sửa chữ và chọn biểu tượng.
- **2 ô dịch vụ**: tiêu đề, mô tả, nút.
- **Danh sách cam kết**: mỗi dòng là một gạch đầu dòng.
- **Cảm nhận khách hàng**: sửa/thêm/xoá, kèm ảnh chân dung và link bài gốc.
- **Thông tin thương hiệu & liên hệ**: tên, tagline, email, hotline, **danh sách showroom**.
- **Menu điều hướng**: đổi tên mục, đường dẫn, thêm/bớt mục.

### Tab "Sản phẩm"
Chọn sản phẩm từ danh sách rồi sửa: tên, mã, **giá**, tình trạng còn hàng, mô tả, câu chuyện,
ảnh thẻ + ảnh chi tiết, và thông số ngọc.

> **Quan trọng — giữ chữ tín:** ô thông số nào chưa có số liệu thật thì **để trống**, website sẽ
> tự ẩn dòng đó. Đừng điền số ước lượng. Nếu ảnh chưa phải ảnh chụp chính sản phẩm đó, hãy tick
> *"Đây là ảnh minh hoạ tạm"* — website sẽ tự hiện ghi chú trung thực cho khách.

### Tab "Bài viết"
Thêm/sửa/xoá bài ở `/tin-tuc` và `/cam-nang-ngoc`. Mỗi bài gồm nhiều **phần**, mỗi phần có tiêu đề
và nội dung (các đoạn văn cách nhau bằng **một dòng trống**).

### Tab "Ảnh & Logo"
Đổi **logo header** (hình chim công) và **logo footer** (đầy đủ). Nên dùng file PNG nền trong suốt.

---

## 4. Mẹo dùng ảnh

- Chọn file ảnh gốc **chất lượng cao**; hệ thống tự cắt đúng tỷ lệ và nén WebP cho nhẹ.
- Mỗi lần tải ảnh mới, hệ thống **tự đặt tên file mới** để trình duyệt không hiển thị ảnh cũ trong bộ nhớ đệm.
- Giới hạn 12MB/ảnh.
- Sau khi tải ảnh xong, **vẫn phải bấm "Lưu thay đổi"** thì website mới dùng ảnh mới.

---

## 5. Xử lý sự cố

| Hiện tượng | Cách xử lý |
| --- | --- |
| Đăng nhập báo sai mật khẩu | Kiểm tra lại `ADMIN_PASSWORD` trên Vercel; sau khi đổi biến phải **Redeploy** |
| Báo "chưa cấu hình GITHUB_TOKEN" | Làm Bước 2 mục 2 ở trên |
| Lưu xong nhưng web chưa đổi | Chờ ~1 phút (Vercel đang build). Kiểm tra tab Deployments trên Vercel |
| Lưu báo lỗi 401 | Phiên đăng nhập hết hạn (8 giờ) — tải lại trang và đăng nhập lại |
| Lỡ sửa sai, muốn khôi phục | Vào GitHub → repo mjade → thư mục `content/` → chọn file → **History** → xem/khôi phục bản cũ |

---

## 6. Chạy thử trên máy (tuỳ chọn, cho người kỹ thuật)

```bash
# tạo file .env.local (KHÔNG commit file này)
echo ADMIN_PASSWORD=matkhau-tuy-chon > .env.local
npm run dev
# mở http://localhost:3000/admin
```
Ở chế độ local (không có GITHUB_TOKEN), admin sẽ **ghi thẳng vào file** trong thư mục `content/`
và `public/images/` — sau đó bạn tự `git push` để đưa lên web.

---

## 7. Ghi chú kỹ thuật

- Nội dung nằm ở thư mục **`content/*.json`** (`home`, `site`, `products`, `articles`,
  `testimonials`, `navigation`). Các file `data/*.ts` chỉ đọc JSON và giữ kiểu dữ liệu.
- Trang `/admin` đã chặn Google lập chỉ mục (`noindex` + `robots.txt`).
- API quản trị đều yêu cầu đăng nhập; chỉ cho ghi vào danh sách file nội dung được phép và
  ảnh trong `public/images/` (chặn ghi ra ngoài).
