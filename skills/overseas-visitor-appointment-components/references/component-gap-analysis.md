# Figma 组件盘点与缺口分析

> 生成日期：2026-11-05
> 盘点范围：Figma `1553:22258`「通用组件」、`1623:13302`「业务组件」两个 SECTION 的**直接子节点**
> 对比对象：`templates/project-starter/src/components/figma/` 下 21 个已落地 `.vue`
>
> 标记说明：
> - **事实** = Figma REST API 实测节点，或本地文件实测结果；
> - **待确认** = 资料无法证明的映射/归属/取舍，不自行补成事实；
> - **方案建议** = 后续实现顺序的建议，不代表设计方或业务方已确认。

---

## 一、数据来源（事实）

| 项 | 值 |
|---|---|
| Figma 文件 Key | `JRpDmIIybR17xUVA8s9sK4` |
| 读取方式 | Figma REST API `/v1/files/{key}/nodes?ids=...`，`X-Figma-Token` |
| 通用组件 SECTION | `1553:22258`，2554×1992，直接子节点 **34** 个 |
| 业务组件 SECTION | `1623:13302`，2554×1992，直接子节点 **10** 个 |
| 本地组件文件 | `src/components/figma/Figma*.vue` **21** 个 + `index.js`（只导出 16 个） |
| 组件注册表 | `references/component-registry.md` |
| 组件预览 | `src/FigmaComponentGallery.vue` |

> 本轮未导出任何 Figma 截图，所有组件**均未完成 Figma 截图对照**，按 `SKILL.md` 与 `quality-gates.md` 一律保持 `pending`。

---

## 二、Figma 直接子节点 → 本地组件映射（事实 + 待确认）

### 2.1 通用组件 SECTION `1553:22258`（34 个直接子节点）

| # | Figma Node | 名称 / 类型 | 实测尺寸 | 本地对应 | 判定 |
|---|---|---|---|---|---|
| 1 | `1551:11096` `1718:20153` `1623:13428` | field-input / INSTANCE | 311×76 | `FigmaField` | 已覆盖（事实） |
| 2 | `1718:20281` | field-input / INSTANCE | 311×98 | `FigmaField` | 已覆盖，98px 变体是否为多行输入 → **待确认** |
| 3 | `2165:15684` `1721:26859` | field-input（componentId `5:387`） | 311×76 | `FigmaField` | 与 `5:389` 是不同主组件，差异 → **待确认** |
| 4 | `1623:13474` | field-input / FRAME | 311×76 | `FigmaField` | 已覆盖（事实） |
| 5 | `1551:11134` | checkbox / INSTANCE | 162×22 | `FigmaCheckbox` | 已覆盖（事实） |
| 6 | `1686:20447` | field-upload / INSTANCE | 311×132 | `FigmaUploader` | 已覆盖（事实） |
| 7 | `2165:15637` | 成员选择后 / FRAME | 319×80 | `FigmaMemberSelectionFlow` | 字段态映射 → **待确认** |
| 8 | `1718:20478` | 成员只读 / FRAME | 319×116 | `FigmaMemberSelectionFlow` | 只读态映射 → **待确认** |
| 9 | `1687:24203` | field-checkbox / INSTANCE | 319×168 | **无** | **缺失** |
| 10 | `1623:20316` `1623:15312` | tag-fill / GROUP、tag / FRAME | 358×22 / 343×32 | `FigmaTag` | 已覆盖（事实） |
| 11 | `1623:15263` `1623:15264` `1758:27929` `1758:27931` | button / INSTANCE ×4 | 200×44 | `FigmaButton` | 已覆盖；4 个变体对应的状态 → **待确认** |
| 12 | `1686:11302` `1758:27930` | dropdown / INSTANCE | 68×28（menu 84×80） | **无** | **缺失** |
| 13 | `1623:20291` | tabs-line / INSTANCE | 343×42 | `FigmaTabs` | 已覆盖（事实） |
| 14 | `1623:20467` | dialog / INSTANCE | 311×176 | **无** | **缺失**（中央确认弹窗，与底部抽屉不同） |
| 15 | `1623:20325` | 底部抽屉 / FRAME | 375×812（popup 375×328） | `FigmaPopup` | 已覆盖（事实） |
| 16 | `1686:11129` | 预约编号：VS20250728001 / TEXT | 271×24 | 非组件 | 说明性文本，不建组件（事实） |
| 17 | `1686:11131` | steps-dot / FRAME | 303×36 | `FigmaSteps` | 已覆盖（事实） |
| 18 | `1686:11710` `1686:11722` | search / INSTANCE | 343×56 / 343×52 | **无** | **缺失** |
| 19 | `1686:23205` | content / INSTANCE（国旗 + 标题 + 区号 + tag + 图标） | 343×44 | **无** | **缺失**；是否独立组件 → **待确认** |
| 20 | `1721:27132` | Select List / FRAME | 343×156 | `FigmaSelectList` | 已覆盖（事实） |
| 21 | `1722:27223` | collapse-item / INSTANCE | 343×370 | **无** | **缺失** |
| 22 | `1722:27401` | 审批记录 / FRAME（dot-vertical ×3） | 343×330 | `FigmaApprovalTimeline` | 部分覆盖；与 `1687:24064` 流程记录的关系 → **待确认** |
| 23 | `1723:28234` | 空状态 / FRAME | 311×316 | `FigmaEmptyState` | 已覆盖（事实） |
| 24 | `1803:33585` | 选择入园人员 / FRAME（cascader） | 375×801 | `FigmaMemberSelectionFlow` | 映射 → **待确认** |
| 25 | `1803:33841` | 已选列表 / FRAME（cascader） | 375×801 | `FigmaPersonListPopup` | 映射 → **待确认** |

