# 典型页面与业务场景（Pages）

> 本文件是 `references/pages/` 槽位的**单篇总览**（用户 2026-11-13 裁决「合写一篇总览」，不拆成多篇）。
> 内容 = 页面清单 + 路由 + 模板工作台 + **页面模式** + **确认页结构基准** + 缺页登记。
> 接需求时先在这里找「有没有对应页面 / 模板卡片」，命中就只写组装层，不去 Figma 重新取数（见 `design-principles.md` 第一、二节）。

## 一、当前页面清单

`templates/project-starter/src/pages/` 共 **10 个 `.vue`**，`src/router.js` 共 **12 条路由**，模板工作台 **15 张卡片**（2026-11-13 新增 4 张，均为 `SpecialPageView` 的 `kind` 分支，**没有新建页面文件 / 路由**）。

| 页面文件 | 路由 | 模板工作台卡片 | 主要组件 |
|---|---|---|---|
| `HomePage.vue` | `/` | 访客预约首页 | `Popup`、`SelectList`、`LanguagePopup`、`Field`、`QRCode` |
| `AppointmentFormPage.vue` | `/appointment/new` | 新建预约流程 | `Steps`、`Field`、`Uploader`、`UserCard`、`VehicleCard`、`Checkbox`、`Dialog`、`Popup`、`DatePicker`、`Cascader`、`Button` |
| `SuccessPage.vue` | `/appointment/success` | 提交成功 · 简版 | `Field`、本地资源 |
| `AppointmentDetailPage.vue` | `/appointment/detail` | 预约详情页 | `Tabs`、`Field readonly`、`UserCard`、`VehicleCard`、`ApprovalRecord`、`ApprovalTimeline` |
| `AppointmentRecordPage.vue` | `/appointment/records` | 预约记录页 | `AppointmentRecordCard` ×4 |
| `SecurityDetailPage.vue` | `/security/detail` | 安保端详情 | `SecurityHeader`、`Tabs`、`Tag soft`、`Field readonly`、`UserCard`、`VehicleCard` |
| `SpecialPageView.vue` | `/appointment/share`、`/pass`、`/pass/empty`、`/security/entry`、`/companion` | 提交成功 · 分享 / 访客端通行证 / 暂无通行凭证 / 安保端出入登记 / 泰国同行人 / **同行人·链接已过期 / 入园操作·选择人员 / 入园操作·信息确认 / 审批页·来访历史** | `Popup`、`QRCode`、`EmptyState`、`Field`、`Checkbox`、`Tag`、`Search`、`Button`、`Uploader`、`CollapseItem`、`FieldCheckbox`、`ActionBar`、`Cascader`、`Dropdown` |
| `SpecialPagesPreview.vue` | `/components` 内「模板页面」 | — | 15 张模板卡工作台 |
| `PageFrame.vue` | — | — | 375 画布 / 页头 / 内容区容器（页面骨架，非业务页） |
| `LocaleSwitcher.vue` | — | — | 语言切换入口 |

12 条路由：`/`、`/appointment/success`、`/appointment/share`、`/appointment/new`、`/appointment/detail`、`/appointment/records`、`/pass`、`/pass/empty`、`/security/entry`、`/security/detail`、`/companion`、`/components`。

**模板工作台 15 张卡**（`SpecialPagesPreview.vue`）：访客预约首页 / 新建预约流程 / 预约详情页 / 提交成功·分享给同行人 / 提交成功·简版 / 访客端通行证 / 暂无通行凭证 / 安保端出入登记 / **审批页·来访历史** / 安保端详情 / 泰国同行人 / **同行人·链接已过期 / 入园操作·选择人员 / 入园操作·信息确认** / 预约记录页。

> **NEW 标机制（用户 2026-11-13）**：最近新增 / 更新的页面在卡片清单里加 `isNew: true`，工作台缩略图右上角自动渲染主色 `NEW` 徽标。当前带标的 5 张：安保端出入登记（本轮改拼装）、审批页·来访历史、同行人·链接已过期、入园操作·选择人员、入园操作·信息确认。页面稳定后把 `isNew` 摘掉即可。

> **2026-11-13 用户裁决「这几个页面还需要吗，应该能通过现有组件拼出吧」**：入园操作（两屏）、链接已过期、凭证页、查询预约记录**都不需要新建页面 `.vue`**。
> - 入园操作 → `SpecialPageView.vue` 的 `kind="entry"`，用 `stage="select" | "form"` 切换两屏；
> - 链接已过期 → `SpecialPageView.vue` 的 `kind="link-expired"`；
> - 凭证页 → 已有 `kind="pass"`（待入园标签 + 有效期 + 园区 + 地址 + `QRCode` + 编号 + 查看更多），工作台已有「访客端通行证」；
> - 查询预约记录 → `Popup` + `Field` ×3（姓名 / 手机号后四位 / 身份证后四位）+ `Button` ×2（取消 / 查询），是首页入口触发的弹层，不是页面。
> 三张新卡只在工作台登记预览，路由数、页面文件数均不变。

