$ErrorActionPreference = "Continue"
function MF($p, $c) { $d = Split-Path $p -Parent; if (!(Test-Path $d)) { New-Item -ItemType Directory -Path $d -Force | Out-Null }; [System.IO.File]::WriteAllText($p, $c, [System.Text.Encoding]::UTF8) }
function AC($p, $m) { git add $p 2>$null; git commit -m $m 2>$null }

# CI/CD (10)
MF ".github/workflows/ci.yml" "name: CI`non: [push, pull_request]`njobs:`n  test:`n    runs-on: ubuntu-latest`n    steps:`n      - uses: actions/checkout@v4`n      - uses: actions/setup-node@v4`n        with: {node-version: '20'}`n      - run: npm ci`n      - run: npm run test`n  lint:`n    runs-on: ubuntu-latest`n    steps:`n      - uses: actions/checkout@v4`n      - uses: actions/setup-node@v4`n        with: {node-version: '20'}`n      - run: npm ci`n      - run: npm run lint"
AC ".github/workflows/ci.yml" "ci: add GitHub Actions CI workflow for tests and linting"

MF ".github/workflows/deploy.yml" "name: Deploy`non:`n  push:`n    branches: [main]`njobs:`n  deploy:`n    runs-on: ubuntu-latest`n    steps:`n      - uses: actions/checkout@v4`n      - uses: actions/setup-node@v4`n        with: {node-version: '20'}`n      - run: npm ci`n      - run: npm run build`n      - uses: amondnet/vercel-action@v25`n        with:`n          vercel-token: `${{ secrets.VERCEL_TOKEN }}`n          vercel-org-id: `${{ secrets.VERCEL_ORG_ID }}`n          vercel-project-id: `${{ secrets.VERCEL_PROJECT_ID }}`n          vercel-args: '--prod'"
AC ".github/workflows/deploy.yml" "ci: add Vercel deployment workflow"

MF ".github/workflows/security.yml" "name: Security Audit`non:`n  schedule:`n    - cron: '0 0 * * 1'`n  push:`n    branches: [main]`njobs:`n  audit:`n    runs-on: ubuntu-latest`n    steps:`n      - uses: actions/checkout@v4`n      - uses: actions/setup-node@v4`n        with: {node-version: '20'}`n      - run: npm audit --audit-level=high"
AC ".github/workflows/security.yml" "ci: add weekly security audit workflow"

MF ".github/workflows/codeql.yml" "name: CodeQL Analysis`non:`n  push:`n    branches: [main]`n  schedule:`n    - cron: '0 8 * * 1'`njobs:`n  analyze:`n    runs-on: ubuntu-latest`n    permissions: {actions: read, contents: read, security-events: write}`n    steps:`n      - uses: actions/checkout@v4`n      - uses: github/codeql-action/init@v3`n        with: {languages: javascript-typescript}`n      - uses: github/codeql-action/analyze@v3"
AC ".github/workflows/codeql.yml" "ci: add CodeQL security analysis workflow"

MF ".github/dependabot.yml" "version: 2`nupdates:`n  - package-ecosystem: npm`n    directory: /`n    schedule:`n      interval: weekly`n    open-pull-requests-limit: 10`n    labels: [dependencies]`n  - package-ecosystem: github-actions`n    directory: /`n    schedule:`n      interval: monthly"
AC ".github/dependabot.yml" "ci: add Dependabot dependency update configuration"

MF ".github/ISSUE_TEMPLATE/bug_report.md" "---`nname: Bug Report`nabout: Report a bug`ntitle: '[BUG] '`nlabels: bug`n---`n**Describe the bug**`nA clear description.`n**Steps to reproduce**`n1. Go to...`n2. Click on...`n**Expected behavior**`nWhat you expected.`n**Screenshots**`nIf applicable.`n**Environment**`n- OS: [e.g. Windows 11]`n- Browser: [e.g. Chrome 120]"
AC ".github/ISSUE_TEMPLATE/bug_report.md" "docs: add bug report issue template"

MF ".github/ISSUE_TEMPLATE/feature_request.md" "---`nname: Feature Request`nabout: Suggest a feature`ntitle: '[FEATURE] '`nlabels: enhancement`n---`n**Problem**`nDescribe the problem.`n**Solution**`nDescribe your proposed solution.`n**Alternatives**`nAny alternatives considered.`n**Context**`nAdditional context."
AC ".github/ISSUE_TEMPLATE/feature_request.md" "docs: add feature request issue template"

