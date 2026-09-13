import type { RealmScenery } from "@/lib/realm-themes"

type SceneView = {
  ctx: CanvasRenderingContext2D
  scenery: RealmScenery
  camX: number
  camY: number
  width: number
  height: number
  worldSize: number
  time: number
}

const TAU = Math.PI * 2

function hash(x: number, y: number) {
  return Math.abs(Math.sin(x * 91.17 + y * 37.71) * 43758.5453) % 1
}

function forVisibleGrid(view: SceneView, step: number, pad: number, draw: (x: number, y: number, row: number, col: number) => void) {
  const startCol = Math.floor((view.camX - pad) / step)
  const endCol = Math.ceil((view.camX + view.width + pad) / step)
  const startRow = Math.floor((view.camY - pad) / step)
  const endRow = Math.ceil((view.camY + view.height + pad) / step)
  for (let row = startRow; row <= endRow; row++) {
    for (let col = startCol; col <= endCol; col++) draw(col * step, row * step, row, col)
  }
}

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
}

function drawCloud(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, color: string) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.ellipse(x, y, 72 * scale, 24 * scale, 0, 0, TAU)
  ctx.ellipse(x - 42 * scale, y + 3 * scale, 43 * scale, 18 * scale, 0, 0, TAU)
  ctx.ellipse(x + 44 * scale, y + 4 * scale, 48 * scale, 19 * scale, 0, 0, TAU)
  ctx.ellipse(x - 18 * scale, y - 13 * scale, 35 * scale, 24 * scale, 0, 0, TAU)
  ctx.ellipse(x + 22 * scale, y - 11 * scale, 42 * scale, 27 * scale, 0, 0, TAU)
  ctx.fill()
}

function drawPagoda(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, gold = false) {
  const wall = gold ? "rgba(255, 222, 120, .88)" : "rgba(120, 49, 38, .9)"
  const roof = gold ? "rgba(177, 112, 25, .96)" : "rgba(53, 74, 67, .96)"
  const trim = gold ? "rgba(255, 247, 190, .95)" : "rgba(226, 172, 72, .95)"
  ctx.save()
  ctx.translate(x, y)
  ctx.scale(scale, scale)
  ctx.fillStyle = "rgba(20, 25, 24, .28)"
  ctx.beginPath()
  ctx.ellipse(0, 35, 78, 18, 0, 0, TAU)
  ctx.fill()
  ctx.fillStyle = wall
  roundedRect(ctx, -50, -18, 100, 55, 4)
  ctx.fill()
  ctx.fillStyle = roof
  ctx.beginPath()
  ctx.moveTo(-73, -18)
  ctx.quadraticCurveTo(-48, -46, 0, -49)
  ctx.quadraticCurveTo(48, -46, 73, -18)
  ctx.quadraticCurveTo(48, -25, 0, -24)
  ctx.quadraticCurveTo(-48, -25, -73, -18)
  ctx.fill()
  ctx.strokeStyle = trim
  ctx.lineWidth = 3
  ctx.stroke()
  ctx.fillStyle = "rgba(24, 28, 27, .78)"
  ctx.fillRect(-13, 4, 26, 33)
  ctx.fillStyle = trim
  for (const px of [-38, 38]) ctx.fillRect(px - 4, -8, 8, 42)
  ctx.restore()
}

