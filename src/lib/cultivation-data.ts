import { randomQuestion as pickQuestion, type Question } from "@/data/questions"

export type { Question }

export type Realm = {
  name: string
  pinyin: string
  /** Tu Vi tối thiểu để đạt cảnh giới / tầng này */
  threshold: number
  /** Nhóm tiên cảnh (0–3) dùng cho theme môi trường */
  group: number
}

/**
 * 9 cảnh giới chính. Cảnh giới đổi tên theo mốc Tu Vi.
 * Tu Vi trên HUD = hiện tại / ngưỡng cảnh giới kế (vd. 0/550).
 */
// group = index theme môi trường trong REALM_THEMES (mỗi cảnh giới một theme riêng)
export const REALMS: Realm[] = [
  { name: "Luyện Khí", pinyin: "Qi Refining", threshold: 0, group: 0 },
  { name: "Trúc Cơ", pinyin: "Foundation", threshold: 550, group: 1 },
  { name: "Kim Đan", pinyin: "Golden Core", threshold: 1600, group: 2 },
  { name: "Nguyên Anh", pinyin: "Nascent Soul", threshold: 3400, group: 3 },
  { name: "Hóa Thần", pinyin: "Spirit Severing", threshold: 5100, group: 4 },
  { name: "Luyện Hư", pinyin: "Void Refining", threshold: 6100, group: 5 },
  { name: "Hợp Thể", pinyin: "Body Integration", threshold: 7300, group: 6 },
  { name: "Đại Thừa", pinyin: "Great Vehicle", threshold: 8700, group: 7 },
  { name: "Độ Kiếp", pinyin: "Tribulation", threshold: 10300, group: 8 },
]

export const LINH_THACH_REWARD = 10
export const TU_VI_REWARD = 20
export const STONE_RESPAWN_MS = 12_000

export function getRealmIndex(tuVi: number): number {
  let idx = 0
  for (let i = 0; i < REALMS.length; i++) {
    const r = REALMS[i]
    if (r && tuVi >= r.threshold) idx = i
  }
  return idx
}

export function getRealmThemeGroup(realmIdx: number): number {
  const clamped = Math.max(0, Math.min(realmIdx, REALMS.length - 1))
  return REALMS[clamped]?.group ?? 0
}

export function getTuViCap(tuVi: number): number {
  const idx = getRealmIndex(tuVi)
  const next = REALMS[idx + 1]
  return next ? next.threshold : tuVi
}

export function randomQuestion(exclude?: Question): Question {
  return pickQuestion(exclude)
}
