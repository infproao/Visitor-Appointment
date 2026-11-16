# 页面生成决策树

> 本文件是「输入结构化需求 → 生成项目」的**强制第一站**（`SKILL.md` 2026-11-10 生成流程硬约束）。
>
> 输入：`requirements-input.md` 定义的需求 YAML。输出：**逐页决策表**（模板匹配度、分支、组件依赖、待生成文件清单），交 `page-generation-sop.md` 执行。
>
> 禁止跳过本决策树按截图自造页面结构；禁止在页面里复制组件内部样式；禁止用 Vant 默认视觉替代注册组件。

## 〇、总流程

```text
需求 YAML
  │
  ├─ G0 输入校验（不通过 → 退回补需求，不写页面代码）
  │
  ├─ G1 目标端 / 页面范围判定
  │
  └─ G2 逐页模板匹配 ──────────────┐
         │                        │
         ├─ A 完全匹配 → 套模板     │
         ├─ B 部分匹配 → 改模板     │
         ├─ C 无模板 + 组件齐备 → 新建页面
         ├─ D 缺组件 → 先补组件 → 回 C
         └─ E 越界 → 标 pending，不生成
                                  │
  ├─ G3 组件依赖核对（只取 component-registry.md 第二节）
  ├─ G4 输出文件清单
  └─ G5 门禁映射 → quality-gates.md
```

## 一、G0 输入校验

| 检查项 | 通过条件 | 不通过处理 |
|---|---|---|
| `client` | `visitor` 或 `security` | 退回补需求；不默认 |
| `pages` | 至少 1 项，且每项能映射到下表的 page id 或明确标为「新建」 | 列出未知 id，标 `pending` |
| `country` / `defaultCountry` | 有值即可；**不得写死国家字段组合** | 用默认国家，不推断规则 |
| `language` / `languages` | 语言列表来自需求；未指定用 `zh/en/th` 默认 | 不按语言名推导证件类型 |
| `fields[].confirmationStatus` | `confirmed` / `proposed` / `pending` 已标 | 未标一律按 `pending`，不写成固定事实 |
| `assets[].source` | 资源已在 `src/assets/` 或标记 `pending` | 聊天附件未入库 → `pending`，不得声称已入库 |
| `prototype` | `backend:false` / `api:false` / `mockData:true` | 要求后端 → 走分支 E |

> 用户只要求「整理资产和规则」时（`requirements-input.md` 一.7），**只输出整理结果，不进入 G2**，也不生成页面代码。

## 二、G1 目标端与页面范围

| 判定 | 规则 |
|---|---|
| 基准画布 | 375 手机画布；所有页面**仅上下滚动**（`theme.css` `overflow-x: clip`） |
| 排除 | 「主访客提交成功」1024×974 为 PC 适配，不在本 Skill 范围（用户 2026-11-05 确认） |
| 端差异 | `client: visitor` → 访客端页面；`client: security` → 安保端页面；同一 `pages` 列表里混用要拆成两份决策表 |
| 国家差异 | 4 组同名业务页面都是有效国家版本，**不合并、不去重、不排优先级** |
| 关联弹窗 | 用户指定页面范围时，只检查该范围及必要关联弹窗（语言 / 日期 / 成员 / 已选列表 / 协议 Dialog） |

## 三、G2 逐页模板匹配（权威映射表）

模板来源：`templates/project-starter/src/pages/SpecialPagesPreview.vue` 的 **11 张模板卡片** + `src/router.js` 的 **12 条路由**（2026-11-10 新增 `/appointment/records`、`/security/detail`）。

