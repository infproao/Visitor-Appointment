# 页面生成 SOP（输入需求 → 输出可运行原型）

> 本文件是「输入结构化需求 → 生成项目」的**执行手册**。`SKILL.md` 的读取顺序：需求 YAML → 注册表 2.0 → 决策树 → **本 SOP** → 质量门禁。
>
> 前置：已按 `page-generation-decision-tree.md` 产出**逐页决策表**（G0–G5）。没有决策表不进入本流程。

## 步骤总览

| # | 步骤 | 产物 | 对应门禁 |
|---|---|---|---|
| 1 | 解析需求 YAML、校验 G0 | `decision.yaml` 逐页决策表 | 需求门禁 |
| 2 | 复制 `templates/project-starter/` 到目标目录 | 可运行工程骨架 | — |
| 3 | 按分支 A/B/C/D/E 生成页面 | `src/pages/*.vue` | 模板门禁 |
| 4 | 接入路由 | `src/router.js` | 运行门禁 |
| 5 | 补三语文案与 mock 数据 | `src/i18n.js`、页面内 mock | 需求门禁 |
| 6 | 只复用注册组件、保留组件交互 | 组件调用代码 | 组件门禁 |
| 7 | 视觉与运行约束自检 | `theme.css` / `src/assets/` | 视觉门禁 |
| 8 | **跑可执行门禁** | `npm run gate` 结果 | 组件 / 视觉门禁 |
| 9 | 安装依赖并构建 | `dist/` | 运行门禁 |
| 10 | 浏览器真实点击验证 | 实测记录 | 运行门禁 |
| 11 | 按 `quality-gates.md` 逐项打勾 | 验收记录 | 全部 |

## 1. 解析需求 YAML

读取 `references/requirements-input.md` 的字段结构，逐页写决策表。**不得写死国家字段组合**：`country` / `languages` / `fields` / `validation` / `assets` 都来自本次输入。

- 未指定 `languages` → `zh/en/th` 默认；
- `confirmationStatus: pending` 的字段仍可生成输入控件，但错误文案、正则、资源不得写成已确认事实；
- 用户只要「整理资产和规则」→ **停在整理结果**，不复制脚手架、不写页面代码。

决策表模板见 `page-generation-decision-tree.md` 第五节。

## 2. 复制工程骨架

```bash
SRC=<Skill 包>/templates/project-starter
DST=<目标目录>
mkdir -p "$DST"
rsync -a "$SRC"/ "$DST"/ \
  --exclude node_modules/ --exclude dist/ \
  --exclude 'vite.config.js.timestamp-*' --exclude '*.log' \
  --exclude public/visitor-skill-package.bin
```

要点：

- 保留 `index.html` / `vite.config.js` / `serve.mjs` / `package.json` / `src/`；
- **不要**把 `node_modules`、`dist`、Vite 时间戳文件、Skill 包下载副本带进新项目；
- 目标目录内 `npm install`（或软链已安装的 `node_modules` 做快速试跑）；
- 所有资源引用用相对路径，禁止个人绝对路径与临时 Figma URL。

## 3. 按分支生成页面

### 分支 A 套模板

1. 复用决策表里的 `template` 页面 `.vue` 与现有路由，**不改结构**；
2. 只替换：三语文案、mock 数据、`src/assets/` 里本次需求确认的资源；
3. 页面里已有的组件交互（语言切换、须知弹层、日期、下拉、级联、成员选择、Dialog）**全部保留**。

### 分支 B 改模板

1. 在同一页面 `.vue` 内增删**已注册组件**调用；
2. 字段可见性用 `fields[].visibleWhen`，不要写死国家判断；
3. 不新建一份同类组件，不复制组件内部 CSS。

### 分支 C 新建页面

1. 新建 `src/pages/<Name>.vue`，结构固定为「375 画布容器 + 页头 + 内容区 + 底部操作区」；
2. 只用 `component-registry.md` 2.0 表里的组件，统一从 `../components/figma/<Name>.vue` 引入；
3. 页面只负责**布局 + 组件编排 + 数据**：不写 `field-*` / `figma-*` 内部样式，不自绘 checkbox / popup / 按钮；
4. 交互来自组件自身：例如 `Checkbox` 用 `v-model`、`Dialog` 用 `v-model:show` + `@confirm`、`Popup` 用 `v-model:show`；**不要**把组件当静态图；
5. 模板工作台若需新增入口，改 `SpecialPagesPreview.vue` 的卡片数组；组件库若需新增预览，改 `ComponentGallery.vue` 的 `groups`（同时回写注册表 2.0）。

### 分支 D 补组件

