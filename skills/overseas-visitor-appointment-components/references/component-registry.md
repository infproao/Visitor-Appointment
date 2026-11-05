# 组件注册表

> 本文件是页面生成时的组件调用契约。组件已注册后，页面必须调用对应组件，不得在页面内重复实现同一结构。
>
> 状态：`ready` 可直接调用；`pending` 需要先补资料/实现/验证；`confirmed` 已完成视觉验证。

## 一、硬性调用规则

1. Figma 和本注册表存在对应组件时，页面必须调用注册组件。
2. 禁止使用原生 HTML 或默认 Vant 视觉替代已注册组件。
3. Vant 只能提供基础行为；视觉必须由注册组件覆盖为 Figma 样式。
4. 禁止在页面内重新编写已经注册的 Field、Button、Steps、Checkbox、Card、Popup 或 Picker 结构。
5. 页面生成前必须列出组件依赖；依赖组件为 `pending` 时，不得用临时 HTML 跳过组件沉淀。
6. 业务页面只能通过组件 Props、事件和需求输入传递数据，不能复制组件内部样式。
7. 每个组件变更必须更新本文件、组件文档和对应回归记录。
8. 只有完成“补资料 → 实现 → 运行 → Figma 对照 → 确认”后，组件才能从 `pending` 改为 `ready`。

## 二、通用组件注册

| 组件 | 代码路径 | Figma/来源 | 用途 | 禁止替代 | 状态 |
|---|---|---|---|---|---|
| `HisenseField` | `templates/project-starter/src/components/HisenseField.vue` | `field-input` | 单行、多行、只读选择、手机号前缀 | 原生 input、默认 `van-field` 视觉 | confirmed |
| `HisenseCheckbox` | `templates/project-starter/src/components/HisenseCheckbox.vue` | `checkbox` | 协议、核查和选择 | 原生 checkbox、浏览器蓝色选中态 | confirmed |
| `HisenseSteps` | 待创建 | `.steps-item/dot-horizontal` | 三步流程 | 默认 `van-steps` | pending |
| `HisenseButton` | 待创建 | Figma Button | 主次、禁用、加载操作 | 原生 button、默认 `van-button` 视觉 | pending |
| `HisenseSelectPopup` | `templates/project-starter/src/components/HisenseSelectPopup.vue` | 底部抽屉/Select List | 园区、类型、证件、区号选择 | 直接使用默认 `van-picker` | confirmed |
| `HisenseDatePicker` | 待创建 | 日期弹层参考图 + `van-calendar`行为 | 日期选择 | 直接使用默认 `van-calendar` 视觉 | pending |
| `HisenseLanguagePopup` | 待创建 | 语言弹层截图 | 中英泰越切换 | 页面内重复写语言弹层 | pending |
| `HisenseQRCode` | 待创建 | 二维码页面规则 | 统一二维码占位 | 页面内直接拼二维码图片 | pending |
| `HisenseUploader` | 待创建 | `field-upload` | 本人照片、图片上传 | 页面内重复写上传区域 | pending |

## 三、业务组件注册

| 组件 | 代码路径 | Figma/来源 | 用途 | 禁止替代 | 状态 |
|---|---|---|---|---|---|
| `HisenseUserCard` | `templates/project-starter/src/components/HisenseUserCard.vue` | `user-card-default/edit` | 同行人、入园人员 | `div` 拼同行人卡片 | confirmed |
| `HisenseVehicleCard` | `templates/project-starter/src/components/HisenseVehicleCard.vue` | `vehicle-card-default/edit` | 车辆卡片 | `div` 拼车辆卡片 | confirmed |
| `HisenseConfirmationCard` | `templates/project-starter/src/components/HisenseConfirmationCard.vue` | 信息确认页 | 预约/访客信息确认 | `SummaryRow` 列表替代 | confirmed |
| `HisenseRegistrationCard` | 待创建 | 安保登记卡片 | 安保出入登记列表 | 页面内拼访客卡片 | pending |
| `HisenseApprovalTimeline` | 待创建 | `approval-steps`/流程记录 | 审批和操作记录 | 页面内拼时间线 | pending |
| `HisenseEntryOperationPopup` | 待创建 | 入境操作弹窗 | 搜索、选人、核查、提交 | 页面内拼两步弹窗 | pending |
| `HisenseMemberPicker` | 待创建 | `user-picker/selected-item` | 成员单选/多选 | 默认 Checkbox 列表替代 | pending |
| `HisenseScanFrame` | 待创建 | 扫码页面/ScanFrame规则 | 模拟扫码状态 | 直接调用真实摄像头 | pending |

## 四、页面依赖矩阵

| 页面 | 必须调用的组件 |
|---|---|
| 访客预约首页 | `HisenseLanguagePopup`、`HisenseButton`、`HisenseQRCode` |
| 新建预约 | `HisenseSteps`、`HisenseField`、`HisenseDatePicker`、`HisenseSelectPopup`、`HisenseCheckbox`、`HisenseButton` |
| 访客信息 | `HisenseUploader`、`HisenseUserCard`、`HisenseVehicleCard`、`HisenseCheckbox` |
| 信息确认 | `HisenseConfirmationCard`、`HisenseUserCard`、`HisenseVehicleCard`、`HisenseButton` |
| 预约记录 | 预约记录卡片、状态 Tag、`HisenseQRCode` |
| 通行证 | `HisenseQRCode`、状态 Tag、信息卡片 |
| 安保登记列表 | `HisenseRegistrationCard`、Search、Tag、FilterPopup |
| 扫一扫 | `HisenseScanFrame` |
| 安保详情 | `HisenseApprovalTimeline`、信息卡片、`HisenseEntryOperationPopup` |
| 入境操作 | `HisenseMemberPicker`、Uploader、Checkbox、`HisenseButton` |

