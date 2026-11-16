<template>
  <section class="template-page">
    <header class="template-intro">
      <h1>页面模板</h1>
      <p>基于 Figma 移动端设计稿沉淀的页面模板，使用现有组件和模拟数据呈现。</p>
      <div class="template-list-title"><strong>列表页</strong><span>{{ pages.length }}</span><small>数据的浏览、检索与批量操作入口</small></div>
    </header>

    <div class="template-grid">
      <button v-for="page in pages" :key="page.id" class="template-card" type="button" @click="open(page)">
        <div class="template-thumbnail">
          <span v-if="page.isNew" class="template-card__new">NEW</span>
          <component v-if="page.component" :is="page.component" :kind="page.viewKind" :title="page.title" :stage="page.stage" />
          <div v-else class="template-placeholder" :class="`template-placeholder--${page.kind}`">
            <Tag :label="page.status || '页面'" :status="page.statusType || 'neutral'" />
            <strong>{{ page.shortTitle }}</strong>
            <p>{{ page.description || '特殊页面模板' }}</p>
          </div>
        </div>
        <div class="template-card__footer">
          <strong>{{ page.title }}</strong>
          <Tag label="stable" status="success" />
        </div>
        <p v-if="page.description" class="template-card__description">{{ page.description }}</p>
        <p v-if="page.at" class="template-card__at">{{ page.at }}</p>
      </button>
    </div>

    <div v-if="selectedPage" class="template-overlay" @click.self="selectedPage = null">
      <button class="template-overlay__back" type="button" aria-label="返回页面模板" @click="selectedPage = null">‹</button>
      <!-- 2026-11-10：加上 figma-phone，让模板页里由组件库组件打开的弹层/遮罩收进这块 375 手机画布，
           与组件库画布口径一致，不会相对桌面视口居中而右移 -->
      <div class="template-overlay__phone figma-phone">
        <div class="template-overlay__bar">375 × 812 · 1:1</div>
        <div v-if="selectedPage.component" class="template-overlay__scroll">
          <component :is="selectedPage.component" :kind="selectedPage.viewKind" :title="selectedPage.title" :stage="selectedPage.stage" :embedded="true" @back="selectedPage = null" @navigate="openById" @submitted="openById('appointment-success')" @view-details="openById('appointment-detail')" />
        </div>
        <div v-else class="template-overlay__empty">该特殊页面使用现有组件组合预览。</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { shallowRef } from 'vue'
import AppointmentDetailPage from './AppointmentDetailPage.vue'
import AppointmentFormPage from './AppointmentFormPage.vue'
import AppointmentRecordPage from './AppointmentRecordPage.vue'
import HomePage from './HomePage.vue'
import SecurityDetailPage from './SecurityDetailPage.vue'
import SpecialPageView from './SpecialPageView.vue'
import SuccessPage from './SuccessPage.vue'
import Button from '../components/figma/Button.vue'
import EmptyState from '../components/figma/EmptyState.vue'
import QRCode from '../components/figma/QRCode.vue'
import Tag from '../components/figma/Tag.vue'

