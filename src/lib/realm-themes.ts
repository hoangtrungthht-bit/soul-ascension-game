// Theme môi trường & vật phẩm — MỖI cảnh giới một môi trường riêng biệt (index 0–8 khớp REALMS).
// 0 Luyện Khí | 1 Trúc Cơ | 2 Kim Đan | 3 Nguyên Anh | 4 Hóa Thần
// 5 Luyện Hư | 6 Hợp Thể | 7 Đại Thừa | 8 Độ Kiếp
export type RealmTheme = {
  name: string
  // lớp phủ màu lên tilemap nền
  groundTint: string
  // tô màu lại sprite cây / linh thạch / bí kíp (source-atop)
  treeTint: string | null
  stoneTint: string | null
  bookTint: string | null
  // màu hào quang vật phẩm "r,g,b"
  stoneGlow: string
  bookGlow: string
  herbColor: string
  moteColor: string
  // hiệu ứng riêng
  stonePulse: boolean // nhịp pulse mạnh (Trung Phẩm)
  stoneParticles: boolean // tia particle (Thượng Phẩm)
  stoneRainbow: boolean // gradient rainbow xoay hue (Tiên Thạch)
  bookSwirl: boolean // linh khí xoay quanh sách
  bookRainbowAura: boolean // aura ngũ sắc (Ngọc Giản)
  formationRing: boolean // trận pháp quay dưới chân vật phẩm
  mist: boolean // mây mờ trôi
  leaves: "none" | "goldred" | "petal" // lá rơi
  lightning: boolean // tia linh khí sấm sét
  stoneLabel: string
  bookLabel: string
}

