# 🎰 Lucky Money - Vòng Quay Lì Xì

## Tổng quan
Web app **vòng quay may mắn** dùng để phát lì xì Tết. Người chơi quay bánh xe để nhận tiền lì xì với các mức giá trị khác nhau. Ứng dụng hoàn toàn là **static HTML/CSS/JS** (không có backend), chạy trực tiếp trên trình duyệt.

---

## Cấu trúc thư mục

```
lucky_money/
├── index.html          ← File chính (381 dòng), chứa cả HTML + JS inline
├── README              ← Mô tả ngắn
├── css/
│   ├── custom.css      ← CSS tùy chỉnh (358 dòng): hiệu ứng pháo hoa, layout, popup
│   └── sweetalert.css  ← CSS cho thư viện SweetAlert (popup thông báo)
├── js/
│   ├── Winwheel.min.js ← Thư viện vẽ bánh xe quay (canvas)
│   ├── TweenMax.min.js ← Thư viện animation (GSAP)
│   └── sweetalert-dev.js ← Thư viện SweetAlert (popup đẹp)
├── img/                ← 38 file ảnh
│   ├── background.jpg  ← Ảnh nền trang
│   ├── banglixi.png    ← Bảng hiển thị lì xì (góc trên trái)
│   ├── contro.png      ← Nút quay (con trỏ ở giữa bánh xe)
│   ├── controhetluot.png ← Con trỏ khi hết lượt
│   ├── popup.jpg / popup1.png / popup2.jpg ← Popup cài đặt (3 trạng thái)
│   ├── popupnhantien.png ← Popup nhận tiền
│   ├── nhantien.png    ← Nút "nhận tiền"
│   ├── caidat.png      ← Nút "cài đặt"
│   ├── hea1.png        ← Trang trí header
│   ├── bot1.png        ← Trang trí footer
│   ├── muiten.gif      ← Mũi tên nhấp nháy chỉ nút nhận tiền
│   ├── {1,2,5,10,20,50,100,200,500}k.jpg   ← Ảnh hiển thị số tiền (nhỏ)
│   └── {1,2,5,10,20,50,100,200,500}kk.jpg  ← Ảnh hiển thị số tiền (popup lớn)
└── sound/
    ├── dangquay.mp3    ← Âm thanh khi đang quay
    ├── votay.mp3       ← Âm thanh vỗ tay (trúng giải)
    └── matluot.mp3     ← Âm thanh thất bại (mất lượt)
```

---

## Thư viện sử dụng

| Thư viện | Nguồn | Mục đích |
|----------|-------|----------|
| **Winwheel.js** | Local (`js/Winwheel.min.js`) | Vẽ và quay bánh xe trên canvas |
| **TweenMax (GSAP)** | Local (`js/TweenMax.min.js`) | Animation mượt cho bánh xe |
| **SweetAlert** | Local (`js/sweetalert-dev.js` + `css/sweetalert.css`) | Popup thông báo đẹp |
| **jQuery 1.12.4** | CDN | Thao tác DOM (hover, thay ảnh) |
| **Google Fonts** | CDN (`Francois One`) | Font chữ |

---

## Logic chính (trong `<script>` của `index.html`)

### Biến cấu hình quan trọng
```javascript
var matkhau = "test";     // Mật khẩu mở khoá vòng quay
var solanquay = 2;        // Số lượt quay mỗi lần chơi
```

### Cấu hình bánh xe (Winwheel)
- **8 ô** với tỉ lệ trúng khác nhau (dùng `winwheelPercentToDegrees`):

| Ô | Giá trị | Tỉ lệ (%) | Font size |
|---|---------|-----------|-----------|
| 1 | Mất lượt | 24% | 30px |
| 2 | 1.000 VNĐ | 20% | 28px |
| 3 | 2.000 VNĐ | 15% | 26px |
| 4 | 5.000 VNĐ | 15% | 24px |
| 5 | 10.000 VNĐ | 12% | 22px |
| 6 | 20.000 VNĐ | 10% | 20px |
| 7 | 50.000 VNĐ | 3% | 18px |
| 8 | 100.000 VNĐ | 3% | 16px |

- Màu sắc: xen kẽ đỏ đậm (`#910f06`) và vàng cam (`#ab6f03`)
- Animation: `spinToStop`, duration 6.4s

### Các hàm chính