### 2.2 业务组件 SECTION `1623:13302`（10 个直接子节点）

| # | Figma Node | 名称 / 类型 | 实测尺寸 | 本地对应 | 判定 |
|---|---|---|---|---|---|
| 1 | `1623:13303` `1623:15088` `1623:15330` | user-card-edit / user-card / user-card-default | 311×56 / 351×164 / 311×48 | `FigmaUserCard` | 已覆盖（事实） |
| 2 | `1893:20270` | input / INSTANCE（addBefore / placeholder / addAfter） | 62×22 | **无** | **缺失**；是否为卡片内编辑态小输入框 → **待确认** |
| 3 | `1623:15278` `1722:27597` | 车辆card-edit / 车辆card-default | 311×56 | `FigmaVehicleCard` | 已覆盖（事实） |
| 4 | `1687:24064` | 流程记录 / FRAME（approval-steps） | 343×530 | `FigmaFlowRecordCard`、`FigmaApprovalTimeline` | 已覆盖（事实） |
| 5 | `1688:24312` | collapse-item / INSTANCE | 343×370 | **无** | **缺失**（与 2.1 #21 同主组件 `13:8186`） |
| 6 | `1723:28208` | card / INSTANCE | 351×156 | `FigmaRegistrationCard`？ | **待确认**：注册表现无 Figma Node 绑定，不能当作已确认映射 |
| 7 | `1814:34191` | 扫码 / FRAME（Rectangle + floating-bubble + navbar-web + 轻触点亮） | 375×812 | **无** | **缺失**（即旧版规范中的 `ScanFrame` 扫码取景） |

---

## 三、缺失组件清单（事实：有 Figma 节点、无本地 `.vue`）

