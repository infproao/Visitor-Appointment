# 组件注册表

> 本文件是页面生成时的组件调用契约。**当前权威清单为第二节 2.0 的 33 个 `index.js` 导出（32 个独立组件 + 1 个兼容别名）+ 1 个内部组件**，共 34 个 `.vue`，唯一视觉来源为 `templates/project-starter/src/components/figma/`。2.1–2.3 为 2026-11-06 的 20+1 历史基线，其逐项 Figma 备注继续有效，但**数量与命名以 2.0 为准**。
>
> 整理日期：2026-11-06（20+1 基线）；**2026-11-10 三方对齐**（`index.js` / `src/components/figma/*.vue` / `ComponentGallery.vue`）。
>
> **状态定义（用户 2026-11-10 13:55 裁决「现有的组件可以用于页面和模板的搭建」）**：所有已实现组件**均可用于页面与页面模板搭建**；`pending` / `ready` **仅表示 Figma 逐项截图对照进度**，不再作为「能否使用」的门槛。`pending` = 尚未完成截图逐项对照；`ready` = 完成「补资料 → 实现 → 运行 → Figma 对照 → 用户确认」全链路。**当前 29 个可复用独立导出组件全部为 `pending`**（对照进度事实，见 `component-gap-analysis.md` 一、四节），不影响复用。
>
> **命名口径（用户 2026-11-06 裁决「叫 Button，不叫 FigmaButton」+「5 全部去掉」「是的推广到全部」）**：组件名**全量去掉 `Figma` 前缀**——`.vue` 文件名、`index.js` 导出名、组件标识、画廊引用一律改为 Figma 原件名（`Button.vue` / `Field.vue` / …）。**保留不变**：CSS 类名 `figma-*`、目录名 `components/figma/`、画布容器类 `.figma-phone`。影响见第七节。
>
> 旧版 `Hisense*` 命名、`src/components/Hisense*.vue` 路径、`confirmed` 状态与页面依赖矩阵已按用户裁决「无用的话就删除」**从本文件删除**（第七节仅留 git 回溯指针），不参与新页面生成，不作为视觉来源。
>
> **2026-11-06 逐条裁决已落地到代码**：输入框 5 态、人员选择交互链与**最大高度弹层（画布高 − 80px，2026-11-09 由 80% 改口径）**、审批/流程合并、`card` 归属、二维码 160 / 展示用假码、日期与语言放进输入框并拆 Popup、Field / Popup 菜单重组、Button 15 变体、ContentRow / InlineInput 独立沉淀、全量去前缀、右侧一屏展示。逐条依据见 `component-gap-analysis.md` 第八、九节；落地状态见本文件 2.4。
>
> 【事实 / 待确认】标记沿用项目约定：无法从 Figma 或本地文件证明的 Node 绑定一律写「待确认」，不自行补成事实。

> **2026-11-10 增量变更（用户六点改动，已并入 2.0 权威表；状态均 `pending` = 对照进度）**：
> - **新增 `Cascader.vue`**（园区 → 门两级级联）：视觉来源「整合页面 > 泰国 > 选择园区 `1822:36720` / 搜索园区精确到门 `1822:38307`」。已加入 `index.js` 导出与组件画廊「通用组件」分组；浏览器实测触发器短名回填「泰国工厂（西门）」、搜索过滤、层级 tab（`HHA泰国-Rayong` / `请选择`）与末级回填均通过。
> - **新增 `usePopupTeleport.js`**（内部工具，不计入组件数）：Vant Popup 统一挂进 `.figma-phone` 手机画布，修正弹层相对桌面视口居中导致的水平偏移，修复「下拉单选点了像没触发」。`Popup` / `DatePicker` / `LanguagePopup` / `PersonListPopup` / `MemberSelectionFlow` / `Cascader` 及画廊裸 `van-popup` 已接入；模板页 overlay 的画布补加 `figma-phone` 类。
> - **页面模板交互补齐**：`HomePage` / `SpecialPageView` / `SuccessPage` 的访客须知、只读 Field、语言切换、确认 / 分享 / 返回等静态占位改为复用组件库 `Popup` + `SelectList` + `LanguagePopup` + `Field` + `Checkbox`；模板缩略图设为 `pointer-events: none`，交互只在 overlay 的真实页面里生效。
> - **三方已一次性对齐**：上述 `Search` / `Dropdown` / `IconBox` / `Cascader` 及后续 `Dialog` / `AppointmentRecordCard` 均已登记进 2.0 权威表，`index.js`、画廊、注册表数量与命名已一致；旧「20 + 1」口径仅保留在 2.1–2.3 历史基线。
>
> **2026-11-10 12:20 数值修正（用户「卡片边距 / 搜索框两种样式 40·32 / 级联 tab 44 无分割线」）**：
> - **弹层列表卡片内边距**：Figma「——模板—— > 通用组件 > 底部抽屉」`1623:20325` > `body` `1623:20333`（padding 16/16/0/16）> `Slot` `1623:20336` 343×184（**padding 16 四边**、r12）。`SelectList` 本体仍按 `1721:27132`（343×156、pad 0、gap 12、行 44、无分割线）不变，新增 `padded` prop 只给弹层调用补上下 16；`Dropdown` / `AppointmentFormPage` / `SpecialPageView` / 画廊 `SelectListSheet` 已接入。`LanguagePopup` 自带卡片维持 `4:4211` 上下 20，不改动。
> - **`Search` 拆成两种样式**（不再统一 56）：不带下拉 = **32 高 / r17 / padding 12**，依据「整合页面 > 泰国 > 搜索园区精确到门」`1822:38312` > `content` 343×32（padding 12/12/6/6、r17）；带 `#prefix` 下拉 = **40 高 / r4 / padding 12**，依据「安保端-搜索页」`1035:8201` > `content` 307×38（≈40、r4）。按 `#prefix` 插槽自动切换，移除未使用的 `size` prop。
> - **`Cascader` 层级 tab**：用户裁决 **44 高、tab 与选项之间无分割线**；抽屉搜索框对齐 `1822:38312` 改 **32 高 / r17**。激活 tab 保留 2px 主色下划线，选项行无 border。
> - **浏览器实测**：两种搜索框 32 / 40、卡片 `padding 16px 0` / 高 244 / 行 44 / gap 12 / 无分割线、级联 tab 44 且 `border-bottom: 0`、语言卡片仍 20px、Dropdown 与 Cascader 回填正常、控制台零错误。
> - **口径说明**：`design-tokens.md` 6.4 节「搜索框高度 56px（Hug）」与 `figma-node-index.md` `1686:11710` 343×56 属 11-09 旧裁决 / 另一页面实例；本轮以用户 11-10 裁决 32 / 40 为准，旧值仅作历史记录，**待一次性口径对齐**。
>
> **2026-11-10 13:35 成员选择交互修正（用户「tag 高度 28px / 已选人员支持点击弹出已选列表」）**：
> - `MemberSelectionFlow.vue`：已选胶囊由 `min-height: 28px + padding 4px 8px`（content-box 下实际渲染 30px）改为 **`height: 28px; box-sizing: border-box; padding: 0 8px`**，实测 28px / r999。
> - 底部「已选人员：N项」由纯 `span` 改为 `button`，点击**复用** `PersonListPopup`（Figma「——模板—— > 通用组件 > 已选列表」`1803:33841`，375×801）作为叠层：标题「已选人员（N）」、左上返回、右上清空、行内删除；删除 / 清空实时同步字段 chips、`确定(N)` 与 `v-model`；删空或清空后自动关闭空列表；0 项时入口 disabled 以避免空弹层；选择弹窗整体关闭时同步复位。
> - 叠层实测 `z-index 2002 > 2001`、`elementFromPoint` 命中已选列表、两层弹窗均挂在 `.figma-phone` 内不偏移。
> - `ComponentGallery.vue`：`FieldMember` demo 默认选中 1 人（对齐用户截图的「何枢 ×」与「已选人员：1项」，打开组件库即可看到 28px tag），demo 说明与注册表条目 note 同步。
> - 浏览器真实点击实测：tag 28px、入口为 BUTTON 且默认可点、打开 / 返回 / 单个删除 / 清空 / 确定全链路通过、控制台零错误。

> **2026-11-10 13:55 可用性口径修正（用户「右侧怎么还显示这个，现有的组件可以用于页面和模板的搭建」）**：
> - `pending` / `ready` 由「可用性状态」改回「Figma 逐项截图对照进度」；已实现组件一律可用于页面与页面模板搭建。组件预览页右上徽章由 `pending · 未完成 Figma 截图对照` 改为 `available · 可用于页面与模板搭建`；右侧「待确认项 / 不得用于页面模板」区块改为「使用说明」（正向可用说明 + 视觉依据 + 组件专属备注）。
> - 受影响文件：`ComponentGallery.vue`（徽章、说明区、徽章样式）、本文件状态定义与相关硬性规则、`component-gap-analysis.md` 状态结论、`SKILL.md` 约束清单。
> - **保留不变**：硬性规则 5「`pending` 组件不得用临时 HTML 跳过组件沉淀」与规则 8「完成全链路才改 `ready`」——这两条约束的是沉淀方式与对照进度，与可复用性不冲突。