MF ".github/pull_request_template.md" "## Description`nDescribe your changes.`n`n## Type of Change`n- [ ] Bug fix`n- [ ] New feature`n- [ ] Breaking change`n- [ ] Documentation`n`n## Checklist`n- [ ] My code follows the project style`n- [ ] I have added tests`n- [ ] All tests pass`n- [ ] I have updated documentation"
AC ".github/pull_request_template.md" "docs: add pull request template"

MF ".github/CODEOWNERS" "* @maitamdev`napp/api/ @maitamdev`napp/lib/ @maitamdev`napp/components/ @maitamdev`nprisma/ @maitamdev"
AC ".github/CODEOWNERS" "ci: add CODEOWNERS file for review assignments"

MF ".github/FUNDING.yml" "github: [maitamdev]"
AC ".github/FUNDING.yml" "ci: add GitHub funding configuration"

Write-Host "CI/CD done: 10 commits"

# DOCUMENTATION (20)
MF "docs/API.md" "# Anti-Scam API Documentation`n`n## Base URL`nhttps://antiscam.vn/api`n`n## Authentication`nAll API requests require an API key in the header:`nAuthorization: Bearer YOUR_API_KEY`n`n## Rate Limits`n- Free: 5 requests/day`n- Pro: 100 requests/day`n- Business: 1000 requests/day`n`n## Endpoints`n`n### POST /api/scan`nScan a URL for scam indicators.`n`nRequest: {url: string, source?: string}`nResponse: {success: boolean, data: ScanResult}`n`n### POST /api/scan-image`nScan an image for scam content.`n`n### GET /api/history`nGet scan history for authenticated user.`n`n### POST /api/report`nReport a scam URL.`n`n### GET /api/stats`nGet platform statistics."
AC "docs/API.md" "docs: add comprehensive API documentation"

MF "docs/ARCHITECTURE.md" "# Architecture Overview`n`n## Tech Stack`n- **Frontend**: Next.js 14 (App Router), React 18, TypeScript`n- **Styling**: Tailwind CSS`n- **Database**: PostgreSQL + Prisma ORM`n- **Auth**: NextAuth.js`n- **AI**: HuggingFace + Groq`n- **Payments**: Stripe`n`n## Directory Structure`napp/ - Next.js app router pages and components`napp/api/ - API routes`napp/lib/ - Utilities, services, and core logic`napp/hooks/ - Custom React hooks`napp/components/ - Reusable UI components`ntypes/ - TypeScript type definitions`nprisma/ - Database schema and migrations`nextension/ - Browser extension code`n`n## Data Flow`n1. User submits URL`n2. Heuristic analysis runs`n3. AI model provides prediction`n4. Results combined and returned`n5. Scan stored in database"
AC "docs/ARCHITECTURE.md" "docs: add architecture overview document"

MF "docs/DEPLOYMENT.md" "# Deployment Guide`n`n## Prerequisites`n- Node.js 20+`n- PostgreSQL database`n- Vercel account (or similar)`n`n## Environment Variables`nDATABASE_URL=postgresql://...`nNEXTAUTH_SECRET=your-secret`nADMIN_SECRET=your-admin-secret`nSTRIPE_SECRET_KEY=sk_...`nHUGGINGFACE_API_KEY=hf_...`n`n## Steps`n1. Clone repo`n2. npm install`n3. npx prisma migrate deploy`n4. npm run build`n5. npm start`n`n## Vercel Deployment`n1. Connect GitHub repo`n2. Set environment variables`n3. Deploy"
AC "docs/DEPLOYMENT.md" "docs: add deployment guide"

MF "docs/CONTRIBUTING.md" "# Contributing Guide`n`n## Getting Started`n1. Fork the repository`n2. Create a feature branch`n3. Make your changes`n4. Run tests: npm run test`n5. Submit a PR`n`n## Code Style`n- Use TypeScript`n- Follow ESLint rules`n- Write tests for new features`n- Use conventional commits`n`n## Commit Messages`n- feat: new feature`n- fix: bug fix`n- docs: documentation`n- test: tests`n- ci: CI/CD`n- refactor: code refactoring`n`n## Pull Requests`n- Fill out the PR template`n- Reference related issues`n- Add screenshots for UI changes"
AC "docs/CONTRIBUTING.md" "docs: add contributing guidelines"

