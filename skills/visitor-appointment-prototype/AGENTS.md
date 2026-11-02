# 访客预约原型生成规范（供 AI 编码助手执行）

> 本文件是「访客预约」H5 原型生成的**权威规范入口**。
> 任何 AI 编码助手（Kiro / Cursor / CodeBuddy / Claude Code 等）在生成或修改访客预约相关页面时，
> **必须先通读本文件**，并严格遵守下列硬性约束。详细规范见 `references/` 下的 5 个文档。

## 一、这是什么

海信访客预约产品的移动端 H5 原型。双端：**访客端**（预约填报、通行证）+ **安保端**（出入登记、核验、扫码）。
技术栈固定为 **Vue3 + Vant 4**，多语言 **中 / 英 / 越 / 泰**。

## 二、资料读取顺序（生成任何页面前必读）

按需读取 `references/`（相对本目录）：

| 文件 | 内容 | 何时读 |
|---|---|---|
| `references/product-context.md` | 产品定位、用户与业务知识 | 必读 |
| `references/design-principles.md` | 设计原则与交互规则 | 必读 |
| `references/design-tokens.md` | 颜色、字号、间距、圆角、控件尺寸 | 涉及颜色/尺寸时读 |
| `references/components.md` | 标准组件、状态、组合规范 | 涉及组件选用时读 |
| `references/pages.md` | 19 个典型页面与业务场景 | 确定页面结构时读 |

## 三、硬性约束（不可违反）

| 约束 | 值 |
|---|---|
| 技术栈 | Vue3 + Vant 4 |
| 主色 | `#22BBB3`（海信 primary-5），设计稿不符处一律纠正到 token |
| 主按钮禁用 | `#79DDD1`（primary-3 浅青实色） |
| 灰阶 | 海信「中性灰」gray-1..10，**弃用 Vant 默认灰** |
| 字号 | 24 / 20 / 18 / 16 / 14 / 12，字距统一 0 |
| 圆角 | 12 / 16 / 20(Popup) / 24 |
| 按钮高度 | 大 48px / 中 44px / 小 32px |
| 输入框 | 宽 311px，高 76px（Hug） |
| 搜索框 | 宽 343px，高 56px（Hug） |
| 标签高度 | 24px / 28px / 32px |
| 间距 | 0 或 4 的倍数，沿用 Vant `4/8/12/16/24/32` |
| 二维码 | 最小 200px，静区 16px，深码浅底禁反白 |
| 触摸目标 | ≥ 44px |
| 多语言 | 中 / 英 / 越 / 泰 |

### 核心色板（快速查表）

```
主色 primary-5   #22BBB3    主按钮禁用 primary-3  #79DDD1
成功 green-5     #23C343    警示 warning-5        #FF9A2E
黄昏 gold-5      #F9CC45    错误 danger-5         #F76560
灰阶 gray-1 #F7F8FA  gray-2 #F2F3F5  gray-3 #E5E6EB  gray-4 #C9CDD4
     gray-5 #A9AEB8  gray-6 #86909C  gray-7 #6B7785  gray-8 #4E5969
     gray-9 #272E3B  gray-10 #1D2129
文字主色 #1D2129  文字次色 #4E5969  辅助 #86909C  边框 #E5E6EB  页面背景 #F2F3F5
```

### 状态标签 → 色值映射（业务状态）

| 状态 | 色值 | token |
|---|---|---|
| 已通过 / 入园 | `#23C343` | green-5 |
| 需审核 / 待确认 | `#F9CC45` | gold-5 |
| 待登记 / 审核中 | `#F9CC45` / `#FF9A2E` | gold-5 / warning-5 |
| 未通过 / 已退回 / 已拒绝 | `#F76560` | red-5 |
| 已取消 / 已过期 | `#C9CDD4` | gray-4 |
| 信息提示 | `#E8F3FF` | info-1 |

## 四、组件映射（快速查表）

通用组件直接用 Vant 4；业务组件用基础组件拼装，**不单独新建**。

| 用途 | Vant 组件 |
|---|---|
| 文本输入 / 多行 | `van-field`（textarea） |
| 下拉选择 | `van-picker` / `van-field is-link` |
| 日期 / 时间 | `van-calendar` / `van-date-picker` / `van-time-picker` |
| 数字键盘 | `van-number-keyboard` |
| 复选 / 单选 | `van-checkbox-group` / `van-radio-group` |
| 搜索 | `van-search` |
| 状态标签 | `van-tag` |
| 页签 | `van-tabs` |
| 弹窗 | `van-dialog` / `van-popup` |
| 按钮 | `van-button` |
| 头像 / 上传 | `van-image`（圆形）/ `van-uploader` |
| 筛选 | `van-dropdown-menu` |
| 空状态 | `van-empty` |
| 通知条 | `van-notice-bar` |
| 步进器 / 步骤条 | `van-stepper` / `van-steps` |
| 二维码 | 自定义 + 图片（非 Vant 组件） |
| 扫码取景 | **自定义 ScanFrame**（原生摄像头 + 遮罩 + 取景框 + 相册入口） |

## 五、页面清单（19 个场景，生成前先定位）

**访客端**：预约首页 · 新建预约表单 · 预约记录列表 · 记录空状态 · 通行证二维码 · 失效通行证 · 提交成功 · 预约详情 · 补同意授权弹窗

**安保端**：出入登记列表 · 扫一扫 · 安保详情 · 入境操作弹窗（两步）· 选择随入人员 · 门禁控制 · 筛选弹层

**通用弹窗**：访客须知 · 隐私政策 · 选择弹窗（国籍/性别/证件类型/部门）

## 六、执行流程

1. **确认页面类型**：访客端 / 安保端 / 通用弹窗，对照 `pages.md` 定位。
2. **读规范**：读 `product-context.md` + `design-principles.md` + `design-tokens.md`。
3. **选组件**：从 `components.md` 选通用组件（Vant）+ 业务组件拼装。
4. **生成**：按 token 与组件规范生成页面。
5. **校验**：核对下方清单。

## 七、产出校验清单（每次生成后自查）

- [ ] 主色是否 `#22BBB3`，无 Vant 默认蓝
- [ ] 灰阶是否走海信 gray-1..10，无 Vant 默认灰
- [ ] 禁用主按钮是否 `#79DDD1`（primary-3）
- [ ] 状态标签色是否符合映射表
- [ ] 字号 24/20/18/16/14/12，字距 0
- [ ] 圆角 12/16/20/24；按钮高 48/44/32；标签高 24/28/32
- [ ] 输入框 311×76、搜索框 343×56
- [ ] 间距 0 或 4 的倍数
- [ ] 触摸目标 ≥ 44px
- [ ] 二维码 ≥ 200px，深码浅底

## 八、可运行工程

需要「直接起一个可运行工程」时，用内置模板：

```bash
npx degit infproao/Visitor-Appointment/skills/visitor-appointment-prototype/templates/project-starter my-app
cd my-app && npm install && npm run dev
```

模板已内置 `src/theme.css`（海信 token → `--van-*` 覆盖）、`src/main.js`（Vant 注册）、`src/App.vue`（示例页）。
