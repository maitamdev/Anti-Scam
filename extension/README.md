# ANTISCAM Browser Extension

Extension trình duyệt giúp bảo vệ bạn khỏi các website và hình ảnh lừa đảo bằng công nghệ AI.

## ✨ Tính Năng

- 🔍 **Quét URL Real-time**: Tự động kiểm tra độ an toàn của trang web
- 🖼️ **Quét Hình Ảnh**: Phát hiện hình ảnh lừa đảo trên trang web
- ⚠️ **Cảnh Báo Thời Gian Thực**: Thông báo ngay khi phát hiện mối đe dọa
- 📊 **Thống Kê**: Theo dõi số lượt quét và mối đe dọa chặn được
- 🚫 **Báo Cáo**: Báo cáo website lừa đảo trực tiếp
- 🔐 **Kiểm Tra Form**: Cảnh báo form không an toàn (HTTP)

## 📦 Cài Đặt

### Cài Đặt Trên Chrome/Edge (Developer Mode)

1. **Clone hoặc download repository này**

2. **Tạo icons** (bắt buộc trước khi load extension):
   - Đọc hướng dẫn trong `extension/icons/ICON_INSTRUCTIONS.md`
   - Tạo các file: `icon16.png`, `icon32.png`, `icon48.png`, `icon128.png`
   - Hoặc tạm thời copy icon từ `public/` folder nếu có

3. **Mở Chrome/Edge và truy cập**:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`

4. **Bật Developer Mode** (góc trên bên phải)

5. **Click "Load unpacked"** (Tải tiện ích đã giải nén)

6. **Chọn thư mục** `extension/` trong project

7. **Extension đã được cài đặt!** 🎉

### Cài Đặt Trên Firefox

1. **Mở Firefox và truy cập** `about:debugging`

2. **Click "This Firefox"**

3. **Click "Load Temporary Add-on"**

4. **Chọn file** `extension/manifest.json`

## 🚀 Sử Dụng

### Quét Trang Hiện Tại

1. Click vào icon ANTISCAM trên toolbar
2. Click nút **"Quét Trang Này"**
3. Xem kết quả phân tích

### Quét Hình Ảnh

1. Click vào icon ANTISCAM
2. Click nút **"Quét Hình Ảnh"**
3. Extension sẽ quét các hình ảnh trên trang

### Báo Cáo Website

1. Click vào icon ANTISCAM
2. Click nút **"Báo Cáo Lừa Đảo"**
3. Nhập lý do báo cáo
4. Gửi báo cáo

### Context Menu (Click Phải)

- **Click phải vào link**: Quét URL
- **Click phải vào hình ảnh**: Quét hình ảnh
- **Click phải trên trang**: Báo cáo trang

## ⚙️ Cấu Hình

Extension có thể được cấu hình với các tùy chọn:

- **Auto Scan**: Tự động quét mỗi trang mới (mặc định: bật)
- **Notifications**: Hiển thị thông báo cảnh báo (mặc định: bật)
- **Block Dangerous**: Tự động chặn trang nguy hiểm (mặc định: tắt)

## 🔧 Cấu Trúc Thư Mục

```
extension/
├── manifest.json           # Cấu hình chính
├── background/
│   └── service-worker.js   # Background script
├── popup/
│   ├── popup.html          # UI của popup
│   ├── popup.css           # Styles
│   └── popup.js            # Logic popup
├── content/
│   ├── content-script.js   # Script tương tác với webpage
│   └── content-style.css   # Styles cho content script
└── icons/
    ├── icon16.png          # Icon 16x16
    ├── icon32.png          # Icon 32x32
    ├── icon48.png          # Icon 48x48
    └── icon128.png         # Icon 128x128
```

## 🔌 API Endpoints

Extension kết nối với API của ANTISCAM:

- `POST /api/scan` - Quét URL
- `POST /api/scan-image` - Quét hình ảnh
- `POST /api/report` - Báo cáo website
- `GET /api/blocklist` - Kiểm tra blocklist

### Thay Đổi API URL

Mở file `popup/popup.js` và `background/service-worker.js`, tìm dòng:

```javascript
const API_BASE_URL = 'https://antiscam.vercel.app/api';
```

Thay đổi thành domain của bạn.

## 🛡️ Bảo Mật

- Extension chỉ gửi URL và metadata cần thiết
- Không thu thập thông tin cá nhân
- Không theo dõi lịch sử duyệt web
- Cache kết quả quét để giảm API calls

## 📊 Permissions

Extension yêu cầu các quyền sau:

- **activeTab**: Đọc URL và nội dung trang hiện tại
- **storage**: Lưu cache và thống kê
- **notifications**: Hiển thị cảnh báo
- **contextMenus**: Thêm menu click phải
- **host_permissions**: Kết nối API để quét

## 🐛 Troubleshooting

### Extension không load

- Kiểm tra đã tạo đủ 4 file icon chưa
- Kiểm tra manifest.json không có lỗi syntax
- Xem Console trong `chrome://extensions/` để debug

### Không quét được

- Kiểm tra API URL đã đúng chưa
- Kiểm tra CORS settings của API
- Xem Network tab trong DevTools

### Icons không hiển thị

- Đảm bảo đã tạo file PNG từ SVG
- Đặt đúng tên file: icon16.png, icon32.png, icon48.png, icon128.png
- Đặt đúng thư mục: `extension/icons/`

## 📝 Development

### Test Extension

1. Thay đổi code
2. Vào `chrome://extensions/`
3. Click biểu tượng reload trên extension card
4. Test lại tính năng

### Debug

- **Popup**: Click phải popup → Inspect
- **Background**: Vào `chrome://extensions/` → Click "service worker"
- **Content Script**: F12 trên webpage → Console

## 🚀 Xuất Bản

### Chrome Web Store

1. Tạo ZIP file từ thư mục `extension/`
2. Truy cập [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
3. Upload ZIP file
4. Điền thông tin, screenshots
5. Submit để review

### Firefox Add-ons

1. Tạo ZIP file
2. Truy cập [Firefox Add-on Developer Hub](https://addons.mozilla.org/developers/)
3. Upload và submit

## 📄 License

MIT License - Xem file LICENSE để biết thêm chi tiết

## 🤝 Contributing

Contributions, issues và feature requests luôn được chào đón!

## 📧 Support

Nếu có vấn đề, vui lòng tạo issue trên GitHub hoặc liên hệ qua website.

---

Được phát triển với ❤️ bởi ANTISCAM Team