const pages = [
  { id: 'visitor-home', title: '访客预约首页', description: '渐变青 header、欢迎卡与须知横幅', component: HomePage, at: '整合页面 > 越南版访客预约填报' },
  { id: 'appointment-form', title: '新建预约流程', description: '预约信息、访客信息、确认', component: AppointmentFormPage, at: '——模板—— > 模板页 > 填报页' },
  { id: 'appointment-detail', title: '预约详情页', description: '详情、审批记录、出入记录', component: AppointmentDetailPage, at: '——模板—— > 模板页 > 预约详情' },
  { id: 'appointment-success', title: '提交成功 · 分享给同行人', description: '白卡内：绿勾、二维码、保存到相册、预约信息、返回首页/查看详情', component: SpecialPageView, viewKind: 'share-success', at: '——模板—— > 模板页 > 提交成功页（1553:22119）' },
  { id: 'appointment-success-simple', title: '提交成功 · 简版', description: '绿勾 + 预约信息灰块 + 访客须知，无二维码', component: SuccessPage, at: '整合页面 > 泰国 > 提交成功（1822:39622）' },
  { id: 'visitor-pass', title: '访客端通行证', shortTitle: '访客通行证', status: '待入园', statusType: 'primary', kind: 'pass', component: SpecialPageView, viewKind: 'pass', description: '底部弹层：有效期、二维码与编号', at: '整合页面 > 泰国' },
  { id: 'empty-records', title: '暂无通行凭证', shortTitle: '暂无凭证', status: '空状态', statusType: 'neutral', kind: 'empty', component: SpecialPageView, viewKind: 'empty-pass', description: '空状态插画与预约记录入口' },
  { id: 'security-entry', title: '安保端出入登记', shortTitle: '出入登记', status: '出入登记', statusType: 'neutral', kind: 'entry', isNew: true, component: SpecialPageView, viewKind: 'security-entry', description: 'Cascader 园区/门 + Dropdown 部门 + Search 扫码搜索（模糊过滤）+ 预约记录卡结果列表，三个筛选都可交互', at: '安保端 > 访客出入登记（原整页切图已改为组件拼装）' },
  { id: 'approval', title: '审批页 · 来访历史', shortTitle: '审批页', status: '审批中', statusType: 'primary', kind: 'approval', isNew: true, component: SpecialPageView, viewKind: 'approval', description: '访客信息与用户详情页一致 + 动作栏（驳回 / 通过）+「近一年来访 2 次」打开来访历史记录弹层', at: '审批页 337:10824 > 来访历史记录（用户 2026-11-13 截图）' },
  { id: 'security-detail', title: '安保端详情', description: '页头「详情」+ 预约摘要 + 基础信息 / 审批记录 / 出入记录三页签', component: SecurityDetailPage, at: '安保端 > 详情（1042:17750）' },
  { id: 'companions', title: '泰国同行人', shortTitle: '同行人', status: '同行人', statusType: 'primary', kind: 'companions', component: SpecialPageView, viewKind: 'companions', description: '邀请卡、表单与条款确认' },
  { id: 'companions-expired', title: '同行人 · 链接已过期', shortTitle: '链接已过期', status: '已失效', statusType: 'neutral', kind: 'companions', isNew: true, component: SpecialPageView, viewKind: 'link-expired', description: '邀请文案 + 地址 + 失效空态 + 主色「新建预约」；复用 EmptyState / Button', at: '同行人 > 链接已过期（用户 2026-11-13 截图）' },
  // 用户 2026-11-15「入园操作选择人员下一步是信息确认，不是两个分开的页面」：
  // 原来拆成「入园操作 · 选择人员」「入园操作 · 信息确认」两张卡，看起来像两个独立页面；
  // 合并成一张卡，点开就是同一条两步流程（选择人员 → 下一步 → 信息确认），标题跟着步骤切换。
  { id: 'entry', title: '入园操作（选择人员 → 信息确认）', shortTitle: '入园操作', status: '入园操作', statusType: 'primary', kind: 'entry', isNew: true, component: SpecialPageView, viewKind: 'entry', stage: 'select', description: '底部弹层两步流程：Search + 人员状态 Tag + Checkbox 复选 → 下一步进入信息确认（访客信息折叠区 / 上传 / 检查项 / 备注），第一步勾选的人员回显到第二步', at: '安保端 > 入园操作（用户 2026-11-13 截图）' },
  { id: 'record-page', title: '预约记录页', description: '页头「预约记录」+ 最近 14 天提示条 + 多条预约记录，记录卡复用 AppointmentRecordCard', component: AppointmentRecordPage, at: '用户端 > 预约记录（1083:24323）' }
]
// shallowRef：页面描述里带 component 组件对象，避免被深度响应式包装触发 Vue 性能警告
const selectedPage = shallowRef(null)
function open(page) { selectedPage.value = page }
function openById(id) { selectedPage.value = pages.find(page => page.id === id) || selectedPage.value }
</script>

