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
          <component v-if="page.component" :is="page.component" />
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
      </button>
    </div>

    <div v-if="selectedPage" class="template-overlay" @click.self="selectedPage = null">
      <div class="template-overlay__panel">
        <div class="template-overlay__bar">
          <div><strong>{{ selectedPage.title }}</strong><span v-if="selectedPage.description">{{ selectedPage.description }}</span></div>
          <button type="button" aria-label="关闭预览" @click="selectedPage = null">×</button>
        </div>
        <div v-if="selectedPage.component" class="template-overlay__canvas">
          <component :is="selectedPage.component" :embedded="true" @view-details="open(pages.find(page => page.id === 'appointment-detail'))" />
        </div>
        <div v-else class="template-overlay__empty">该特殊页面使用现有组件组合预览。</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import AppointmentDetailPage from './AppointmentDetailPage.vue'
import AppointmentFormPage from './AppointmentFormPage.vue'
import HomePage from './HomePage.vue'
import SuccessPage from './SuccessPage.vue'
import Button from '../components/figma/Button.vue'
import EmptyState from '../components/figma/EmptyState.vue'
import QRCode from '../components/figma/QRCode.vue'
import RegistrationCard from '../components/figma/RegistrationCard.vue'
import Tag from '../components/figma/Tag.vue'

const registration = { title: '2026/3/23日访问瑞嘉工业园区', status: '审批中', park: '瑞嘉工业园区', host: 'zhansna', number: 'VS20250728001' }
const pages = [
  { id: 'visitor-home', title: '访客预约首页', description: '入口与预约记录', component: HomePage },
  { id: 'appointment-form', title: '新建预约流程', description: '预约信息、访客信息、确认', component: AppointmentFormPage },
  { id: 'appointment-detail', title: '预约详情页', description: '详情、审批记录、出入记录', component: AppointmentDetailPage },
  { id: 'appointment-success', title: '用户端提交成功', description: '提交结果与预约摘要', component: SuccessPage },
  { id: 'visitor-pass', title: '访客端通行证', shortTitle: '访客通行证', status: '待入园', statusType: 'primary', kind: 'pass' },
  { id: 'empty-records', title: '暂无预约记录', shortTitle: '暂无预约记录', status: '空状态', statusType: 'neutral', kind: 'empty' },
  { id: 'security-entry', title: '安保端出入登记', shortTitle: '出入登记', status: '出入登记', statusType: 'neutral', kind: 'entry' },
  { id: 'registration-card', title: '预约登记卡片', shortTitle: '预约登记', status: '审批中', statusType: 'warning', kind: 'detail', description: '二维码占位与登记信息', record: registration }
]
const selectedPage = ref(null)
function open(page) { selectedPage.value = page }
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
.template-thumbnail { height: 240px; overflow: hidden; display: flex; justify-content: center; align-items: flex-start; background: #F7F8FA; }
.template-thumbnail :deep(.page-frame) { width: 375px; min-height: 812px; flex: 0 0 375px; transform: scale(.48); transform-origin: top center; }
.template-placeholder { width: 180px; height: 210px; margin-top: 15px; padding: 24px 16px; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; border-radius: 12px; color: #1D2129; background: #FFFFFF url('../assets/bg-image-2.svg') center top / 100% auto no-repeat; text-align: center; }
.template-placeholder strong { font: 600 18px/24px "PingFang SC", sans-serif; }
.template-placeholder p { margin: 0; color: #86909C; font: 400 12px/18px "PingFang SC", sans-serif; }
.template-card__footer { padding: 10px 12px 0; display: flex; align-items: center; gap: 8px; }
.template-card__footer strong { overflow: hidden; flex: 1; font: 600 14px/22px "PingFang SC", sans-serif; text-overflow: ellipsis; white-space: nowrap; }
.template-card__footer :deep(.figma-tag) { flex: 0 0 auto; }
.template-card__description { margin: 4px 12px 12px; color: #86909C; font: 400 12px/18px "PingFang SC", sans-serif; }
.template-overlay { position: fixed; inset: 0; z-index: 3000; display: flex; align-items: center; justify-content: center; padding: 24px; box-sizing: border-box; background: rgba(29,33,41,.62); }
.template-overlay__panel { width: 375px; max-width: 100%; max-height: calc(100vh - 48px); overflow: hidden; border-radius: 16px; background: #F2F3F5; box-shadow: 0 12px 40px rgba(0,0,0,.22); }
.template-overlay__bar { min-height: 56px; padding: 12px 16px; box-sizing: border-box; display: flex; align-items: center; justify-content: space-between; background: #FFFFFF; }
.template-overlay__bar strong { display: block; color: #1D2129; font: 600 16px/24px "PingFang SC", sans-serif; }
.template-overlay__bar span { display: block; margin-top: 2px; color: #86909C; font: 400 12px/18px "PingFang SC", sans-serif; }
.template-overlay__bar button { width: 32px; height: 32px; border: 0; border-radius: 999px; color: #86909C; background: #F2F3F5; font-size: 22px; }
.template-overlay__canvas { max-height: calc(100vh - 104px); overflow-y: auto; display: flex; justify-content: center; background: #F2F3F5; }
.template-overlay__empty { min-height: 160px; padding: 64px; color: #86909C; text-align: center; }
@media (max-width: 1100px) { .template-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
@media (max-width: 760px) { .template-page { padding: 24px 16px 40px; } .template-grid { grid-template-columns: 1fr; max-width: 375px; } .template-detail { margin-top: 24px; } }
</style>
