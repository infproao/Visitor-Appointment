# 海外版访客预约 Skill 仓库规范

> 当前状态（2026-11-05）：旧版 `skills/visitor-appointment-prototype/` 因效果不理想已移除，可从 git 提交 `20b6457` 恢复。
> 后续以 `skills/overseas-visitor-appointment-components/` 为唯一基底重新搭建；表单页计划用 Figma 组件重写，**尚未完成**。

本仓库用于沉淀“海外版访客预约”原型生成 Skill，不把具体国家字段、接口、正则或审批配置写死为 Skill 固定业务规则。

## 工作入口

- Skill 规范：`skills/overseas-visitor-appointment-components/SKILL.md`
- **设计规范基准：`skills/overseas-visitor-appointment-components/references/design-spec-from-figma.md`（第九节「最终规范值」；9.7 = 2026-11-06 用户 7 项数值裁决；11.3 = 24 个业务页面清单；11.6 = 渲染口径重算依据）**
- **Figma 页面范围**：同一文件 `JRpDmIIybR17xUVA8s9sK4` 的两个节点 —— `1550:3803`「——模板——」（组件与规范画板）、`1824:42919`「泰国」（24 个业务页面）
- 早期设计变量（历史记录）：`skills/overseas-visitor-appointment-components/references/design-tokens.md`
- 组件注册表：`skills/overseas-visitor-appointment-components/references/component-registry.md`
- **Node ID 可读索引：`skills/overseas-visitor-appointment-components/references/figma-node-index.md`** —— 把 `1747:19635` 这类裸编号还原成「所在页面 > 位置 > Figma 名称」，附 Figma 定位链接；覆盖仓库文档中出现的 179 个编号
- AI 编码入口：本文件（仓库根 `AGENTS.md`）。`skills/overseas-visitor-appointment-components/AGENTS.md` 目前不存在，待补
- 需求输入：`skills/overseas-visitor-appointment-components/references/requirements-input.md`
- Figma 反推规格：`skills/overseas-visitor-appointment-components/references/figma-derived-spec.md`

## 工作边界

