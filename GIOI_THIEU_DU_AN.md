# DỰ ÁN ANTI-SCAM
## HỆ THỐNG PHÁT HIỆN VÀ PHÒNG CHỐNG LỪA ĐẢO TRỰC TUYẾN

---

## 1. TỔNG QUAN DỰ ÁN

### 1.1. Bối cảnh và Động lực
Trong thời đại số hóa hiện nay, lừa đảo trực tuyến đã trở thành vấn nạn nghiêm trọng tại Việt Nam. Hàng ngày, hàng nghìn người dân rơi vào bẫy của các website giả mạo ngân hàng, cửa hàng trực tuyến lừa đảo, và các chiêu trò phishing tinh vi. Theo thống kê, thiệt hại từ lừa đảo trực tuyến tại Việt Nam lên đến hàng nghìn tỷ đồng mỗi năm.

Nhận thấy nhu cầu cấp thiết về một công cụ miễn phí, dễ sử dụng để giúp người dân Việt Nam tự bảo vệ mình trước các mối đe dọa này, tôi đã phát triển **ANTI-SCAM** - một nền tảng phân tích và cảnh báo website lừa đảo sử dụng công nghệ AI tiên tiến.

### 1.2. Mục tiêu Dự án
- **Bảo vệ cộng đồng**: Cung cấp công cụ miễn phí để người dân Việt Nam có thể kiểm tra độ an toàn của website trước khi thực hiện giao dịch
- **Nâng cao nhận thức**: Giáo dục người dùng về các thủ đoạn lừa đảo phổ biến thông qua quiz tương tác và cẩm nang an toàn
- **Góp phần xã hội**: Xây dựng cơ sở dữ liệu phishing công khai, giúp cộng đồng an ninh mạng toàn cầu

### 1.3. Đối tượng Sử dụng
- Người dân thường xuyên mua sắm online, sử dụng dịch vụ ngân hàng điện tử
- Doanh nghiệp muốn bảo vệ nhân viên khỏi các cuộc tấn công phishing
- Các tổ chức giáo dục muốn nâng cao nhận thức về an toàn mạng
- Người cao tuổi - đối tượng dễ bị lừa đảo nhất

---

## 2. TÍNH NĂNG CHÍNH

### 2.1. Quét và Phân tích URL (AI-Powered)
**Công nghệ sử dụng**: Groq API với mô hình Llama 3.3-70B

Hệ thống phân tích website theo nhiều chiều:
- **Phân tích nội dung**: AI đọc hiểu title, description, nội dung trang web để xác định loại website và mục đích thực sự
- **Kiểm tra domain**: Đánh giá độ uy tín của tên miền (.com.vn, .vn uy tín hơn .tk, .ml, .ga...)
- **Phát hiện yếu tố nguy hiểm**: 
  - Giả mạo ngân hàng (vietcombannk.vn thay vì vietcombank.com.vn)
  - Casino, cờ bạc trực tuyến
  - Lừa đảo đầu tư cryptocurrency
  - Website lậu, vi phạm bản quyền
- **Kiểm tra bảo mật**: SSL/HTTPS, chính sách bảo mật, thông tin liên hệ
- **Phát hiện form đăng nhập/thanh toán**: Cảnh báo nếu có form thu thập thông tin nhạy cảm

**Kết quả trả về**:
- Điểm số an toàn: 0-100
- Phân loại: AN TOÀN / ĐÁNG NGỜ / NGUY HIỂM
- Lý do chi tiết bằng tiếng Việt
- Gợi ý hành động cụ thể

### 2.2. Tích hợp VirusTotal (98 Antivirus Engines)
**API**: VirusTotal v3

VirusTotal là nền tảng quét virus uy tín nhất thế giới với 98 công cụ antivirus:
- Kaspersky, Avast, Norton, McAfee, Bitdefender, ESET...
- Quét URL với 98 engines cùng lúc
- Hiển thị chi tiết:
  - **Độc hại**: Số engines phát hiện mối đe dọa
  - **Đáng ngờ**: Số engines đánh dấu suspicious
  - **An toàn**: Số engines xác nhận harmless
  - **Chưa xác định**: Engines chưa có kết luận

**Ưu điểm**:
- Miễn phí 500 requests/ngày
- Database cập nhật liên tục từ cộng đồng security toàn cầu
- Phát hiện cả malware, phishing, trojans

### 2.3. Phân tích Hình ảnh bằng AI
**Công nghệ**: Google Gemini Vision API

Tính năng độc đáo giúp phát hiện lừa đảo qua hình ảnh:
- Upload ảnh chụp màn hình tin nhắn, email, website
- AI phân tích nội dung hình ảnh:
  - Phát hiện yêu cầu chuyển khoản khẩn cấp
  - Nhận diện logo giả mạo ngân hàng
  - Phát hiện chiêu trò "trúng thưởng"
  - Cảnh báo tin nhắn giả mạo cơ quan chức năng
