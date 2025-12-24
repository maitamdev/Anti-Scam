# Database Setup Guide - Production Ready

## Option 1: Vercel Postgres (Recommended - Miễn phí)

### Bước 1: Tạo Vercel Postgres Database

1. Truy cập [Vercel Dashboard](https://vercel.com/dashboard)
2. Vào tab **Storage** → Click **Create Database**
3. Chọn **Postgres** → Chọn region gần nhất (Singapore)
4. Tên database: `antiscam-production`
5. Plan: **Hobby (Free)** - 60 hours compute time/month, 256 MB storage

### Bước 2: Lấy Connection Strings

Sau khi tạo xong, copy các environment variables:

```bash
# .env.local
DATABASE_URL="postgres://default:xxxx@xxxx-pooler.postgres.vercel-storage.com/verceldb?sslmode=require"
DIRECT_URL="postgres://default:xxxx@xxxx.postgres.vercel-storage.com/verceldb?sslmode=require"
```

- `DATABASE_URL`: Dùng cho Connection Pooling (Prisma queries)
- `DIRECT_URL`: Dùng cho Migrations (Prisma Migrate)

### Bước 3: Update .env

```bash
# Copy .env.example sang .env
cp .env.example .env

# Thêm connection strings vào .env
DATABASE_URL="your-vercel-postgres-url"
DIRECT_URL="your-vercel-postgres-direct-url"
```

### Bước 4: Run Migrations

```bash
# Push schema to database
npx prisma db push

# Hoặc tạo migrations
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate
```

### Bước 5: Seed Data (Optional)

```bash
# Run seed script
npm run db:seed
```

---

## Option 2: Neon Postgres (Alternative - Miễn phí)

### Tại sao chọn Neon?
- ✅ **Serverless Postgres** - Auto-scale, auto-suspend
- ✅ **Free tier**: 512 MB storage, unlimited queries
- ✅ **Fast**: Connection pooling built-in
- ✅ **Branching**: Test migrations trên branch riêng

### Setup Neon

1. Truy cập [Neon Console](https://console.neon.tech)
2. Create New Project → Tên: `antiscam-db`
3. Region: **AWS Singapore** (ap-southeast-1)
4. Copy connection string:

```bash
DATABASE_URL="postgresql://username:password@ep-xxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
```

Neon tự động có connection pooling, không cần DIRECT_URL riêng.

### Update .env

```bash
DATABASE_URL="your-neon-postgres-url"
DIRECT_URL="your-neon-postgres-url"  # Same as DATABASE_URL for Neon
```

### Run Migrations

```bash
npx prisma db push
npx prisma generate
```

---

## Option 3: Supabase Postgres (Free + Extras)

### Tại sao chọn Supabase?
- ✅ **500 MB database** miễn phí
- ✅ **Built-in Auth, Storage, Realtime**
- ✅ **PostgreSQL + Extensions**
- ✅ **Row Level Security (RLS)**

### Setup Supabase

1. Truy cập [Supabase Dashboard](https://supabase.com/dashboard)
2. New Project → Tên: `antiscam`, Password: (strong password)
3. Region: **Southeast Asia (Singapore)**
4. Vào **Settings** → **Database** → Copy Connection String

```bash
# Transaction mode (cho migrations)
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres"

# Session mode (cho queries)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:6543/postgres?pgbouncer=true"
```

### Update .env

```bash
DATABASE_URL="your-supabase-session-url"
DIRECT_URL="your-supabase-direct-url"
```

### Run Migrations

```bash
npx prisma db push
npx prisma generate
```

---

## Option 4: Railway Postgres (Simple Setup)

### Setup Railway

1. Truy cập [Railway.app](https://railway.app)
2. New Project → **Provision PostgreSQL**
3. Copy `DATABASE_URL` from **Connect** tab
4. Update .env:

```bash
DATABASE_URL="postgresql://postgres:xxx@xxx.railway.app:5432/railway"
DIRECT_URL="postgresql://postgres:xxx@xxx.railway.app:5432/railway"
```

Free tier: **500 MB storage, 5 GB bandwidth**

---

## Migration Commands

### Tạo migration mới
```bash
npx prisma migrate dev --name add_new_feature
```

### Apply migrations to production
```bash
npx prisma migrate deploy
```

### Reset database (CHỈ DÙNG CHO DEV!)
```bash
npx prisma migrate reset
```

### View database trong Prisma Studio
```bash
npx prisma studio
```

### Generate Prisma Client sau khi đổi schema
```bash
npx prisma generate
```

---

## So sánh Providers

| Provider | Free Storage | Free Compute | Connection Pool | Best For |
|----------|-------------|--------------|----------------|----------|
| **Vercel Postgres** | 256 MB | 60h/month | ✅ Built-in | Next.js + Vercel deploy |
| **Neon** | 512 MB | Unlimited | ✅ Built-in | Serverless, auto-scale |
| **Supabase** | 500 MB | Unlimited | ✅ PgBouncer | Full backend features |
| **Railway** | 500 MB | $5 credit/month | ⚠️ Manual | Simple setup |

---

## Recommended: Vercel Postgres

Vì dự án này deploy trên Vercel, dùng **Vercel Postgres** sẽ có:
- ✅ **Zero-config integration** với Vercel deployment
- ✅ **Automatic environment variables** injection
- ✅ **Same region deployment** (low latency)
- ✅ **Built-in monitoring** trong Vercel Dashboard

### Quick Setup (2 phút)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Link project
vercel link

# 3. Create database từ CLI
vercel postgres create antiscam-db

# 4. Pull environment variables
vercel env pull .env.local

# 5. Run migrations
npx prisma db push

# Done! 🎉
```

---

## Troubleshooting

### Lỗi: "Can't reach database server"
- Check connection string có đúng không
- Check firewall/network
- Với Supabase: Đảm bảo dùng đúng port (5432 cho DIRECT, 6543 cho pooling)

### Lỗi: "SSL connection required"
- Thêm `?sslmode=require` vào connection string
- Hoặc `?ssl=true` cho một số providers

### Lỗi: "Too many connections"
- Sử dụng connection pooling URL (DATABASE_URL)
- Với Supabase: Dùng port 6543 (PgBouncer)
- Với Vercel/Neon: Đã có sẵn pooling

### Prisma Client không generate models
```bash
# Clear cache và regenerate
rm -rf node_modules/.prisma
npx prisma generate
```

---

## Production Best Practices

1. **Luôn dùng connection pooling** cho production
2. **Backup database** định kỳ (Vercel/Supabase có auto-backup)
3. **Monitor query performance** qua Prisma Metrics
4. **Use indexes** cho các query thường xuyên (đã có trong schema)
5. **Enable SSL** cho mọi connections
6. **Limit connection pool size**: `connection_limit=10` trong DATABASE_URL

---

## Next Steps

Sau khi setup database xong:

1. ✅ Update `.env` với production DATABASE_URL
2. ✅ Run `npx prisma db push`
3. ✅ Run `npx prisma generate`
4. ✅ Test connection: `npm run dev`
5. ✅ Deploy to Vercel: `vercel --prod`

**Chúc mừng! Database production đã sẵn sàng! 🚀**
