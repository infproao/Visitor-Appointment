# 访客预约组件库 / Skill 搭建过程问题复盘

> 整理范围：2026-11-09 ~ 2026-11-13  
> 资料来源：工作日志 `2026-11-09.md` ~ `2026-11-12.md`、项目长期约定 `MEMORY.md`、`component-registry.md`、`quality-gates.md`、`SKILL.md` / `README.md` 历次修订，以及各轮 CDP / 构建 / 发布记录。  
> 用途：把「设计稿还原 → 组件沉淀 → 页面组装 → 多语言 / 弹层 → 发布分发」全链路踩过的坑固化成后续接需求的约束，避免重复发生。

---

## 0. 一句话结论

这套 Skill 的核心问题不是「某个组件画得不对」，而是早期把**设计稿还原、组件沉淀、页面组装**当成三件可以各自推进的事：

1. 给了设计稿，但没有统一「数值从哪里来、什么时候才需要取数」的口径；
2. 组件已经沉淀，但页面搭建时仍会重新画、覆盖或隐藏已有组件；
3. 组件内部视觉与布局模型没有冻结，页面 CSS 可以静默顶掉组件行为；
4. 多语言、长标题、弹层底色等「可变文案 / 边界状态」没有统一换行和容器策略；
5. 文档、数量口径、Skill 包 zip / `.bin`、线上构建指纹没有形成同步闭环，导致「本地已改、线上没生效」。

用户反复裁决后，最终收敛成一条总纲：**模板 + 组件库是为了复用，不是为了每次重新还原设计稿。**

---

## 1. 问题总览表