| Hàm | Mô tả |
|-----|-------|
| `nhappass()` | Yêu cầu nhập mật khẩu để mở khoá (dùng SweetAlert input) |
| `startSpin()` | Bắt đầu quay bánh xe, chặn click khi đang quay |
| `alertPrize(indicatedSegment)` | Callback sau khi quay xong - xử lý kết quả |
| `nhantien()` | Xử lý khi người chơi nhấn "Nhận tiền" |
| `lammoi()` | Reset vòng quay (giữ lịch sử + tổng tiền) |
| `mopopup()` | Mở popup cài đặt |
| `tatpopup()` | Đóng popup cài đặt |
| `playSound()` | Phát âm thanh tick khi kim đi qua pin |
| `laypower()` | Lấy giá trị từ thanh range (tốc độ quay) |

### Luồng hoạt động chính

```
1. Trang load → hiển thị bánh xe + số lượt quay
2. Click nút quay → startSpin() → bánh xe quay
3. Quay xong → alertPrize():
   ├── Nếu "Ô mất lượt" → thông báo fail, phát nhạc buồn
   └── Nếu trúng tiền → hiển thị số tiền, nút "Nhận tiền", phát nhạc vỗ tay
4. Click "Nhận tiền" → nhantien() → popup hiển thị tiền, cộng vào tổng, lưu lịch sử
5. Còn lượt → quay tiếp (reset bánh xe)
6. Hết lượt → hiển thị "controhetluot.png", không quay được nữa
7. Click "Làm mới" → lammoi() → reset vòng quay, giữ lịch sử + tổng tiền
```

### Biến trạng thái runtime
```javascript
var dem = 0;              // Đếm số lần đã quay
var demnhantien = 0;      // Đếm số lần nhận tiền
var lichsulixi = "";      // Chuỗi HTML lịch sử nhận lì xì
var tongtienlixi = 0;     // Tổng tiền lì xì đã nhận (đơn vị: nghìn VNĐ)
var tiendalixi;           // Số tiền lì xì lần quay hiện tại
let wheelPower = 13;      // Tốc độ quay (điều chỉnh bởi thanh range)
let wheelSpinning = false; // Cờ đang quay hay không
```

---

## CSS đáng chú ý (`css/custom.css`)

- **Hiệu ứng pháo hoa** (`.pyro`): dùng `box-shadow` + keyframes `bang`, `gravity`, `position` tạo animation pháo hoa liên tục
- **Layout**: Flexbox center cho vòng quay
- **Popup**: `position: absolute` + `transform: translate(-50%, -50%)` để căn giữa
- **Responsive**: media query cho màn hình ≤ 400px và ≤ 700px
- **Background**: ảnh `background.jpg` cover toàn trang, `position: fixed`

---

## Giao diện (UI Elements)

| Vị trí | Element | Mô tả |
|--------|---------|-------|
| Giữa màn hình | Canvas `#canvas` 450x450 | Bánh xe quay |
| Giữa bánh xe | `.nutbatdau` | Con trỏ / nút quay |
| Góc trên trái | `banglixi.png` | Bảng lì xì (lượt quay + số tiền) |
| Góc trên trái | `#xuatluotquay` | Hiển thị số lượt quay còn lại |
| Góc trên trái | `#xuatsotien` | Hiển thị ảnh số tiền trúng |
| Góc trên trái | Nút "Nhận tiền" | Hiện khi trúng giải |
| Góc dưới trái | `.nutcaidat` | Nút mở cài đặt |
| Góc dưới phải | `#manhornhe` (range) | Thanh điều chỉnh tốc độ quay (5-20) |
| Góc trên phải | `hea1.png` | Trang trí hoa đào/hoa mai |
| Footer | `bot1.png` | Trang trí chân trang |
| Overlay | `.pyro` | Hiệu ứng pháo hoa toàn trang |

---

## Lưu ý khi sửa code

1. **Toàn bộ JS nằm inline** trong `index.html` (dòng 62-379), không tách file riêng
2. **Không có backend** - mọi dữ liệu (lịch sử, tổng tiền) mất khi reload trang
3. **Hàm `nhappass()`** đã được định nghĩa nhưng **không được gọi** ở đâu cả (có thể đã bị disable)
4. **Hàm `lammoi()`**: Logic mật khẩu đã bị comment/hardcode (`inputValue = "test"`) → luôn bypass
5. **Thanh range** (tốc độ quay) ở góc dưới phải luôn hiển thị, có thể người dùng không biết
6. **Ảnh tiền**: quy ước đặt tên `{số}k.jpg` (nhỏ) và `{số}kk.jpg` (lớn cho popup)
7. **Tick sound**: load từ URL bên ngoài (`dougtesting.net`), có thể bị lỗi nếu mất mạng
