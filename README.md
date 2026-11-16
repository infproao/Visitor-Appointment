# 海外版访客预约 Figma 组件库

> 把 Figma 设计稿沉淀为可复用的 Vue 3 组件库、页面模板和可运行工程，用来生成 **375 手机端「访客预约」前端原型**。
>
> 技术栈：Vue 3 + Vant 4 + Vite + Vue Router 4 + vue-i18n
>
> 语言：中 / 英 / 泰 / 越　｜　端：访客端、安保端

## 这是什么

- **复用优先，不每次重画设计稿**：接需求先查已有页面和组件，命中就只写组装层；页面只调用组件注册表里已登记的实现。
- 组件库、页面模板、业务页面并行维护；组件内部视觉是已冻结资产，不按页面复制组件。
- 交付物是前端 mock 原型：页面、路由、组件调用与本地资源；不含后端服务、真实审批和短信/设备能力。

## 快速开始

### 只起可运行工程

```bash
npx degit infproao/Visitor-Appointment/skills/overseas-visitor-appointment-components/templates/project-starter my-app
cd my-app
npm install
npm run dev
```

打开终端输出的本地地址即可看到组件工作台和页面预览。要求 Node 18+。

### 克隆完整仓库

```bash
git clone https://github.com/infproao/Visitor-Appointment.git
cd Visitor-Appointment
```

Kiro 打开仓库根目录后会自动读取根目录的 `AGENTS.md`；先读 `START-HERE.md` 了解当前进度、未完成项和续写方式。

### 在仓库内跑预览与门禁

```bash
cd skills/overseas-visitor-appointment-components/templates/project-starter
npm install
npm run dev      # 组件工作台 + 页面预览
npm run gate     # 组件形态门禁 + 设计 token 越界检查
```

`npm run build` 可验证生产构建。`gate` 的设计 token 基线只拦截**新增**越界，不要求一次性改造存量。

## 在 WorkBuddy / Kiro 中使用

- **WorkBuddy**：把 `skills/overseas-visitor-appointment-components/` 作为 Skill 加载，入口是 `SKILL.md`。
- **Kiro**：打开仓库根目录即可，`AGENTS.md` 是项目级规范入口；不要在 Skill 目录里找另一个 `AGENTS.md`，目前只有根目录这一份。
- **触发词**：访客预约、访客、预约、通行证、入园、离园、审批、安保、出入登记等。
- **生成流程**：读需求输入 → 查页面决策树与组件注册表 → 组装页面 → 跑 `gate` → 浏览器回读校验。

## 目录结构

```text
.
├── AGENTS.md                  # 仓库级 AI 规范入口（Kiro 自动读取）
├── START-HERE.md              # 当前状态、上手路径、续写指令
├── CHANGELOG.md               # 仓库与原型变更记录
├── skills/
│   └── overseas-visitor-appointment-components/
│       ├── SKILL.md           # Skill 契约：触发、读取顺序、执行流程
│       ├── README.md          # 组件库说明与版本变化
│       ├── references/        # Figma 规格、组件注册表、Node 索引、质量门禁
│       └── templates/project-starter/   # 可运行 Vue 3 工程模板
├── docs/                      # 产品现状、构建方案、上下文、评审、发布记录
├── tests/                     # 需求用例、fixtures、验证结果
├── scripts/                   # 发布与打包脚本
└── assets/                    # 设计 token、设计稿 SVG、截图
```

## 关键约束

- **数值以 Figma 节点为准**：`references/design-spec-from-figma.md` 第九节是权威口径；`design-tokens.md` 仅作历史参考，冲突时以第九节为准。
- **禁止截图取色、禁止相似组件类推、禁止 Vant 默认值填空**：颜色查 token 与节点 fill；尺寸逐属性读节点并写进注释。
- **画布固定 375 宽**：弹层最大高度为 `calc(100% - 80px)`；成员选择叠层顶边 92px，底边贴画布底。
- **每个 Figma Node ID 必须带「页面 > 位置 > 名称」**，裸编号不可单独出现在代码或文档里。
- **提交前必须过 `npm run gate`**；涉及组件、页面、`theme.css` 等画面改动，先在预览页确认再提交推送。

## 文档地图

| 文件 | 用途 |
| --- | --- |
| `AGENTS.md` | 仓库级硬约束与工作边界，AI 编码第一入口 |
| `START-HERE.md` | 当前状态、已知过期说明、可直接粘贴的续写指令 |
| `skills/overseas-visitor-appointment-components/SKILL.md` | Skill 契约：何时触发、按什么顺序读资料、如何执行 |
| `references/design-spec-from-figma.md` | 设计数值基准（9.7 数值裁决、11.3 页面清单） |
| `references/component-registry.md` | 组件权威清单、Figma 来源、实现状态 |
| `references/figma-node-index.md` | Node ID → 页面 / 位置 / Figma 名称索引 |
| `references/quality-gates.md` | 组件与页面的执行门禁 |
| `templates/project-starter/` | 可直接 `degit` 的 Vue 3 工程模板 |
| `docs/context/current.md` | 当前进度与待裁决项 |
| `docs/releases/` | 版本发布记录 |
| `CHANGELOG.md` | 原型与 Skill 的完整变更历史 |

## 版本

当前 Skill 版本：**0.3.0（2026-11-13）**。版本变化见 `skills/overseas-visitor-appointment-components/README.md`，仓库变更见 `CHANGELOG.md`。

组件与页面仍在持续迭代，具体状态以 `references/component-registry.md` 和 `docs/context/current.md` 为准，不以 README 的描述作为完成度依据。

## 提交约定

- 不提交 `node_modules/`、`dist/`、`.DS_Store`、Vite 时间戳临时文件与各类同步冲突副本。
- 画面相关改动先在本地预览确认；纯文档改动也先同步说明，再提交。
- 历史旧包 `skills/visitor-appointment-prototype.zip` 仅作归档，不再作为实现来源。