## 五、生成后检查

页面生成完成后必须检查：

- 是否直接出现原生 `input`、`button`、`checkbox` 代替注册组件；
- 是否直接使用默认 Vant `van-field`、`van-picker`、`van-calendar`视觉；
- 是否重复出现同行人、车辆、确认卡片、步骤条或按钮 CSS；
- 页面依赖是否全部来自本注册表；
- `pending` 组件是否被错误跳过；
- 是否存在没有对应 Figma来源的新增业务组件。


## 六、本次搭建状态

以下组件已创建代码骨架，但仍需逐项完成 Figma 对照和 375px 截图回归，暂不能标记为 `ready`：

- `HisenseSteps`
- `HisenseButton`
- `HisenseDatePicker`
- `HisenseLanguagePopup`
- `HisenseQRCode`
- `HisenseUploader`
- `HisenseRegistrationCard`
- `HisenseApprovalTimeline`
- `HisenseEntryOperationPopup`
- `HisenseMemberPicker`
- `HisenseScanFrame`

已创建的页面模板位于：

```text
templates/project-starter/src/pages/
```

页面模板当前是可传入 props/mock 数据的前端骨架，路由串联、真实需求字段注入和 Figma 逐页视觉回归仍需按需求确认后执行。


## 七、本轮新增 Figma 组件

以下组件已按已读取的 Figma 通用/业务节点重写，页面模板后续必须调用这些组件，不得继续使用对应的 Vant默认视觉：

- `HisenseTag`：对应 Figma `tag-fill`，用于状态标签。
- `HisenseTabs`：对应 Figma `tabs-line`，用于页面页签。
- `HisenseEmptyState`：使用已确认空状态资源，不使用默认 `van-empty` 视觉。
- `HisenseMemberPicker`：使用 Figma `user-picker/selected-item` 的 28px 胶囊成员样式，支持单选和多选。
- `HisenseApprovalTimeline`：按 Figma `approval-steps` 的 5px轨道/节点、状态标签、文本和80px图片列表实现。
- `HisenseSelectPopup`：按 Figma Select List 的列表行和选中态实现，不使用默认 Vant Picker视觉。
- `HisenseVehicleCard`：按 Figma `车辆card-default/edit` 的浅蓝渐变、18px车牌和18px操作图标实现。

这些组件仍需逐个完成 375px Figma 截图回归后，才能标记为 `ready`。


## 八、Figma组件命名空间

新的 Figma 组件不覆盖旧组件，统一位于：

```text
templates/project-starter/src/components/figma/
```

已落地的第一批 Figma 组件：

| 组件 | Figma来源 |
|---|---|
| `FigmaField` | `1551:11096` / `1623:13474` |
| `FigmaCheckbox` | `1551:11134` |
| `FigmaSteps` | `1686:11131` / `.steps-item/dot-horizontal` |
| `FigmaButton` | `1623:15263` / Figma Button variants |
| `FigmaTag` | `1623:15312` / `tag-fill` |
| `FigmaSelectList` | `1721:27132` |
| `FigmaMemberPicker` | `1687:24188` / `user-picker/selected-item` |
| `FigmaUserCard` | `1623:15330` |
| `FigmaVehicleCard` | `1623:15278` / `1722:27597` |
| `FigmaApprovalTimeline` | `1687:24064` |

这些组件是新的 Figma 来源实现，旧组件文件保留用于回退。页面模板后续只能在组件状态标记为 ready 后引用 `components/figma/` 中的组件。


## 九、Figma组件优先模式

后续组件和页面生成统一以以下目录为唯一视觉来源：

```text
templates/project-starter/src/components/figma/
```

约束：

- 页面模板只能引用 `components/figma/` 下的组件。
- `src/components/` 下的旧组件保留但不参与新页面生成，不作为视觉来源。
- 不从旧组件复制样式、Props或页面结构。
- Vant只提供行为能力，例如弹层、日期选择、上传、选择和加载。
- 页面不直接使用默认 Vant 视觉。
- 新组件必须绑定 Figma Node ID、组件状态和本地资源。
- 未完成 Figma截图对照的组件保持 `pending`，不得用于新页面模板。


本轮通用组件库新增：

- `FigmaTabs`
- `FigmaLanguagePopup`
- `FigmaUploader`
- `FigmaEmptyState`
- `FigmaQRCode`
- `FigmaPopup`
- `FigmaSelectList`
- `FigmaMemberPicker`
- `FigmaField`
- `FigmaCheckbox`
- `FigmaSteps`
- `FigmaButton`
- `FigmaTag`

组件代码位于：

```text
templates/project-starter/src/components/figma/
```

页面模板暂不接入，直到通用组件完成独立 Figma 对照和确认。