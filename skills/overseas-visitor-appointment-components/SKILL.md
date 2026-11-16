---
name: overseas-visitor-appointment-components
display_name: 海外版访客预约 Figma 组件库
description: 海外版访客预约 Figma 设计资产 + Vue3 组件库 + 可运行工程脚手架 + 页面模板；输入结构化需求后识别已有页面 / 组件并直接调用，产出 375 手机端前端原型。
version: 0.3.0
author: infproao
---

# 海外版访客预约 Figma 组件库 Skill

## 一、触发条件

命中以下任一意图时使用本 Skill：

- 生成 / 修改海外版访客预约的 375 手机端前端原型页面；
- 查询或复用本组件库的组件、页面模板、设计变量；
- 按 Figma 设计稿沉淀新组件 / 新页面；
- 校验已生成原型是否复用了组件库（跑 `npm run gate`）。

**交付物**：前端 mock 原型（页面、路由、组件调用、本地资源）。不含数据库、服务端 API、后端鉴权、真实扫码 / 二维码 / 短信 / 审批流、生产部署配置。

## 二、资料读取（按原始结构回归，2026-11-13）

> 结构按用户最初设计：`SKILL.md`（入口）+ `references/` 四个业务语义槽位 + `assets/` 资源槽位 + `templates/project-starter/` 可运行模板。

### 第 1 层：业务语义（**接需求必读，优先于一切流程文档**）

| 顺序 | 文件 | 回答什么 |
|---|---|---|
| 1 | `references/product-context.md` | 产品定位、角色、主流程、业务对象与字段、国家版本、多语言 |
| 2 | `references/design-principles.md` | 设计原则、交互规则、复用总纲、**结果级约束** |
| 3 | `references/design-tokens.md` | 颜色 / 字号 / 行高 / 间距 / 圆角 / 控件尺寸（权威入口） |
| 4 | `references/components/README.md` | 组件清单、选型依据、状态与用法、**逐场景调用核对表** |
| 5 | `references/pages/README.md` | 页面清单、路由、模板工作台、页面模式、**确认页结构基准** |
| 6 | `references/assets/README.md` | 资源槽位映射与本地资源清单 |

### 第 2 层：执行流程（写页面时读）

| 顺序 | 文件 | 回答什么 |
|---|---|---|
| 7 | `references/requirements-input.md` | 需求输入 YAML 结构 |
| 8 | `references/page-generation-decision-tree.md` | 逐页判定 A/B/C/D/E 分支、组件依赖、文件清单 |
| 9 | `references/page-generation-sop.md` | 复制脚手架、生成页面 / 路由 / i18n、构建与实测 |
| 10 | `references/quality-gates.md` | 五道人工门禁 + **`npm run gate` 可执行门禁** |
| 11 | `references/component-registry.md` 第二节 2.0 | 组件调用契约与权威清单 |

### 第 3 层：Figma 事实（**只有两种情况才读**）

> ① 首次沉淀一个全新组件 / 全新页面；② 用户明确说「按设计稿校准」或给了截图且要求逐像素对齐。其余一律不去 Figma 取精确数值。

`references/design-spec-from-figma.md` 第九节 / 9.7 / 11.6（视觉规范基准）、`references/figma-node-index.md`（Node ID → 页面 > 位置 > 名称）、`references/component-fidelity-checklist.md`（还原精度对照）、`references/figma-derived-spec.md`、`references/components.md`、`references/runtime-conditions.md`。

### 第 4 层：历史（追溯用，不是现行规则）

`references/history/decisions.md`（用户逐条裁决）、`references/skill-build-retrospective.md`（P1–P18 复盘）、`references/history/design-tokens-legacy.md`（早期 token 历史值）、`references/component-gap-analysis.md`（历史缺口快照）。

## 三、执行流程

```text
接需求
  ↓
① 先查 src/pages/ 有没有对应页面、模板工作台有没有对应卡片
   再查 components/README.md 与 component-registry.md 2.0 有没有对应组件
  ↓
② 命中 → 只写组装层：在页面里放组件、传 prop、给数据
   （默认只动目标页面 1 个文件；组件内部视觉是已冻结资产，一律不动）
  ↓
③ 组件能力不够 / 未覆盖 → 先输出「缺口 + 2–3 个交互方案 + 推荐项」
   等用户裁决后才动手；裁决后优先用现有 prop，确实缺才补最小 prop
  ↓
④ 生成 / 修改代码 → 从 templates/project-starter/ 复制工程骨架
   （禁止用纯单文件原生 HTML 替代 Vue 组件库工程）
  ↓
⑤ npm run gate        ← 可执行判定，结果级约束逐项检查
   npm run build       ← 构建通过
   浏览器真实点击      ← 组件交互 / 弹层 / 换行 / 无横向滚动 / 控制台零错误
  ↓
⑥ quality-gates.md 五道门禁逐项打勾；未通过项如实标注，不写成已完成
```

