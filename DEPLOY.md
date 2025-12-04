# 🚀 Hướng dẫn Deploy lên Vercel

## Bước 1: Chuẩn bị Repository

### 1.1 Tạo Git repository
```bash
git init
git add .
git commit -m "Initial commit"
```

### 1.2 Push lên GitHub
```bash
# Tạo repo mới trên GitHub, sau đó:
git remote add origin https://github.com/YOUR_USERNAME/antiscam.git
git branch -M main
git push -u origin main
```

## Bước 2: Cấu hình Vercel

### 2.1 Import Project
1. Vào [vercel.com](https://vercel.com) và đăng nhập
2. Click "Add New" → "Project"
3. Import repository từ GitHub
4. Chọn repo `antiscam`

### 2.2 Cấu hình Environment Variables
Trong Vercel Dashboard → Settings → Environment Variables, thêm:

| Variable | Value | Description |
|----------|-------|-------------|
| `DATABASE_URL` | `postgresql://...?pgbouncer=true` | Supabase connection string (pooler) |
| `DIRECT_URL` | `postgresql://...` | Supabase direct connection |
| `HUGGINGFACE_API_KEY` | `hf_xxx...` | HuggingFace token với Inference Provider |
| `GROQ_API_KEY` | `gsk_xxx...` | Groq API key (optional) |
| `ADMIN_SECRET` | `random-32-char-string` | Admin authentication |
| `NEXT_PUBLIC_APP_URL` | `https://your-app.vercel.app` | Production URL |

⚠️ **QUAN TRỌNG**: 
- KHÔNG commit file `.env` lên GitHub
- Tạo `ADMIN_SECRET` mạnh: `openssl rand -hex 32`

### 2.3 Build Settings
- Framework Preset: `Next.js`
- Build Command: `prisma generate && next build`
- Output Directory: `.next`
- Install Command: `npm install`

## Bước 3: Database Setup

### 3.1 Supabase (Recommended)
1. Tạo project tại [supabase.com](https://supabase.com)
2. Vào Settings → Database → Connection string
3. Copy "URI" cho `DIRECT_URL`
4. Copy "URI (Pooler)" cho `DATABASE_URL`

### 3.2 Chạy Migration
Sau khi deploy lần đầu, chạy:
```bash
npx prisma db push
npx prisma db seed
```

Hoặc thêm vào `package.json`:
```json
{
  "scripts": {
    "postinstall": "prisma generate",
    "vercel-build": "prisma generate && prisma db push && next build"
  }
}
```

## Bước 4: Bảo mật

### 4.1 Rate Limiting
Đã cấu hình sẵn:
- URL scan: 10 requests/phút
- Image scan: 5 requests/phút
- Report: 3 requests/phút

### 4.2 Security Headers
Middleware tự động thêm:
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- Referrer-Policy

### 4.3 Admin Protection
- Route `/admin` yêu cầu xác thực
- API `/api/admin/*` cần header `x-admin-secret`

## Bước 5: Verify Deployment

### 5.1 Kiểm tra cơ bản
- [ ] Trang chủ load được
- [ ] Scan URL hoạt động
- [ ] Scan ảnh hoạt động
- [ ] Report form hoạt động

### 5.2 Kiểm tra bảo mật
- [ ] `.env` không xuất hiện trong source
- [ ] API keys không lộ trong Network tab
- [ ] Rate limiting hoạt động
- [ ] Admin route được bảo vệ

## Troubleshooting

### Lỗi Prisma
```bash
# Regenerate client
npx prisma generate

# Push schema
npx prisma db push
```

### Lỗi HuggingFace 400/404
- Kiểm tra token có bật "Inference Providers"
- Kiểm tra model name đúng: `Qwen/Qwen2.5-VL-7B-Instruct`

### Lỗi Database Connection
- Kiểm tra `DATABASE_URL` dùng pooler port (6543)
- Kiểm tra `DIRECT_URL` dùng direct port (5432)

## 📱 Demo URL
Sau khi deploy: `https://your-app.vercel.app`

## 🔒 Lưu ý bảo mật
1. **KHÔNG** share API keys
2. **KHÔNG** commit `.env` file
3. Đổi `ADMIN_SECRET` định kỳ
4. Monitor usage trong Vercel Analytics
