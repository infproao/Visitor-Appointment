# 海外版访客预约 Figma 组件库 Skill

## 用途

本包把 Figma 设计稿沉淀为 Vue3 组件库，并提供「**输入结构化需求 → 识别已有页面 / 组件并直接调用 → 生成可运行 375 手机端前端原型**」的完整链路。

- **模板 + 组件库是为了复用，不是每次重新还原设计稿**（用户 2026-11-12 裁决）。组件内部视觉是已冻结资产；接需求先查已有页面 / 组件，命中就只写组装层。
- 组件、页面模板、业务页面**并行维护**；页面只能复用组件库已注册组件，不按页面复制组件。
- 现有已实现组件**均可用于页面与页面模板搭建**；`pending` / `ready` 只表示 Figma 逐项截图对照进度，不是可用性门槛。
- 交付物是前端 mock 原型：包含页面、路由、组件调用与本地资源，不含后端服务与真实设备能力。

## 当前版本

```text
0.3.0
```

版本变化：

- **0.3.0（2026-11-13）**：按用户最初设计的结构回归信息架构 —— 补齐 `product-context.md` / `design-principles.md` / 重写 `design-tokens.md` 为权威入口 / `components/` 与 `pages/` 各一篇总览 / `assets/` 资源索引；`SKILL.md` 瘦身为触发条件、资料读取与执行流程，历史裁决归档到 `history/decisions.md`；新增**可执行门禁 `npm run gate`** 与逐场景组件调用核对表，解决跨模型执行时产出纯单文件 HTML、确认页左右两列、同行人/车辆自绘的问题。
- 0.2.0：去掉「只能调用 ready 组件」「不包含页面模板 / 页面路由」的旧口径；补齐决策树、SOP、样例需求与端到端试跑；注册表与 `index.js`、组件画廊三方对齐。

## 当前内容

```text
SKILL.md                                  触发条件 / 资料读取（4 层）/ 执行流程 / 现行硬约束
README.md
references/
  ── 第 1 层：业务语义（接需求必读）──
  product-context.md                     产品定位、角色、主流程、业务对象与字段、国家版本、多语言
  design-principles.md                   设计原则、交互规则、复用总纲、结果级约束
  design-tokens.md                       颜色 / 字号 / 行高 / 间距 / 圆角 / 控件尺寸（权威入口）
  components/README.md                   组件清单、选型依据、API、逐场景调用核对表、禁止自绘清单
  pages/README.md                        页面清单、路由、模板工作台、页面模式、确认页结构基准
  assets/README.md                       资源槽位映射与本地资源清单
  ── 第 2 层：执行流程 ──
  requirements-input.md                  需求输入 YAML
  page-generation-decision-tree.md       逐页判定模板匹配、组件依赖、输出文件清单
  page-generation-sop.md                 生成 SOP + 可执行门禁 + 验收清单 + 样例试跑记录
  quality-gates.md                       npm run gate + 需求 / 模板 / 组件 / 视觉 / 运行五道门禁
  component-registry.md                  组件调用契约（权威清单，规则 1–14）
  ── 第 3 层：Figma 事实（只在新沉淀 / 明确要求校准时读）──
  design-spec-from-figma.md              视觉规范基准（第九节 / 9.7 / 11.6）
  figma-node-index.md                    Node ID → 「所在页面 > 位置 > Figma 名称」
  component-fidelity-checklist.md        还原精度对照
  figma-derived-spec.md / components.md / runtime-conditions.md
  ── 第 4 层：历史（追溯，不是现行规则）──
  history/decisions.md                   用户逐条裁决归档
  history/design-tokens-legacy.md        早期海信 token 历史值
  skill-build-retrospective.md           P1–P18 搭建过程复盘
  component-gap-analysis.md              历史缺口分析（快照）
templates/project-starter/              可运行工程（Vite 5 / Vue 3 / Vant 4 / vue-router / vue-i18n / serve.mjs）
  scripts/check-components.mjs           npm run gate：组件复用 / 页面结构 / 多语言 / 弹层
  scripts/check-tokens.mjs               npm run gate：设计变量越界（基线只拦新增）
  scripts/token-baseline.json             存量越界基线
  src/components/figma/                 34 个 .vue，index.js 33 个导出
  src/ComponentGallery.vue              /components 组件库，6 组 37 项
  src/pages/                            10 个页面 .vue + 模板页面工作台（15 张卡片）
  src/router.js                         12 条路由
  src/assets/                           本地 Figma 背景、图标、二维码占位等资源
examples/sample-requirement.yaml        一条可试跑的结构化需求
examples/sample-decision.yaml           逐页决策表（A/B/C/E 四个分支）
examples/generated/                    样例生成产物（RegulationsConfirmPage.vue）
examples/sample-run-report.md           端到端试跑报告（构建 + 真实点击实测）
```

`examples/` 是**参考样例**，不参与可运行工程的路由与构建。

> **结构说明**：用户最初设计的 `assets/prototype-template/` 与 `assets/images/` 实际落在 `templates/project-starter/` 与 `src/assets/`，被工程与发布链路大量引用，本轮**只补语义槽位与索引，不搬动实体文件**。映射见 `references/assets/README.md`。

## 怎么用（输入需求 → 出项目）

1. 先读 `references/product-context.md` → `design-principles.md` → `design-tokens.md` → `components/README.md` → `pages/README.md`（业务语义层）。
2. **先查已有页面 / 组件**：`src/pages/`、模板工作台、`component-registry.md` 第二节。命中 → 只写组装层，不去 Figma 重新取数。
3. 组件能力不够或未覆盖 → 先输出「缺口 + 2–3 个交互方案 + 推荐项」，**等用户裁决后**才动手。
4. 按 `requirements-input.md` → `page-generation-decision-tree.md` → `page-generation-sop.md` 复制 `templates/project-starter/`，生成页面、路由、i18n 与 mock 数据。
5. **`npm run gate`**（可执行门禁，0 FAIL）→ `npm run build` → 浏览器真实点击验证。
6. 按 `quality-gates.md` 五道门禁逐项打勾；未通过项如实标注，不写成已完成。

```bash
cd templates/project-starter
npm run gate          # 组件复用 / 页面结构 / 多语言 / token 检查
node scripts/check-components.mjs --target <外部产物目录>   # 校验其它模型的生成结果
```

## 不包含

- 数据库、服务端 API、后端鉴权；
- 真实扫码、真实二维码服务、真实短信 / 审批流；
- 生产环境部署配置（线上分享链接由发布工具提供，不属 Skill 内容）。

## 运行

```bash
cd templates/project-starter
npm install
npm run gate       # 交付前必跑
npm run dev        # 本地开发（Vite dev + HMR）
npm run build      # 生产构建
node serve.mjs     # 启动前先构建，再静态服务 dist（带 SPA fallback）
```

组件库预览：`/components`；模板页面工作台：组件库「典型页面 > 模板页面」。