| 需求 page id | 模板 / 页面实现 | 路由 | 关键复用的注册组件 |
|---|---|---|---|
| `visitor-home` | `HomePage.vue` | `/` | `Button`、`IconBox`、`Popup`、`LanguagePopup`（经 `LocaleSwitcher`） |
| `appointment-form` | `AppointmentFormPage.vue` | `/appointment/new` | `Steps`、`Field`、`Button`、`Checkbox`、`Dialog`、`DatePicker`、`Uploader`、`UserCard`、`VehicleCard`、`Popup`、`SelectList` |
| `appointment-detail` | `AppointmentDetailPage.vue` | `/appointment/detail` | `Tabs`、`Tag`、`Field`、`UserCard`、`ApprovalRecord` |
| `appointment-success` | `SpecialPageView` · `share-success` | `/appointment/share` | `QRCode`、`Popup`、`SelectList`、`Checkbox` |
| `appointment-success-simple` | `SuccessPage.vue` | `/appointment/success` | `Popup`、`Field` 只读态 |
| `visitor-pass` | `SpecialPageView` · `pass` | `/pass` | `QRCode`、`Tag`、`Popup` |
| `appointment-records-empty` | `SpecialPageView` · `empty-pass` | `/pass/empty` | `EmptyState`、`Button` |
| `security-registration` | `SpecialPageView` · `security-entry` | `/security/entry` | 设计稿整页图 `design-security-entry.png`（**已确认例外**：整页资源，不拆组件重画） |
| `accompanying-person` | `SpecialPageView` · `companions` | `/companion` | `Field`、`Checkbox`、`IconBox`、`Popup` |
| `appointment-records` | `AppointmentRecordPage.vue`（页头 + 14 天提示条 + 多条记录卡，Figma `1083:24323`） | `/appointment/records` | `AppointmentRecordCard`、`IconBox` |
| `visitor-regulations` / `privacy-policy` | `Popup` 协议正文（表单页内调用） | 无独立路由 | `Popup`、`SelectList`、`Dialog` |
| `security-detail` | `SecurityDetailPage.vue`（`SecurityHeader` + 142 高 page-header + 三页签，Figma `1042:17750`） | `/security/detail` | `SecurityHeader`、`InlineInput`、`Tag`（`soft` 变体）、`Tabs`、`Field` readonly、`UserCard`、`VehicleCard`、`ApprovalRecord`、`ApprovalTimeline`、`Popup`、`SelectList` |
| `security-scan` / `gate-control` / `filter-popup` / `entry-operation-popup` | **暂无模板** | 待生成 | 见第四节分支 C / D |

### 分支判定

| 分支 | 条件 | 动作 | 允许改动 |
|---|---|---|---|
| **A 套模板** | page id 命中上表，字段 / 语言 / 资源均可由配置注入 | 复用页面 `.vue` + 现有路由，只改 `i18n.js`、mock 数据、`src/assets/` | 不重排结构、不改组件 CSS |
| **B 改模板** | page id 命中，但字段 / 状态 / 交互有差异 | 在同一页面 `.vue` 内增删 **已注册组件** 调用与 mock 分支 | 只改页面组合，不复制组件内部样式 |
| **C 新建页面** | 无模板，但所需组件全在注册表第二节 | 新建 `src/pages/<Name>.vue` + `router.js` 路由 + i18n key | 页面只做「布局 + 组件编排 + 数据」 |
| **D 补组件** | 依赖里有注册表没有的组件，或已有组件缺某项能力 | **先输出「能力缺口 + 2–3 个可行交互方案（影响文件 / 对现有页面与组件的影响 / 是否符合既有口径）+ 推荐项」，询问用户并等待裁决**；裁决后再按「定位 Figma 节点 → 逐属性读 → 实现 `.vue` → 独立预览 → 登记注册表 → 更新 `index.js` 与画廊」补齐，再回 C | 裁决前**不新建组件、不改通用组件、不写页面代码**；不得用临时 HTML / 默认 Vant 视觉跳过 |
| **E 越界** | 后端 / 真实接口 / 真实扫码 / 真实二维码 / PC 1024 页面 / 无来源资源 | 在决策表里标 `pending` + 原因，**不生成代码** | 不得编造字段、正则、接口或资源 |

> 分支 D 的当前已知缺口：`CollapseItem`、`FieldCheckbox`、`ScanFrame`；`IconBox` 图标集待补全；另有「已有组件能力不够」类缺口，如 `Field` 只读态单行 `<input>` 无法换行。其余组件**均可复用**（用户 2026-11-10 13:55 裁决：`pending` 只表示 Figma 对照进度）。
>
> **用户 2026-11-13 裁决**：分支 D 与「已有组件能力不够」都适用「先问、等裁决、给交互方案」。方案要写清交互怎么变（例如只读字段从单行变多行后，点击整行是否仍弹选择弹层、字段高度是否自适应、是否影响下方卡片位置），不能只给「加个 prop」这种实现描述。裁决前决策表标 `pending: waiting-user-decision`，不生成代码。

## 四、G3 组件依赖核对

按页面类型给基线依赖，实际以需求 `fields` 增删；每一项必须能在 `component-registry.md` 第二节查到。