| 拟建组件（方案建议命名） | Figma Node | 实测尺寸 | 结构（Figma 子层，事实） | 归属 |
|---|---|---|---|---|
| `FigmaSearch` | `1686:11710` / `1686:11722` | 343×56 / 343×52 | content(label + icon + input) + button「取消」 | 通用 |
| `FigmaDropdown` | `1686:11302` / `1758:27930` | 68×28 | wrapper(title「更多」+ down 12×12) + menu(dropdown-menu 84×80) | 通用 |
| `FigmaDialog` | `1623:20467` | 311×176 | 文案展示(标题 263×24 + 内容 263×44 + slot) + 操作区(两个 156×48 button) | 通用 |
| `FigmaCollapseItem` | `1722:27223` / `1688:24312` | 343×370 | header 343×40 + body slot 343×330 | 通用 |
| `FigmaFieldCheckbox` | `1687:24203` | 319×168 | `.field-title` 319×24 + Right 319×116 | 通用 |
| `FigmaContentRow` | `1686:23205` | 343×44 | body slot：国旗 32×24、必填星、标题、+66、tag 32×16、icon 20×20 | 通用 · **待确认是否独立沉淀** |
| `FigmaInlineInput` | `1893:20270` | 62×22 | addBefore 14×14 + placeholder + addAfter 14×14 | 业务 · **待确认是否独立沉淀** |
| `FigmaScanFrame` | `1814:34191` | 375×812 | 取景底 + floating-bubble 48×48 + navbar-web 375×44 + 「轻触点亮」 | 业务 |

> `FigmaQRCode`、`FigmaDatePicker`、`FigmaLanguagePopup` 在两个 SECTION 的**直接子节点里没有对应节点**，其 Figma 来源仍属待确认，不列入「缺失」也不当作已确认组件。

---

## 四、注册表与工程现状问题（事实）

1. `references/component-registry.md` 第 2、3 节全部使用 `Hisense*` 命名、`src/components/Hisense*.vue` 旧路径，与 `SKILL.md`「页面模板只能引用 `components/figma/`」冲突。
2. 注册表中 8 个条目标 `confirmed`，但本地**没有任何组件完成 Figma 截图对照**，与 `quality-gates.md` 的 `ready` 条件矛盾。
3. 已落地但未登记的 5 个组件：`FigmaDatePicker`、`FigmaFlowRecordCard`、`FigmaMemberSelectionFlow`、`FigmaPersonListPopup`、`FigmaRegistrationCard`。
4. `src/components/figma/index.js` 只导出 16 个组件，同样缺上述 5 个。
5. `FigmaMemberPicker` 在注册表绑定 `1687:24188`「成员选择模式」；该节点**本次两个 SECTION 的直接子节点中不存在**，此前 API 批量读取也未找到 → **待确认正确 Node ID**。候选（均需确认）：`2165:15637`、`1718:20478`、`1803:33585`、`1803:33841`。
6. `component-registry.md` 第 6 节写「已创建的页面模板位于 `templates/project-starter/src/pages/`」，实测该目录**不存在**。
7. `references/quality-gates.md` 引用 `page-generation-decision-tree.md`，该文件在 `references/` 下**不存在**。
8. 交接说明要求读取 `skills/overseas-visitor-appointment-components/AGENTS.md`，实测该文件**不存在**。
9. `README.md`、`docs/`、`HANDOFF.md`、`访客预约-Skill构建方案.md` 仍有旧版 `visitor-appointment-prototype` 路径引用；`README.md` 中「Kiro（字节 AI IDE）」为事实错误，Kiro 属 AWS/Amazon。以上均为历史记录，本轮未擅自改写。

---

## 五、本轮已完成的改动（事实）

| 文件 | 改动 | 验证 |
|---|---|---|
| `src/FigmaComponentGallery.vue` | 预览改为左侧分组导航（通用 / 业务 / 弹层与组合，共 22 项）+ 右侧展示；右侧含组件元信息、375px 手机画布、待确认项 | `npm run build` 通过；无头浏览器截图核对布局 |
| `src/theme.css` | 去掉 `#app` 的 375px 限制（改为桌面布局）；新增全局 `.figma-popup-375.van-popup` 规则，弹层固定 375px 并水平居中；窄屏降级为 `100vw` | 构建通过 |
| `FigmaPopup.vue`、`FigmaDatePicker.vue`、`FigmaLanguagePopup.vue`、`FigmaPersonListPopup.vue`、`FigmaMemberSelectionFlow.vue` | 弹层根节点追加 `figma-popup-375` 类 | 逐个实测可见弹层 `width=375`、`left=453`（1280 视口居中） |
| `FigmaComponentGallery.vue` 内裸 `van-popup` | 追加 `figma-popup-375` 类 | 列表选择抽屉实测 `width=375` |

