# BÁO CÁO BÀI KIỂM TRA GIỮA KỲ — HỌC PHẦN CSE122

> **Học phần:** Phát triển ứng dụng Web cơ bản (CSE122)  
> **Khoa:** Công nghệ Thông tin — Trường Đại học Thủy Lợi  
> **Sinh viên thực hiện:** [HỌ VÀ TÊN SINH VIÊN]  
> **Mã số sinh viên:** [MÃ SINH VIÊN]  
> **Lớp:** [LỚP HỌC PHẦN]  

---

## 📌 3 LINK NỘP BÀI BẮT BUỘC (Mục V)

| STT | Nội dung nộp | Đường dẫn (Link) | Ghi chú |
| :---: | :--- | :--- | :--- |
| **1** | **Link Figma** | `https://www.figma.com/design/...` *(Điền link Figma của bạn tại đây)* | Thiết kế Desktop & Mobile |
| **2** | **Link GitHub cá nhân** | `https://github.com/[username]/cse122-gk-student-booking` *(Điền link GitHub)* | Chứa toàn bộ source code này |
| **3** | **Link Video trình bày** | `https://youtu.be/...` hoặc link Drive chia sẻ công khai *(Điền link Video)* | Thời lượng đúng 03 phút |

---

## 1. Tên đề tài
**CampusMind — Student Wellbeing Hub**  
Hệ thống nền tảng trực tuyến hỗ trợ chăm sóc sức khỏe tinh thần, tư vấn tâm lý học đường và phát triển bản thân dành riêng cho sinh viên Trường Đại học Thủy Lợi.

---

## 2. Tên trang đã thực hiện
**Trang Đăng ký Lịch Tư vấn Tâm lý 1-1 (Student Booking Wizard)**  
- File thực thi chính: `index.html` (Mô phỏng Slide 07 trong tài liệu kiến trúc BTL-02).
- Đối tượng sử dụng: Sinh viên có nhu cầu đặt lịch tư vấn cá nhân hoặc tham gia workshop.

---

## 3. Mục đích của trang
- **Tối ưu trải nghiệm đặt lịch:** Cung cấp quy trình 4 bước tuần tự, trực quan (Wizard), giúp sinh viên dễ dàng hoàn tất việc đăng ký mà không bị choáng ngợp hay bỏ dở giữa chừng.
- **Minh bạch hóa thông tin:** Giúp sinh viên nắm rõ hồ sơ chuyên viên, thời lượng tham vấn, hình thức diễn ra và các khung giờ còn thực sự khả dụng (`available`) trong tuần.
- **Bảo mật và an tâm:** Tôn trọng sự riêng tư của sinh viên, tích hợp bước gửi tài liệu bài tập thở 4-7-8 (AI-2) chuẩn bị tâm thế trước buổi hẹn.
- **Xác thực dữ liệu tại chỗ:** Kiểm tra tính hợp lệ của thông tin cá nhân và tài khoản email sinh viên nhà trường (`@student.edu.vn`) ngay tại giao diện người dùng.

---

## 4. Các chức năng chính

1. **Thanh tiến trình 4 bước (Step Progress Stepper):**
   - Đánh dấu trực quan trạng thái từng bước (Chưa làm, Đang làm, Đã hoàn thành với dấu tích xanh `✓`).
   - Ngăn chặn nhảy cóc khi chưa hoàn thành bước trước.
2. **Bước 1 — Chọn Dịch vụ Tham vấn:**
   - Đọc và hiển thị danh mục dịch vụ từ mảng dữ liệu JavaScript (`js/data.js`).
   - Tương tác chọn Radio Card mượt mà với hiệu ứng viền đổi màu và nền Sage Tint.
3. **Bước 2 — Chọn Chuyên viên & Lọc Khung giờ trống:**
   - Dropdown chọn chuyên viên tâm lý; tự động cập nhật lại danh sách slot giờ theo chuyên viên được chọn.
   - Lọc và hiển thị các khung giờ khả dụng (`status === 'available'`); cảnh báo rõ ràng nếu chuyên viên hết giờ trống.