> **2026-11-10 14:18 组件复用与交互补齐（用户 9 点改动）**：
> - **命名统一**：`RegistrationCard.vue` → **`AppointmentRecordCard.vue`**（导航「预约记录卡片」、右侧 id `AppointmentRecordCard`；`index.js` / `CardVariants` / `SpecialPageView` / `SpecialPagesPreview` 引用同步）；`CardVariants` 第 4 张与模板页复用同一组件展示一条预约记录。模板页「预约登记卡片」→「预约记录卡片」；导航「特殊页面平铺」→「**模板页面**」；二维码项标注 Figma `1747:24918 · scan-qr-code`，`IconBox` 增加 `scan-qr-code` 规范名（首页扫码图标改用它，`scan` 保留兼容别名）。
> - **`UserCard` 同行人**：列表最多展示 **5 个**、人名 **16px**，其余通过「更多」进入 `PersonListPopup` 查看全部；预约详情页与组件库 demo 共用同一渲染。
> - **新增 `Dialog.vue`**（Figma `1623:20467` dialog 311×176，居中确认弹窗，与底部抽屉分开）：复用 `Button` 组件、`usePopupTeleport()` 挂进手机画布，`theme.css` 补画布内绝对居中；已加入 `index.js` 与组件库「Popup」分组。`AppointmentFormPage` 的《访客须知》《隐私政策》改为**海信绿 `#00AAA6`** 链接（三语前缀 / 链接 key 已补），点击复用 `Popup`；点「下一步」若三项协议未全勾选，弹同一 `Dialog` 提醒且不推进。
> - **组件复用**：`MemberSelectionFlow` 全选 / 单选去掉自绘 `.checkbox`，统一使用 `Checkbox.vue`（外层 `@click.stop` 避免整行二次切换）；全工程无 `van-dialog` / 自绘复选框残留。`Cascader` 新增 `selectedValueAt(level)`：重新打开抽屉时，草稿层级为空但已选链前缀一致则回退到已选值，末级选项保留主色文字 + 勾选图标，层级 tab 仍按设计稿显示「请选择」等待重选。
> - **CDP 真实点击实测**：命名 4 项与旧名清零、同行人 5 行 / 16px / 更多 11 人、协议链接 `#00AAA6`、未勾选弹 Dialog（311×169）且不推进、全勾后进入「访客信息」、成员选择 5 个 `figma-checkbox` / 0 自绘 / 点击回填 2 项、级联「南门」选中态 + 勾、Dialog 在画布内居中；控制台零错误。
> - **缺口清单更新**：此前「权威缺失组件 `Dialog`」已补齐；`component-gap-analysis.md` 的历史缺口表格保留为当时快照，不再作为当前状态依据。

> **2026-11-10 16:1x 三处设计稿对齐（用户 3 张截图：成员弹层大小/箭头、典型页面隐藏、Dialog 与设计稿有出入）**：
> - **`MemberSelectionFlow` 行高与底部栏**：Figma「——模板—— > 通用组件 > 选择入园人员」`1803:33585` 实测 `cell-radio` 311×44、`user-card` 311×48、`form` **无 itemSpacing**；此前 `.member-row{min-height:48;padding:8px 0}` 在 content-box 下把行撑到 **60/64**，是同截图「大小不对」的根因。改为 `height:48px/44px + box-sizing:border-box + padding:0`，实测 44/48/48/48/48、行间 gap 全 0；全选行补 1px INSIDE `#F2F3F5` 底分割线（Figma `content` stroke）。姓名 `400 14/20` → **`500 16/24`**。
> - **底部已选入口**：Figma `.components/action-bar` 343×46（1px `#F2F3F5` INSIDE 上边框）+ `.selected-trigger` 171.5×46（pad 0/12）内「已选择: 选项…」14/20 **`#22BBB3`** + **14×14 `up` 箭头** + 右侧 171.5×46 r999 `#22BBB3`「确定(10)」16/22 w600。原实现是 60 高 footer + 12/20 `#00AAA6` 纯文字、**无箭头**；现改为 46 高、文字 14/20 `#22BBB3`、补 `IconBox name="up"`（`IconBox` 新增 `up`，由同一 chevron 旋转 180° 得到）、右侧胶囊 46 高 16/22 w600，实测 172/172 平分、箭头 14×14。文案保留用户口径「已选人员：N项」。
> - **`Checkbox` 新增 `size` prop**：默认 `md` = Figma `1551:11134` 的 14×14 / r2；`size="lg"` = 成员列表 Figma `.radio-icon` **20×20 / r4 / 1px `#C9CDD4`**。成员弹层全选行与人员行改用 `size="lg"`，仍复用同一 `Checkbox`，不自绘。实测 20×20 / r4 / 1px `rgb(201,205,212)`。
> - **`Dialog` 按 `1623:20467` 重做**：弹窗 **311×176 / r16**（原 r12）；文案展示 `pad 26/24`、`gap 8`、标题 18/24 w600 `#1D2129`、正文 **16/22 w400 `#86909C`**（原 14/22 `#4E5969`）、整体居中；操作区 **48 高**，两个 **白底 1px `#F2F3F5` 描边**按钮（原为「取消 outline + 我知道了实心 teal」），**左「确定」`#00AAA6`、右「取消」`#1D2129`**，16/22 w500，中间 1px 竖分隔线；上边框改用 `inset box-shadow` 避免把 176 撑成 177。实测 311×176、r16、按钮 155/156×48、`show-cancel=false` 时单按钮 311 宽。按钮属 Figma `button` 实例的白底描边变体，**未并入 `Button` 的 15 个变体**（避免污染）。
> - **组件画廊隐藏 3 项**（用户「隐藏，模板页中有就可以」）：「典型页面」分组移除 访客预约首页 / 新建预约流程 / 预约详情页，只保留 **模板页面**（这三页在工作台内已可预览，页面文件与 10 条路由保留）；`ComponentGallery.vue` 同步删除 3 个无用 import。画廊由 **6 组 36 项 → 6 组 33 项**（设计规范 1 / 典型页面 1 / Field 5 / 通用组件 14 / 业务组件 6 / Popup 6）。
> - **浏览器实测**：nav 6 组 33 项、典型页面只剩「模板页面」、旧入口为 0；成员弹层行高 44/48 与 gap 0、复选框 20×20、footer 46 + 箭头 14×14；Dialog 311×176 / r16 / 18·16 字号 / 颜色 / 双按钮；表单页 Dialog 311×176 单按钮；控制台零错误。

> **2026-11-10 16:4x 三处新反馈（用户 3 张截图：icon 不对、改成预约记录页、加一个安保端的页头）**：
> - **`AppointmentRecordCard` 图标改对（用户「icon不对」）**：Figma `1723:28208` > `card` > **`scan-qr-code` INSTANCE 40×40（内 `VECTOR shape` 33.3×33.3 `#262626`）**，此前实现是 `qr-placeholder.png` 的 `<img>`（二维码图案），属视觉错误。现改为 `IconBox name="scan-qr-code" :size="40" color="#262626"`，`qr-placeholder.png` 从该组件移除（`QRCode.vue` 仍用它，保留）。
> - **卡片结构按节点重排到 351×156**：`header` 327×24 只放标题（16/24 w600，色 **`#101828`**，原 `#1D2129`）→ `gap 8` → `card` 327×100 = `content`（状态胶囊 + 3 行，`gap 4`）+ 右侧 40×40 图标（`gap 8`）。原实现把状态标签放进 header（标题 24 + 标签 22 + gap 8 + 明细 74 = 124，加 padding 撑到 **160**），现为 24+8+100+24 = **156**，实测 351×156 / r12 / pad 12 / gap 8。
> - **状态胶囊复用 `InlineInput`，不新建组件**：Figma 该处节点名仍是 `input` 62×22 / r99 / `#F9CC45` / pad 左右 **10** / `14/22 w600` 白字（`addBefore` / `addAfter` 在该变体下不可见，故不渲染图标）。`InlineInput` 补 `padding`（默认 4）与 `weight`（默认 400）两个可选属性，卡片传 `:padding="10" :weight="600"`；实测 62×22 / r999 / `rgb(249,204,69)` / pad `0 10` / 14px 600。状态色：审批中 `#F9CC45`、已通过 `#23C343`、未通过/已拒绝 `#F76560`。
> - **新增页面 `AppointmentRecordPage.vue`（用户「改成预约记录页」）**：模板工作台第 10 张卡片由「预约记录卡片（单张组件）」改为 **「预约记录页」**，依据 Figma「用户端 > 预约记录」**`1083:24323`**——`box` 375×52 / pad 12/16 的标题行（16×16 返回 + 「预约记录」20/28 w600 `#1D2129`，gap 8）、`alert` 351×40 / r4 / `#E8F3FF` / pad 9/16（16 图标 + 「仅展示最近14天的预约单」14/22）、记录卡 351×156 ×4、`gap 12`；全部复用 `AppointmentRecordCard`，页面内不复制卡片样式。新增路由 `/appointment/records`（共 **11 条**）；`SpecialPageView` 的 `kind='detail'` 分支与其 `registration` 常量随之删除（改由新页面承载）。
> - **新增 `SecurityHeader.vue`（用户「加一个安保端的页头」）**：Figma「安保端 > 详情」**`1042:17750` > `navbar-web`**（375×88）> `wrapper` 375×44 / pad 12/16 —— 左 `left` 56×20（两个 20×20 图标 + gap 16）、标题 17/18 **w500** `#1D2129` 居中、右侧 `more` 20×20（该页截图为空，改为 `right` 插槽不默认渲染）。图标取设计稿原始 path（`arrow-left` 8.25×14.14、`close` 13×13），在 `IconBox` 里用 `transform: translate()` 平移到 20×20 盒居中，未自绘字形。原型不渲染系统状态栏，只还原 **44 高**导航本体，与其余页面 header 口径一致。已加入 `index.js` 导出、组件库「通用组件」分组（现 **15 项**）与 `SecurityHeader` demo（点返回/关闭回显操作）。
> - **数量口径**：`index.js` **30 个导出**（29 独立 + 1 别名）/ `src/components/figma/*.vue` **31 个** / 画廊 **6 组 34 项**（设计规范 1 / 典型页面 1 / Field 5 / 通用组件 15 / 业务组件 6 / Popup 6）/ 页面 `.vue` 9 个（含 `PageFrame` / `LocaleSwitcher`）/ 路由 **11 条**。
> - **浏览器实测（CDP 真实点击 + 计算样式回读）**：卡片 351×156 / r12 / pad 12 / gap 8，标题 16/24 600 `rgb(16,24,40)`，胶囊 62×22 / r999 / `rgb(249,204,69)` / 0 10 / 14px 600，明细 3 行 22 高 `rgb(134,144,156)`，`qr` 40×40 **无 `img`**、`svg` path fill `rgb(38,38,38)`；页头 375×44 白底、标题 17/18 500 居中偏移 0、left 距左 16 / gap 16 / 两枚 20×20；模板卡 10 张、末张「预约记录页」；记录页 4 张卡（审批中/已通过/未通过/已通过）且 `scrollWidth == clientWidth`；控制台零错误。

