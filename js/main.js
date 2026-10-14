/**
 * ==========================================================================
 * CampusMind — Student Booking Controller (Slide 07)
 * File: js/main.js
 * Học phần: Phát triển ứng dụng Web cơ bản — CSE122
 * ==========================================================================
 * Quản lý:
 *  1. Luồng Wizard 4 bước (Step-by-step navigation & progress bar)
 *  2. Render động Dịch vụ & Khung giờ từ mảng dữ liệu js/data.js
 *  3. Form Validation tại chỗ (Kiểm tra rỗng & Regex email trường đuôi .edu.vn)
 *  4. Thẻ tóm tắt thông tin & Modal Popup xác nhận đặt lịch thành công
 *  5. Lưu trữ lịch hẹn vào LocalStorage
 * ==========================================================================
 */

'use strict';

const BookingWizard = {
  // Trạng thái hiện tại của Wizard
  currentStep: 1,
  selectedServiceId: 'srv-01',
  selectedCounselorId: 'counselor-01',
  selectedSlotTime: '',
  formData: {
    studentName: 'Lê Ngọc An',
    studentEmail: 'ngocan@student.edu.vn',
    topic: 'Áp lực học tập & thi cử cuối kỳ',
    notes: 'Dạo này mình thấy quá tải với lịch thi và đồ án, khó tập trung và hay mất ngủ...',
    prepExercise: true
  },

  /**
   * 1. Khởi tạo toàn bộ controller khi trang tải xong
   */
  init() {
    this.renderServices();
    this.renderCounselors();
    this.renderTimeSlots();

    // Điền dữ liệu mặc định vào form
    const nameInp = document.getElementById('student-name');
    const emailInp = document.getElementById('student-email');
    const topicInp = document.getElementById('booking-topic');
    const notesInp = document.getElementById('booking-notes');

    if (nameInp && this.formData.studentName) nameInp.value = this.formData.studentName;
    if (emailInp && this.formData.studentEmail) emailInp.value = this.formData.studentEmail;
    if (topicInp && this.formData.topic) topicInp.value = this.formData.topic;
    if (notesInp && this.formData.notes) notesInp.value = this.formData.notes;

    if (window.lucide) {
      lucide.createIcons();
    }
  },

  /**
   * Lấy dữ liệu an toàn từ js/data.js
   */
  getData() {
    return window.CAMPUS_DATA || { services: [], counselors: [] };
  },

  /**
   * 2. BƯỚC 1: Render danh sách dịch vụ tham vấn tâm lý
   */
  renderServices() {
    const container = document.getElementById('service-options-container');
    const data = this.getData();
    if (!container || !data.services) return;

    container.innerHTML = data.services.map(s => {
      const isSelected = this.selectedServiceId === s.id;
      return `
        <div 
          onclick="BookingWizard.selectService('${s.id}')"
          class="service-option-card p-4 rounded-2xl border ${isSelected ? 'selected' : 'border-card-border'} bg-white flex items-start gap-3.5 cursor-pointer"
        >
          <input 
            type="radio" 
            name="service-radio" 
            id="svc-${s.id}" 
            value="${s.id}" 
            ${isSelected ? 'checked' : ''} 
            class="mt-1 text-sage focus:ring-sage"
          >
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <label for="svc-${s.id}" class="font-serif font-bold text-sm text-ink cursor-pointer">${s.name}</label>
              <span class="text-[11px] font-semibold text-sage bg-white px-2.5 py-0.5 rounded-full border border-card-border">${s.duration}</span>
            </div>
            <p class="text-xs text-ink/70 mt-1 leading-relaxed">${s.description}</p>
            <div class="mt-2 text-[11px] text-sage font-medium flex items-center gap-1">
              <span>📍 Hình thức: ${s.format}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  selectService(serviceId) {
    this.selectedServiceId = serviceId;
    this.renderServices();
    const err = document.getElementById('service-error');
    if (err) err.textContent = '';
  },

  /**
   * 3. BƯỚC 2: Render Dropdown Chuyên viên & Lưới khung giờ trống
   */
  renderCounselors() {
    const select = document.getElementById('counselor-select');
    const data = this.getData();
    if (!select || !data.counselors) return;

    select.innerHTML = data.counselors.map(c => `
      <option value="${c.id}" ${c.id === this.selectedCounselorId ? 'selected' : ''}>
        ${c.name} — ${c.title} (${c.office})
      </option>
    `).join('');
  },

  onCounselorChange() {
    const select = document.getElementById('counselor-select');
    if (!select) return;
    this.selectedCounselorId = select.value;
    this.selectedSlotTime = ''; // Reset slot khi đổi chuyên viên
    this.renderTimeSlots();
  },

  renderTimeSlots() {
    const container = document.getElementById('time-slots-container');
    const data = this.getData();
    if (!container || !data.counselors) return;

    const counselor = data.counselors.find(c => c.id === this.selectedCounselorId) || data.counselors[0];
    const rawSlots = (counselor.schedule && counselor.schedule.slots) ? counselor.schedule.slots : [];

    if (rawSlots.length === 0) {
      container.innerHTML = `
        <div class="col-span-2 text-xs text-ink/60 p-4 bg-paper rounded-xl text-center border border-card-border">
          Chuyên viên hiện tại tạm hết khung giờ trong tuần này. Vui lòng chọn chuyên gia khác.
        </div>`;
      return;
    }

    container.innerHTML = rawSlots.map(slot => {
      const isBooked = slot.status === 'booked';
      const slotLabel = `${slot.day} · ${slot.time}`;
      const isSelected = !isBooked && (this.selectedSlotTime === slotLabel);
      const room = slot.room || 'Phòng tư vấn 302';

      if (isBooked) {
        return `
          <div class="p-3.5 rounded-2xl border border-card-border/60 bg-paper/60 text-ink/40 text-xs cursor-not-allowed select-none">
            <div class="flex items-center justify-between mb-1">
              <span class="text-[11px] font-medium">${slot.day}</span>
              <span class="text-[10px] font-semibold bg-gray-200/80 text-gray-500 px-2 py-0.5 rounded-full">🔒 Đã kín</span>
            </div>
            <div class="font-bold text-sm text-ink/40 line-through">${slot.time}</div>
            <div class="flex items-center justify-between text-[11px] text-ink/40 mt-1 pt-1 border-t border-card-border/40">
              <span>Đã đăng ký</span>
              <span>45 phút</span>
            </div>
          </div>
        `;
      }

      return `
        <div 
          onclick="BookingWizard.selectSlot('${slotLabel}')"
          class="time-slot-btn p-3.5 rounded-2xl border ${isSelected ? 'selected' : 'border-card-border bg-paper text-ink'} text-xs cursor-pointer"
        >
          <div class="flex items-center justify-between mb-1">
            <span class="text-[11px] ${isSelected ? 'text-white/90' : 'text-ink/70'} font-medium">${slot.day}</span>
            <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-sage-tint text-sage'}">
              ${isSelected ? '✓ Đang chọn' : 'Còn trống'}
            </span>
          </div>
          <div class="font-bold text-base ${isSelected ? 'text-white' : 'text-ink'}">${slot.time}</div>
          <div class="flex items-center justify-between text-[11px] ${isSelected ? 'text-white/80' : 'text-ink/60'} mt-1 pt-1 border-t ${isSelected ? 'border-white/20' : 'border-card-border/70'}">
            <span>📍 ${room}</span>
            <span>45 phút</span>
          </div>
        </div>
      `;
    }).join('');

    // Mặc định chọn khung giờ trống đầu tiên nếu chưa chọn
    const availableSlots = rawSlots.filter(s => s.status === 'available');
    if (!this.selectedSlotTime && availableSlots.length > 0) {
      this.selectSlot(`${availableSlots[0].day} · ${availableSlots[0].time}`);
    }
  },

  selectSlot(slotString) {
    this.selectedSlotTime = slotString;
    const input = document.getElementById('selected-slot');
    if (input) input.value = slotString;
    const err = document.getElementById('slot-error');
    if (err) err.textContent = '';
    this.renderTimeSlots();
  },

  /**
   * 4. ĐIỀU HƯỚNG WIZARD: Chuyển đổi qua lại giữa các bước (1-2-3-4)
   */
  goToStep(stepNumber) {
    // Kiểm tra điều kiện trước khi chuyển bước
    if (stepNumber === 2 && !this.selectedServiceId) {
      document.getElementById('service-error').textContent = 'Vui lòng chọn một dịch vụ hỗ trợ.';
      return;
    }

    if (stepNumber === 3 && !this.selectedSlotTime) {
      document.getElementById('slot-error').textContent = 'Vui lòng chọn một khung giờ tư vấn còn trống.';
      return;
    }

    this.currentStep = stepNumber;

    // Cập nhật ẩn/hiện 4 fieldset nội dung
    for (let i = 1; i <= 4; i++) {
      const stepEl = document.getElementById(`step-content-${i}`);
      const navEl = document.getElementById(`step-nav-${i}`);
      const lineEl = document.getElementById(`line-${i}`);

      if (stepEl) {
        stepEl.classList.toggle('hidden', i !== stepNumber);
      }

      // Cập nhật giao diện Stepper
      if (navEl) {
        navEl.classList.toggle('active', i <= stepNumber);
        const numEl = navEl.querySelector('.step-number');
        if (numEl) {
          if (i < stepNumber) {
            numEl.innerHTML = '✓';
            numEl.className = 'w-7 h-7 rounded-full bg-sage text-white flex items-center justify-center text-xs font-bold step-number';
          } else if (i === stepNumber) {
            numEl.textContent = i;
            numEl.className = 'w-7 h-7 rounded-full bg-sage text-white flex items-center justify-center text-xs font-bold step-number';
          } else {
            numEl.textContent = i;
            numEl.className = 'w-7 h-7 rounded-full bg-card-border text-ink flex items-center justify-center text-xs font-bold step-number';
          }
        }
      }

      if (lineEl) {
        lineEl.classList.toggle('completed', i < stepNumber);
      }
    }

    // Nếu đến bước 4 thì render nội dung tóm tắt
    if (stepNumber === 4) {
      this.renderSummary();
    }

    // Cuộn nhẹ lên đầu form
    window.scrollTo({ top: 100, behavior: 'smooth' });
  },

  /**
   * 5. BƯỚC 3: FORM VALIDATION TẠI CHỖ
   * Kiểm tra họ tên, chủ đề và định dạng email sinh viên (@student.edu.vn)
   */
  validateStep3AndProceed() {
    const nameInput = document.getElementById('student-name');
    const emailInput = document.getElementById('student-email');
    const topicInput = document.getElementById('booking-topic');
    const notesInput = document.getElementById('booking-notes');
    const prepCheckbox = document.getElementById('prep-exercise-checkbox');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const topicError = document.getElementById('topic-error');

    let isValid = true;

    // Reset lỗi cũ
    [nameInput, emailInput, topicInput].forEach(inp => {
      if (inp) inp.classList.remove('input-error');
    });
    if (nameError) nameError.textContent = '';
    if (emailError) emailError.textContent = '';
    if (topicError) topicError.textContent = '';

    // 1. Kiểm tra họ tên
    if (!nameInput || !nameInput.value.trim()) {
      if (nameError) nameError.textContent = 'Họ và tên sinh viên không được để trống.';
      if (nameInput) nameInput.classList.add('input-error');
      isValid = false;
    }

    // 2. Kiểm tra email trường (@student.edu.vn) bằng Regex
    const emailVal = emailInput ? emailInput.value.trim() : '';
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailVal) {
      if (emailError) emailError.textContent = 'Email sinh viên không được để trống.';
      if (emailInput) emailInput.classList.add('input-error');
      isValid = false;
    } else if (!emailPattern.test(emailVal) || !emailVal.endsWith('.edu.vn')) {
      if (emailError) emailError.textContent = 'Vui lòng nhập đúng định dạng email nhà trường (đuôi .edu.vn).';
      if (emailInput) emailInput.classList.add('input-error');
      isValid = false;
    }

    // 3. Kiểm tra chủ đề
    if (!topicInput || !topicInput.value.trim()) {
      if (topicError) topicError.textContent = 'Vui lòng nhập chủ đề bạn muốn tham vấn.';
      if (topicInput) topicInput.classList.add('input-error');
      isValid = false;
    }

    // Nếu hợp lệ, lưu vào đối tượng formData và chuyển sang Bước 4
    if (isValid) {
      this.formData = {
        studentName: nameInput.value.trim(),
        studentEmail: emailVal,
        topic: topicInput.value.trim(),
        notes: notesInput ? notesInput.value.trim() : '',
        prepExercise: prepCheckbox ? prepCheckbox.checked : false
      };
      this.goToStep(4);
    }
  },

  /**
   * 6. BƯỚC 4: RENDER BẢNG TÓM TẮT ĐĂNG KÝ
   */
  renderSummary() {
    const card = document.getElementById('summary-review-card');
    const data = this.getData();
    if (!card || !data) return;

    const service = data.services.find(s => s.id === this.selectedServiceId) || data.services[0];
    const counselor = data.counselors.find(c => c.id === this.selectedCounselorId) || data.counselors[0];

    const svcTitle = service ? service.name : 'Tư vấn cá nhân 1-1';
    const cName = counselor ? counselor.name : 'TS. Trần Thu Hà';
    const cOffice = counselor ? counselor.office : 'Phòng Y tế Tâm trí, Tầng 3 (Tòa nhà Hỗ trợ Sinh viên A1) · P.302';

    card.innerHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pb-3.5 border-b border-card-border/80">
        <div>
          <span class="text-ink/50 text-[11px] block">Dịch vụ đã chọn:</span>
          <span class="font-bold text-ink text-sm">${svcTitle}</span>
          <span class="text-[11px] text-sage block mt-0.5">${service ? service.duration : '45 phút'} · ${service ? service.format : 'Trực tiếp'}</span>
        </div>
        <div>
          <span class="text-ink/50 text-[11px] block">Chuyên gia phụ trách:</span>
          <span class="font-bold text-ink text-sm">${cName}</span>
          <span class="text-[11px] text-ink/70 block mt-0.5">${counselor ? counselor.title : 'Chuyên viên tâm lý'} · ${cOffice}</span>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pb-3.5 border-b border-card-border/80">
        <div>
          <span class="text-ink/50 text-[11px] block">Khung giờ hẹn:</span>
          <span class="font-bold text-sage-deep text-xs">${this.selectedSlotTime}</span>
        </div>
        <div>
          <span class="text-ink/50 text-[11px] block">Sinh viên đăng ký:</span>
          <span class="font-bold text-ink text-xs">${this.formData.studentName} (${this.formData.studentEmail})</span>
        </div>
      </div>

      <div>
        <span class="text-ink/50 text-[11px] block">Chủ đề cần chia sẻ:</span>
        <span class="font-semibold text-ink text-xs">${this.formData.topic}</span>
        ${this.formData.notes ? `<p class="text-[11px] text-ink/75 italic mt-1.5 bg-white p-2.5 rounded-lg border border-card-border/60">"${this.formData.notes}"</p>` : ''}
      </div>

      ${this.formData.prepExercise ? `
        <div class="pt-2 text-[11px] text-amber-900 font-semibold flex items-center gap-1.5">
          <span class="badge-ai">AI-2</span>
          <span>Đã đăng ký nhận audio bài tập thở 4-7-8 điều hòa lo âu trước buổi hẹn qua email.</span>
        </div>
      ` : ''}
    `;
  },

  /**
   * 7. GỬI YÊU CẦU & MỞ MODAL XÁC NHẬN
   */
  submitBooking() {
    const modal = document.getElementById('success-modal');
    const aptCodeEl = document.getElementById('modal-apt-code');
    const aptTimeEl = document.getElementById('modal-apt-time');
    const aptCounselorEl = document.getElementById('modal-apt-counselor');

    // Tạo mã lịch hẹn ngẫu nhiên
    const randomCode = 'APT-' + Math.floor(1000 + Math.random() * 9000);
    const data = this.getData();
    const counselor = data.counselors.find(c => c.id === this.selectedCounselorId);

    if (aptCodeEl) aptCodeEl.textContent = randomCode;
    if (aptTimeEl) aptTimeEl.textContent = this.selectedSlotTime;
    if (aptCounselorEl) aptCounselorEl.textContent = counselor ? counselor.name : 'TS. Trần Thu Hà';

    // Lưu vào LocalStorage để minh họa lưu trữ phía Client
    try {
      const history = JSON.parse(localStorage.getItem('campusmind_bookings') || '[]');
      history.unshift({
        code: randomCode,
        serviceId: this.selectedServiceId,
        counselorName: counselor ? counselor.name : 'TS. Trần Thu Hà',
        slotTime: this.selectedSlotTime,
        studentName: this.formData.studentName,
        studentEmail: this.formData.studentEmail,
        topic: this.formData.topic,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('campusmind_bookings', JSON.stringify(history));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }

    if (modal) {
      modal.classList.remove('hidden');
      if (window.lucide) lucide.createIcons();
    }
  },

  /**
   * 8. ĐẶT TIẾP / RESET FORM
   */
  resetBooking() {
    const modal = document.getElementById('success-modal');
    if (modal) modal.classList.add('hidden');
    this.goToStep(1);
  },

  /**
   * 9. BẬT/TẮT MENU ĐIỀU HƯỚNG TRÊN MOBILE
   */
  toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
      mobileMenu.classList.toggle('hidden');
    }
  },

  /**
   * 10. CHUYỂN ĐỔI CHẾ ĐỘ HIỂN THỊ THIẾT BỊ (Desktop / Tablet / Mobile)
   * Phục vụ demo Responsive ngay trên màn hình trình duyệt không cần mở F12
   */
  setDevice(mode) {
    const container = document.getElementById('app-container');
    const btnDesktop = document.getElementById('btn-dev-desktop');
    const btnTablet = document.getElementById('btn-dev-tablet');
    const btnMobile = document.getElementById('btn-dev-mobile');

    // Xóa toàn bộ class trạng thái cũ
    document.body.classList.remove('viewport-desktop', 'viewport-tablet', 'viewport-mobile');
    if (container) {
      container.classList.remove('viewport-tablet', 'viewport-mobile');
    }

    [btnDesktop, btnTablet, btnMobile].forEach(btn => {
      if (btn) {
        btn.classList.remove('bg-sage', 'text-white', 'shadow-sm');
        btn.classList.add('text-white/70');
      }
    });

    if (mode === 'mobile') {
      document.body.classList.add('viewport-mobile');
      if (container) container.classList.add('viewport-mobile');
      if (btnMobile) {
        btnMobile.classList.remove('text-white/70');
        btnMobile.classList.add('bg-sage', 'text-white', 'shadow-sm');
      }
    } else if (mode === 'tablet') {
      document.body.classList.add('viewport-tablet');
      if (container) container.classList.add('viewport-tablet');
      if (btnTablet) {
        btnTablet.classList.remove('text-white/70');
        btnTablet.classList.add('bg-sage', 'text-white', 'shadow-sm');
      }
    } else {
      document.body.classList.add('viewport-desktop');
      if (btnDesktop) {
        btnDesktop.classList.remove('text-white/70');
        btnDesktop.classList.add('bg-sage', 'text-white', 'shadow-sm');
      }
    }

    if (window.lucide) {
      lucide.createIcons();
    }
  }
};

// Đăng ký toàn cục
if (typeof window !== 'undefined') {
  window.BookingWizard = BookingWizard;
}

// Tự động khởi chạy khi tài liệu HTML đã sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
  BookingWizard.init();
});
