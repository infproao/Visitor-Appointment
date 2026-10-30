# 访客预约原型 · 可运行工程模板

基于 **Vue3 + Vant 4 + Vite** 的访客预约 H5 原型 starter，已套好海信设计 token 主题。

## 一键拉取（degit）

```bash
npx degit infproao/Visitor-Appointment/skills/visitor-appointment-prototype/templates/project-starter my-app
cd my-app
npm install
npm run dev
```

## 已内置的设计规范

| 类别 | 值 |
|---|---|
| 主色 | `#22BBB3`（海信 primary-5） |
| 灰阶 | 海信「中性灰」gray-1..10 |
| 状态色 | 成功 `#23C343` / 警示 `#FF7D00` / 错误 `#F53F3F` |
| 字号 | 12/14/16/18/20/24 |
| 圆角 | 12/16/20(Popup)/24 |
| 按钮 | 大 48 / 中 44 / 小 32 |
| 标签 | 24 / 28 / 32 |
| 间距 | Vant 默认 4/8/12/16/24/32 |
| 输入框 | 311×76（Hug） |

主题覆盖在 `src/theme.css`，示例页在 `src/App.vue`（新建预约表单 + 按钮三档 + 状态标签）。

## 结构

```
src/
├── main.js      ← 入口，引入 Vant 组件
├── theme.css    ← 海信 token → --van-* 变量覆盖
└── App.vue      ← 示例页
```