> **2026-11-10 17:4x 两处新反馈（成员弹层「无分割线，无背景」+ 模板页增加安保端详情）**：
> - **成员弹层去掉两条多余线/底色（用户红框「无分割线，无背景」）**：① `.member-row--all` 删除 `box-shadow: inset 0 -1px 0 #F2F3F5`——上一轮按 Figma `content` stroke 补的「全选行底分割线」在实机上被读成多余分隔线，用户裁决**不要**；② `.member-popup__footer` 删除 `border-top: 1px solid #F2F3F5` 与 `background: #FFFFFF`（改 `transparent`）——底部已选/确定栏不再是一条独立白底带，与弹层主体同一底色。实测 `allRow.boxShadow = none`、`allRow.borderBottomWidth = 0`、`footer.borderTopWidth = 0`、`footer.backgroundColor = rgba(0,0,0,0)`、footer 仍 46 高（尺寸不变，只去掉线与底色）。
> - **新增页面 `SecurityDetailPage.vue`（用户「模板页增加安保端详情」）**：依据 Figma「安保端 > 详情」**`1042:17750`**（375×812）。结构 = `SecurityHeader`（44，标题「详情」）+ `page-header` **375×142**（pad 12/20、gap 8、白底、内底 1px `#E5E6EB`）内：标题 **20/28 w600 `#101828`**（两行 56 高）、meta 行（「已通过」胶囊 62×22 `#23C343` + 两个 soft tag 49×24 / 43×24）+ 预约编号 14/22 `#86909C`；`tabs-line` **375×40**（基础信息 / 审批记录 / 出入记录，激活 14/22 w600 `#00AAA6` + 2px INSIDE 下划线，gap 32）；`body` pad 16 / gap 12。三个页签内容分别复用 `Field readonly` 卡 ×2 + `UserCard` + `VehicleCard`（基础信息）、`ApprovalRecord`（审批记录）、`ApprovalTimeline`（出入记录）；点「更多」开 `Popup` + `SelectList` 展示 10 人名单。新增路由 `/security/detail`（共 **12 条**），模板工作台新增第 **11** 张卡片「安保端详情」。
> - **`Tag` 新增 `variant="soft"` 与 `icon` / `iconSize` / `iconColor`**：Figma `page-header > Frame 49` 的两个灰底 tag 是 **24 高 / pad 2·8 / r4 / `#F2F3F5` 底 / 14/20 `#1D2129`**，前置图标 **14×14 `#4E5969`**；原有 `Tag` 只有实心胶囊（`min-height 22`、`r999`）。`soft` 变体用 `.figma-tag.figma-tag--soft` 提高特异性（`status` 默认 `neutral` 的 `#C9CDD4` 会盖掉灰底），未新建组件。实测两个 tag 48×24 / 42×24、`r4`、`rgb(242,243,245)`、图标 14×14 `#4E5969`。
> - **`IconBox` 新增 `user` / `car` 两个图标**：直接取设计稿原始 path（`Union` **11.1×11.1**、`Union` **12.3×10.2**，均 `#4E5969`），`transform: translate()` 平移到 14×14 盒居中，未自绘。实测两枚 svg 均 14×14、`fill = rgb(78,89,105)`。
> - **数量口径更新**：`index.js` **30 个导出**（29 独立 + 1 别名）/ `src/components/figma/*.vue` **31 个** / 画廊 **6 组 34 项**（设计规范 1 / 典型页面 1 / Field 5 / 通用组件 15 / 业务组件 6 / Popup 6）/ `src/pages/` **10 个 `.vue`** / 路由 **12 条** / 模板工作台 **11 张卡片**。`Tag` 与 `IconBox` 是能力扩展（新增可选 prop / 新图标），**不新增导出数**。
> - **浏览器实测（CDP 真实点击 + 计算样式回读）**：成员弹层全选行 44 高、无阴影无下边框，footer 46 高、透明无上边框；模板工作台 11 张卡片（「安保端详情」第 9 张、「预约记录页」第 11 张）；详情页页头 44、`page-header` **142** / pad `12px 20px` / gap `8px` / `inset 0 -1px 0 #E5E6EB`、标题 20·28·600 `rgb(16,24,40)`、胶囊 62×22 `rgb(35,195,67)`、两个 soft tag 24 高 r4 `rgb(242,243,245)` + 图标 14×14、`tabs` **375×40**、三页签切换内容正常（审批记录 / 出入记录）；`/security/detail` 独立打开 `scrollWidth == clientWidth`、控制台零错误。

> **2026-11-10 18:1x 安保端 tab 没撑满容器（用户「tab 撑满容器 / 组件已实现过一次，为啥和设计稿有出入、缺少了什么约束」）**：
> - **根因（一句话）**：页面为了给 375 白底 tabs-line 覆写尺寸，写了 `.sd-tabs { display: block; ... }`；这个 `display:block` 把组件内部的 `display:flex` **静默顶掉**，于是 `button` 的 `flex:1` 全部失效、三个 tab 退回内容宽 **72px** 挤在左边，右侧留出大片空白。实测修复前 `nav.display = "block"`、`btns = [{w:72,x:445},{w:72,x:517},{w:72,x:589}]`；修复后 `display:"flex"`、`[{w:125},{w:125},{w:125}]` 正好铺满 375。
> - **为什么「同一个组件用错过一次」**：`Tabs` 本身是 `display:flex` + `button{flex:1}` + `width:343`，在 `AppointmentDetailPage`（不传 class、用默认 343）下天然均分，所以那一页从来没暴露问题；问题只在**页面需要非默认尺寸**时才出现——而那正是唯一需要写覆盖 CSS 的场景。
> - **缺少的三层约束（已补）**：
>   1. **组件层**：`width/height/background` 是页面级差异却只能靠 CSS 覆盖表达。→ `Tabs` 新增 `full` / `height` / `background` 三个 prop，`box-sizing:border-box`，底边分隔线由 `border-bottom` 改为 `inset box-shadow`（换 `height` 时不再多出 1px）。页面现在零覆盖样式，只写 `<Tabs full :height="40" background="#FFFFFF" />`。
>   2. **契约层**：原文只有规则 6「不能复制组件内部样式」，没有禁止「覆盖布局模型属性」。→ 新增规则 **11**（页面不得覆盖 `display`/`flex`/`grid`/`position`/`padding`；固定尺寸与底色走 prop，仅允许 `:deep(.x){width:100%}` 这类容器自适应）与规则 **12**（组件把可调外观收敛成 prop 并在 2.0 表登记）。
>   3. **自检层**：`quality-gates.md` 增一条「页面样式不出现对组件根元素的布局覆盖」检查项。
> - **顺带消掉的一个尺寸隐患**：旧 `.tabs{height:42;border-bottom:1px}` 未设 `box-sizing`，实际占位 **43**；改 `box-sizing:border-box` + inset 阴影后精确 42，`AppointmentDetailPage` 实测 343×42、两个 tab 各 172，页签切换与视觉无回归。
> - **Figma 口径差异说明（保留事实）**：设计稿 `1042:17763` > `tabs-group` 是 pad 左 16 / gap 32 / 每项 56 宽（左对齐、右侧留白）；用户本轮裁决为「撑满容器」，与 `AppointmentDetailPage` 现有均分形态一致，故按均分实现，**以用户裁决为准**，Figma 的左对齐取值记录在此备查。

