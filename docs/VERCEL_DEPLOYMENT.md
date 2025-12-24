# Vercel + Supabase Deployment Guide

## Bước 1: Lấy Supabase Connection Strings

1. Vào **Supabase Dashboard**: https://supabase.com/dashboard
2. Chọn project của bạn
3. Sidebar: **Settings** (⚙️) → **Database**
4. Scroll xuống **Connection string** → Chọn tab **URI**

### Copy 2 URLs này:

**Transaction mode (Port 5432):**
```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres
```

**Session mode (Port 6543):**
```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
```

> **Lưu ý:** Thay `[PASSWORD]` bằng database password bạn đã tạo khi setup Supabase

---

## Bước 2: Add Environment Variables vào Vercel

1. Vào **Vercel Dashboard**: https://vercel.com/dashboard
2. Chọn project **Anti-Scam**
3. **Settings** → **Environment Variables**
4. Add các variables sau:

### Database (Required):
```bash
Name: DATABASE_URL
Value: postgresql://postgres.xxx:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
Environment: Production, Preview, Development
```

```bash
Name: DIRECT_URL
Value: postgresql://postgres.xxx:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres
Environment: Production, Preview, Development
```

### Authentication (Required):
```bash
Name: NEXTAUTH_SECRET
Value: [Generate bằng: openssl rand -base64 32]
Environment: Production, Preview, Development
```

```bash
Name: NEXTAUTH_URL
Value: https://your-project.vercel.app
Environment: Production
```

```bash
Name: NEXTAUTH_URL
Value: http://localhost:3000
Environment: Development
```

### AI Services (Required để app hoạt động):
```bash
Name: HUGGINGFACE_API_KEY
Value: hf_xxxxxxxxxxxx
Environment: Production, Preview, Development
```

```bash
Name: GROQ_API_KEY
Value: gsk_xxxxxxxxxxxx
Environment: Production, Preview, Development
```

### Stripe (Optional - có thể thêm sau):
```bash
Name: STRIPE_SECRET_KEY
Value: sk_test_xxx (test) hoặc sk_live_xxx (production)
```

```bash
Name: STRIPE_WEBHOOK_SECRET
Value: whsec_xxx
```

---

## Bước 3: Redeploy Vercel

Sau khi add environment variables:

1. Vào **Deployments** tab
2. Click vào deployment mới nhất
3. Click nút **•••** (menu) → **Redeploy**
4. Chọn **Use existing Build Cache** → **Redeploy**

Hoặc trigger deployment mới bằng git push.

---

## Bước 4: Push Prisma Schema lên Supabase

**Từ local machine:**

```bash
# Update .env với Supabase connection strings
# DATABASE_URL="postgresql://postgres.xxx:password@...6543/postgres?pgbouncer=true"
# DIRECT_URL="postgresql://postgres.xxx:password@...5432/postgres"

# Push schema (tạo tất cả tables)
npx prisma db push

# Generate Prisma Client
npx prisma generate
```

**Hoặc chạy sau khi deploy Vercel:**

1. Vào Vercel Dashboard → Project → **Settings** → **Functions**
2. Hoặc chạy local với production env:

```bash
# Pull env vars từ Vercel
vercel env pull .env.local

# Push schema
npx prisma db push
```

---

## Bước 5: Verify Database

### Check trong Supabase:

1. Vào **Supabase Dashboard**
2. **Table Editor** tab
3. Bạn sẽ thấy 30+ tables:
   - User
   - Account
   - Session
   - Subscription
   - ScanHistory
   - Watchlist
   - ApiKey
   - ... và nhiều bảng khác

### Tạo Admin User (Optional):

Vào **SQL Editor** → New query → Chạy:

```sql
INSERT INTO "User" (
  id, email, name, password, role, tier, status, 
  "emailVerified", "createdAt", "updatedAt"
) VALUES (
  gen_random_uuid(),
  'admin@antiscam.vn',
  'Admin',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIwNoRKWMK',
  'ADMIN',
  'ENTERPRISE',
  'ACTIVE',
  NOW(),
  NOW(),
  NOW()
);
```

**Login:** `admin@antiscam.vn` / `admin123`

---

## Bước 6: Test Deployment

1. Mở Vercel deployment URL: `https://your-project.vercel.app`
2. Test các trang:
   - `/` - Homepage
   - `/scan` - Scan page
   - `/auth/signin` - Sign in
   - `/pricing` - Pricing tiers
3. Sign up user mới
4. Check trong Supabase Table Editor → User table
5. Nếu thấy user mới → **Success!** 🎉

---

## Troubleshooting

### ❌ "Database connection failed"

**Fix:**
- Check DATABASE_URL và DIRECT_URL trong Vercel env vars
- Verify password không có ký tự đặc biệt chưa encode
- Check Supabase project chưa bị pause (click vào project để resume)

### ❌ "Prisma schema not found"

**Fix:**
```bash
# Chạy lại từ local
npx prisma db push
npx prisma generate
git add .
git commit -m "Regenerate Prisma Client"
git push
```

### ❌ "NextAuth configuration error"

**Fix:**
- Check NEXTAUTH_SECRET có trong Vercel env vars
- NEXTAUTH_URL phải match với Vercel domain chính xác

---

## Environment Variables Checklist

✅ Required cho deployment:
- [x] DATABASE_URL (Supabase session mode - port 6543)
- [x] DIRECT_URL (Supabase transaction mode - port 5432)
- [x] NEXTAUTH_SECRET (random 32+ chars)
- [x] NEXTAUTH_URL (Vercel deployment URL)
- [x] HUGGINGFACE_API_KEY (để scan hoạt động)
- [x] GROQ_API_KEY (để AI analysis hoạt động)

⚠️ Optional (app vẫn chạy nếu thiếu):
- [ ] STRIPE_SECRET_KEY
- [ ] STRIPE_WEBHOOK_SECRET
- [ ] GOOGLE_CLIENT_ID
- [ ] GOOGLE_CLIENT_SECRET
- [ ] VIRUSTOTAL_API_KEY

---

## Quick Commands

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Pull Vercel env to local
vercel env pull .env.local

# Push schema to Supabase
npx prisma db push

# View database
npx prisma studio

# Deploy to Vercel
git push origin main
```

---

**Done! Dự án đã live trên Vercel + Supabase! 🚀**
