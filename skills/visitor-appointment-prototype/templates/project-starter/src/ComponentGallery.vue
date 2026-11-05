<template>
  <main class="component-gallery">
    <header class="gallery-header">
      <div>
        <p>Figma Component Library</p>
        <h1>已实现组件预览</h1>
      </div>
      <a href="#templates">页面模板</a>
    </header>

    <section class="component-grid">
      <article class="component-card component-card--wide">
        <h2>Steps</h2>
        <HisenseSteps :items="steps" :active="1" />
      </article>

      <article class="component-card">
        <h2>Button</h2>
        <div class="button-stack"><HisenseButton label="主按钮" /><HisenseButton label="次按钮" variant="secondary" /><HisenseButton label="禁用按钮" disabled /></div>
      </article>

      <article class="component-card">
        <h2>Field</h2>
        <HisenseField label="来访日期" placeholder="请输入" required link readonly />
        <HisenseField label="来访公司" model-value="Qian Junze" required />
        <HisenseField label="错误示例" placeholder="请输入" required error="请输入字段内容" />
      </article>

      <article class="component-card">
        <h2>Checkbox</h2>
        <div class="checkbox-stack"><HisenseCheckbox v-model="checked">我已阅读《访客须知》</HisenseCheckbox><HisenseCheckbox v-model="checked2">我已同意隐私政策</HisenseCheckbox></div>
      </article>

      <article class="component-card">
        <h2>User Card</h2>
        <HisenseUserCard name="Qian Junze" status="待授权" editable @edit="toast('编辑同行人')" @remove="toast('删除同行人')" />
      </article>

      <article class="component-card">
        <h2>Vehicle Card</h2>
        <HisenseVehicleCard plate="39A-12345" @edit="toast('编辑车辆')" @remove="toast('删除车辆')" />
      </article>

      <article class="component-card">
        <h2>Confirmation Card</h2>
        <HisenseConfirmationCard title="预约信息" :items="confirmationItems" />
      </article>

      <article class="component-card">
        <h2>Uploader</h2>
        <HisenseUploader label="本人照片上传" required hint="支持拍照或相册上传" />
      </article>

      <article class="component-card">
        <h2>QR Placeholder</h2>
        <HisenseQRCode caption="二维码占位" />
      </article>

      <article class="component-card component-card--wide">
        <h2>Approval Timeline</h2>
        <HisenseApprovalTimeline :items="timeline" />
      </article>

      <article class="component-card component-card--wide">
        <h2>Member Picker</h2>
        <HisenseMemberPicker v-model="selectedMembers" :members="members" :multiple="false" />
      </article>

      <article class="component-card component-card--wide">
        <h2>Scan Frame</h2>
        <HisenseScanFrame status="scanning" />
      </article>
    </section>

    <div class="component-actions">
      <HisenseButton label="打开日期选择" @click="showDatePicker = true" />
      <HisenseButton label="打开选择弹窗" variant="secondary" @click="showSelectPopup = true" />
      <HisenseButton label="打开语言弹窗" variant="secondary" @click="showLanguage = true" />
    </div>

    <HisenseDatePicker v-model:show="showDatePicker" />
    <HisenseSelectPopup v-model:show="showSelectPopup" title="选择来访类型" :columns="['商务拜访', '学术访问', '英语']" />
    <HisenseLanguagePopup v-model:show="showLanguage" :languages="languages" model-value="CN" />
  </main>
</template>

<script setup>
import { ref } from 'vue'
import HisenseSteps from './components/HisenseSteps.vue'
import HisenseButton from './components/HisenseButton.vue'
import HisenseField from './components/HisenseField.vue'
import HisenseCheckbox from './components/HisenseCheckbox.vue'
import HisenseUserCard from './components/HisenseUserCard.vue'
import HisenseVehicleCard from './components/HisenseVehicleCard.vue'
import HisenseConfirmationCard from './components/HisenseConfirmationCard.vue'
import HisenseUploader from './components/HisenseUploader.vue'
import HisenseQRCode from './components/HisenseQRCode.vue'
import HisenseApprovalTimeline from './components/HisenseApprovalTimeline.vue'
import HisenseMemberPicker from './components/HisenseMemberPicker.vue'
import HisenseScanFrame from './components/HisenseScanFrame.vue'
import HisenseDatePicker from './components/HisenseDatePicker.vue'
import HisenseSelectPopup from './components/HisenseSelectPopup.vue'
import HisenseLanguagePopup from './components/HisenseLanguagePopup.vue'

const steps = ['预约信息', '访客信息', '信息确认']
const checked = ref(true)
const checked2 = ref(false)
const showDatePicker = ref(false)
const showSelectPopup = ref(false)
const showLanguage = ref(false)
const selectedMembers = ref([])
const languages = [{ code: 'CN', label: '中文' }, { code: 'EN', label: '英语' }, { code: 'TH', label: '泰语' }, { code: 'VN', label: '越南语' }]
const members = [{ id: '1', name: 'Qian Junze', subtitle: '接访人' }, { id: '2', name: '张三', subtitle: '同行人' }]
const confirmationItems = [{ label: '拜访园区', value: '锐世（越南）Regza 工业园' }, { label: '来访公司', value: 'Qian Junze' }, { label: '来访类型', value: '商务拜访' }]
const timeline = [{ id: 1, title: '直属领导审批', status: 'done', time: '2026-08-01 09:21', description: '审批通过' }, { id: 2, title: '一级审批人', status: 'current', time: '待处理', description: '等待审批' }]
function toast(message) { window.alert(message) }
</script>

<style scoped>
.component-gallery { min-height: 100vh; padding: 24px; box-sizing: border-box; color: #1D2129; background: #F2F3F5; }
.gallery-header { max-width: 960px; margin: 0 auto 20px; display: flex; align-items: flex-start; justify-content: space-between; }
.gallery-header p { margin: 0 0 4px; color: #86909C; font-size: 12px; }
.gallery-header h1 { margin: 0; font-size: 24px; line-height: 32px; }
.gallery-header a { color: #00AAA6; font-size: 14px; text-decoration: none; }
.component-grid { max-width: 960px; margin: 0 auto; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.component-card { min-width: 0; padding: 16px; border-radius: 12px; background: #FFFFFF; overflow: hidden; }
.component-card--wide { grid-column: 1 / -1; }
.component-card h2 { margin: 0 0 12px; font-size: 16px; line-height: 24px; }
.button-stack, .checkbox-stack { display: grid; gap: 8px; }
.component-actions { max-width: 960px; margin: 20px auto 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
@media (max-width: 700px) { .component-gallery { padding: 16px; } .component-grid, .component-actions { grid-template-columns: 1fr; } .component-card--wide { grid-column: auto; } }
</style>