function drawForest(view: SceneView) {
  const { ctx, time } = view
  ctx.fillStyle = "rgba(25, 103, 63, .28)"
  ctx.fillRect(view.camX, view.camY, view.width, view.height)

  // Suối uốn khúc xuyên qua thế giới.
  ctx.save()
  ctx.lineCap = "round"
  for (let band = -1; band < 5; band++) {
    ctx.beginPath()
    for (let y = band * 620 - 100; y <= view.worldSize + 160; y += 36) {
      const x = 285 + band * 510 + Math.sin(y / 175 + band) * 78
      if (y === band * 620 - 100) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.strokeStyle = "rgba(32, 91, 89, .34)"
    ctx.lineWidth = 72
    ctx.stroke()
    ctx.strokeStyle = "rgba(105, 211, 190, .58)"
    ctx.lineWidth = 55
    ctx.stroke()
    ctx.setLineDash([24, 34])
    ctx.lineDashOffset = -(time / 45)
    ctx.strokeStyle = "rgba(218, 255, 239, .55)"
    ctx.lineWidth = 3
    ctx.stroke()
    ctx.setLineDash([])
  }
  ctx.restore()

  forVisibleGrid(view, 330, 100, (x, y, row, col) => {
    if (hash(row, col) < 0.47) return
    const ox = 70 + hash(col, row + 8) * 190
    const oy = 50 + hash(row + 5, col) * 185
    ctx.fillStyle = "rgba(15, 61, 46, .28)"
    ctx.beginPath()
    ctx.ellipse(x + ox, y + oy + 18, 64, 26, 0, 0, TAU)
    ctx.fill()
    ctx.fillStyle = "rgba(69, 135, 78, .58)"
    ctx.beginPath()
    ctx.moveTo(x + ox - 65, y + oy + 12)
    ctx.lineTo(x + ox, y + oy - 68)
    ctx.lineTo(x + ox + 62, y + oy + 12)
    ctx.closePath()
    ctx.fill()
  })

  // Thác nước gần trung tâm để cảnh xuất phát có điểm nhấn ngay lập tức.
  const fallX = view.worldSize / 2 - 300
  const fallY = view.worldSize / 2 - 180
  ctx.fillStyle = "rgba(33, 67, 55, .7)"
  roundedRect(ctx, fallX - 72, fallY - 58, 144, 125, 22)
  ctx.fill()
  const waterfall = ctx.createLinearGradient(fallX, fallY - 45, fallX, fallY + 80)
  waterfall.addColorStop(0, "rgba(220, 255, 244, .92)")
  waterfall.addColorStop(1, "rgba(70, 185, 182, .65)")
  ctx.fillStyle = waterfall
  roundedRect(ctx, fallX - 27, fallY - 48, 54, 125, 18)
  ctx.fill()
  for (let i = 0; i < 8; i++) {
    const a = time / 550 + i * 1.9
    ctx.fillStyle = "rgba(230, 255, 250, .72)"
    ctx.beginPath()
    ctx.arc(fallX + Math.sin(a) * (20 + i * 3), fallY + 75 + Math.cos(a * 1.3) * 12, 3 + (i % 3), 0, TAU)
    ctx.fill()
  }
}

function drawAncientCity(view: SceneView) {
  const { ctx, time } = view
  ctx.fillStyle = "rgba(111, 87, 62, .52)"
  ctx.fillRect(view.camX, view.camY, view.width, view.height)
  ctx.strokeStyle = "rgba(232, 205, 157, .2)"
  ctx.lineWidth = 3
  forVisibleGrid(view, 96, 0, (x, y) => {
    ctx.strokeRect(x + 4, y + 4, 88, 88)
  })

  // Trục đường chính lát đá.
  ctx.fillStyle = "rgba(90, 75, 66, .72)"
  for (let x = 230; x < view.worldSize; x += 470) ctx.fillRect(x, 0, 116, view.worldSize)
  for (let y = 260; y < view.worldSize; y += 540) ctx.fillRect(0, y, view.worldSize, 118)

  forVisibleGrid(view, 470, 120, (x, y, row, col) => {
    if ((row + col) % 2 === 0) drawPagoda(ctx, x + 95, y + 108, 0.82)
    else drawPagoda(ctx, x + 380, y + 420, 0.7)
    // Đèn lồng đỏ đung đưa.
    for (let i = 0; i < 3; i++) {
      const lx = x + 185 + i * 74
      const ly = y + 72 + Math.sin(time / 620 + row + col + i) * 4
      ctx.strokeStyle = "rgba(55, 38, 31, .85)"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(lx, y + 40)
      ctx.lineTo(lx, ly - 12)
      ctx.stroke()
      ctx.shadowColor = "rgba(255, 99, 39, .85)"
      ctx.shadowBlur = 13
      ctx.fillStyle = "rgba(203, 45, 28, .95)"
      ctx.beginPath()
      ctx.ellipse(lx, ly, 10, 14, 0, 0, TAU)
      ctx.fill()
      ctx.shadowBlur = 0
    }
  })

  // Bóng người qua lại trên đường.
  for (let i = 0; i < 24; i++) {
    const lane = i % 5
    const x = 270 + lane * 470 + Math.sin(i * 4.1) * 28
    const y = ((i * 137 + time * (0.014 + (i % 3) * 0.004)) % view.worldSize + view.worldSize) % view.worldSize
    ctx.fillStyle = i % 3 === 0 ? "rgba(142, 42, 37, .7)" : "rgba(38, 51, 49, .68)"
    ctx.beginPath()
    ctx.arc(x, y - 7, 4, 0, TAU)
    ctx.fill()
    ctx.fillRect(x - 4, y - 3, 8, 14)
  }
}

function drawMountainSect(view: SceneView) {
  const { ctx, time } = view
  ctx.fillStyle = "rgba(70, 101, 94, .58)"
  ctx.fillRect(view.camX, view.camY, view.width, view.height)
  // Sân đá ngọc và bậc thềm dài.
  ctx.fillStyle = "rgba(163, 203, 187, .42)"
  for (let x = 110; x < view.worldSize; x += 620) ctx.fillRect(x, 0, 340, view.worldSize)
  ctx.strokeStyle = "rgba(219, 246, 231, .32)"
  ctx.lineWidth = 2
  for (let y = 0; y < view.worldSize; y += 52) {
    ctx.beginPath()
    ctx.moveTo(110, y)
    ctx.lineTo(view.worldSize - 110, y)
    ctx.stroke()
  }
  forVisibleGrid(view, 650, 130, (x, y, row, col) => {
    // Cổng tông môn.
    const gx = x + 320
    const gy = y + 170
    ctx.fillStyle = "rgba(49, 68, 65, .34)"
    ctx.fillRect(gx - 90, gy + 46, 180, 20)
    ctx.fillStyle = "rgba(210, 229, 205, .9)"
    ctx.fillRect(gx - 76, gy - 42, 18, 105)
    ctx.fillRect(gx + 58, gy - 42, 18, 105)
    ctx.fillStyle = "rgba(47, 93, 82, .95)"
    ctx.beginPath()
    ctx.moveTo(gx - 104, gy - 42)
    ctx.lineTo(gx, gy - 78)
    ctx.lineTo(gx + 104, gy - 42)
    ctx.lineTo(gx + 82, gy - 31)
    ctx.lineTo(gx - 82, gy - 31)
    ctx.closePath()
    ctx.fill()
    ctx.strokeStyle = "rgba(245, 215, 112, .88)"
    ctx.lineWidth = 3
    ctx.stroke()
    // Biển mây thấp chuyển động.
    drawCloud(ctx, x + 120 + Math.sin(time / 1800 + row) * 34, y + 470, 0.9, "rgba(238, 255, 249, .34)")
    drawCloud(ctx, x + 500 + Math.cos(time / 2100 + col) * 38, y + 510, 1.1, "rgba(228, 248, 244, .3)")
  })
}

function drawLotusIsles(view: SceneView) {
  const { ctx, time } = view
  ctx.fillStyle = "rgba(41, 146, 145, .52)"
  ctx.fillRect(view.camX, view.camY, view.width, view.height)
  forVisibleGrid(view, 390, 130, (x, y, row, col) => {
    const cx = x + 195 + (hash(row, col) - 0.5) * 90
    const cy = y + 190 + (hash(col, row) - 0.5) * 70
    // Hồ linh dịch và đảo nổi.
    ctx.fillStyle = "rgba(14, 75, 84, .4)"
    ctx.beginPath()
    ctx.ellipse(cx, cy + 25, 125, 75, 0, 0, TAU)
    ctx.fill()
    const water = ctx.createRadialGradient(cx - 22, cy - 14, 10, cx, cy, 120)
    water.addColorStop(0, "rgba(170, 255, 235, .75)")
    water.addColorStop(1, "rgba(28, 131, 142, .58)")
    ctx.fillStyle = water
    ctx.beginPath()
    ctx.ellipse(cx, cy, 116, 65, 0, 0, TAU)
    ctx.fill()
    ctx.strokeStyle = "rgba(211, 255, 246, .42)"
    ctx.lineWidth = 2
    for (let r = 35; r <= 90; r += 25) {
      ctx.beginPath()
      ctx.ellipse(cx, cy, r + Math.sin(time / 700 + r) * 4, r * 0.47, 0, 0, TAU)
      ctx.stroke()
    }
    // Sen nở.
    for (let i = 0; i < 7; i++) {
      const a = i * 2.31 + hash(i + row, col)
      const lx = cx + Math.cos(a) * (38 + (i % 3) * 24)
      const ly = cy + Math.sin(a) * (18 + (i % 3) * 12)
      ctx.fillStyle = "rgba(43, 132, 78, .82)"
      ctx.beginPath()
      ctx.ellipse(lx, ly, 14, 8, a, 0, TAU)
      ctx.fill()
      if (i % 2 === 0) {
        ctx.fillStyle = "rgba(255, 183, 218, .94)"
        for (let p = 0; p < 6; p++) {
          const pa = (p / 6) * TAU
          ctx.beginPath()
          ctx.ellipse(lx + Math.cos(pa) * 6, ly + Math.sin(pa) * 4, 5, 2.5, pa, 0, TAU)
          ctx.fill()
        }
        ctx.fillStyle = "rgba(255, 236, 130, .96)"
        ctx.beginPath()
        ctx.arc(lx, ly, 3, 0, TAU)
        ctx.fill()
      }
    }
  })
}

function drawDivineTemple(view: SceneView) {
  const { ctx, time } = view
  ctx.fillStyle = "rgba(61, 70, 69, .72)"
  ctx.fillRect(view.camX, view.camY, view.width, view.height)
  // Nền điện cổ chạm khắc.
  forVisibleGrid(view, 180, 20, (x, y, row, col) => {
    ctx.strokeStyle = "rgba(223, 184, 76, .28)"
    ctx.lineWidth = 2
    ctx.strokeRect(x + 8, y + 8, 164, 164)
    ctx.beginPath()
    ctx.arc(x + 90, y + 90, 45, 0, TAU)
    ctx.stroke()
    if ((row + col) % 4 === 0) {
      ctx.fillStyle = "rgba(159, 57, 42, .72)"
      ctx.beginPath()
      ctx.arc(x + 90, y + 90, 22, 0, TAU)
      ctx.fill()
    }
  })
  forVisibleGrid(view, 610, 150, (x, y, row, col) => {
    // Cột long phượng.
    for (const px of [x + 105, x + 505]) {
      const glow = 0.45 + Math.sin(time / 520 + row + col) * 0.12
      ctx.shadowColor = "rgba(255, 190, 68, .9)"
      ctx.shadowBlur = 18
      ctx.fillStyle = `rgba(204, 145, 48, ${glow + 0.35})`
      roundedRect(ctx, px - 18, y + 100, 36, 168, 8)
      ctx.fill()
      ctx.shadowBlur = 0
      ctx.strokeStyle = "rgba(255, 237, 159, .88)"
      ctx.lineWidth = 5
      ctx.beginPath()
      for (let sy = y + 112; sy < y + 258; sy += 12) {
        const sx = px + Math.sin(sy / 19) * 13
        if (sy === y + 112) ctx.moveTo(sx, sy)
        else ctx.lineTo(sx, sy)
      }
      ctx.stroke()
    }
    drawPagoda(ctx, x + 305, y + 355, 1.18, true)
  })
}

function drawVoid(view: SceneView) {
  const { ctx, time } = view
  const abyss = ctx.createLinearGradient(view.camX, view.camY, view.camX + view.width, view.camY + view.height)
  abyss.addColorStop(0, "rgba(4, 8, 30, .94)")
  abyss.addColorStop(0.52, "rgba(24, 16, 71, .92)")
  abyss.addColorStop(1, "rgba(5, 28, 57, .94)")
  ctx.fillStyle = abyss
  ctx.fillRect(view.camX, view.camY, view.width, view.height)
  // Dải ngân hà chéo.
  ctx.save()
  ctx.translate(view.worldSize / 2, view.worldSize / 2)
  ctx.rotate(-0.48)
  const galaxy = ctx.createLinearGradient(0, -240, 0, 240)
  galaxy.addColorStop(0, "rgba(91, 76, 181, 0)")
  galaxy.addColorStop(0.5, "rgba(166, 136, 232, .28)")
  galaxy.addColorStop(1, "rgba(57, 178, 210, 0)")
  ctx.fillStyle = galaxy
  ctx.fillRect(-view.worldSize, -240, view.worldSize * 2, 480)
  ctx.restore()
  forVisibleGrid(view, 120, 20, (x, y, row, col) => {
    const h = hash(row, col)
    if (h < 0.32) return
    const pulse = 0.45 + 0.45 * Math.sin(time / (380 + h * 500) + row * 3 + col)
    const sx = x + 15 + hash(col + 8, row) * 90
    const sy = y + 15 + hash(row + 12, col) * 90
    ctx.fillStyle = h > 0.8 ? `rgba(146, 226, 255, ${pulse})` : `rgba(241, 227, 255, ${pulse})`
    ctx.beginPath()
    ctx.arc(sx, sy, 1 + h * 2.2, 0, TAU)
    ctx.fill()
    if (h > 0.86) {
      ctx.strokeStyle = `rgba(212, 241, 255, ${pulse * 0.7})`
      ctx.beginPath()
      ctx.moveTo(sx - 8, sy)
      ctx.lineTo(sx + 8, sy)
      ctx.moveTo(sx, sy - 8)
      ctx.lineTo(sx, sy + 8)
      ctx.stroke()
    }
  })
  // Quỹ đạo tinh tú.
  forVisibleGrid(view, 620, 120, (x, y, row, col) => {
    const cx = x + 310
    const cy = y + 310
    ctx.strokeStyle = "rgba(135, 161, 255, .18)"
    ctx.lineWidth = 2
    for (let r = 70; r <= 180; r += 55) {
      ctx.beginPath()
      ctx.ellipse(cx, cy, r, r * 0.42, 0.35, 0, TAU)
      ctx.stroke()
      const a = time / (900 + r * 4) + row + col
      ctx.fillStyle = "rgba(187, 231, 255, .84)"
      ctx.beginPath()
      ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.42, 4, 0, TAU)
      ctx.fill()
    }
  })
}