顺序不可调换：

```text
定位 Figma 节点（给「所在页面 > 位置 > Figma 名称」，不写裸 Node ID）
  → 逐属性读（尺寸 / padding / itemSpacing / 圆角 / fills / strokes / 文字样式）
  → 新建 src/components/figma/<Name>.vue（Vant 只提供行为）
  → index.js 导出 + ComponentGallery.vue 分组条目
  → component-registry.md 2.0 表登记（状态 pending）
  → 浏览器 getBoundingClientRect + getComputedStyle 回读，差值 > 1px 不通过
  → 回到分支 C
```

### 分支 E 越界

只在决策表 `excluded` 段记录原因（真实扫码 / 后端 / PC 1024 / 无来源资源等），**不生成代码、不编造数据**。

## 4. 接入路由

```js
// src/router.js
import RegulationsConfirmPage from './pages/RegulationsConfirmPage.vue'
// ...
{ path: '/regulations/confirm', name: 'regulations-confirm', component: RegulationsConfirmPage }
```

- 用 `createWebHistory()`，线上由 `serve.mjs` 的 SPA fallback 保证刷新可达；
- 新页面同时挂到 `/components` 的「典型页面」分组，方便用户核对；
- 页面之间用 `router.push` 或组件事件跳转，不写整页 `location.href`。

## 5. 三语文案与 mock 数据

- `src/i18n.js` 的 `zh` / `en` / `th` **三个语言对象都要补同一组 key**，缺一个就会在控制台出现 `vue-i18n missing key` 警告；
- 新增文案按模块挂 key（如 `regulation.title`），不要塞进已有 key 的长字符串里；
- 协议类链接用「前缀 key + 链接 key」拆分，链接色固定海信绿 `#00AAA6`；
- 校验规则（手机号 / 证件 / 车牌）只实现需求输入里给出的正则与错误文案，没给就只做输入与展示；
- 一律 mock 数据，不写后端请求。

## 6. 组件复用硬约束

| 检查 | 通过标准 |
|---|---|
| 组件来源 | 全部来自注册表 2.0；`ListCard` 内部基座不得被页面直接引用 |
| 命名 | 用 `AppointmentRecordCard`（不是 `RegistrationCard`）；图标用 `IconBox name="scan-qr-code"` |
| 交互 | 弹层、回填、选中态、删除 / 清空均可用，组件不是静态图 |
| 弹层定位 | 使用 `usePopupTeleport()` 的组件自动挂进 `.figma-phone`；页面里裸 `van-popup` 必须显式 `:teleport` |
| 复选框 | 统一 `Checkbox.vue`，页面与 `MemberSelectionFlow` 都不自绘 `.checkbox` |
| 视觉 | 不用 Vant 默认视觉；不复制组件内部 CSS；不用字符 / 默认图标替代 Figma 资源 |

## 7. 视觉与运行约束自检

- 375 基准；`html, body, #app { overflow-x: clip; max-width: 100vw }`，所有页面**仅上下滚动**；
- 颜色 / 字号 / 行高 / 间距 / 圆角取 `design-spec-from-figma.md` 第九节 / 9.7 / 11.6；
- 搜索框两种样式：不带下拉 **32 高 r17**、带 `#prefix` 下拉 **40 高 r4**；
- `SelectList` 弹层调用带 `padded`；级联 tab **44 高、无分割线**；已选 tag **28 高**；同行人 **16px、最多 5 个**；
- 背景与图标使用 `src/assets/` 本地资源（设计稿背景图，不用 CSS 渐变替代）；
- 二维码为本地占位、最小 160、仅展示；
- 无 `t is not a function`（页面需 `const { t } = useI18n()`）、无 `steps` 未定义等运行时错误。

## 8. 跑可执行门禁（2026-11-13 新增）

**构建之前先跑**，用脚本判定结果级约束，不要只靠人工打勾：

```bash
cd <目标目录>
npm run gate
```

`npm run gate` = `check-components.mjs` + `check-tokens.mjs`，逐项检查：产物形态（必须是 Vue 工程，禁止纯单文件 HTML）、新建预约必用 `UserCard` / `VehicleCard` / `Field readonly` 等 6 类组件、禁止自绘两列确认页与 tag / 车辆 / 添加按钮、禁止自造业务上限、布局覆盖告警、多语言截断三件套、弹层底色、保存并继续聚焦、设计变量越界。

