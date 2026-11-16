# 标准组件总览（Components）

> 本文件是 `references/components/` 槽位的**单篇总览**（用户 2026-11-13 裁决「合写一篇总览」，不拆成多篇）。
> 内容 = 组件清单 + 选型依据 + 状态与用法 + **逐场景调用核对表（结果级约束）**。
> 权威清单以 `component-registry.md` **第二节 2.0 表**为准；视觉唯一来源 `templates/project-starter/src/components/figma/`。
> 本文件与注册表冲突时，以注册表 2.0 为准并回写本文件。

## 一、数量口径（2026-11-13 更新）

| 口径 | 数量 | 说明 |
|---|---|---|
| `src/components/figma/index.js` 导出 | **33** | 32 个独立组件 + 1 个兼容别名 `FlowRecordCard`（含 2026-11-13 新增 `CollapseItem` / `FieldCheckbox` / `ActionBar`） |
| `src/components/figma/*.vue` | **34** | 上述 33 个 + `ListCard.vue`（内部共享基座，不导出） |
| `ComponentGallery.vue` 导航 | **6 组 37 项** | 设计规范 1 / 典型页面 1 / Field 5 / 通用组件 18 / 业务组件 6 / Popup 6 |
| 内部工具 | 1 | `usePopupTeleport.js`（不计入组件数） |

> **状态口径（用户 2026-11-10 13:55 裁决）**：`pending` / `ready` 只表示 Figma 逐项截图对照进度，**所有已实现组件均可用于页面与页面模板搭建**，不作为能否使用的门槛。
> **命名口径**：组件名全量去掉 `Figma` 前缀；CSS 类名 `figma-*`、目录 `components/figma/`、画布类 `.figma-phone` 保留。

## 二、组件清单与选型依据

### 2.1 输入 / 表单类

| 组件 | 什么时候用 | 关键 prop / 状态 | 禁止的替代写法 |
|---|---|---|---|
| `Field` | 所有有标签的输入与只读展示 | `label` / `modelValue` / `placeholder` / `required` / `readonly` / `disabled` / `link` / `textarea` / `prefix` / `error` / `maxlength` / `state` / `members` / `deletable`；**5 态**：默认 / 聚焦 / 填充 / 只读 / 禁用 | 自写 `<input>` + `<label>`；确认页 `.row__label` + `.row__value` 两列 |
| `Checkbox` | 协议勾选、成员全选 / 单选 | `modelValue` / `size`（`md` 14×14、`lg` 20×20） | 自绘 `.checkbox`、裸 `<input type="checkbox">` |
| `FieldCheckbox` | 字段级多选（如「检查项确认」全选 + 多项） | `label` / `required` / `options` / `modelValue` / `selectAll` / `selectAllLabel`；内部复用 `Checkbox size="lg"` | 自绘勾选框、把多个 `Checkbox` 散在页面里再手写全选逻辑 |
| `CollapseItem` | 通用折叠分区（标题行 + 内容槽） | `title` / `defaultOpen` / `disabled` / `showIcon`；`#extra` 插槽 | 页面自写 `v-if` + 自定义箭头替代折叠容器 |
| `Uploader` | 照片上传 | `modelValue` / `label` / `required` | 自绘上传区 |
| `Search` | 园区 / 记录搜索 | `#prefix` 插槽自动切换两种样式：无下拉 32 高 r17；有下拉 40 高 r4；`scan` 加扫码入口；`trigger` = `input` / `debounce` / `enter`（选型待裁决） | 自写搜索框 |
| `ActionBar` | 底部动作栏（弹层四段结构的「底部操作」段） | `variant` = `dual` / `selection` / `auth`；`cancelText` / `confirmText` / `selectionText` / `count`；事件 `cancel` / `confirm` / `selection` / `scan`；高度预算 16px padding + 总高 ≤80px（dual 76 / auth 80） | 页面里用两个裸 `Button` 再手写「已选摘要」「附加授权」 |
| `Cascader` | 园区 → 门两级选择 | `selectedValueAt(level)`；层级 tab 44 高、无分割线 | 自造级联 |
| `Dropdown` | 筛选下拉 | 复用 `Popup` + `SelectList padded` | — |
| `DatePicker` | 日期选择 | `v-model:show` / `@confirm` | 裸 `van-calendar` |
| `SelectList` | 单选列表 | `options` / `padded` / `@select` | 自绘选项行 |
| `Steps` | 三步流程指示 | `items` / `active` / `clickable` / `@change` | 自绘步骤条 |

