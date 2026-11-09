# Figma Node ID 可读对照索引

> 生成日期：2026-11-06　文件：`JRpDmIIybR17xUVA8s9sK4`「海外版访客预约」
>
> **为什么有这份表**：`1747:19635` 这类 `数字:数字` 是 Figma REST API 的内部标识，Figma 界面上不显示，单看编号无法判断属于哪个页面。本表把仓库文档与组件预览中出现的**每一个编号**还原成「所在页面 > 位置 > Figma 名称」，编号只作机器检索用，**阅读与判断以名称为准**。
>
> **数据来源**：按 11 个 CANVAS 页面逐个拉取全树，共 **82,427 个节点**（`X-Figma-Token` + `/v1/files/{key}/nodes?ids=<pageId>`）；不在页面树内的另用 `/nodes?ids=<nodeId>` 直查。查不到的如实标「查无此节点」，不自行补成事实。
>
> **在 Figma 里定位**：把冒号换成连字符，例如 `1747:19635` → `?node-id=1747-19635`。下表每个编号都带可点击链接。
>
> **口径提醒**：组件定义（`COMPONENT` / `COMPONENT_SET`）挂在文件级，不出现在任何 CANVAS 子树里，但可经 `/nodes` 直取；这与「节点不存在」是两回事。

## 一、页面（CANVAS）速查

| 页面名 | Node ID | 说明 |
|---|---|---|
| 封面 | [`0:1`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=0-1) | 封面 |
| 越南版-用户端 | [`1:18`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1-18) | 越南早期用户端 |
| 审批页 | [`337:10824`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=337-10824) | 审批相关 |
| 越南V1.1 | [`1035:2853`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1035-2853) | 越南 1.1 版页面 |
| ——泰国版—— | [`1211:18837`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1211-18837) | 空页面（1 节点） |
| 用户端-泰国 | [`264:7388`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=264-7388) | 泰国用户端 |
| 安保端-泰国 | [`596:12873`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=596-12873) | 泰国安保端 |
| 泰国V1.1 | [`1210:2439`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1210-2439) | 泰国 1.1 版 |
| ——模板—— | [`1550:3803`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1550-3803) | **组件与规范画板，组件视觉唯一来源** |
| 整合页面 | [`1747:19633`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1747-19633) | 含 `1824:42919`「泰国」SECTION 与 `1747:19635`「访客预约01」 |
| ——废弃—— | [`30:2784`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=30-2784) | 废弃稿，不作视觉来源 |

## 二、两个「访客预约01」——用户点名无法区分的编号

| Node ID | 所在页面 | 位置路径 | Figma 名称 | 尺寸 |
|---|---|---|---|---|
| [`1747:19635`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1747-19635) | **整合页面** | 越南版访客预约填报 | 访客预约01 | 375×1093 |
| [`1042:20391`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1042-20391) | **越南V1.1** | 页面根级 | 访客预约01 | 375×1093 |

> 二者**同名、同尺寸（375×1093）、同为 FRAME**，但分属不同页面：前者在「整合页面 > 越南版访客预约填报」，后者在「越南V1.1」根级。哪个是主用节点**仍待确认**，资料无法区分。

## 三、按页面分组的完整对照

### ——模板——（74 个编号）

