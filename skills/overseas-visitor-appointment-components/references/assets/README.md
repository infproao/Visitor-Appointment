# 资源槽位（Assets）

> 用户最初设计的原始结构里 `assets/` 分两块：`prototype-template/`（可运行原型模板）与 `images/`（图片、图标等输出资源）。
> 本包在迭代中把两者落到了 `templates/project-starter/` 与其 `src/assets/` 下，被 `README.md` / `SKILL.md` / `page-generation-sop.md` / `serve.mjs` / 发布链路大量引用。
> **为避免破坏工程与发布链路，本轮按原始结构回归时只补语义槽位与索引，不搬动、不复制实体文件**（用户总纲：复用优先、别绕一大圈）。下表是槽位 ↔ 实际路径的权威映射。

## 一、槽位映射

| 原始结构槽位 | 实际路径 | 说明 |
|---|---|---|
| `assets/prototype-template/` | `templates/project-starter/` | 可运行 Vue 3 + Vite 工程骨架（Vant 4 / vue-router / vue-i18n / `serve.mjs`） |
| `assets/images/` | `templates/project-starter/src/assets/` | 本地 Figma 图片、SVG 图标、背景、二维码占位 |

## 二、本地资源清单（`src/assets/`，17 个文件）

| 文件 | 类型 | 用途 |
|---|---|---|
| `bg-image-2.svg` | SVG | 页面背景图 |
| `bg-pattern.svg` | SVG | 背景纹理 |
| `design-security-entry.png` | PNG | 安保端出入登记页视觉 |
| `empty-state.png` | PNG | `EmptyState` 空状态插画 |
| `field-arrow.svg` | SVG | `Field` 只读 / link 态右箭头 |
| `figma-search-icon.svg` | SVG | `Search` 搜索图标 |
| `figma-vehicle-delete.svg` | SVG | `VehicleCard` 删除 |
| `figma-vehicle-edit.svg` | SVG | `VehicleCard` 编辑 |
| `qr-placeholder.png` | PNG | `QRCode` 假码占位（仅展示用） |
| `regulations-banner.png` | PNG | 访客须知横幅 |
| `regulations-illust.png` | PNG | 访客须知插画 |
| `step-dot-complete.svg` | SVG | `Steps` 已完成圆点 |
| `step-dot-waiting.svg` | SVG | `Steps` 待办圆点 |
| `step-line-left.svg` / `step-line-right.svg` | SVG | `Steps` 已完成连接线 |
| `step-line-left-waiting.svg` / `step-line-right-waiting.svg` | SVG | `Steps` 待办连接线 |

## 三、资源使用规则

- **Figma 资源是视觉唯一来源**：组件必须使用本地资源，禁止用字符、Emoji 或 Vant / 浏览器默认图标替代；
- 图标统一走 `IconBox`（`name` / `size` / `color`），SVG path 取设计稿原始 path；`IconBox` 是图标唯一来源；
- 页面背景用本地资源，不用 CSS 渐变替代设计稿背景图；
- 二维码为本地占位、最小展示尺寸 160、假码仅展示，不接真实二维码服务；
- 所有引用用**相对路径**，禁止个人绝对路径与临时 Figma URL；
- 新增资源需同时更新本表与 `component-registry.md` 对应条目备注。

## 四、不在 `assets/` 里的东西

| 项 | 实际位置 | 备注 |
|---|---|---|
| 组件源码 | `templates/project-starter/src/components/figma/` | 31 个 `.vue` + `index.js` |
| 页面源码 | `templates/project-starter/src/pages/` | 10 个 `.vue` |
| 组件库预览 | `templates/project-starter/src/ComponentGallery.vue` | 路由 `/components` |
| 规范面板 | `templates/project-starter/src/DesignSpecPanel.vue` | 组件库内 |
| 三语文案 | `templates/project-starter/src/i18n.js` | `zh` / `en` / `th` |
| 全局样式 / Vant 变量 | `templates/project-starter/src/theme.css` | 尚未按 9.7 全量同步 |
| Skill 包离线副本 | `templates/project-starter/public/visitor-skill-package.bin` | 与仓库 `.zip` 同 md5，供不能跑 npm 的环境下载 |
| 参考样例 | `examples/` | 不参与构建与路由 |