function drawRainbowPalace(view: SceneView) {
  const { ctx, time } = view
  const sky = ctx.createLinearGradient(view.camX, view.camY, view.camX, view.camY + view.height)
  sky.addColorStop(0, "rgba(76, 119, 185, .72)")
  sky.addColorStop(1, "rgba(190, 145, 211, .55)")
  ctx.fillStyle = sky
  ctx.fillRect(view.camX, view.camY, view.width, view.height)
  forVisibleGrid(view, 560, 150, (x, y, row, col) => {
    drawCloud(ctx, x + 155 + Math.sin(time / 1900 + row) * 30, y + 130, 1.25, "rgba(246, 252, 255, .52)")
    drawCloud(ctx, x + 420 + Math.cos(time / 2300 + col) * 34, y + 425, 1.05, "rgba(238, 245, 255, .42)")
    drawPagoda(ctx, x + 285, y + 280, 0.92, true)
    // Cầu vồng mảnh nối thiên cung.
    const hues = ["rgba(242, 88, 93, .48)", "rgba(248, 182, 70, .48)", "rgba(97, 215, 158, .48)", "rgba(91, 169, 241, .48)", "rgba(174, 112, 232, .48)"]
    hues.forEach((color, i) => {
      ctx.strokeStyle = color
      ctx.lineWidth = 5
      ctx.beginPath()
      ctx.arc(x + 285, y + 390, 150 + i * 6, Math.PI + 0.1, TAU - 0.1)
      ctx.stroke()
    })
  })
  // Phượng hoàng dạng silhouette lướt qua trời.
  for (let i = 0; i < 4; i++) {
    const px = ((time * (0.018 + i * 0.004) + i * 530) % (view.worldSize + 300)) - 150
    const py = 280 + i * 430 + Math.sin(time / 850 + i) * 42
    ctx.save()
    ctx.translate(px, py)
    ctx.scale(0.7 + i * 0.08, 0.7 + i * 0.08)
    ctx.fillStyle = i % 2 === 0 ? "rgba(255, 175, 69, .72)" : "rgba(255, 94, 119, .68)"
    ctx.beginPath()
    ctx.moveTo(-5, 3)
    ctx.quadraticCurveTo(-45, -33, -84, -13)
    ctx.quadraticCurveTo(-45, -4, -20, 16)
    ctx.quadraticCurveTo(0, 30, 20, 16)
    ctx.quadraticCurveTo(48, -7, 84, -13)
    ctx.quadraticCurveTo(46, -35, 8, 3)
    ctx.quadraticCurveTo(0, 8, -5, 3)
    ctx.fill()
    ctx.strokeStyle = "rgba(255, 229, 132, .76)"
    ctx.lineWidth = 5
    for (let tail = -1; tail <= 1; tail++) {
      ctx.beginPath()
      ctx.moveTo(0, 18)
      ctx.quadraticCurveTo(tail * 22, 48, tail * 38, 76)
      ctx.stroke()
    }
    ctx.restore()
  }
}