| Node ID | 位置路径 | Figma 名称 | 类型 | 尺寸 | 备注 |
|---|---|---|---|---|---|
| [`1550:3803`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1550-3803) | （页面根级） | ——模板—— | CANVAS | 0×0 |  |
| [`1551:11096`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1551-11096) | 通用组件 | field-input | INSTANCE | 311×76 |  |
| [`1551:11134`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1551-11134) | 通用组件 | checkbox | INSTANCE | 162×22 |  |
| [`1553:22258`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1553-22258) | （页面根级） | 通用组件 | SECTION | 2554×1992 |  |
| [`1623:13302`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1623-13302) | （页面根级） | 业务组件 | SECTION | 2554×1992 |  |
| [`1623:13303`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1623-13303) | 业务组件 | user-card-edit | INSTANCE | 311×56 |  |
| [`1623:13428`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1623-13428) | 通用组件 | field-input | INSTANCE | 311×76 |  |
| [`1623:13474`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1623-13474) | 通用组件 | field-input | FRAME | 311×76 |  |
| [`1623:15088`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1623-15088) | 业务组件 | user-card | INSTANCE | 351×164 |  |
| [`1623:15126`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1623-15126) | 通用组件 > tag-fill | input | INSTANCE | 62×22 |  |
| [`1623:15138`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1623-15138) | 通用组件 > tag-fill | input | INSTANCE | 62×22 |  |
| [`1623:15167`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1623-15167) | 通用组件 > tag-fill | input | INSTANCE | 62×22 |  |
| [`1623:15263`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1623-15263) | 通用组件 | button | INSTANCE | 200×44 |  |
| [`1623:15264`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1623-15264) | 通用组件 | button | INSTANCE | 200×44 |  |
| [`1623:15278`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1623-15278) | 业务组件 | 车辆card-edit | FRAME | 311×56 |  |
| [`1623:15312`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1623-15312) | 通用组件 | tag | FRAME | 343×32 |  |
| [`1623:15313`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1623-15313) | 通用组件 > tag | tag | INSTANCE | 113×32 |  |
| [`1623:15330`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1623-15330) | 业务组件 | user-card-default | FRAME | 311×48 |  |
| [`1623:20291`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1623-20291) | 通用组件 | tabs-line | INSTANCE | 343×42 |  |
| [`1623:20316`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1623-20316) | 通用组件 | tag-fill | GROUP | 358×22 |  |
| [`1623:20325`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1623-20325) | 通用组件 | 底部抽屉 | FRAME | 375×812 |  |
| [`1623:20467`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1623-20467) | 通用组件 | dialog | INSTANCE | 311×176 |  |
| [`1686:11129`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1686-11129) | 通用组件 | 预约编号：VS20250728001 | TEXT | 271×24 |  |
| [`1686:11131`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1686-11131) | 通用组件 | steps-dot | FRAME | 303×36 |  |
| [`1686:11302`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1686-11302) | 通用组件 | dropdown | INSTANCE | 68×28 |  |
| [`1686:11710`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1686-11710) | 通用组件 | search | INSTANCE | 343×56 |  |
| [`1686:11722`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1686-11722) | 通用组件 | search | INSTANCE | 343×52 |  |
| [`1686:20447`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1686-20447) | 通用组件 | field-upload | INSTANCE | 311×132 |  |
| [`1686:23205`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1686-23205) | 通用组件 | content | INSTANCE | 343×44 |  |
| [`1687:23512`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1687-23512) | Container > Frame 6 | input | INSTANCE | 68×24 |  |
| [`1687:24064`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1687-24064) | 业务组件 | 流程记录 | FRAME | 343×530 |  |
| [`1687:24065`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1687-24065) | 业务组件 > 流程记录 | approval-steps | FRAME | 343×530 |  |
| [`1687:24071`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1687-24071) | 流程记录 > approval-steps | steps | FRAME | 343×530 |  |
| [`1687:24075`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1687-24075) | steps > .step-item-vertical | content | FRAME | 311×322 |  |
| [`1687:24111`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1687-24111) | approval-steps > steps | .step-item-vertical | INSTANCE | 375×109 |  |
| [`1687:24203`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1687-24203) | 通用组件 | field-checkbox | INSTANCE | 319×168 |  |
| [`1688:24312`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1688-24312) | 业务组件 | collapse-item | INSTANCE | 343×370 |  |
| [`1718:20153`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1718-20153) | 通用组件 | field-input | INSTANCE | 311×76 |  |
| [`1718:20281`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1718-20281) | 通用组件 | field-input | INSTANCE | 311×98 |  |
| [`1718:20478`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1718-20478) | 通用组件 | 成员只读 | FRAME | 319×116 |  |
| [`1721:26859`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1721-26859) | 通用组件 | field-input | INSTANCE | 311×76 |  |
| [`1721:27132`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1721-27132) | 通用组件 | Select List | FRAME | 343×156 |  |
| [`1722:27223`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1722-27223) | 通用组件 | collapse-item | INSTANCE | 343×370 |  |
| [`1722:27401`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1722-27401) | 通用组件 | 审批记录 | FRAME | 343×330 |  |
| [`1722:27597`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1722-27597) | 业务组件 | 车辆card-default | FRAME | 311×56 |  |
| [`1722:27845`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1722-27845) | （页面根级） | Elevation | FRAME | 1468×745 |  |
| [`1722:27852`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1722-27852) | Frame 2 > Light | Elevation 0 | RECTANGLE | 216×216 |  |
| [`1722:27853`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1722-27853) | Frame 2 > Light | Elevation 4 | RECTANGLE | 216×216 |  |
| [`1722:27854`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1722-27854) | Frame 2 > Light | Elevation 1 | RECTANGLE | 216×216 |  |
| [`1722:27855`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1722-27855) | Frame 2 > Light | Elevation 2 | RECTANGLE | 216×216 |  |
| [`1722:27856`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1722-27856) | Frame 2 > Light | Elevation 3 | RECTANGLE | 216×216 |  |
| [`1723:27897`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1723-27897) | （页面根级） | Color Guidance | FRAME | 1500×1711 |  |
| [`1723:27903`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1723-27903) | Color Guidance > Frame 2 | Frame 14 | FRAME | 216×1252 |  |
| [`1723:27907`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1723-27907) | Frame 4 > Frame 3 | Primary | RECTANGLE | 216×108 |  |
| [`1723:27920`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1723-27920) | Color Guidance > Frame 2 | Frame 15 | FRAME | 216×928 |  |
| [`1723:27932`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1723-27932) | Color Guidance > Frame 2 | Frame 16 | FRAME | 216×712 |  |
| [`1723:27941`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1723-27941) | Color Guidance > Frame 2 | Frame 17 | FRAME | 216×820 |  |
| [`1723:27951`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1723-27951) | Color Guidance > Frame 2 | Frame 18 | FRAME | 216×496 |  |
| [`1723:28208`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1723-28208) | 业务组件 | llistcard | INSTANCE | 351×156 |  |
| [`1723:28234`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1723-28234) | 通用组件 | 空状态 | FRAME | 311×316 |  |
| [`1723:28260`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1723-28260) | body > Frame 30 | tag | INSTANCE | 80×40 |  |
| [`1723:28299`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1723-28299) | （页面根级） | 按钮文字默认16px | TEXT | 292×44 |  |
| [`1733:4157`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1733-4157) | （页面根级） | 特殊处理页面 | SECTION | 2096×2428 |  |
| [`1747:27878`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1747-27878) | （页面根级） | 按钮文字默认16px | TEXT | 292×44 |  |
| [`1758:27929`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1758-27929) | 通用组件 | button | INSTANCE | 200×44 |  |
| [`1758:27930`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1758-27930) | 通用组件 | dropdown | INSTANCE | 68×28 |  |
| [`1758:27931`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1758-27931) | 通用组件 | button | INSTANCE | 200×44 |  |
| [`1803:33585`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1803-33585) | 通用组件 | 选择入园人员 | FRAME | 375×801 |  |
| [`1803:33841`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1803-33841) | 通用组件 | 已选列表 | FRAME | 375×801 |  |
| [`1803:34190`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1803-34190) | （页面根级） | 模板页 | SECTION | 2813×2840 |  |
| [`1814:34191`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1814-34191) | 业务组件 | 扫码 | FRAME | 375×812 |  |
| [`1893:20270`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1893-20270) | 业务组件 | input | INSTANCE | 62×22 |  |
| [`2165:15637`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=2165-15637) | 通用组件 | 成员选择后 | FRAME | 319×80 |  |
| [`2165:15684`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=2165-15684) | 通用组件 | field-input | INSTANCE | 311×76 |  |