| 编号 | 类别 | 典型现象 | 根因 | 已形成的约束 / 修复方向 | 状态 |
|---|---|---|---|---|---|
| P1 | 设计稿还原 | 背景用 CSS 渐变代替设计稿 `bg-image-2.svg`；图标用字符 / 占位图；提交成功页自造文案和返回按钮 | 数值来源不统一（截图目测 / Figma 节点 / token 混用），资源没有集中 | 权威数值以 Figma / token 为准；图标统一 `IconBox.vue`；主色不从截图取；用户截图与 Figma 冲突时按截图裁决 | 已沉淀 |
| P2 | 设计稿还原 | 标题 18/24 误做 24/32、卡片间距 0 而非 16、Tab `height:40 + border-bottom` 实际 41 | 没按节点坐标量；边框吃高度 | 用 Figma 节点坐标 / `box-shadow: inset` 替代 border；尺寸进 `design-spec-from-figma.md` | 已沉淀 |
| P3 | 组件复用 | 已有 `Tabs` / `UserCard` / `VehicleCard`，页面仍重新画或写覆盖 CSS | 接需求时没有先查 `src/pages/`、模板工作台、`component-registry.md`；页面可覆盖组件布局模型 | 总纲「识别到 → 直接调用」；规则 11 / 12；质量门禁检查项；页面差异走 prop | 已沉淀，仍需持续守 |
| P4 | 组件复用 | `AppointmentFormPage` 的 `:deep(...)` 把已有两张卡隐藏成 0 高；修时又去 Figma 取数、改组件、连带改两个详情页 | 把「诊断」升级成「组件契约整改 / 架构整理」；把上一轮刚定的规则当本轮任务 | 用户裁决「定位到页面位置直接加就好，别绕一大圈」；默认只动目标页面 1 个文件；扩面前先问 | 已写入 `MEMORY.md` 反面案例 |
| P5 | 组件复用 | `MemberSelectionFlow` 自绘 checkbox；`Dropdown` 自绘 absolute 浮层 | 组件已注册但页面绕开注册组件 | 改复用 `Checkbox.vue`；`Dropdown` 改 `Popup + SelectList`；硬规则 1–4 | 已修复 |
| P6 | 组件复用 | 安保端 `.sd-tabs { display:block }` 顶掉 `Tabs` 内部 `display:flex`，3 个 tab 挤在左侧各 72px | Vue 根 class 与父级 class 合并，页面 scoped 与组件 scoped 同特异性，谁声明在后谁生效 | `Tabs` 补 `full / height / background` prop；规则 11 禁止覆盖 `display/flex/position/padding` 等 | 已修复并回归 |
| P7 | 多语言 | 泰语 / 英语协议文案被单行截断、省略号隐藏 | `Checkbox.vue` 写了 `white-space:nowrap + text-overflow:ellipsis + overflow:hidden` | 可变文案一律换行；`white-space:normal` / `overflow-wrap:anywhere` / `word-break:break-word`；勾选框首行对齐 | 已修复，三语实测 |
| P8 | 多语言 / 长标题 | 《个人信息收集、使用及披露同意书》标题被关闭按钮挤到裁切 | `Popup.vue` header 固定 64、高标题没有安全边距，且未显式允许换行 | 长标题一律换行；`min-height` + 左右 60px 安全内边距；`white-space:normal` | 已修复并截图确认 |
| P9 | 交互状态 | 「保存并继续」后弹层关闭、输入框失焦、键盘收起 | `saveAndContinue` 原先把 `showEdit` 置 false；按钮抢占焦点 | 弹层保持打开、清空输入、`nextTick` 重新 focus；按钮区 `@mousedown.prevent` | 已修复 |
| P10 | 弹层 | Popup 默认 teleport 到 `body`，在 375 画布里相对桌面视口居中导致右移 | 缺少统一 teleport 目标 | `usePopupTeleport()` 挂进 `.figma-phone`；`theme.css` 配套绝对定位 | 已修复 |
| P11 | 弹层 | 用户说「所有 popup 都有白底」，被误解成「弹层根节点全白」；下一轮澄清「背景是 F2F3F5，内容卡片是白底」 | 把「内容卡片白底」和「外层背景白底」混为一谈 | 底部 Popup 外层 `#F2F3F5`，内容卡 `#FFFFFF`；`Dialog` / 日历 / 级联保持组件内白底；不再全局 `!important` 白底 | 已回退并实测 |
| P12 | 弹层 / 流程 | 协议确认弹窗按钮顺序、链接颜色、点击行为、勾选与跳步逻辑多轮反复 | Dialog 是通用组件，但业务语义未固化 | 左「返回」右「同意并继续」；协议名 `#00AAA6` 可点；「我已阅读…」勾选并关闭 Popup；「同意并继续」勾选未选项并跳第二步 | 已固化 |
| P13 | 文档 / 口径 | 组件导出数、`.vue` 数、画廊项数、页面数、路由数、模板卡数长期不一致 | 组件、页面、文档、画廊分头更新 | 三方对齐口径：30 导出 / 31 `.vue` / 6 组 34 项 / 10 页面 / 12 路由 / 11 模板卡；`SKILL.md`、README、注册表、gap-analysis 同步 | 已对齐 |
| P14 | 可用性口径 | 组件库曾写「pending，不得用于页面模板」 | 把 Figma 逐项对照进度误当可用性门槛 | 用户裁决「现有组件可用于页面和模板搭建」；`pending` 只表示对照进度 | 已修正并上线 |
| P15 | Skill 生成链路 | 早期「输入需求 → 生成项目」靠人工编排，决策树 / SOP / 门禁断链 | 0.1.0 文档只描述组件预览，没有生成路径 | 升 0.2.0；新增 `page-generation-decision-tree.md`、`page-generation-sop.md`、样例 YAML、端到端试跑 | 已补齐 |
| P16 | 发布 / 分发 | 用户说「三处没生效」，实际是线上仍是旧构建 | 本地改了但没发；发布授权不跨轮；`dist` 未随源码重建 | 先比对线上 / 本地指纹和关键字符串；`serve.mjs` 启动时 `build()`；发布需本轮明确授权；成功后线上 CDP 复测 | 已沉淀 |
| P17 | 发布 / 分发 | `.zip` 下载被 WAF 403；`.bin` 与 zip md5 不同步；`unzip -l` 字节数误当压缩包大小 | WAF 规则、分发副本、统计口径不清 | 下载文件改 `visitor-skill-package.bin`；`application/zip` + `Content-Disposition`；zip / bin 同 md5；所有线上 URL 带 `?sharecode=...`；字节数看 `ls -l` / `size_download` | 已沉淀 |
| P18 | 工具链 | 代理、IPv6 监听、Chrome 最小窗口、`/tmp` 被清空、Figma MCP disabled、`Duplicate attribute`、`t is not a function` 白屏 | 本地环境 / 构建约束没有固化 | `curl --noproxy '*'`、Chrome `--no-proxy-server`、dev `--host 0.0.0.0`、脚本可重建、单 `v-bind` 计算属性、`useI18n()` 必调用 | 已记录 |

---

## 2. 重点问题逐项复盘