## 二、页面模式

### P1 表单流程页（新建预约）

```text
PageFrame（variant="form"）
  → Steps 卡片（343×60）
  → 园区卡片（Field readonly → Cascader / Popup）
  → 当前步骤面板（白卡，padding 12/16，r12）
      第 1 步 预约信息：Field ×6 + 三项协议 Checkbox
      第 2 步 访客信息：Uploader + Field ×6
        └─ companion-stack（独立白卡，margin-top 12、grid gap 12）
             UserCard full :padding="16"
             VehicleCard full :padding="16"
      第 3 步 确认信息：见第四节
  → form-actions：Button「上一步」/「下一步」或「提交」
  → 弹层：DatePicker / Popup(SelectList) / 三个协议 Popup / Dialog
```

**第一步校验顺序**：先必填（`park` / `date` / `company` / `department` / `visitType` / `hostPhone`），再协议未勾选项；只列缺失项；「同意并继续」勾选未选项并 `step = 1`。

**组装层要点**：两张业务卡从 `.form-panel` **移出**，作为独立白卡放进 `.companion-stack`；宽度与内边距全靠 `full` / `padding` prop，页面**不写 `:deep` 覆盖组件布局**（11-11 反面案例）。

### P2 详情 / Tab 页（预约详情、安保端详情）

```text
页头（PageFrame 或 SecurityHeader 44 高）
  → page-header 摘要卡（标题 / 状态胶囊 / soft tag / 编号）
  → Tabs（full / height / background 走 prop）
  → body（padding 16、gap 12）
      基础信息：Field readonly ×N + UserCard + VehicleCard
      审批记录：ApprovalRecord
      出入记录：ApprovalTimeline
```

**禁止**在页面写 `.sd-tabs { display:block }` 或 `.tabs { height / width }` 之类覆盖，会静默顶掉 `Tabs` 内部 `display:flex` 让 `flex:1` 失效。

### P3 列表 / 记录页（预约记录）

```text
52 高标题行 → 40 高提示条（#E8F3FF）→ AppointmentRecordCard ×N（gap 12）
```

卡片内部样式（351×156 / r12 / pad 12 / gap 8 / 胶囊 / 40×40 扫码图标）由组件提供，页面不复制。

### P4 结果 / 凭证页（提交成功、通行证、空状态）

白卡内绿勾 + 二维码 / 预约信息灰块 + 返回首页 / 查看详情；空态用 `EmptyState` 本地插画。弹层用 `Popup` + `SelectList`。

### P5 弹层页（协议、语言、选人、日期、级联）

底部外层 `#F2F3F5`、内容卡白底；居中 `Dialog` / 日历 / 级联保持组件内白底。长标题换行、右上角关闭按钮留 60px 安全内边距。

### P6 安保端出入登记列表页（`kind="security-entry"`，2026-11-13 改为组件拼装）

```text
SecurityHeader（44 高，标题 + 右侧 slot）
  → 筛选行：Cascader（园区/门）+ Dropdown（部门）
  → Search（scan 扫码样式，模糊过滤，trigger 走 prop 配置）
  → 结果条数行 + AppointmentRecordCard ×N（复用预约记录卡做人员来访列表）
```

> **2026-11-09「安保端整页用设计稿切图」的裁决已被 2026-11-13 本轮推翻**：用户指出两个下拉无交互，整页切图无法承载交互。原切图资源 `src/assets/design-security-entry.png` **保留未删除**，回退方式 = 在 `SpecialPageView.vue` 恢复 `<section class="security-design"><img …/></section>` 分支。

### P7 审批页（`kind="approval"`，2026-11-13 新增）

```text
SecurityHeader（标题「审批」）
  → 访客信息卡（Field readonly ×N，字段与用户详情页一致）
  → 「近一年来访 2 次」链接（#00AAA6，IconBox info）
  → UserCard state="detail"（同行人）
  → ActionBar（驳回 outline / 通过 solid）
  → 来访历史记录 Popup（Popup + Tag + 记录卡：日期 / 状态 / 审批人 / 人数 / 事由）
```

「来访历史记录」是**底部弹层**不是页面：由「近一年来访 2 次」链接触发，复用 `Popup` 与业务状态 `Tag`。

## 三、页面生成分支（与决策树对齐）

| 分支 | 条件 | 动作 |
|---|---|---|
| A 套模板 | `src/pages/` 或模板工作台已有对应页面 | **只改目标页面 1 个文件**：替换文案 / mock 数据 / 资源，保留组件交互 |
| B 改模板 | 同类页面，需增删已注册组件 | 在同一 `.vue` 内增删组件调用，不新建同类组件 |
| C 新建页面 | 无对应页面 | 新建 `.vue` + 路由 + i18n，只用注册表组件 |
| D 补组件 | 组件能力不够 / 未覆盖 | **先输出能力缺口 + 2–3 个交互方案，等用户裁决**，裁决前不写页面代码 |
| E 越界 | 后端 / 真实扫码 / PC 1024 等 | 只在决策表 `excluded` 记录原因，不生成代码 |

