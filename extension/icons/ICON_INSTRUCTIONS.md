# Hướng Dẫn Tạo Icons

Extension cần các icon với kích thước: 16x16, 32x32, 48x48, và 128x128 pixels.

## Cách tạo icons từ SVG:

### Option 1: Sử dụng Online Tool
1. Truy cập https://svgtopng.com/
2. Upload file `icon128.svg`
3. Chọn kích thước: 128x128, 48x48, 32x32, 16x16
4. Download và đổi tên thành `icon128.png`, `icon48.png`, `icon32.png`, `icon16.png`

### Option 2: Sử dụng Inkscape (Free Software)
1. Download Inkscape: https://inkscape.org/
2. Mở file `icon128.svg`
3. File → Export PNG Image
4. Set width/height cho từng size và export

### Option 3: Sử dụng ImageMagick (Command Line)
```bash
# Install ImageMagick first
convert icon128.svg -resize 128x128 icon128.png
convert icon128.svg -resize 48x48 icon48.png
convert icon128.svg -resize 32x32 icon32.png
convert icon128.svg -resize 16x16 icon16.png
```

## Design Guidelines:

- **Icon 128x128**: Logo chính, hiển thị trong Chrome Web Store
- **Icon 48x48**: Hiển thị trong trang Extensions
- **Icon 32x32**: Hiển thị trong toolbar
- **Icon 16x16**: Hiển thị trong context menu

## Màu sắc:
- Primary: #667eea (Purple)
- Secondary: #764ba2 (Deep Purple)
- Background: White
- Accent: Shield với checkmark

Sau khi tạo xong các file PNG, đặt chúng vào thư mục `extension/icons/`.
