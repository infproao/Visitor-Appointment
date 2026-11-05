---
name: visitor-appointment-prototype
display_name: 访客预约原型生成
display_name_en: Visitor Appointment Prototype
description: 生成海信访客预约移动端 H5 原型页面
description_zh: 基于海信设计 token 与 Vant 4 组件，生成访客预约（预约填报、审批、安保核验、出入登记、通行证、扫码等）移动端 H5 原型。技术栈 Vue3 + Vant 4，多语言中/英/越/泰。
description_en: Generate H5 prototype pages for the Hisense Visitor Appointment product (booking, approval, security check, entry/exit registration, pass, scan) using Hisense design tokens and Vant 4 components. Vue3 + Vant 4, i18n zh/en/vi/th.
examples_zh:
  - "帮我生成访客预约的新建预约表单页面"
  - "生成安保端的出入登记列表页"
  - "做一个通行证二维码页面"
examples_en:
  - "Generate the visitor appointment form page"
  - "Create the security entry/exit registration list page"
  - "Make a visitor pass QR code page"
version: 1.1.0
author: "infproao"
---

# 访客预约原型生成 Skill

生成海信访客预约产品的移动端 H5 原型页面。基于海信设计 token + Vant 4 组件，产出符合产品规范的页面。

## 一、触发条件

当用户请求涉及以下任一时，使用本 Skill：

- 生成「访客预约」相关页面：预约填报、预约记录、通行证、预约详情、审批、出入登记、扫码、门禁控制等
- 关键词：访客预约、访客、预约、通行证、入园、离园、审批、安保、出入登记、Visitor Appointment
- 需要复用海信访客预约的设计规范（青绿主题、Vant 组件、海信 token）时

## 二、资料读取

先读取 `references/README.md`，按其中的来源优先级和读取顺序处理资料。

按需读取以下 references（相对本 Skill 目录）：

| 文件 | 内容 | 何时读 |
|---|---|---|
| `references/README.md` | 统一来源优先级、读取顺序、文件职责和变更规则 | 任何模式开始时必读 |
| `references/product-context.md` | 产品定位、用户与业务知识 | 生成任何页面前必读 |
| `references/design-principles.md` | 设计原则与交互规则 | 生成任何页面前必读 |
| `references/design-tokens.md` | 颜色、字号、间距、圆角等设计变量 | 涉及颜色/尺寸时读 |
| `references/components.md` | 标准组件、状态、用法、组合规范 | 涉及组件选用时读 |
| `references/component-registry.md` | 组件代码路径、Figma映射、强制调用规则和页面依赖 | 生成或修改任何页面前必读 |
| `references/page-generation-decision-tree.md` | 需求确认后的模板匹配和页面生成决策 | 生成任何页面前必读 |
| `references/quality-gates.md` | 需求、组件、视觉和运行质量门禁 | 生成和交付前读 |
| `references/pages.md` | 典型页面与业务场景 | 确定页面结构时读 |
| `references/figma-derived-spec.md` | 从 Figma 节点反推的页面尺寸、组件结构、变量和资源限制 | 使用 Figma 设计稿或要求还原视觉时必读 |
| `references/requirements-input.md` | 需求输入结构、地区字段、资源来源和确认状态 | 用户提供具体页面/地区需求时读 |
| `references/runtime-conditions.md` | 原型技术、运行、资源和扫码限制 | 生成可运行原型时读 |

资产文件（可选，需查看原始设计稿时）：

| 路径 | 内容 |
|---|---|
| 项目 `assets/design-tokens/Mode-1.tokens.json` | 海信原始色板 |
| 项目 `assets/design-files/越南版访客预约填报.svg` | 完整设计稿 |
| 项目 `assets/screenshots/01-09.*` | 设计稿截图 |

## 三、执行流程

0. **先确认范围和模式**：识别用户选择的端、页面、步骤和地区。用户明确限定范围时，只处理该范围，不自动扩展到其他页面或另一端。用户要求“整理资产与规则”时，禁止生成页面代码。
1. **盘点资料**：读取用户提供的 Figma 页面、截图、原始 token 和 references，建立“规则 / 来源 / 确认状态”清单。
2. **识别冲突**：对比设计稿、截图、业务文档和现有 Skill；冲突、截图无法证明或地区差异未提供时，标为待确认，不自行补全。
3. **读取规范**：读取 `references/README.md`，再按读取顺序读取 `product-context.md`、`design-principles.md`、`design-tokens.md`、`figma-derived-spec.md`、`components.md`、`pages.md`、`requirements-input.md` 和 `runtime-conditions.md`。
4. **选组件**：从 `components.md` 选通用组件（Vant）+ 业务组件；弹窗/复合控件按「组合规范」用基础组件拼装，并核对当前 Vant 版本实际导出名称。
5. **生成页面**：仅在范围、字段和关键冲突得到确认后，按 `pages.md` 的页面结构，用 Vant 4 组件 + 海信 token 生成。
6. **校验**：核对主色 `#22BBB3`、灰阶走海信、禁用态 `primary-3`、状态标签色符合映射、圆角/字号/间距符合 token、二维码 ≥ 200px。