MF "docs/SECURITY.md" "# Security Policy`n`n## Reporting Vulnerabilities`nEmail: security@antiscam.vn`n`n## Supported Versions`n| Version | Supported |`n|---------|-----------|`n| 1.x     | Yes       |`n`n## Security Features`n- Rate limiting`n- Input sanitization`n- CSRF protection`n- Content Security Policy`n- XSS prevention`n- SQL injection prevention (Prisma)`n- Authentication (NextAuth)`n- Role-based access control`n- API key management`n- Audit logging"
AC "docs/SECURITY.md" "docs: add security policy document"

MF "docs/CHANGELOG.md" "# Changelog`n`n## [1.0.0] - 2024-01-15`n### Added`n- URL scanning engine with AI and heuristics`n- Image scanning for scam detection`n- Vietnamese scam pattern detection`n- Browser extension`n- User dashboard`n- Admin panel`n- Quiz system`n- Community reporting`n- API key management`n- Stripe payment integration`n- Multi-tier subscriptions`n- Watchlist feature`n- Real-time threat feeds`n- Blockchain verification`n- PDF/CSV export`n`n### Security`n- Rate limiting`n- Input sanitization`n- CSRF protection`n- Content Security Policy"
AC "docs/CHANGELOG.md" "docs: add changelog with version history"

MF "docs/DATABASE.md" "# Database Schema Documentation`n`n## Core Models`n- **User**: User accounts with roles and tiers`n- **Scan**: URL scan results`n- **Report**: Community scam reports`n- **Blocklist**: Blocked domains`n- **Whitelist**: Trusted domains`n`n## Quiz Models`n- **QuizAttempt**: Quiz results`n- **Campaign**: Training campaigns`n`n## Business Models`n- **Organization**: Business accounts`n- **ApiKey**: API access keys`n- **Watchlist**: Monitored items`n`n## Analytics`n- **ScanStat**: Daily scan statistics`n- **CommunityContribution**: User contributions`n`n## Relationships`nUser -> Scan (1:N)`nUser -> Report (1:N)`nUser -> ApiKey (1:N)`nOrganization -> User (N:N)"
AC "docs/DATABASE.md" "docs: add database schema documentation"

MF "docs/TESTING.md" "# Testing Guide`n`n## Setup`nnpm install`n`n## Run Tests`nnpm run test        # Run all tests`nnpm run test:watch  # Watch mode`nnpm run test:coverage # Coverage report`n`n## Test Structure`napp/lib/__tests__/ - Unit tests for lib modules`n`n## Writing Tests`nimport { describe, it, expect, vi } from 'vitest'`nimport { functionName } from '../module'`n`ndescribe('Module', () => {`n  it('should work', () => {`n    expect(functionName()).toBeDefined()`n  })`n})`n`n## Mocking`nvi.mock('./dependency', () => ({`n  default: vi.fn()`n}))"
AC "docs/TESTING.md" "docs: add testing guide with examples"

MF "docs/EXTENSION.md" "# Browser Extension Development`n`n## Setup`ncd extension`nnpm install`nnpm run dev`n`n## Architecture`n- manifest.json - Extension manifest v3`n- popup/ - Extension popup UI`n- content/ - Content scripts`n- background/ - Service worker`n`n## Features`n- Auto-scan visited pages`n- Popup with scan results`n- Block dangerous sites`n- Whitelist management`n- Sync with web app`n`n## Building`nnpm run build`n`n## Loading in Chrome`n1. Go to chrome://extensions`n2. Enable Developer mode`n3. Click Load unpacked`n4. Select the dist/ folder"
AC "docs/EXTENSION.md" "docs: add browser extension development guide"

MF "docs/QUIZ_SYSTEM.md" "# Quiz System Documentation`n`n## Overview`nThe quiz system educates users about online scams through interactive questions.`n`n## Categories`n- Phishing`n- Investment scams`n- Romance scams`n- Job scams`n- Prize/lottery scams`n- Impersonation`n- Cryptocurrency scams`n`n## Difficulty Levels`n- Easy: Basic recognition`n- Medium: Pattern analysis`n- Hard: Advanced scenarios`n`n## Scoring`n- Correct answer: +10 points`n- Streak bonus: +5 per consecutive correct`n- Time bonus: +3 if answered within 10s`n- Perfect score: 2x multiplier`n`n## Campaigns`nOrganizations can create training campaigns with daily quizzes over 7/14/30 days."
AC "docs/QUIZ_SYSTEM.md" "docs: add quiz system documentation"