### 整合页面（31 个编号）

| Node ID | 位置路径 | Figma 名称 | 类型 | 尺寸 | 备注 |
|---|---|---|---|---|---|
| [`1747:19633`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1747-19633) | （页面根级） | 整合页面 | CANVAS | 0×0 |  |
| [`1747:19635`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1747-19635) | 越南版访客预约填报 | 访客预约01 | FRAME | 375×1093 |  |
| [`1747:19636`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1747-19636) | 越南版访客预约填报 > 访客预约01 | bg-image-2 | INSTANCE | 375×486 |  |
| [`1747:19637`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1747-19637) | 越南版访客预约填报 > 访客预约01 | box | FRAME | 343×896 |  |
| [`1822:36720`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1822-36720) | 泰国 | 选择园区 | FRAME | 375×812 |  |
| [`1822:36721`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1822-36721) | 泰国 > 选择园区 | cascader | FRAME | 375×400 |  |
| [`1822:36729`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1822-36729) | body > list | cascader | INSTANCE | 375×480 |  |
| [`1822:36731`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1822-36731) | 泰国 | 搜索园区 | FRAME | 375×812 |  |
| [`1822:36763`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1822-36763) | 泰国 | 访客出入登记 | FRAME | 375×902 |  |
| [`1822:37034`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1822-37034) | 泰国 | 详情 | FRAME | 375×1778 |  |
| [`1822:37180`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1822-37180) | 泰国 | 详情-出入记录 | FRAME | 375×812 |  |
| [`1822:37245`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1822-37245) | 泰国 | 入园操作 | FRAME | 375×812 |  |
| [`1822:37277`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1822-37277) | 泰国 | 选择入园人员 | FRAME | 375×801 |  |
| [`1822:37533`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1822-37533) | 泰国 | 已选列表 | FRAME | 375×801 |  |
| [`1822:37983`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1822-37983) | 泰国 | image-preview | FRAME | 375×812 |  |
| [`1822:37990`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1822-37990) | 泰国 | image-preview | FRAME | 375×812 |  |
| [`1822:37996`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1822-37996) | 泰国 | 更多 | FRAME | 375×812 |  |
| [`1822:38276`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1822-38276) | 泰国 | 筛选 | FRAME | 375×812 |  |
| [`1822:38307`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1822-38307) | 泰国 | 搜索园区精确到门 | FRAME | 375×812 |  |
| [`1822:39622`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1822-39622) | 泰国 | 提交成功 | FRAME | 375×812 |  |
| [`1822:39636`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1822-39636) | 泰国 | 同行人 | FRAME | 375×1091 |  |
| [`1822:39675`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1822-39675) | 泰国 | 同行人——链接已过期 | FRAME | 375×812 |  |
| [`1822:39754`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1822-39754) | 泰国 | 选择您的姓名 | FRAME | 375×812 |  |
| [`1822:39896`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1822-39896) | 泰国 | 主访客提交成功 | FRAME | 1024×974 |  |
| [`1822:40439`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1822-40439) | 泰国 | 安保—入园操作 | FRAME | 375×924 |  |
| [`1822:40474`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1822-40474) | 泰国 | 安保-详情-出入记录 | FRAME | 375×812 |  |
| [`1822:40540`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1822-40540) | 泰国 | 同行人 | FRAME | 375×1091 |  |
| [`1822:40579`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1822-40579) | 泰国 | 入园操作 | FRAME | 375×812 |  |
| [`1822:40654`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1822-40654) | 泰国 | 入园操作 | FRAME | 375×812 |  |
| [`1822:40791`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1822-40791) | 泰国 | 详情 | FRAME | 375×1884 |  |
| [`1824:42919`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1824-42919) | （页面根级） | 泰国 | SECTION | 7126×3939 |  |

