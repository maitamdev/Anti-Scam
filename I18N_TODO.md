# TODO: Internationalization (i18n) - Vietnamese/English

## ✅ Đã hoàn thành
- [x] Tạo file translations (`app/lib/i18n/translations.ts`)
- [x] Tạo LanguageContext (`app/lib/i18n/LanguageContext.tsx`)
- [x] Tạo LanguageSwitcher component (`app/components/LanguageSwitcher.tsx`)
- [x] Thêm LanguageProvider vào Providers (`app/components/Providers.tsx`)
- [x] Update Header với translations (`app/components/Header.tsx`)
- [x] Update Home page (`app/page.tsx`)
- [x] Update Footer (`app/components/Footer.tsx`)
- [x] Update Scan page (`app/scan/page.tsx`) - partial
- [x] Update Alerts page (`app/alerts/page.tsx`)
- [x] Update Check page (`app/check/page.tsx`)
- [x] Update Quiz page (`app/quiz/page.tsx`)
- [x] Update Guide page (`app/guide/page.tsx`)
- [x] Update Report page (`app/report/page.tsx`)
- [x] Update About page (`app/about/page.tsx`)
- [x] Update ScamTips component (`app/components/ScamTips.tsx`)

## 📋 Cần update - Pages (Priority 2+)

### Priority 2 - Trang phụ (optional)
- [ ] `app/result/page.tsx` - Kết quả
- [ ] `app/dashboard/page.tsx` - Dashboard
- [ ] `app/pricing/page.tsx` - Bảng giá
- [ ] `app/assessment/page.tsx` - Đánh giá
- [ ] `app/assessment/result/page.tsx` - Kết quả đánh giá

### Priority 3 - Auth pages (optional)
- [ ] `app/auth/signin/page.tsx`
- [ ] `app/auth/signup/page.tsx`
- [ ] `app/auth/forgot-password/page.tsx`

### Priority 4 - Dashboard pages (optional)
- [ ] `app/dashboard/history/page.tsx`
- [ ] `app/dashboard/watchlist/page.tsx`
- [ ] `app/dashboard/api-keys/page.tsx`
- [ ] `app/dashboard/billing/page.tsx`

### Priority 5 - Other pages (optional)
- [ ] `app/guide/[slug]/page.tsx`
- [ ] `app/share/[token]/page.tsx`
- [ ] `app/quiz/leaderboard/page.tsx`
- [ ] `app/admin/page.tsx`
- [ ] `app/org/page.tsx`
- [ ] `app/extension/page.tsx`

## 📋 Cần update - Components (optional)

### Components phụ
- [ ] `app/components/UrlInput.tsx`
- [ ] `app/components/ImageUpload.tsx`
- [ ] `app/components/ResultCard.tsx`
- [ ] `app/components/ReportForm.tsx`
- [ ] `app/components/StatsCounter.tsx`
- [ ] `app/components/TrustBadges.tsx`
- [ ] `app/components/ChartPanel.tsx`
- [ ] `app/components/ScanMascot.tsx`

## 📝 Hướng dẫn update

### Bước 1: Import hook
```tsx
import { useTranslation } from '../lib/i18n/LanguageContext'
// hoặc
import { useTranslation } from '@/app/lib/i18n/LanguageContext'
```

### Bước 2: Sử dụng trong component
```tsx
export default function MyPage() {
  const { t, language } = useTranslation()
  
  return (
    <div>
      <h1>{language === 'vi' ? 'Tiêu đề' : 'Title'}</h1>
      {/* hoặc dùng từ translations */}
      <p>{t.common.home}</p>
    </div>
  )
}
```

### Bước 3: Thêm translations mới (nếu cần)
Mở file `app/lib/i18n/translations.ts` và thêm key mới vào cả `vi` và `en`

## 🔧 Cách test
1. Chạy `npm run dev`
2. Click nút EN/VI trên header
3. Kiểm tra tất cả text đã chuyển đổi chưa

## ⚠️ Lưu ý
- Chỉ update text hiển thị cho user, không update code logic
- Giữ nguyên class names, variable names
- Test kỹ sau mỗi file update
- Build test: `npm run build` trước khi commit
