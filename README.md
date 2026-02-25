# 🎰 Vòng Quay Lì Xì

Web app vòng quay may mắn phát lì xì Tết. Người chơi quay bánh xe để nhận tiền lì xì với các mức từ **1.000 VNĐ** đến **100.000 VNĐ**.

## ✨ Tính năng

- 🎡 Bánh xe quay mượt với animation (Winwheel.js + GSAP)
- 🎆 Hiệu ứng pháo hoa CSS
- 🔊 Âm thanh: tick khi quay, vỗ tay khi trúng, nhạc buồn khi mất lượt
- 📊 Lịch sử + tổng tiền lì xì (trong popup Cài đặt)
- 🔄 Làm mới vòng quay (giữ nguyên lịch sử)
- 📱 Responsive trên mobile

## 🎯 Cách chơi

1. Mở `index.html` trên trình duyệt
2. Nhấn nút quay ở giữa bánh xe
3. Chờ bánh xe dừng → xem kết quả
4. Nhấn **Nhận tiền** để xác nhận (nếu trúng)
5. Hết lượt → nhấn **Cài đặt** → **Làm mới** để chơi tiếp

## 🗂 Cấu trúc

```
├── index.html          # Trang chính
├── css/
│   ├── custom.css      # CSS tùy chỉnh (pháo hoa, layout, popup)
│   └── sweetalert.css  # CSS cho popup SweetAlert
├── js/
│   ├── app.js          # Logic chính (cấu hình, quay, kết quả)
│   ├── Winwheel.min.js # Thư viện vẽ bánh xe
│   ├── TweenMax.min.js # Thư viện animation (GSAP)
│   └── sweetalert-dev.js # Thư viện popup
├── img/                # Ảnh (nền, nút, tiền, trang trí)
└── sound/              # Âm thanh (quay, vỗ tay, mất lượt)
```

## ⚙️ Cấu hình

Trong `js/app.js`:

```javascript
var solanquay = 2; // Số lượt quay mỗi lần chơi
```

Các ô trên bánh xe (xác suất):

| Ô | Tỉ lệ |
|---|--------|
| Mất lượt | 24% |
| 1.000 VNĐ | 20% |
| 2.000 VNĐ | 15% |
| 5.000 VNĐ | 15% |
| 10.000 VNĐ | 12% |
| 20.000 VNĐ | 10% |
| 50.000 VNĐ | 3% |
| 100.000 VNĐ | 3% |

## 🛠 Công nghệ

- HTML5 Canvas (Winwheel.js)
- GSAP / TweenMax
- SweetAlert
- jQuery 1.12.4
- Google Fonts (Francois One)