### 越南V1.1（45 个编号）

| Node ID | 位置路径 | Figma 名称 | 类型 | 尺寸 | 备注 |
|---|---|---|---|---|---|
| [`1035:2853`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1035-2853) | （页面根级） | 越南V1.1 | CANVAS | 0×0 |  |
| [`1035:8199`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1035-8199) | 安保端 | 安保端-搜索页 | FRAME | 375×902 |  |
| [`1042:17750`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1042-17750) | 安保端 | 详情 | FRAME | 375×812 |  |
| [`1042:18220`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1042-18220) | 安保端 | 选择园区 | FRAME | 375×812 |  |
| [`1042:20391`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1042-20391) | （页面根级） | 访客预约01 | FRAME | 375×1093 |  |
| [`1042:20392`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1042-20392) | 访客预约01 | bg-image-2 | INSTANCE | 375×486 |  |
| [`1042:20393`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1042-20393) | 访客预约01 | box | FRAME | 343×896 |  |
| [`1042:20394`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1042-20394) | 访客预约01 > box | header | FRAME | 343×32 |  |
| [`1042:20395`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1042-20395) | box > header | 访客预约 | TEXT | 96×32 |  |
| [`1042:20396`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1042-20396) | box > header | button | FRAME | 52×32 |  |
| [`1042:20397`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1042-20397) | header > button | label-text | TEXT | 20×20 |  |
| [`1042:20398`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1042-20398) | header > button | icon-wrapper | INSTANCE | 12×12 |  |
| [`1042:20399`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1042-20399) | 访客预约01 > box | page-header | FRAME | 343×60 |  |
| [`1042:20400`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1042-20400) | box > page-header | steps-dot | FRAME | 303×36 |  |
| [`1042:20402`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1042-20402) | steps-dot > .steps-item/dot-horizontal | left-line | INSTANCE | 20×4 |  |
| [`1042:20404`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1042-20404) | .steps-item/dot-horizontal > stepper | .steps-item/dot | INSTANCE | 8×8 |  |
| [`1042:20406`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1042-20406) | stepper > content | title | TEXT | 48×20 |  |
| [`1042:20408`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1042-20408) | steps-dot > .steps-item/dot-horizontal | rigt-line | INSTANCE | 65×0 |  |
| [`1042:20412`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1042-20412) | page-header > steps-dot | .steps-item/dot-horizontal | INSTANCE | 101×36 |  |
| [`1042:20416`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1042-20416) | page-header > steps-dot | .steps-item/dot-horizontal | INSTANCE | 101×36 |  |
| [`1042:20417`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1042-20417) | 访客预约01 > box | card | FRAME | 343×108 |  |
| [`1042:20418`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1042-20418) | box > card | field-input | INSTANCE | 311×108 |  |
| [`1042:20419`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1042-20419) | 访客预约01 > box | card | FRAME | 343×502 |  |
| [`1042:20420`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1042-20420) | box > card | 预约信息 | TEXT | 64×24 |  |
| [`1042:20422`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1042-20422) | card > form | field-input | INSTANCE | 311×76 |  |
| [`1042:20425`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1042-20425) | card > form | field-textarea | INSTANCE | 311×100 |  |
| [`1042:20426`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1042-20426) | card > form | Frame 42 | FRAME | 311×38 |  |
| [`1042:20429`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1042-20429) | form > Frame 42 | Line 1 | LINE | 40×0 |  |
| [`1042:20430`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1042-20430) | card > form | form | FRAME | 311×76 |  |
| [`1042:20441`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1042-20441) | right > wrap | min-height-24 | FRAME | 0×24 |  |
| [`1042:20443`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1042-20443) | 访客预约01 > box | checkbox | INSTANCE | 162×22 |  |
| [`1042:20444`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1042-20444) | 访客预约01 > box | checkbox | INSTANCE | 204×22 |  |
| [`1042:20445`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1042-20445) | 访客预约01 > box | checkbox | INSTANCE | 302×22 |  |
| [`1042:20446`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1042-20446) | 访客预约01 > box | button | INSTANCE | 343×44 |  |
| [`1045:21234`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1045-21234) | 用户端 | 预约详情 | FRAME | 375×812 |  |
| [`1045:21815`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1045-21815) | 安保端 | 安保端-扫码 | FRAME | 375×1002 |  |
| [`1076:23281`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1076-23281) | 用户端 | 首页 | FRAME | 375×812 |  |
| [`1083:24323`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1083-24323) | 用户端 | 预约记录 | FRAME | 375×812 |  |
| [`1087:24843`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1087-24843) | 用户端 | 预约记录——无预约记录 | FRAME | 375×812 |  |
| [`1087:25278`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1087-25278) | 用户端 | 新建预约 | FRAME | 375×1338 |  |
| [`1087:26120`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1087-26120) | 用户端 | 凭证 | FRAME | 375×812 |  |
| [`1087:26318`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1087-26318) | 用户端 | 暂无凭证 | FRAME | 375×812 |  |
| [`1130:2559`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1130-2559) | 安保端 | 扫码 | FRAME | 375×812 |  |
| [`1139:4351`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1139-4351) | 安保端 | 详情 | FRAME | 375×812 |  |
| [`1758:32847`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1758-32847) | （页面根级） | 详情 | FRAME | 375×812 |  |