- Trả về đánh giá và lời khuyên cụ thể

**Use case thực tế**:
- Nhận SMS "Bạn trúng thưởng 50 triệu" → Chụp màn hình → Upload → AI cảnh báo lừa đảo
- Email giả mạo Vietcombank → Upload → AI phát hiện logo giả, domain lạ

### 2.4. Quiz Trắc nghiệm Phòng chống Lừa đảo
**Cơ sở dữ liệu**: 50+ câu hỏi thực tế

Hệ thống quiz tương tác giúp người dùng:
- Học cách nhận biết website lừa đảo
- Hiểu các thủ đoạn phishing phổ biến
- Biết cách xử lý khi gặp tình huống nghi ngờ
- Tracking điểm số và lịch sử làm bài

**Nội dung quiz**:
- Nhận diện URL giả mạo
- Phân biệt email thật/giả
- Kiểm tra certificate SSL
- Best practices bảo mật

### 2.5. Cẩm nang An toàn Trực tuyến
**Markdown-based Knowledge Base**

12+ bài viết chi tiết về:
- **Phishing**: Định nghĩa, cách thức, cách phòng tránh
- **Scam**: Các loại lừa đảo phổ biến tại VN
- **Social Engineering**: Kỹ thuật tấn công tâm lý
- **Ransomware**: Mã độc tống tiền
- **Bảo mật mật khẩu**: Tạo và quản lý password an toàn
- **2FA/MFA**: Xác thực đa yếu tố
- **Công cụ bảo mật**: Browser extensions, password managers
- **Checklist an toàn**: Hướng dẫn từng bước kiểm tra website

### 2.6. Báo cáo Website Lừa đảo + Tích hợp URLScan.io
**Crowdsourcing Threat Intelligence**

Người dùng có thể báo cáo website đáng ngờ:
- Form báo cáo: URL + Loại lừa đảo + Mô tả
- Tự động submit lên **URLScan.io** (nền tảng security công khai)
- Nhận link xem kết quả scan chi tiết
- Góp phần xây dựng database phishing toàn cầu

**URLScan.io features**:
- Screenshot website
- Phân tích DOM, HTTP requests
- Phát hiện tracking scripts
- Cộng đồng security analysts đánh giá

### 2.7. Lịch sử Kiểm tra
**Local Storage + Database Sync**

- Lưu 50 URL gần nhất trên trình duyệt
- Xem lại kết quả cũ không cần quét lại
- Export history dưới dạng JSON
- Privacy-focused: Data lưu trên máy người dùng

---

## 3. CÔNG NGHỆ SỬ DỤNG

### 3.1. Frontend Stack
- **Next.js 14.0.4**: React framework với App Router, Server Components, ISR
- **TypeScript**: Type safety, better DX
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library cho UX mượt mà
- **Lucide React**: Icon library hiện đại

### 3.2. Backend & API
- **Next.js API Routes**: Serverless functions
- **Prisma ORM**: Type-safe database access
- **PostgreSQL (Supabase)**: Production database
- **Zod**: Runtime validation

### 3.3. AI & Machine Learning
- **Groq API**: Llama 3.3-70B cho phân tích website
- **Google Gemini Vision**: Phân tích hình ảnh
- **VirusTotal API**: 98 antivirus engines

### 3.4. External Services
- **URLScan.io API**: Scan công khai và threat intelligence
- **Vercel**: Hosting và deployment
- **Supabase**: Database và authentication

### 3.5. Security Features
- **HTTPS/SSL**: Bắt buộc cho mọi request
- **Rate Limiting**: Ngăn chặn abuse
- **Input Validation**: Zod schema validation
- **CORS Protection**: Chỉ cho phép origins hợp lệ
- **Safe Storage**: Wrapper cho localStorage errors

---

## 4. KIẾN TRÚC HỆ THỐNG

### 4.1. System Architecture
```
┌─────────────────────────────────────────────────────────┐
│                      CLIENT (Browser)                    │
│  Next.js App Router │ React Components │ Tailwind CSS   │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                  API LAYER (Serverless)                  │
│  /api/scan │ /api/report │ /api/stats │ /api/guides     │
└──────────┬─────────────┬────────────────┬───────────────┘
           │             │                │
           ▼             ▼                ▼
    ┌──────────┐  ┌──────────┐    ┌──────────────┐
    │ Groq AI  │  │VirusTotal│    │ URLScan.io   │
    │ (Llama)  │  │ (98 AV)  │    │ (Public Scan)│
    └──────────┘  └──────────┘    └──────────────┘
           │
           ▼
    ┌──────────────────┐
    │ PostgreSQL (Supabase)│
    │ - Reports         │
    │ - Stats           │
    │ - Blocklist       │
    └──────────────────┘
```

