# 海外版访客预约 Skill 仓库规范

本仓库用于沉淀“海外版访客预约”原型生成 Skill，不把具体国家字段、接口、正则或审批配置写死为 Skill 固定业务规则。

## 工作入口

- Skill 规范：`skills/visitor-appointment-prototype/SKILL.md`
- 组件注册表：`skills/visitor-appointment-prototype/references/component-registry.md`
- AI 编码入口：`skills/visitor-appointment-prototype/AGENTS.md`
- 需求输入：`skills/visitor-appointment-prototype/references/requirements-input.md`
- Figma 反推规格：`skills/visitor-appointment-prototype/references/figma-derived-spec.md`

## 工作边界

- 资产整理阶段只输出资产、规则、来源和确认状态，不生成页面代码。
- 原型阶段使用 Vue3 + Vant 4 + Vite、JavaScript、Vue Router 4、vue-i18n 和模拟数据。
- Vant 只承担基础行为；视觉不一致时按 Figma 设计实现项目通用组件。
- 用户明确页面范围时，只处理该范围及必要关联弹窗。
- 需求未证明的字段、文案、接口和校验规则标记待输入，不自行编造。

## 目录约定

- `docs/`：产品现状、构建方案、上下文、评审和发布记录。
- `tests/`：Skill 任务、输入 fixtures 和验证结果。
- `scripts/`：发布和打包工具；工具完成验证后再启用。
- `dist/`：版本 ZIP 输出，不提交依赖和临时文件。
- `skills/visitor-appointment-prototype/`：当前可加载 Skill 包和 starter。

完整规则以 Skill 目录内的 `AGENTS.md` 和 `SKILL.md` 为准。