### 2.1 给了设计稿，但还原不精准

**现象**

- 11-09 还原首页 / 同行人 / 分享成功页时，用 `linear-gradient` 代替设计稿背景图 `src/assets/bg-image-2.svg`；用户明确「顶部背景是设计稿背景图，不是 CSS 渐变」后才回退。
- 搜索图标曾用字符 `⌕`，存在字形基线偏移；后改 20×20 SVG 块级盒。
- 预约记录卡右下角曾用 `qr-placeholder.png` 占位图，实际应为 Figma `1747:24918` 的 `scan-qr-code` 40×40 VECTOR。
- 提交成功页早期自造「短信通知文案 / 返回按钮」，与「模板页」`1553:22119`、「整合页面」`1822:39622` 出入较大；后来按 Figma REST 节点重写。
- 安保端设计图裁剪把 `(92,216)` 错用在 2x 空间，导致左侧白边、右侧截断；后按 1x 坐标 ×2 重裁 750×1804。
- 首页标题离卡片间距误做 0；按 `1747:24881` 节点重量为 16px。
- 成员选择行 `min-height:48 + padding:8` 在 content-box 下实际 60/64；后改固定 `height` + `box-sizing:border-box`。
- `Tabs` 的 `height:40px + border-bottom:1px` 实际占位 41；后改 `inset box-shadow`。

**根因**

1. **数值来源不统一**：截图目测、Figma 节点、token、已有组件规格混用。
2. **资源未集中**：图标、背景图、插画没有唯一来源，页面各自实现。
3. **CSS 盒模型细节**：`border` / `padding` / `content-box` 会改变实际占位。
4. **主色取值口径错误**：`Button.vue` 注释记录过「teal 主色不能从截图取」，截图取到 `#5AB9B2`，与 Figma / token `#22BBB3` 差 47 个色阶。

**用户裁决 / 已冻结口径**

- Figma / token 为权威；`design-spec-from-figma.md` 第九节 / 9.7 / 11.6 为设计数值依据。
- 图标统一 `IconBox.vue`，背景图统一资源文件。
- 用户给了截图就按截图裁决；截图与 Figma 冲突时不再翻 Figma 争论，一句话说明差异。
- **只有两种情况才去 Figma 取精确数值**：① 首次沉淀全新组件 / 全新页面；② 用户明确说「按设计稿校准」或给了截图且要求逐像素对齐。
- 边框不吃高度：优先 `box-shadow: inset` 或 `box-sizing:border-box`。

---

### 2.2 组件已搭建，但页面未引用或重新画了一个

这是用户反馈最强烈、也最关键的一类问题。

**用户原话**

- 「这个任务为啥这么久，人员和车辆的卡片都是有的，新建页面也是有的，我的理解是定位到页面位置直接添加就好，现在反而绕了一大圈」（11-11）
- 「还有昨天绕的问题，我搭建出模板和组件是希望接到需求后识别到已有页面或者符合直接调用，而不是去设计稿取精确数值」（11-12）

**典型反面案例：新建预约同行人 / 车辆卡片**

- `AppointmentFormPage.vue` 里本来已有：
  ```vue
  <UserCard state="default" />
  <VehicleCard state="default" />
  ```
- 但页面 CSS 写了：
  ```css
  :deep(.list-card) { width: 100%; padding: 0 }
  :deep(.list-card__header),
  :deep(.list-card__add) { display: none }
  ```
  实测两张卡高度 0、完全不可见。
- 最小修复本应是**只动 `AppointmentFormPage.vue`**：把两卡移出 `.form-panel`、删隐藏规则、给宽度一个入口。
- 实际却扩成：去 Figma `1087:25278` 取 343 / pad16 / gap12 / 40 / r20 / 16px 一整套数值；给 `ListCard` 加 3 个 prop、改内部间距和按钮字号；连带改 `AppointmentDetailPage.vue`、`SecurityDetailPage.vue`；加号图标加了又按截图撤掉；全套回归 + 重打 zip + 文档。
- 用户把这轮定为反面案例，写入 `MEMORY.md`。

**其他重复实现 / 覆盖实例**

