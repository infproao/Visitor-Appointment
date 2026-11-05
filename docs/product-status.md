# 产品现状

## 产品

- 产品名称：海外版访客预约
- 产品形态：移动端 H5
- 原型目标：独立运行、模拟数据、用于评审
- 当前来源仓库：[infproao/Visitor-Appointment](https://github.com/infproao/Visitor-Appointment)

## 设计资料

- Figma 文件：海外版访客预约
- Figma 文件 Key：`JRpDmIIybR17xUVA8s9sK4`
- 主要移动端画板基准：375px
- Figma 入口节点：`1035:2853`
- 已反推规格：`skills/visitor-appointment-prototype/references/figma-derived-spec.md`

## 已确认技术

- Vue 3
- Vant 4
- Vite
- JavaScript
- Vue Router 4
- vue-i18n
- 本地模拟数据
- 二维码统一使用占位图
- 首版扫码使用模拟状态，不调用真实摄像头

## 当前缺口

- 原始 `bg-image-2` 文件需要正式入库；
- 日期弹层需继续以已确认的参考图维护；
- 首版典型页面需要逐页验证；
- 加载、网络失败、相机权限等状态还需要设计输入；
- 国家字段、文案和校验规则通过每次需求输入提供。