4. **Bước 3 — Form nhập thông tin & Validation tại chỗ:**
   - Bắt buộc nhập Họ tên, Chủ đề tham vấn.
   - **Xác thực định dạng email trường:** Dùng biểu thức chính quy (Regex) và kiểm tra đuôi bắt buộc `.edu.vn`.
   - Hiển thị viền đỏ cảnh báo (`.input-error`) và thông báo lỗi rõ ràng bên dưới trường vi phạm.
   - Tùy chọn gợi ý chéo (Cross-recommendation) bài tập thở 4-7-8 điều hòa lo âu (AI-2).
5. **Bước 4 — Bảng rà soát thông tin (Summary Card):**
   - Tổng hợp toàn bộ dữ liệu đã chọn từ Bước 1, 2, 3 thành một phiếu tóm tắt trực quan để người dùng đối chiếu trước khi gửi.
6. **Xác nhận đặt lịch & Modal Popup thành công:**
   - Sinh mã lịch hẹn ngẫu nhiên dạng `APT-XXXX`.
   - Bật Popup Modal thành công kèm thông tin chi tiết và trạng thái "Đang chờ duyệt".
   - Tự động lưu bản ghi lịch hẹn vào `localStorage` của trình duyệt.
7. **Đặt tiếp / Reset Form:**
   - Đóng popup, đưa người dùng quay lại Bước 1 để thực hiện lượt đăng ký mới nếu có nhu cầu.
8. **Thiết kế thích ứng & Bộ chuyển đổi thiết bị trực tiếp (Device Simulator Switcher):**
   - **Thanh công cụ chuyển đổi 1-Click trên đầu trang:** Cho phép chuyển đổi linh hoạt 3 chế độ xem: 🖥️ **Desktop (100%)**, 📱 **Tablet (768px)**, 📱 **Mobile (390px)** ngay trên màn hình mà không cần mở F12 DevTools.
   - **Khung viền giả lập Smartphone (Slide 14):** Khi bấm nút Mobile (390px), toàn bộ trang web được bọc trong khung viền điện thoại bo tròn góc 44px cao cấp, tự động kích hoạt layout 1 cột dọc và hiện nút Hamburger Menu.
   - **Thanh tiến trình 4 bước:** Tự động ẩn nhãn chữ dài trên điện thoại, thu gọn đường line nối và giữ nguyên vòng tròn số thứ tự rõ ràng, không bị tràn màn hình.
   - **Lưới Khung giờ & Form:** Chuyển từ lưới 2 cột sang 1 cột trên màn hình điện thoại nhỏ (< 480px), đảm bảo kích thước chạm (touch target) tối thiểu 44px.
   - **Bộ nút hành động (Wizard Actions):** Xếp chồng linh hoạt (`column-reverse`) để ngón tay cái dễ dàng bấm nút "Tiếp tục" / "Quay lại" khi cầm điện thoại một tay.
   - **Vị trí xử lý trong mã nguồn:** Toàn bộ CSS Media Queries và Simulator được viết tường minh tại [`css/style.css`](css/style.css) với `@media screen and (max-width: 768px)`, `body.viewport-mobile`, và hàm `BookingWizard.setDevice(mode)` trong `js/main.js`.

---

## 5. Công nghệ sử dụng

| Lớp công nghệ | Chi tiết sử dụng |
| :--- | :--- |
| **HTML5** | Semantic HTML đầy đủ: `<header>`, `<nav>`, `<main>`, `<section>`, `<form>`, `<fieldset>`, `<legend>`, `<aside>`, `<footer>`. Không lạm dụng `div`. |
| **CSS3** | Flexbox, CSS Grid, Media Queries, CSS Variables (Design System 8 Tokens: Sage, Paper, Ink, Clay, Amber, Sky). |
| **JavaScript (ES6+)** | Pure Vanilla JS (không dùng framework): Cấu trúc Object Literal (`BookingWizard`), DOM manipulation, Event listener (`click`, `change`, `submit`), Array methods (`map`, `filter`, `find`), Regex validation, `localStorage`. |
| **Icons & Typography** | Lucide Icons, Google Fonts (`Fraunces` cho Tiêu đề & `Be Vietnam Pro` cho Giao diện). |

