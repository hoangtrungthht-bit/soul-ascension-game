import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tu Tiên Ký - Game RPG Tu Luyện 2D" },
      {
        name: "description",
        content:
          "Game tu tiên 2D top-down: di chuyển bằng joystick, thu thập Nguyên Thạch và Bí Kíp, trả lời trắc nghiệm để tăng Tu Vi, đột phá qua 10 cảnh giới từ Phàm Nhân đến Phi Thăng Thành Tiên.",
      },
      { property: "og:title", content: "Tu Tiên Ký - Game RPG Tu Luyện 2D" },
      {
        property: "og:description",
        content:
          "Thu thập Nguyên Thạch, giải trắc nghiệm, tăng Tu Vi và đột phá qua 10 cảnh giới tu tiên.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Game,
});

type Item = {
  id: number;
  x: number;
  y: number;
  kind: "stone" | "book";
  taken: boolean;
};

type Q = { q: string; a: string[]; c: number };

const QUESTIONS: Q[] = [
  { q: "Trong truyện tu tiên, 'Kim Đan' thường là cảnh giới sau cảnh giới nào?", a: ["Trúc Cơ", "Đại La", "Hóa Thần", "Luyện Hư"], c: 0 },
  { q: "Ngũ hành trong đạo gia gồm bao nhiêu yếu tố?", a: ["3", "4", "5", "7"], c: 2 },
  { q: "'Đan điền' theo quan niệm tu luyện nằm ở đâu?", a: ["Đỉnh đầu", "Dưới rốn", "Lòng bàn tay", "Gót chân"], c: 1 },
  { q: "Linh thạch trong tu tiên dùng để làm gì?", a: ["Nấu ăn", "Trao đổi và tu luyện", "Xây nhà", "Dệt vải"], c: 1 },
  { q: "Thái Cực đồ gồm hai khí nào?", a: ["Âm và Dương", "Nóng và Lạnh", "Cao và Thấp", "Sáng và Tối"], c: 0 },
  { q: "'Bí kíp' trong tu luyện nghĩa là gì?", a: ["Bản đồ", "Sách pháp quyết", "Vũ khí", "Thuốc độc"], c: 1 },
  { q: "Ngũ hành: Mộc sinh ra hành nào?", a: ["Kim", "Thủy", "Hỏa", "Thổ"], c: 2 },
  { q: "Cảnh giới nào thường được coi là bước đầu nhập môn?", a: ["Luyện Khí", "Đại Thừa", "Phi Thăng", "Nguyên Anh"], c: 0 },
  { q: "'Bí Cảnh' thường là nơi như thế nào?", a: ["Chợ làng", "Không gian ẩn giấu nhiều cơ duyên", "Nhà bếp", "Ruộng lúa"], c: 1 },
  { q: "Vật phẩm nào giúp hồi phục linh lực nhanh?", a: ["Đan dược", "Gạch đá", "Củi khô", "Muối"], c: 0 },
  { q: "Ngũ hành: Thủy khắc hành nào?", a: ["Hỏa", "Mộc", "Thổ", "Kim"], c: 0 },
  { q: "Tu luyện chú trọng nhất điều gì?", a: ["Tâm tính và kiên trì", "Tiền bạc", "Ngủ nhiều", "Ăn nhiều"], c: 0 },
];

const W = 1600;
const H = 1200;
const TUVI_MAX = 5;
const MAX_LEVEL = 9;

type Pal = {
  name: string;
  ground: string;
  ground2: string;
  path: string;
  rock: string;
  tree: string;
  treeTop: string;
  sky: string;
  robe: string;
  sash: string;
};

