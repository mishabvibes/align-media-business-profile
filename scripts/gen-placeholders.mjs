// Generates the portfolio placeholder tiles listed in content/portfolio.ts.
// Writes an SVG and a 1200px-wide WebP per item into public/portfolio/.
// Run by hand (`npm run gen:placeholders`), never at build time. Swap the
// output files for real work later.
//
// Node 22.18+/24 strips the types from content/portfolio.ts on import.

import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"
import { portfolio } from "../content/portfolio.ts"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const outDir = path.join(root, "public", "portfolio")
const WIDTH = 1200

const RATIOS = { "4:5": [4, 5], "1:1": [1, 1], "16:9": [16, 9], "3:4": [3, 4] }

// Three field tones from the design brief. Each has its own ink set so the
// graphic stays quiet on the field: surface, stroke, accent and the code colour.
const TONES = {
  ink: {
    field: "#141318",
    surface: "#1C1A22",
    stroke: "#3A3644",
    soft: "#2A2732",
    accent: "#7C3AED",
    code: "#7D7887",
  },
  surface: {
    field: "#1C1A22",
    surface: "#24212C",
    stroke: "#3A3644",
    soft: "#2A2732",
    accent: "#7C3AED",
    code: "#7D7887",
  },
  violet: {
    field: "#2B1A55",
    surface: "#352266",
    stroke: "#5A44A0",
    soft: "#40297A",
    accent: "#C9B8FF",
    code: "#9384C4",
  },
}

// Hand-picked so neighbours in the grid don't share a tone.
const TONE_BY_ID = {
  "dsn-01": "ink",
  "vid-01": "surface",
  "soc-01": "violet",
  "brd-01": "surface",
  "ads-01": "ink",
  "dsn-02": "violet",
  "vid-02": "ink",
  "soc-02": "surface",
  "ads-02": "violet",
  "brd-02": "ink",
  "vid-03": "surface",
  "dsn-03": "ink",
}

// Small deterministic PRNG so each tile varies but reruns are identical.
function rng(seedText) {
  let h = 2166136261
  for (const c of seedText) h = Math.imul(h ^ c.charCodeAt(0), 16777619)
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    h ^= h >>> 16
    return (h >>> 0) / 4294967296
  }
}

const r = (n) => Math.round(n * 10) / 10

// Fit a box of the given aspect inside (maxW, maxH), centred on (cx, cy).
function fitBox(aspect, maxW, maxH, cx, cy) {
  let w = maxW
  let h = w / aspect
  if (h > maxH) {
    h = maxH
    w = h * aspect
  }
  return { x: cx - w / 2, y: cy - h / 2, w, h }
}

// Design: a poster with a headline bar, two text lines and a footer row.
function poster({ w, h, t, rand }) {
  const box = fitBox(0.707, w * 0.56, h * 0.64, w * 0.5, h * 0.54)
  const p = box.w * 0.1
  const iw = box.w - p * 2
  const lines = [0.9, 0.62].map(
    (k, i) =>
      `<rect x="${r(box.x + p)}" y="${r(box.y + p + box.h * (0.3 + i * 0.06))}" width="${r(iw * k)}" height="${r(box.h * 0.022)}" fill="${t.stroke}"/>`,
  )
  const dot = box.w * 0.09
  const markX = box.x + p + iw * (0.55 + rand() * 0.25)
  return `
  <rect x="${r(box.x)}" y="${r(box.y)}" width="${r(box.w)}" height="${r(box.h)}" fill="${t.surface}" stroke="${t.stroke}" stroke-width="2"/>
  <rect x="${r(box.x + p)}" y="${r(box.y + p)}" width="${r(iw)}" height="${r(box.h * 0.13)}" fill="${t.soft}"/>
  <rect x="${r(box.x + p)}" y="${r(box.y + p)}" width="${r(iw * (0.55 + rand() * 0.3))}" height="${r(box.h * 0.13)}" fill="${t.stroke}"/>
  ${lines.join("\n  ")}
  <rect x="${r(markX)}" y="${r(box.y + box.h * 0.58)}" width="${r(dot)}" height="${r(dot)}" fill="${t.accent}"/>
  <line x1="${r(box.x + p)}" y1="${r(box.y + box.h - p * 1.6)}" x2="${r(box.x + box.w - p)}" y2="${r(box.y + box.h - p * 1.6)}" stroke="${t.stroke}" stroke-width="2"/>
  <rect x="${r(box.x + p)}" y="${r(box.y + box.h - p * 1.15)}" width="${r(iw * 0.22)}" height="${r(box.h * 0.016)}" fill="${t.stroke}"/>
  <rect x="${r(box.x + box.w - p - iw * 0.14)}" y="${r(box.y + box.h - p * 1.15)}" width="${r(iw * 0.14)}" height="${r(box.h * 0.016)}" fill="${t.stroke}"/>`
}