---

## 6. Cấu trúc thư mục mã nguồn

Cấu trúc repository độc lập tuân thủ nghiêm ngặt theo yêu cầu **Mục II** của đề bài:

```text
cse122-gk-student-booking/
├── index.html          # File HTML chính chứa toàn bộ cấu trúc trang
├── css/
│   └── style.css       # File CSS tổng hợp hệ màu 8 Tokens, Stepper, Card, Validation
├── js/
│   ├── data.js         # Mảng Mock Data (Dịch vụ, Chuyên viên, Khung giờ)
│   └── main.js         # Toàn bộ logic Controller (Wizard, Validation, Modal, Storage)
├── assets/             # Thư mục chứa hình ảnh/tài nguyên (nếu có)
└── README.md           # Báo cáo thuyết minh đầy đủ chuẩn 8 mục
```

---

## 7. Hướng dẫn chạy thử nghiệm

### Cách 1: Chạy trực tiếp (Không cần cài thêm phần mềm)
- Nhấp đúp chuột trực tiếp vào file [index.html](file:///d:/E/NAM%202/HK%201/WEB/CSE122_BaiGiuaKy/cse122-gk-student-booking/index.html) để mở trên bất kỳ trình duyệt nào (Chrome, Edge, Firefox).

### Cách 2: Chạy qua Live Server hoặc Python HTTP Server
```bash
# Mở terminal tại thư mục dự án
cd cse122-gk-student-booking

# Chạy server cục bộ bằng Python:
python -m http.server 3000
```
Truy cập: `http://localhost:3000`

---

## 8. Kịch bản Video thuyết trình 03 phút (Mục III & IV)

Tên file video upload: `CSE122-GK-SVxx-[TenSinhVien]-StudentBooking`

- **Phần 1: Giới thiệu (0:00 – 0:30):**
  - Giới thiệu bản thân, đề tài *CampusMind*, trang *Student Booking* phục vụ sinh viên trường đăng ký tư vấn tâm lý học đường.
- **Phần 2: Bản thiết kế Figma (0:30 – 1:00):**
  - Mở Figma: Trình bày bố cục Desktop và Mobile, giải thích luồng 4 bước và thẻ tóm tắt xác nhận.
- **Phần 3: Sản phẩm Web hoàn chỉnh (1:00 – 1:30):**
  - Mở trang web trên trình duyệt: Cho thấy giao diện khớp Figma, bật `F12` kiểm tra Responsive trên Mobile không bị vỡ layout.
- **Phần 4: Giải thích Mã nguồn (1:30 – 2:30):**
  - Mở VS Code:
    - **HTML:** Chỉ cấu trúc Semantic `<form>`, các thẻ `<fieldset>` tương ứng 4 bước, thẻ `<aside>` làm modal.
    - **CSS:** Chỉ hệ màu 8 Tokens và class `.input-error`, `.selected`.
    - **JavaScript:** Chỉ hàm `goToStep()` quản lý tiến trình, hàm `validateStep3AndProceed()` kiểm tra email trường `.edu.vn`.
- **Phần 5: Demo tương tác trực tiếp (2:30 – 3:00):**
  - Thao tác: Bước 1 chọn dịch vụ $\rightarrow$ Bước 2 chọn giờ $\rightarrow$ Bước 3 cố tình nhập sai email để hiện lỗi đỏ $\rightarrow$ Nhập đúng email `.edu.vn` $\rightarrow$ Bước 4 rà soát và nhấn **Xác nhận** $\rightarrow$ Modal popup thành công hiện ra với mã `APT-XXXX`.
