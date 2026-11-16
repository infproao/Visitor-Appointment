// 2026-11-13 补齐 Figma 缺口：collapse-item / field-checkbox（见 component-gap-analysis.md 第三节）。
// 2026-11-13 追加 ActionBar（用户截图「动作栏三种样式」）。
// 当前 33 个导出（32 个独立组件 + 1 个兼容别名）+ ListCard.vue 内部共享基座，组件目录共 34 个 .vue。
export { default as ActionBar } from './ActionBar.vue'
export { default as ApprovalRecord } from './ApprovalRecord.vue'
export { default as ApprovalTimeline } from './ApprovalTimeline.vue'
export { default as Button } from './Button.vue'
export { default as CollapseItem } from './CollapseItem.vue'
// 2026-11-10：新增级联选择（园区 → 门），Figma 整合页面 > 泰国 > 选择园区 / 搜索园区精确到门。
export { default as Cascader } from './Cascader.vue'
export { default as Checkbox } from './Checkbox.vue'
export { default as CardVariants } from './CardVariants.vue'
export { default as ContentRow } from './ContentRow.vue'
export { default as DatePicker } from './DatePicker.vue'
// 2026-11-10：通用确认弹窗（Figma 1623:20467），供表单未勾选协议等场景复用。
export { default as Dialog } from './Dialog.vue'
export { default as Dropdown } from './Dropdown.vue'
export { default as EmptyState } from './EmptyState.vue'
export { default as FieldCheckbox } from './FieldCheckbox.vue'
// 2026-11-09：新增 IconBox（Arco IconBox 团队图标，Figma 节点导出的 SVG path 集中管理）。
export { default as Field } from './Field.vue'
export { default as IconBox } from './IconBox.vue'
export { default as InlineInput } from './InlineInput.vue'
export { default as LanguagePopup } from './LanguagePopup.vue'
export { default as MemberSelectionFlow } from './MemberSelectionFlow.vue'
export { default as PersonListPopup } from './PersonListPopup.vue'
export { default as Popup } from './Popup.vue'
export { default as QRCode } from './QRCode.vue'
export { default as AppointmentRecordCard } from './AppointmentRecordCard.vue'
export { default as Search } from './Search.vue'
// 2026-11-10：安保端页头（返回 + 关闭 + 居中标题），Figma 1042:17750 > navbar-web。
export { default as SecurityHeader } from './SecurityHeader.vue'
export { default as SelectList } from './SelectList.vue'
export { default as Steps } from './Steps.vue'
export { default as Tabs } from './Tabs.vue'
export { default as Tag } from './Tag.vue'
export { default as Uploader } from './Uploader.vue'
export { default as UserCard } from './UserCard.vue'
export { default as VehicleCard } from './VehicleCard.vue'

// 兼容别名：审批记录与流程记录已合并为一个组件，此导出只为旧调用方保留，不参与新页面生成。
export { default as FlowRecordCard } from './FlowRecordCard.vue'