export const REALM_THEMES: RealmTheme[] = [
  {
    // 0. Luyện Khí — đất xám, khô cằn, tiêu điều
    name: "Hoang Nguyên Khô Cằn",
    groundTint: "rgba(118, 110, 96, 0.38)",
    treeTint: "rgba(148, 138, 118, 0.55)",
    stoneTint: null,
    bookTint: null,
    stoneGlow: "150, 190, 165",
    bookGlow: "230, 205, 150",
    herbColor: "150, 155, 120",
    moteColor: "190, 195, 175",
    stonePulse: false,
    stoneParticles: false,
    stoneRainbow: false,
    bookSwirl: false,
    bookRainbowAura: false,
    formationRing: false,
    mist: false,
    leaves: "none",
    lightning: false,
    stoneLabel: "Linh Thạch Hạ Phẩm",
    bookLabel: "Bí Kíp",
  },
  {
    // 1. Trúc Cơ — xanh nhạt thô sơ, rừng rậm hoang vu
    name: "Man Hoang Rừng Rậm",
    groundTint: "rgba(78, 118, 62, 0.22)",
    treeTint: "rgba(110, 165, 85, 0.38)",
    stoneTint: null,
    bookTint: null,
    stoneGlow: "140, 220, 150",
    bookGlow: "245, 215, 130",
    herbColor: "125, 200, 120",
    moteColor: "180, 235, 175",
    stonePulse: false,
    stoneParticles: false,
    stoneRainbow: false,
    bookSwirl: false,
    bookRainbowAura: false,
    formationRing: false,
    mist: false,
    leaves: "none",
    lightning: false,
    stoneLabel: "Linh Thạch Hạ Phẩm",
    bookLabel: "Bí Kíp",
  },
  {
    // 2. Kim Đan — hổ phách / vàng đất, linh khí loãng bắt đầu xuất hiện
    name: "Hổ Phách Linh Địa",
    groundTint: "rgba(196, 152, 70, 0.30)",
    treeTint: "rgba(196, 155, 62, 0.42)",
    stoneTint: "rgba(255, 200, 90, 0.35)",
    bookTint: null,
    stoneGlow: "255, 205, 105",
    bookGlow: "255, 215, 120",
    herbColor: "215, 190, 110",
    moteColor: "255, 225, 150",
    stonePulse: false,
    stoneParticles: false,
    stoneRainbow: false,
    bookSwirl: false,
    bookRainbowAura: false,
    formationRing: false,
    mist: false,
    leaves: "goldred",
    lightning: false,
    stoneLabel: "Linh Thạch Trung Phẩm",
    bookLabel: "Bí Kíp",
  },
  {
    // 3. Nguyên Anh — xanh lá đậm, linh khí tụ hội, cây cối xanh tốt
    name: "Linh Khí Tụ Hội",
    groundTint: "rgba(22, 95, 48, 0.32)",
    treeTint: "rgba(30, 130, 62, 0.40)",
    stoneTint: "rgba(90, 220, 140, 0.35)",
    bookTint: null,
    stoneGlow: "110, 240, 165",
    bookGlow: "255, 214, 120",
    herbColor: "120, 235, 150",
    moteColor: "170, 255, 200",
    stonePulse: true,
    stoneParticles: false,
    stoneRainbow: false,
    bookSwirl: false,
    bookRainbowAura: false,
    formationRing: false,
    mist: false,
    leaves: "none",
    lightning: false,
    stoneLabel: "Linh Thạch Trung Phẩm",
    bookLabel: "Lụa Thư",
  },
  {
    // 4. Hóa Thần — xanh ngọc bích, cảnh quan linh sơn
    name: "Bích Ngọc Linh Sơn",
    groundTint: "rgba(42, 150, 128, 0.36)",
    treeTint: "rgba(78, 185, 152, 0.45)",
    stoneTint: "rgba(110, 230, 200, 0.45)",
    bookTint: "rgba(200, 230, 190, 0.30)",
    stoneGlow: "130, 245, 215",
    bookGlow: "255, 220, 130",
    herbColor: "150, 240, 200",
    moteColor: "195, 255, 235",
    stonePulse: true,
    stoneParticles: false,
    stoneRainbow: false,
    bookSwirl: true,
    bookRainbowAura: false,
    formationRing: false,
    mist: true,
    leaves: "none",
    lightning: false,
    stoneLabel: "Linh Thạch Thượng Phẩm",
    bookLabel: "Lụa Thư",
  },
  {
    // 5. Luyện Hư — xanh dương sẫm, hư không huyền ảo
    name: "Hư Không Huyền Ảo",
    groundTint: "rgba(26, 48, 112, 0.52)",
    treeTint: "rgba(96, 142, 225, 0.55)",
    stoneTint: "rgba(125, 165, 255, 0.55)",
    bookTint: "rgba(150, 180, 255, 0.45)",
    stoneGlow: "150, 180, 255",
    bookGlow: "200, 215, 255",
    herbColor: "150, 175, 240",
    moteColor: "190, 205, 255",
    stonePulse: true,
    stoneParticles: false,
    stoneRainbow: false,
    bookSwirl: true,
    bookRainbowAura: false,
    formationRing: false,
    mist: true,
    leaves: "none",
    lightning: false,
    stoneLabel: "Linh Thạch Thượng Phẩm",
    bookLabel: "Lụa Thư",
  },
  {
    // 6. Hợp Thể — tím huyền bí, mây mù bao phủ, thiên địa giao hòa
    name: "Tử Vân Thiên Địa",
    groundTint: "rgba(86, 46, 132, 0.52)",
    treeTint: "rgba(152, 92, 205, 0.58)",
    stoneTint: "rgba(185, 95, 255, 0.60)",
    bookTint: "rgba(215, 165, 255, 0.50)",
    stoneGlow: "205, 140, 255",
    bookGlow: "255, 220, 140",
    herbColor: "195, 155, 245",
    moteColor: "225, 195, 255",
    stonePulse: true,
    stoneParticles: true,
    stoneRainbow: false,
    bookSwirl: true,
    bookRainbowAura: false,
    formationRing: false,
    mist: true,
    leaves: "none",
    lightning: false,
    stoneLabel: "Linh Thạch Thượng Phẩm",
    bookLabel: "Ngọc Giản",
  },
  {
    // 7. Đại Thừa — vàng kim rực rỡ, chất tiên giới
    name: "Kim Quang Tiên Giới",
    groundTint: "rgba(205, 162, 58, 0.34)",
    treeTint: "rgba(232, 192, 82, 0.48)",
    stoneTint: "rgba(255, 218, 105, 0.55)",
    bookTint: "rgba(255, 210, 90, 0.55)",
    stoneGlow: "255, 228, 130",
    bookGlow: "255, 225, 130",
    herbColor: "240, 215, 130",
    moteColor: "255, 235, 170",
    stonePulse: true,
    stoneParticles: true,
    stoneRainbow: false,
    bookSwirl: true,
    bookRainbowAura: true,
    formationRing: true,
    mist: false,
    leaves: "petal",
    lightning: false,
    stoneLabel: "Tiên Thạch",
    bookLabel: "Ngọc Giản",
  },
  {
    // 8. Độ Kiếp — trắng sáng + lôi điện/sấm sét uy nghiêm
    name: "Cửu Thiên Lôi Kiếp",
    groundTint: "rgba(228, 238, 252, 0.50)",
    treeTint: "rgba(222, 232, 255, 0.50)",
    stoneTint: "rgba(255, 242, 205, 0.50)",
    bookTint: "rgba(255, 212, 90, 0.60)",
    stoneGlow: "255, 255, 255",
    bookGlow: "255, 225, 130",
    herbColor: "230, 240, 255",
    moteColor: "245, 250, 255",
    stonePulse: true,
    stoneParticles: true,
    stoneRainbow: true,
    bookSwirl: true,
    bookRainbowAura: true,
    formationRing: true,
    mist: true,
    leaves: "petal",
    lightning: true,
    stoneLabel: "Tiên Thạch",
    bookLabel: "Tiên Tráp",
  },
]

export function getRealmGroup(realmIdx: number): number {
  // Mỗi cảnh giới có theme riêng: trả về chính index (clamp 0–8)
  return Math.max(0, Math.min(realmIdx, REALM_THEMES.length - 1))
}

// Hệ số nhân Linh Khí thưởng theo cảnh giới (cấp cao thưởng nhiều hơn)
export function rewardMultiplier(realmIdx: number): number {
  return 1 + Math.floor(getRealmGroup(realmIdx) / 2)
}