| 页面类型 | 基线依赖 |
|---|---|
| 首页 / 入口页 | `Button`、`IconBox`、`Popup`、`LanguagePopup` |
| 表单 / 填报页 | `Steps`、`Field`、`Button`、`Checkbox`、`Dialog`、`DatePicker`、`Dropdown`、`SelectList`、`Popup`、`Uploader`、`UserCard`、`VehicleCard`、`MemberSelectionFlow` |
| 列表 / 记录页 | `Search`、`Dropdown`、`Cascader`、`SelectList`、`AppointmentRecordCard`、`Tag`、`Tabs`、`EmptyState` |
| 详情 / 审批页 | `Tabs`、`Tag`、`Field`、`UserCard`、`ApprovalRecord`、`ApprovalTimeline`、`AppointmentRecordCard` |
| 凭证 / 成功页 | `QRCode`、`Tag`、`Button`、`Popup`、`EmptyState` |
| 弹层 / 选择页 | `Popup`、`SelectList`、`LanguagePopup`、`DatePicker`、`PersonListPopup`、`Dialog`、`Checkbox` |

核对规则（对应 `quality-gates.md` 组件门禁）：

1. 依赖里出现未注册名字 → 转分支 D，不得在页面内自绘；
2. 页面里出现原生 `input` / `button` / 自绘 `.checkbox` / 自绘 `.popup` → 不通过；
3. 出现 `van-field` / `van-picker` / `van-dialog` 的**默认视觉** → 不通过（Vant 只提供行为）；
4. 组件间是复用的：同一能力只调用一个注册组件，**不是一个页面一个组件**；
5. 组件已有的交互必须带上（点击、回填、弹层、选中态、删除 / 清空），不能把组件当静态图使用。

## 五、G4 输出文件清单（逐页决策表模板）

```yaml
decision:
  request: "examples/sample-requirement.yaml"
  client: visitor
  pages:
    - page: visitor-home
      branch: A            # A/B/C/D/E
      template: HomePage.vue
      route: "/"
      components: [Button, IconBox, Popup, LanguagePopup]
      files: ["src/i18n.js", "src/assets/"]     # 只列需要改的文件
      gates: [需求, 模板, 组件, 视觉, 运行]
    - page: visitor-regulations-confirm
      branch: C
      template: null
      route: "/regulations/confirm"
      components: [Field, Checkbox, Button, Dialog, Popup]
      files:
        - "src/pages/RegulationsConfirmPage.vue"
        - "src/router.js"
        - "src/i18n.js"
      gates: [需求, 模板, 组件, 视觉, 运行]
  excluded:
    - page: security-scan
      branch: E
      reason: "真实扫码能力超出前端 mock 范围"
```

### 分支 → 必改文件对照

| 分支 | 必改 | 视情况 |
|---|---|---|
| A | `src/i18n.js`、mock 数据、`src/assets/` | 无 |
| B | 对应 `src/pages/*.vue` + `src/i18n.js` | mock 数据 |
| C | `src/pages/<Name>.vue`、`src/router.js`、`src/i18n.js` | `src/ComponentGallery.vue`（把新页面放进「典型页面」） |
| D | 新增 `src/components/figma/<Name>.vue`、`index.js`、`ComponentGallery.vue`、`component-registry.md`，再按 C | `theme.css`（弹层定位等全局规则） |
| E | 决策表 `excluded` 段 | 无（不写代码） |

> 所有分支都不得写死个人绝对路径或临时 Figma URL；资源一律落在 `src/assets/` 并用相对路径引用。

## 六、G5 门禁映射

| 决策树输出 | 对应 `quality-gates.md` |
|---|---|
| G0 输入校验 | 需求门禁（目标端 / page type / 字段 / 资源 / 待确认项） |
| G2 分支 A / B | 模板门禁（已判模板匹配度、能套用不重设计） |
| G3 组件依赖 | 组件门禁（依赖全部来自注册表、无重复实现、无默认 Vant 视觉） |
| G2 分支 C / D 的 Figma 来源 | 视觉门禁（375 基准、规范值、状态、资源确认） |
| `npm run build` + 浏览器实测 | 运行门禁（mock 数据、无绝对路径、构建通过、`git diff --check`、截图对照） |

## 七、禁止事项

- 禁止跳过 G2 直接照截图写页面结构；
- 禁止把「无模板」直接当成「可以自绘」，必须先走 G3 组件依赖核对；
- 禁止在页面里复制组件内部 CSS、自己写 `field-*` / `figma-*` 样式；
- 禁止用 Vant 默认视觉填空，或用「相似组件类推」找不到的 Figma 节点；
- 禁止用字符或默认图标替代 Figma 资源；
- 禁止把 `pending`（Figma 对照进度）当作「不可用」而改用临时实现；
- 禁止在「组件能力不够 / 未覆盖」时直接扩通用组件或自造交互；必须先给出可行交互方案并等待用户裁决（用户 2026-11-13 裁决）；
- 禁止把 `proposed` / `pending` 的字段、资源、校验规则写成已确认事实；
- 涉及视觉或代码的改动，先在 `/components` 组件预览页确认后再推送。