- `MemberSelectionFlow.vue` 早期自绘 `.checkbox`，后按「组件复用不按页面各写一份」改为复用 `Checkbox.vue`，并给 `Checkbox` 补 `size="lg"`。
- `Dropdown.vue` 早期自绘 absolute 浮层，后改 `Popup + SelectList`。
- `SecurityDetailPage.vue` 为覆写 375 白底写了 `.sd-tabs { display:block }`，静默顶掉 `Tabs.vue` 的 `display:flex`，三个 tab 退回内容宽 72px。
- `AppointmentFormPage.vue` 的 `:deep(.list-card...)` 也是同类「页面覆盖组件内部布局 / 结构」。

**根因**

1. 接需求时没有强制先查已有页面、模板工作台、`component-registry.md`。
2. 文档有「必须调用注册组件」的规则，但没有进入决策树 / SOP / 质量门禁的逐页检查。
3. Vue SFC 根 class 会与父级 class 合并；页面 scoped 与组件 scoped 特异性相同，后声明者生效，页面一句 `display:block` 就能打散组件内部布局。
4. 把「上一轮刚定的规则」当成「本轮任务」，导致主动扩面整改。

**已沉淀的约束**

- 总纲：**模板 + 组件库是为了复用，不是为了每次重新还原设计稿。**
- 接需求顺序：
  1. 先查 `src/pages/`、模板工作台、`component-registry.md` 第二节；
  2. 命中 → 只写组装层：放组件、传 prop、给数据；
  3. 组件能力不够 → 优先用现有 prop，确实缺才补最小 prop；
  4. 只有两种情况去 Figma 取数；
  5. 用户截图优先裁决。
- 「定位到页面位置直接加就好」：默认只动目标页面 1 个文件；诊断到根因即止；发现同类问题记下、等用户决定；扩面前先问。
- `component-registry.md` 规则 11：页面不得覆盖组件 `display / flex / grid / position / float / padding` 及固定尺寸 / 底色；唯一例外是 `:deep(.x){width:100%}` 容器自适应。
- 规则 12：组件把可调外观收敛成 prop，如 `Tabs full / height / background`、`InlineInput padding / weight`、`Tag variant`。
- `quality-gates.md` 增加「页面样式不得覆盖组件根元素布局属性」「非默认尺寸先确认有 prop」。
- 新增 `page-generation-decision-tree.md`、`page-generation-sop.md`，把「能套模板不重新设计」「没有页面内重复实现已注册组件」变成门禁。

---

### 2.3 多语言换行 / 截断问题

**用户原话**

> 「切换为多语言如果不允许截断或者隐藏，超出屏幕；可以进行换行多语言策略」（11-12）

**现象**

- 泰语 / 英语表单页第三条协议文案被裁切，红框标出。
- 根因在 `Checkbox.vue`：
  ```css
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  ```
  可变 i18n 文案被强制单行裁掉。

**修复**

```css
.figma-checkbox > span:last-child {
  min-width: 0;
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
}
.figma-checkbox .box {
  align-self: flex-start;
  margin-top: 4px;
}
```

- 中文三行均 22 单行；英语 / 泰语第三条自动换为 44（两行）。
- `span.scrollWidth == clientWidth`，页面 `scrollWidth == clientWidth`，勾选框与首行对齐，控制台零错误。

**延伸：长标题换行**

- 用户后续截图：「这种情况换行」；《个人信息收集、使用及披露同意书》在 Popup header 被右上关闭按钮挤到裁切。
- `Popup.vue` 标题区修为：
  ```css
  .popup header {
    min-height: 64px;
    height: auto;
    padding: 20px 60px 12px;
  }
  .popup h2 {
    min-width: 0;
    max-width: 100%;
    text-align: center;
    white-space: normal;
    overflow-wrap: anywhere;
    word-break: break-word;
  }
  ```
- 实测长标题 2 行、header 80 高、`titleRight=760 <= closeLeft=768`，短标题仍 64 高 1 行。

**已冻结口径**

- 可变文案（尤其泰语 / 英语长文案）一律**换行**，不允许截断、省略号、隐藏或溢出屏幕。
- 组件里不要给 i18n 文案写 `nowrap + ellipsis + hidden`。
- 需要单行省略的只限「姓名 / 值」这类有界数据，且要显式说明。
- 长弹层标题同样一律换行，不允许被关闭按钮遮挡。

**边界未决**

- 顶部园区名 `HHA Industrial Park, 123 Eastern Seabo...` 仍被单行 `<input>` 原生裁切。这是园区数据，不是 i18n 文案；改成换行需要动 `Field.vue`（input → 可换行容器）。用户 11-13 已表态「换行」，但这是组件能力缺口，按新增规则先给出交互方案、等裁决后再动手，不扩面。

