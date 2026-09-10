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
 * Cảnh giới đổi tên theo mốc Tu Vi.
 * Tu Vi trên HUD = hiện tại / ngưỡng tầng kế (vd. 0/100).
 */
export const REALMS: Realm[] = [
  { name: "Luyện Khí Tầng 1", pinyin: "Qi Refining 1", threshold: 0, group: 0 },
  { name: "Luyện Khí Tầng 2", pinyin: "Qi Refining 2", threshold: 100, group: 0 },
  { name: "Luyện Khí Tầng 3", pinyin: "Qi Refining 3", threshold: 300, group: 0 },
  { name: "Trúc Cơ Tầng 1", pinyin: "Foundation 1", threshold: 550, group: 0 },
  { name: "Trúc Cơ Tầng 2", pinyin: "Foundation 2", threshold: 850, group: 0 },
  { name: "Trúc Cơ Tầng 3", pinyin: "Foundation 3", threshold: 1200, group: 1 },
  { name: "Kim Đan Tầng 1", pinyin: "Golden Core 1", threshold: 1600, group: 1 },
  { name: "Kim Đan Tầng 2", pinyin: "Golden Core 2", threshold: 2100, group: 1 },
  { name: "Kim Đan Tầng 3", pinyin: "Golden Core 3", threshold: 2700, group: 1 },
  { name: "Nguyên Anh Tầng 1", pinyin: "Nascent Soul 1", threshold: 3400, group: 1 },
  { name: "Nguyên Anh Tầng 2", pinyin: "Nascent Soul 2", threshold: 4200, group: 2 },
  { name: "Hóa Thần", pinyin: "Spirit Severing", threshold: 5100, group: 2 },
  { name: "Luyện Hư", pinyin: "Void Refining", threshold: 6100, group: 2 },
  { name: "Hợp Thể", pinyin: "Body Integration", threshold: 7300, group: 2 },
  { name: "Đại Thừa", pinyin: "Great Vehicle", threshold: 8700, group: 3 },
  { name: "Độ Kiếp", pinyin: "Tribulation", threshold: 10300, group: 3 },
  { name: "Chân Tiên", pinyin: "True Immortal", threshold: 12200, group: 3 },
]

export const LINH_THACH_REWARD = 10
export const TU_VI_REWARD = 20
export const STONE_RESPAWN_MS = 12_000

export function getRealmIndex(tuVi: number): number {
  let idx = 0
  for (let i = 0; i < REALMS.length; i++) {
    const realm = REALMS[i]
    if (realm && tuVi >= realm.threshold) idx = i
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
