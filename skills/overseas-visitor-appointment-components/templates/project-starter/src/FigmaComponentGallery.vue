<template>
  <main class="figma-gallery">
    <header class="gallery-header">
      <div><p>Figma Component Library</p><h1>Figma 组件库预览</h1></div>
      <a href="#components">旧组件预览</a>
    </header>

    <section class="grid">
      <article class="card wide"><h2>Figma Steps</h2><div class="step-wrap"><FigmaSteps :items="steps" :active="1" /></div></article>
      <article class="card"><h2>Figma Button</h2><div class="stack"><FigmaButton label="主按钮"/><FigmaButton label="次按钮" variant="secondary"/><FigmaButton label="禁用按钮" disabled/></div></article>
      <article class="card"><h2>Figma Field</h2><FigmaField label="来访日期" placeholder="请输入" required readonly link/><FigmaField label="手机号" prefix="+84" placeholder="请输入" required/></article>
      <article class="card"><h2>Figma Checkbox</h2><div class="checkbox-stack"><FigmaCheckbox v-model="checked">已选</FigmaCheckbox><FigmaCheckbox>未选</FigmaCheckbox></div></article>
      <article class="card"><h2>Figma Tag</h2><div class="tag-row"><FigmaTag label="已通过" status="success"/><FigmaTag label="待确认" status="warning"/><FigmaTag label="已退回" status="danger"/><FigmaTag label="已过期" status="neutral"/></div></article>
      <article class="card"><h2>Figma Tabs</h2><FigmaTabs :items="['审批内容','审批记录']"/></article>
      <article class="card"><h2>Figma User Card</h2><FigmaUserCard name="何引琪"/></article>
      <article class="card"><h2>Figma Vehicle Card</h2><FigmaVehicleCard plate="39A-12345"/></article>
      <article class="card"><h2>Figma Uploader</h2><FigmaUploader label="本人照片上传" required hint="支持拍照或相册上传"/></article>
      <article class="card"><h2>Figma Empty State</h2><FigmaEmptyState title="暂无预约记录"/></article>
      <article class="card"><h2>Figma QR Placeholder</h2><FigmaQRCode caption="二维码占位"/></article>
      <article class="card wide"><h2>Figma Member Picker</h2><FigmaMemberPicker v-model="selected" :members="members" :multiple="true"/></article>
      <article class="card wide"><h2>Figma Member Selection Flow</h2><FigmaMemberSelectionFlow v-model="selected" :members="members" /></article>
      <article class="card wide"><h2>Figma Flow Record Card</h2><FigmaFlowRecordCard :items="flowItems" :people="people" /></article>
      <article class="card wide"><h2>Figma Registration Card</h2><FigmaRegistrationCard :record="registration" /></article>
      <article class="card wide"><h2>Figma Approval Timeline</h2><FigmaApprovalTimeline :items="flowItems" /></article>
    </section>

    <div class="actions"><FigmaButton label="日期选择弹窗" @click="showDate = true"/><FigmaButton label="列表选择弹窗" variant="secondary" @click="showSelect = true"/><FigmaButton label="语言弹窗" variant="secondary" @click="showLanguage = true"/><FigmaButton label="通用底部弹窗" variant="secondary" @click="showPopup = true"/></div>
    <FigmaDatePicker v-model:show="showDate"/>
    <van-popup v-model:show="showSelect" position="bottom" round><FigmaSelectList :options="selectOptions" model-value="学术访问"/></van-popup>
    <FigmaLanguagePopup v-model:show="showLanguage" :languages="languages" model-value="CN"/>
    <FigmaPopup v-model:show="showPopup" title="添加同行人"><FigmaField label="姓名" placeholder="请输入"/><div class="popup-buttons"><FigmaButton variant="secondary">保存并继续</FigmaButton><FigmaButton>保存</FigmaButton></div></FigmaPopup>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import FigmaSteps from './components/figma/FigmaSteps.vue'