**关键顺序**：第 ① 步不能跳。模板 + 组件库是为了**复用**，不是为了每次重新还原设计稿。

## 四、现行硬约束（摘要，完整版见 `design-principles.md`）

1. **复用优先**：命中已有页面 / 组件只写组装层；不去 Figma 重新取数。
2. **页面不得覆盖组件布局模型**：`display` / `flex` / `grid` / `position` / `float` / `padding` 与固定尺寸 / 底色一律走 prop；唯一例外 `:deep(.x) { width: 100% }`。
3. **产物形态**：必须是可运行 Vue 3 + Vite 工程，禁止纯单文件原生 HTML。
4. **逐场景必用组件**：新建预约第二步必须 `UserCard` + `VehicleCard`；确认页必须 `Field state="readonly"` 上下结构 + 同行人 / 车辆汇总；协议必须 `Checkbox` + `Dialog` + `Popup`。完整表见 `components/README.md` 第六节。
5. **禁止自绘**：`.row__label` / `.row__value` 两列、`.tags` / `.vehicles` / `.addbtn`、`document.createElement` 手拼列表、自绘 checkbox / popup / dialog。
6. **不把未确认规则写成事实**：数量上限、字符长度、车牌正则等只来自需求输入；待确认项标「待确认」。
7. **多语言与长标题一律换行**：禁止 `nowrap + ellipsis + overflow:hidden`；三语 `zh` / `en` / `th` key 齐全。
8. **弹层口径**：底部 Popup 外层 `#F2F3F5` + 内容卡白底；`Dialog` / 日历 / 级联组件内白底；协议名 `#00AAA6` 可点；`Dialog` 左「返回」右「同意并继续」。
9. **组件能力不够先问后改**：等用户裁决，不在页面自造结构。
10. **Figma 是视觉唯一来源**，Vant 只提供行为；每个组件绑定 Figma Node ID 且带「页面 > 位置 > 名称」；图标统一 `IconBox`；资源用本地 `src/assets/`。
11. **375 画布、禁止横向滚动**，所有页面 `scrollWidth == clientWidth`。
12. **发布授权不跨轮**：用户未明确要求发布时只做本地验证与打包。

历史裁决原文与依据见 `references/history/decisions.md`；组件契约细则见 `component-registry.md` 第一节规则 1–14。

## 五、工程入口

```text
templates/project-starter/
├── index.html / vite.config.js / package.json / serve.mjs
├── scripts/check-components.mjs        # npm run gate 可执行门禁
└── src/
    ├── main.js / App.vue / router.js / i18n.js / theme.css
    ├── ComponentGallery.vue             # /components 组件库（6 组 37 项）
    ├── DesignSpecPanel.vue              # 规范面板
    ├── components/figma/                # 34 个 .vue，index.js 33 个导出
    ├── pages/                           # 10 个 .vue + 模板工作台（15 张卡）
    └── assets/                          # 本地 Figma 资源
```

| 入口 | 路由 | 用途 |
|---|---|---|
| 组件库 / 模板工作台 | `/components` | 组件独立预览、模板页面平铺、视觉与交互核对 |
| 业务页面原型 | `/`、`/appointment/new`、`/appointment/success`、`/appointment/detail`、`/appointment/records`、`/security/detail`、`/pass`、`/companion` 等 12 条路由 | 需求生成后的可运行原型 |

```bash
cd templates/project-starter
npm install
npm run gate        # 组件复用 / 页面结构 / 多语言 / token 可执行检查
npm run dev         # 本地开发（Vite dev + HMR）
npm run build       # 生产构建
node serve.mjs      # 先构建再静态服务 dist（SPA fallback）
```

`serve.mjs` 供本地与线上预览；线上分享链接由发布工具提供，不属 Skill 内容。

## 六、快速路径（输入需求 → 出项目）

```text
product-context.md / design-principles.md / design-tokens.md   ← 先读业务语义
  → components/README.md（选型 + 调用核对表）
  → pages/README.md（页面模式 + 确认页基准）
  → requirements-input.md（结构化 YAML）
  → page-generation-decision-tree.md（逐页分支 A/B/C/D/E）
  → page-generation-sop.md（复制 project-starter → 生成页面 / 路由 / i18n）
  → npm run gate && npm run build && 浏览器真实点击
  → quality-gates.md（五道门禁）
```

样例需求与试跑结果见 `examples/sample-requirement.yaml`、`examples/sample-run-report.md`。**禁止跳过「先查已有页面 / 组件」直接按截图自造页面结构。**