- 资产整理阶段只输出资产、规则、来源和确认状态，不生成页面代码。
- 原型阶段使用 Vue3 + Vant 4 + Vite、JavaScript、Vue Router 4、vue-i18n 和模拟数据。
- Vant 只承担基础行为；视觉不一致时按 Figma 设计实现项目通用组件。
- **设计规范数值以设计稿为准**（用户 2026-11-05 裁决）：取 Figma 节点实际渲染属性，不取画板说明文字标注、外部海信 token 文件或 Vant 默认值；`design-tokens.md` 仅作历史参考，冲突处以 `design-spec-from-figma.md` 第九节为准。代码侧 `src/theme.css` 的 `--van-*` 变量迁移**尚未执行**，改代码前需前端确认。
- **2026-11-06 用户 7 项数值裁决（硬约束，逐条见 9.7）**：① 隐藏节点不采集，统计口径为**渲染口径**（只取可见节点，属性口径仅回溯）；② 字号只用 `12/13/14/16/18/20/24`，**不用 `10/17/72`**；③ 行高 = 字号 × 1.5；④ 间距不含小数；⑤ padding 不用 `13/23`；⑥ 间距允许值删 `5/3.14/11`；⑦ 全圆角统一 `999`（替代 `40/50/99/100/999/9999`）。规范页见 5174「设计规范总览」。组件样式与 `theme.css` **尚未同步**，改代码前须确认。
- **页面范围（用户 2026-11-05 确认、2026-11-06 补充）**：限 375 手机画布。「泰国」页 24 个 FRAME 中，`主访客提交成功`(1024×974) 是为适配 PC 端、**不在本次范围内**，不参与组件映射与页面生成；其余 23 个页面里 4 组同名页面（详情 ×2、同行人 ×2、入园操作 ×3、image-preview ×2）「**都是有效版本、分了不同的国家**」，全部纳入映射范围，不得合并、去重或排优先级。清单见 `design-spec-from-figma.md` 11.3。
- **2026-11-06 组件裁决（逐条依据见 `skills/overseas-visitor-appointment-components/references/component-gap-analysis.md` 第八、九节，均已落地代码）**：输入框按用户状态截图实现 **5 态**（默认 / 聚焦 / 填充 / 只读 / 禁用；Figma 组件集 `5:374` 无「聚焦」变体）；审批记录与流程记录**合并为一个 `ApprovalTimeline`**、「更多」可点击弹人员列表（`FlowRecordCard` 降级为兼容别名）；人员选择 → 选择入园人员弹层、左下角已选人员 → 已选列表弹层（**2026-11-09 改为两个弹层都用最大高度 = 画布高 − 80px**，原 80% 口径作废）；`1723:28208` 确认为登记卡片视觉来源；二维码最小 160、假码仅展示用；语言 / 日期选择放进输入框并拆独立 `Popup` 分组；**组件名全量去掉 `Figma` 前缀**（CSS 类名 `figma-*` 与目录 `components/figma/` 保留）；`Field` 与 `Popup` 各成独立导航组；右侧**左展示 / 右说明两栏撑满一屏、画布 1:1 不缩放**（用户 2026-11-09「撑满一屏不要缩放，说明和展示左右布局」，禁止再用 `transform:scale` 整体缩小画布）；新增 `ContentRow` / `InlineInput`；`Button` 15 变体（**2026-11-09**：三档固定高 48 / 44 / 32、文字统一 **16**、主色 **`#22BBB3`**）；`Field` label **16 / w500 / `#4E5969`**（按 Figma 实测纠偏，勿再写 14）；间距与 padding 只列实测集合、**不设 2 或 4 的倍数关系**；阶段目标**先搭建组件库**。当前为 **22 个独立组件 + 1 兼容别名，全部 `pending`**，清单见 `component-registry.md` 第二节。
- **禁止只写裸 Node ID**（用户 2026-11-06：「这种 `1747:19635` 的代码无法判断是哪个页面」）：**每个编号必须同时写出「所在页面 > 位置 > Figma 名称」**，编号只作检索值；页面归属查 `figma-node-index.md`，查不到标「待确认」不推测。例：`整合页面 > 越南版访客预约填报 > 访客预约01（1747:19635）`。5174 预览页已把「所在页面 / 位置」设为首要元信息行，搜索框也支持按页面名检索。
- **Figma Node ID 出处与勘误**：文档里所有形如 `数字:数字` 的编号都来自同一文件 `JRpDmIIybR17xUVA8s9sK4`，是 REST API 内部标识，不是 Figma 界面名称；在 Figma 中定位用 `?node-id=1550-3803`（冒号改连字符）。用户所说的 **`67911` 是问题编号 6/7/9/11**，不是 Figma 数字（此前按 `6:7911` / `679:11` 查 API 属误读）。全文件 11 个 CANVAS、82,427 节点核查：`1687:24188`「成员选择模式」**不是有效节点**（0 处、API NOT FOUND，且 Figma 中无名称含「模式」的节点），注册表原绑定已作废，正确 Node ID 待用户指认；主组件 `5:374` / `5:387` / `5:389` 不在 CANVAS 子树内但可经 `/nodes` 直取。`1747:19635` 位于「整合页面」、`1042:20391` 位于「越南V1.1」，是不同页面的同名 FRAME，主用仍待确认。
- **全量去前缀的影响**：旧 `Figma*` 外部导入会断（仓库 `src/` 内残留 0 处、构建通过）；CSS 类名与目录名不变；`CHANGELOG.md` 等历史记录仍含旧引用，属历史记录未批量改写。详见 `component-registry.md` 第七节。
- **还原精度（用户 2026-11-09「还原精度不高的原因是啥」）**：组件实现前必须**先定位 Figma 节点再逐属性读**（尺寸 / padding / gap / 圆角 / fill / stroke / 文字），**禁止用相似组件类推、禁止用 Vant 默认视觉填空**；实现后用浏览器 `getBoundingClientRect` + `getComputedStyle` 回读，与实测差值 > 1px 视为不通过；核对结果登记到 `skills/overseas-visitor-appointment-components/references/component-fidelity-checklist.md`。已确认偏差与基线见该文件第一、三节（如 `LanguagePopup` 曾因「无确认节点」而按 `SelectList` 类推，导致标题、上下 padding、关闭按钮尺寸全错）。
- **颜色一律以 token / Figma 节点 fill 为准，禁止从截图取色**（用户 2026-11-09：「按钮颜色是 22BBB3，5AB9B2 是哪生成的。。。不要瞎改」）：`Button` 的 5 个色系最初是拿用户给的变体截图逐格取色写死的，teal 取成 `#5AB9B2`，与 Figma 实测 `#22BBB3`（全文件 84 处）差 47 个色阶，且该值在 token、SVG 导出、Figma 节点里**都不存在**。已把 teal 主色改回 `#22BBB3`。截图只能用来确认「有哪些变体 / 怎么排列」，**不能用来定色值**；取色前先查 `design-tokens.md`，再用节点 `fills` 交叉验证，两处都没有就标 `pending`，不要凭像素猜。
- **圆形图标按钮必须几何居中**（用户 2026-11-09「为啥icon不在圆的中心」）：关闭按钮里的 `×` 一律用 **`flex` 居中 + 图标固定 16×16 块级盒**，**不要**用文字 `×` 配 `line-height`（只让行盒居中，字形带侧边留白 → 视觉重心偏上偏左），也不要让 `van-icon` 以内联元素直接落位（行盒 + 基线，`Popup.vue` 曾因此偏）。成员选择弹层关闭按钮按用户裁决放**右侧**（`right:0`，距屏右 16）；注意 Figma `1803:33590` 的 `PillButton` 原本在**左侧**（x=1290），这是用户对设计稿的调整，不是还原偏差。
- **弹层高度（用户 2026-11-09「弹窗最大高度里顶部 80px，成员选择用最大高度」）**：所有 375 弹层的**最大高度 = 画布高 − 顶部预留 80px**，即 `.figma-phone .figma-popup-375.van-popup { max-height: calc(100% - 80px) }`；普通弹层 `height:auto` 内容自适应，**成员选择族（`1803:33585` 选择入园人员、`1803:33841` 已选列表）直接撑到上限**（`height` 与 `max-height` 都写 `calc(100% - 80px)`，内部列表 `flex:1 1 auto` 自行滚动）。**不要写 `80vh` 或 `80%`**——`vh` 相对浏览器视口、`%` 相对旧的 80% 口径，都会与手机画布脱钩。两个成员弹层在 Figma 里是两块独立整屏，实现时**叠层显示**：已选列表叠在选择入园人员**之上**（用户 2026-11-09「已选列表在选择人员的之上弹出」），左上返回关掉自己回到下层、右上清空、行内可单个删除。**叠层偏移 12px**（用户 2026-11-09「偏移12px,关闭放在右侧」）：上层顶边 = 80 + 12 = 92、高度 `calc(100% - 92px)`、**底边仍贴画布底**（只往下挪不减高度会让底部越出画布）；叠层态还要 ① 关掉自身蒙层 `:overlay="false"`，② 下层隐藏自己的拖拽横条（否则两条杠并排），③ 上层加极浅顶投影——两层底色都是 `#F2F3F5`，没有明暗差就看不出台阶。这三条是叠层交互的补充，**不是 Figma 取值**，改动时不要当成设计稿数据。浏览器实测基线：画布 864 时 顶部留白 80 / 弹层 784（叠层上层 92 / 772）；日期弹层日历 732 无内滚、确认按钮贴底。
- **推送流程（用户 2026-11-05 要求）**：涉及组件、页面、`theme.css` 或任何影响画面的改动，先在 5174 组件预览页经用户确认，再提交推送；纯文档改动也先告知用户。
- 用户明确页面范围时，只处理该范围及必要关联弹窗。
- 需求未证明的字段、文案、接口和校验规则标记待输入，不自行编造。

## 目录约定

- `docs/`：产品现状、构建方案、上下文、评审和发布记录。
- `tests/`：Skill 任务、输入 fixtures 和验证结果。
- `scripts/`：发布和打包工具；工具完成验证后再启用。
- `dist/`：版本 ZIP 输出，不提交依赖和临时文件。
- `skills/overseas-visitor-appointment-components/`：当前唯一 Skill 包和 starter。

完整规则以 `skills/overseas-visitor-appointment-components/SKILL.md` 为准；本文件为仓库级工作入口。
