# Supabase Setup - Quick Guide 🚀

## Tại sao chọn Supabase?

- ✅ **500 MB database** miễn phí
- ✅ **Unlimited API requests**
- ✅ **Built-in Auth** (có thể thay NextAuth nếu muốn)
- ✅ **Storage** cho file uploads
- ✅ **Realtime subscriptions**
- ✅ **Row Level Security (RLS)**
- ✅ **Auto backups** (7 days free tier)

---

## Bước 1: Tạo Supabase Project

1. Truy cập [Supabase Dashboard](https://supabase.com/dashboard)
2. Click **"New Project"**
3. Điền thông tin:
   - **Name**: `antiscam`
   - **Database Password**: Tạo password mạnh (lưu lại!)
   - **Region**: **Southeast Asia (Singapore)** ← Quan trọng!
   - **Pricing Plan**: **Free** (0$/month)
4. Click **"Create new project"** → Đợi ~2 phút

---

## Bước 2: Lấy Database Connection Strings

1. Vào project vừa tạo
2. Sidebar: **Settings** (⚙️) → **Database**
3. Scroll xuống **Connection string** → Chọn tab **"URI"**
4. Copy 2 connection strings:

### Transaction Mode (Port 5432) - Cho Migrations
```
postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres
```

### Session Mode (Port 6543) - Cho Queries
```
postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
```

> **⚠️ Lưu ý**: 
> - Thay `[YOUR-PASSWORD]` bằng password bạn đã tạo ở Bước 1
> - `[PROJECT-REF]` đã có sẵn trong connection string

---

## Bước 3: Update .env File

```bash
# Tạo file .env từ template
cp .env.example .env

# Mở .env và update:
```

```bash
# Transaction mode - Port 5432 (for migrations)
DIRECT_URL="postgresql://postgres.xxxxx:YOUR_PASSWORD@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"

# Session mode - Port 6543 (for queries with PgBouncer)
DATABASE_URL="postgresql://postgres.xxxxx:YOUR_PASSWORD@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

**Quan trọng:**
- `DIRECT_URL`: Port **5432** (no pgbouncer)
- `DATABASE_URL`: Port **6543** + `?pgbouncer=true`

---

## Bước 4: Push Database Schema

```bash
# Push schema lên Supabase (tạo tables)
npx prisma db push

# Generate Prisma Client
npx prisma generate

# Verify kết nối
npx prisma studio
```

Nếu thành công, bạn sẽ thấy:
```
✔ Database schema pushed successfully
```

---

## Bước 5: View Database

### Cách 1: Prisma Studio (Local)
```bash
npx prisma studio
# Mở http://localhost:5555
```

### Cách 2: Supabase Table Editor (Web)
1. Vào Supabase Dashboard
2. Sidebar: **Table Editor** (📊)
3. Xem tất cả tables đã được tạo:
   - `User`
   - `Account` 
   - `Session`
   - `Subscription`
   - `ScanHistory`
   - `Watchlist`
   - ... và 24+ tables khác

---

## Bước 6: Seed Data (Optional)

```bash
# Tạo seed script
npm run db:seed
```

Hoặc tạo admin user thủ công qua SQL Editor:

```sql
-- Vào Supabase Dashboard → SQL Editor
-- Chạy query này để tạo admin user:

INSERT INTO "User" (id, email, name, role, tier, status, password)
VALUES (
  gen_random_uuid(),
  'admin@antiscam.vn',
  'Admin',
  'ADMIN',
  'ENTERPRISE',
  'ACTIVE',
  '$2a$12$your-bcrypt-hashed-password-here'
);
```

---

## Bước 7: Test Connection

```bash
# Start dev server
npm run dev

# Test trong browser:
# 1. Mở http://localhost:3000
# 2. Sign up một user mới
# 3. Check Supabase Table Editor → User table
# 4. Nếu thấy user mới → Success! 🎉
```

---

## Bonus Features (Nếu muốn dùng thêm)

### 1. Supabase Auth (Thay NextAuth)

Supabase có built-in auth, nếu muốn chuyển sang:

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Sign up
await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123'
})
```

### 2. Storage (Upload files)

```typescript
// Upload scan results as PDF
const { data, error } = await supabase.storage
  .from('scan-reports')
  .upload('report.pdf', pdfFile)
```

### 3. Realtime (Live updates)

```typescript
// Subscribe to watchlist alerts
supabase
  .channel('watchlist')
  .on('postgres_changes', 
    { event: 'INSERT', schema: 'public', table: 'WatchlistAlert' },
    (payload) => console.log('New alert!', payload)
  )
  .subscribe()
```

---

## Troubleshooting

### ❌ "Can't reach database server"

**Fix:**
- Check internet connection
- Verify password không có ký tự đặc biệt (nếu có thì URL encode)
- Thử pause/resume database trong Supabase Dashboard

### ❌ "SSL connection required"

**Fix:**
```bash
# Thêm ?sslmode=require vào connection string
DATABASE_URL="postgresql://...?pgbouncer=true&sslmode=require"
```

### ❌ "Too many connections"

**Fix:**
- Đảm bảo dùng port **6543** (PgBouncer) cho DATABASE_URL
- Port 5432 chỉ dùng cho DIRECT_URL (migrations only)

### ❌ Prisma không generate models

**Fix:**
```bash
# Clear cache
rm -rf node_modules/.prisma
npx prisma generate

# Restart VS Code TypeScript server
# Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

---

## Production Deployment

### Deploy lên Vercel

1. **Push code lên GitHub**

```bash
git add .
git commit -m "Add Supabase database"
git push origin main
```

2. **Deploy Vercel**

```bash
vercel --prod
```

3. **Add Environment Variables**

Vào Vercel Dashboard → Project Settings → Environment Variables:

```
DATABASE_URL=postgresql://postgres.xxx:password@...6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.xxx:password@...5432/postgres
NEXTAUTH_SECRET=your-random-32-char-secret
STRIPE_SECRET_KEY=sk_live_xxx
... (all .env variables)
```

4. **Redeploy**
```bash
vercel --prod
```

---

## Supabase Dashboard Tips

### SQL Editor - Useful Queries

```sql
-- Check total users
SELECT COUNT(*) FROM "User";

-- Check subscriptions
SELECT u.email, s.tier, s.status 
FROM "User" u 
LEFT JOIN "Subscription" s ON u.id = s."userId";

-- Check scan history
SELECT u.email, COUNT(sh.id) as total_scans
FROM "User" u
LEFT JOIN "ScanHistory" sh ON u.id = sh."userId"
GROUP BY u.email
ORDER BY total_scans DESC;

-- Check API key usage
SELECT u.email, COUNT(ak.id) as api_keys
FROM "User" u
LEFT JOIN "ApiKey" ak ON u.id = ak."userId"
GROUP BY u.email;
```

### Enable Extensions

```sql
-- Vào SQL Editor chạy:
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";
```

---

## Free Tier Limits

- **Database**: 500 MB storage
- **Storage**: 1 GB files
- **Bandwidth**: 2 GB/month
- **Connections**: Unlimited (via PgBouncer)
- **Backups**: 7 days retention
- **Pausing**: After 1 week inactivity (auto-resume on connect)

**Upgrade nếu vượt limit:** $25/month cho Pro plan

---

## Next Steps

1. ✅ Setup Supabase database
2. ✅ Push Prisma schema
3. ✅ Test local connection
4. ⬜ Setup Stripe (payment)
5. ⬜ Setup OAuth providers
6. ⬜ Deploy to Vercel
7. ⬜ Configure domain

**Database đã sẵn sàng production! 🚀**

Có vấn đề gì cứ hỏi nhé!