---

### 2.4 弹层、交互与状态问题

| 问题 | 现象 | 修复 / 约定 |
|---|---|---|
| Popup 偏移 | Vant 默认 teleport 到 `body`，相对桌面视口居中，375 画布里右移 | `usePopupTeleport()` 统一挂进 `.figma-phone`；`theme.css` 配套绝对定位 |
| Dialog 高度 | `border-top` 把 176 撑成 177 | 改 `box-shadow: inset 0 1px 0 #F2F3F5` |
| Dialog 按钮顺序 | 早期左「确定」右「取消」，与用户截图 / 业务语义相反 | 用户裁决：左「返回」、右「同意并继续」 |
| 协议链接 | 弹窗里协议名只是灰字，不可点 | 统一 `#00AAA6`，点击打开对应 Popup；表单区三项协议名也统一可点 |
| 保存并继续 | 点击后弹层关闭、输入框失焦、键盘收起 | 弹层保持打开、清空输入、`nextTick` re-focus；按钮区 `@mousedown.prevent` |
| 第一步校验 | 点「下一步」直接跳步，未校验必填 / 协议 | `nextStep()` 先必填、再协议；弹窗只列未通过项；「同意并继续」勾选未选项并 `step=1` |
| 状态标签 | 用户给状态色规范图，组件库只有通用 status | `Tag.vue` 新增 7 个业务 status 类，通用 status 原值不动；画廊分「流程 tag / 人员状态 tag」两组 |
| 弹层底色 | 「所有 popup 都有白底」被误读成根节点全白 | 用户澄清「背景是 F2F3F5，内容卡片是白底」；回退 4 个底部弹层根底色，删除全局 `!important` 白底；内容卡保持白底 |
| 弹层内容 | 协议 Popup 只有文字，没有白卡和确认动作 | 按截图补 `.agreement-card` 白卡 + 底部「我已阅读…」主按钮，点击勾选对应协议并关闭 Popup |

**最终弹层约定**

- 底部 Popup 外层 `#F2F3F5`，内容卡片 `#FFFFFF`。
- 居中 `Dialog`、日历 `DatePicker`、级联 `Cascader` 保持组件内白底。
- 长标题换行，避开右上关闭按钮。
- 协议确认 `Dialog`：左「返回」、右「同意并继续」；协议名 `#00AAA6` 可点；Popup 内「我已阅读…」勾选并关闭；「同意并继续」勾选未选项并跳第二步。

---

### 2.5 工程链路、文档与发布问题

**数量口径不一致**

- 早期注册表、`index.js`、`ComponentGallery.vue`、实际 `.vue` 文件、页面 / 路由 / 模板卡数量各说各话。
- 11-10 做过一次三方对齐；11-10 ~ 11-12 又随新增页面 / 组件多次更新。
- 当前口径：**33 导出（32 独立 + 1 别名）/ 34 个 `.vue`（含内部基座 `ListCard`）/ 画廊 6 组 37 项 / 10 页面 / 12 路由 / 15 模板卡**（2026-11-13 新增 `CollapseItem` / `FieldCheckbox` / `ActionBar` 与 4 张 kind 分支卡：链接已过期 / 入园操作两屏 / 审批页）。
- 教训：组件、页面、路由、画廊、注册表、SKILL / README / gap-analysis / decision-tree 必须同步更新。

**可用性口径**

- 组件库右上曾写「pending · 未完成 Figma 截图对照 / 不得用于页面模板」。
- 用户裁决：**「现有的组件可以用于页面和模板的搭建」**。
- `pending / ready` 只表示 Figma 逐项对照进度，不是能否使用的门槛；此口径已写进 `SKILL.md`、`component-registry.md`、`quality-gates.md`。

**Skill 生成链路**

- 早期 0.1.0 文档说「模板入口只是组件预览」「只能调用 ready 组件」「不包含页面模板 / 页面路由」，导致「输入需求 → 生成项目」靠人工编排。
- 11-10 补 0.2.0：
  - `SKILL.md` / `README.md` 重写定位与能力边界；
  - 新增 `page-generation-decision-tree.md`（G0–G5、逐页模板匹配表、分支 A/B/C/D/E）；
  - 新增 `page-generation-sop.md`（10 步 + 常见错误表）；
  - `quality-gates.md` 补「能套用模板的页面没有重新设计」「没有页面内重复实现已注册组件」；
  - `examples/sample-requirement.yaml` → `sample-decision.yaml` → `/tmp/skill-sample-run` 端到端试跑，产物固化到 `examples/generated/` 与 `examples/sample-run-report.md`。