> **2026-11-11 新建预约「访客信息」加入同行人 / 车辆卡片并左右撑满**：
> - **问题实况**：`AppointmentFormPage` 里其实早就有 `<UserCard state="default" />` / `<VehicleCard state="default" />`，但页面 CSS 写了 `:deep(.list-card){width:100%;padding:0}` 且 `:deep(.list-card__header), :deep(.list-card__add){display:none}` —— 标题和添加按钮都被隐藏、`padding` 归零，实测两张卡 **高度 0、完全不可见**（宽度还因 scoped 特异性没被覆盖成功，仍是 311）。这是规则 11 所禁的「页面覆盖组件内部布局/结构」的又一个实例。
> - **Figma 依据**：用户端「新建预约」`1087:25278` > `box` 343 / gap 12 → `card` `1087:25323` 同行人 **343×244 / pad 16 / gap 12 / r12 白底**、标题 16/24 w600、按钮 **311×40 / r20 / 1px `#E5E6EB` / 16-20 w500**；`1087:25329` 车辆 **343×176 / pad 16 / gap 12 / r12**。两张卡与上方「访客信息」卡同为 343 满宽、卡间距 12。
> - **改法（全部走 prop，页面零覆盖）**：`ListCard` 新增 `full`（`width:100%`）/ `padding`（默认 12，表单传 16）/ `addIcon`（默认 false）；`UserCard` / `VehicleCard` 透传 `full` / `padding`，`VehicleCard` 根节点加 `--full` 撑满。`AppointmentFormPage` 把两张卡从 `.form-panel` 里**移出**，作为独立白卡放进 `.companion-stack`（`margin-top:12px` + `grid gap:12px`），删掉 4 条 `:deep` 覆盖；顺带把 `AppointmentDetailPage` / `SecurityDetailPage` 里同类 `:deep(... width:100%)` 改成 `full :padding="16"`。
> - **图标口径**：Figma 按钮实例 `1087:25328` 带 16×16 plus，但用户 11-11 截图（空态）按钮内**只有居中文字、无加号**。按用户截图裁决 `addIcon` 默认关闭，Figma 原态可显式开启，差异记录备查。
> - **组件内部视觉对齐 Figma**：`ListCard` 的 content gap 8→12、header→content 间距 8→12、添加按钮 14/20 400 → **16/20 w500** 且固定 40 高、边框 1px `#E5E6EB`、r20；底白不变。
> - **CDP 实测**：内容区 343、`.companion-stack` 343 / gap 12；两张卡各 **343 宽 / pad 16 / r12 / 白底 / 高 108（空态）**、标题 16px 600、按钮 **311×40 / r20 / 1px `rgb(229,230,235)` / 16px 500**；点「添加同行人」正常弹出「姓名」表单弹层；`scrollWidth == clientWidth`；`/appointment/detail` 与 `/security/detail` 的同行人 / 车辆卡均为 343 / pad 16；画廊 6 组 34 项不变；控制台零错误。

## 一、硬性调用规则

1. Figma 和本注册表存在对应组件时，页面必须调用注册组件。
2. 禁止使用原生 HTML 或默认 Vant 视觉替代已注册组件。
3. Vant 只能提供基础行为；视觉必须由注册组件覆盖为 Figma 样式。
4. 禁止在页面内重新编写已注册的 Field、Button、Steps、Checkbox、Card、Popup 或 Picker 结构。
5. 页面生成前必须列出组件依赖；依赖组件为 `pending` 时，不得用临时 HTML 跳过组件沉淀。
6. 业务页面只能通过组件 Props、事件和需求输入传递数据，不能复制组件内部样式。
7. 每个组件变更必须更新本文件、组件文档和对应回归记录。
8. 只有完成「补资料 → 实现 → 运行 → Figma 对照 → 确认」后，组件才能从 `pending` 改为 `ready`。
9. 页面模板只能引用 `components/figma/` 下的组件，不从 `src/components/` 旧目录复制样式或结构。
10. 设计规范数值以 `design-spec-from-figma.md` 第九节 / 9.7 / 11.6 为准（用户 2026-11-05、11-06 裁决）。
11. **页面不得覆盖组件的「布局模型」属性**：`display` / `flex` / `grid` / `position` / `float`，以及组件的 `padding`。组件根元素的 class 会与页面传入的 class **合并**，且页面 scoped 样式与组件 scoped 样式特异性相同（都是 `.cls[data-v-x]`），打包后**谁声明在后谁生效**——页面写一句 `display:block` 就能静默顶掉组件内部的 `display:flex`，把 `flex:1` 撑满的子项全部打散。**固定尺寸与底色**（设计稿给出的 `width` / `height` / `background`，如 tabs-line 375×40 白底）同样必须走 prop，不得在页面写死；唯一允许的例外是「容器内自适应」的 `:deep(.x) { width: 100% }`（组件没有满宽 prop 时让它在卡片里铺开，不改变组件内部布局）。组件缺 prop 时，**先给组件补 prop 再调用**。
12. 组件内部若依赖某种布局（如 `Tabs` 的 `display:flex` + 子项 `flex:1`）来实现设计稿形态，必须在组件里把「页面可调的外观」收敛成 prop（参考 `Tabs` 的 `full` / `height` / `background`、`InlineInput` 的 `padding` / `weight`、`Tag` 的 `variant`），并在 2.0 表备注列出，避免下个页面重新踩坑。
13. **弹层结构规范（用户 2026-11-12 底色澄清 + 2026-11-13 结构规范）**：底部 `Popup` / `LanguagePopup` / `MemberSelectionFlow` / `PersonListPopup` 的外层背景为 `#F2F3F5`，内部内容卡片（`.agreement-card` / `.list` / `.member-popup__list` 等）为白底 `#FFFFFF`；居中 `Dialog` 与日历 / 级联保持各自组件内白底。不要再把 `van-popup` 根全局强制成白色。**长标题一律换行，不允许截断、省略号或被右上关闭按钮遮挡**。协议确认 `Dialog` 按钮顺序为左「返回」、右「同意并继续」；协议名称统一 `#00AAA6` 且可点击打开对应 Popup。
    **弹层四段结构（用户 2026-11-13 给定，所有底部弹层 / 入园操作这类弹层页统一口径）**：
    - **容器**：背景 `#F2F3F5`；
    - **action-header（标题区）**：默认 **64px**（`min-height:64px` + 自动增高），标题**不能截断 / 隐藏，超出换行**，不被关闭按钮遮挡；
    - **内容区**：左右边距 **16px**；内容卡 padding **16px**、块间距 **12px**；`list` / `form` 类组件**自带间距的不再叠加**（纯列表额外间距为 0）；「搜索 + 列表」这类组合之间间距 **12px**；
    - **底部操作（Bottom operation）**：padding **16px**，**总高度最高 80px**（含 padding；按钮 40 高 → 76，auth 两行文案 → 80）。落地组件：`ActionBar.vue`、`Popup.vue` 注释、`SpecialPageView.vue` entry / approval footer。
14. **组件能力不够或未覆盖时，先问后改（用户 2026-11-13 裁决）**：命中「组件缺这个能力 / 注册表里没有这个组件」时，不得直接扩通用组件、自造页面结构、或用临时 HTML / 页面 CSS 绕过。必须先输出：① 缺的是什么能力、命中哪个组件 / 哪个 prop；② 2–3 个可行的**交互方案**，各自说明改哪些文件、对现有页面与组件的影响、是否符合多语言换行 / 长标题 / 弹层底色等既有口径；③ 推荐方案与理由。**等用户明确裁决选一个后才动手**；裁决后仍优先用现有 prop，确实缺才补最小 prop。当前登记在案的能力缺口：`Field` 只读态单行 `<input>` 无法换行、`CollapseItem` / `FieldCheckbox` / `ScanFrame` 未沉淀、`IconBox` 图标集待补。

## 二、当前组件清单（权威：2026-11-10 三方对齐）

代码路径统一为 `templates/project-starter/src/components/figma/<组件名>.vue`；「画廊」= `/components` 组件库 `ComponentGallery.vue` 的分组与条目 id。

### 2.0 三方对齐权威表（33 个导出 / 34 个 `.vue` / 画廊 6 组 37 项）

| 口径 | 数量 | 说明 |
|---|---|---|
| `src/components/figma/index.js` 导出 | **33** | 32 个独立组件 + 1 个兼容别名 `FlowRecordCard`；2026-11-13 新增 `CollapseItem` / `FieldCheckbox` / `ActionBar` |
| `src/components/figma/*.vue` | **34** | 上述 33 个 + `ListCard.vue`（`UserCard` / `VehicleCard` 的共享内部基座，**不导出、不单独复用**） |
| `ComponentGallery.vue` 导航 | **6 组 37 项** | 设计规范 1 + 典型页面 1 + Field 5 + 通用组件 18 + 业务组件 6 + Popup 6；其中含规范面板 1、页面原型 1、组合演示 5（FieldDate / FieldLanguage / FieldMember / FieldInput / SelectListSheet）、卡片组合演示 1（`CardVariants`） |
| 内部工具 | 1 | `usePopupTeleport.js`（不是组件，不计入数量） |

> **对齐规则**：新组件必须同时进 `index.js`、`ComponentGallery.vue`、本文件 2.0 表；只做内部共享的 `.vue`（如 `ListCard`）不导出、不进画廊，但要在 2.0 表登记。组件名全量去掉 `Figma` 前缀；CSS 类名 `figma-*`、目录 `components/figma/`、画布类 `.figma-phone` 保留。

**通用 / 输入类组件**

