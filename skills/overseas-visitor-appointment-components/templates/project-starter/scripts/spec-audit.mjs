/**
 * 规范自动归纳（报表，不是门禁）
 * ------------------------------------------------------------------
 * 分工（2026-11-15 与 check-tokens / check-components 划清边界，避免两套口径）：
 *   · scripts/check-tokens.mjs      → 门禁：字号集合 / padding 13·23 / 间距小数（npm run gate 里的红绿灯）
 *   · scripts/check-components.mjs  → 门禁：产物形态 / 必须复用组件 / 禁止自绘 / 弹层口径 / 多语言换行
 *   · scripts/spec-audit.mjs（本文件）→ 报表：只把「代码里实际在用的刻度」数出来、写成文档，
 *     并补上门禁没覆盖的那几类（圆角 / 间距 / 元素高度）的刻度偏差提示。
 *     退出码恒为 0，不参与阻塞；判断以 npm run gate 为准。
 *
 * 三方共用一套常量：scripts/design-rules.mjs。本文件不再自带字号/padding 刻度，
 * 上一版自带的字号刻度（11/15/28/32 放行）与 check-tokens 的裁决集合冲突，已删除。
 *
 * 跑法：node scripts/spec-audit.mjs
 * 产物：docs/组件规范-自动归纳.md（每次覆盖，可提交进仓库当规范快照）
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  VALID_FONT_SIZES,
  BANNED_PADDING_PX,
  RADIUS_SCALE,
  RADIUS_CAPSULE,
  SPACING_SCALE,
  HEIGHT_SCALE
} from './design-rules.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(ROOT, 'src')
const OUT = join(ROOT, 'docs', '组件规范-自动归纳.md')

// 关注哪些属性：这些属性直接决定视觉一致性
const PROPS = ['border-radius', 'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'gap', 'height', 'width', 'font', 'font-size', 'line-height', 'background', 'color', 'border']

// 只对这几类做刻度校验，且刻度全部来自 design-rules.mjs（唯一口径）
const SCALES = {
  'border-radius': RADIUS_SCALE,
  gap: SPACING_SCALE,
  'font-size': [...VALID_FONT_SIZES],
  padding: [0, 2, 4, 8, 10, 12, 16, 20, 24, 32, 40, 60],
  height: HEIGHT_SCALE
}

function walk(dir) {
  const out = []
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    const st = statSync(p)
    if (st.isDirectory()) out.push(...walk(p))
    else if (/\.(vue|css)$/.test(name)) out.push(p)
  }
  return out
}

function styleBlocks(file) {
  const text = readFileSync(file, 'utf8')
  if (file.endsWith('.css')) return [text]
  const blocks = []
  const re = /<style[^>]*>([\s\S]*?)<\/style>/g
  let m
  while ((m = re.exec(text))) blocks.push(m[1])
  return blocks
}

function rules(css) {
  const out = []
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, '')
  const re = /([^{}@]+)\{([^{}]*)\}/g
  let m
  while ((m = re.exec(clean))) {
    const selector = m[1].trim().replace(/\s+/g, ' ')
    const body = m[2]
    if (selector.startsWith('@') || selector.includes('from ') || selector.includes('to ')) continue
    const decls = {}
    body.split(';').forEach(d => {
      const i = d.indexOf(':')
      if (i < 0) return
      const prop = d.slice(0, i).trim().toLowerCase()
      const val = d.slice(i + 1).trim()
      if (PROPS.includes(prop)) decls[prop] = val
    })
    if (Object.keys(decls).length) out.push({ selector, decls })
  }
  return out
}

const files = walk(SRC)
const tokens = new Map() // prop -> Map(value -> count)
const outliers = []
const byComponent = new Map()

for (const file of files) {
  const rel = relative(SRC, file).split('\\').join('/')
  const comp = rel.replace(/\.(vue|css)$/, '').split('/').pop()
  for (const css of styleBlocks(file)) {
    for (const rule of rules(css)) {
      for (const [prop, val] of Object.entries(rule.decls)) {
        if (!tokens.has(prop)) tokens.set(prop, new Map())
        const bucket = tokens.get(prop)
        bucket.set(val, (bucket.get(val) || 0) + 1)
        if (!byComponent.has(comp)) byComponent.set(comp, [])
        byComponent.get(comp).push({ prop, val, selector: rule.selector })
      }
    }
  }
}

// 刻度偏差：把取值里出现的每个 px 数字拿去比对刻度，不在刻度上的算偏差。
// 圆角的 999/9999/100/50% 属「胶囊 / 全圆」语义值，先摘掉再比对，避免整类误报。
for (const [prop, scale] of Object.entries(SCALES)) {
  const bucket = tokens.get(prop)
  if (!bucket) continue
  for (const [val, count] of bucket) {
    if (prop === 'border-radius' && RADIUS_CAPSULE.has(val.trim())) continue
    const nums = (val.match(/-?\d+(\.\d+)?/g) || []).map(Number)
    const bad = nums.filter(n => !scale.includes(n))
    if (bad.length) outliers.push({ prop, val, count, reason: `含非刻度数字 ${bad.join('/')}（刻度 ${scale.join('/')}）` })
  }
}

// 与门禁重叠的两类，单独列出，避免「同一份代码两个结论」：
// 字号集合、padding 13/23 由 check-tokens 判红，这里只做展示与对齐提示
const gateOverlap = []
const fontBucket = tokens.get('font-size')
if (fontBucket) {
  for (const [val, count] of fontBucket) {
    const n = Number(val.replace('px', ''))
    if (Number.isFinite(n) && n >= 8 && n <= 72 && !VALID_FONT_SIZES.has(n)) gateOverlap.push({ prop: 'font-size', val, count })
  }
}
const padBucket = tokens.get('padding')
if (padBucket) {
  for (const [val, count] of padBucket) {
    for (const n of (val.match(/\d+(\.\d+)?/g) || []).map(Number)) {
      if (BANNED_PADDING_PX.has(n)) gateOverlap.push({ prop: 'padding', val, count })
    }
  }
}

const sortByCount = bucket => [...bucket.entries()].sort((a, b) => b[1] - a[1])

let md = '# 组件规范（自动归纳）\n\n'
md += '> 本文件由 `node scripts/spec-audit.mjs` 扫描 `src` 下的样式声明自动生成，不要手改。\n'
md += '> 本文件是**报表**，不是门禁：判红请以 `npm run gate`（check-components + check-tokens）为准。\n'
md += '> 三方共用同一份刻度常量 `scripts/design-rules.mjs`，不会出现两套口径。\n\n'
md += `扫描范围：${files.length} 个文件（.vue 的 style 块 + .css），属性白名单：${PROPS.join(' / ')}\n\n`

md += '## 一、事实词表（各属性实际取值与出现次数）\n\n'
md += '只列出现 ≥2 次的取值（一次性特例见「偏差候选」）。\n\n'
for (const prop of PROPS) {
  const bucket = tokens.get(prop)
  if (!bucket) continue
  const rows = sortByCount(bucket).filter(([, count]) => count >= 2).slice(0, 24)
  if (!rows.length) continue
  md += `### ${prop}（共 ${bucket.size} 种取值）\n\n| 取值 | 出现次数 |\n| --- | --- |\n`
  for (const [val, count] of rows) md += `| \`${val}\` | ${count} |\n`
  md += '\n'
}

md += '## 二、刻度偏差候选（本文件新增覆盖：圆角 / 间距 / 元素高度；需人拍板）\n\n'
if (!outliers.length) md += '本次扫描未发现偏差。\n\n'
else {
  md += '| 属性 | 取值 | 次数 | 原因 |\n| --- | --- | --- | --- |\n'
  for (const o of outliers.slice(0, 80)) md += `| ${o.prop} | \`${o.val}\` | ${o.count} | ${o.reason} |\n`
  md += '\n'
}

md += '## 三、与 check-tokens 门禁重叠的部分（只作展示，判红以 gate 为准）\n\n'
if (!gateOverlap.length) md += '本次扫描在字号集合 / padding 禁区上没有越界值。\n\n'
else {
  md += '| 属性 | 取值 | 次数 | 对应门禁规则 |\n| --- | --- | --- | --- |\n'
  for (const g of gateOverlap.slice(0, 40)) {
    const rule = g.prop === 'font-size' ? `字号集合 ${[...VALID_FONT_SIZES].join('/')}` : 'padding 禁用 13/23'
    md += `| ${g.prop} | \`${g.val}\` | ${g.count} | ${rule} |\n`
  }
  md += '\n'
}

md += '## 四、组件级样式清单（按组件读数，便于对照设计稿）\n\n'
for (const comp of [...byComponent.keys()].sort()) {
  const rows = byComponent.get(comp).slice(0, 40)
  md += `### ${comp}\n\n| 选择器 | 属性 | 取值 |\n| --- | --- | --- |\n`
  for (const r of rows) md += `| ${r.selector} | ${r.prop} | \`${r.val}\` |\n`
  md += '\n'
}

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, md, 'utf8')

const counts = [...tokens.entries()].map(([p, b]) => `${p}: ${b.size} 种取值`)
console.log('[spec-audit] 已生成', relative(ROOT, OUT))
console.log('[spec-audit]', counts.join('，'))
console.log('[spec-audit] 偏差候选', outliers.length, '条')
