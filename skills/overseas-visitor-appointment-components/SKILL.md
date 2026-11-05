---
name: overseas-visitor-appointment-components
display_name: 海外版访客预约 Figma 组件库
description: 将海外版访客预约 Figma 设计组件沉淀为可调用的 Vue3 组件，供后续需求生成前端原型。
version: 0.1.0
author: infproao
---

# 海外版访客预约 Figma 组件库 Skill

## 定位

本 Skill 只沉淀 Figma 设计组件、设计 Token、组件状态和组件预览，不包含业务页面、页面路由或后端代码。

## 输出范围

- Vue3 组件；
- Figma CSS视觉；
- Vant基础行为封装；
- 本地Figma资源；
- 组件注册表；
- 组件独立预览；
- 前端 mock 数据。

不包含：

- 业务页面模板；
- 页面路由；
- 数据库；
- 服务端 API；
- 后端鉴权；
- 真实扫码；
- 真实二维码服务。

## 资料读取顺序

1. `references/component-registry.md`；
2. `references/design-spec-from-figma.md` — **当前规范基准**，第九节「最终规范值」为可落地值；实测范围为同一 Figma 文件的两个页面节点 `1550:3803`「——模板——」与 `1824:42919`「泰国」（24 个业务页面，见第十一节）；
3. `references/figma-derived-spec.md`；
4. `references/components.md`；
5. `references/design-tokens.md` — 早期确认值的历史记录，**冲突处以第 2 项第九节为准**；
6. `references/requirements-input.md`；
7. `references/runtime-conditions.md`；
8. 用户指定的 Figma Node 和截图。

> **2026-11-05 用户裁决「以设计稿中的为准」**：规范数值一律取 Figma 节点实际渲染属性（`fills` / `style` / `cornerRadius` / `effects` / `itemSpacing` / `padding*`），不取画板说明文字标注、外部海信 token 文件或 Vant 默认值。代码侧 `src/theme.css` 的 `--van-*` 变量迁移**尚未执行**，需前端确认后再改。

## 强制规则

- Figma组件是视觉唯一来源；
- Vant只提供行为，不使用默认Vant视觉；
- 每个组件必须绑定Figma Node ID；
- 每个组件必须使用本地资源；
- 禁止用字符或默认图标替代Figma资源；
- 旧版 `visitor-appointment-prototype` 组件不参与本Skill；
- 组件完成独立预览和Figma截图对照后才能标记为 `ready`；
- 需求未确认前不生成页面代码。

## 组件流程

```text
Figma Node
→ 读取结构/变量/状态/资源
→ Vue模板 + CSS实现
→ Vant仅封装行为
→ 组件独立预览
→ Figma截图对照
→ 标记ready
```

## 运行模板

可运行模板位于：

```text
templates/project-starter/
```

模板入口是组件预览，不是业务页面。
