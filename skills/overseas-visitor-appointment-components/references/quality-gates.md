# Skill 质量门禁

> 适用于「组件沉淀」与「输入需求 → 生成项目」两条链路。生成项目时，逐页按 `page-generation-decision-tree.md` 的 G0–G5 判定，再执行 `page-generation-sop.md`，最后用本文件五道门禁逐项打勾。**未通过项如实标注，不写成已完成**。
>
> 2026-11-10：`page-generation-decision-tree.md` 与 `page-generation-sop.md` 已补齐，模板门禁不再有断链。
> 2026-11-13：**新增可执行门禁 `npm run gate`**（见第零节）。此前只有人工 checkbox，跨模型执行时跳过后没有代价，导致产出纯单文件 HTML、确认页左右两列、同行人/车辆自绘。

## 零、可执行门禁（先跑脚本，再打勾）

```bash
cd templates/project-starter
npm run gate
```

由两个脚本串成：

| 脚本 | 检查 | 依据 |
|---|---|---|
| `scripts/check-components.mjs` | G1 产物形态 / G2 逐场景必用组件 / G3 禁止自绘与自造规则 / G4 布局覆盖 / G5 多语言换行与长标题 / G6 弹层口径 / G7 组件交互 | `design-principles.md` 第八节、`components/README.md` 第六、七节、`pages/README.md` 第四节 |
| `scripts/check-tokens.mjs` | 字号 / padding / 间距小数越界；**只拦新增**（基线 `scripts/token-baseline.json`，不强制存量改造） | `design-tokens.md` 8.7 |

检查外部产物（例如其它模型生成的目录）用 `--target`：

```bash
node scripts/check-components.mjs --target <产物目录>
node scripts/check-tokens.mjs --target <产物目录>
```

- **FAIL = 阻塞**，退出码 1；WARN 需人工判断，不阻塞；
- 有界数据的单行省略必须写 `/* bounded-data: 理由 */` 显式标注，否则 G5 判 FAIL；
- 重建基线用 `npm run gate:baseline`（只在主动清理存量越界值后执行）；
- `--json` 输出供 CI 使用。

- [ ] `npm run gate` 通过（0 个 FAIL），输出已附在验收记录里。
- [ ] 若检查的是外部产物，`--target` 结果也通过。

## 需求门禁

- [ ] 目标端和页面范围已确认。
- [ ] 每个页面已确定 page type。
- [ ] 字段、必填状态和选项来自需求输入。
- [ ] 资源来源和确认状态已记录。
- [ ] 待确认项没有被写成固定事实。
- [ ] 存在「组件能力不够 / 未覆盖」时，已列出能力缺口与 2–3 个可行交互方案（改哪些文件、对现有页面 / 组件的影响、是否符合既有口径），并取得用户裁决；裁决前未新建组件、未改通用组件、未自造页面结构（用户 2026-11-13 裁决）。

## 模板门禁

- [ ] 已按 `page-generation-decision-tree.md` 判断模板匹配度，并产出逐页决策表（分支 A/B/C/D/E + 组件依赖 + 文件清单）。
- [ ] 能套用模板的页面没有重新设计。
- [ ] 无模板页面只使用已注册组件和 Token。
- [ ] 已按 `page-generation-sop.md` 执行生成流程；越界项写入决策表 `excluded` 且未生成代码。

## 组件门禁

- [ ] 所有依赖组件来自 `component-registry.md` 第二节（权威清单，与 `index.js` / 组件画廊三方对齐）。
- [ ] `pending` 组件没有被临时 HTML 替代；`pending` 仅为 Figma 对照进度标记，**仍可正常复用**（用户 2026-11-10 裁决）。
- [ ] 没有页面内重复实现已注册组件；组件间是复用的，不是一个页面一个组件。
- [ ] 没有用临时 HTML / 页面 CSS 绕过「组件缺能力」的场景；缺能力项已按「先问、等裁决、给交互方案」处理，决策表标 `pending: waiting-user-decision`。
- [ ] 组件已有的交互（点击、回填、弹层、选中态、删除 / 清空）在页面里保留，没有当静态图使用。
- [ ] Vant 默认视觉已被 Figma 样式覆盖。

## 视觉门禁

- [ ] 375px基准布局符合 Figma。
- [ ] 颜色 / 字号 / 行高 / 间距 / 圆角符合 `design-tokens.md`（权威入口）与 `design-spec-from-figma.md` 第九节、9.7、11.6（用户 2026-11-05「以设计稿中的为准」、2026-11-06 七项裁决）；`history/design-tokens-legacy.md` 仅作历史参考。
- [ ] Field、Button、Steps、Checkbox、Popup 和 Picker 状态符合组件规格。
- [ ] 错误提示位置和边框状态符合需求。
- [ ] 二维码、空状态和背景资源使用已确认资源。

## 运行门禁

- [ ] 原型使用模拟数据。
- [ ] 不依赖个人绝对路径或临时 Figma URL。
- [ ] 生产构建通过（`npm run build`）。
- [ ] `git diff --check` 通过。
- [ ] 页面实际渲染截图已与 Figma 对照。
- [ ] 浏览器真实点击已验证：路由可直达、组件交互生效、弹层在 375 画布内不偏移、控制台无 `Uncaught` / `[Vue warn]`。
- [ ] 所有页面 `scrollWidth == clientWidth`（仅上下滚动）。
- [ ] 页面样式没有对组件根元素的**布局属性**覆盖（`display` / `flex` / `position` / `width` / `height` / `padding`）；页面级差异走组件 prop（如 `Tabs full / height / background`）。检查法：搜索 `<style>` 里同时出现页面自定义类与 `.tabs` / `.figma-*` 根类名的规则。
- [ ] 需要非默认尺寸 / 底色的组件，已确认该组件有对应 prop；没有就先补 prop 再调用，不在页面写覆盖。

## 生成链路验收记录（逐页填写）

```yaml
page: <page id>
branch: A/B/C/D/E
decision_tree: passed | pending | reason
sop: passed | pending | reason
gates:
  requirement: passed
  template: passed
  component: passed
  visual: passed
  runtime: passed
evidence:
  build: passed
  gate: passed               # npm run gate（0 FAIL）
  browser: "route + click + computedStyle / getBoundingClientRect"
  console_errors: []
```