import FigmaButton from './components/figma/FigmaButton.vue'
import FigmaField from './components/figma/FigmaField.vue'
import FigmaCheckbox from './components/figma/FigmaCheckbox.vue'
import FigmaTabs from './components/figma/FigmaTabs.vue'
import FigmaTag from './components/figma/FigmaTag.vue'
import FigmaUserCard from './components/figma/FigmaUserCard.vue'
import FigmaVehicleCard from './components/figma/FigmaVehicleCard.vue'
import FigmaMemberPicker from './components/figma/FigmaMemberPicker.vue'
import FigmaApprovalTimeline from './components/figma/FigmaApprovalTimeline.vue'
import FigmaFlowRecordCard from './components/figma/FigmaFlowRecordCard.vue'
import FigmaRegistrationCard from './components/figma/FigmaRegistrationCard.vue'
import FigmaMemberSelectionFlow from './components/figma/FigmaMemberSelectionFlow.vue'
import FigmaUploader from './components/figma/FigmaUploader.vue'
import FigmaEmptyState from './components/figma/FigmaEmptyState.vue'
import FigmaQRCode from './components/figma/FigmaQRCode.vue'
import FigmaLanguagePopup from './components/figma/FigmaLanguagePopup.vue'
import FigmaPopup from './components/figma/FigmaPopup.vue'
import FigmaDatePicker from './components/figma/FigmaDatePicker.vue'
import FigmaSelectList from './components/figma/FigmaSelectList.vue'

const steps = ['预约信息', '访客信息', '信息确认']
const checked = ref(true)
const showDate = ref(false)
const showSelect = ref(false)
const showLanguage = ref(false)
const showPopup = ref(false)
const selected = ref(['1'])
const members = [{ id: '1', name: '张益达' }, { id: '2', name: '何引琪' }, { id: '3', name: '张三' }]
const languages = [{ code: 'CN', label: '中文' }, { code: 'EN', label: '英语' }, { code: 'TH', label: '泰语' }, { code: 'VN', label: '越南语' }]
const selectOptions = ['商务', '学术访问', '英语']
const flowItems = [{ id: 1, time: '2026-08-01 09:21', operator: '李彤运', tag: '入园（5）', status: 'done', description: '访客寄存物品：2 个打火机，1 部手机。', people: '郭星睿，战益达，陈三，战硕硕', more: false }, { id: 2, time: '2026-08-01 19:21', operator: '李彤运', tag: '出园（10）', status: 'waiting', people: '郭星睿，战益达，陈三，战硕硕，张益达，战益达，陈三...', more: true }]
const people = [{ id: 'p1', name: '何枢' }, { id: 'p2', name: '王哇山' }, { id: 'p3', name: '李卓豫' }, { id: 'p4', name: '周家福' }, { id: 'p5', name: '郑文鉴' }, { id: 'p6', name: '何引琪' }, { id: 'p7', name: '周伟林' }]
const registration = { title: '2026/3/23日访问瑞嘉工业园区', status: '审批中', park: '瑞嘉工业园区', host: 'zhansna', number: 'VS20250728001' }
</script>

<style scoped>
.figma-gallery{min-height:100vh;padding:24px;box-sizing:border-box;color:#1D2129;background:#F2F3F5}.gallery-header{max-width:960px;margin:0 auto 20px;display:flex;justify-content:space-between}.gallery-header p{margin:0 0 4px;color:#86909C;font-size:12px}.gallery-header h1{margin:0;font-size:24px;line-height:32px}.gallery-header a{color:#00AAA6;font-size:14px;text-decoration:none}.grid{max-width:960px;margin:auto;display:grid;grid-template-columns:1fr;gap:16px}.card{width:100%;min-width:0;padding:16px;border-radius:12px;background:#fff;overflow:hidden}.wide{grid-column:auto}.card h2{margin:0 0 12px;font-size:16px;line-height:24px}.step-wrap{display:flex;justify-content:center;padding:12px;background:#fff;border-radius:12px}.stack{display:grid;gap:8px}.tag-row{display:flex;flex-wrap:wrap;gap:8px}.popup-buttons{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:20px}.actions{max-width:960px;margin:20px auto 0;display:grid;grid-template-columns:1fr 1fr;gap:12px}@media(max-width:700px){.figma-gallery{padding:16px}.grid,.actions{grid-template-columns:1fr}.wide{grid-column:auto}}
</style>