const REALMS: Pal[] = [
  { name: "Phàm Nhân (Tân Thủ Thôn)", ground: "#3f6b45", ground2: "#356038", path: "#b49a6a", rock: "#7d8794", tree: "#245c34", treeTop: "#3c8c4d", sky: "#bfe3c4", robe: "#eef3ff", sash: "#5b7cd8" },
  { name: "Luyện Khí Sơ Kỳ", ground: "#4a7a52", ground2: "#3f6b45", path: "#c4a87a", rock: "#888e94", tree: "#2a6640", treeTop: "#4a9c5a", sky: "#c8ecd0", robe: "#eaf3ff", sash: "#5fa0d8" },
  { name: "Luyện Khí Viên Mãn", ground: "#2f6b6b", ground2: "#265c5c", path: "#8fb0a0", rock: "#6a8080", tree: "#1a5050", treeTop: "#3a8888", sky: "#a0e0d8", robe: "#e0f5ff", sash: "#3fa0a8" },
  { name: "Trúc Cơ", ground: "#2a4a6b", ground2: "#223e5c", path: "#7a9ac4", rock: "#5a6a8a", tree: "#1a3a5a", treeTop: "#3a6a9c", sky: "#9cc8e8", robe: "#e8eeff", sash: "#4a6ad8" },
  { name: "Kim Đan", ground: "#6b5a2a", ground2: "#5c4a22", path: "#d4b46a", rock: "#8a7a5a", tree: "#5a4a1a", treeTop: "#9c8030", sky: "#e8d8a0", robe: "#fff4e0", sash: "#d8a84a" },
  { name: "Nguyên Anh", ground: "#4a2a6b", ground2: "#3e225c", path: "#9a7ac4", rock: "#6a5a8a", tree: "#3a1a5a", treeTop: "#7b5ad1", sky: "#d0b8e8", robe: "#ece0ff", sash: "#9a6ad8" },
  { name: "Hóa Thần", ground: "#5a2a5c", ground2: "#4a2250", path: "#b47ad4", rock: "#7a5a8a", tree: "#4a1a5a", treeTop: "#9b5ad1", sky: "#e0b8e8", robe: "#f5e0ff", sash: "#b85ad8" },
  { name: "Hợp Thể", ground: "#6b2a4a", ground2: "#5c2240", path: "#d47a9a", rock: "#8a5a7a", tree: "#5a1a3a", treeTop: "#d15a8a", sky: "#f0c0d0", robe: "#ffe0ee", sash: "#d84a7a" },
  { name: "Đại Thừa", ground: "#4a5a6b", ground2: "#3e4e5c", path: "#c4ccd4", rock: "#9aa0aa", tree: "#3a4a5a", treeTop: "#8a9aaa", sky: "#e0e8f0", robe: "#f0f5ff", sash: "#9aa0c8" },
  { name: "Độ Kiếp Thành Tiên", ground: "#6b6a3a", ground2: "#5c5a30", path: "#ffd870", rock: "#b0a86a", tree: "#5a5a2a", treeTop: "#d4c860", sky: "#fff4c8", robe: "#fffbe6", sash: "#ffce4a" },
];

