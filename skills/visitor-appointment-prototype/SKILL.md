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

按需读取以下 references（相对本 Skill 目录）：

| 文件 | 内容 | 何时读 |
|---|---|---|
| `references/product-context.md` | 产品定位、用户与业务知识 | 生成任何页面前必读 |
| `references/design-principles.md` | 设计原则与交互规则 | 生成任何页面前必读 |
| `references/design-tokens.md` | 颜色、字号、间距、圆角等设计变量 | 涉及颜色/尺寸时读 |
| `references/components.md` | 标准组件、状态、用法、组合规范 | 涉及组件选用时读 |
| `references/pages.md` | 典型页面与业务场景 | 确定页面结构时读 |

资产文件（可选，需查看原始设计稿时）：

| 路径 | 内容 |
|---|---|
| 项目 `assets/design-tokens/Mode-1.tokens.json` | 海信原始色板 |
| 项目 `assets/design-files/越南版访客预约填报.svg` | 完整设计稿 |
| 项目 `assets/screenshots/01-09.*` | 设计稿截图 |

## 三、执行流程

1. **确认页面类型**：判断用户要的页面属于「访客端 / 安保端 / 通用弹窗」哪类，对照 `pages.md` 定位。
2. **读取规范**：读取 `product-context.md` + `design-principles.md` + `design-tokens.md`，明确主色、灰阶、字号、间距、圆角。
3. **选组件**：从 `components.md` 选通用组件（Vant）+ 业务组件；弹窗/复合控件按「组合规范」用基础组件拼装。
4. **生成页面**：按 `pages.md` 的页面结构，用 Vant 4 组件 + 海信 token 生成。
5. **校验**：核对主色 `#22BBB3`、灰阶走海信、禁用态 `primary-3`、状态标签色符合映射、圆角/字号/间距符合 token、二维码 ≥ 200px。

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
| 业务边界 | 车牌/证件/手机号校验、审批流转不在此 Skill 限制 | ✅ |

## 五、输出

- 生成可运行的原型（Vue3 + Vant 4），或可编辑的设计稿。
- 涉及图片/图标时，输出到 `assets/images/`。

## 六、一键起可运行工程（degit）

本 Skill 内置了一个已套好海信主题的可运行工程模板 `templates/project-starter/`。

当用户需要「直接起一个可运行的工程」时，给出以下命令：

```bash
npx degit infproao/Visitor-Appointment/skills/visitor-appointment-prototype/templates/project-starter my-app
cd my-app
npm install
npm run dev
```

模板已内置：
- `src/theme.css`：海信 token → `--van-*` 变量覆盖（主色/灰阶/状态色/字号/圆角/按钮/间距）
- `src/main.js`：Vant 组件注册
- `src/App.vue`：示例页（新建预约表单 + 按钮三档 + 状态标签）

