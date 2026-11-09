# 先在 Kiro 里跑起来（本包说明）

这是 2026-11-09 当天工作区的快照（**含尚未提交的本地改动**），目录结构与仓库一致，所以各文档里的相对路径都能用。

## 一、打开

Kiro → File → Open Folder → 选本文件夹根目录。

根目录的 **`AGENTS.md`** 就是规范入口（Kiro 会按项目级 agent 指令读取它）。它里面写的是硬约束，包括：颜色只认 token / Figma 节点 fill（禁止截图取色）、每个 Node ID 必须带「所在页面 > 位置 > Figma 名称」、禁止用相似组件类推或 Vant 默认值填空、弹层最大高度 `calc(100% - 80px)`、叠层偏移 12px、圆形图标按钮必须几何居中。

## 二、跑预览

```bash
cd skills/overseas-visitor-appointment-components/templates/project-starter
npm install
npm run dev          # Vite，默认 http://localhost:5173
```

`npm run build` 已验证通过（334 modules）。左侧 5 组导航共 28 项：设计规范 1 / Field 5 / 通用组件 12 / 业务组件 5 / Popup 5。

## 三、要读的几份文件（都在 `skills/overseas-visitor-appointment-components/`）

| 文件 | 用途 |
| --- | --- |
| `SKILL.md` | 整个能力包的契约与已裁决事项 |
| `references/design-spec-from-figma.md` | 数值基准（第九节 / 9.7 / 11.6 为渲染口径）；与 `design-tokens.md` 冲突时以此为准 |
| `references/component-registry.md` | **22 个独立组件 + 1 兼容别名**的权威清单、Figma 来源、2.5 弹层高度与叠层口径 |
| `references/component-fidelity-checklist.md` | 已确认偏差、7 条根因、待确认项、五步核对流程 |
| `references/figma-node-index.md` | 179 个 Node ID → 页面 > 位置 > 名称 + Figma 链接 |
| `src/components/figma/` | 23 个 `.vue`（唯一实现来源） |

## 四、当前状态（别当成已完成）

- 22 个组件状态**全部 `pending`**，待设计方截图确认后才转 `confirmed`。
- 图层面板里仍是 `pending` 的项，`docs/context/current.md` 的「待用户裁决」一节列全了（`Field` 值字重、`Button` 红/橙/绿/neutral 四色、`DatePicker` 单月分页、`1687:24188` 的正确 Node ID 等）。
- 6 个组件尚未建：P1 `Search` / `Dropdown` / `Dialog`，P2 `CollapseItem` / `FieldCheckbox`，P3 `ScanFrame`。
- 本轮改动**全部未提交、未推送**（这个包就是工作区快照）。

## 五、可以直接粘给 Kiro 的续写指令

> 读根目录 `AGENTS.md` 与 `skills/overseas-visitor-appointment-components/SKILL.md`，按 `references/component-registry.md` 的实现来源补 P1 组件 `Search`，先在 Figma（文件 `JRpDmIIybR17xUVA8s9sK4`）定位节点并逐属性读出尺寸/padding/gap/圆角/fill/stroke/文字，写进注释，再实现 `.vue`，最后用浏览器回读校验，差值 >1px 视为不通过。找不到节点就标 `pending`，不要用相似组件类推，不要用 Vant 默认值填空。

## 六、两处已知的过期说明（我未擅自改）

- 根 `README.md` 第 36 / 50 行仍指向旧目录 `skills/visitor-appointment-prototype/`，本仓库实际是 `skills/overseas-visitor-appointment-components/`。
- 根 `README.md` 第 42 行把 Kiro 写成「字节 AI IDE」；Kiro 是 AWS 的产品。

需要我把这两处一并改正，或再补一份 Kiro 原生 `.kiro/steering/*.md`（`inclusion: always` 指向 `AGENTS.md`），说一声即可。
