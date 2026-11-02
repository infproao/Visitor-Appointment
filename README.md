# 访客预约 Skill（Visitor Appointment Skill）

> 海信访客预约 H5 原型的生成 Skill。技术栈 Vue3 + Vant 4，多语言中/英/越/泰，双端（访客端 + 安保端）。
> 本仓库包含：Skill 定义 + 设计变量/组件/页面规范 + 设计资产（token/SVG/截图）+ 构建文档。

## 目录结构

```
.
├── skills/
│   └── visitor-appointment-prototype/   ← Skill 本体
│       ├── SKILL.md                     ← 触发条件、资料读取、执行流程
│       ├── AGENTS.md                    ← AI 编码助手规范入口（Kiro 等自动加载）
│       ├── references/
│       │   ├── product-context.md       ← 产品定位、用户与业务知识
│       │   ├── design-principles.md     ← 设计原则与交互规则
│       │   ├── design-tokens.md         ← 颜色/字号/间距/圆角/控件尺寸
│       │   ├── components.md            ← 标准组件、状态、组合规范
│       │   └── pages.md                 ← 典型页面与业务场景
│       ├── manifest.yaml               ← 发布元信息
│       ├── templates/
│       │   └── project-starter/        ← 可运行工程模板（degit 一键起工程，内含 AGENTS.md）
│       ├── assets/
│       │   └── images/                 ← 图片/图标资源（成功对勾/二维码/空状态）
├── assets/
│   ├── design-tokens/Mode-1.tokens.json ← 海信设计 token（色板）
│   ├── design-files/                    ← 完整设计稿 SVG
│   └── screenshots/                     ← 设计稿截图
├── 访客预约-Skill构建方案.md             ← 资产与规则清单（定稿结论）
├── HANDOFF.md                           ← 交接状态 + 待办 + 验收标准
└── README.md                            ← 本文件
```

## 如何使用这个 Skill

1. 将 `skills/visitor-appointment-prototype/` 作为 Skill 加载到 WorkBuddy 或 Kiro。
2. Skill 触发关键词：访客预约、访客、预约、通行证、入园、离园、审批、安保、出入登记等。
3. Skill 会按 `SKILL.md` 的执行流程，读取 `references/` 下的规范，用 Vant 4 组件 + 海信 token 生成页面。

## 在 Kiro 中继续执行

Kiro（字节 AI IDE）不认 WorkBuddy 的 `SKILL.md`/`manifest.yaml` 加载机制，但它会**自动加载项目根目录的 `AGENTS.md`**。本 Skill 已内置该入口，让 Kiro 直接按你配置好的规范执行。

**方式一：克隆整个仓库（拿到完整规范，推荐）**

```bash
git clone https://github.com/infproao/Visitor-Appointment.git
```

克隆后，`skills/visitor-appointment-prototype/AGENTS.md` 会被 Kiro 自动识别并遵守；若需要更细的规范，Kiro 可按 `AGENTS.md` 指引读取 `references/` 下的 5 个文档。

**方式二：只起可运行工程（开写页面）**

```bash
npx degit infproao/Visitor-Appointment/skills/visitor-appointment-prototype/templates/project-starter my-app
cd my-app && npm install && npm run dev
```

工程模板内也内置了精简版 `AGENTS.md`，Kiro 在工程内续写页面时同样遵守海信 token 与组件规范。

**给 Kiro 的续写指令（可直接粘贴）**

> 读取 `skills/visitor-appointment-prototype/AGENTS.md`，严格遵守其中的硬性约束与组件映射，用 Vue3 + Vant 4 + 海信 token（主色 `#22BBB3`）继续生成访客预约页面。多语言中/英/越/泰，双端（访客端 + 安保端）。

> 注意：仓库需为 public，否则 Kiro 的 `git clone`/`degit` 会因认证失败拉取不到。

## 一键启动（可运行工程）

基于内置模板 `templates/project-starter/` 一键生成 Vue3 + Vant 4 可运行工程：