预览地址：`http://127.0.0.1:5174/`
构建结果：`vite build` 成功（330 modules，无报错）

> 定位方式使用 `margin-left: -187.5px`，不依赖 `transform`，避免与 Vant 底部滑入动画的 `transform` 冲突——已通过 `van-popup-slide-bottom-enter-active` 状态下的实测宽度确认。

---

## 六、下一轮实现计划（方案建议，待确认后执行）

按 `SKILL.md`「组件实现先给计划，确认后才写 `.vue`」，以下为建议顺序，**尚未实现**：

| 批次 | 组件 | 理由 | 验收标准 |
|---|---|---|---|
| P0 | 注册表与 `index.js` 对齐 | 先消除命名/路径/状态矛盾，否则后续组件状态无处可记 | 21 个组件逐项登记、绑定 Figma Node、状态统一 `pending`；`index.js` 导出齐 21 个 |
| P1 | `FigmaSearch`、`FigmaDropdown`、`FigmaDialog` | 通用高频，且 Figma 节点结构完整、无归属争议 | 独立预览 + Figma 节点截图对照 + 构建通过 |
| P2 | `FigmaCollapseItem`、`FigmaFieldCheckbox` | 复合结构，需先确认 `FigmaApprovalTimeline` 是否已包含其视觉 | 同上，并说明与已有组件的复用关系 |
| P3 | `FigmaScanFrame` | 整页级取景，涉及 navbar / floating-bubble 资源 | 同上；须先确认本地图标资源齐备 |
| P4 | `FigmaContentRow`、`FigmaInlineInput` | 是否独立沉淀**待确认**，不先建 | 待设计方确认后再排期 |

每个组件完成后按交接模板输出：

```text
组件名称 / Figma Node / 修改文件 / 使用资源 / 实现状态 /
待确认项 / 构建结果 / 预览地址 / 是否已完成 Figma 截图对照
```

---

## 七、待确认问题清单（不自行补成事实）

1. `1687:24188`「成员选择模式」的正确 Node ID 是什么？
2. `2165:15637`「成员选择后」、`1718:20478`「成员只读」是否即 `FigmaMemberSelectionFlow` 的两种字段态？
3. `1803:33585`「选择入园人员」与 `1803:33841`「已选列表」分别对应哪个弹层组件？
4. `1722:27401`「审批记录」与 `1687:24064`「流程记录」是否需拆成两个组件？
5. `1723:28208`「card」是否就是 `FigmaRegistrationCard` 的视觉来源？
6. `1686:23205`「content」、`1893:20270`「input」是否需要独立沉淀为组件？
7. `1718:20281`（311×98 field-input）是否对应多行输入变体？`5:387` 与 `5:389` 两个主组件的差异是什么？
8. 四个 `button` 实例分别对应哪种状态（主 / 次 / 禁用 / 加载）？
9. `FigmaQRCode` 的二维码最小尺寸与真实图形来源？
10. `FigmaDatePicker` / `FigmaLanguagePopup` 的 Figma 节点？
11. 新建预约页面 `1747:19635` 与 `1042:20391` 哪个为主用节点？
12. `docs/context/current.md` 仍写「首版范围为典型访客端和安保端页面」，是否同步改为「当前优先建设 Figma 组件库」？
13. 注册表中历史 `confirmed` 状态与旧 `Hisense*` 路径，是整体重写还是保留为历史章节并新增 Figma 表？