### 2.2 通用展示 / 操作类

| 组件 | 什么时候用 | 关键 prop / 状态 |
|---|---|---|
| `Button` | 所有按钮 | `label` / `tone` / `form`（5 色系 × 3 形态 = 15 变体）/ `variant` / `disabled` / `loading` / `block` |
| `ActionBar` | 页面底部动作栏（三种样式） | `dual` 取消 / 提交；`selection` 已选摘要 + up 箭头 + 确定(N)；`auth` 附加授权 + 取消 / 下一步 |
| `Tabs` | 详情页页签 | `items` / `modelValue` / **`full`** / **`height`**（默认 42）/ **`background`**；页面级差异**只能走这三个 prop** |
| `Tag` | 状态标签 | `label` / `status`（7 类业务状态色）/ `size` / `variant`（`solid` / `soft`）/ `icon` / `iconSize` / `iconColor` |
| `InlineInput` | 行内状态胶囊（不是输入框） | `padding`（默认 4）/ `weight`（默认 400） |
| `ContentRow` | 国旗 + 国家名 + 区号 + 勾选 | — |
| `IconBox` | 所有图标的**唯一来源** | `name` / `size` / `color`；现有 `scan-qr-code` / `info` / `location` / `plus` / `down` / `up` / `arrow-left` / `close` / `user` / `car` |
| `QRCode` | 通行凭证二维码 | 最小 160、假码仅展示、本地 `qr-placeholder.png` |
| `EmptyState` | 空列表 / 无记录 | 本地 `empty-state.png` |
| `SecurityHeader` | 安保端页头 | 44 高、左返回 / 关闭、标题居中、`right` 插槽 |

### 2.3 业务卡片 / 记录类

| 组件 | 什么时候用 | 关键 prop / 状态 |
|---|---|---|
| **`UserCard`** | **同行人**（新建预约第二步、预约详情、安保端详情、确认页汇总） | `state`（`default` / `filled` / `detail`）/ `members` / `count` / `name` / `status` / **`full`** / **`padding`**；最多展示 5 个，其余「更多」进 `PersonListPopup` |
| **`VehicleCard`** | **车辆**（同上） | `state` / `plates` / `count` / `plate` / **`full`** / **`padding`**；编辑 / 删除交互内置 |
| `ListCard` | **内部共享基座**，不由 `index.js` 导出 | `title` / `count` / `addLabel` / `showAdd` / `showMore` / `addIcon`（默认关）/ `full` / `padding`（默认 12，新建预约传 16）。**页面不得直接引用** |
| `AppointmentRecordCard` | 预约记录卡 | 351×156；状态胶囊 `InlineInput`；右侧 `IconBox name="scan-qr-code"` 40×40 |
| `ApprovalRecord` | 审批记录 / 流程记录（**同一个组件**） | 折叠列表 + 三级审批 |
| `ApprovalTimeline` | 出入记录 | 「更多」打开只读人员列表 |
| `MemberSelectionFlow` | 选择入园人员 / 已选列表叠层 | 行高 44/48、tag 28、action-bar 46 |
| `CardVariants` | 画廊卡片组合演示 | 组合演示，非业务组件 |

### 2.4 弹层类

| 组件 | 什么时候用 | 关键 prop / 状态 |
|---|---|---|
| `Popup` | 通用底部抽屉 | `v-model:show` / `title`；**四段结构规范见 `component-registry.md` 规则 13**：容器 `#F2F3F5`、action-header 默认 64px（标题超出换行不截断）、内容区左右 16px / 内容卡 padding 16 / 块间距 12（list/form 自带间距不叠加，搜索+列表组合 12px）、底部操作 16px padding 总高 ≤80px；最大高度 = 画布高 − 80px |
| `Dialog` | 居中确认（必填缺失 / 协议确认） | `show` / `title` / `message` / `confirmText` / `cancelText` / `showCancel` / 默认插槽；**左「返回」右「同意并继续」** |
| `LanguagePopup` | 语言切换 | 卡片上下 20、行 44、gap 12、无分割线 |
| `PersonListPopup` | 已选人员列表 / 更多同行人 | 返回 / 清空 / 单个删除；`stacked` 叠层偏移 12px |
| `MemberSelectionFlow` | 选人弹层 | 底部「已选人员：N项」14/20 `#22BBB3` + 14×14 `up` 箭头 |

> 所有 Vant Popup 经 `usePopupTeleport()` 挂进 `.figma-phone`，不相对桌面视口居中。