MF "docs/SCAN_ENGINE.md" "# URL Scan Engine Documentation`n`n## Analysis Pipeline`n1. URL normalization and validation`n2. Domain age and registration check`n3. Heuristic scoring`n4. Vietnamese scam pattern matching`n5. AI model prediction`n6. External threat feed check`n7. Score aggregation`n8. Result classification`n`n## Heuristic Checks`n- Suspicious TLD detection`n- Brand impersonation`n- URL length analysis`n- Special character detection`n- Known scam patterns`n- Redirect chain analysis`n`n## AI Model`n- HuggingFace text classification`n- Trained on Vietnamese scam data`n- Confidence threshold: 0.7`n`n## Risk Levels`n- SAFE (0-30): Low risk`n- CAUTION (31-60): Medium risk`n- DANGEROUS (61-100): High risk"
AC "docs/SCAN_ENGINE.md" "docs: add scan engine technical documentation"

MF "docs/PAYMENT.md" "# Payment Integration (Stripe)`n`n## Plans`n| Plan | Price | Features |`n|------|-------|----------|`n| Free | 0 | 5 scans/day |`n| Pro | 99k VND/mo | 50 scans/day, image scan |`n| Business | 299k VND/mo | 500 scans/day, API access |`n| Enterprise | Custom | Unlimited, custom features |`n`n## Webhooks`n- customer.subscription.created`n- customer.subscription.updated`n- customer.subscription.deleted`n- invoice.payment_succeeded`n- invoice.payment_failed`n`n## Upgrade Flow`n1. User clicks upgrade`n2. Redirect to Stripe Checkout`n3. Webhook updates tier`n4. User redirected back"
AC "docs/PAYMENT.md" "docs: add payment integration documentation"

MF "docs/I18N.md" "# Internationalization (i18n)`n`n## Supported Languages`n- Vietnamese (vi) - Default`n- English (en) - Planned`n`n## Adding Translations`n1. Create file: app/lib/i18n/[lang].ts`n2. Export translation object`n3. Follow existing key structure`n`n## Key Structure`ncommon.* - Common UI strings`nnav.* - Navigation items`nscan.* - Scan page`nquiz.* - Quiz page`ndashboard.* - Dashboard`nadmin.* - Admin panel`nerror.* - Error messages`n`n## Usage`nimport { t } from '@/app/lib/i18n'`n<p>{t('common.welcome')}</p>"
AC "docs/I18N.md" "docs: add internationalization guide"

MF "docs/MONITORING.md" "# Monitoring & Observability`n`n## Health Check`nGET /api/health -> {status, timestamp, version, uptime}`n`n## Metrics`n- Total scans per day`n- Average response time`n- Error rate`n- Active users`n- API key usage`n`n## Logging`n- Structured JSON logs`n- Log levels: debug, info, warn, error`n- Audit logs for security events`n`n## Alerting`n- Error rate > 5%`n- Response time > 2s`n- Database connection failures`n- API quota exceeded`n`n## Status Page`n/status - Public system status page`n/api/health - Health check endpoint"
AC "docs/MONITORING.md" "docs: add monitoring and observability guide"

MF "docs/PRIVACY.md" "# Privacy Policy`n`n## Data Collection`n- Email address (authentication)`n- Scanned URLs (anonymized after 30 days)`n- Usage statistics (aggregated)`n`n## Data Storage`n- PostgreSQL (encrypted at rest)`n- Hosted in Singapore region`n- Backups retained for 30 days`n`n## Data Sharing`n- No data sold to third parties`n- Anonymized for research only`n- Threat data shared with community`n`n## User Rights`n- Right to access`n- Right to deletion`n- Right to data portability`n- Right to opt-out`n`n## Contact`nprivacy@antiscam.vn"
AC "docs/PRIVACY.md" "docs: add privacy policy document"

MF "docs/TERMS.md" "# Terms of Service`n`n## Acceptance`nBy using Anti-Scam, you agree to these terms.`n`n## Services`n- URL scam detection`n- Image analysis`n- Educational quizzes`n- Community reporting`n`n## User Responsibilities`n- Accurate reporting`n- No abuse of API`n- Compliance with rate limits`n- No reverse engineering`n`n## Disclaimers`n- Results are advisory, not guaranteed`n- Not liable for false positives/negatives`n- Service may be interrupted for maintenance`n`n## Modifications`nWe reserve the right to modify these terms with notice."
AC "docs/TERMS.md" "docs: add terms of service document"

MF "README.md" "@'
# Anti-Scam Platform

AI-powered scam detection platform protecting Vietnamese internet users.

## Features
- URL scanning with AI + heuristic analysis
- Image-based scam detection
- Vietnamese scam pattern recognition
- Browser extension for real-time protection
- Community reporting system
- Educational quiz system
- Training campaigns for organizations
- Real-time threat feeds
- Blockchain verification
- Multi-tier API access

