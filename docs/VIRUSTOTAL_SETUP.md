# VirusTotal API Setup

## Tại sao dùng VirusTotal?

VirusTotal scan URL với 70+ antivirus engines từ các công ty như:
- Google Safe Browsing
- Kaspersky
- Bitdefender  
- ESET
- McAfee
- Norton
- Avira
...và nhiều hơn nữa!

## Lấy API Key (MIỄN PHÍ)

1. Truy cập https://www.virustotal.com
2. Đăng ký tài khoản (có thể dùng Gmail)
3. Vào https://www.virustotal.com/gui/my-apikey
4. Copy API key

## Giới hạn Free Tier

- ✅ 500 requests/ngày
- ✅ 4 requests/phút
- ✅ Scan URL, file, domain
- ✅ Truy vấn kết quả cũ

**Đủ cho hầu hết ứng dụng cá nhân!**

## Cấu hình

Thêm vào file `.env`:

```env
VIRUSTOTAL_API_KEY=your_actual_api_key_here
```

## Kết quả trả về

```json
{
  "virusTotal": {
    "malicious": 5,      // Số engine phát hiện malware
    "suspicious": 2,     // Số engine đánh dấu đáng ngờ
    "total": 70          // Tổng số engine scan
  }
}
```

## Logic phát hiện

```typescript
// Website bị đánh dấu NGUY HIỂM nếu:
malicious > 0          // Có engine nào phát hiện malware
// HOẶC
suspicious > 2         // Hơn 2 engine đánh dấu đáng ngờ
```

## Test

```bash
curl -X POST http://localhost:3000/api/scan \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'
```

Kết quả sẽ có thêm field `virusTotal` nếu API key được cấu hình!