**发布 / 分发踩坑**

- 用户说「三处没生效」时，根因常是**线上仍是旧构建**，不是代码问题；应先比对线上 / 本地 `index-*.js` / `index-*.css` 指纹与关键字符串。
- `serve.mjs` 方案：启动时先 `await build()` 再静态托管 `dist`，SPA fallback；避免沙箱 `dist` 未随源码重建、`&&` 在 `startCmd` 不按 shell 执行、`$PORT` 不展开等问题。
- 发布授权**不跨轮**：用户本轮明确「同步到线上 / 发布」才部署；成功后需告知「前往设置—数据管理—应用中管理」。
- 所有线上 URL 必须带 `?sharecode=CKYW5NSQVS`。
- WAF 对 `.zip` 后缀 403，下载文件改 `visitor-skill-package.bin`；`serve.mjs` 返回 `application/zip` + `Content-Disposition: attachment; filename="overseas-visitor-appointment-components.zip"`。
- `skills/overseas-visitor-appointment-components.zip` 必须与 `public/visitor-skill-package.bin` 同 md5；`unzip -l` 尾行是解压后总大小，不是压缩包大小，压缩字节看 `ls -l` 或线上 `size_download`。

**工具链 / 编译 / 本地验证**

- 本机 `HTTP_PROXY` 会拦 `127.0.0.1`：`curl` 加 `--noproxy '*'`，Chrome 加 `--no-proxy-server`。
- dev server 曾只监听 IPv6 `[::1]:5173`，`127.0.0.1` 连不上；需 `--host 0.0.0.0`。
- `/tmp` 会被系统定期清空，`serve-4189.mjs` / `cdp.mjs` / `figma_nodes.py` 需可重建。
- Figma MCP 在 `~/.workbuddy/mcp.json` 中 disabled，改用 Figma REST API + `X-Figma-Token`，脚本放 `/tmp` 需重建。
- Vue SFC 同一元素两个无参 `v-bind` 会报 `Duplicate attribute`；`IconBox.vue` 改单个 `v-bind="pathAttrs"`。
- 早期白屏：`t('...')` 在模板里用了，但 `<script setup>` 未调用 `useI18n()`，报 `_ctx.t is not a function`。
- `Dropdown` 的 `trigger-width="96"` 传字符串会 Vue warn，必须 `:trigger-width="96"`。
- Chrome headless 最小窗口宽 500，`--window-size=375` 无效，截图会出现「整体右移」假象；要用元素 `getBoundingClientRect()` 作 clip。
- CDP 截图 `{x:0,y:0,width:375}` 截居中布局会只截到左侧留白。

---

## 3. 已冻结的约束清单（后续接需求直接照做）

### 3.1 复用优先

1. 先查 `src/pages/`、模板工作台、`component-registry.md` 第二节。
2. 命中已有页面 / 组件 → **只写组装层**：放组件、传 prop、给数据；组件内部视觉不动。
3. 组件能力不够 → 优先用现有 prop；确实缺能力才补最小 prop。
4. 只有「首次沉淀全新组件 / 全新页面」或「用户明确要求按设计稿 / 截图逐像素对齐」才去 Figma 取数。
5. 用户给了截图就按截图裁决，不翻 Figma 争论。
6. 默认只动目标页面 1 个文件；诊断到根因即止；发现同类问题记下、等用户决定。
7. 扩面（改组件 API / 动其它页面 / 重打 zip / 全套回归 / 发布）前先问，或至少在回复里说明「多做了什么、可回退」。
8. **组件能力不够或未覆盖 → 先问、等裁决、给交互方案**（用户 2026-11-13）：不得直接扩通用组件 / 自造页面结构；先给「缺什么能力 + 2–3 个可行交互方案 + 推荐项」，用户明确选一个后再动手。裁决后仍优先用现有 prop，确实缺才补最小 prop。

### 3.2 页面与组件边界

