# Skill References 统一引用关系

本目录是 `visitor-appointment-prototype` 的规范入口。各文件职责不同，不重复定义同一条规则。

## 一、权威来源层级

发生冲突时按以下顺序处理：

1. **当前用户需求**：本次页面、字段、语言、资源和确认规则。
2. **Figma 选定节点**：结构、尺寸、字体、组件变体和视觉状态。
3. **原始 Token 文件**：颜色和变量原值。
4. **Figma 反推规格**：从节点和截图测量后的可执行设计规格。
5. **Skill 设计规范**：已经确认并沉淀的通用原则、Token、组件和页面规则。
6. **方案建议**：仅在前面没有规定时使用，并标记为建议。

冲突时不得默默覆盖；必须记录冲突、来源和最终决策。

## 二、统一读取顺序

### 资产与规则整理模式

```text
Figma / 截图 / 原始 Token
→ product-context.md
→ design-principles.md
→ design-tokens.md
→ figma-derived-spec.md
→ components.md
→ pages.md
→ requirements-input.md
→ page-generation-decision-tree.md
→ runtime-conditions.md
→ 输出来源和确认状态报告
```

### 原型生成模式

```text
requirements-input.md
→ runtime-conditions.md
→ pages.md
→ figma-derived-spec.md
→ components.md
→ component-registry.md
→ page-generation-decision-tree.md
→ runtime-conditions.md
→ 生成页面和模拟数据
→ 按页面/组件验收清单回归
```

## 三、文件职责

| 文件 | 唯一职责 | 不负责的内容 |
|---|---|---|
| `product-context.md` | 产品定位、角色、核心流程和只影响原型交互的已知业务规则 | 国家固定字段、接口、审批配置 |
| `design-principles.md` | 布局、层级、可访问性、多语言和交互原则 | 单个页面的具体字段 |
| `design-tokens.md` | 颜色、字体、间距、圆角、控件尺寸和 Token 映射 | 页面业务流程 |
| `figma-derived-spec.md` | Figma Node ID、精确尺寸、组件结构、资产和反推限制 | 需求输入和业务数据 |
| `components.md` | Vant行为映射、通用组件、业务组件、组合方式和状态 | 完整页面流程 |
| `components/` | 通用组件、业务组件和组件选择分层文档 | 组件补充和验证时读 |
| `component-registry.md` | 组件代码路径、Figma映射、强制调用规则和页面依赖 | 生成或修改页面前必读 |
| `page-generation-decision-tree.md` | 需求确认后的模板匹配和页面生成决策 | 生成页面前必读 |
| `quality-gates.md` | 需求、组件、视觉和运行质量门禁 | 生成和交付前读 |
| `pages/` | 页面模板和页面类型分层文档 | 页面模板判断时读 |
| `requirements-input.md` | 每次需求提供的端、页面、国家、字段、语言、资源和校验配置 | Skill固定设计规则 |
| `runtime-conditions.md` | 原型运行方式、模拟数据、路由、多语言、二维码和扫码限制 | 视觉设计细节 |

## 四、引用关系

```text
SKILL.md
├── references/README.md                 # 读取入口和优先级
├── references/product-context.md        # 产品上下文
├── references/design-principles.md      # 设计原则
├── references/design-tokens.md          # 设计系统变量
├── references/figma-derived-spec.md     # Figma反推规格
├── references/components.md             # 组件映射和状态
├── references/components/               # 组件分层文档
├── references/pages.md                  # 页面清单
├── references/pages/                    # 页面模板目录
├── references/component-registry.md     # 组件强制调用契约
├── references/page-generation-decision-tree.md
├── references/quality-gates.md
├── references/requirements-input.md     # 本次需求输入
└── references/runtime-conditions.md     # 运行与输出约束
```

生成页面时，页面引用 `pages.md`，页面中的组件引用 `components.md`，组件视觉引用 `figma-derived-spec.md` 和 `design-tokens.md`，国家字段和校验只引用 `requirements-input.md`。

## 五、固定规则和需求输入的边界

### 固定在 Skill 中

- Figma 视觉结构；
- 海信 Token；
- 通用组件视觉和状态；
- 典型页面结构；
- 只影响原型展示和交互的已知规则；
- Vue3 + Vant 4 原型运行约束。

### 每次需求输入

- 页面范围；
- 国家/地区；
- 字段、必填状态和选项；
- 手机号区号和校验；
- 证件类型和校验；
- 车牌规则；
- 具体文案和语言；
- 资源路径、来源、尺寸和确认状态。

## 六、变更沉淀规则

- Figma视觉变化：先更新 `figma-derived-spec.md`，再更新组件或页面规则。
- Token变化：更新 `design-tokens.md`，同步 `theme.css`，记录 `decisions.md`。
- 通用组件变化：更新 `components.md`，补组件验证结果。
- 页面变化：更新 `pages.md`，补页面回归结果。
- 需求输入变化：只更新 `requirements-input.md` 或测试 fixture，不修改固定设计规则。
- 任何冲突解决：更新 `docs/context/decisions.md` 和 `CHANGELOG.md`。