| 组件 | Figma 来源 | 画廊分组 / id | 状态 | 备注 |
|---|---|---|---|---|
| `Field` | `5:374` `field-input` 组件集 | Field / `Field` | pending | 5 态：默认 / 聚焦 / 填充 / 只读 / 禁用 |
| `Steps` | `1686:11131` steps-dot 303×36 | 通用组件 / `Steps` | pending | 三步流程 |
| `Button` | Figma `1623:15263` 等 + 用户 11-06 变体截图 | 通用组件 / `Button` | pending | 5 色系 × 3 形态 = 15 变体；主色 `#22BBB3` |
| `ActionBar` | 用户 2026-11-13「动作栏三种样式」截图 | 通用组件 / `ActionBar` | pending | `variant` = `dual`（取消 / 提交）/ `selection`（已选摘要 + `up` 箭头 + 确定(N)）/ `auth`（附加授权扫码 + 取消 / 下一步）；按钮复用 `Button`、图标复用 `IconBox`；已选摘要展示完整文案并换行，**不用省略号**（多语言约定）；入园操作与审批页统一调用本组件 |
| `Checkbox` | `1551:11134` 162×22（框 14×14 / r2）；成员列表用 `1803:33585` 的 `.radio-icon` 20×20 / r4 | 通用组件 / `Checkbox` | pending | 协议与核查；`size` prop：`md` 14×14、`lg` 20×20；`MemberSelectionFlow` 用 `lg` 复用本组件，不自绘 |
| `CollapseItem` | `1722:27223` / `1688:24312` collapse-item 343×370（header 40 + body slot） | 通用组件 / `CollapseItem` | pending | **2026-11-13 补齐 Figma P2 缺口**；`title` / `defaultOpen` / `disabled` / `showIcon`；标题行 40 高、长标题换行；与 `ApprovalRecord` 的业务分组折叠是「通用容器 vs 业务组件」，不互相替代 |
| `FieldCheckbox` | `1687:24203` field-checkbox 319×168（field-title 24 + Right 116） | 通用组件 / `FieldCheckbox` | pending | **2026-11-13 补齐 Figma P2 缺口**；`label` / `required` / `options` / `modelValue` / `selectAll` / `selectAllLabel`；内部复用 `Checkbox size="lg"`，**不自绘勾选框**；用于「检查项确认」等字段级多选 |
| `Tag` | `1623:15312` / `1623:20316`；soft 变体取安保端详情 `1042:17750` > `page-header` > `Frame 49` > `tag` | 通用组件 / `Tag` | pending | `variant`（`solid` 默认实心胶囊 / `soft` = 24 高 · pad 2·8 · r4 · `#F2F3F5` 底 · 14/20 `#1D2129`）+ `icon` / `iconSize`（默认 14）/ `iconColor` |
| `Tabs` | `1623:20291` tabs-line 343×42；安保端 `1042:17763` tabs-line 375×40 | 通用组件 / `Tabs` | pending | `full`（撑满父容器）/ `height`（默认 42）/ `background`（默认 `transparent`）三个 prop 表达页面级差异；**页面禁止用 class 覆盖 `display`/`width`/`height`**，改为传 prop（否则会顶掉内部 `display:flex`，`button` 的 `flex:1` 失效、tab 挤在左侧）；底边分隔线用 `inset box-shadow` 不占高度 |
| `SelectList` | `1721:27132` Select List 343×156 | 通用组件 / `SelectList` | pending | 行 44、gap 12、无分割线；`padded` prop 供弹层补 16 上下内边距 |
| `Uploader` | `1686:20447` field-upload 311×132 | 通用组件 / `Uploader` | pending | Vant 只提供上传行为 |
| `EmptyState` | `1723:28234` 311×316 | 通用组件 / `EmptyState` | pending | 本地 no-data 资源 |
| `QRCode` | 「整合页面 > 首页 > scan-qr-code」`1747:24918`（Arco IconBox 图标）+ 本地 `qr-placeholder.png` | 通用组件 / `QRCode` | pending | 最小 160、假码仅展示；扫码图标由 `IconBox` 的 `scan-qr-code` 承载 |
| `ContentRow` | `1686:23205` content 343×44 | 通用组件 / `ContentRow` | pending | 国旗 + 国家名 + 区号 + 勾选 |
| `InlineInput` | `1893:20270` input 62×22；预约记录卡片 `1723:28208` > `content` > `input` | 通用组件 / `InlineInput` | pending | 行内状态标签，不是文本输入框；`padding`（默认 4）/ `weight`（默认 400）供卡片传 `10` / `600` |
| `Search` | 「整合页面 > 泰国 > 搜索园区精确到门」`1822:38312`；「安保端-搜索页」`1035:8201`；用户 2026-11-13 扫码截图 | 通用组件 / `Search` | pending | **两种样式按 `#prefix` 自动切换**：不带下拉 32 高 r17；带下拉 40 高 r4。`scan` prop 增加右侧扫码入口（复用 `IconBox` 的 `scan-qr-code`，emit `scan`）；`trigger` = `input`（默认，本地数据即时）/ `debounce`（`debounceMs` 默认 300）/ `enter`，回车在三种模式下都作立即搜索兜底，输入法组合期间不误发；**延迟触发 vs 回车触发的选型待用户裁决** |
| `SecurityHeader` | 「安保端 > 详情」`1042:17750` > `navbar-web` > `wrapper` 375×44 | 通用组件 / `SecurityHeader` | pending | 白底 44 高：左「返回 + 关闭」20×20 gap 16、标题居中 17/18 w500 `#1D2129`、右侧 `right` 插槽；图标为设计稿 path（`arrow-left` / `close`） |
| `Dropdown` | 「安保端 > 访客出入登记 > 筛选」（80 宽、5 字省略） | 通用组件 / `Dropdown` | pending | 触发器 + `Popup` + `SelectList padded`；修复「点了像没触发」 |
| `Cascader` | 「整合页面 > 泰国 > 选择园区」`1822:36720` / `1822:38307` | 通用组件 / `Cascader` | pending | 园区 → 门两级；32 高搜索框 + 44 高层级 tab（无分割线）；`selectedValueAt()` 保留末级选中态 |
| `IconBox` | Arco IconBox 团队图标，Figma 节点导出的 SVG path | **无独立条目**（嵌入 `QRCode` / `SecurityHeader` / `典型页面`） | pending | `scan-qr-code` 为规范名，`scan` 保留兼容别名；现有 `scan-qr-code` / `info` / `location` / `plus` / `down` / `up`（同 chevron 旋转 180°）/ `arrow-left` / `close` / `user`（11.1×11.1）/ `car`（12.3×10.2）（后四者来自 `1042:17750`，path 原样 + `transform` 居中）；`pathAttrs` 统一组装 `fill-rule` 与 `transform` |

**业务卡片 / 记录类组件**

| 组件 | Figma 来源 | 画廊分组 / id | 状态 | 备注 |
|---|---|---|---|---|
| `UserCard` | `1623:15330` / `1623:13303` / `1623:15088`；新建预约空态 `1087:25323` | 业务组件 / `UserCard` | pending | 默认 / 填充 / 详情；同行人 16px、最多展示 5 个，其余走「更多」；`full` / `padding` 透传 `ListCard`，页面级宽度一律走 prop |
| `VehicleCard` | `1623:15278` / `1722:27597`；新建预约空态 `1087:25329` | 业务组件 / `VehicleCard` | pending | 默认 / 填充，编辑 / 删除；`full` / `padding` 透传 `ListCard`，根节点同步撑满 |
| `CardVariants` | 用户提供的四种卡片截图 | 业务组件 / `CardVariants` | pending | 组合演示；第 4 张复用 `AppointmentRecordCard` |
| `AppointmentRecordCard` | `1723:28208` `llistcard` 351×156 | 业务组件 / `AppointmentRecordCard` | pending | **2026-11-10 由 `RegistrationCard` 更名**；标题 16/24 w600 `#101828`、状态胶囊 `InlineInput` 62×22、3 行明细 14/22 `#86909C`、右侧 `scan-qr-code` 40×40 `#262626`；被预约记录页 / 卡片样式复用 |
| `ApprovalRecord` | `1722:27401` 审批记录 343×330 | 业务组件 / `ApprovalRecord` | pending | 折叠列表 + 三级审批 |
| `ApprovalTimeline` | `1687:24064` 流程记录 343×530 | 业务组件 / `ApprovalTimeline` | pending | 出入记录；「更多」打开只读人员列表 |
| `MemberSelectionFlow` | `1803:33585` 选择入园人员 / `1803:33841` 已选列表 | **无独立条目**（嵌入 Field / `FieldMember` demo） | pending | 行高 44/48 紧贴（gap 0）、姓名 16/24 w500、复选框 `size="lg"` 20×20；tag 28px；底部 action-bar 46 高，「已选人员：N项」14/20 `#22BBB3` + 14×14 `up` 箭头，点击打开已选列表叠层；右侧胶囊 46 高 16/22 w600 |
| `ListCard` | `UserCard` / `VehicleCard` 的共享卡片基座；新建预约 `1087:25323` / `1087:25329` | 无（内部） | — | **不由 `index.js` 导出**，页面不得直接引用；prop `full`（撑满 343）/ `padding`（默认 12，新建预约传 16）/ `addIcon`（默认关）；添加按钮 40 高 r20 1px `#E5E6EB`、16/20 w500 |

**弹层类组件**

| 组件 | Figma 来源 | 画廊分组 / id | 状态 | 备注 |
|---|---|---|---|---|
| `Popup` | `1623:20325` popup 375×328 | Popup / `Popup` | pending | 通用底部抽屉；最大高度 = 画布高 − 80px；统一 `usePopupTeleport()` 挂进 `.figma-phone` |
| `DatePicker` | 无确认节点（`van-calendar` 行为） | Popup / `DatePicker` | pending | `Field` 只读态点击后打开的独立弹层 |
| `LanguagePopup` | `4:4202` 切换语言 375×812 | Popup / `LanguagePopup` | pending | 卡片上下 20、行 44、gap 12、无分割线 |
| `PersonListPopup` | `1803:33841` 已选列表 375×801 | Popup / `PersonListPopup` | pending | 返回 / 清空 / 单个删除；`stacked` 叠层偏移 12px |
| `Dialog` | `1623:20467` dialog 311×176 / r16 | Popup / `Dialog` | pending | **2026-11-10 新增并按节点重做**；居中确认弹窗：标题 18/24 w600 `#1D2129`、正文 16/22 `#86909C`、pad 26/24、gap 8；操作区 48 高，两个白底 1px `#F2F3F5` 描边按钮，左「确定」`#00AAA6` 右「取消」`#1D2129`；表单未勾选协议时调用 |

**兼容别名 / 非组件**

| 名称 | 说明 |
|---|---|
| `FlowRecordCard` | 仍在 `index.js` 导出，内容转调 `ApprovalTimeline`，**不参与新页面生成**（用户裁决「审批记录与流程记录是一个组件」） |
| `DesignSpecPanel.vue` | 组件画廊的可视化规范面板，不是 Figma 组件、不在 `components/figma/` |
| `SelectListSheet` | 画廊内的组合演示（`SelectList` + 底部抽屉），**无独立 `.vue`** |
| `usePopupTeleport.js` | 内部工具，把 Vant Popup 挂进 375 画布，修正弹层水平偏移 |