### 用户端-泰国（1 个编号）

| Node ID | 位置路径 | Figma 名称 | 类型 | 尺寸 | 备注 |
|---|---|---|---|---|---|
| [`264:7388`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=264-7388) | （页面根级） | 用户端-泰国 | CANVAS | 0×0 |  |

### 安保端-泰国（2 个编号）

| Node ID | 位置路径 | Figma 名称 | 类型 | 尺寸 | 备注 |
|---|---|---|---|---|---|
| [`409:23362`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=409-23362) | 访客出入登记 > content | card | COMPONENT | 351×164 |  |
| [`596:12873`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=596-12873) | （页面根级） | 安保端-泰国 | CANVAS | 0×0 |  |

### 泰国V1.1（1 个编号）

| Node ID | 位置路径 | Figma 名称 | 类型 | 尺寸 | 备注 |
|---|---|---|---|---|---|
| [`1210:2439`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1210-2439) | （页面根级） | 泰国V1.1 | CANVAS | 0×0 |  |

### 审批页（1 个编号）

| Node ID | 位置路径 | Figma 名称 | 类型 | 尺寸 | 备注 |
|---|---|---|---|---|---|
| [`337:10824`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=337-10824) | （页面根级） | 审批页 | CANVAS | 0×0 |  |

### 越南版-用户端（1 个编号）