## 四、确认页结构基准（用户 2026-11-13 裁决）

> 用户裁决原话：「3 有同行人的呢篇」——确认页以**包含同行人 / 车辆汇总**的那篇形态为准，不采用把同行人压成一行文本的简版。

### 4.1 必须的结构

| 区块 | 组件 | 形态 |
|---|---|---|
| 业务信息 | `Field state="readonly"` ×N | **上下结构**：标题在上（16/24 w500 `#4E5969`）、值在下（16/24 `#1D2129`） |
| 访客信息 | `Field state="readonly"` ×N | 同上 |
| **同行人汇总** | `UserCard state="detail"`（`full` / `:padding="16"`） | **独立卡片**，展示已添加的同行人；不是一行 `3 人` 文本 |
| **车辆汇总** | `VehicleCard state="detail"`（`full` / `:padding="16"`） | **独立卡片**，展示已添加的车牌；不是一行 `1 辆` 文本 |
| 协议 / 操作 | `Button` | 提交 / 返回修改 |

### 4.2 明确的禁止项

- ❌ `.row { display:flex }` + `.row__label { flex:0 0 88px }` + `.row__value { text-align:right }` **左右两列键值行** —— 这是豆包 11-13 产物「第三步为啥是左右布局」的直接根因；
- ❌ `<dl class="rows">` / `buildRow()` / `document.createElement` 手拼只读列表；
- ❌ 把同行人 / 车辆压成 `t('unit.person', {n:3})` 一类文本计数，替代卡片汇总；
- ❌ 确认页自造业务上限（`0/50` / `0/10`）或校验规则。

### 4.3 与当前工程的差异（如实登记，不擅自扩面）

`AppointmentFormPage.vue` 第三步当前只有 6 个 `Field state="readonly"`（园区 / 日期 / 公司 / 访客 / 电话 / 证件类型），**尚未包含同行人 / 车辆汇总卡片**。

- 本文件按用户裁决把「有同行人的那篇」定为**结构基准**，供后续生成与验收使用；
- 本次任务范围是按原始结构回归文档 + 可执行门禁，**未改页面代码**；
- 是否把现有第三步补齐为带 `UserCard` / `VehicleCard` 汇总的形态，按「组件能力不够 / 页面结构调整先问后改」的约定**等用户裁决**，不在本轮顺手改。

## 五、缺页登记（2026-11-13 盘点，未覆盖不等于要做）

Figma 共盘点 **46 个 375 页面**，工程实现 10 个页面 `.vue` / 12 条路由。未覆盖的主要分组：

| 分组 | 代表页面 | 备注 |
|---|---|---|
| 访客须知 / 隐私政策 / 协议正文独立页 | 多个 375×812 协议页 | 当前以 `Popup` 弹层承载 |
| 添加车辆 / 更多同行人独立页 | `1747:19921` / `1747:19937` | 当前以 `Popup` / `PersonListPopup` 承载 |
| 切换语言独立页 | `1747:19875` / `1747:19905` | 当前以 `LanguagePopup` 承载 |
| 访客预约 01/02/03 各国版本 | `1747:19635` / `1747:19693` / `1747:19807` / `1747:20180` | 4 组同名页面分属不同国家，均有效、不合并 |
| 提交确认页（长版） | `1747:20404` 375×1798 | 与确认页结构基准相关 |
| 预约记录（无记录）/ 查询预约记录 | `1747:24979` / `1747:25202` | 已有 `EmptyState` 与搜索组件 |
| 凭证系列 / 暂无凭证 | `1747:25221` / `1747:25256` / `1747:25296` | 部分由 `SpecialPageView` 覆盖 |
| 安保端其余页面 | 搜索页 `1035:8201` 等 | 已有 `Search` / `Dropdown` |
| 来访类型 / 日期选择独立页 | `1747:20578` / `1747:20625` | 当前以 `SelectList` / `DatePicker` 弹层承载 |

**注意**：大量「独立页」在原型里已经用**弹层组件**承载，属于有意的原型简化，不是「缺组件」。是否补成独立页面由需求输入 `pages:` 决定，不按 Figma 页面数逐页新建。

## 六、页面级硬约束

- 页面只负责**布局 + 组件编排 + 数据**：不写 `field-*` / `figma-*` 内部样式，不自绘 checkbox / popup / 按钮 / 业务卡片；
- 组件统一从 `../components/figma/<Name>.vue` 引入；`ListCard` 内部基座不得被页面直接引用；
- 所有页面 `scrollWidth == clientWidth`，仅上下滚动；
- 三语 `zh` / `en` / `th` key 齐全；可变文案换行，不截断；
- 新页面同时挂到 `router.js` 与模板工作台 / 组件库，注册表 2.0 同步；
- 页面改动先在组件预览页经用户确认后再提交推送。