function drawGoldenRealm(view: SceneView) {
  const { ctx, time } = view
  const gold = ctx.createRadialGradient(view.camX + view.width / 2, view.camY + view.height / 2, 30, view.camX + view.width / 2, view.camY + view.height / 2, Math.max(view.width, view.height))
  gold.addColorStop(0, "rgba(255, 231, 137, .62)")
  gold.addColorStop(1, "rgba(124, 76, 17, .64)")
  ctx.fillStyle = gold
  ctx.fillRect(view.camX, view.camY, view.width, view.height)
  // Đại lộ ánh sáng và gạch ngọc.
  ctx.fillStyle = "rgba(255, 241, 181, .36)"
  for (let x = 70; x < view.worldSize; x += 510) ctx.fillRect(x, 0, 145, view.worldSize)
  for (let y = 110; y < view.worldSize; y += 510) ctx.fillRect(0, y, view.worldSize, 145)
  ctx.strokeStyle = "rgba(255, 249, 208, .34)"
  ctx.lineWidth = 3
  forVisibleGrid(view, 85, 0, (x, y) => ctx.strokeRect(x + 4, y + 4, 77, 77))
  forVisibleGrid(view, 510, 100, (x, y, row, col) => {
    drawPagoda(ctx, x + 350, y + 340, 1.08, true)
    const pulse = 0.45 + Math.sin(time / 440 + row + col) * 0.2
    ctx.shadowColor = "rgba(255, 238, 142, .95)"
    ctx.shadowBlur = 24
    ctx.fillStyle = `rgba(255, 246, 190, ${pulse})`
    ctx.beginPath()
    ctx.arc(x + 88, y + 88, 20, 0, TAU)
    ctx.fill()
    ctx.shadowBlur = 0
  })
  // Quang mang chạy dọc đại lộ.
  ctx.strokeStyle = "rgba(255, 253, 218, .72)"
  ctx.lineWidth = 3
  ctx.setLineDash([18, 42])
  ctx.lineDashOffset = -(time / 30)
  for (let x = 142; x < view.worldSize; x += 510) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, view.worldSize)
    ctx.stroke()
  }
  ctx.setLineDash([])
}