## 四、硬性约束（不可违反）

| 约束 | 值 | 状态 |
|---|---|---|
| 技术栈 | Vue3 + Vant 4 | ✅ |
| 主色 | `#22BBB3`（primary-5），设计稿不符处纠正到 token | ✅ |
| 灰阶 | 海信 token「中性灰」，弃 Vant 默认灰 | ✅ |
| 主按钮禁用 | `primary-3` 浅青实色 | ✅ |
| 状态标签色 | 见 `components.md` 状态映射 | ✅ |
| 字号 | 24/20/18/16/14/12，字距 0 | ✅ |
| 圆角 | 12/16/20(Popup)/24 | ✅ |
| 按钮高度 | 大 48px / 中 44px / 小 32px | ✅ |
| 输入框尺寸 | 宽 311px，高 76px（Hug） | ✅ |
| 搜索框尺寸 | 宽 343px，高 56px（Hug） | ✅ |
| 标签高度 | 24px / 28px / 32px | ✅ |
| 间距 | 0 或 4 的倍数，沿用 Vant `4/8/12/16/24/32` | ✅ |
| 二维码 | 最小 200px，静区 16px | 📋 建议 |
| 多语言 | 中/英/越/泰 | ✅ |
| 业务边界 | 手机号按选择区号校验、证件号按选择国家与证件类型校验；具体字段和规则来自需求配置，审批流转仍不在此 Skill 固定 | ✅ |

## 五、输出

- 生成 Vue3 + Vant 4 的可运行 H5 原型。
- 使用模拟数据，不接真实业务接口，除非本次需求明确要求接口。
- 需求整理模式只输出资产、规则、来源和确认状态，不生成页面代码。
- 涉及图片/图标时，输出到 `assets/images/`。

## 六、按需求生成规则

### 6.1 地区不是产品入口

地区只作为当前需求的配置参数。Skill 不创建或写死越南、泰国、中国独立入口，也不把字段固定绑定到语言名称。

当用户提出“创建泰国的访客预约新建页”时，应读取该需求提供的泰国字段、必填状态、选项和校验规则，直接生成对应页面。

### 6.2 校验配置

- 手机号：依据用户选择的区号校验。
- 证件号：依据用户选择的国家和证件类型校验。
- 车牌号：依据当前需求提供的地区规则校验。
- 具体长度、字符集、正则和错误文案若未在需求中提供，必须标记待补充，不得自行编造。

### 6.3 页面范围

用户明确选择多个页面时，只检查和生成这些页面，包括其必要的关联弹窗；不得自动扩展到未选择的端或页面。



## 七、一键起可运行工程（degit）

本 Skill 内置了一个已套好海信主题的可运行工程模板 `templates/project-starter/`。

当用户需要「直接起一个可运行的工程」时，给出以下命令：

```bash
npx degit infproao/Visitor-Appointment/skills/visitor-appointment-prototype/templates/project-starter my-app
cd my-app
npm install
npm run dev
```

模板已内置：
- `references/README.md`：统一引用关系和来源优先级；
- `references/requirements-input.md`：每次需求的字段、资源和校验输入；
- `references/runtime-conditions.md`：运行条件、模拟数据、多语言、二维码和扫码限制；
- `src/theme.css`：海信 token → `--van-*` 变量覆盖；
- `src/main.js`：Vant 组件注册；
- `src/App.vue`：示例页入口；
- `src/components/`：按 Figma 视觉沉淀的通用组件。


## 八、组件强制调用约束

- 生成或修改页面前，必须先读取 `references/component-registry.md`。
- 如果注册表存在对应组件，必须调用该组件，禁止在页面内重复实现同一结构。
- 禁止使用原生 HTML 或默认 Vant 视觉替代已注册的 Figma 组件。
- Vant 只承担基础行为，Figma视觉由项目通用组件实现。
- 页面必须先列出组件依赖；依赖组件为 `pending` 时，不得用临时 HTML 跳过组件沉淀。
- 生成后必须检查是否出现原生 `input`、`button`、`checkbox`、重复卡片结构或默认 Vant 视觉。
- 组件必须完成“补资料 → 实现 → 运行 → Figma对照 → 确认”后才能标记为 `ready`。


## 十、前端范围硬约束

- 本 Skill 只产出前端页面、路由、组件、样式、前端状态、mock 数据和对既有接口的调用。
- 不产出、不设计、不实现数据库、服务端 API、后端鉴权、服务端业务或其他后端服务。
- Demo 默认使用内存数据、本地 fixtures 或假接口。
- 需求输入未提供真实接口时，不询问或设计后端数据源；使用前端 mock 完成展示和交互。
- 既有接口只能由前端调用，不能在本 Skill 中实现接口本身。
