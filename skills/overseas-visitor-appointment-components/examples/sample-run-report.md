# 样例需求试跑报告

> 目的：验证 Skill 0.2.0 的「输入需求 → 生成项目」链路**真的能跑通**，而不只是文档上写了流程。
> 日期：2026-11-10 · 试跑目录：`/tmp/skill-sample-run`（`templates/project-starter/` 的干净副本）· 验证方式：Vite 构建 + 无头 Chrome CDP 真实点击。

## 一、输入

`examples/sample-requirement.yaml`：访客端、越南配置、3 个页面 + 1 个排除项。

## 二、决策树输出

`examples/sample-decision.yaml`：

| 页面 | 分支 | 结论 |
|---|---|---|
| `visitor-home` | A 套模板 | 复用 `HomePage.vue` + 路由 `/`，本轮不改文件 |
| `appointment-success-simple` | B 改模板 | `SuccessPage.vue` 追加一个注册组件 `Button` 跳到新页面 |
| `visitor-regulations-confirm` | C 新建页面 | 新建 `RegulationsConfirmPage.vue` + 路由 + 三语文案 + 组件库入口 |
| `security-scan` | E 越界 | 真实扫码超出 mock 范围，只记录不生成 |

组件依赖全部来自 `component-registry.md` 2.0：`Field` / `Checkbox` / `Button` / `Popup` / `Dialog`，无原生控件、无默认 Vant 视觉、无组件内样式复制。

## 三、生成文件清单

| 文件 | 改动 |
|---|---|
| `src/pages/RegulationsConfirmPage.vue` | **新建**：375 布局 + `Field` + 2 × `Checkbox` + `Button` + `Popup` + `Dialog`；未勾选弹 Dialog 且不推进 |
| `src/router.js` | 新增 `/regulations/confirm` 路由与 import |
| `src/i18n.js` | `zh` / `en` / `th` 三语同步补 `regulation.*` 16 个 key |
| `src/pages/SuccessPage.vue` | B 分支：追加 `Button` + `useRouter` 跳转 |
| `src/ComponentGallery.vue` | 「典型页面」分组新增生成页预览入口 |

生成产物示例：`examples/generated/RegulationsConfirmPage.vue`。

## 四、构建结果

```text
npm run build → exit 0
dist/assets/index-_R6eWyuN.js     360.27 kB │ gzip: 130.00 kB
dist/assets/index-dhYP8vc3.css    287.10 kB │ gzip:  66.50 kB
✓ built in 20.12s
```

`node serve.mjs` 启动（先 build 再静态服务 `dist`，SPA fallback）：
`GET /regulations/confirm` → **200**，说明新增路由在刷新时可直接到达。

## 五、浏览器真实点击实测（CDP / Node 22 原生 WebSocket）

| 断言 | 实测结果 |
|---|---|
| 新路由直接打开 | 标题「访客须知确认」；`Field` 1 / `Checkbox` 2 / `Button` 1 / 协议链接 2；背景为本地 `bg-image-2.svg` |
| 未勾选点「下一步」 | Dialog 可见，宽 **311**，文案「请先阅读并勾选：《访客须知》、《隐私政策》」，`inPhone: true`（挂进 375 画布），且不推进 |
| 点协议链接 | `Popup` 打开，标题《访客须知》、正文 2 条，`inPhone: true`、`left: 518`（落在 375 画布内，无水平偏移） |
| 关闭弹层 + 勾选两项 | `input:checked` 2 / `.box.checked` 2，复用的是 `Checkbox.vue` 本体 |
| 全勾后点「下一步」 | 出现「已确认，可继续预约」，Dialog 不出现 |
| B 分支跳转 | `/appointment/success` 出现 `Button`「下一步」，点击后 `location.pathname === '/regulations/confirm'` |
| A 分支回归 | `/` 首页正常渲染 |
| 组件库 | 6 组 37 项（含样例生成页 1 项），「模板页面」仍在 |
| 仅上下滚动 | 3 个页面 `scrollWidth == clientWidth`（1425） |
| 控制台 | **零错误**：无 `Uncaught` / `TypeError` / `[Vue warn]` / vue-i18n missing key |

## 六、质量门禁打勾

```yaml
delivery:
  decision_table: passed
  skeleton: passed              # 排除 node_modules / dist / vite 时间戳 / 下载副本
  pages: ["RegulationsConfirmPage.vue（新建）", "SuccessPage.vue（B 分支）"]
  routes: ["/regulations/confirm"]
  i18n: [zh, en, th]            # 三语 key 齐全，无 missing key
  components_from_registry: passed
  component_interactions: passed
  visual: passed                # 375 / 仅上下滚动 / 设计稿背景 / 海信绿链接 / Dialog 311
  build: passed                 # index-_R6eWyuN.js / index-dhYP8vc3.css
  browser: passed
  quality_gates: passed         # 需求 / 模板 / 组件 / 视觉 / 运行
  excluded: ["security-scan：真实扫码超出前端 mock 范围（分支 E）"]
  evidence:
    console_errors: []
```

## 七、结论与边界

- 结论：**输入结构化需求后，这套 Skill 可以按决策树 + SOP 产出可运行前端原型**，样例四个分支中的 A/B/C 已实跑通过，E 正确阻断。
- 边界：D 分支（补组件）本轮未触发，因为样例依赖全在注册表内；分支 D 的流程写在 SOP 第三节，遇到 `CollapseItem` / `FieldCheckbox` / `ScanFrame` 等缺口时执行。
- 试跑副本在 `/tmp`，**不写入 Skill 包与线上原型站**；`examples/` 下只留需求、决策表、报告与生成页面示例，供复用参考。