// Video: a 16:9 frame with a timeline scrubber underneath.
function videoFrame({ w, h, t, rand }) {
  const box = fitBox(16 / 9, w * 0.72, h * 0.5, w * 0.5, h * 0.5)
  const sy = box.y + box.h + Math.max(h * 0.06, 28)
  const progress = 0.28 + rand() * 0.4
  const px = box.x + box.w * progress
  const ticks = Array.from({ length: 11 }, (_, i) => {
    const x = box.x + (box.w / 10) * i
    return `<line x1="${r(x)}" y1="${r(sy + 14)}" x2="${r(x)}" y2="${r(sy + (i % 5 === 0 ? 26 : 20))}" stroke="${t.stroke}" stroke-width="2"/>`
  })
  const c = 14
  const corners = [
    [box.x + 16, box.y + 16, 1, 1],
    [box.x + box.w - 16, box.y + 16, -1, 1],
    [box.x + 16, box.y + box.h - 16, 1, -1],
    [box.x + box.w - 16, box.y + box.h - 16, -1, -1],
  ].map(
    ([x, y, dx, dy]) =>
      `<path d="M${r(x)} ${r(y + c * dy)}V${r(y)}H${r(x + c * dx)}" fill="none" stroke="${t.stroke}" stroke-width="2"/>`,
  )
  return `
  <rect x="${r(box.x)}" y="${r(box.y)}" width="${r(box.w)}" height="${r(box.h)}" fill="${t.surface}" stroke="${t.stroke}" stroke-width="2"/>
  ${corners.join("\n  ")}
  <line x1="${r(box.x)}" y1="${r(sy)}" x2="${r(box.x + box.w)}" y2="${r(sy)}" stroke="${t.soft}" stroke-width="6"/>
  <line x1="${r(box.x)}" y1="${r(sy)}" x2="${r(px)}" y2="${r(sy)}" stroke="${t.accent}" stroke-width="6"/>
  <circle cx="${r(px)}" cy="${r(sy)}" r="11" fill="${t.accent}"/>
  ${ticks.join("\n  ")}`
}

// Social: a 3x3 grid of 4:5 posts, a few filled, one accented.
function postGrid({ w, h, t, rand }) {
  const gap = Math.min(w, h) * 0.014
  const box = fitBox(0.8, w * 0.6, h * 0.68, w * 0.5, h * 0.54)
  const cw = (box.w - gap * 2) / 3
  const ch = (box.h - gap * 2) / 3
  const accent = Math.floor(rand() * 9)
  const cells = []
  for (let i = 0; i < 9; i++) {
    const x = box.x + (i % 3) * (cw + gap)
    const y = box.y + Math.floor(i / 3) * (ch + gap)
    const roll = rand()
    const fill = i === accent ? t.accent : roll < 0.35 ? t.stroke : roll < 0.7 ? t.soft : t.surface
    cells.push(`<rect x="${r(x)}" y="${r(y)}" width="${r(cw)}" height="${r(ch)}" fill="${fill}"/>`)
    if (i !== accent && roll >= 0.7) {
      cells.push(
        `<rect x="${r(x + cw * 0.14)}" y="${r(y + ch * 0.68)}" width="${r(cw * 0.5)}" height="${r(ch * 0.06)}" fill="${t.stroke}"/>`,
      )
    }
  }
  return `\n  ${cells.join("\n  ")}`
}

// Ads: rising bars with an arrow climbing over them.
function barsArrow({ w, h, t, rand }) {
  const box = fitBox(1.25, w * 0.62, h * 0.52, w * 0.5, h * 0.56)
  const n = 5
  const gap = box.w * 0.05
  const bw = (box.w - gap * (n - 1)) / n
  const base = box.y + box.h
  const heights = Array.from({ length: n }, (_, i) => 0.2 + (i / (n - 1)) * 0.62 + (rand() - 0.5) * 0.1)
  const bars = heights.map((k, i) => {
    const bh = box.h * k
    const fill = i === n - 1 ? t.accent : i % 2 ? t.stroke : t.soft
    return `<rect x="${r(box.x + i * (bw + gap))}" y="${r(base - bh)}" width="${r(bw)}" height="${r(bh)}" fill="${fill}"/>`
  })
  const pts = heights.map((k, i) => [box.x + i * (bw + gap) + bw / 2, base - box.h * k - box.h * 0.12])
  const [ex, ey] = pts[n - 1]
  const [px, py] = pts[n - 2]
  const ang = Math.atan2(ey - py, ex - px)
  const head = 26
  const a1 = [ex - head * Math.cos(ang - 0.5), ey - head * Math.sin(ang - 0.5)]
  const a2 = [ex - head * Math.cos(ang + 0.5), ey - head * Math.sin(ang + 0.5)]
  return `
  <line x1="${r(box.x)}" y1="${r(base)}" x2="${r(box.x + box.w)}" y2="${r(base)}" stroke="${t.stroke}" stroke-width="2"/>
  ${bars.join("\n  ")}
  <polyline points="${pts.map(([x, y]) => `${r(x)},${r(y)}`).join(" ")}" fill="none" stroke="${t.code}" stroke-width="4" stroke-linejoin="miter"/>
  <path d="M${r(a1[0])} ${r(a1[1])}L${r(ex)} ${r(ey)}L${r(a2[0])} ${r(a2[1])}" fill="none" stroke="${t.code}" stroke-width="4"/>`
}