> **命名勘误（2026-11-10）**：2.2 历史基线表里的 `RegistrationCard` 已更名为 `AppointmentRecordCard`；旧名在工程内清零。2.1 历史基线里 `QRCode` 的「无独立 Figma 节点」仅指二维码图片本身，扫码图标现有 Figma `1747:24918 · scan-qr-code` 依据。

### 2.1–2.3 历史基线（2026-11-06，20 + 1 口径）

> 以下三张表是当时的逐项 Figma 核对记录，**数值与备注继续作为视觉依据**；数量、命名、新增组件一律以 2.0 表为准。每轮新增组件必须同步回写 2.0，不再往历史基线表里追加。

> **页面归属（用户 2026-11-06 指出「这种 `1747:19635` 的代码无法判断是哪个页面」）**：本节组件的 Figma 视觉来源**主要位于「——模板——」页 `1550:3803`** 下的 `1553:22258`「通用组件」与 `1623:13302`「业务组件」两个 SECTION（例外：`InlineInput` 在「业务组件」，主组件定义在文件级）。**2026-11-10 补充**：`Search` / `Dropdown` / `Cascader` / `QRCode` 的图标与部分样式来自「整合页面」`1747:19633` 与安保端搜索页，见 2.0 表逐项来源。
>
> 下表「Figma Node」列中的 `数字:数字` 是 REST API 检索值，**阅读时请配合 `figma-node-index.md`**：那里给出每个编号的「所在页面 > 位置 > Figma 名称」和可点击的 Figma 链接。今后新写编号必须同时给出页面与名称，不写裸编号。

### 2.1 通用组件（11）

| 组件 | Figma Node / 来源 | 预览分组 | 状态 | 待确认 |
|---|---|---|---|---|
| `Steps` | `1686:11131` · steps-dot 303×36 | 通用组件 | pending | — |
| `Button` | 用户 2026-11-06 变体截图（5 色系 × 3 形态）+ Figma `1623:15263` / `1623:15264` / `1758:27929` / `1758:27931` · 200×44 | 通用组件 | pending | **主色已按 Figma 纠偏（2026-11-09）**：teal 实心/描边 = **`#22BBB3`**（Figma `button` 实例 fill 84 处：44 高 77 + 40 高 7；= `primary-5`），此前 `#5AB9B2` 系从 11-06 截图逐格取色所得，**token / SVG / Figma 三处均无此值**，已作废；文字 `#FFFFFF`（86 个实例一致）、16/20/w500。**仍为截图取色、无节点依据**：`red #E24F48`、`orange #EF8432`、`green #51B242`、`neutral #F2F3F5`，以及五色系的禁用色（teal 禁用现为 `#98D1CF`；token 另有 `primary-3 #79DDD1` 用于「禁用主按钮实色」，是否统一待裁决）；5 色系业务语义名待确认 |
| `Field` | `5:374` COMPONENT_SET `field-input`；单行 `1551:11096`（311×76）、带错误 `1718:20281`（311×98）、多行 `1687:23533` `field-textarea`（311×100） | Field | pending | **已实现 5 态**：默认 / 聚焦 / 填充 / 只读 / 禁用（视觉依据为用户 11-06 提供的状态截图）；Figma 组件集**无「聚焦」变体**，聚焦态按截图实现。**2026-11-09 逐属性核对**：`padding 10/0/10/0`、`itemSpacing 8`、底部分割线为 **INSIDE stroke 1px `#F2F3F5`**（已改用 `box-shadow: inset 0 -1px 0`，避免 border 把 76 撑成 77）；label 16/24/w500/`#4E5969`、`*` 14/24/`#F53F3F`、值 16/24/`#1D2129`、错误 12/18/`#F53F3F`（距值 4）、计数 `word-limit` 12/16/`#4E5969`；箭头 16×16 `#C9CDD4`。**311×98 = 单行 + 错误提示**（76+4+18），已不是「多行变体」疑问；**多行 = `field-textarea` 311×100**。仍待确认：值文字字重 Figma 内不一致（w400／w500／w600 三种并存，全文件 118/104/41 处）；textarea 实例的 label 为 w400、单行实例为 w500；title 内 `question-circle` 帮助图标 14×14 `#86909C` 未实现 |
| `Checkbox` | `1551:11134` · 162×22 | 通用组件 | pending | — |
| `Tag` | `1623:15312` / `1623:20316` · tag / tag-fill | 通用组件 | pending | — |
| `Tabs` | `1623:20291` · tabs-line 343×42 | 通用组件 | pending | — |
| `SelectList` | `1721:27132` · Select List 343×156 | 通用组件 | pending | — |
| `Uploader` | `1686:20447` · field-upload 311×132 | 通用组件 | pending | — |
| `EmptyState` | `1723:28234` · 311×316 | 通用组件 | pending | — |
| `QRCode` | 二维码图片**无独立 Figma 节点**（本地占位资源 `qr-placeholder.png`）；扫码图标见 2.0 表「整合页面 > 首页 > scan-qr-code」`1747:24918` | 通用组件 | pending | **已确认**：最小尺寸 **160**、**假二维码仅展示用**、样式沿用用户提供的资源；该资源是否即 `qr-placeholder.png` 待确认。代码已加 160 下限 |
| `ContentRow` | `1686:23205` · INSTANCE `content` 343×44（主组件 `36:3918`，带 `body` slot），位于「——模板——」>「通用组件」 | 通用组件 / Field > 输入类 | pending | 用户 11-06 要求「沉淀下我看看」，已独立沉淀；视觉 = 国旗 + 必填星 + 国家名 + 区号 + 勾选的**列表内容行** |
| `InlineInput` | `1893:20270` · INSTANCE `input` 62×22（主组件 `13:8238`，属性「状态」），位于「——模板——」>「业务组件」 | 通用组件 / Field > 输入类 | pending | 用户 11-06 要求「沉淀下我看看」，已独立沉淀；视觉是**行内状态标签**（绿色胶囊 + 白字 + 前后图标），不是文本输入框；名称沿用 Figma 节点名 |

### 2.2 业务组件（4）

| 组件 | Figma Node / 来源 | 预览分组 | 状态 | 待确认 |
|---|---|---|---|---|
| `UserCard` | `1623:15330` / `1623:13303` / `1623:15088` · 311×56 / 351×164 / 311×48 | 业务组件 | pending | 支持默认 / 填充两态；填充态通过 `editable` 显示本地编辑、删除图标，并发出 `edit` / `remove` 事件 |
| `VehicleCard` | `1623:15278` / `1722:27597` · 311×56 | 业务组件 | pending | 支持默认 / 填充两态；填充态通过 `editable` 显示编辑、删除图标，编辑打开车辆弹层，删除发出 `remove` 事件 |
| ~~`RegistrationCard`~~ → **`AppointmentRecordCard`** | `1723:28208` · 351×156（Figma 名 `llistcard`，主组件 `409:23362`） | 业务组件 | pending | **归属已确认**（用户 11-06「是」）：即本组件视觉来源。**2026-11-10 更名**：旧名在工程内清零，见 2.0 表 |
| `ApprovalTimeline` | `1722:27401`「审批记录」343×330 / `1687:24064`「流程记录」343×530 | 业务组件 | pending | **已按裁决合并**：保留 `ApprovalTimeline` 视觉（时间轴 + 5px 轨道 + 12px 圆角卡），合入 `FlowRecordCard` 的「更多」点击弹人员列表交互 |
| `MemberSelectionFlow` | `1803:33585`「选择入园人员」/ `1803:33841`「已选列表」· 375×801 | 业务组件 | pending | **字段态已确认**：`2165:15637`「成员选择后」、`1718:20478`「成员只读」均属其字段态。**交互链**：点「人员选择」→「选择入园人员」弹层；点左下角已选人员 →「已选列表」**叠在选人弹层之上**；两个弹层都撑到**最大高度（画布高 − 80px）**。**2026-11-09 修**：字段箭头改为与成员 tag 同一行 flex 居中（原绝对定位在整行中点，含标题行会偏上）、箭头改用 `field-arrow.svg` 16×16 `#C9CDD4`（原文字 `›` 24px `#86909C`）；底部「已选人员：N项」文字与折叠箭头改为同基线（`inline-flex` + 12×12 chevron，实测中心差 0）。已选列表支持返回 / 清空 / 单个删除。**2026-11-09 关闭按钮**：Figma `1803:33590` 的 `PillButton` 36×36 白底 r9999 在 content **左侧**（x=1290，距左 16），`Icon` 16×16 在其中几何居中（+10/+10）；按用户裁决「关闭放在右侧」改到 `right:0`（距屏右 16），icon 由文字 `×` 换成 `van-icon cross` 16×16 + flex 居中（原文字 `×` 靠 `line-height:36px` 只能让行盒居中，字形带侧边留白），浏览器实测图标墨迹中心与圆心差 **0.5px**。**2026-11-09 逐属性核对**：header 375×64（`pad 8/16`、`gap 8`）= Home Indicator 40×4 r100 `#C9CDD4` + content 36，标题 16/22/w600 `#1D2129`（Figma `textAlignHorizontal=CENTER`，保持居中）；`body pad 0/16/16/16 gap 12`；`card 343×563 r12 pad 12/16/16/16`；`form 311` 宽、**行与行 gap 0（相邻紧贴，不是 12）**；全选行 `cell-radio 311×44`、人员行 `user-card 311×48 r12`；头像 24×24 r100（字 14/14/w600）、姓名 16/24/w500、手机/公司/证件 14/22/w400；勾选框 `.radio-icon` **20×20 r4 白底描边 1px `#C9CDD4`**（此前实现 14×14 / 2px 边框，已改）。待确认：header 内 `PillButton` 带 `LabelFrame 49×20` 溢出 36 宽的容器（Figma 里被裁掉，实际只露 icon）、`icon-wrapper 22×22` 与 PillButton 同点重叠的用途 |

