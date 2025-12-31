# ANTI-SCAM Features Roadmap

## ✅ Phase 1 - Quick Wins (Có thể làm ngay)

### 1.1 QR Code Scanner
- [ ] Trang `/tools/qr-scanner`
- [ ] Upload ảnh QR hoặc dùng camera
- [ ] Decode QR → preview URL
- [ ] Check URL qua hệ thống scan hiện có
- [ ] Cảnh báo nếu URL nguy hiểm

### 1.2 Bank Hotline Directory
- [ ] Trang `/tools/bank-hotlines`
- [ ] Danh sách hotline chính thức các ngân hàng VN
- [ ] Search/filter theo tên ngân hàng
- [ ] Click-to-call trên mobile
- [ ] Cảnh báo số giả mạo phổ biến

### 1.3 Email Header Analyzer
- [ ] Trang `/tools/email-analyzer`
- [ ] Paste email header
- [ ] Parse và hiển thị: sender IP, SPF, DKIM, DMARC
- [ ] Phát hiện email spoofing
- [ ] Giải thích kết quả dễ hiểu

### 1.4 Enhanced Domain Intelligence
- [ ] Thêm vào kết quả scan: domain age, registrar
- [ ] Cảnh báo domain mới đăng ký (< 30 ngày)
- [ ] So sánh với domain chính thức (typosquatting detection)

### 1.5 Scam Contract Keywords
- [ ] Trang `/tools/contract-checker`
- [ ] Upload/paste nội dung hợp đồng
- [ ] Highlight các điều khoản nguy hiểm
- [ ] Danh sách red flags phổ biến

## 🔄 Phase 2 - Medium Effort

### 2.1 E-commerce Seller Checker
- [ ] Input link shop Shopee/Lazada/Tiki
- [ ] Scrape thông tin cơ bản (nếu API available)
- [ ] Phân tích rating, số đơn, thời gian hoạt động
- [ ] Cảnh báo shop mới/ít đánh giá

### 2.2 Scam Story Sharing
- [ ] Trang `/community/stories`
- [ ] Form submit câu chuyện (ẩn danh)
- [ ] Moderation queue
- [ ] Upvote/helpful count
- [ ] Categories theo loại lừa đảo

### 2.3 Senior Protection Mode
- [ ] Toggle trong settings
- [ ] UI lớn hơn, đơn giản hơn
- [ ] Bỏ các tính năng phức tạp
- [ ] Nút SOS gọi người thân

### 2.4 Weekly Digest Email
- [ ] Subscription form
- [ ] Cron job gửi email hàng tuần
- [ ] Tổng hợp scam alerts mới
- [ ] Tips of the week

## 🚀 Phase 3 - Major Features (Cần thêm resources)

### 3.1 Voice Scam Detector
- [ ] Upload audio file
- [ ] Speech-to-text (Whisper API)
- [ ] Phân tích nội dung với AI
- [ ] Phát hiện script lừa đảo

### 3.2 Browser Extension v2
- [ ] Auto-scan links on hover
- [ ] Form field warnings
- [ ] Phishing site blocking
- [ ] Sync với account

### 3.3 Scam Trend Dashboard
- [ ] Aggregate data từ reports
- [ ] Charts theo thời gian
- [ ] Heatmap theo vùng (nếu có data)
- [ ] Public dashboard

### 3.4 Blockchain Scam Tracker
- [ ] Input wallet address
- [ ] Check against known scam wallets
- [ ] Transaction history analysis

## ⏳ Phase 4 - Long-term Vision

### 4.1 Mobile App
### 4.2 Bank API Integration
### 4.3 AI Pattern Learning
### 4.4 Enterprise Dashboard
### 4.5 Caller ID Integration

---

## Priority Order (Dựa trên impact & effort)

1. **QR Code Scanner** - High impact, low effort
2. **Bank Hotline Directory** - High impact, very low effort
3. **Email Header Analyzer** - Medium impact, low effort
4. **Enhanced Domain Intelligence** - Medium impact, low effort
5. **Scam Contract Keywords** - Medium impact, medium effort