## 三、关键组件用法片段

```vue
<!-- 新建预约第二步：同行人 / 车辆两张独立白卡，343 撑满、间距 12 -->
<div class="companion-stack">
  <UserCard state="default" full :padding="16" />
  <VehicleCard state="default" full :padding="16" />
</div>

<!-- 确认页只读字段：上下结构（标题在上、值在下），禁止左右两列 -->
<Field :label="t('form.park')" model-value="HHA Industrial Park, 123 Eastern Seaboard" state="readonly" />

<!-- 详情页页签：撑满容器走 prop，不写页面 CSS 覆盖 display -->
<Tabs v-model="activeTab" :items="tabs" full :height="40" background="#FFFFFF" />

<!-- 协议确认 Dialog：左返回、右同意并继续；协议名 #00AAA6 可点 -->
<Dialog v-model:show="dialog.show" :title="dialog.title" :show-cancel="true"
        :confirm-text="t('form.agreeAndContinue')" :cancel-text="t('form.backToSelection')"
        @confirm="onDialogConfirm">
  <p class="dialog-intro">{{ dialog.intro }}</p>
  <ul class="dialog-links"><li v-for="i in dialog.items" :key="i.key">
    <a href="javascript:void(0)" @click.stop.prevent="openAgreement(i.key)">{{ i.label }}</a>
  </li></ul>
</Dialog>
```

## 四、状态与交互清单（组件不是静态图）

| 组件 | 必须保留的交互 |
|---|---|
| `UserCard` / `VehicleCard` | 点「添加」→ `Popup` + `Field` + `Button` 表单弹层；「保存并继续」**不关弹层、清空输入、重新 focus**（键盘保持唤起）；按钮区 `@mousedown.prevent` |
| `ListCard` | 添加按钮默认**无加号**（`addIcon` 默认 false，按 11-11 用户空态截图裁决）；40 高 / r20 / 1px `#E5E6EB` / 16-20 w500 |
| `Checkbox` | `v-model` 双向；可变文案换行（`white-space:normal` / `overflow-wrap:anywhere`） |
| `Popup` | 长标题换行；「我已阅读…」勾选协议并关闭 |
| `Dialog` | `@confirm` 勾选未选项并 `step = 1`；「返回」不推进 |
| `Cascader` | 搜索过滤、层级 tab、末级回填、`selectedValueAt()` 重开保留选中态 |
| `MemberSelectionFlow` | 全选 / 单选、已选列表叠层、返回 / 清空 / 单个删除、确定回填 |
| `Tabs` | `v-model` 切换、激活 2px 主色下划线 |

## 五、组件能力缺口（命中即「先问后改」）

| 缺口 | 影响 | 状态 |
|---|---|---|
| `Field` 只读态是单行 `<input>`，无法换行 | 顶部园区名等长文案被裁切 | **待用户裁决**：A 只读态改 `<div>` 换行 / B 新增 `multiline` prop / C 页面级覆盖（不推荐） |
| ~~`CollapseItem` / `FieldCheckbox` 未沉淀~~ | — | **2026-11-13 已按用户「补充折叠和复选组件」补齐**：见 2.1 表与注册表 2.0 |
| `ScanFrame` 未沉淀 | 整页级扫码取景页无组件 | 按 `design-principles.md` 第三节给方案等裁决 |
| `IconBox` 图标集待补 | 新图标需求 | 同上 |

## 六、逐场景调用核对表（结果级约束）

> 2026-11-13 新增。生成结果必须逐项满足；`npm run gate` 会按此表判定。缺一项即不合格。