### 4.2. Data Flow - Scan URL
1. User nhập URL trên `/scan`
2. Frontend gửi POST request → `/api/scan`
3. Server-side:
   - Fetch website content (title, description, body)
   - Gọi Groq AI để phân tích → score, reasons, category
   - Gọi VirusTotal API → malicious count, stats
   - Lưu vào database (optional)
4. Trả về JSON response
5. Frontend hiển thị kết quả:
   - Risk badge (Safe/Caution/Danger)
   - AI analysis (chi tiết bằng tiếng Việt)
   - VirusTotal stats (98 engines)
   - Recommendations (gợi ý hành động)

### 4.3. Database Schema
**Prisma Schema**:
```prisma
model ScanHistory {
  id          String   @id @default(uuid())
  url         String
  domain      String
  score       Int
  category    String
  reasons     Json
  virusTotal  Json?
  createdAt   DateTime @default(now())
}

model Report {
  id          String   @id @default(uuid())
  url         String
  domain      String
  reason      String
  description String?
  ipAddress   String
  verified    Boolean  @default(false)
  createdAt   DateTime @default(now())
}

model DailyStats {
  date         String   @id
  scansCount   Int      @default(0)
  reportsCount Int      @default(0)
}
```

---

## 5. TÍNH NĂNG NỔI BẬT

### 5.1. AI Analysis với Prompt Engineering
**Prompt được tối ưu** để AI trả về kết quả chất lượng cao:

```
BƯỚC 1: XÁC ĐỊNH WEBSITE
- Đây là website GÌ? (Ngân hàng, E-commerce, Casino...)
- Chức năng CHÍNH?
- Mục đích? (Dịch vụ hợp pháp hay LỪA ĐẢO?)

BƯỚC 2: ĐÁNH GIÁ AN TOÀN
NGUY HIỂM CAO (80-100):
- Giả mạo ngân hàng/ví điện tử
- Casino/cờ bạc/lô đề
- Lừa đảo đầu tư/forex/crypto
- Yêu cầu OTP/mật khẩu

ĐÁNG NGỜ (40-79):
- TLD lạ (.tk, .ml, .ga, .xyz)
- Không SSL (HTTP)
- Website lậu (phim lậu, crack)
- Thiếu thông tin liên hệ

AN TOÀN (0-39):
- Domain chính thống (.com.vn, .edu.vn, .gov.vn)
- SSL hợp lệ (HTTPS)
- Thương hiệu uy tín
```

**Output format** (JSON):
```json
{
  "score": 85,
  "category": "phishing",
  "reasons": [
    "Loại website: Website giả mạo ngân hàng Vietcombank - Thu thập thông tin đăng nhập",
    "Mục đích: Đánh cắp username/password của khách hàng Vietcombank để chiếm đoạt tài khoản",
    "Đánh giá domain: vietcombannk.vn - Domain giả mạo, có chữ 'n' thừa, không phải domain chính thức",
    "Điểm yếu bảo mật: Form đăng nhập đáng ngờ, không có chính sách bảo mật",
    "Cảnh báo: Tuyệt đối KHÔNG nhập thông tin đăng nhập!"
  ],
  "confidence": 0.95
}
```

### 5.2. Multi-Engine Scanning
**Layer 1**: AI Llama 3.3-70B
- Phân tích ngữ nghĩa nội dung
- Hiểu ngữ cảnh tiếng Việt
- Phát hiện intent lừa đảo

**Layer 2**: VirusTotal (98 engines)
- Kaspersky, Avast, Norton, McAfee...
- Database malware toàn cầu
- Cập nhật real-time

**Layer 3**: Heuristic Analysis
- Domain age check
- TLD risk assessment
- SSL certificate validation
- Contact info verification

### 5.3. Responsive Design
**Mobile-first approach**:
- Breakpoints: xs (320px), sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly UI (buttons ≥ 44px)
- Optimized images (WebP, lazy loading)
- Progressive Web App ready

### 5.4. Performance Optimization
- **Server Components**: Giảm bundle size
- **Static Generation**: Pre-render guides, quiz
- **API Caching**: Cache VirusTotal results (1 hour)
- **Code Splitting**: Dynamic imports
- **Image Optimization**: Next.js Image component

---

## 6. USER EXPERIENCE

### 6.1. Workflow chính
**Kiểm tra URL**:
1. Vào trang chủ → Click "Kiểm tra ngay"
2. Dán URL vào ô input
3. Click "Quét ngay" → Loading 3-5 giây
4. Xem kết quả:
   - Badge màu (Xanh/Vàng/Đỏ)
   - Điểm số /100
   - Lý do chi tiết (5-7 điểm)
   - VirusTotal stats
   - Gợi ý hành động
