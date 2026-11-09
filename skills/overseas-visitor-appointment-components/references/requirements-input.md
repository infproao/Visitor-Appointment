# 访客预约原型需求输入模板

> 本文件定义 Skill 使用时的需求输入格式，不是固定业务规则。
>
> Skill 固定提供设计资产、视觉规则、组件映射、页面结构和原型交互状态；国家、字段、接口数据和校验规则由每次新需求提供。

## 一、需求输入原则

1. 地区/国家是本次页面生成的配置参数，不是固定产品入口。
2. 不在 Skill 中写死越南、泰国、中国的字段组合。
3. 用户指定地区时，读取该需求提供的字段配置生成页面。
4. 语言切换是设计组件能力；语言列表和默认语言由本次需求输入决定，未指定时使用 Skill 默认值。
5. 资源来源和确认状态作为本次需求的输入元数据，不作为无来源事实写入 Skill。
6. 用户明确页面范围时，只检查和生成该范围及必要关联弹窗。
7. 用户要求整理资产和规则时，只输出整理结果，不生成页面代码。

## 二、需求输入结构

```yaml
# 页面范围
client: visitor | security
pages:
  - visitor-home
  - appointment-form
  - appointment-records
  - appointment-records-empty
  - visitor-pass
  - appointment-detail
  - security-registration
  - security-scan
  - security-detail
  - entry-operation-popup
  - accompanying-person-popup
  - gate-control
  - filter-popup

# 地区与语言
country: ""
defaultCountry: "中国"
language: ""
defaultLanguage: "中文"
languages:
  - "中文"
  - "英文"
  - "泰语"
  - "越南语"

# 页面字段
fields:
  - key: ""
    label: ""
    type: text | textarea | select | date | time | phone | id-number | photo | checkbox | list
    required: false
    options: []
    visibleWhen: ""
    source: ""
    confirmationStatus: confirmed | proposed | pending

# 校验配置
validation:
  phone:
    countryCode: ""
    rule: ""
    errorMessage: ""
  identity:
    country: ""
    documentType: ""
    rule: ""
    errorMessage: ""
  vehicle:
    country: ""
    rule: ""
    errorMessage: ""

# 资源输入
assets:
  - path: ""
    purpose: ""
    source: ""
    confirmationStatus: confirmed | proposed | pending
    width: ""
    height: ""
    keepAspectRatio: true

# 交互限制
prototype:
  output: vue3-vant-runnable-prototype
  mockData: true
  backend: false
  api: false
  existingApi: false
  browserShell: false
  qrCode: placeholder
  qrPlaceholderAsset: "assets/images/qr-placeholder.png"
  scanMode: mock
```

## 三、字段和校验规则

- 页面应根据本次需求选择的区号进行校验。
- 具体长度、前缀、字符集、正则和错误文案必须来自需求输入。
- Skill 不把某个国家的手机号规则写死为所有页面规则。

### 证件号

- 页面应根据本次需求选择的国家和证件类型进行校验。
- 具体证件类型、长度、字符集、正则和错误文案必须来自需求输入。
- Skill 不根据语言名称自行推导证件类型或证件号规则。

### 车牌号

- 页面应根据本次需求提供的地区规则进行校验。
- 没有需求输入时，只实现输入和展示，不自行编造正则。

## 四、设计资源输入

资源记录必须包含：

- 文件路径或文件名；
- 用途；
- 来源，例如 Figma 导出、用户提供、设计师确认；
- 确认状态；
- 尺寸和比例要求；
- 是否允许裁切、拉伸或重复。

例如新建页背景资源：

```yaml
- path: "assets/images/new-appointment-background.png"
  purpose: "新建预约页顶部背景"
  source: "用户提供的设计稿资源"
  confirmationStatus: confirmed
  width: "375px"
  height: "486px"
  keepAspectRatio: true
```

如果资源只存在于聊天附件、未进入仓库，应标记为 `pending`，不得声称资源已入库。

## 五、确认状态

| 状态 | 含义 |
|---|---|
| `confirmed` | 用户、设计师、原始 Figma token 或设计规范直接确认 |
| `proposed` | Skill 为了实现原型提出的建议，不是业务事实 |
| `pending` | 资料没有证明，等待需求、设计或业务确认 |

Skill 输出资产整理结果时，每条字段、资源和交互规则都应带来源与确认状态。
