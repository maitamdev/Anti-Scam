# Hướng Dẫn Lấy API Keys Cho Domain Check

## 📋 Tổng Quan

Để nâng cấp hệ thống scan URL với khả năng kiểm tra domain age, SSL certificate, và IP reputation, bạn cần đăng ký các API sau:

---

## 1. 🔍 WHOIS API (Kiểm Tra Tuổi Domain)

### Tùy Chọn A: WHOIS XML API (Khuyến Nghị)
- **Website**: https://www.whoisxmlapi.com/
- **Free Tier**: 500 requests/tháng
- **Giá**: $0.005/request sau khi hết free tier

**Cách Đăng Ký**:
1. Truy cập https://www.whoisxmlapi.com/
2. Click "Sign Up" → Đăng ký tài khoản miễn phí
3. Vào Dashboard → API Keys → Copy API Key
4. Thêm vào `.env`:
   ```env
   WHOIS_API_KEY="your_whois_api_key_here"
   ```

**Test API**:
```bash
curl "https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=YOUR_API_KEY&domainName=google.com&outputFormat=JSON"
```

### Tùy Chọn B: WHOIS Lookup API (Miễn Phí)
- **Website**: https://whois.whoisxmlapi.com/lookup
- **Free Tier**: Unlimited (có rate limit)
- **Giá**: Miễn phí

---

## 2. 🔐 SSL Certificate Check

### Tùy Chọn A: SSL Labs API (Miễn Phí)
- **Website**: https://www.ssllabs.com/ssltest/
- **Free Tier**: Unlimited (rate limit: 1 request/10s)
- **Giá**: Miễn phí

**Không Cần API Key** - Sử dụng trực tiếp:
```bash
curl "https://api.ssllabs.com/api/v3/analyze?host=google.com"
```

### Tùy Chọn B: Tự Implement (Node.js Built-in)
Sử dụng `https` module của Node.js để kiểm tra SSL:
```typescript
import https from 'https'

function checkSSL(domain: string) {
  return new Promise((resolve) => {
    const options = {
      hostname: domain,
      port: 443,
      method: 'GET',
    }
    
    const req = https.request(options, (res) => {
      const cert = res.socket.getPeerCertificate()
      resolve({
        valid: res.socket.authorized,
        issuer: cert.issuer,
        validFrom: cert.valid_from,
        validTo: cert.valid_to,
      })
    })
    
    req.on('error', () => resolve({ valid: false }))
    req.end()
  })
}
```

---

## 3. 🛡️ AbuseIPDB (IP Reputation Check)

### AbuseIPDB API
- **Website**: https://www.abuseipdb.com/
- **Free Tier**: 1,000 requests/ngày
- **Giá**: Miễn phí cho personal use

**Cách Đăng Ký**:
1. Truy cập https://www.abuseipdb.com/register
2. Đăng ký tài khoản miễn phí
3. Vào Account → API → Create Key
4. Thêm vào `.env`:
   ```env
   ABUSEIPDB_API_KEY="your_abuseipdb_key_here"
   ```

**Test API**:
```bash
curl -G https://api.abuseipdb.com/api/v2/check \
  --data-urlencode "ipAddress=8.8.8.8" \
  -H "Key: YOUR_API_KEY" \
  -H "Accept: application/json"
```

---

## 4. 🔎 VirusTotal API (Đã Có)

Bạn đã có VirusTotal API trong `.env`:
```env
VIRUSTOTAL_API_KEY="your_virustotal_api_key_here"
```

**Nâng Cấp Lên Premium** (Optional):
- Free: 4 requests/phút, 500 requests/ngày
- Premium: 1,000 requests/phút, unlimited/ngày
- Giá: $10-$50/tháng
- Website: https://www.virustotal.com/gui/my-apikey

---

## 5. 🌐 Google Safe Browsing API (Miễn Phí)

### Google Safe Browsing API v4
- **Website**: https://developers.google.com/safe-browsing/v4/get-started
- **Free Tier**: 10,000 requests/ngày
- **Giá**: Miễn phí

