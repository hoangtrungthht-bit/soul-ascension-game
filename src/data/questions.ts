export type Question = {
  q: string
  options: string[]
  /** Chỉ số đáp án đúng trong mảng `options` (bắt đầu từ 0) */
  answer: number
}

/**
 * Danh sách câu hỏi mẫu dùng chung cho Linh Thạch trên map và Bí Kíp luyện công.
 * Sửa nội dung tại đây — phần thưởng (+10 Linh Thạch / +20 Tu Vi) do game xử lý.
 */
export const QUESTIONS: Question[] = [
  {
    q: "Trong Hệ Mặt Trời, hành tinh nào lớn nhất?",
    options: ["Sao Thổ", "Sao Mộc", "Sao Hỏa", "Trái Đất"],
    answer: 1,
  },
  {
    q: "Kết quả của phép tính 12 × 8 là bao nhiêu?",
    options: ["86", "94", "96", "108"],
    answer: 2,
  },
  {
    q: "Nước sôi ở nhiệt độ nào (áp suất thường)?",
    options: ["90°C", "100°C", "110°C", "80°C"],
    answer: 1,
  },
  {
    q: "Thủ đô của Việt Nam là thành phố nào?",
    options: ["TP. Hồ Chí Minh", "Đà Nẵng", "Hà Nội", "Huế"],
    answer: 2,
  },
  {
    q: "Nguyên tố hóa học có ký hiệu 'O' là gì?",
    options: ["Vàng", "Oxy", "Sắt", "Hydro"],
    answer: 1,
  },
  {
    q: "Một năm nhuận có bao nhiêu ngày?",
    options: ["365", "366", "364", "367"],
    answer: 1,
  },
  {
    q: "Đơn vị đo cường độ dòng điện là gì?",
    options: ["Vôn", "Oát", "Ampe", "Ôm"],
    answer: 2,
  },
  {
    q: "Số nguyên tố nhỏ nhất là số nào?",
    options: ["0", "1", "2", "3"],
    answer: 2,
  },
  {
    q: "Loài vật nào được mệnh danh là 'chúa tể rừng xanh'?",
    options: ["Hổ", "Sư tử", "Báo", "Gấu"],
    answer: 1,
  },
  {
    q: "Ánh sáng truyền trong chân không với tốc độ xấp xỉ?",
    options: ["300 km/s", "3.000 km/s", "300.000 km/s", "30.000 km/s"],
    answer: 2,
  },
  {
    q: "Hình tam giác có tổng ba góc trong bằng bao nhiêu độ?",
    options: ["90°", "180°", "270°", "360°"],
    answer: 1,
  },
  {
    q: "Cơ quan nào trong cơ thể người bơm máu đi nuôi toàn thân?",
    options: ["Gan", "Phổi", "Tim", "Thận"],
    answer: 2,
  },
  {
    q: "Sông nào dài nhất thế giới?",
    options: ["Sông Amazon", "Sông Nile", "Sông Mekong", "Sông Dương Tử"],
    answer: 1,
  },
  {
    q: "Trái Đất quay quanh Mặt Trời hết khoảng bao lâu?",
    options: ["24 giờ", "28 ngày", "365 ngày", "12 năm"],
    answer: 2,
  },
  {
    q: "Chất khí nào chiếm nhiều nhất trong không khí?",
    options: ["Oxy", "Nitơ", "Carbon dioxide", "Hydro"],
    answer: 1,
  },
  {
    q: "1 km bằng bao nhiêu mét?",
    options: ["100 m", "1.000 m", "10.000 m", "100.000 m"],
    answer: 1,
  },
  {
    q: "Hành tinh nào gần Mặt Trời nhất?",
    options: ["Kim Tinh", "Thủy Tinh", "Hỏa Tinh", "Trái Đất"],
    answer: 1,
  },
  {
    q: "Nước có công thức hóa học là gì?",
    options: ["CO₂", "NaCl", "H₂O", "O₂"],
    answer: 2,
  },
  {
    q: "Quốc gia nào có diện tích lớn nhất thế giới?",
    options: ["Trung Quốc", "Canada", "Hoa Kỳ", "Nga"],
    answer: 3,
  },
  {
    q: "Máy tính dùng hệ đếm nào làm nền tảng?",
    options: ["Hệ thập phân", "Hệ nhị phân", "Hệ bát phân", "Hệ La Mã"],
    answer: 1,
  },
]

export function randomQuestion(exclude?: Question): Question {
  if (QUESTIONS.length === 0) {
    throw new Error("Danh sách câu hỏi trống — hãy thêm câu hỏi vào src/data/questions.ts")
  }
  if (QUESTIONS.length === 1 || !exclude) {
    const only = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)]
    if (!only) throw new Error('Không có câu hỏi trắc nghiệm')
    return only
  }
  let q = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)]
  let guard = 0
  while (q === exclude && guard < 8) {
    q = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)]
    guard++
  }
  if (!q) throw new Error('Không có câu hỏi trắc nghiệm')
  return q
}