function rnd(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function makeScenery(level: number) {
  const r = rnd(991 + level * 137);
  const trees: { x: number; y: number; s: number }[] = [];
  const rocks: { x: number; y: number; s: number }[] = [];
  for (let i = 0; i < 70; i++) trees.push({ x: r() * W, y: r() * H, s: 0.7 + r() * 0.7 });
  for (let i = 0; i < 40; i++) rocks.push({ x: r() * W, y: r() * H, s: 0.6 + r() * 0.9 });
  return { trees, rocks };
}

function makeItems(level: number): Item[] {
  const r = rnd(77 + level * 53);
  const out: Item[] = [];
  for (let i = 0; i < 14; i++) {
    out.push({
      id: i,
      x: 120 + r() * (W - 240),
      y: 120 + r() * (H - 240),
      kind: r() > 0.5 ? "stone" : "book",
      taken: false,
    });
  }
  return out;
}

function Game() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [level, setLevel] = useState(0);
  const [tuvi, setTuvi] = useState(0);
  const [question, setQuestion] = useState<{ q: Q; itemId: number } | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [levelUp, setLevelUp] = useState(false);
  const [ascended, setAscended] = useState(false);

  const stateRef = useRef({
    px: W / 2,
    py: H / 2,
    dir: { x: 0, y: 0 },
    items: makeItems(0),
    scenery: makeScenery(0),
    glow: 0,
    paused: false,
    t: 0,
  });

  stateRef.current.paused = question !== null || levelUp || ascended;

  const openQuestion = useCallback((itemId: number) => {
    const q = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)]!;
    setQuestion({ q, itemId });
  }, []);

  // main loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    const keys = new Set<string>();

    const onKeyDown = (e: KeyboardEvent) => keys.add(e.key.toLowerCase());
    const onKeyUp = (e: KeyboardEvent) => keys.delete(e.key.toLowerCase());
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const s = stateRef.current;
      const pal = REALMS[level]!;
      s.t += 1;

      let dx = s.dir.x;
      let dy = s.dir.y;
      if (keys.has("arrowleft") || keys.has("a")) dx -= 1;
      if (keys.has("arrowright") || keys.has("d")) dx += 1;
      if (keys.has("arrowup") || keys.has("w")) dy -= 1;
      if (keys.has("arrowdown") || keys.has("s")) dy += 1;
      const len = Math.hypot(dx, dy) || 1;
      if (!s.paused && (dx || dy)) {
        const sp = 3.4;
        s.px = Math.max(30, Math.min(W - 30, s.px + (dx / len) * sp));
        s.py = Math.max(30, Math.min(H - 30, s.py + (dy / len) * sp));
      }
      if (s.glow > 0) s.glow -= 1;

      if (!s.paused) {
        for (const it of s.items) {
          if (it.taken) continue;
          if (Math.hypot(it.x - s.px, it.y - s.py) < 38) {
            openQuestion(it.id);
            break;
          }
        }
      }

      const vw = canvas.clientWidth;
      const vh = canvas.clientHeight;
      const camX = Math.max(0, Math.min(W - vw, s.px - vw / 2));
      const camY = Math.max(0, Math.min(H - vh, s.py - vh / 2));

      ctx.fillStyle = pal.sky;
      ctx.fillRect(0, 0, vw, vh);
      ctx.save();
      ctx.translate(-camX, -camY);

      // ground tiles
      const T = 80;
      for (let x = 0; x < W; x += T) {
        for (let y = 0; y < H; y += T) {
          ctx.fillStyle = ((x / T + y / T) % 2 === 0 ? pal.ground : pal.ground2);
          ctx.fillRect(x, y, T, T);
        }
      }
      // paths
      ctx.fillStyle = pal.path;
      ctx.globalAlpha = 0.85;
      ctx.fillRect(0, H / 2 - 40, W, 80);
      ctx.fillRect(W / 2 - 40, 0, 80, H);
      ctx.globalAlpha = 1;

      // rocks
      for (const r of s.scenery.rocks) {
        ctx.fillStyle = pal.rock;
        ctx.beginPath();
        ctx.ellipse(r.x, r.y, 22 * r.s, 15 * r.s, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.15)";
        ctx.beginPath();
        ctx.ellipse(r.x - 5 * r.s, r.y - 4 * r.s, 9 * r.s, 5 * r.s, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // trees
      for (const t of s.scenery.trees) {
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.beginPath();
        ctx.ellipse(t.x, t.y + 26 * t.s, 20 * t.s, 7 * t.s, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = pal.tree;
        ctx.fillRect(t.x - 5 * t.s, t.y - 5 * t.s, 10 * t.s, 32 * t.s);
        ctx.fillStyle = pal.treeTop;
        ctx.beginPath();
        ctx.arc(t.x, t.y - 18 * t.s, 24 * t.s, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.12)";
        ctx.beginPath();
        ctx.arc(t.x - 8 * t.s, t.y - 26 * t.s, 9 * t.s, 0, Math.PI * 2);
        ctx.fill();
      }

      // items
      const pulse = 0.6 + 0.4 * Math.sin(s.t / 18);
      for (const it of s.items) {
        if (it.taken) continue;
        const color = it.kind === "stone" ? "#7ef0ff" : "#ffd873";
        const g = ctx.createRadialGradient(it.x, it.y, 2, it.x, it.y, 46 * pulse);
        g.addColorStop(0, color);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.globalAlpha = 0.55;
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(it.x, it.y, 46 * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.fillStyle = color;
        if (it.kind === "stone") {
          ctx.beginPath();
          ctx.moveTo(it.x, it.y - 14);
          ctx.lineTo(it.x + 11, it.y);
          ctx.lineTo(it.x, it.y + 14);
          ctx.lineTo(it.x - 11, it.y);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.fillRect(it.x - 12, it.y - 9, 24, 18);
          ctx.fillStyle = "rgba(120,60,20,0.7)";
          ctx.fillRect(it.x - 1, it.y - 9, 2, 18);
        }
      }

      // player glow
      if (s.glow > 0) {
        const g = ctx.createRadialGradient(s.px, s.py, 4, s.px, s.py, 70);
        g.addColorStop(0, "rgba(255,255,220,0.9)");
        g.addColorStop(1, "rgba(255,255,220,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(s.px, s.py, 70, 0, Math.PI * 2);
        ctx.fill();
      }

      // player (human figure)
      const bob = Math.sin(s.t / 8) * (dx || dy ? 2 : 0);
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.beginPath();
      ctx.ellipse(s.px, s.py + 22, 14, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      // robe
      ctx.fillStyle = pal.robe;
      ctx.beginPath();
      ctx.moveTo(s.px - 13, s.py + 20 + bob);
      ctx.lineTo(s.px + 13, s.py + 20 + bob);
      ctx.lineTo(s.px + 8, s.py - 6 + bob);
      ctx.lineTo(s.px - 8, s.py - 6 + bob);
      ctx.closePath();
      ctx.fill();
      // sash
      ctx.fillStyle = pal.sash;
      ctx.fillRect(s.px - 10, s.py + 4 + bob, 20, 5);
      // head
      ctx.fillStyle = "#f6d7b0";
      ctx.beginPath();
      ctx.arc(s.px, s.py - 14 + bob, 8, 0, Math.PI * 2);
      ctx.fill();
      // hair bun
      ctx.fillStyle = "#2b2b3a";
      ctx.beginPath();
      ctx.arc(s.px, s.py - 20 + bob, 6, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(s.px, s.py - 25 + bob, 3.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [level, openQuestion]);

  const answer = (idx: number) => {
    if (!question) return;
    const correct = idx === question.q.c;
    const s = stateRef.current;
    if (correct) {
      const it = s.items.find((i) => i.id === question.itemId);
      if (it) it.taken = true;
      s.glow = 60;
      setFeedback("Chính xác! +1 Tu Vi");
      setTuvi((v) => {
        const nv = v + 1;
        if (nv >= TUVI_MAX) {
          if (level >= MAX_LEVEL) {
            setAscended(true);
          } else {
            setLevelUp(true);
          }
        }
        return Math.min(TUVI_MAX, nv);
      });
    } else {
      setFeedback(`Sai rồi! -1 Tu Vi. Đáp án: ${question.q.a[question.q.c]!}`);
      setTuvi((v) => Math.max(0, v - 1));
      const it = s.items.find((i) => i.id === question.itemId);
      if (it) {
        // đẩy nhân vật ra xa để không mở lại ngay
        const ang = Math.atan2(s.py - it.y, s.px - it.x);
        s.px += Math.cos(ang) * 60;
        s.py += Math.sin(ang) * 60;
      }
    }
    setQuestion(null);
    setTimeout(() => setFeedback(null), 1800);
  };

  const ascend = () => {
    const next = level + 1;
    const s = stateRef.current;
    s.items = makeItems(next);
    s.scenery = makeScenery(next);
    s.px = W / 2;
    s.py = H / 2;
    s.glow = 90;
    setLevel(next);
    setTuvi(0);
    setLevelUp(false);
  };

  const restart = () => {
    const s = stateRef.current;
    s.items = makeItems(0);
    s.scenery = makeScenery(0);
    s.px = W / 2;
    s.py = H / 2;
    s.glow = 90;
    setLevel(0);
    setTuvi(0);
    setAscended(false);
  };

  // joystick
  const padRef = useRef<HTMLDivElement | null>(null);
  const [knob, setKnob] = useState({ x: 0, y: 0 });

  const handlePointer = (e: React.PointerEvent) => {
    const pad = padRef.current;
    if (!pad) return;
    const r = pad.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    let dx = e.clientX - cx;
    let dy = e.clientY - cy;
    const max = r.width / 2 - 22;
    const d = Math.hypot(dx, dy);
    if (d > max) {
      dx = (dx / d) * max;
      dy = (dy / d) * max;
    }
    setKnob({ x: dx, y: dy });
    stateRef.current.dir = { x: dx / max, y: dy / max };
  };

  const endPointer = () => {
    setKnob({ x: 0, y: 0 });
    stateRef.current.dir = { x: 0, y: 0 };
  };

  const pal = REALMS[level]!;

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-background select-none">
      <h1 className="sr-only">Tu Tiên Ký - Game tu luyện 2D top-down</h1>
      <canvas ref={canvasRef} className="block h-full w-full touch-none" />

      {/* HUD */}
      <div className="pointer-events-none absolute left-4 top-4 rounded-xl bg-black/55 px-4 py-3 text-sm text-white backdrop-blur">
        <div className="font-semibold tracking-wide">
          Cấp {level}: <span className="text-amber-300">{pal.name}</span>
        </div>
        <div className="mt-1">
          Tu Vi: <span className="text-cyan-300">{tuvi}</span> / {TUVI_MAX}
        </div>
        <div className="mt-2 h-2 w-44 overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-amber-300 transition-all"
            style={{ width: `${(tuvi / TUVI_MAX) * 100}%` }}
          />
        </div>
        <div className="mt-2 text-xs text-white/70">
          Chạm Nguyên Thạch (xanh) hoặc Bí Kíp (vàng) để trả lời trắc nghiệm.
        </div>
      </div>

      {/* Level progress dots */}
      <div className="pointer-events-none absolute right-4 top-4 flex flex-col items-end gap-1 rounded-xl bg-black/45 px-3 py-2 text-[10px] text-white/80 backdrop-blur">
        <div className="mb-1 tracking-widest uppercase">Cảnh Giới</div>
        {REALMS.map((r, i) => (
          <div
            key={i}
            className={`flex items-center gap-1 ${i === level ? "font-bold text-amber-300" : i < level ? "text-cyan-300/70" : "text-white/35"}`}
          >
            <span>{i < level ? "✓" : i === level ? "▶" : "○"}</span>
            <span>C{i}</span>
          </div>
        ))}
      </div>

      {feedback && (
        <div className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 rounded-lg bg-black/70 px-4 py-2 text-sm text-white">
          {feedback}
        </div>
      )}

      {/* Joystick */}
      <div
        ref={padRef}
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          handlePointer(e);
        }}
        onPointerMove={(e) => {
          if (e.buttons || e.pointerType === "touch") handlePointer(e);
        }}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
        className="absolute bottom-8 left-8 h-36 w-36 touch-none rounded-full border border-white/30 bg-black/35 backdrop-blur"
      >
        <div
          className="absolute left-1/2 top-1/2 h-16 w-16 rounded-full bg-white/80 shadow-lg"
          style={{ transform: `translate(calc(-50% + ${knob.x}px), calc(-50% + ${knob.y}px))` }}
        />
      </div>

      {/* Quiz */}
      {question && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl border border-amber-300/30 bg-slate-900/95 p-5 text-white shadow-2xl">
            <div className="text-xs uppercase tracking-widest text-amber-300">Thí luyện tâm pháp</div>
            <p className="mt-2 text-base font-semibold leading-snug">{question.q.q}</p>
            <div className="mt-4 grid gap-2">
              {question.q.a.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => answer(i)}
                  className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-left text-sm transition-colors hover:border-amber-300/60 hover:bg-amber-300/10"
                >
                  {String.fromCharCode(65 + i)}. {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Level up (breakthrough) */}
      {levelUp && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 p-4">
          <div className="max-w-sm rounded-2xl border border-violet-300/40 bg-slate-900/95 p-6 text-center text-white shadow-2xl">
            <div className="text-3xl">✦</div>
            <h2 className="mt-2 text-xl font-bold text-violet-200">Đột phá thành công!</h2>
            <p className="mt-2 text-sm text-white/80">
              Ngươi đột phá lên <span className="font-semibold text-amber-300">Cấp {level + 1}: {REALMS[level + 1]!.name}</span>.
            </p>
            <button
              onClick={ascend}
              className="mt-5 w-full rounded-lg bg-violet-500 px-4 py-3 text-sm font-semibold transition-colors hover:bg-violet-400"
            >
              Tiến vào cảnh giới mới
            </button>
          </div>
        </div>
      )}

      {/* Final ascension - became immortal */}
      {ascended && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 p-4">
          <div className="max-w-sm rounded-2xl border border-amber-300/50 bg-slate-900/95 p-6 text-center text-white shadow-2xl">
            <div className="text-4xl">☀</div>
            <h2 className="mt-2 text-xl font-bold text-amber-200">Độ Kiếp Thành Tiên!</h2>
            <p className="mt-2 text-sm text-white/80">
              Ngươi đã đột phá qua 10 cảnh giới, vượt qua Thiên Kiếp, phi thăng thành Tiên nhân, đứng trên vạn vật.
            </p>
            <button
              onClick={restart}
              className="mt-5 w-full rounded-lg bg-amber-500 px-4 py-3 text-sm font-semibold transition-colors hover:bg-amber-400"
            >
              Trùng sinh — tu luyện lại từ đầu
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
