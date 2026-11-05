# 海外版访客预约 Skill 仓库规范

> 当前状态（2026-11-05）：旧版 `skills/visitor-appointment-prototype/` 因效果不理想已移除，可从 git 提交 `20b6457` 恢复。
> 后续以 `skills/overseas-visitor-appointment-components/` 为唯一基底重新搭建；表单页计划用 Figma 组件重写，**尚未完成**。

本仓库用于沉淀“海外版访客预约”原型生成 Skill，不把具体国家字段、接口、正则或审批配置写死为 Skill 固定业务规则。

## 工作入口

- Skill 规范：`skills/overseas-visitor-appointment-components/SKILL.md`
- **设计规范基准：`skills/overseas-visitor-appointment-components/references/design-spec-from-figma.md`（第九节「最终规范值」；第十一节为两页范围与 24 个业务页面清单）**
- **Figma 页面范围**：同一文件 `JRpDmIIybR17xUVA8s9sK4` 的两个节点 —— `1550:3803`「——模板——」（组件与规范画板）、`1824:42919`「泰国」（24 个业务页面）
- 早期设计变量（历史记录）：`skills/overseas-visitor-appointment-components/references/design-tokens.md`
- 组件注册表：`skills/overseas-visitor-appointment-components/references/component-registry.md`
- AI 编码入口：本文件（仓库根 `AGENTS.md`）。`skills/overseas-visitor-appointment-components/AGENTS.md` 目前不存在，待补
- 需求输入：`skills/overseas-visitor-appointment-components/references/requirements-input.md`
- Figma 反推规格：`skills/overseas-visitor-appointment-components/references/figma-derived-spec.md`

## 工作边界

- 资产整理阶段只输出资产、规则、来源和确认状态，不生成页面代码。
- 原型阶段使用 Vue3 + Vant 4 + Vite、JavaScript、Vue Router 4、vue-i18n 和模拟数据。
- Vant 只承担基础行为；视觉不一致时按 Figma 设计实现项目通用组件。
- **设计规范数值以设计稿为准**（用户 2026-11-05 裁决）：取 Figma 节点实际渲染属性，不取画板说明文字标注、外部海信 token 文件或 Vant 默认值；`design-tokens.md` 仅作历史参考，冲突处以 `design-spec-from-figma.md` 第九节为准。代码侧 `src/theme.css` 的 `--van-*` 变量迁移**尚未执行**，改代码前需前端确认。
- 用户明确页面范围时，只处理该范围及必要关联弹窗。
- 需求未证明的字段、文案、接口和校验规则标记待输入，不自行编造。

## 目录约定

- `docs/`：产品现状、构建方案、上下文、评审和发布记录。
- `tests/`：Skill 任务、输入 fixtures 和验证结果。
- `scripts/`：发布和打包工具；工具完成验证后再启用。
- `dist/`：版本 ZIP 输出，不提交依赖和临时文件。
- `skills/overseas-visitor-appointment-components/`：当前唯一 Skill 包和 starter。
- `skills/visitor-appointment-prototype.zip`：历史打包文件（旧版目录已移除，此文件保留作历史参考）。

完整规则以 `skills/overseas-visitor-appointment-components/SKILL.md` 为准；本文件为仓库级工作入口。