## Tech Stack
Next.js 14 | TypeScript | PostgreSQL | Prisma | NextAuth | Stripe | Tailwind CSS

## Quick Start
npm install
cp .env.example .env  # Configure environment
npx prisma migrate dev
npm run dev

## Documentation
- [API Docs](docs/API.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Contributing](docs/CONTRIBUTING.md)
- [Deployment](docs/DEPLOYMENT.md)

## License
MIT
'@" -replace "@'", "" -replace "'@", ""
# Write README separately to handle multiline
$readmeContent = "# Anti-Scam Platform`n`nAI-powered scam detection platform protecting Vietnamese internet users.`n`n## Features`n- URL scanning with AI + heuristic analysis`n- Image-based scam detection`n- Vietnamese scam pattern recognition`n- Browser extension for real-time protection`n- Community reporting system`n- Educational quiz system`n- Training campaigns for organizations`n- Real-time threat feeds`n`n## Tech Stack`nNext.js 14 | TypeScript | PostgreSQL | Prisma | NextAuth | Stripe | Tailwind CSS`n`n## Quick Start`nnpm install`ncp .env.example .env`nnpx prisma migrate dev`nnpm run dev`n`n## Docs`n- [API](docs/API.md)`n- [Architecture](docs/ARCHITECTURE.md)`n- [Contributing](docs/CONTRIBUTING.md)`n`n## License`nMIT"
[System.IO.File]::WriteAllText("README.md", $readmeContent, [System.Text.Encoding]::UTF8)
AC "README.md" "docs: update README with comprehensive project documentation"

MF "docs/GLOSSARY.md" "# Glossary`n`n- **Phishing**: Fraudulent attempt to obtain sensitive information`n- **Scam**: Deceptive scheme to defraud`n- **TLD**: Top-Level Domain (.com, .org, etc.)`n- **Heuristic**: Rule-based analysis method`n- **Blocklist**: List of known malicious domains`n- **Whitelist**: List of verified safe domains`n- **Threat Feed**: External source of threat intelligence`n- **WHOIS**: Protocol for querying domain registration info`n- **SSL**: Secure Sockets Layer encryption`n- **CSRF**: Cross-Site Request Forgery`n- **XSS**: Cross-Site Scripting`n- **Rate Limiting**: Restricting API usage frequency"
AC "docs/GLOSSARY.md" "docs: add glossary of security terms"

MF "docs/ROADMAP.md" "# Roadmap`n`n## Q1 2024`n- [x] Core scanning engine`n- [x] User authentication`n- [x] Admin panel`n- [x] Browser extension`n`n## Q2 2024`n- [x] Quiz system`n- [x] Training campaigns`n- [x] Image scanning`n- [x] Blockchain verification`n`n## Q3 2024`n- [ ] Mobile app (React Native)`n- [ ] Machine learning model v2`n- [ ] Multi-language support`n- [ ] Social media integration`n`n## Q4 2024`n- [ ] Advanced reporting dashboard`n- [ ] Threat intelligence sharing network`n- [ ] Browser extension for Firefox`n- [ ] Enterprise SSO integration"
AC "docs/ROADMAP.md" "docs: add product roadmap"

MF "docs/FAQ_CONTENT.md" "# FAQ Content`n`n## General`n**Q: Anti-Scam la gi?**`nA: Nen tang phat hien lua dao truc tuyen su dung AI.`n`n**Q: Lam sao de kiem tra mot URL?**`nA: Dan URL vao o kiem tra, nhan nut Scan.`n`n**Q: Ket qua co chinh xac 100% khong?**`nA: Khong co cong cu nao chinh xac 100%. Ket qua chi mang tinh tham khao.`n`n## Account`n**Q: Lam sao de dang ky?**`nA: Click Dang ky, nhap email va mat khau.`n`n**Q: Toi quen mat khau?**`nA: Click Quen mat khau o trang dang nhap.`n`n## Pricing`n**Q: Co goi mien phi khong?**`nA: Co, goi Free cho phep 5 lan kiem tra/ngay."
AC "docs/FAQ_CONTENT.md" "docs: add FAQ content document"

Write-Host "Docs done: 20 commits"