- **有 FAIL 就停下修**，不要靠删代码或加豁免绕过；
- 有界数据的单行省略写 `/* bounded-data: 理由 */` 显式标注；
- 存量设计值越界由 `scripts/token-baseline.json` 豁免，只拦新增；
- 检查其它模型生成的产物：`node scripts/check-components.mjs --target <产物目录>`；
- 完整依据见 `quality-gates.md` 第零节、`design-principles.md` 第八节、`components/README.md` 第六、七节、`pages/README.md` 第四节。

## 9. 安装与构建

```bash
cd <目标目录>
npm install
npm run build 2>&1 | tee /tmp/build-generated.log
grep -E 'dist/assets/index-.*\.(js|css)|built in' /tmp/build-generated.log
```

- 记录产物指纹 `index-xxx.js` / `index-xxx.css`；
- 构建失败先看 `vue-i18n missing key`、组件导入路径、模板编译错误，不靠删代码绕过；
- 本地预览 `npm run dev` 或 `node serve.mjs`（后者启动时先 build 再静态服务，带 SPA fallback）。

## 10. 浏览器真实点击验证

使用无头 Chrome + CDP（Node 22 原生 `WebSocket`，无需 `ws` 模块）：

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --no-sandbox --disable-gpu \
  --remote-debugging-port=9222 --user-data-dir=/tmp/cdp-<run> \
  --window-size=1440,900 about:blank
```

逐项验证并留证据：

1. 新路由可直接打开且渲染出预期文案（DOM 断言）；
2. 真实点击：勾选 `Checkbox` → 点提交/下一步 → 未满足时弹 `Dialog` 且不推进；满足后进入下一状态；
3. 弹层 `getBoundingClientRect()` 落在 375 画布内、`z-index` 正确、无水平偏移；
4. `getComputedStyle()` 回读关键数值（高度 / 字号 / 颜色 / padding）；
5. 所有页面 `scrollWidth == clientWidth`；
6. 控制台无 `Uncaught` / `TypeError` / `[Vue warn]` / vue-i18n missing key（`CVDisplayLinkCreateWithCGDisplay failed` 为无头模式固有噪音，可忽略）。

## 11. 验收清单（交付前逐项打勾）

```yaml
delivery:
  decision_table: passed        # 逐页分支 A/B/C/D/E + 组件依赖 + 文件清单
  skeleton: passed              # 复制 project-starter，未带入 node_modules / dist / 时间戳
  pages: ["<新增或修改的页面>"]
  routes: ["<新增路由>"]
  i18n: [zh, en, th]            # 三语 key 齐全
  components_from_registry: passed
  component_interactions: passed
  visual: passed                # 375 / 仅上下滚动 / 规范值 / 本地资源
  gate: passed                  # npm run gate，0 FAIL
  build: passed                 # dist 指纹 + built in
  browser: passed               # 路由 / 点击 / 回读 / 控制台
  quality_gates: passed         # 需求 / 模板 / 组件 / 视觉 / 运行
  excluded: ["<分支 E 项与原因>"]
  evidence:
    build_fingerprint: "assets/index-xxx.js"
    console_errors: []
```

未通过项必须**如实标注 `pending` + 原因**，不得写成 `passed`。

## 附录 A：常见错误与修复

| 现象 | 根因 | 修复 |
|---|---|---|
| 白屏 `Uncaught TypeError: _ctx.t is not a function` | 页面漏 `const { t } = useI18n()` | 补 i18n 绑定；同时检查 `steps` 等 computed 是否定义 |
| 控制台 `vue-i18n missing key` | 只补了中文，漏 en / th | 三个语言对象同步补 key |
| 弹窗右移 / 下拉像未触发 | Vant Popup 默认 teleport 到 `body`，画布内绝对定位规则失效 | 用 `usePopupTeleport()`，或给 `van-popup` 显式 `:teleport` |
| 页面能左右滚动 | 新页面没继承 `overflow-x: clip` | 用 `clip` 而非 `hidden`，避免破坏 sticky 导航 |
| 线上仍是旧构建 | 沙箱排除 `dist`，`vite preview` 服务旧产物 | 用 `serve.mjs`（启动先 build 再静态服务） |
| 线上下载包 403 | WAF 拦 `.zip` | 下载副本改名 `.bin`，响应头返回 `.zip` 文件名 |
| 组件没交互 | 把组件当静态图，只渲染不绑定事件 | 接 `v-model` / `@confirm` / `@select` 等组件既有契约 |

## 附录 B：样例需求试跑

样例：`examples/sample-requirement.yaml`（访客端、越南、3 页：1 个 A 分支 + 1 个 B 分支 + 1 个 C 分支 + 1 个 E 排除项）。

试跑结果见 `examples/sample-run-report.md`：决策表、生成文件清单、构建指纹、浏览器实测与门禁打勾。
