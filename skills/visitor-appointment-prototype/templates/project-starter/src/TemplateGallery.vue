<template>
  <main class="gallery">
    <header class="gallery-header">
      <div>
        <p>Visitor Appointment Skill</p>
        <h1>典型页面模板预览</h1>
      </div>
      <a class="back-link" href="#">返回新建预约</a>
    </header>

    <nav class="template-nav" aria-label="页面模板选择">
      <button
        v-for="template in templates"
        :key="template.key"
        type="button"
        :class="{ active: selectedKey === template.key }"
        @click="selectedKey = template.key"
      >
        {{ template.label }}
      </button>
    </nav>

    <section class="preview-frame">
      <component :is="selectedTemplate.component" v-bind="selectedTemplate.props" />
    </section>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import AppointmentForm from './App.vue'
import VisitorHome from './pages/VisitorHome.vue'
import AppointmentRecords from './pages/AppointmentRecords.vue'
import AppointmentRecordsEmpty from './pages/AppointmentRecordsEmpty.vue'
import VisitorPass from './pages/VisitorPass.vue'
import AppointmentDetail from './pages/AppointmentDetail.vue'
import SecurityRegistration from './pages/SecurityRegistration.vue'
import SecurityScan from './pages/SecurityScan.vue'
import SecurityDetail from './pages/SecurityDetail.vue'
import EntryOperation from './pages/EntryOperation.vue'
import AccompanyingPersonPicker from './pages/AccompanyingPersonPicker.vue'
import GateControl from './pages/GateControl.vue'
import FilterPopup from './pages/FilterPopup.vue'

const selectedKey = ref('appointment-form')
const templates = [
  { key: 'appointment-form', label: '新建预约', component: AppointmentForm, props: {} },
  { key: 'visitor-home', label: '访客首页', component: VisitorHome, props: {} },
  { key: 'records', label: '预约记录', component: AppointmentRecords, props: { records: [{ id: 'VS20250728001', title: '访问瑞嘉工业园区', visitDate: '2026-07-11', visitorName: 'Qian Junze', status: '待确认' }] } },
  { key: 'records-empty', label: '记录空状态', component: AppointmentRecordsEmpty, props: { title: '暂无预约记录', actionText: '新建预约' } },
  { key: 'pass', label: '通行证', component: VisitorPass, props: { passNumber: 'VS20250728001' } },
  { key: 'detail', label: '预约详情', component: AppointmentDetail, props: { appointment: { status: '待确认', timeline: [] }, sections: [] } },
  { key: 'security-list', label: '安保登记', component: SecurityRegistration, props: { records: [] } },
  { key: 'scan', label: '扫一扫', component: SecurityScan, props: {} },
  { key: 'security-detail', label: '安保详情', component: SecurityDetail, props: { record: {} } },
  { key: 'entry', label: '入境操作', component: EntryOperation, props: { members: [{ id: '1', name: 'Qian Junze' }, { id: '2', name: '张三' }] } },
  { key: 'member-picker', label: '选择随入人员', component: AccompanyingPersonPicker, props: { members: [{ id: '1', name: 'Qian Junze' }, { id: '2', name: '张三' }] } },
  { key: 'gate', label: '门禁控制', component: GateControl, props: { gateName: '东门', allowed: true } },
  { key: 'filter', label: '筛选弹层', component: FilterPopup, props: { show: true, groups: [{ key: 'status', label: '状态', options: ['待确认', '已通过', '已退回'] }] } }
]
const selectedTemplate = computed(() => templates.find(template => template.key === selectedKey.value) || templates[0])
</script>

<style scoped>
.gallery {
  min-height: 100vh;
  padding: 24px;
  box-sizing: border-box;
  color: #1D2129;
  background: #F2F3F5;
}

.gallery-header {
  max-width: 960px;
  margin: 0 auto 20px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.gallery-header p { margin: 0 0 4px; color: #86909C; font-size: 12px; }
.gallery-header h1 { margin: 0; font-size: 24px; line-height: 32px; }
.back-link { color: #00AAA6; font-size: 14px; text-decoration: none; }

.template-nav {
  max-width: 960px;
  margin: 0 auto 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.template-nav button {
  min-height: 36px;
  padding: 0 14px;
  border: 1px solid #E5E6EB;
  border-radius: 18px;
  color: #4E5969;
  background: #FFFFFF;
  font-size: 14px;
  cursor: pointer;
}

.template-nav button.active {
  border-color: #00AAA6;
  color: #FFFFFF;
  background: #00AAA6;
}

.preview-frame {
  width: min(960px, 100%);
  min-height: 812px;
  margin: 0 auto;
  overflow: hidden;
  border: 1px solid #E5E6EB;
  border-radius: 16px;
  background: #F2F3F5;
  box-shadow: 0 8px 24px rgba(29, 33, 41, 0.08);
}

.preview-frame :deep(.page-shell),
.preview-frame :deep(.scan-page) {
  min-height: 812px;
  max-width: 375px;
  margin: 0 auto;
}

@media (max-width: 600px) {
  .gallery { padding: 16px; }
  .gallery-header { display: block; }
  .back-link { display: inline-block; margin-top: 8px; }
}
</style>