# CONFIGS & POLISH (20)
MF "app/lib/config.ts" "export const APP_CONFIG={name:'Anti-Scam',description:'AI-powered scam detection platform',version:'1.0.0',url:'https://antiscam.vn',supportEmail:'support@antiscam.vn',maxUrlLength:2048,maxImageSize:5*1024*1024,defaultLanguage:'vi',supportedLanguages:['vi','en'],defaultTheme:'system' as const,scanTimeout:30000,aiConfidenceThreshold:0.7,maxFreeScans:5,maxFreeDailyImageScans:2}"
AC "app/lib/config.ts" "feat: add centralized application configuration"

MF "app/lib/constants/riskLevels.ts" "export const RISK_LEVELS={SAFE:{label:'An toan',labelEn:'Safe',color:'#10B981',bgColor:'#D1FAE5',icon:'shield-check',minScore:0,maxScore:30},CAUTION:{label:'Can than',labelEn:'Caution',color:'#F59E0B',bgColor:'#FEF3C7',icon:'alert-triangle',minScore:31,maxScore:60},DANGEROUS:{label:'Nguy hiem',labelEn:'Dangerous',color:'#EF4444',bgColor:'#FEE2E2',icon:'alert-octagon',minScore:61,maxScore:100}} as const
export function getRiskLevel(score:number){if(score<=30)return RISK_LEVELS.SAFE;if(score<=60)return RISK_LEVELS.CAUTION;return RISK_LEVELS.DANGEROUS}"
AC "app/lib/constants/riskLevels.ts" "feat: add risk level constants with scoring thresholds"

MF "app/lib/constants/scamCategories.ts" "export const SCAM_CATEGORIES=[{id:'phishing',name:'Phishing',nameVi:'Gia mao',icon:'fish',color:'#3B82F6'},{id:'investment',name:'Investment Scam',nameVi:'Lua dao dau tu',icon:'trending-up',color:'#8B5CF6'},{id:'romance',name:'Romance Scam',nameVi:'Lua dao tinh cam',icon:'heart',color:'#EC4899'},{id:'job',name:'Job Scam',nameVi:'Lua dao tuyen dung',icon:'briefcase',color:'#F97316'},{id:'prize',name:'Prize/Lottery',nameVi:'Trung thuong gia',icon:'gift',color:'#EAB308'},{id:'impersonation',name:'Impersonation',nameVi:'Mao danh',icon:'user-x',color:'#EF4444'},{id:'crypto',name:'Crypto Scam',nameVi:'Lua dao tien ao',icon:'bitcoin',color:'#F59E0B'},{id:'ecommerce',name:'E-commerce',nameVi:'Mua ban online',icon:'shopping-cart',color:'#14B8A6'}] as const"
AC "app/lib/constants/scamCategories.ts" "feat: add scam category constants with Vietnamese labels"

MF "app/lib/constants/tiers.ts" "export const SUBSCRIPTION_TIERS={FREE:{name:'Free',nameVi:'Mien phi',price:0,features:['5 URL scans/day','2 image scans/day','Basic quiz access'],limits:{dailyScans:5,dailyImageScans:2,apiCalls:0}},PRO:{name:'Pro',nameVi:'Chuyen nghiep',price:99000,features:['50 URL scans/day','20 image scans/day','Full quiz access','Scan history','CSV export'],limits:{dailyScans:50,dailyImageScans:20,apiCalls:100}},BUSINESS:{name:'Business',nameVi:'Doanh nghiep',price:299000,features:['500 URL scans/day','100 image scans/day','API access','Watchlist','Organization management'],limits:{dailyScans:500,dailyImageScans:100,apiCalls:1000}},ENTERPRISE:{name:'Enterprise',nameVi:'Enterprise',price:-1,features:['Unlimited scans','Custom AI models','Dedicated support','SSO integration','Custom training'],limits:{dailyScans:999999,dailyImageScans:999999,apiCalls:999999}}} as const"
AC "app/lib/constants/tiers.ts" "feat: add subscription tier constants with pricing"