function drawTribulationPeak(view: SceneView) {
  const { ctx, time } = view
  const storm = ctx.createLinearGradient(view.camX, view.camY, view.camX, view.camY + view.height)
  storm.addColorStop(0, "rgba(14, 18, 32, .9)")
  storm.addColorStop(1, "rgba(73, 76, 88, .78)")
  ctx.fillStyle = storm
  ctx.fillRect(view.camX, view.camY, view.width, view.height)
  // Mặt đỉnh núi nứt vỡ.
  forVisibleGrid(view, 210, 40, (x, y, row, col) => {
    const h = hash(row, col)
    ctx.fillStyle = h > 0.5 ? "rgba(77, 78, 84, .58)" : "rgba(45, 49, 58, .62)"
    ctx.beginPath()
    ctx.moveTo(x + 8, y + 28)
    ctx.lineTo(x + 152, y + 4)
    ctx.lineTo(x + 202, y + 131)
    ctx.lineTo(x + 62, y + 198)
    ctx.closePath()
    ctx.fill()
    ctx.strokeStyle = "rgba(177, 196, 229, .18)"
    ctx.lineWidth = 3
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x + 92, y + 40)
    ctx.lineTo(x + 112, y + 92)
    ctx.lineTo(x + 78, y + 127)
    ctx.lineTo(x + 101, y + 174)
    ctx.stroke()
  })
  // Mây giông cuộn sát mặt đất.
  forVisibleGrid(view, 520, 160, (x, y, row, col) => {
    const drift = Math.sin(time / 1200 + row + col) * 38
    drawCloud(ctx, x + 165 + drift, y + 115, 1.35, "rgba(21, 27, 41, .7)")
    drawCloud(ctx, x + 405 - drift, y + 390, 1.1, "rgba(40, 45, 61, .66)")
  })
}

export function drawRealmScenery(view: SceneView) {
  const { ctx } = view
  ctx.save()
  switch (view.scenery) {
    case "forest-waterfall":
      drawForest(view)
      break
    case "ancient-city":
      drawAncientCity(view)
      break
    case "mountain-sect":
      drawMountainSect(view)
      break
    case "lotus-isles":
      drawLotusIsles(view)
      break
    case "divine-temple":
      drawDivineTemple(view)
      break
    case "star-void":
      drawVoid(view)
      break
    case "rainbow-palace":
      drawRainbowPalace(view)
      break
    case "golden-realm":
      drawGoldenRealm(view)
      break
    case "tribulation-peak":
      drawTribulationPeak(view)
      break
  }
  ctx.restore()
}