<style scoped>
.template-page { width: 100%; min-height: 100%; padding: 32px 40px 48px; box-sizing: border-box; background: #FFFFFF; }
.template-intro { max-width: 960px; margin: 0 auto 24px; }
.template-intro h1 { margin: 0; color: #1D2129; font: 600 28px/36px "PingFang SC", sans-serif; }
.template-intro p { margin: 8px 0 20px; color: #86909C; font: 400 14px/22px "PingFang SC", sans-serif; }
.template-list-title { padding: 12px 0; display: flex; align-items: baseline; gap: 8px; border-bottom: 1px solid #E5E6EB; color: #1D2129; }
.template-list-title strong { font: 600 16px/24px "PingFang SC", sans-serif; }
.template-list-title span { color: #86909C; font: 400 14px/22px "PingFang SC", sans-serif; }
.template-list-title small { color: #86909C; font: 400 12px/18px "PingFang SC", sans-serif; }
.template-grid { max-width: 960px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
.template-card { min-width: 0; padding: 0; overflow: hidden; border: 1px solid #E5E6EB; border-radius: 12px; color: #1D2129; background: #FFFFFF; text-align: left; box-shadow: 0 2px 8px rgba(29,33,41,.05); cursor: pointer; }
.template-card:hover { border-color: #22BBB3; box-shadow: 0 4px 14px rgba(29,33,41,.10); }
/* 缩略图只做视觉预览，不接收点击：交互统一在下方 overlay 的真实页面里进行，
   也避免缩略图里的组件弹层挂到错误的手机画布上。点击仍由外层 template-card 按钮接收。 */
.template-thumbnail { position: relative; height: 240px; overflow: hidden; display: flex; justify-content: center; align-items: flex-start; background: #F7F8FA; pointer-events: none; }
.template-thumbnail :deep(.page-frame), .template-thumbnail :deep(.home-view), .template-thumbnail :deep(.special-view), .template-thumbnail :deep(.success-page), .template-thumbnail :deep(.record-page), .template-thumbnail :deep(.security-detail) { width: 375px; min-height: 812px; flex: 0 0 375px; transform: scale(.48); transform-origin: top center; }
/* NEW 标（用户 2026-11-13）：最近新增 / 更新的页面在缩略图右上角打标，方便快速识别哪些是新的。
   用户 2026-11-15「new标签用红色」：从品牌青 #22BBB3 改为工程内红色语义值 #F76560（与「未通过 / 已拒绝」同色）。 */
.template-card__new { position: absolute; top: 8px; right: 8px; z-index: 1; padding: 2px 8px; border-radius: 999px; color: #FFFFFF; background: #F76560; font: 600 12px/16px "PingFang SC", sans-serif; }
/* 入园操作两卡缩略图修复（用户 2026-11-13「这俩样式也太离谱了」）：真实页是 812px 深色底 + 弹层贴底，
   缩略图按 scale(.48) 只显示顶部 500px 布局区 → 两张卡几乎全是深色块。
   缩略图里把画布压到 500（375×500×.48 正好铺满 240 高缩略图）、弹层限高同步收窄，
   「深色头 + 弹层（含标题 + 内容 + 动作栏）」完整落进缩略图；真实页面与 overlay 预览不受影响。 */
.template-thumbnail :deep(.special-view--entry) { min-height: 500px; }
.template-thumbnail :deep(.special-view--entry .entry-page) { min-height: 500px; }
.template-thumbnail :deep(.special-view--entry .entry-sheet) { max-height: calc(500px - 40px); }
.template-placeholder { width: 180px; height: 210px; margin-top: 15px; padding: 24px 16px; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; border-radius: 12px; color: #1D2129; background: #FFFFFF url('../assets/bg-image-2.svg') center top / 100% auto no-repeat; text-align: center; }
.template-placeholder strong { font: 600 18px/24px "PingFang SC", sans-serif; }
.template-placeholder p { margin: 0; color: #86909C; font: 400 12px/18px "PingFang SC", sans-serif; }
.template-card__footer { padding: 10px 12px 0; display: flex; align-items: center; gap: 8px; }
/* bounded-data: 卡片标题是固定的模板名（有界数据，非可变 i18n 文案），允许单行省略；可变文案一律换行（design-principles.md 第六节） */
.template-card__footer strong { overflow: hidden; flex: 1; font: 600 14px/22px "PingFang SC", sans-serif; text-overflow: ellipsis; white-space: nowrap; }
.template-card__footer :deep(.figma-tag) { flex: 0 0 auto; }
.template-card__description { margin: 4px 12px 12px; color: #86909C; font: 400 12px/18px "PingFang SC", sans-serif; }
.template-card__at { margin: 0 12px 10px; padding-top: 8px; border-top: 1px solid #F2F3F5; color: #00AAA6; font: 500 11px/16px "PingFang SC", sans-serif; }
.template-overlay { position: fixed; inset: 0; z-index: 3000; display: flex; align-items: center; justify-content: center; padding: 16px; box-sizing: border-box; background: #F2F3F5; }
.template-overlay__back { position: fixed; top: 16px; left: 16px; z-index: 1; width: 40px; height: 40px; border: 0; border-radius: 999px; color: #1D2129; background: #FFFFFF; font: 400 30px/32px "PingFang SC", sans-serif; box-shadow: 0 2px 8px rgba(29,33,41,.12); }
.template-overlay__phone { position: relative; width: 375px; height: min(812px, calc(100vh - 32px)); overflow: hidden; border-radius: 20px; background: #FFFFFF; box-shadow: 0 8px 32px rgba(29,33,41,.16); }
.template-overlay__bar { height: 28px; display: flex; align-items: center; justify-content: center; color: #C9CDD4; background: #F7F8FA; font: 500 11px/28px ui-monospace, SFMono-Regular, Menlo, monospace; }
.template-overlay__scroll { height: calc(100% - 28px); overflow-y: auto; scrollbar-width: none; }
.template-overlay__scroll::-webkit-scrollbar { width: 0; height: 0; }
.template-overlay__empty { min-height: 200px; padding: 64px; color: #86909C; text-align: center; }
@media (max-width: 1100px) { .template-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
@media (max-width: 760px) { .template-page { padding: 24px 16px 40px; } .template-grid { grid-template-columns: 1fr; max-width: 375px; } .template-detail { margin-top: 24px; } }
</style>
