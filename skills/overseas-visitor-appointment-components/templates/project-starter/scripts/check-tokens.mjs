#!/usr/bin/env node
/**
 * 设计变量使用检查（2026-11-13）
 *
 * 依据：references/design-tokens.md（design-spec-from-figma.md 第九节 / 9.7）
 *
 * 策略：**只拦新增**。工程存量里有历史遗留的越界值（如 10px 字号），
 * 一次性硬拦会让门禁第一次跑就全红、进而被绕过，所以：
 *   - 首次运行 `node scripts/check-tokens.mjs --write-baseline` 生成 scripts/token-baseline.json
 *   - 之后 gate 只比较「越界总数是否超过基线」；超出即 FAIL，下降会自动更新为新的更严基线（需重新 --write-baseline）
 *   - 对外来产物（--target）不使用基线，全部越界值直接 FAIL
 *
 * 用法：
 *   node scripts/check-tokens.mjs
 *   node scripts/check-tokens.mjs --target <dir>
 *   node scripts/check-tokens.mjs --write-baseline
 *   node scripts/check-tokens.mjs --json
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
// 2026-11-15：刻度常量收进 design-rules.mjs，与 scripts/spec-audit.mjs 共用同一口径
import { VALID_FONT_SIZES, BANNED_PADDING_PX, ALLOWED_SPACING_DECIMALS } from './design-rules.mjs'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const SELF_ROOT = path.resolve(HERE, '..')
const BASELINE = path.join(HERE, 'token-baseline.json')

const argv = process.argv.slice(2)
const getArg = (n) => { const i = argv.indexOf(n); return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : null }
const JSON_MODE = argv.includes('--json')
const WRITE_BASELINE = argv.includes('--write-baseline')
const targetArg = getArg('--target')
const TARGET = targetArg ? path.resolve(targetArg) : SELF_ROOT
const EXTERNAL = Boolean(targetArg)

// 字号 / padding / 间距小数三组口径见 scripts/design-rules.mjs（与 spec-audit.mjs 共用）

const walk = (dir, exts, out = []) => {
  if (!fs.existsSync(dir)) return out
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', 'dist', '.git', 'scripts', 'public'].includes(e.name) || e.name.startsWith('.')) continue
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, exts, out)
    else if (exts.some((x) => e.name.endsWith(x))) out.push(p)
  }
  return out
}
const read = (p) => { try { return fs.readFileSync(p, 'utf8') } catch { return '' } }
const strip = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/<!--[\s\S]*?-->/g, '')
const rel = (p) => path.relative(TARGET, p)

const violations = []
const push = (file, line, kind, value, note) => violations.push({ file, line, kind, value, note })

const files = walk(TARGET, ['.vue', '.css', '.js'])
for (const f of files) {
  const src = strip(read(f))
  const lines = src.split('\n')
  lines.forEach((line, i) => {
    // 字号：font-size: 10px / font: ... 17px
    for (const m of line.matchAll(/(?:font-size|font)\s*:\s*[^;{}]*?(\d+(?:\.\d+)?)px/g)) {
      const n = Number(m[1])
      if (!VALID_FONT_SIZES.has(n) && n >= 8 && n <= 72) {
        push(rel(f), i + 1, 'font-size', `${n}px`, `字号集合仅 12/13/14/16/18/20/24（9.7 裁决删 10/17/72）`)
      }
    }
    // padding 禁止 13 / 23
    for (const m of line.matchAll(/padding(?:-(?:top|right|bottom|left))?\s*:\s*([^;{}]+)/g)) {
      for (const v of m[1].matchAll(/(\d+(?:\.\d+)?)px/g)) {
        const n = Number(v[1])
        if (BANNED_PADDING_PX.has(n)) push(rel(f), i + 1, 'padding', `${n}px`, '9.7 裁决 padding 不用 13 / 23')
      }
    }
    // 间距小数（itemSpacing / gap / margin）
    for (const m of line.matchAll(/(?:gap|margin(?:-(?:top|right|bottom|left))?)\s*:\s*([^;{}]+)/g)) {
      for (const v of m[1].matchAll(/(\d+\.\d+)px/g)) {
        if (!ALLOWED_SPACING_DECIMALS) push(rel(f), i + 1, 'spacing-decimal', v[1] + 'px', '9.7 裁决间距不含小数')
      }
    }
  })
}

// 汇总：按 kind 计数
const counts = {}
for (const v of violations) counts[v.kind] = (counts[v.kind] || 0) + 1

if (WRITE_BASELINE) {
  fs.writeFileSync(BASELINE, JSON.stringify({ generatedAt: new Date().toISOString(), counts, total: violations.length }, null, 2) + '\n')
  console.log(`[token] 基线已写入 ${BASELINE}`)
  console.log(`[token] 当前越界：${violations.length} 处 ${JSON.stringify(counts)}`)
  process.exit(0)
}

let base = null
if (!EXTERNAL && fs.existsSync(BASELINE)) {
  try { base = JSON.parse(read(BASELINE)) } catch { base = null }
}

const samples = violations.slice(0, 8).map((v) => `${v.file}:${v.line} ${v.kind}=${v.value}`)
let failed = false
let message

if (!files.length) {
  const htmlOnly = walk(TARGET, ['.html', '.htm']).length > 0
  message = htmlOnly
    ? '外来产物只有单文件 HTML，没有 Vue 工程（应由 check-components.mjs 的 G1 拦截）'
    : '未发现可检查的 .vue / .css / .js 文件'
  failed = EXTERNAL
} else if (EXTERNAL) {
  failed = violations.length > 0
  message = failed
    ? `外来产物发现 ${violations.length} 处越界设计值（无基线豁免）`
    : '外来产物设计值符合规范集合'
} else if (base) {
  const over = Object.keys(counts).filter((k) => (counts[k] || 0) > (base.counts[k] || 0))
  failed = over.length > 0
  message = failed
    ? `存量基线为 ${base.total} 处，当前 ${violations.length} 处；新增越界类别：${over.join('、')}`
    : `当前 ${violations.length} 处越界，未超基线 ${base.total} 处（只拦新增，不强制存量改造）`
} else {
  message = `发现 ${violations.length} 处历史越界值；尚无基线，先跑 --write-baseline 建立基线（本轮不判失败）`
}

const out = { target: TARGET, pass: !failed, total: violations.length, counts, baseline: base, message, samples }
if (JSON_MODE) console.log(JSON.stringify(out, null, 2))
else {
  console.log(`\n设计变量检查 check-tokens`)
  console.log(`目标：${TARGET}`)
  console.log(`[${failed ? ' FAIL ' : '  OK  '}] ${message}`)
  if (samples.length) console.log('  样例：' + samples.slice(0, 5).join(' | '))
  console.log(`  分布：${JSON.stringify(counts)}\n`)
}
process.exit(failed ? 1 : 0)
