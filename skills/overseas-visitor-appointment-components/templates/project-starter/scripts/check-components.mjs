#!/usr/bin/env node
/**
 * 组件复用 / 页面结构 可执行门禁（2026-11-13）
 *
 * 用途：把「必须复用组件库」「禁止自绘结构」「产物形态」从模型自觉变成脚本可判定的红/绿结果。
 * 起因：跨模型（豆包）执行本 Skill 时产出了纯原生单文件 HTML，确认页自绘左右两列、
 *       同行人/车辆自绘 tag 与卡片，且自造业务上限 —— 过程级约束跳过后没有代价。
 *
 * 用法：
 *   npm run gate                                  # 检查工程自身
 *   node scripts/check-components.mjs             # 同上
 *   node scripts/check-components.mjs --target <dir>   # 检查外部生成产物（如豆包输出目录）
 *   node scripts/check-components.mjs --json      # JSON 输出，便于 CI
 *
 * 退出码：0 = 通过（可有警告）；1 = 有失败项；2 = 目标路径无效
 *
 * 规则依据：
 *   references/design-principles.md 第八节（结果级约束）
 *   references/components/README.md 第六、七节（逐场景核对表 / 禁止自绘清单）
 *   references/pages/README.md 第四节（确认页结构基准）
 *   references/component-registry.md 规则 11 / 13 / 14
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const SELF_ROOT = path.resolve(HERE, '..')

const argv = process.argv.slice(2)
const getArg = (name) => {
  const i = argv.indexOf(name)
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : null
}
const JSON_MODE = argv.includes('--json')
const TARGET = getArg('--target') ? path.resolve(getArg('--target')) : SELF_ROOT

const results = []
const add = (level, gate, message, detail = '') => results.push({ level, gate, message, detail })

const read = (p) => {
  try { return fs.readFileSync(p, 'utf8') } catch { return null }
}
const walk = (dir, exts, out = []) => {
  if (!fs.existsSync(dir)) return out
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === 'dist' || e.name === '.git' || e.name.startsWith('.')) continue
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, exts, out)
    else if (exts.some((x) => e.name.endsWith(x))) out.push(p)
  }
  return out
}
const rel = (p) => path.relative(TARGET, p) || path.basename(p)
/** 去掉 HTML/Vue 注释，避免注释里的示例 CSS 触发误报 */
const stripComments = (s) => s.replace(/<!--[\s\S]*?-->/g, '').replace(/\/\*[\s\S]*?\*\//g, '')

// ── 收集待检文件 ────────────────────────────────────────────────────────────
if (!fs.existsSync(TARGET) || !fs.statSync(TARGET).isDirectory()) {
  console.error(`[gate] 目标路径无效：${TARGET}`)
  process.exit(2)
}

const allVue = walk(TARGET, ['.vue'])
const allHtml = walk(TARGET, ['.html', '.htm'])
const pageDir = path.join(TARGET, 'src/pages')
const pageFiles = fs.existsSync(pageDir) ? walk(pageDir, ['.vue']) : allVue.filter((f) => f.includes('/pages/'))
// 页面/产物正文：页面源码 + 根目录单文件 HTML（不扫组件源码，组件内部实现不算「页面自绘」）
const bodyFiles = [...new Set([...pageFiles, ...allHtml.filter((f) => path.dirname(f) === TARGET || !f.includes('/src/'))])]
const bodies = bodyFiles.map((f) => {
  const raw = read(f) || ''
  return { file: rel(f), src: stripComments(raw), raw }
})
const joined = bodies.map((b) => b.src).join('\n')

const hasPkg = fs.existsSync(path.join(TARGET, 'package.json'))
const hasVite = ['vite.config.js', 'vite.config.ts', 'vite.config.mjs'].some((f) => fs.existsSync(path.join(TARGET, f)))
const hasRegistry = fs.existsSync(path.join(TARGET, 'src/components/figma/index.js'))
const hasApp = fs.existsSync(path.join(TARGET, 'src/App.vue'))

// ── G1 产物形态 ─────────────────────────────────────────────────────────────
const isPureHtml = !hasPkg && allHtml.length > 0 && allVue.length === 0
if (isPureHtml) {
  add('FAIL', 'G1 产物形态', `纯单文件原生 HTML 产物，禁止替代 Vue 组件库工程（发现 ${allHtml.length} 个 .html、0 个 .vue）`,
    '必须从 templates/project-starter/ 复制可运行 Vue 3 + Vite 工程')
} else if (!hasPkg || !hasVite || !hasRegistry || !hasApp) {
  const miss = [!hasPkg && 'package.json', !hasVite && 'vite.config.js', !hasRegistry && 'src/components/figma/index.js', !hasApp && 'src/App.vue'].filter(Boolean)
  add('FAIL', 'G1 产物形态', `工程骨架不完整，缺：${miss.join('、')}`, '按 page-generation-sop.md 第 2 步复制 project-starter')
} else {
  add('PASS', 'G1 产物形态', `Vue 3 + Vite 工程骨架完整（${allVue.length} 个 .vue，组件注册表存在）`)
}

// 单文件 HTML 即使目录里另有工程，也要检查是否自绘（跨模型常见：交一个 html 了事）
const inlineHtml = allHtml.filter((f) => {
  const s = read(f) || ''
  return /<style[\s>]/i.test(s) && /\.card|field|step|popup/i.test(s)
})
if (inlineHtml.length && hasPkg) {
  add('WARN', 'G1 产物形态', `存在 ${inlineHtml.length} 个带内联样式表的 HTML 文件，请确认不是自绘产物`, inlineHtml.map(rel).join(', '))
}

// ── G2 逐场景必用组件 ───────────────────────────────────────────────────────
const formFiles = bodies.filter((b) => /新建预约|appointment\/new|step\s*===\s*0|form\.title|companion-stack|访客信息/.test(b.src))
const formTargets = formFiles.length ? formFiles : bodies
const uses = (re) => formTargets.some((b) => re.test(b.src))
const mustHave = [
  { name: 'UserCard（同行人）', re: /<UserCard\b|UserCard\.vue/ },
  { name: 'VehicleCard（车辆）', re: /<VehicleCard\b|VehicleCard\.vue/ },
  { name: 'Field（输入与只读字段）', re: /<Field\b|Field\.vue/ },
  { name: 'Checkbox（协议勾选）', re: /<Checkbox\b|Checkbox\.vue/ },
  { name: 'Dialog（校验 / 协议确认）', re: /<Dialog\b|Dialog\.vue/ },
  { name: 'Steps（三步流程）', re: /<Steps\b|Steps\.vue/ }
]
const missing = mustHave.filter((m) => !uses(m.re)).map((m) => m.name)
if (missing.length) {
  add('FAIL', 'G2 必用组件', `新建预约流程缺必用组件：${missing.join('、')}`,
    '见 references/components/README.md 第六节逐场景调用核对表')
} else {
  add('PASS', 'G2 必用组件', `新建预约流程 6 类必用组件齐全（UserCard / VehicleCard / Field / Checkbox / Dialog / Steps）`)
}

// 只读字段必须是 Field state="readonly"（上下结构）
const readonlyField = /<Field[^>]*state="readonly"|<Field[^>]*state='readonly'/.test(joined)
if (!readonlyField && (hasPkg || bodies.length)) {
  add('FAIL', 'G2 必用组件', '确认页 / 详情未见 Field state="readonly" 只读字段',
    '只读展示必须复用 Field 的上下结构，禁止自绘键值行')
} else if (readonlyField) {
  add('PASS', 'G2 必用组件', '只读字段复用 Field state="readonly"')
}

// ── G3 禁止自绘结构 ─────────────────────────────────────────────────────────
const forbidden = [
  { name: '确认页左右两列（.row__label / .row__value）', re: /\.row__label|\.row__value|class=["'][^"']*\brow__label|class=["'][^"']*\brow__value/ },
  { name: '自绘 <dl class="rows"> 只读列表', re: /<dl[^>]*class=["'][^"']*\brows\b|class=["'][^"']*\brows\b[^>]*>/ },
  { name: '自绘同行人 tag 列表（class="tags" / .tag{）', re: /class=["'][^"']*\btags\b|\.tags\s*\{/ },
  { name: '自绘车辆列表（class="vehicles" / .vehicles{）', re: /class=["'][^"']*\bvehicles\b|\.vehicles\s*\{/ },
  { name: '自绘添加按钮（class="addbtn" / .addbtn{）', re: /class=["'][^"']*\baddbtn\b|\.addbtn\s*\{/ },
  { name: '自绘复选框（原生 input[type=checkbox]）', re: /<input[^>]*type=["']checkbox["']/ },
  { name: '裸用 van-dialog（应复用 Dialog.vue）', re: /<van-dialog\b/ },
  { name: 'document.createElement 手拼业务列表', re: /document\.createElement\s*\(/ },
  { name: 'innerHTML 手拼列表项', re: /\.innerHTML\s*=\s*['"`]\s*<li|\.innerHTML\s*\+=/ }
]
const selfDrawn = forbidden.filter((f) => f.re.test(joined))
if (selfDrawn.length) {
  add('FAIL', 'G3 禁止自绘', `发现 ${selfDrawn.length} 类自绘结构：${selfDrawn.map((f) => f.name).join('；')}`,
    '见 references/components/README.md 第七节；同行人/车辆必须用 UserCard / VehicleCard')
} else {
  add('PASS', 'G3 禁止自绘', '无两列确认页、无自绘 tag / 车辆 / 添加按钮 / checkbox / dialog / 手拼列表')
}

// 自造业务规则（需求未给的上限不能写成事实）
const inventedRules = [
  { name: '同行人上限 50', re: /0\s*\/\s*50|\/50|最多\s*50\s*人|maxCompanion|companions\.length\s*[><=]+\s*50/ },
  { name: '车辆上限 10', re: /0\s*\/\s*10|\/10|最多\s*10\s*辆|vehicles\.length\s*[><=]+\s*10/ },
  { name: '车牌 12 字符 / 姓名 2–50 字符', re: /车牌[^<]{0,12}12|2\s*[-–]\s*50\s*字符|maxlength=["']12["']/ }
].filter((r) => r.re.test(joined))
if (inventedRules.length) {
  add('FAIL', 'G3 禁止自绘', `把未确认的业务规则写成了事实：${inventedRules.map((r) => r.name).join('；')}`,
    '数量上限 / 字符长度 / 车牌规则只来自 requirements-input.md 的本次需求输入')
} else {
  add('PASS', 'G3 禁止自绘', '未发现自造数量上限 / 字符规则')
}

// ── G4 页面布局覆盖（规则 11） ──────────────────────────────────────────────
// 唯一允许的例外：:deep(.x) { width:100% }；此处只拦明确会顶掉组件内部布局的写法
const deepDanger = []
for (const b of bodies) {
  // :deep 出现在**选择器**里，不是规则块里；必须按「前置文本 + 规则块」切分后检查选择器。
  const ruleRe = /([^{}]+)\{([^{}]*)\}/g
  let m
  while ((m = ruleRe.exec(b.raw)) !== null) {
    const selector = m[1].slice(-300)
    const decl = m[2]
    if (!/:deep|::v-deep/.test(selector)) continue
    // 允许的例外：仅有 width:100% 的容器自适应、box-shadow 视觉微调、white-space 换行修正
    const stripped = decl
      .replace(/width\s*:\s*100%\s*;?/g, '')
      .replace(/box-shadow\s*:[^;]*;?/g, '')
      .replace(/white-space\s*:\s*normal\s*;?/g, '')
      .replace(/margin\s*:\s*0\s*;?/g, '')
    if (/display\s*:\s*(block|grid|inline|inline-block|none)\b/.test(stripped)) {
      deepDanger.push(`${b.file}: :deep 规则内 display 覆盖 → ${decl.trim().slice(0, 80)}`)
    } else if (/position\s*:\s*(absolute|fixed|sticky)\b/.test(stripped)) {
      deepDanger.push(`${b.file}: :deep 规则内 position 覆盖 → ${decl.trim().slice(0, 80)}`)
    } else if (/padding\s*:\s*(?!0)[^;]+/.test(stripped)) {
      deepDanger.push(`${b.file}: :deep 规则内 padding 覆盖 → ${decl.trim().slice(0, 80)}`)
    }
  }
}
const uniqDanger = [...new Set(deepDanger)]
if (uniqDanger.length) {
  add('WARN', 'G4 布局覆盖', `发现 ${uniqDanger.length} 处疑似页面覆盖组件布局（规则 11）`, uniqDanger.slice(0, 5).join(' | '))
} else {
  add('PASS', 'G4 布局覆盖', '页面 :deep 规则未覆盖组件 display / position / padding（宽度自适应走 prop）')
}

// ── G5 多语言换行 ───────────────────────────────────────────────────────────
// 约定：可变文案一律换行；单行省略只限「姓名 / 值」这类有界数据，且必须显式说明。
// 显式说明方式：在 CSS 规则前写 /* bounded-data: <理由> */，脚本据此豁免并计数。
const truncated = []
let boundedCount = 0
for (const b of bodies) {
  // 按「前置文本（含注释与选择器）+ 规则块」切分；可选捕获组会被贪婪的 [^{}]+ 吞掉，
  // 因此统一在前置文本末尾窗口里查找 bounded-data 标记。
  const ruleRe = /([^{}]+)\{([^{}]*)\}/g
  let m
  while ((m = ruleRe.exec(b.raw)) !== null) {
    const prefix = m[1].slice(-400)
    const block = m[2]
    const hasNowrap = /white-space\s*:\s*nowrap/.test(block)
    const hasEllipsis = /text-overflow\s*:\s*ellipsis/.test(block)
    const hasHidden = /overflow\s*:\s*hidden/.test(block)
    if (!(hasNowrap && hasEllipsis && hasHidden)) continue
    if (/\/\*\s*bounded-data\s*:/.test(prefix)) { boundedCount++; continue }
    truncated.push(`${b.file}: {${block.trim().slice(0, 100)}}`)
  }
}
if (truncated.length) {
  add('FAIL', 'G5 多语言换行', `发现 ${truncated.length} 处「nowrap + ellipsis + overflow:hidden」截断三件套`,
    truncated.slice(0, 3).join(' | ') + '｜可变文案一律换行；有界数据需写 /* bounded-data: 理由 */ 显式说明，见 design-principles.md 第六节')
} else {
  add('PASS', 'G5 多语言换行', `可变文案无截断三件套（允许换行）${boundedCount ? `；${boundedCount} 处有界数据已显式标注 bounded-data` : ''}`)
}

// 长标题换行：Popup.vue 的 h2 必须显式 normal + 任意断词
const popupFile = path.join(TARGET, 'src/components/figma/Popup.vue')
const popupSrc = read(popupFile)
if (popupSrc) {
  const ok = /white-space\s*:\s*normal/.test(popupSrc) && /overflow-wrap\s*:\s*anywhere/.test(popupSrc) && /min-height/.test(popupSrc)
  add(ok ? 'PASS' : 'WARN', 'G5 多语言换行', ok ? 'Popup 长标题支持换行 + 安全内边距' : 'Popup 标题未见显式换行规则', 'design-principles.md 第六节')
}

// ── G6 弹层底色口径 ─────────────────────────────────────────────────────────
const themeFile = path.join(TARGET, 'src/theme.css')
const themeSrc = read(themeFile)
if (themeSrc && /van-popup[^}]*background[^}]*!important/i.test(themeSrc.replace(/\/\*[\s\S]*?\*\//g, ''))) {
  add('FAIL', 'G6 弹层口径', 'theme.css 仍全局强制 van-popup 白底 !important',
    '底部 Popup 外层 #F2F3F5 + 内容卡白底；Dialog / 日历 / 级联组件内白底')
} else if (popupSrc) {
  const ok = /#F2F3F5/i.test(popupSrc)
  add(ok ? 'PASS' : 'WARN', 'G6 弹层口径', ok ? 'Popup 外层 #F2F3F5（内容卡由调用方白底）' : 'Popup 未见 #F2F3F5 外层底色')
}

// ── G7 组件交互（静态可判定部分） ───────────────────────────────────────────
const compDir = path.join(TARGET, 'src/components/figma')
for (const c of ['UserCard', 'VehicleCard']) {
  const s = read(path.join(compDir, `${c}.vue`))
  if (!s) continue
  const hasSave = /saveAndContinue/.test(s)
  const hasFocus = /\.focus\s*\(/.test(s)
  const hasPrevent = /mousedown\.prevent/.test(s)
  if (hasSave && hasFocus && hasPrevent) add('PASS', 'G7 组件交互', `${c}「保存并继续」保持聚焦 + 防抢焦点`)
  else add('WARN', 'G7 组件交互', `${c} 的保存并继续聚焦链路不完整`, `saveAndContinue=${hasSave} focus=${hasFocus} mousedown.prevent=${hasPrevent}`)
}
const listCard = read(path.join(compDir, 'ListCard.vue'))
if (listCard) {
  const ok = /addIcon\s*:\s*Boolean/.test(listCard) && !/addIcon\s*:\s*\{\s*type:\s*Boolean[^}]*default:\s*true/.test(listCard)
  add(ok ? 'PASS' : 'WARN', 'G7 组件交互', ok ? 'ListCard 添加按钮默认无加号（按用户空态截图）' : 'ListCard addIcon 默认值需确认')
}

// ── 汇总输出 ────────────────────────────────────────────────────────────────
const fails = results.filter((r) => r.level === 'FAIL')
const warns = results.filter((r) => r.level === 'WARN')
const passes = results.filter((r) => r.level === 'PASS')

if (JSON_MODE) {
  console.log(JSON.stringify({ target: TARGET, pass: fails.length === 0, counts: { pass: passes.length, warn: warns.length, fail: fails.length }, results }, null, 2))
} else {
  console.log(`\n组件复用门禁 check-components`)
  console.log(`目标：${TARGET}\n`)
  for (const r of results) {
    const tag = r.level === 'PASS' ? '  OK  ' : r.level === 'WARN' ? ' WARN ' : ' FAIL '
    console.log(`[${tag}] ${r.gate}｜${r.message}`)
    if (r.detail && r.level !== 'PASS') console.log(`         ${r.detail}`)
  }
  console.log(`\n结果：${fails.length ? 'FAIL' : 'PASS'}  （通过 ${passes.length} / 警告 ${warns.length} / 失败 ${fails.length}）`)
  if (fails.length) console.log('依据：references/design-principles.md 第八节 · components/README.md 第六、七节 · pages/README.md 第四节\n')
}

process.exit(fails.length ? 1 : 0)
