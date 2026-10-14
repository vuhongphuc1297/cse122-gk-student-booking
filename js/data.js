/**
 * ==========================================================================
 * CampusMind — Student Wellbeing Hub (CSE122 · BTL-02)
 * File: js/data.js
 * Chức năng: Lưu trữ Mock Data chuẩn phục vụ trang Student Booking (Slide 07)
 * ==========================================================================
 */

const CAMPUS_DATA = {
  // Thông tin sinh viên đăng nhập phiên hiện tại
  currentUser: {
    id: 'sv-k64-001',
    name: 'Lê Ngọc An',
    email: 'ngocan@student.edu.vn',
    code: 'SV · K64',
    major: 'Khoa học Máy tính — Khoa CNTT',
    phone: '0987 654 321'
  },

  // Danh mục dịch vụ tham vấn tâm lý (Bước 1)
  services: [
    {
      id: 'srv-01',
      name: 'Tư vấn cá nhân 1-1',
      duration: '45 phút',
      format: 'Trực tiếp tại phòng tham vấn',
      description: 'Gặp gỡ riêng tư với chuyên viên tâm lý để chia sẻ về áp lực học tập, căng thẳng thi cử, xung đột mối quan hệ hoặc khó khăn cảm xúc.',
      isRecommended: true
    },
    {
      id: 'srv-02',
      name: 'Workshop quản trị cảm xúc',
      duration: '90 phút',
      format: 'Trực tiếp theo nhóm nhỏ (6-8 bạn)',
      description: 'Thực hành các kỹ thuật nhận diện và điều hòa lo âu, kỹ thuật thở 4-7-8 và xây dựng thói quen chăm sóc sức khỏe tinh thần.',
      isRecommended: false
    },
    {
      id: 'srv-03',
      name: 'Tư vấn định hướng học tập & Nghề nghiệp',
      duration: '45 phút',
      format: 'Trực tiếp hoặc Online',
      description: 'Lắng nghe và cùng chuyên gia gỡ rối cảm giác mất phương hướng, tìm lại động lực và cân bằng giữa việc học với cuộc sống.',
      isRecommended: false
    },
    {
      id: 'srv-04',
      name: 'Hỗ trợ giấc ngủ & Phục hồi năng lượng',
      duration: '30 phút',
      format: 'Trực tiếp tại phòng thư giãn',
      description: 'Đánh giá mức độ kiệt sức (burnout), hướng dẫn bài tập thư giãn cơ bắp và thiết lập chu kỳ ngủ khoa học trong mùa thi.',
      isRecommended: false
    }
  ],

  // Danh sách chuyên viên tâm lý và khung giờ trống trong tuần (Bước 2)
  counselors: [
    {
      id: 'counselor-01',
      name: 'TS. Trần Thu Hà',
      title: 'Tiến sĩ Tâm lý lâm sàng',
      office: 'Phòng Y tế Tâm trí, Tầng 3 (Tòa nhà Hỗ trợ Sinh viên A1) · P.302',
      rating: 4.9,
      schedule: {
        week: 'Tuần 24 – 29 Tháng 3',
        slots: [
          { day: 'Thứ Năm, 27/03/2025', time: '14:00 – 14:45', status: 'available', room: 'Phòng tư vấn 302' },
          { day: 'Thứ Năm, 27/03/2025', time: '15:00 – 15:45', status: 'available', room: 'Phòng tư vấn 302' },
          { day: 'Thứ Sáu, 28/03/2025', time: '08:30 – 09:15', status: 'available', room: 'Phòng tư vấn 302' },
          { day: 'Thứ Sáu, 28/03/2025', time: '10:30 – 11:15', status: 'booked', room: 'Phòng tư vấn 302' }
        ]
      }
    },
    {
      id: 'counselor-02',
      name: 'ThS. Trần Quang Duy',
      title: 'Thạc sĩ Tâm lý Học đường',
      office: 'Phòng H-206, Nhà A1',
      rating: 4.8,
      schedule: {
        week: 'Tuần này',
        slots: [
          { day: 'Thứ Hai (19/10)', time: '14:00 – 14:45', status: 'available' },
          { day: 'Thứ Ba (20/10)',  time: '08:30 – 09:15', status: 'available' },
          { day: 'Thứ Tư (21/10)',  time: '13:30 – 14:15', status: 'available' },
          { day: 'Thứ Sáu (23/10)', time: '09:00 – 09:45', status: 'available' }
        ]
      }
    },
    {
      id: 'counselor-03',
      name: 'CN. Phạm Thu Thảo',
      title: 'Chuyên viên Hỗ trợ Sinh viên',
      office: 'Phòng Công tác SV — Tầng 1',
      rating: 4.7,
      schedule: {
        week: 'Tuần này',
        slots: [
          { day: 'Thứ Ba (20/10)',  time: '09:30 – 10:15', status: 'available' },
          { day: 'Thứ Năm (22/10)', time: '15:00 – 15:45', status: 'available' },
          { day: 'Thứ Bảy (24/10)', time: '08:30 – 09:15', status: 'available' }
        ]
      }
    }
  ]
};

// Đưa ra window để truy cập toàn cục
if (typeof window !== 'undefined') {
  window.CAMPUS_DATA = CAMPUS_DATA;
}
