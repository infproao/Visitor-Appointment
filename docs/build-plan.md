# Skill 构建方案

## 目标

将现有 Figma、Token、截图、组件和页面规则沉淀为可复用的原型生成 Skill，输出 Vue3 + Vant 4 可运行评审原型。

## 首版原则

1. 只覆盖典型移动端页面，不纳入邮件和桌面页面。
2. Vant 负责基础行为，Figma 负责视觉结构。
3. 没有视觉等价 Vant 组件时，写项目通用组件。
4. 国家、字段、语言文案和校验规则作为需求输入。
5. 每个组件和页面逐项执行：补资料 → 生成 → 运行 → 调整 → 确认 → 沉淀。

## 阶段

- A：产品上下文、设计原则、Token、运行条件、Skill 入口和需求输入。
- B：通用组件和业务组件，逐个验证状态和代码用法。
- C：典型页面，基于已确认组件逐页建设并串联流程。
- D：验证、回归、文档更新、CHANGELOG 和 ZIP 发布验证。

## 技术建议

- 保持现有 JavaScript starter，避免首版原型引入无必要类型迁移。
- 使用 Vue Router 4 管理典型页面和模拟流程。
- 使用 vue-i18n 管理中文、英文、泰语、越南语。
- 使用本地 fixture 模拟数据，不接真实 API。


## References 统一关系

阶段 A 的 Skill 规范统一入口为：

```text
skills/visitor-appointment-prototype/references/README.md
```

生成流程必须先读取 references/README.md，再按模式读取产品上下文、设计原则、Token、Figma反推规格、组件、页面、需求输入和运行条件。固定设计规则与每次需求输入分离，页面只引用已确认组件，组件只引用已确认 Token 和 Figma 规格。