- 页面不得覆盖组件根元素的 `display / flex / grid / position / float / padding` 及固定尺寸 / 底色。
- 非默认尺寸 / 底色先确认组件有 prop，没有就先补 prop 再调用。
- 唯一允许的页面级例外是 `:deep(.x){width:100%}` 这类容器自适应，且不改变组件内部布局。
- 组件交互（点击、回填、弹层、选中态、删除 / 清空）在页面里必须保留，不能当静态图使用。

### 3.3 文案、多语言与长标题

- 可变 i18n 文案一律换行，不允许截断、省略号、隐藏或溢出屏幕。
- 长弹层标题一律换行，避开右上关闭按钮。
- 单行省略只限「姓名 / 值」等有界数据，且要显式说明。
- 三语 `zh / en / th` 新增文案必须同结构补齐，避免 missing key。

### 3.4 弹层

- 底部 Popup：外层 `#F2F3F5`，内容卡 `#FFFFFF`。
- 居中 `Dialog` / 日历 / 级联：组件内白底。
- 协议确认 `Dialog`：左「返回」、右「同意并继续」。
- 协议名 `#00AAA6` 且可点击打开对应 Popup。
- Popup 内「我已阅读…」勾选对应协议并关闭；「同意并继续」勾选未选项并跳第二步。

### 3.5 工程与发布

- 本地验证：4189 服务 + Chrome CDP；`curl --noproxy '*'`，Chrome `--no-proxy-server`。
- 发布前比对本地 / 线上构建指纹、路由 200、CDP 真实点击、控制台零错误、页面 `scrollWidth == clientWidth`。
- 发布同意不跨轮；所有线上 URL 带 `?sharecode=CKYW5NSQVS`。
- Skill zip 与 `public/visitor-skill-package.bin` 同 md5；排除 `node_modules` / `dist` / 时间戳 / `.bin` / `.DS_Store`。
- 组件、页面、路由、画廊、注册表、SKILL / README / gap-analysis / decision-tree 数量口径同步。

---

## 4. 仍待决 / 风险项

1. **顶部园区名 `<input>` 裁切**：属于数据不是 i18n 文案，改换行需动 `Field.vue`；用户 11-13 已表态「换行」，但按新增的「能力缺口先问、等裁决、给交互方案」规则，仍需先选定交互方案后才动手（见 4.1）。
2. **改动已打包、尚未发布**：11-13 已重打 Skill zip（104 条目；精确字节数 / md5 见当轮工作日志，不在本文档写死以免过期）、同步 `public/visitor-skill-package.bin` 同 md5、重建 `dist`（`index-CHpn_r0C.js` / `index-CsQ2gCjc.css`），解压包独立构建通过；聚焦、标签配色、多语言换行、第一步校验、弹层链接 / 白底 / 长标题、11-13 新规则与本复盘均已入包。**线上仍是 11-11 的 `index-C8a5s6tB.js` / `index-DWqmaha3.css`**，按用户「先不着急发布，我先在本地测试好」的裁决，发布需当轮另行授权。
3. **两个详情页的连带改动未撤回**：11-11 用户未回答撤回提议、直接要求发布，当前保持未撤回。
4. **包已同步，发布待授权**：复盘文件与本轮规则已随 11-13 打包入 Skill 包、`.bin` 同 md5；剩余动作只有「取得本轮发布授权 → 覆盖发布 → 线上指纹 / 路由 / DOM / 下载副本复测」。
5. **设计稿覆盖度仍不是全量**：11-10 盘点权威范围约 46 个 375 手机页，当前原型是 10 页面 / 12 路由 / 11 模板卡；这是「已实现范围」，不是「设计稿全量」。
6. **本地 dev server 与 dist 预览是两条路**：11-13 启动的是 Vite dev（源码 + HMR），不是 4189 静态 `dist` 预览；若做发布前核验，要确认当前比对的是哪一份产物。

### 4.1 2026-11-13 用户裁决与逐条答复（覆盖第 4 节待决状态）

> 编号按 11-13 上午的 7 项版本记录。**原第 6 条「历史 `pending` 语义需防回潮」已按用户 11-13 13:46 裁决删除**：用户说明当初写 `pending` /「不得用于页面模板」是**为了防引用不规范组件**，该约束现已不需要，因此不再把「旧口径复活」列为风险项，也不再为此做文档巡检。下表保留当时的问答记录；原第 7 条在正文中已重编号为第 6 条。

