# 🚀 FREEMIUM UPGRADE - Quick Start Guide

## 📋 Tổng quan

Dự án ANTISCAM đã được nâng cấp lên mô hình **Freemium B2B/B2E** với đầy đủ tính năng thương mại hóa.

## ✅ Đã hoàn thành (60%)

### 🗄️ Database Schema
- ✅ User authentication & authorization
- ✅ Subscription & payment management
- ✅ API key management
- ✅ Scan history & image scan history
- ✅ Watchlist & alerts
- ✅ Organization management (B2B/B2E)
- ✅ Training campaigns & enrollments
- ✅ Custom quiz system
- ✅ Community contributions
- ✅ Campaign pages & downloadable resources
- ✅ Enhanced report moderation

### 🔐 Authentication
- ✅ NextAuth.js setup
- ✅ Email/Password login
- ✅ Google OAuth
- ✅ User registration API
- ✅ Session management
- ✅ Type-safe auth with TypeScript

### 💳 Payment System
- ✅ Stripe integration
- ✅ Subscription tiers (Free, Pro, Business, Enterprise)
- ✅ Checkout API
- ✅ Customer portal
- ✅ Webhook handlers
- ✅ Payment tracking

### 📊 Core Features
- ✅ Rate limiting by tier
- ✅ User dashboard
- ✅ Pricing page
- ✅ Sign in/Sign up pages

### 📦 Dependencies
- ✅ next-auth - Authentication
- ✅ stripe - Payment processing
- ✅ bcryptjs - Password hashing
- ✅ @tanstack/react-query - Data fetching
- ✅ react-hook-form - Form handling
- ✅ date-fns - Date utilities
- ✅ recharts - Charts & analytics
- ✅ Radix UI components

## ⏳ Còn lại cần làm (40%)

### Phase 1: Core Freemium (Tuần 1-2)
1. **Scan History Implementation**
   - Update API scan để lưu history
   - Trang history với filters & search
   - Free: 10-20 scans gần nhất
   - Pro: unlimited + advanced search

2. **PDF Export**
   - Branded PDF reports
   - Share links cho scan results
   - Free: plain view
   - Pro/Business: custom branding

3. **Watchlist Feature**
   - Add domains/emails/phones
   - Auto-detect & alert
   - Email notifications

### Phase 2: B2B/B2E (Tuần 3-4)
4. **Organization Dashboard**
   - Member management
   - Custom branding
   - Analytics by department

5. **Training Campaigns**
   - 7/14/30 day programs
   - Progress tracking
   - Certificates

6. **Custom Quiz Builder**
   - Industry templates
   - Question bank
   - Analytics

7. **API Keys Management**
   - Generate/revoke keys
   - Usage tracking
   - API docs (Swagger)

8. **Embeddable Widget**
   - iframe widget
   - Customizable styling

### Phase 3: Community (Tuần 5-6)
9. **Public Campaign Pages**
10. **Resource Center**
11. **Leaderboard**

### Phase 4: Moderation (Tuần 7)
12. **Report Moderation**
13. **CAPTCHA**
14. **Transparency Page**

## 🏗️ Cấu trúc mới

```
app/
├── api/
│   ├── auth/
│   │   ├── [...nextauth]/route.ts  ✅
│   │   └── register/route.ts       ✅
│   ├── stripe/
│   │   ├── checkout/route.ts       ✅
│   │   └── portal/route.ts         ✅
│   ├── webhooks/
│   │   └── stripe/route.ts         ✅
│   └── ... (existing APIs)
├── auth/
│   ├── signin/page.tsx             ✅
│   └── signup/page.tsx             ✅
├── dashboard/
│   ├── page.tsx                    ✅
│   ├── history/page.tsx            ⏳
│   ├── watchlist/page.tsx          ⏳
│   ├── billing/page.tsx            ⏳
│   └── api-keys/page.tsx           ⏳
├── org/
│   └── [slug]/
│       ├── page.tsx                ⏳
│       ├── campaigns/page.tsx      ⏳
│       └── quizzes/page.tsx        ⏳
├── pricing/page.tsx                ✅
└── lib/
    ├── auth.ts                     ✅
    ├── stripe.ts                   ✅
    └── rate-limit.ts               ✅

prisma/
└── schema.prisma                   ✅ (completely upgraded)

types/
└── next-auth.d.ts                  ✅
```

## 🚀 Cài đặt & Chạy

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Cấu hình môi trường
Copy `.env.example` thành `.env` và điền các giá trị:

```bash
cp .env.example .env
```

