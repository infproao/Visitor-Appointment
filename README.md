# 访客预约 Skill（Visitor Appointment Skill）

> 海信访客预约 H5 原型的生成 Skill。技术栈 Vue3 + Vant 4，多语言中/英/越/泰，双端（访客端 + 安保端）。
> 本仓库包含：Skill 定义 + 设计变量/组件/页面规范 + 设计资产（token/SVG/截图）+ 构建文档。

## 目录结构

```
.
├── skills/
│   └── visitor-appointment-prototype/   ← Skill 本体
│       ├── SKILL.md                     ← 触发条件、资料读取、执行流程
│       ├── references/
│       │   ├── product-context.md       ← 产品定位、用户与业务知识
│       │   ├── design-principles.md     ← 设计原则与交互规则
│       │   ├── design-tokens.md         ← 颜色/字号/间距/圆角/控件尺寸
│       │   ├── components.md            ← 标准组件、状态、组合规范
│       │   └── pages.md                 ← 典型页面与业务场景
│       ├── manifest.yaml               ← 发布元信息
│       ├── templates/
│       │   └── project-starter/        ← 可运行工程模板（degit 一键起工程）
│       ├── assets/
│       │   └── images/                 ← 图片/图标资源（成功对勾/二维码/空状态）
│       └── references/                 ← 5 个规范文档
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

## 待办

- [x] 填充可运行模板（已移至 `templates/project-starter/`，支持 degit）
- [x] 填充 `images/` 图标资源（成功对勾 / 二维码占位 / 空状态插画）
- [x] 确认剩余 ⚠️ 待确认项（状态标签色映射已确认、搜索框高度 56px 已确认）

> 全部待办已完成。剩余可选优化：补充访客须知横幅插画、相机/搜索/编辑/删除等图标。
