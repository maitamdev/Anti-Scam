# 🛡️ ANTISCAM

Nền tảng AI phân tích và cảnh báo website lừa đảo, bảo vệ người dùng Việt Nam khỏi các chiêu trò lừa đảo trực tuyến.

## ✨ Tính năng

- 🔍 **Kiểm tra URL** - Phân tích độ an toàn của website bằng AI + heuristic
- 🤖 **AI Engine** - Sử dụng HuggingFace/Groq API để phát hiện mẫu lừa đảo
- 📊 **Dashboard** - Thống kê trực quan với biểu đồ
- 📝 **Báo cáo cộng đồng** - Người dùng có thể báo cáo website đáng ngờ
- 🔄 **Tự học** - Mô hình AI được huấn luyện lại từ dữ liệu cộng đồng
- 🌐 **API Public** - REST API cho developer tích hợp

## 🚀 Cài đặt

### Yêu cầu
- Node.js 18+
- PostgreSQL
- (Optional) HuggingFace API Key
- (Optional) Groq API Key

### Bước 1: Clone và cài đặt dependencies

```bash
git clone <repo-url>
cd antiscam
npm install
```

### Bước 2: Cấu hình môi trường

```bash
cp .env.example .env
```

Chỉnh sửa file `.env`:

```env
# Database (bắt buộc)
DATABASE_URL="postgresql://user:password@localhost:5432/antiscam"

# HuggingFace API (miễn phí)
HUGGINGFACE_API_KEY="hf_xxxxx"

# Groq API (optional, nhanh hơn)
GROQ_API_KEY="gsk_xxxxx"

# Admin Secret
ADMIN_SECRET="your-secret-key"
```

### Bước 3: Setup Database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed dữ liệu ban đầu
npm run db:seed
```

### Bước 4: Chạy development server

```bash
npm run dev
```

Truy cập http://localhost:3000

## 📁 Cấu trúc Project

```
antiscam/
├── app/
│   ├── api/
│   │   ├── scan/route.ts      # API kiểm tra URL
│   │   ├── report/route.ts    # API báo cáo
│   │   ├── stats/route.ts     # API thống kê
│   │   ├── train/route.ts     # API huấn luyện model
│   │   └── model/info/route.ts
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── UrlInput.tsx
│   │   ├── ResultCard.tsx
│   │   ├── RiskBadge.tsx
│   │   ├── ReportForm.tsx
│   │   └── ChartPanel.tsx
│   ├── lib/
│   │   ├── analyze.ts         # Logic phân tích URL
│   │   ├── aiModel.ts         # AI inference
│   │   ├── db.ts              # Prisma client
│   │   ├── constants.ts       # Hằng số
│   │   └── utils.ts           # Utilities
│   ├── admin/page.tsx         # Dashboard
│   ├── report/page.tsx        # Trang báo cáo
│   ├── guide/page.tsx         # Hướng dẫn
│   └── page.tsx               # Trang chủ
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Seed data
├── scripts/
│   └── train_model.py         # Script huấn luyện AI
└── public/
    └── manifest.json          # PWA manifest
```

## 🔌 API Reference

### POST /api/scan
Kiểm tra URL

```bash
curl -X POST http://localhost:3000/api/scan \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

Response:
```json
{
  "success": true,
  "data": {
    "url": "https://example.com",
    "domain": "example.com",
    "score": 25,
    "label": "SAFE",
    "reasons": ["Không phát hiện dấu hiệu đáng ngờ"],
    "aiConfidence": 0.85
  }
}
```

### POST /api/report
Báo cáo website lừa đảo

```bash
curl -X POST http://localhost:3000/api/report \
  -H "Content-Type: application/json" \
  -d '{"url": "https://scam.xyz", "reason": "phishing", "description": "Giả mạo ngân hàng"}'
```

### GET /api/stats
Lấy thống kê hệ thống

### GET /api/model/info
Thông tin mô hình AI hiện tại

## 🤖 Huấn luyện Model

### Sử dụng Python script

```bash
# Cài đặt dependencies
pip install torch transformers datasets scikit-learn pandas

# Huấn luyện với dữ liệu mẫu
python scripts/train_model.py

# Huấn luyện với dữ liệu custom
python scripts/train_model.py --data training_data.csv --epochs 5
```

### Trigger qua API (Admin)

```bash
curl -X POST http://localhost:3000/api/train \
  -H "Authorization: Bearer your-admin-secret"
```

## 🚀 Deploy

### Vercel (Frontend + API)

1. Push code lên GitHub
2. Import project vào Vercel
3. Thêm environment variables
4. Deploy

### Database (Supabase/Railway)

1. Tạo PostgreSQL database
2. Copy connection string vào `DATABASE_URL`
3. Chạy `npm run db:push`

## 📊 Cách hoạt động

### Phân tích URL (50% Heuristic + 50% AI)

**Heuristic checks:**
- HTTPS validation
- Suspicious TLDs (.xyz, .top, .club...)
- Brand impersonation detection
- Risk keywords analysis
- Domain pattern analysis

**AI Analysis:**
- Text classification với BERT/DistilBERT
- Phishing pattern detection
- Semantic analysis

### Scoring

| Score | Label | Ý nghĩa |
|-------|-------|---------|
| 0-30 | 🟢 SAFE | An toàn |
| 31-60 | 🟡 CAUTION | Cần cẩn thận |
| 61-100 | 🔴 DANGEROUS | Nguy hiểm |

## 🔒 Bảo mật

- Không lưu thông tin cá nhân người dùng
- API rate limiting (khuyến nghị)
- Admin routes được bảo vệ bằng secret key
- Input validation với Zod

## 📝 License

MIT License

## 🤝 Đóng góp

1. Fork repo
2. Tạo branch mới
3. Commit changes
4. Tạo Pull Request

---

Made with ❤️ for Vietnamese internet users