> **兼容别名 `FlowRecordCard`**：`FlowRecordCard.vue` 仍在 `index.js` 导出，但内容只是转调 `ApprovalTimeline`，为旧调用方保留，**不参与新页面生成**（用户裁决「审批记录与流程记录是一个组件」）。

### 2.3 弹层组件（5，独立 `Popup` 分组）

| 组件 | Figma Node / 来源 | 预览分组 | 状态 | 待确认 |
|---|---|---|---|---|
| `Popup` | `1623:20325` · popup 375×328 | Popup | pending | 通用底部抽屉容器，内容自适应、**最大高度 = 画布高 − 顶部 80px**（2026-11-09 裁决，见 2.5）。**2026-11-09 关闭按钮**：圆形 36×36 里图标改为 flex 居中 + 16×16 固定盒（原来 `van-icon` 是 inline，靠行盒基线落位，视觉重心偏上偏左），实测图标中心差 0 |
| `DatePicker` | **无确认 Figma 节点**（`van-calendar` 提供行为） | Popup | pending | 已按裁决定位为「`Field` 只读字段点击 + 独立 Popup 弹层」。**2026-11-09 在最大高度规则下实测**：顶部留白 80、弹层 784（画布 864）、日历区 732 且 `scrollHeight == clientHeight` 无内滚、底部「确认」贴弹层底。待确认：`van-calendar` 默认按**连续多月纵向滚动**渲染（一屏可见 2–3 个月），Figma 无对应节点，是否改为单月分页未裁决 |
| `LanguagePopup` | `4:4202`「切换语言」375×812（cascader 375×357）· 越南版-用户端 > 越南版访客预约填报 | Popup | pending | 2026-11-09 定位到真实节点并逐属性对齐：圆角 20 20 0 0、header 64（pad 8/16）、标题 18/24/w600、关闭按钮 36×36、列表卡上下 20 / 圆角 12 / gap 12 / 行 44 高 pad 10·16 |
| `PersonListPopup` | `1803:33841` · 已选列表 375×801（cascader 375×684） | Popup | pending | **高度撑到最大（画布高 − 80px）**，浏览器实测 顶部留白 80 / 弹层 784（画布 864）。**2026-11-09 逐属性核对 + 补齐交互**：header 64（`pad 8/16`）= Home Indicator 40×4 + content 36（`gap 8`）= **返回箭头 22×22 `#1D2129`** + 标题 16/22/w600 **紧跟箭头左对齐** + **「清空」60×32 r4（14/22 `#00AAA6`）**；`body pad 0/16/16/16 gap 12`；`card 343×604 r12 pad 12/16/16/16`；行 `user-card 311×48`、头像 24×24（14/14/w600）、姓名 16/24/w500、行与行紧贴无间距、行尾 **18×18 垃圾桶**（单个删除）。实测：返回后下层仍打开、清空与单个删除都能回落到底层计数。**2026-11-09 叠层**：`stacked` 时高度 `calc(100% - 92px)`（顶部留白 92 = 80 + 偏移 12）、底边贴画布底、关掉自身蒙层（`:overlay="false"`），实测 下层 top 100/h 784/z2001、上层 top 112/h 772/z2002、蒙层只 1 个
| `SelectListSheet` | 画廊内组合演示（`SelectList` 放入底部抽屉），**无独立 `.vue`** | Popup | — | 不计入 20 个组件 |

> **不是独立组件的两项（历史基线口径）**：`DesignSpecPanel.vue` 是组件画廊的可视化设计规范面板（见 `design-spec-from-figma.md` 第九节），不是业务页面也不是可复用 Figma 组件；`SelectListSheet` 是画廊里的组合演示。二者不计入组件数；当前权威计数见 2.0 表。

### 2.4 2026-11-06 逐条裁决：代码落地状态

> 用户已明确「5 全部去掉」「是的推广到全部」「沉淀下我看看」，故本轮执行了 `.vue` 结构改动；逐条依据见 `component-gap-analysis.md` 第八、九节。

| 项 | 契约 | 代码状态 |
|---|---|---|
| 输入框状态 | 所有输入框具备默认 / 聚焦 / 填充 / 禁用四态 | **已实现 5 态**（含用户截图里的「只读」）：`Field.vue` 的 `state` 支持 `default/focus/filled/readonly/disabled`；聚焦态按截图实现（青色下边框 + 闪烁光标），无 Figma 变体可对照。**2026-11-09 字号按 Figma 实测纠正**：label **16 / 24 / w500 / `#4E5969`**（此前误做 14 / w400 / `#86909C`），必填 `*` 14 / 24 / w400 / `#F53F3F`，输入值与占位 16 / 24 / w400 / `#1D2129`，错误提示 12 / **18** |
| 审批 / 流程合并 | 一个组件 + 「更多」可点击 | **已合并**：`ApprovalTimeline.vue` 保留视觉并内置「更多」→ `PersonListPopup`；`FlowRecordCard.vue` 降级为兼容别名 |
| 日期 / 语言 | 放进输入框（只读字段态），另拆 Popup | **已落地**：Field > 日期选择 / 语言选择为只读 Field + 独立 Popup；`Popup` 成为单独导航分组 |
| 人员选择交互 | 点人员选择 → 选择入园人员；已选人员 → 已选列表**叠在其上**，两者都撑最大高度（画布高 − 80px） | `theme.css` 用 `calc(100% - 80px)`，实测 顶部留白 80 / 弹层 784（画布 864）；叠层实测 z-index 2001 → 2002、下层 `display:flex` 保持打开 |
| Button 变体 | 以用户 11-06 第二张截图为准，推广到全部 | **已实现 15 变体**：`tone`(teal/red/orange/green/neutral) × `form`(solid/outline/disabled)，色值从截图逐格取色；保留 `variant/size/disabled/loading` 旧 Props 兼容。**2026-11-09 补**：`size` 三档固定高 **48 / 44 / 32**（`height` 而非 `min-height`，避免 border 把 44 撑成 46），文字**统一 16px / 行高 20 / w500**（Figma `1623:15263` label-text 实测） |
| ContentRow / InlineInput | 独立沉淀给用户看 | **已新建**两个 `.vue` 并在画廊「通用组件」与「Field > 输入类」双入口展示 |
| 组件命名 | 全量去掉 `Figma` 前缀 | **已全量重命名**：23 个 `.vue`、`index.js` 导出、`main.js`、`ComponentGallery.vue` 引用全部同步；`src/` 内 `Figma[A-Z]` 残留 **0 处** |
| 撑满一屏 + 左右布局 | 一屏内展示完，画布不缩放 | **2026-11-09 重做**：删除 `phoneScale` 与 `transform:scale`，画布 **1:1**（375 宽、高度 stretch 撑满剩余视口、内容在 `.phone__screen` 内滚动）；`main--fit` 改 CSS Grid 两栏（左展示 / 右说明），说明栏 320–420 宽独立滚动，`scrollHeight = innerHeight` 无整页滚动 |
| 二维码 | 最小 160 / 假码展示用 | `QRCode.vue` 已加 160 下限，默认 200 未改 |
| 选择弹窗行样式 | **无分割线**；`Select List` 行 44 高、`padding 10/16`、**行间 12**；成员类行 **48 高、行与行紧贴 0 间距** | **2026-11-09 按 Figma 修正**：`1721:27132`「Select List」343×156、白底圆角 12、`itemSpacing` **12**、行 `padding 10/16`、**无 stroke**（此前实现为 48 高、左右 8、每行 1px 分割线，均错）。**同日二次修正**：`1803:33585` / `1803:33841` 的 `form` **无 `itemSpacing`**，`cell-radio` 44 与 `user-card` 48 是**逐行紧贴**（y 413→457→505→553，差值正好等于行高），此前把 `user-card` 内部的 `gap 12` 误读成行间距，已删除 `.member-row + .member-row { margin-top: 12px }`。勾选框按 `.radio-icon` 改为 **20×20 / r4 / 白底 / 1px `#C9CDD4`**（原 14×14 / 2px `#E5E6EB` 无 Figma 依据） |

### 2.5 弹层高度（2026-11-09 已裁决）

| 口径 | 值 | 来源 |
|---|---|---|
| **弹层最大高度** | **画布高 − 顶部 80px**（`calc(100% - 80px)`） | 用户 2026-11-09：「弹窗最大高度里顶部 80px」 |
| 常规弹层 | `height:auto`，内容自适应，上限 = 上面这条 | `theme.css` `.figma-phone .figma-popup-375.van-popup` |
| 成员选择两个弹层 | **直接撑到上限**（不按内容自适应） | 用户 2026-11-09：「成员选择用最大高度」 |
| **叠层偏移（已选列表叠在选人弹层之上）** | **12px**：上层顶部留白 = 80 + 12 = **92**，高度 = `calc(100% - 92px)`，**底边仍贴画布底** | 用户 2026-11-09：「偏移 12px」。Figma 两屏遮罩区是 100 / 117（差 17），此处取用户裁决的 12 |
| Figma 实测常规底部抽屉 | 375×328（= `1623:20325` popup 自然高度） | `1623:20325` |
| Figma 实测 dialog | 311×176 | `1623:20467` |
| Figma 实测 Select List | 343×156 | `1721:27132` |
| Figma「选择入园人员」 | 375×801 帧内 cascader 375×701，帧上方留 **100** 的遮罩区 | `1803:33585` |
| Figma「已选列表」 | 375×801 帧内 cascader 375×684，帧上方留 **117** 的遮罩区 | `1803:33841` |