| 场景 | 必须出现 | 禁止出现 |
|---|---|---|
| **新建预约 第 1 步** | `Steps`、`Field`、`Checkbox`（三项协议）、`Dialog`（校验）、`Button`；园区 `Cascader` / `Popup`；日期 `DatePicker` | 自绘协议 checkbox、自写必填校验弹层、裸 `van-dialog` |
| **新建预约 第 2 步（访客信息）** | `Field` ×N、`Uploader`、**`UserCard`**、**`VehicleCard`**（`full :padding="16"`） | 自绘 `.tags` / `.tag` 胶囊列表、自绘 `.vehicles` / `.vehicle`、自绘 `.addbtn`、`document.createElement` 手拼列表、自绘 form-sheet 添加弹层 |
| **新建预约 第 3 步（确认信息）** | `Field state="readonly"` **上下结构**；**同行人 / 车辆汇总**（用户裁决「有同行人的那篇」，见 `pages/README.md` 第四节） | `.row__label` + `.row__value` 两列键值行、`<dl class="rows">` 自绘、仅用文本 `3 人` / `1 辆` 代替卡片汇总 |
| **预约详情页** | `Tabs`（prop 化）、`Field readonly`、`UserCard` / `VehicleCard`（`full :padding="16"`）、`ApprovalRecord` / `ApprovalTimeline` | 页面 CSS 覆盖组件 `display` / `padding` / 固定尺寸 |
| **安保端详情** | `SecurityHeader`、`Tabs full :height="40" background="#FFFFFF"`、`Tag variant="soft"`、只读卡片 | 页面写 `.sd-tabs { display:block }` 之类覆盖 |
| **预约记录页** | `AppointmentRecordCard` ×N、提示条 | 页面内复制卡片内部样式 |
| **入园操作（选择人员）** | `Search`、`Tag`（人员状态）、`Checkbox size="lg"`、`Button`（取消 / 下一步） | 自绘搜索框、自绘方形复选框、自绘状态色块 |
| **入园操作（信息确认）** | `CollapseItem`（访客信息）、`Field :members`（入园人员）、`Uploader` ×2、**`FieldCheckbox`**（检查项确认 + 全选）、`Field`（备注）、`Button` | 自绘 tag 组、自绘上传格、自绘勾选框与全选逻辑 |
| **链接已过期** | `EmptyState`（失效插画 + 失效时间 + 主色按钮）、页面标题栏 | 自绘空态插画、自绘主色按钮 |
| **安保端出入登记** | `SecurityHeader`、`Cascader`（园区 → 门）、`Dropdown`（部门，走 `Search #prefix`）、`Search scan`（模糊搜索）、`AppointmentRecordCard` ×N 结果列表。**禁止再用整页设计稿切图** | 一张 `<img>` 顶掉整页；图片像素上的假下拉 / 假搜索 |
| **审批页** | `SecurityHeader`、与用户详情页一致的 `Field state="readonly"` + `UserCard`、`ActionBar dual`（驳回 / 通过）、「近一年来访 N 次」链接 → `Popup` + `Tag` 来访历史卡 | 另写一套访客信息字段、页面自绘动作栏 |
| **任何页面** | 组件从 `../components/figma/<Name>.vue` 引入；`IconBox` 为图标唯一来源；本地 `src/assets/` 资源 | 纯单文件原生 HTML 产物、Vant 默认视觉、字符 / 默认图标替代 Figma 资源 |

## 七、禁止自绘清单（跨模型实测反例）

2026-11-13 用豆包跑本 Skill 得到的产物是**纯原生单文件 HTML**，0 处 Vue / Vite / `components/figma` / `.vue` 引用，并自行画了整套结构：

```css
/* 以下均为被禁止的写法 */
.row{display:flex;align-items:flex-start;gap:12px}
.row__label{flex:0 0 88px;text-align:left}       /* 确认页左右两列 */
.row__value{flex:1 1 auto;text-align:right}
.tags{display:flex;flex-wrap:wrap;gap:8px}       /* 自绘同行人 */
.tag{min-height:28px;border-radius:999px;font-size:12px}
.vehicles{display:grid;gap:8px}                  /* 自绘车辆 */
.vehicle{min-height:32px;border-radius:8px}
.addbtn{width:100%;height:34px}                  /* 自绘添加按钮（带加号 SVG） */
```

还自造了业务规则：同行人 `0/50`、车辆 `0/10`、姓名 2–50 字符、车牌 12 字符。**这些数字不是需求输入，不得写成事实**。

**正确做法**：第 2 步用 `UserCard` + `VehicleCard`；第 3 步用 `Field state="readonly"` + 同行人 / 车辆汇总；所有添加 / 删除 / 聚焦交互由组件自身提供。

## 八、新增 / 修改组件的流程

```text
定位 Figma 节点（给「所在页面 > 位置 > Figma 名称」，不写裸 Node ID）
  → 逐属性读（尺寸 / padding / itemSpacing / 圆角 / fills / strokes / 文字样式）
  → 新建或改 src/components/figma/<Name>.vue（Vant 只提供行为）
  → index.js 导出 + ComponentGallery.vue 分组条目
  → component-registry.md 2.0 表登记 + 本文件同步
  → getBoundingClientRect + getComputedStyle 回读，差值 > 1px 不通过
```

**组件能力不够时先按 `design-principles.md` 第三节给方案等裁决**，不要直接扩通用组件。