MF "app/lib/constants/navigation.ts" "export const MAIN_NAV=[{label:'Trang chu',href:'/'},{label:'Kiem tra URL',href:'/scan'},{label:'Kiem tra hinh anh',href:'/scan-image'},{label:'Bao cao',href:'/report'},{label:'Trac nghiem',href:'/quiz'},{label:'Bang gia',href:'/pricing'}]
export const FOOTER_NAV={product:[{label:'Kiem tra URL',href:'/scan'},{label:'Kiem tra hinh anh',href:'/scan-image'},{label:'Extension',href:'/extension'},{label:'API',href:'/api-docs'}],company:[{label:'Gioi thieu',href:'/about'},{label:'Blog',href:'/blog'},{label:'Lien he',href:'/contact'},{label:'Tuyen dung',href:'/careers'}],legal:[{label:'Dieu khoan',href:'/terms'},{label:'Bao mat',href:'/privacy'},{label:'Cookie',href:'/cookie-policy'}],support:[{label:'FAQ',href:'/faq'},{label:'Kien thuc',href:'/knowledge-base'},{label:'Trang thai',href:'/status'}]}
export const DASHBOARD_NAV=[{label:'Tong quan',href:'/dashboard',icon:'home'},{label:'Lich su',href:'/dashboard/history',icon:'history'},{label:'Watchlist',href:'/dashboard/watchlist',icon:'eye'},{label:'API Keys',href:'/dashboard/api-keys',icon:'key'},{label:'Cai dat',href:'/dashboard/settings',icon:'settings'}]"
AC "app/lib/constants/navigation.ts" "feat: add navigation constants for main, footer, and dashboard"

MF "app/lib/constants/seo.ts" "export const SEO_DEFAULTS={siteName:'Anti-Scam',titleTemplate:'%s | Anti-Scam',defaultTitle:'Anti-Scam - Nen tang phat hien lua dao bang AI',defaultDescription:'Bao ve ban khoi cac trang web lua dao voi cong nghe AI tien tien. Kiem tra URL, hinh anh va so dien thoai mien phi.',defaultImage:'/og-image.png',locale:'vi_VN',type:'website' as const,twitterCard:'summary_large_image' as const}
export const PAGE_SEO:Record<string,{title:string;description:string}>={'/scan':{title:'Kiem tra URL',description:'Kiem tra do an toan cua website voi AI'},'/quiz':{title:'Trac nghiem',description:'Test kien thuc chong lua dao'},'/report':{title:'Bao cao lua dao',description:'Bao cao website lua dao cho cong dong'},'/pricing':{title:'Bang gia',description:'Cac goi dich vu Anti-Scam'}}"
AC "app/lib/constants/seo.ts" "feat: add SEO default constants and page metadata"

MF "app/lib/constants/errorMessages.ts" "export const ERROR_MESSAGES={auth:{LOGIN_REQUIRED:'Vui long dang nhap de tiep tuc',INVALID_CREDENTIALS:'Email hoac mat khau khong chinh xac',ACCOUNT_LOCKED:'Tai khoan da bi khoa',SESSION_EXPIRED:'Phien dang nhap da het han'},scan:{INVALID_URL:'URL khong hop le',URL_TOO_LONG:'URL qua dai (toi da 2048 ky tu)',SCAN_LIMIT_REACHED:'Da het luot kiem tra hom nay',SCAN_TIMEOUT:'Qua thoi gian kiem tra',SCAN_FAILED:'Loi kiem tra, vui long thu lai'},report:{DUPLICATE:'URL nay da duoc bao cao',INVALID_REASON:'Ly do khong hop le',RATE_LIMITED:'Ban da bao cao qua nhieu, vui long doi'},general:{SERVER_ERROR:'Loi he thong, vui long thu lai sau',NETWORK_ERROR:'Loi ket noi mang',NOT_FOUND:'Khong tim thay',FORBIDDEN:'Khong co quyen truy cap'}} as const"
AC "app/lib/constants/errorMessages.ts" "feat: add error message constants in Vietnamese"

MF "app/lib/constants/regex.ts" "export const REGEX={EMAIL:/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,URL:/^https?:\\/\\/[^\\s/$.?#].[^\\s]*$/i,PHONE_VN:/^(0|\\+?84)(3[2-9]|5[25689]|7[06-9]|8[1-9]|9[0-9])\\d{7}$/,IP_V4:/^(?:(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$/,DOMAIN:/^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,}$/,SLUG:/^[a-z0-9]+(?:-[a-z0-9]+)*$/,HEX_COLOR:/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/,BANK_ACCOUNT_VN:/^\\d{8,19}$/} as const"
AC "app/lib/constants/regex.ts" "feat: add regex pattern constants for validation"

MF "app/lib/constants/index.ts" "export * from './riskLevels'`nexport * from './scamCategories'`nexport * from './tiers'`nexport * from './navigation'`nexport * from './seo'`nexport * from './errorMessages'`nexport * from './regex'"
AC "app/lib/constants/index.ts" "feat: add constants barrel export file"

MF ".editorconfig" "[*]`nindent_style = space`nindent_size = 2`nend_of_line = lf`ncharset = utf-8`ntrim_trailing_whitespace = true`ninsert_final_newline = true`n`n[*.md]`ntrim_trailing_whitespace = false"
AC ".editorconfig" "chore: add EditorConfig for consistent coding styles"

