# Hướng dẫn Deploy lên GitHub Pages

## Đã hoàn thành

✅ Cấu hình Next.js để export static site
✅ Thêm GitHub Actions workflow để tự động deploy
✅ Tạo file .nojekyll để GitHub Pages hoạt động đúng

## Các bước tiếp theo để deploy

### 1. Cấu hình basePath (quan trọng!)

Mở file `next.config.js` và uncomment 2 dòng sau nếu repository của bạn **KHÔNG PHẢI** là `username.github.io`:

```javascript
basePath: '/your-repo-name',
assetPrefix: '/your-repo-name/',
```

Thay `your-repo-name` bằng tên repository thực tế của bạn.

**Lưu ý:** 
- Nếu bạn dùng custom domain hoặc repo có tên `username.github.io` thì GIỮ NGUYÊN (comment 2 dòng này)
- Nếu repo tên khác (ví dụ: `ANTISCAM`) thì phải uncomment và đổi tên

### 2. Push code lên GitHub

```bash
git add .
git commit -m "Configure for GitHub Pages deployment"
git push origin main
```

### 3. Cấu hình GitHub Repository

1. Truy cập repository trên GitHub
2. Vào **Settings** → **Pages**
3. Trong phần **Source**, chọn **GitHub Actions**
4. Vào **Settings** → **Secrets and variables** → **Actions**
5. Thêm các secrets sau (nếu cần):
   - `DATABASE_URL`
   - `HUGGINGFACE_API_KEY`
   - `VIRUSTOTAL_API_KEY`
   - `ADMIN_SECRET`

### 4. Chạy workflow

Workflow sẽ tự động chạy khi bạn push code. Bạn cũng có thể chạy thủ công:

1. Vào tab **Actions** trên GitHub
2. Chọn workflow "Deploy to GitHub Pages"
3. Click **Run workflow**

### 5. Truy cập website

Sau khi deploy thành công, website sẽ có địa chỉ:

- Nếu dùng `username.github.io`: `https://username.github.io`
- Nếu dùng repo name: `https://username.github.io/repo-name`
- Nếu dùng custom domain với GitHub Pro: Cấu hình trong Settings → Pages → Custom domain

## Lưu ý quan trọng về API Routes

⚠️ **GitHub Pages chỉ hỗ trợ static files**, không hỗ trợ API routes của Next.js!

Dự án của bạn có nhiều API routes trong `/app/api/`. Bạn có 2 lựa chọn:

### Lựa chọn 1: Deploy API riêng (Khuyến nghị)
- Deploy frontend lên GitHub Pages
- Deploy backend (API routes) lên Vercel/Railway/Render miễn phí
- Cập nhật frontend để gọi API từ domain khác

### Lựa chọn 2: Deploy toàn bộ lên Vercel
- Vercel miễn phí và hỗ trợ Next.js tốt nhất
- Sau đó có thể dùng custom domain từ GitHub Pro

## Custom Domain với GitHub Pro

Nếu bạn muốn dùng custom domain:

1. Vào **Settings** → **Pages** → **Custom domain**
2. Nhập domain của bạn
3. Cấu hình DNS records theo hướng dẫn của GitHub
4. Bật **Enforce HTTPS**

## Kiểm tra deployment

Sau khi push code, kiểm tra:
- Tab **Actions** để xem quá trình build
- Tab **Settings** → **Pages** để xem URL đã deploy

---

**Cần hỗ trợ?** Hãy kiểm tra logs trong GitHub Actions nếu có lỗi.
