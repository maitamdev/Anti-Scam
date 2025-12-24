# 🚀 ANTI-SCAM Freemium Upgrade - Implementation Roadmap

## ✅ Completed Features

### 1. Database Schema (100%)
- ✅ User authentication models (User, Account, Session, VerificationToken)
- ✅ Subscription & billing models (Subscription, Payment, ApiKey, ApiUsage)
- ✅ Freemium features (ScanHistory, ImageScanHistory, Watchlist, WatchlistAlert)
- ✅ B2B/B2E models (Organization, OrganizationMember, Campaign, CampaignEnrollment, CustomQuiz)
- ✅ Community & CSR (CommunityContribution, CampaignPage, DownloadableResource, CampaignSponsor)
- ✅ Enhanced Report model with moderation workflow

### 2. Authentication System (100%)
- ✅ NextAuth.js setup với Prisma adapter
- ✅ Email/Password provider
- ✅ Google OAuth provider
- ✅ Session management với JWT
- ✅ User registration API
- ✅ Type definitions cho NextAuth

### 3. Payment Integration (100%)
- ✅ Stripe integration
- ✅ Checkout session API
- ✅ Customer portal API
- ✅ Webhook handler cho subscription events
- ✅ Payment tracking

### 4. Rate Limiting (100%)
- ✅ Tier-based rate limiting
- ✅ Daily quota tracking
- ✅ IP-based limiting cho anonymous users
- ✅ Usage increment functions

### 5. Core Pages (50%)
- ✅ Dashboard layout
- ✅ Pricing page với 4 tiers (Free, Pro, Business, Enterprise)
- ⏳ Scan history page
- ⏳ Watchlist management page
- ⏳ Billing & subscription management
- ⏳ API keys management

### 6. Environment Configuration (100%)
- ✅ Comprehensive .env.example với tất cả biến cần thiết
- ✅ Database, Auth, Payment, AI, Storage configs

---

## 🔨 TODO - High Priority

### Phase 1: Core Freemium Features (Week 1-2)

#### A. Scan History Implementation
- [ ] Update `/api/scan/route.ts` để lưu vào ScanHistory
- [ ] Create `/dashboard/history/page.tsx`
  - [ ] Hiển thị list scans với pagination
  - [ ] Filters: date range, risk level, domain
  - [ ] Search functionality
  - [ ] Free tier: 10-20 scans gần nhất
  - [ ] Paid tier: unlimited + advanced search
- [ ] Create scan detail view
- [ ] Export functionality (CSV for Pro, PDF for Business)

#### B. PDF Export Feature
- [ ] Install `@react-pdf/renderer` or `jsPDF`
- [ ] Create PDF template với branding
- [ ] API route `/api/export/pdf/[scanId]`
  - [ ] Free: plain PDF
  - [ ] Pro/Business: branded PDF with logo
- [ ] Share link feature (public URL for scan results)

#### C. Watchlist Feature
- [ ] Create `/dashboard/watchlist/page.tsx`
- [ ] Add domain/email/phone to watchlist UI
- [ ] Alert system
  - [ ] Background job checking for matches
  - [ ] Email notifications
  - [ ] In-app notifications
- [ ] Watchlist alerts dashboard

#### D. Updated Scan API with Auth
- [ ] Check authentication
- [ ] Check rate limits
- [ ] Save to ScanHistory if authenticated
- [ ] Check against user's Watchlist
- [ ] Trigger alerts if match found

---

### Phase 2: B2B/B2E Features (Week 3-4)

#### A. Organization Dashboard
- [ ] Create `/org/[slug]/page.tsx`
- [ ] Member management UI
  - [ ] Invite members
  - [ ] Role assignment (Owner, Admin, Trainer, Member)
  - [ ] Remove members
- [ ] Organization settings
  - [ ] Branding (logo, colors)
  - [ ] Custom domain setup
- [ ] Analytics dashboard
  - [ ] Scans by department
  - [ ] Risk trends
  - [ ] Top threats
  - [ ] Employee training progress

#### B. Training Campaign System
- [ ] Create `/org/[slug]/campaigns/page.tsx`
- [ ] Campaign creation wizard
  - [ ] Select duration (7/14/30 days)
  - [ ] Choose quiz sets
  - [ ] Schedule start date
  - [ ] Assign participants
- [ ] Campaign dashboard
  - [ ] Progress tracking
  - [ ] Completion rates
  - [ ] Quiz scores by day
  - [ ] Leaderboard
- [ ] Email reminders for participants
- [ ] Certificate generation on completion

