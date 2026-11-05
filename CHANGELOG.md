# Changelog

所有重要变更记录在此文件。

## [Unreleased]

### 2026-11-05 组件预览改版 + 弹层 375px + Figma 组件缺口盘点

- 新增 `skills/overseas-visitor-appointment-components/references/component-gap-analysis.md`：以 Figma REST API 读取 `1553:22258`「通用组件」34 个、`1623:13302`「业务组件」10 个直接子节点，逐项对比 `components/figma/` 下 21 个组件，列出 **8 个缺失组件**、注册表现状问题和 13 条待确认问题。所有映射、缺失和待确认均标注事实来源，未从截图推测样式。
- `src/FigmaComponentGallery.vue`：组件预览改为**左侧分组导航（通用 / 业务 / 弹层与组合，共 22 项）+ 右侧展示**；右侧含组件元信息（Figma Node、代码路径、说明）、375px 手机画布和待确认项；新增组件名 / Node ID 搜索。
- `src/theme.css`：取消 `#app` 的 375px 整体限制（桌面布局需要），新增全局 `.figma-popup-375.van-popup` 规则，弹层固定 **375px** 并水平居中，窄屏降级 `100vw`；使用 `margin-left` 定位避免与 Vant 底部滑入动画的 `transform` 冲突。
- 5 个弹层组件（`FigmaPopup`、`FigmaDatePicker`、`FigmaLanguagePopup`、`FigmaPersonListPopup`、`FigmaMemberSelectionFlow`）及 Gallery 内裸 `van-popup` 统一追加 `figma-popup-375` 类。
- 验证：`npm run build` 通过（330 modules）；无头浏览器逐个实测 6 个可见弹层均为 `width=375`、`left=453`（1280 视口居中）；预览页截图核对左导航 / 右展示无错位。预览地址 `http://127.0.0.1:5174/`。
- **未做**：8 个缺失组件尚未实现。按 `SKILL.md` 约定「组件实现先给计划，确认后才写 `.vue`」，实现顺序已写入缺口分析文档第六节，等待确认。所有组件状态仍为 `pending`（未完成 Figma 截图对照）。

### 2026-11-05 旧版 Skill 移除

- 依据用户决定：`skills/visitor-appointment-prototype/` 效果不理想，整体移除；后续以 `skills/overseas-visitor-appointment-components/` 为唯一基底重新搭建，表单页计划用 Figma 组件重写（**尚未完成**）。
- 移除方式：整个目录（106 个真实文件 + node_modules/dist）移动到**系统废纸篓**，非永久删除；可从废纸篓或 git 提交 `20b6457` 完整恢复。
- 保留：`skills/visitor-appointment-prototype.zip`（82KB 历史包）未删除。
- 同步修正：根 `AGENTS.md` 的 6 处工作入口已切到 overseas，并补记当前状态。
- 运行影响：5173 旧版预览服务已停止；5174 组件库服务保持运行（HTTP 200）。

**待迁移引用（未擅自改写）**

以下引用仍指向已移除目录。因其中混有历史记录，未批量替换，留待重新搭建时统一处理：

| 文件 | 处数 | 性质 |
|---|---|---|
| `README.md` | 7 | 当前用法（目录结构 / 加载说明 / Kiro 说明 / 2 处 degit / 续写指令 / 规范入口） |
| `README.md` | 1 | v1.1.0 更新日志，**历史记录，保留** |
| `docs/product-status.md` | 1 | 「已反推规格」路径 |
| `docs/build-plan.md` | 1 | 引用 `references/README.md`（overseas 无此文件，需另定） |
| `HANDOFF.md` | 1 | 需求输入路径 |
| `访客预约-Skill构建方案.md` | 1 | Figma 反推规格路径 |
| `CHANGELOG.md` | 2 | 历史记录，**保留** |
| `skills/overseas-visitor-appointment-components/SKILL.md` | 1 | 「旧版组件不参与本 Skill」表述，非路径断链，**保留** |

> 另：`README.md` 中「Kiro（字节 AI IDE）」为事实错误（Kiro 由 AWS/Amazon 推出），待一并修正。

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