| Node ID | 位置路径 | Figma 名称 | 类型 | 尺寸 | 备注 |
|---|---|---|---|---|---|
| [`1:18`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1-18) | （页面根级） | 越南版-用户端 | CANVAS | 0×0 |  |

### ——废弃——（2 个编号）

| Node ID | 位置路径 | Figma 名称 | 类型 | 尺寸 | 备注 |
|---|---|---|---|---|---|
| [`30:2784`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=30-2784) | （页面根级） | ——废弃—— | CANVAS | 0×0 |  |
| [`36:3918`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=36-3918) | body > Frame 1 | content | COMPONENT | 343×44 |  |

### ——泰国版——（1 个编号）

| Node ID | 位置路径 | Figma 名称 | 类型 | 尺寸 | 备注 |
|---|---|---|---|---|---|
| [`1211:18837`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1211-18837) | （页面根级） | ——泰国版—— | CANVAS | 0×0 |  |

### （文件级组件定义，不在任何页面树内）（9 个编号）

| Node ID | 位置路径 | Figma 名称 | 类型 | 尺寸 | 备注 |
|---|---|---|---|---|---|
| [`5:374`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=5-374) | — /nodes 直取 | field-input | COMPONENT_SET | 810×684 |  |
| [`5:387`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=5-387) | — /nodes 直取 | 对齐=上, 填充=false, 禁用=false, 尺寸=默认 | COMPONENT | 375×72 |  |
| [`5:389`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=5-389) | — /nodes 直取 | 对齐=上, 填充=true, 禁用=false, 尺寸=默认 | COMPONENT | 375×72 |  |
| [`13:4900`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=13-4900) | — /nodes 直取 | bg | RECTANGLE | 14×14 |  |
| [`13:4902`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=13-4902) | — /nodes 直取 | wrapper | FRAME | 14×14 |  |
| [`13:8186`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=13-8186) | — /nodes 直取 | 展开=true, 禁用=false, 展开图标=左侧 | COMPONENT | 600×100 |  |
| [`13:8238`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=13-8238) | — /nodes 直取 | 状态=待入园 | COMPONENT | 62×22 |  |
| [`1042:20410`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1042-20410) | — /nodes 直取 | title | TEXT | 48×20 |  |
| [`1042:20414`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1042-20414) | — /nodes 直取 | title | TEXT | 48×20 |  |