#### C. Custom Quiz Builder
- [ ] Create `/org/[slug]/quizzes/page.tsx`
- [ ] Quiz builder interface
  - [ ] Question types: multiple choice, true/false, scenario
  - [ ] Add images to questions
  - [ ] Set difficulty level
  - [ ] Assign to industry category
- [ ] Industry templates
  - [ ] Education sector
  - [ ] Finance/Banking
  - [ ] Healthcare
  - [ ] E-commerce
  - [ ] Government
- [ ] Quiz preview & testing
- [ ] Quiz analytics

#### D. API Key Management
- [ ] Create `/dashboard/api-keys/page.tsx`
- [ ] Generate API key functionality
- [ ] Display keys with prefix (as_xxx...)
- [ ] Regenerate keys
- [ ] Delete keys
- [ ] API usage statistics
- [ ] Rate limit monitoring
- [ ] API documentation page (Swagger/OpenAPI)

#### E. Embeddable Widget
- [ ] Create widget script `/widget/antiscam.js`
- [ ] Iframe embed option
- [ ] Customizable styling
- [ ] Widget configuration
  - [ ] Colors
  - [ ] Button text
  - [ ] Language
- [ ] Installation guide for organizations

---

### Phase 3: CSR & Community Features (Week 5-6)

#### A. Campaign Landing Pages
- [ ] Create `/campaigns/[slug]/page.tsx`
- [ ] Public campaign statistics
  - [ ] Total scans
  - [ ] Reports submitted
  - [ ] Scams prevented
  - [ ] Participants
- [ ] Sponsor showcase section
- [ ] Call-to-action (Join campaign)
- [ ] Social sharing buttons

#### B. Resource Download Center
- [ ] Create `/resources/page.tsx`
- [ ] Categorize resources
  - [ ] Posters
  - [ ] Infographics
  - [ ] Checklists
  - [ ] Presentations
  - [ ] Videos
- [ ] Filters by:
  - [ ] Type
  - [ ] Industry
  - [ ] Language
- [ ] Download tracking
- [ ] Custom template generator (Business+ tier)

#### C. Community Leaderboard
- [ ] Create `/community/leaderboard/page.tsx`
- [ ] Points system
  - [ ] Report scam: 10 points
  - [ ] Verified report: 50 points
  - [ ] Help others: 5 points
  - [ ] Share campaign: 3 points
- [ ] Monthly/All-time leaderboards
- [ ] User badges & achievements
- [ ] Prevent gaming the system (verification required)

---

### Phase 4: Moderation & Trust Features (Week 7)

#### A. Report Moderation System
- [ ] Create `/admin/reports/page.tsx`
- [ ] Report queue for admins
  - [ ] Pending reports
  - [ ] Spam detection
  - [ ] Duplicate detection
- [ ] Moderation actions
  - [ ] Approve
  - [ ] Reject
  - [ ] Mark as spam
  - [ ] Merge duplicates
- [ ] Trust score calculation
- [ ] Auto-approval for high-trust users

#### B. CAPTCHA Integration
- [ ] Add hCaptcha or reCAPTCHA to:
  - [ ] Report submission
  - [ ] Registration
  - [ ] Anonymous scans (after quota)
- [ ] Spam prevention middleware

#### C. Transparency Page
- [ ] Create `/transparency/page.tsx`
- [ ] Data collection disclosure
  - [ ] What data we collect
  - [ ] How long we store it
  - [ ] Who has access
  - [ ] How to delete your data
- [ ] Privacy policy
- [ ] Terms of service
- [ ] Cookie policy
- [ ] GDPR compliance statement

---

## 🎨 UI/UX Improvements

### Components to Create
- [ ] `<PlanBadge />` - Display user tier
- [ ] `<UsageProgress />` - Show daily quota usage
- [ ] `<HistoryCard />` - Scan history item
- [ ] `<WatchlistItem />` - Watchlist entry
- [ ] `<CampaignCard />` - Training campaign card
- [ ] `<QuizBuilder />` - Interactive quiz builder
- [ ] `<ResourceCard />` - Downloadable resource item
- [ ] `<LeaderboardTable />` - Community rankings
- [ ] `<NotificationBell />` - In-app notifications
- [ ] `<TeamMemberRow />` - Organization member management

### Responsive Design
- [ ] Mobile-optimized dashboard
- [ ] Tablet layouts for admin panels
- [ ] Touch-friendly quiz interface

---

## 🔐 Security & Performance

### Security Enhancements
- [ ] Rate limiting middleware
- [ ] CSRF protection
- [ ] XSS prevention
- [ ] SQL injection protection (Prisma handles this)
- [ ] Input validation with Zod
- [ ] Secure password hashing (bcrypt)
- [ ] API key encryption at rest