MF ".prettierrc" "{`n  `"semi`": false,`n  `"singleQuote`": true,`n  `"tabWidth`": 2,`n  `"trailingComma`": `"es5`",`n  `"printWidth`": 100,`n  `"bracketSpacing`": true,`n  `"arrowParens`": `"avoid`"`n}"
AC ".prettierrc" "chore: add Prettier configuration"

MF ".prettierignore" "node_modules`n.next`ndist`nbuild`ncoverage`nprisma/migrations`n*.min.js`n*.min.css"
AC ".prettierignore" "chore: add Prettier ignore configuration"

MF "app/lib/env.ts" "import{z}from'zod'
const envSchema=z.object({DATABASE_URL:z.string().min(1),NEXTAUTH_SECRET:z.string().min(1),ADMIN_SECRET:z.string().min(1),NEXTAUTH_URL:z.string().url().optional(),HUGGINGFACE_API_KEY:z.string().optional(),GROQ_API_KEY:z.string().optional(),STRIPE_SECRET_KEY:z.string().optional(),STRIPE_PUBLISHABLE_KEY:z.string().optional()})
export function validateEnv(){const result=envSchema.safeParse(process.env);if(!result.success){console.error('Invalid environment variables:',result.error.flatten().fieldErrors);throw new Error('Invalid environment variables')}return result.data}
export const env=typeof process!=='undefined'?validateEnv():({} as ReturnType<typeof validateEnv>)"
AC "app/lib/env.ts" "feat: add environment variable validation with Zod"

MF ".nvmrc" "20"
AC ".nvmrc" "chore: add Node.js version specification"

MF ".dockerignore" "node_modules`n.next`n.git`n.env`n.env.local`ncoverage`n*.md`n!README.md`n.github`nscripts"
AC ".dockerignore" "chore: add Docker ignore configuration"

MF "Dockerfile" "FROM node:20-alpine AS base`nWORKDIR /app`nCOPY package*.json ./`nRUN npm ci --omit=dev`n`nFROM base AS builder`nRUN npm ci`nCOPY . .`nRUN npx prisma generate`nRUN npm run build`n`nFROM base AS runner`nENV NODE_ENV=production`nCOPY --from=builder /app/.next ./.next`nCOPY --from=builder /app/public ./public`nCOPY --from=builder /app/node_modules ./node_modules`nCOPY --from=builder /app/package.json ./package.json`nEXPOSE 3000`nCMD [\"npm\",\"start\"]"
AC "Dockerfile" "chore: add Dockerfile for containerized deployment"

MF "docker-compose.yml" "version: '3.8'`nservices:`n  app:`n    build: .`n    ports:`n      - '3000:3000'`n    environment:`n      - DATABASE_URL=postgresql://postgres:postgres@db:5432/antiscam`n      - NEXTAUTH_SECRET=dev-secret`n      - ADMIN_SECRET=admin-secret`n    depends_on:`n      - db`n  db:`n    image: postgres:16-alpine`n    ports:`n      - '5432:5432'`n    environment:`n      - POSTGRES_DB=antiscam`n      - POSTGRES_USER=postgres`n      - POSTGRES_PASSWORD=postgres`n    volumes:`n      - pgdata:/var/lib/postgresql/data`nvolumes:`n  pgdata:"
AC "docker-compose.yml" "chore: add Docker Compose for local development"

MF "app/not-found.tsx" "'use client'`nexport default function NotFound(){return<div className='min-h-screen flex items-center justify-center'><div className='text-center p-8'><div className='text-8xl mb-6'>404</div><h2 className='text-3xl font-bold'>Trang khong ton tai</h2><p className='text-gray-500 mt-4'>Trang ban dang tim kiem khong ton tai hoac da bi xoa.</p><a href='/' className='mt-8 inline-block px-8 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors'>Ve trang chu</a></div></div>}"
AC "app/not-found.tsx" "feat: add custom 404 not found page"

MF "app/loading.tsx" "'use client'`nexport default function Loading(){return<div className='min-h-screen flex items-center justify-center'><div className='flex flex-col items-center gap-4'><div className='w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin'/><p className='text-gray-500 animate-pulse'>Dang tai...</p></div></div>}"
AC "app/loading.tsx" "feat: add global loading component"

Write-Host "Configs done: 20 commits"

Write-Host "Batch 2 complete: 50 commits total"