### （无效编号 / 查无此节点）（11 个编号）

| Node ID | 位置路径 | Figma 名称 | 类型 | 尺寸 | 备注 |
|---|---|---|---|---|---|
| [`0:2331`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=0-2331) | — | 查无此节点 | — | — | 全文件 82,427 节点 0 处 + /nodes NOT FOUND |
| [`309:10570`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=309-10570) | — | 查无此节点 | — | — | 全文件 82,427 节点 0 处 + /nodes NOT FOUND |
| [`309:10598`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=309-10598) | — | 查无此节点 | — | — | 全文件 82,427 节点 0 处 + /nodes NOT FOUND |
| [`324:11951`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=324-11951) | — | 查无此节点 | — | — | 全文件 82,427 节点 0 处 + /nodes NOT FOUND |
| [`324:11952`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=324-11952) | — | 查无此节点 | — | — | 全文件 82,427 节点 0 处 + /nodes NOT FOUND |
| [`644:10040`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=644-10040) | — | 查无此节点 | — | — | 全文件 82,427 节点 0 处 + /nodes NOT FOUND |
| [`644:10066`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=644-10066) | — | 查无此节点 | — | — | 全文件 82,427 节点 0 处 + /nodes NOT FOUND |
| [`644:10131`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=644-10131) | — | 查无此节点 | — | — | 全文件 82,427 节点 0 处 + /nodes NOT FOUND |
| [`1042:20001`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1042-20001) | — | 查无此节点 | — | — | 全文件 82,427 节点 0 处 + /nodes NOT FOUND |
| [`1687:24188`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=1687-24188) | — | 查无此节点 | — | — | 全文件 82,427 节点 0 处 + /nodes NOT FOUND |
| [`4735:28958`](https://www.figma.com/design/JRpDmIIybR17xUVA8s9sK4/?node-id=4735-28958) | — | 查无此节点 | — | — | 全文件 82,427 节点 0 处 + /nodes NOT FOUND |

## 四、统计

| 项 | 数量 |
|---|---|
| 文档/预览中出现的编号（已排除时间、端口等误匹配） | 179 |
| 在 11 个页面树中命中 | 159 |
| 文件级组件定义（`/nodes` 直取） | 9 |
| 无效编号（全文件 0 处 + API NOT FOUND） | 11 |
| 本表列出总数 | 179 |

## 五、使用约定

- **写文档 / 组件元信息时，禁止只写裸编号**：必须同时给出「所在页面 > 位置 > Figma 名称」，编号放在后面作为检索值。例：`整合页面 > 越南版访客预约填报 > 访客预约01（1747:19635）`。
- 组件注册表 `component-registry.md` 的「Figma Node」列、组件预览的「Figma Node」行，均按此口径书写。
- 查不到的编号标「待确认」或「查无此节点」，不推测页面归属。
- 「——废弃——」页里的节点只作历史回溯，不作视觉来源。