```bash
npx degit infproao/Visitor-Appointment/skills/visitor-appointment-prototype/templates/project-starter my-app
cd my-app
npm install
npm run dev
```

生成后即可在浏览器打开 `npm run dev` 输出的本地地址，看到已套用海信 token（主色 `#22BBB3`）与 Vant 4 组件的示例页面。

## 设计规范核心结论

| 项 | 值 |
|---|---|
| 技术栈 | Vue3 + Vant 4 |
| 主色 | `#22BBB3`（海信 primary-5） |
| 灰阶 | 海信「中性灰」gray-1..10 |
| 字号 | 12/14/16/18/20/24 |
| 圆角 | 12/16/20(Popup)/24 |
| 按钮 | 大 48 / 中 44 / 小 32 |
| 标签 | 24 / 28 / 32 |
| 间距 | 0 或 4 的倍数，沿用 Vant `4/8/12/16/24/32` |
| 输入框 | 311×76（Hug） |
| 多语言 | 中/英/越/泰 |

> 详细规范见 `skills/visitor-appointment-prototype/references/`。
> 标注约定：✅ 已确认 / ⚠️ 待确认 / 📋 方案建议。

## 版本信息

| 项 | 值 |
|---|---|
| 当前版本 | `1.1.0` |
| 发布日期 | 2026-11-02 |
| 作者 | `infproao` |
| 状态 | 可发布 / 可安装 |

## 更新日志（Changelog）

### v1.1.0（2026-11-02）

新增 Kiro 等 AI 编码助手的原生入口，让 Skill 可跨工具按已配置规范执行。

**新增**

- 新增 `skills/visitor-appointment-prototype/AGENTS.md`：AI 编码助手规范入口（硬性约束 / 核心色板 / 组件映射 / 页面清单 / 校验清单）。
- 新增工程模板内 `templates/project-starter/AGENTS.md`：工程内精简版规范，degit 起工程后 Kiro 仍遵守海信 token 与组件规范。
- README 补充「在 Kiro 中继续执行」用法（clone 完整仓库 / degit 起工程 / 续写指令）。

### v1.0.0（2026-10-28）

首个可发布、可安装版本。

**新增**

- 建立 Skill 本体 `SKILL.md`：触发条件、资料读取顺序、执行流程与硬性约束。
- 新增 5 个规范文档：`product-context.md`、`design-principles.md`、`design-tokens.md`、`components.md`、`pages.md`。
- 新增发布元信息 `manifest.yaml`（分类 / 标签 / 触发词 / 入口）。
- 新增可运行工程模板 `templates/project-starter/`（Vue3 + Vant 4 + Vite，支持 degit 一键起工程）。
- 新增图标/图片资源 `assets/images/`（成功对勾、二维码占位、空状态插画）。

**设计规范定稿**

- 主色确定为海信 primary-5 `#22BBB3`，禁用主按钮为浅青实色 primary-3。
- 灰阶采用海信「中性灰」gray-1..10。
- 字号 12/14/16/18/20/24，圆角 12/16/20(Popup)/24。
- 按钮三档 48/44/32，标签三档 24/28/32。
- 间距 0 或 4 的倍数，沿用 Vant `4/8/12/16/24/32`。
- 状态标签色映射已确认：已通过 `#23C343`、需审核 `#F9CC45`、未通过 `#F76560`、已过期 `#C9CDD4`。
- 输入框 311×76（Hug），搜索框 343×56（Hug）。

## 待办

- [x] 填充可运行模板（已移至 `templates/project-starter/`，支持 degit）
- [x] 填充 `images/` 图标资源（成功对勾 / 二维码占位 / 空状态插画）
- [x] 确认剩余 ⚠️ 待确认项（状态标签色映射已确认、搜索框高度 56px 已确认）

> 全部待办已完成。剩余可选优化：补充访客须知横幅插画、相机/搜索/编辑/删除等图标。
