# Changelog

所有重要变更记录在此文件。

## [Unreleased]

### 2026-11-05 工作快照（已提交至 main）

> 说明：本次是**工作快照提交**，不是正式 Release。
> 版本状态沿用 `docs/context/current.md` 记录的 `0.1.0`（尚未发布），以及两个 Skill 各自 frontmatter 中的版本
> （`visitor-appointment-prototype` 1.1.0 / `overseas-visitor-appointment-components` 0.1.0）。
> 本次不新增、不提升版本号，未打 tag。

**本次纳入的内容**（来自 git 状态实测）

- 新增仓库级 `AGENTS.md`、`CHANGELOG.md`。
- 新增 `docs/`：`product-status.md`、`build-plan.md`、`context/current.md`、`context/decisions.md`、`releases/`、`reviews/`。
- 新增 `scripts/`、`tests/`（cases / fixtures / results）。
- 新增 `skills/overseas-visitor-appointment-components/`：`SKILL.md`、`README.md`、7 个 references、starter 模板，含 `components/figma/` 下 21 个 Figma 组件。
- 扩展 `skills/visitor-appointment-prototype/`：references 子目录（components / pages / patterns / overview）、质量门禁与需求输入文档、3 个 Gallery、页面模板与组件。
- 更新 `HANDOFF.md`、`README.md`、`访客预约-Skill构建方案.md`、既有 5 个 references、starter 的 `App.vue` / `main.js` / `theme.css`。

**已知待确认项**（本次核对发现，未擅自补成事实）

- `references/page-generation-decision-tree.md` 被 11 处文档引用但文件不存在；`skills/overseas-visitor-appointment-components/AGENTS.md` 被列为必读但文件不存在。
- Figma 节点 `1553:22258`、`1623:13302`、`1623:20325` 在仓库内无记录。
- 「新建预约」同时存在 `1042:20391` 与 `1747:19635` 两个节点记录，资料未说明二者关系。
- 两份 `component-registry.md` 内容完全相同；overseas 注册表引用的 `Hisense*.vue` 路径在该工程中不存在。
- `docs/context/current.md` 仍写「首版范围：典型访客端和安保端页面」，与当前「优先建设 Figma 组件库」的工作指令不一致。
- 组件注册表记载 Figma 组件整体仍为 `pending`（未完成独立预览与 Figma 截图对照），本次未标记 `ready`。

**未纳入**

- `node_modules/`、`dist/`（已被 `.gitignore` 排除）。
- 工作区根目录下的 `清理清单.md`、`清理确认清单.md`（位于 git 仓库之外）。

### 规划

- 将现有设计资产、Figma 反推规格和需求输入模板整理为可发布 Skill 包。
- 按“通用组件 → 业务组件 → 页面模板 → 典型页面”逐项验证。
- 建立 Vue3 + Vant 4 + Vue Router 4 + vue-i18n 的模拟数据评审原型。

## [0.1.0]

> 尚未发布，仅作为首版规划版本。