// Branding: a geometric letterform "A" over a row of colour swatches.
function letterSwatches({ w, h, t }) {
  const s = Math.min(w * 0.42, h * 0.46)
  const cx = w * 0.5
  const top = h * 0.5 - s * 0.62
  const bottom = top + s
  const stem = s * 0.2
  const half = s * 0.46
  // Outer triangle minus the counter; crossbar falls out of the gap.
  const outer = `M${r(cx - half)} ${r(bottom)}L${r(cx - stem * 0.45)} ${r(top)}H${r(cx + stem * 0.45)}L${r(cx + half)} ${r(bottom)}H${r(cx + half - stem)}L${r(cx + half - stem - s * 0.07)} ${r(bottom - s * 0.2)}H${r(cx - half + stem + s * 0.07)}L${r(cx - half + stem)} ${r(bottom)}Z`
  const counter = `M${r(cx - s * 0.075)} ${r(top + s * 0.42)}L${r(cx)} ${r(top + s * 0.22)}L${r(cx + s * 0.075)} ${r(top + s * 0.42)}Z`
  const swatches = ["#0B0A0D", "#7C3AED", "#A78BFA", "#C9B8FF", "#F1EEE8"]
  const sw = s * 0.15
  const sg = s * 0.05
  const rowW = swatches.length * sw + (swatches.length - 1) * sg
  const sy = bottom + s * 0.16
  const row = swatches.map(
    (fill, i) =>
      `<rect x="${r(cx - rowW / 2 + i * (sw + sg))}" y="${r(sy)}" width="${r(sw)}" height="${r(sw)}" fill="${fill}" stroke="${t.stroke}" stroke-width="2"/>`,
  )
  return `
  <path d="${outer} ${counter}" fill="${t.stroke}" fill-rule="evenodd"/>
  ${row.join("\n  ")}`
}

const GRAPHIC = {
  Design: poster,
  Video: videoFrame,
  Social: postGrid,
  Ads: barsArrow,
  Branding: letterSwatches,
}

function tileSvg(item) {
  const [rw, rh] = RATIOS[item.aspectRatio]
  const w = WIDTH
  const h = Math.round((WIDTH * rh) / rw)
  const t = TONES[TONE_BY_ID[item.id] ?? "ink"]
  const rand = rng(item.id)
  const pad = Math.round(w * 0.05)
  // Same code size on every tile so the grid reads as one proof sheet.
  const codeSize = Math.round(w * 0.042)
  const graphic = GRAPHIC[item.category]({ w, h, t, rand })

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <title>${item.alt}</title>
  <defs>
    <filter id="grain" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="${Math.floor(rand() * 1000)}" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
  </defs>
  <rect width="${w}" height="${h}" fill="${t.field}"/>${graphic}
  <text x="${pad}" y="${pad + codeSize * 0.8}" fill="${t.code}" font-family="'JetBrains Mono', 'Fira Mono', 'DejaVu Sans Mono', monospace" font-size="${codeSize}" font-weight="500" letter-spacing="${r(codeSize * 0.08)}">${item.code}</text>
  <rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.025"/>
</svg>
`
}

await mkdir(outDir, { recursive: true })
for (const item of portfolio) {
  const svg = tileSvg(item)
  const base = path.join(outDir, path.basename(item.image, path.extname(item.image)))
  await writeFile(`${base}.svg`, svg)
  await sharp(Buffer.from(svg)).resize({ width: WIDTH }).webp({ quality: 82 }).toFile(`${base}.webp`)
  console.log(`${item.code}  ${item.aspectRatio}  ${path.relative(root, base)}.{svg,webp}`)
}