5. Mở rộng các section:
   - "Tại sao quan trọng?"
   - "Tôi nên làm gì?"
   - Chi tiết kỹ thuật

**Kiểm tra hình ảnh**:
1. Switch sang tab "Hình ảnh"
2. Upload ảnh (drag & drop hoặc click)
3. AI phân tích → Kết quả chi tiết

### 6.2. Accessibility
- **ARIA labels**: Screen reader friendly
- **Keyboard navigation**: Tab, Enter, Esc
- **Color contrast**: WCAG AA compliant
- **Font size**: Responsive (14px - 18px)

### 6.3. Error Handling
- Friendly error messages (tiếng Việt)
- Retry mechanism cho API failures
- Offline detection
- Graceful degradation

---

## 7. THỐNG KÊ VÀ METRICS

### 7.1. Dashboard Admin
- Tổng số scans hôm nay
- Tổng số reports
- Top phishing domains
- User engagement metrics

### 7.2. Performance Metrics (Mục tiêu)
- **Time to Interactive**: < 2s
- **First Contentful Paint**: < 1s
- **Lighthouse Score**: > 90
- **API Response Time**: < 3s

---

## 8. ROADMAP & FUTURE PLANS

### 8.1. Phase 2 (Q1 2026)
- [ ] Browser Extension (Chrome, Firefox, Edge)
- [ ] Mobile App (React Native)
- [ ] Real-time alerts
- [ ] Community voting system

### 8.2. Phase 3 (Q2 2026)
- [ ] WhatsApp/Telegram Bot
- [ ] API công khai cho developers
- [ ] Machine Learning model riêng (train trên data VN)
- [ ] Partnership với ngân hàng, sàn TMĐT

### 8.3. Advanced Features
- [ ] Browser traffic monitoring
- [ ] Email header analysis
- [ ] QR code scanner
- [ ] Voice phishing detection

---

## 9. IMPACT & CONTRIBUTION

### 9.1. Đóng góp Xã hội
- **Bảo vệ cộng đồng**: Công cụ miễn phí cho mọi người
- **Giáo dục**: Nâng cao nhận thức về an toàn mạng
- **Open Source**: Code công khai trên GitHub
- **Data sharing**: Báo cáo phishing lên URLScan.io

### 9.2. Metrics (Expected)
- **Target users**: 10,000 users/tháng (6 tháng đầu)
- **Scans**: 50,000 scans/tháng
- **Reports**: 500 phishing reports/tháng
- **Community impact**: Ngăn chặn ước tính 100+ vụ lừa đảo/tháng

---

## 10. KẾT LUẬN

**ANTI-SCAM** là một dự án mang tính ứng dụng thực tiễn cao, kết hợp công nghệ AI tiên tiến với mục tiêu xã hội ý nghĩa. Trong bối cảnh lừa đảo trực tuyến ngày càng tinh vi và gia tăng, dự án này cung cấp một giải pháp miễn phí, dễ tiếp cận để bảo vệ người dân Việt Nam.

Điểm nổi bật của dự án:
- **Công nghệ hiện đại**: AI Llama 3.3-70B, VirusTotal 98 engines, Gemini Vision
- **User-centric**: UX/UI đơn giản, tiếng Việt, mobile-friendly
- **Miễn phí 100%**: Không quảng cáo, không thu phí
- **Open Source**: Cộng đồng có thể đóng góp, cải tiến
- **Global impact**: Tích hợp URLScan.io chia sẻ data toàn cầu

Tôi tin rằng **ANTI-SCAM** không chỉ là một công cụ kỹ thuật, mà còn là một phong trào cộng đồng giúp mọi người tự bảo vệ mình trong thế giới số. Mỗi người dùng được bảo vệ, mỗi website phishing được báo cáo đều góp phần làm cho internet an toàn hơn.

---

**Thông tin Dự án**:
- **GitHub**: https://github.com/maitamdev/Anti-Scam
- **Demo**: https://anti-scam.vercel.app (hoặc domain tùy chỉnh)
- **Developer**: MaiTamDev
- **License**: MIT (Open Source)
- **Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, Prisma, PostgreSQL
- **AI Models**: Groq Llama 3.3-70B, Google Gemini Vision
- **External APIs**: VirusTotal v3, URLScan.io

---

*Tài liệu này được viết cho mục đích thi/trình bày dự án. Mọi thông tin đều dựa trên implementation thực tế của hệ thống ANTI-SCAM.*

**Ngày cập nhật**: 10/12/2025
**Phiên bản**: 1.0