### Performance Optimizations
- [ ] Redis caching for:
  - [ ] Scan results
  - [ ] API responses
  - [ ] Rate limit counters
- [ ] Database indexing (already in schema)
- [ ] Image optimization with Next.js Image
- [ ] Lazy loading for large lists
- [ ] Pagination for all data tables

---

## 📊 Analytics & Monitoring

### Analytics to Implement
- [ ] Google Analytics integration
- [ ] Custom events tracking
  - [ ] Scans performed
  - [ ] Reports submitted
  - [ ] Upgrades to paid tiers
  - [ ] API calls
- [ ] Conversion funnel tracking

### Monitoring
- [ ] Sentry for error tracking
- [ ] Uptime monitoring
- [ ] Performance monitoring
- [ ] Database query optimization

---

## 📧 Email System

### Email Templates Needed
- [ ] Welcome email
- [ ] Email verification
- [ ] Password reset
- [ ] Subscription confirmation
- [ ] Invoice receipt
- [ ] Watchlist alert
- [ ] Campaign reminder (daily for training)
- [ ] Report verification result
- [ ] Tier upgrade/downgrade confirmation

### Email Service Setup
- [ ] Choose provider (SendGrid, Resend, or AWS SES)
- [ ] Create branded email templates
- [ ] Implement email queue system

---

## 🧪 Testing

### Testing Strategy
- [ ] Unit tests for utilities
- [ ] Integration tests for API routes
- [ ] E2E tests for critical flows:
  - [ ] Sign up → Scan → Upgrade → Payment
  - [ ] Create organization → Add members → Launch campaign
- [ ] Load testing for API endpoints

---

## 📱 Future Enhancements (Post-MVP)

### Mobile App
- [ ] React Native app
- [ ] Quick scan feature
- [ ] Push notifications
- [ ] Offline mode

### Browser Extension
- [ ] Chrome extension
- [ ] Firefox extension
- [ ] Edge extension
- [ ] Real-time URL checking
- [ ] Warning overlays on suspicious sites

### Advanced AI Features
- [ ] Train custom ML model
- [ ] Real-time threat intelligence
- [ ] Behavioral analysis
- [ ] Voice/audio scam detection
- [ ] Deepfake detection

### Integrations
- [ ] Slack bot
- [ ] Microsoft Teams app
- [ ] Webhook integrations
- [ ] Zapier integration
- [ ] API partnerships with banks

---

## 🗓️ Timeline Summary

| Phase | Duration | Key Features |
|-------|----------|-------------|
| Phase 1 | 2 weeks | Scan History, PDF Export, Watchlist |
| Phase 2 | 2 weeks | Organizations, Campaigns, API Keys |
| Phase 3 | 2 weeks | Public Campaigns, Resources, Leaderboard |
| Phase 4 | 1 week | Moderation, Transparency, CAPTCHA |
| **Total MVP** | **7 weeks** | Full Freemium B2B/B2E Platform |

---

## 📦 Deployment Checklist

### Pre-Deployment
- [ ] Run `npm run build` successfully
- [ ] Database migrations complete
- [ ] Environment variables configured on hosting
- [ ] Stripe webhooks configured
- [ ] DNS records for custom domain
- [ ] SSL certificate setup

### Production Environment
- [ ] Vercel/Railway/AWS deployment
- [ ] PostgreSQL database (Supabase, Neon, or RDS)
- [ ] Redis instance for caching
- [ ] S3 or Cloudinary for file uploads
- [ ] CDN for static assets

### Post-Deployment
- [ ] Smoke tests on production
- [ ] Monitor error rates
- [ ] Set up alerts for downtime
- [ ] Create admin user accounts
- [ ] Seed initial data (whitelists, guides)

---

## 💰 Revenue Targets

### Year 1 Goals
- Month 1-2: Beta launch, 100 free users
- Month 3-6: 500 free users, 50 Pro users ($250 MRR)
- Month 7-12: 2000 free, 200 Pro, 10 Business ($2500 MRR)

### B2B Sales Strategy
- Target schools (100-500 students): Business tier
- Target companies (500+ employees): Enterprise tier
- Partner with banks for white-label solution

---

## 📞 Support

### Documentation Needed
- [ ] User guide (Vietnamese & English)
- [ ] API documentation
- [ ] Organization admin guide
- [ ] Campaign creation tutorial
- [ ] FAQs

### Support Channels
- [ ] Email support (support@antiscam.vn)
- [ ] Community forum
- [ ] Live chat (for Business+ tier)
- [ ] Video tutorials

---

**Last Updated:** December 24, 2025
**Version:** 2.0.0-freemium
**Maintainer:** ANTISCAM Development Team