| 编号 | 用户裁决 / 追问 | 本轮处理 |
|---|---|---|
| 1 | 「顶部园区名换行」 | 目标已确认，但按新规则**未动 `Field.vue`**：只读 `<input>` 无法换行属组件能力缺口，已给出 3 个交互方案（组件内只读多行态 / 两行封顶 + 展开 / 完整名移入已有园区 Popup），等待用户选一个再实现。 |
| 2 | 「先不着急发布，我先在本地测试好」；13:46 追加「打包skill」 | 已按裁决**只打包、不发布**：重打 zip + 同步 `.bin` 同 md5 + 重建 `dist` + 解压包独立构建验证；线上未动，Vite dev 4189 保持运行。覆盖发布仍需当轮明确授权。 |
| 3 | 「详情页改动了啥」 | 已逐文件说明 11-11 连带改动（两个详情页的 `UserCard` / `VehicleCard` 改走 `full :padding="16"` prop、删除同类 `:deep(width:100%)`），以及同轮 `ListCard` 内部视觉变更对两页的实际影响；用户未要求撤回，保持现状。 |
| 5 | 「还缺少哪些页面」 | 已按 46 页盘点 + 决策树给出分组缺口清单（决策树明确「暂无模板」4 类；整页级、弹层 / 状态级、国家版本差异级；以及 3 个缺组件前置）。未重新去 Figma 取数。 |
| 6 | 「是啥意思」→ 后续裁决「6 可以删除了」 | 已解释 `pending` 只表示 Figma 逐项截图对照进度、不是可用性门槛；用户随后裁决删除该风险项，理由见上方说明。**未批量清理其它文档里的历史 `pending` 字句**（未获授权，记下待决）。 |
| 7（现第 6 条） | 「有什么影响」 | 已解释 dev / dist / 线上三条产物线：dev 是源码 HMR、`dist` 是构建产物、线上是 11-11 发布版；本地 dev 测过 ≠ dist / 线上通过，发布前必须重建并比对指纹。 |
| 4（未追问） | 文档与 zip 落后 | 由编号 2 的裁决一并覆盖，暂不分发。 |

**新增总纲级规则**：组件能力不够或未覆盖时，询问用户、等待裁决，并给出可行的交互方案；已写入 `MEMORY.md`、`component-registry.md` 规则 14、`quality-gates.md`、`page-generation-decision-tree.md` 分支 D 与 `SKILL.md` 强制规则。

---

## 5. 建议的后续动作

1. **已完成（11-13 打包）**：本复盘已纳入 Skill 包 `references/` 并随包分发，作为新需求接入前的必读复盘。
2. 后续每个需求先产出一张「逐页决策卡」：命中哪个已有页面 / 模板卡 / 组件，差异是否只需 prop / 数据，是否需要 Figma 取数；不写这张卡不开始改代码。
3. 把「多语言换行 / 长标题换行 / 页面不得覆盖组件布局 / 弹层底色」并入 `quality-gates.md` 的运行时与视觉门禁，生成 SOP 强制输出检查结果。
4. 交付 / 发布闭环（11-13 已完成前 3 步，剩发布与线上复测）：
   - 已完成：重打 `overseas-visitor-appointment-components.zip`；
   - 已完成：同步 `public/visitor-skill-package.bin` 同 md5；
   - 已完成：重建 `dist`；
   - 待做：本地 CDP 回归（发布前重跑）；
   - 待做：取得本轮发布授权后覆盖发布，分享链接不变；
   - 待做：线上指纹 / 路由 / DOM / 下载副本复测。
5. 对用户已给的截图建立「截图裁决记录」：截图说了什么、与 Figma 差异是什么、最终按哪个执行，避免下一轮重新争论。

---

## 6. 关键资料索引

- 项目长期约定：`/Users/dongguopeng/WorkBuddy/2026-11-09-20-24-22/.workbuddy/memory/MEMORY.md`
- 工作日志：同目录 `2026-11-09.md` ~ `2026-11-12.md`
- 组件调用契约：`references/component-registry.md`
- 质量门禁：`references/quality-gates.md`
- 生成决策树：`references/page-generation-decision-tree.md`
- 生成 SOP：`references/page-generation-sop.md`
- 设计数值：`references/design-spec-from-figma.md`
- 组件缺口历史：`references/component-gap-analysis.md`
- Skill 入口：`SKILL.md`、`README.md`
- 工作副本：`templates/project-starter/`
- 线上分享链接：`https://visitor-appointment-21768.app.workbuddy.host/?sharecode=CKYW5NSQVS`