> 两个成员弹层在 Figma 里是**两块独立整屏**，实现为**叠层**：已选列表叠在选择入园人员之上并**下移 12px**（用户 2026-11-09「偏移 12px」），露出下层一条边；上层左上返回、右上清空、行内单个删除；下层保持打开，返回即回到下层。
>
> 叠层态的三个实现细节（都不是 Figma 取值，是叠层交互的补充）：
> 1. 上层 `:overlay="false"` —— 否则上层自己的蒙层会把下层压成一条黑带；
> 2. 下层被盖住时隐藏自己的拖拽横条（`.member-popup--covered`），避免与上层横条并排成「两条杠」；
> 3. 上层加 `box-shadow: 0 -3px 10px rgba(0,0,0,.10)` —— 两层底色都是 `#F2F3F5`，没有明暗差就看不出台阶。

**浏览器实测（2026-11-09，视口 1440×900，手机画布 375×864）**

| 弹层 | 顶部留白 | 弹层高 | 内部 | 结论 |
|---|---|---|---|---|
| 日期弹层 `DatePicker` | **80** | **784** | 日历 732，`scrollHeight == clientHeight` 无内滚；底部「确认」贴弹层底 | ✅ 符合上限规则 |
| 选择入园人员 `MemberSelectionFlow` | **80** | **784** | header 64、列表 375 撑满、footer 距弹层底 16 | ✅ 符合上限规则 |
| 已选列表 `PersonListPopup`（叠层态） | **92** | **772** | header 64、列表 692 撑满；底边仍贴画布底 | ✅ 80 + **偏移 12** |

> 说明：手机画布高度随预览视口变化（一屏布局下 = 视口高 − 画布上下留白），弹层高度永远等于 `画布高 − 80`，不写死像素值。

## 三、工程一致性（2026-11-10 三方对齐实测）

| 位置 | 数量 | 内容 |
|---|---|---|
| `src/components/figma/*.vue` | **34** | 33 个与 `index.js` 导出对应 + `ListCard.vue`（内部共享基座，不导出） |
| `src/components/figma/index.js` | **33** | 32 个独立组件导出 + 1 个兼容别名 `FlowRecordCard` |
| `ComponentGallery.vue` 导航 | **6 组 37 项** | 设计规范 1 / 典型页面 1 / Field 5 / 通用组件 18 / 业务组件 6 / Popup 6；含规范面板 1、页面原型 1、组合演示 6 |
| 本注册表 2.0 表 | **33 + 1** | 与以上三处逐项对齐，状态统一 `pending`（Figma 对照进度） |
| `src/components/figma/` 非组件文件 | **2** | `index.js`、`usePopupTeleport.js` |
| `src/components/` 旧目录 | — | 实际只剩 `figma/` 子目录，历史章节中的 `Hisense*.vue` 文件**均不存在** |
| `src/pages/` | **10 个 `.vue`** | `HomePage` / `AppointmentFormPage` / `AppointmentDetailPage` / `AppointmentRecordPage` / `SecurityDetailPage` / `SuccessPage` / `SpecialPageView` / `SpecialPagesPreview` / `PageFrame` / `LocaleSwitcher`；模板工作台 **15 张卡片**（新增 4 张均为 `SpecialPageView` 的 kind 分支） |
| `src/router.js` | **12 条路由** | 含 `/components`、`/appointment/new`、`/appointment/records`、`/security/detail`、`/pass`、`/companion` 等 |

> **2026-11-06 历史快照**：当时为 21 个 `.vue` / 21 导出 / 画廊 25 项 5 组 / `src/pages/` 不存在；上述描述已过期，**不得用于新页面生成**，仅作 git 回溯参考。

构建与预览：`npm run build`（通过）；本地 `npm run dev`，组件库 `/components`；线上由 `serve.mjs` 启动（先构建再静态服务 `dist`，带 SPA fallback）。

## 四、缺失组件（有 Figma 节点、无本地 `.vue`）

原 8 个缺失中，`ContentRow` / `InlineInput`（2026-11-06）、`Search` / `Dropdown`（2026-11-10 六点改动）、`Dialog`（2026-11-10 九点改动）、**`CollapseItem` / `FieldCheckbox`（2026-11-13 用户「补充折叠和复选组件」）均已落地并登记进 2.0 表**。**当前剩余 1 个**：

| 批次 | 组件 | 备注 |
|---|---|---|
| P3 | `ScanFrame` | 整页级取景，须先确认本地图标资源 |

> `CollapseItem` 与 `FieldCheckbox` 的复用关系已按用户裁决落地：`CollapseItem` 是通用折叠容器（标题行 + 内容槽），`ApprovalRecord` 仍是业务审批记录组件，二者不互相替代；`FieldCheckbox` 是「`Field` 标题 + `Checkbox` 组」的编排层，内部直接复用 `Checkbox.vue`，没有另建勾选框。
> 按 `SKILL.md`「组件实现先给计划，确认后才写 `.vue`」，剩余 `ScanFrame` **尚未实现**。生成项目时若依赖落在这些组件上，按 `page-generation-decision-tree.md` 分支 D：先补组件 → 登记 `index.js` / 画廊 / 本文件 2.0 表 → 再生成页面；**不得在页面内自绘或用默认 Vant 视觉替代**。`QRCode` 二维码图片、`DatePicker` 的日历视觉仍无确认 Figma 节点，来源标「待确认」，不编造。

## 五、页面依赖矩阵

**当前状态：已由生成链路接管（2026-11-10）。** 用户 2026-11-06 确认 4 组同名页面「都是有效版本、分了不同的国家」，23 个 375 页面全部纳入范围（后续「整合页面」盘点扩至 46 个）；逐组件映射不再以静态矩阵形式维护，改为**每次生成时由 `page-generation-decision-tree.md` 第三节「逐页模板匹配表」+ 第四节「组件依赖」动态产出**，落进逐页决策表。

理由：静态矩阵在 20+1 组件口径下建立，组件更名（`RegistrationCard` → `AppointmentRecordCard`）、新增（`Search` / `Dropdown` / `Cascader` / `IconBox` / `Dialog`）与模板工作台 10 张卡片上线后已多次失真；生成链路以 `index.js` 与 2.0 表为唯一事实源。

旧版矩阵（基于 10 个页面、`Hisense*` 组件名）与 11-06 的「尚未重做」说明均已作废，不得用于新页面生成；需回溯时查 git 历史或 `CHANGELOG.md` 2026-11-06「组件整理」条目。

## 六、生成后检查

- 是否直接出现原生 `input`、`button`、`checkbox` 代替注册组件；
- 是否直接使用默认 Vant `van-field`、`van-picker`、`van-calendar` 视觉；
- 是否重复出现同行人、车辆、确认卡片、步骤条或按钮 CSS；
- 页面依赖是否全部来自本注册表 2.0 权威表；
- `pending` 组件是否被错误跳过或标记成 `ready`；
- 是否存在没有对应 Figma 来源的新增业务组件；
- 组件引用是否仍使用已废弃的 `Figma*` 旧名；
- 规范值是否符合 `design-spec-from-figma.md` 9.7 的 2026-11-06 裁决。

## 七、全量去前缀的影响（用户 2026-11-06 问「有什么影响」）

| 方面 | 影响 |
|---|---|
| **外部导入（唯一破坏性变更）** | 旧 `import FigmaButton from './components/figma/FigmaButton.vue'` 或 `import { FigmaButton } from './components/figma'` **会直接报错**；须改为 `Button`。当前仓库 `src/` 内旧名残留 **0 处**，构建通过，故**仓库内部无断链**；风险只在尚未同步的外部调用方 / 旧分支 / 页面模板 |
| Git 变更量 | 21 个 `.vue` 删除 + 23 个新增（含 2 个新组件）、`index.js` / `main.js` / Gallery / `theme.css` 修改；提交后 diff 较大，但语义是重命名 + 内容增改 |
| CSS 类名 | `figma-button` / `figma-field` / `figma-popup-375` 等**全部保留**，样式、测试选择器、DOM 快照不受影响 |
| 目录名 | `src/components/figma/` **保留**，路径前缀不变，只改最后一段文件名 |
| 展示名 | 画廊展示名本来就已去前缀，本轮把代码名对齐，二者不再有「`Button` vs `FigmaButton.vue`」的分歧 |
| 文档 | 本文件、`SKILL.md`、`AGENTS.md`、`component-gap-analysis.md`、`CHANGELOG.md`、`docs/context/current.md` 同步更新；`CHANGELOG.md` 等历史记录仍含旧 `Figma*` 引用，属历史记录、暂未批量改写 |
| 收益 | 组件名与 Figma 原件名一致，页面模板调用更直观，消除双重命名；后续 P1–P3 新组件直接按原件名命名 |

## 八、Figma 组件优先模式（规则有效）

唯一视觉来源：

```text
templates/project-starter/src/components/figma/
```

- 页面模板只能引用 `components/figma/` 下的组件。
- `src/components/` 下的旧组件保留但不参与新页面生成，不作为视觉来源（实测该目录已无旧 `.vue` 文件）。
- 不从旧组件复制样式、Props 或页面结构。
- Vant 只提供行为能力（弹层、日期选择、上传、选择、加载），不直接使用默认 Vant 视觉。
- 新组件必须绑定 Figma Node ID、组件状态和本地资源；无来源的标「待确认」，不编造。
- 未完成 Figma 截图对照的组件保持 `pending`（仅对照进度标记），**仍可用于页面与页面模板搭建**（用户 2026-11-10 13:55 裁决）。
- 涉及视觉或代码的改动，先在 5174 组件预览页经用户确认后再提交推送。