**Bắt buộc:**
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_URL` - URL của app (http://localhost:3000)
- `NEXTAUTH_SECRET` - Secret key (dùng `openssl rand -base64 32`)
- `STRIPE_SECRET_KEY` - Stripe secret key

**Tùy chọn:**
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` - Google OAuth
- `STRIPE_WEBHOOK_SECRET` - Stripe webhooks
- Price IDs cho Pro & Business tiers

### 3. Setup Database
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed initial data
npm run db:seed
```

### 4. Setup Stripe (nếu dùng payment)

1. Tạo account tại [stripe.com](https://stripe.com)
2. Lấy API keys từ Dashboard
3. Tạo 2 products:
   - **Pro Plan**: $4.99/month
   - **Business Plan**: $19.99/month
4. Copy Price IDs vào `.env`
5. Setup webhook endpoint:
   ```
   URL: https://your-domain.com/api/webhooks/stripe
   Events: 
   - checkout.session.completed
   - customer.subscription.updated
   - customer.subscription.deleted
   - invoice.payment_succeeded
   - invoice.payment_failed
   ```

### 5. Chạy development server
```bash
npm run dev
```

Truy cập:
- App: http://localhost:3000
- Dashboard: http://localhost:3000/dashboard (sau khi đăng nhập)
- Pricing: http://localhost:3000/pricing

## 📖 Sử dụng

### Tạo tài khoản mới
1. Vào `/auth/signup`
2. Điền email, password
3. Đăng ký → tự động có FREE tier

### Nâng cấp lên Pro/Business
1. Đăng nhập
2. Vào `/pricing`
3. Chọn plan → thanh toán qua Stripe
4. Webhook tự động update tier

### Sử dụng API Keys (cho developers)
1. Vào `/dashboard/api-keys`
2. Generate key mới
3. Dùng trong headers:
   ```javascript
   fetch('https://your-domain.com/api/scan', {
     headers: {
       'Authorization': 'Bearer YOUR_API_KEY'
     }
   })
   ```

## 💰 Pricing Tiers

| Feature | Free | Pro | Business | Enterprise |
|---------|------|-----|----------|------------|
| Scans/day | 10 | 100 | 1000 | Unlimited |
| Image scans/day | 3 | 30 | 200 | Unlimited |
| History | 10 recent | Unlimited | Unlimited | Unlimited |
| PDF Export | ❌ | ✅ | ✅ Branded | ✅ Custom |
| Watchlist | ❌ | ✅ | ✅ | ✅ |
| API Access | ❌ | ❌ | 50K calls | Unlimited |
| Organizations | ❌ | ❌ | ✅ | ✅ |
| Campaigns | ❌ | ❌ | ✅ | ✅ Custom |
| Support | Community | Email | 24/7 | Dedicated |
| Price | $0 | $4.99/mo | $19.99/mo | Custom |

## 📚 Tài liệu chi tiết

- [FREEMIUM_ROADMAP.md](docs/FREEMIUM_ROADMAP.md) - Roadmap đầy đủ
- [GITHUB_PAGES_SETUP.md](docs/GITHUB_PAGES_SETUP.md) - Deploy hướng dẫn
- [VIRUSTOTAL_SETUP.md](docs/VIRUSTOTAL_SETUP.md) - VirusTotal setup

## 🔧 Development Workflow

### Tạo tính năng mới
1. Update schema nếu cần: `prisma/schema.prisma`
2. Generate client: `npm run db:generate`
3. Push changes: `npm run db:push`
4. Tạo API route: `app/api/[feature]/route.ts`
5. Tạo page: `app/[feature]/page.tsx`
6. Test locally
7. Deploy

### Testing Stripe Locally
```bash
# Install Stripe CLI
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Test payment
# Dùng test card: 4242 4242 4242 4242
```

## 🚀 Deploy to Production

### Vercel (Recommended)
```bash
vercel deploy
```

Thêm environment variables trong Vercel dashboard.

### Railway
1. Connect GitHub repo
2. Add PostgreSQL service
3. Configure environment variables
4. Deploy

## 🎯 Next Steps

1. **Hoàn thành Scan History** - Ưu tiên cao nhất
2. **PDF Export** - Tạo value cho Pro tier
3. **Watchlist** - Unique feature
4. **Organization Dashboard** - B2B revenue driver
5. **API Documentation** - Thu hút developers

## 💬 Support

- Email: support@antiscam.vn
- GitHub Issues
- Documentation: Coming soon

## 📄 License

MIT License - ANTISCAM Team