**Cách Đăng Ký**:
1. Truy cập https://console.cloud.google.com/
2. Tạo Project mới
3. Enable "Safe Browsing API"
4. Tạo API Key (Credentials → Create Credentials → API Key)
5. Thêm vào `.env`:
   ```env
   GOOGLE_SAFE_BROWSING_API_KEY="your_google_api_key_here"
   ```

**Test API**:
```bash
curl -X POST "https://safebrowsing.googleapis.com/v4/threatMatches:find?key=YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "client": {
      "clientId": "antiscam-vn",
      "clientVersion": "1.0.0"
    },
    "threatInfo": {
      "threatTypes": ["MALWARE", "SOCIAL_ENGINEERING"],
      "platformTypes": ["ANY_PLATFORM"],
      "threatEntryTypes": ["URL"],
      "threatEntries": [{"url": "http://malware.testing.google.test/testing/malware/"}]
    }
  }'
```

---

## 📝 Cập Nhật File `.env`

Sau khi lấy được API keys, cập nhật file `.env`:

```env
# ============================================
# DOMAIN & SSL CHECK APIs
# ============================================

# WHOIS API (Domain Age Check)
WHOIS_API_KEY="your_whois_api_key_here"

# AbuseIPDB (IP Reputation)
ABUSEIPDB_API_KEY="your_abuseipdb_key_here"

# Google Safe Browsing (Threat Detection)
GOOGLE_SAFE_BROWSING_API_KEY="your_google_api_key_here"

# ============================================
# EXISTING APIs
# ============================================

# VirusTotal (Already configured)
VIRUSTOTAL_API_KEY="your_virustotal_api_key_here"

# Groq AI (Already configured)
GROQ_API_KEY="gsk_xxxxxxxxxxxxxxxxxxxx"
```

---

## 🚀 Tóm Tắt Chi Phí

| API | Free Tier | Giá Premium | Khuyến Nghị |
|-----|-----------|-------------|-------------|
| WHOIS XML API | 500 req/tháng | $0.005/req | ✅ Dùng free tier |
| SSL Labs | Unlimited | Miễn phí | ✅ Miễn phí |
| AbuseIPDB | 1,000 req/ngày | Miễn phí | ✅ Miễn phí |
| Google Safe Browsing | 10,000 req/ngày | Miễn phí | ✅ Miễn phí |
| VirusTotal | 500 req/ngày | $10-50/tháng | ⚠️ Nâng cấp nếu cần |

**Tổng Chi Phí**: **$0/tháng** (nếu dùng free tier)

---

## ⚡ Quick Start

1. **Đăng ký tất cả API miễn phí** (15 phút):
   - WHOIS XML API
   - AbuseIPDB
   - Google Safe Browsing

2. **Cập nhật `.env`** với API keys

3. **Test APIs**:
   ```bash
   # Test WHOIS
   curl "https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=YOUR_KEY&domainName=google.com&outputFormat=JSON"
   
   # Test AbuseIPDB
   curl -G https://api.abuseipdb.com/api/v2/check --data-urlencode "ipAddress=8.8.8.8" -H "Key: YOUR_KEY"
   
   # Test Google Safe Browsing
   curl -X POST "https://safebrowsing.googleapis.com/v4/threatMatches:find?key=YOUR_KEY" -H "Content-Type: application/json" -d '{"client":{"clientId":"test"},"threatInfo":{"threatTypes":["MALWARE"],"platformTypes":["ANY_PLATFORM"],"threatEntryTypes":["URL"],"threatEntries":[{"url":"http://malware.testing.google.test/testing/malware/"}]}}'
   ```

4. **Restart server**:
   ```bash
   npm run dev
   ```

---

## 📞 Support

Nếu gặp vấn đề khi đăng ký API:
- WHOIS XML API: support@whoisxmlapi.com
- AbuseIPDB: https://www.abuseipdb.com/contact
- Google Safe Browsing: https://developers.google.com/safe-browsing/v4/support

---

**Lưu Ý**: Tất cả API trên đều có free tier đủ dùng cho dự án sinh viên. Chỉ cần nâng cấp lên premium khi traffic tăng cao (>10,000 requests/ngày).
