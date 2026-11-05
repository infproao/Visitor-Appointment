<template>
  <main class="prototype-page">
    <section class="hero" aria-label="访客预约顶部区域">
      <div class="page-box">
        <header class="page-header">
          <h1>访客预约</h1>
          <button class="language-button" type="button" @click="showLanguage = true">
            {{ currentLanguage.code }}
            <van-icon name="arrow-down" />
          </button>
        </header>

        <nav class="steps-card" aria-label="预约步骤">
          <button
            v-for="(step, index) in steps"
            :key="step"
            class="step-item"
            :class="{ active: activeStep === index, completed: index < activeStep }"
            type="button"
            @click="activeStep = index"
          >
            <span class="step-track step-track-left" v-if="index > 0" />
            <span class="step-dot">{{ index < activeStep ? '✓' : '' }}</span>
            <span class="step-track step-track-right" v-if="index < steps.length - 1" />
            <span class="step-label">{{ step }}</span>
          </button>
        </nav>

        <template v-if="activeStep === 0">
          <section class="park-card">
            <button class="park-button" type="button" @click="openPicker('park')">
              <span class="field-title"><i>*</i> 拜访园区</span>
              <span class="park-value">{{ form.park || '请选择园区' }}</span>
              <span class="park-address">{{ form.parkAddress || '请选择园区后显示地址' }}</span>
              <van-icon name="arrow" class="field-arrow" />
            </button>
            <p v-if="errors.park" class="field-error">{{ errors.park }}</p>
          </section>

          <section class="form-card">
            <h2>预约信息</h2>
            <div class="fields">
              <HisenseField
                label="来访日期"
                placeholder="请输入"
                required
                v-model="form.visitDate"
                :error="errors.visitDate"
                readonly
                link
                @click="showDatePicker = true"
              />
              <HisenseField
                label="来访公司"
                placeholder="请输入"
                required
                v-model="form.company"
                :error="errors.company"
              />
              <HisenseField
                label="来访类型"
                placeholder="请输入"
                required
                v-model="form.visitType"
                :error="errors.visitType"
                readonly
                link
                @click="openPicker('visitType')"
              />
              <HisenseField
                label="来访事由描述"
                placeholder="请输入"
                required
                textarea
                v-model="form.reasonDescription"
                :error="errors.reasonDescription"
              />
            </div>
            <div class="section-divider"><span />接访信息<span /></div>
            <HisenseField
              label="接访人手机号"
              placeholder="请输入"
              required
              :prefix="phoneCode"
              v-model="form.hostPhone"
              :error="errors.hostPhone"
              @prefix-click="openPicker('phoneCode')"
            />
          </section>
        </template>

        <template v-else-if="activeStep === 1">
          <section class="form-card visitor-form-card">
            <div class="photo-field">
              <span class="field-title"><i>*</i> 本人照片上传</span>
              <van-uploader v-model="photoFiles" :max-count="1" accept="image/*">
                <div class="photo-placeholder"><van-icon name="photograph" /><span>支持拍照或相册上传</span></div>
              </van-uploader>
              <p v-if="errors.photo" class="field-error">{{ errors.photo }}</p>
            </div>
            <HisenseField label="访客姓名" placeholder="请输入" required v-model="form.visitorName" :error="errors.visitorName" />
            <HisenseField label="手机号" placeholder="请输入" required :prefix="phoneCode" v-model="form.visitorPhone" :error="errors.visitorPhone" @prefix-click="openPicker('phoneCode')" />
            <HisenseField label="证件类型" placeholder="请选择" required v-model="form.identityType" :error="errors.identityType" readonly link @click="openPicker('identityType')" />
            <HisenseField label="证件号码" placeholder="请输入" required v-model="form.identityNumber" :error="errors.identityNumber" />
            <div class="requirements-note">证件类型包含：泰国人民身份证、护照、驾驶证、缅甸国民证、其他</div>
          </section>

          <section class="form-card list-card">
            <div class="list-heading"><h2>同行人</h2></div>
            <div class="managed-list">
              <HisenseUserCard
                v-for="companion in companions"
                :key="companion.id"
                :name="companion.name"
                :status="companion.status"
                editable
                @remove="removeCompanion(companion.id)"
                @edit="showToast('编辑同行人使用模拟交互')"
              />
            </div>
            <button class="outline-action" type="button" @click="showToast('添加同行人使用模拟交互')">添加同行人</button>
          </section>

          <section class="form-card list-card">
            <div class="list-heading"><h2>车辆</h2></div>
            <div class="managed-list">
              <HisenseVehicleCard
                v-for="vehicle in vehicles"
                :key="vehicle.id"
                :plate="vehicle.plate"
                @remove="removeVehicle(vehicle.id)"
                @edit="showToast('编辑车辆使用模拟交互')"
              />
            </div>
            <button class="outline-action" type="button" @click="showToast('添加车辆使用模拟交互')">添加车辆</button>
          </section>

          <section class="consent-list">
            <HisenseCheckbox v-model="form.noticeAgreed">我已阅读《访客须知》</HisenseCheckbox>
            <HisenseCheckbox v-model="form.privacyAgreed">我已阅读并同意《隐私政策》</HisenseCheckbox>
            <HisenseCheckbox v-model="form.securityAgreed">我同意使用我的信息进行身份核验和安全检查</HisenseCheckbox>
          </section>
        </template>

        <template v-else>
          <div class="confirmation-stack">
            <HisenseConfirmationCard
              title="预约信息"
              :items="[
                { label: '拜访园区', value: form.park },
                { label: '来访日期', value: form.visitDate },
                { label: '来访公司', value: form.company },
                { label: '来访类型', value: form.visitType },
                { label: '接访人手机号', value: `${phoneCode} ${form.hostPhone}` }
              ]"
              @edit="activeStep = 0"
            />
            <HisenseConfirmationCard
              title="访客信息"
              :items="[
                { label: '访客姓名', value: form.visitorName },
                { label: '手机号', value: `${phoneCode} ${form.visitorPhone}` },
                { label: '证件类型', value: form.identityType },
                { label: '证件号码', value: form.identityNumber }
              ]"
              @edit="activeStep = 1"
            />
            <section class="form-card confirmation-list-card">
              <div class="list-heading"><h2>同行人</h2><strong>{{ companions.length }} 人</strong></div>
              <HisenseUserCard v-for="companion in companions" :key="companion.id" :name="companion.name" :status="companion.status" />
              <div class="list-heading"><h2>车辆</h2><strong>{{ vehicles.length }} 辆</strong></div>
              <HisenseVehicleCard v-for="vehicle in vehicles" :key="vehicle.id" :plate="vehicle.plate" />
            </section>
          </div>
        </template>

        <div class="action-bar">
          <button v-if="activeStep > 0" class="secondary-button" type="button" @click="activeStep -= 1">上一步</button>
          <button class="primary-button" :class="{ disabled: isCurrentStepInvalid }" type="button" @click="goNext">
            {{ activeStep === 2 ? '提交预约' : '下一步' }}
          </button>
        </div>
      </div>
    </section>

    <van-popup v-model:show="showLanguage" position="bottom" round>
      <div class="language-popup">
        <div class="popup-handle" />
        <div class="popup-title-row"><h2>语言</h2><button class="close-button" type="button" @click="showLanguage = false"><van-icon name="cross" /></button></div>
        <button v-for="language in languages" :key="language.code" class="language-option" type="button" @click="selectLanguage(language)">
          <span>{{ language.label }}</span><van-icon v-if="currentLanguage.code === language.code" name="success" />
        </button>
      </div>
    </van-popup>

    <HisenseSelectPopup
      v-model:show="showPicker"
      :title="pickerTitle"
      :columns="pickerColumns"
      @confirm="handlePickerConfirm"
    />
    <van-popup v-model:show="showDatePicker" position="bottom" round class="date-popup">
      <div class="date-popup-header">
        <h2>日期选择</h2>
        <button class="date-popup-close" type="button" aria-label="关闭日期选择" @click="showDatePicker = false">
          <van-icon name="cross" />
        </button>
      </div>
      <van-calendar
        :poppable="false"
        :show-title="false"
        :show-subtitle="true"
        :show-confirm="true"
        confirm-text="确认"
        color="#00AAA6"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="handleDateConfirm"
      />
    </van-popup>
  </main>
</template>

<script setup>
import { computed, defineComponent, h, reactive, ref } from 'vue'
import { showToast } from 'vant'
import backgroundImage from './assets/bg-image-2.svg'
import HisenseField from './components/HisenseField.vue'
import HisenseCheckbox from './components/HisenseCheckbox.vue'
import HisenseUserCard from './components/HisenseUserCard.vue'
import HisenseVehicleCard from './components/HisenseVehicleCard.vue'
import HisenseSelectPopup from './components/HisenseSelectPopup.vue'
import HisenseConfirmationCard from './components/HisenseConfirmationCard.vue'

const steps = ['预约信息', '访客信息', '信息确认']
const languages = [
  { code: 'CN', label: '中文' },
  { code: 'EN', label: '英语' },
  { code: 'TH', label: '泰语' },
  { code: 'VN', label: '越南语' }
]
const currentLanguage = ref(languages[0])
const activeStep = ref(0)
const showLanguage = ref(false)
const showPicker = ref(false)
const showDatePicker = ref(false)
const pickerType = ref('')
const phoneCode = ref('+66')
const photoFiles = ref([])
const companions = ref([{ id: 'companion-demo', name: 'Qian Junze', status: '待授权' }])
const vehicles = ref([{ id: 'vehicle-demo', plate: '39A-12345' }])
const minDate = new Date()
const maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

const form = reactive({
  park: '', parkAddress: '', visitDate: '', company: '', department: '', visitType: '', reasonDescription: '', hostPhone: '',
  visitorName: '', visitorPhone: '', identityType: '', identityNumber: '', noticeAgreed: true, privacyAgreed: true, securityAgreed: false
})
const errors = reactive({})

const pickerConfig = {
  park: { title: '选择园区', columns: ['当前需求未提供园区选项'] },
  visitType: { title: '选择来访类型', columns: ['商务拜访', '会议', '培训', '其他'] },
  identityType: { title: '选择证件类型', columns: ['泰国人民身份证', '护照', '驾驶证', '缅甸国民证', '其他'] },
  phoneCode: { title: '选择区号', columns: ['+66', '+86'] }
}

const pickerTitle = computed(() => pickerConfig[pickerType.value]?.title || '')
const pickerColumns = computed(() => pickerConfig[pickerType.value]?.columns || [])
const isCurrentStepInvalid = computed(() => activeStep.value === 0 ? !hasAppointmentInput() : activeStep.value === 1 ? !hasVisitorInput() : false)

const SummaryRow = defineComponent({
  props: { label: String, value: String },
  setup(props) {
    return () => h('div', { class: 'summary-row' }, [h('span', props.label), h('strong', props.value || '未填写')])
  }
})

function removeCompanion(id) { companions.value = companions.value.filter(item => item.id !== id) }
function removeVehicle(id) { vehicles.value = vehicles.value.filter(item => item.id !== id) }
function selectLanguage(language) { currentLanguage.value = language; showLanguage.value = false }
function openPicker(type) { pickerType.value = type; showPicker.value = true }
function handlePickerConfirm({ selectedOptions }) {
  const value = selectedOptions?.[0]?.value || selectedOptions?.[0]?.text || selectedOptions?.[0] || ''
  if (pickerType.value === 'park') form.park = value
  if (pickerType.value === 'visitType') form.visitType = value
  if (pickerType.value === 'identityType') form.identityType = value
  if (pickerType.value === 'phoneCode') phoneCode.value = value
  showPicker.value = false
}
function handleDateConfirm(date) { form.visitDate = formatDate(date); showDatePicker.value = false }
function formatDate(date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` }
function clearErrors() { Object.keys(errors).forEach(key => delete errors[key]) }
function isBlank(value) { return !String(value || '').trim() }
function hasAppointmentInput() {
  return Boolean(form.park && form.visitDate && form.company && form.visitType && form.reasonDescription && form.hostPhone)
}
function hasVisitorInput() {
  return Boolean(photoFiles.value.length && form.visitorName && form.visitorPhone && form.identityType && form.identityNumber && form.noticeAgreed && form.privacyAgreed && form.securityAgreed)
}
function isAppointmentValid() {
  const fields = [['park', form.park, '请选择拜访园区'], ['visitDate', form.visitDate, '请选择来访日期'], ['company', form.company, '请输入来访公司'], ['visitType', form.visitType, '请选择来访类型'], ['reasonDescription', form.reasonDescription, '请输入来访事由描述'], ['hostPhone', form.hostPhone, '请输入接访人手机号']]
  fields.forEach(([key, value, message]) => { if (isBlank(value)) errors[key] = message })
  if (form.company.length > 128) errors.company = '来访公司不能超过128个字符'
  if (form.reasonDescription.length > 255) errors.reasonDescription = '来访事由描述不能超过255个字符'
  return !Object.keys(errors).some(key => ['park', 'visitDate', 'company', 'visitType', 'reasonDescription', 'hostPhone'].includes(key))
}
function isVisitorValid() {
  const fields = [['photo', photoFiles.value.length, '请上传本人照片'], ['visitorName', form.visitorName, '请输入访客姓名'], ['visitorPhone', form.visitorPhone, '请输入手机号'], ['identityType', form.identityType, '请选择证件类型'], ['identityNumber', form.identityNumber, '请输入证件号码']]
  fields.forEach(([key, value, message]) => { if (!value || isBlank(value)) errors[key] = message })
  if (form.visitorName && (form.visitorName.length < 2 || form.visitorName.length > 50)) errors.visitorName = '访客姓名应为2-50个字符'
  if (!form.noticeAgreed || !form.privacyAgreed || !form.securityAgreed) errors.securityAgreed = '请完成协议确认'
  return !Object.keys(errors).some(key => ['photo', 'visitorName', 'visitorPhone', 'identityType', 'identityNumber', 'securityAgreed'].includes(key))
}
function goNext() {
  clearErrors()
  const valid = activeStep.value === 0 ? isAppointmentValid() : activeStep.value === 1 ? isVisitorValid() : true
  if (!valid) return
  if (activeStep.value < 2) activeStep.value += 1
  else showToast('静态原型不提交真实数据')
}
</script>

<style scoped>
.prototype-page { min-height: 100vh; color: var(--van-text-color); background: var(--van-background); }
.hero { min-height: 100vh; padding-top: 20px; background: var(--van-background) url('./assets/bg-image-2.svg') top center / 375px 486px no-repeat; }
.page-box { width: 343px; margin: 0 auto; display: flex; flex-direction: column; gap: 12px; }
.page-header { height: 32px; display: flex; align-items: center; justify-content: space-between; }
.page-header h1 { margin: 0; color: var(--van-text-color); font-size: 24px; font-weight: 600; line-height: 32px; }
.language-button { width: 52px; height: 32px; padding: 6px 8px; display: inline-flex; align-items: center; justify-content: center; gap: 4px; border: 1px solid var(--van-text-color-2); border-radius: 4px; color: var(--van-text-color); background: transparent; font-size: 14px; font-weight: 600; cursor: pointer; }
.steps-card { height: 60px; padding: 12px 20px; box-sizing: border-box; display: flex; border-radius: 12px; background: #fff; }
.step-item { position: relative; flex: 1; height: 36px; padding: 0; border: 0; background: transparent; cursor: pointer; }
.step-dot { position: relative; z-index: 2; display: block; width: 8px; height: 8px; margin: 0 auto; border-radius: 50%; background: var(--van-text-color-4); color: #fff; font-size: 6px; line-height: 8px; }
.step-item.active .step-dot, .step-item.completed .step-dot { background: var(--van-primary-color-dark); }
.step-track { position: absolute; top: 3px; height: 4px; background: var(--van-border-color); }
.step-track-left { right: calc(50% + 4px); left: -20px; }
.step-track-right { left: calc(50% + 4px); right: -20px; }
.step-item.active .step-track-left, .step-item.completed .step-track-left, .step-item.completed .step-track-right, .step-item.active:first-child .step-track-right { background: var(--van-primary-color-dark); }
.step-label { display: block; margin-top: 8px; color: var(--van-text-color); font-size: 12px; line-height: 20px; white-space: nowrap; }
.park-card, .form-card { border-radius: 12px; background: #fff; }
.park-card { min-height: 108px; padding: 0 16px; box-sizing: border-box; }
.park-button { position: relative; width: 100%; min-height: 108px; padding: 16px 24px 12px 0; border: 0; color: var(--van-text-color); background: transparent; text-align: left; cursor: pointer; }
.field-title { display: block; color: var(--van-text-color-2); font-size: 16px; font-weight: 500; line-height: 24px; }
.field-title i { color: var(--van-danger-color); font-style: normal; }
.park-value, .park-address { display: block; padding-right: 18px; font-size: 16px; line-height: 24px; }
.park-value { margin-top: 4px; }
.park-address { color: var(--van-text-color-3); }
.field-arrow { position: absolute; right: 0; top: 50%; color: var(--van-text-color-3); transform: translateY(-50%); }
.form-card { padding: 16px 16px 8px; }
.form-card h2 { margin: 0 0 12px; color: var(--van-text-color); font-size: 16px; font-weight: 600; line-height: 24px; }
.design-field { min-height: 76px; padding: 10px 0; box-sizing: border-box; border-bottom: 1px solid var(--van-border-color); }
.design-field.textarea { min-height: 100px; }
.design-field:last-child { border-bottom: 0; }
.design-field .field-value-row { min-height: 24px; margin-top: 8px; display: flex; align-items: center; gap: 8px; }
.design-field input, .design-field textarea { width: 100%; min-width: 0; padding: 0; border: 0; outline: none; color: var(--van-text-color); background: transparent; font: inherit; font-size: 16px; line-height: 24px; resize: none; }
.design-field textarea { min-height: 48px; }
.design-field input::placeholder, .design-field textarea::placeholder { color: var(--van-text-color-4); }
.design-field input[readonly] { cursor: pointer; }
.phone-control { width: 100%; display: flex; align-items: center; gap: 8px; }
.phone-prefix { min-height: 24px; padding: 0; display: inline-flex; align-items: center; gap: 4px; border: 0; background: transparent; color: var(--van-text-color); font-size: 16px; cursor: pointer; }
.prefix-arrow { font-size: 12px; color: var(--van-text-color-3); }
.field-arrow-inline { flex: 0 0 auto; width: 16px; height: 16px; display: block; }
.field-error { margin: 4px 0 0; color: var(--van-danger-color); font-size: 12px; line-height: 20px; }
.section-divider { height: 38px; display: flex; align-items: center; justify-content: center; gap: 8px; color: var(--van-text-color-3); font-size: 14px; line-height: 22px; }
.section-divider span { width: 40px; height: 1px; background: var(--van-border-color); }
.visitor-form-card { padding-bottom: 12px; }
.photo-field { padding-bottom: 16px; border-bottom: 1px solid var(--van-border-color); }
.photo-placeholder { width: 80px; height: 80px; margin-top: 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; border: 1px dashed var(--van-border-color); border-radius: 8px; color: var(--van-text-color-3); background: var(--van-background); font-size: 12px; text-align: center; }
.photo-placeholder .van-icon { font-size: 24px; }
.requirements-note { padding: 8px 0 4px; color: var(--van-text-color-3); font-size: 12px; line-height: 20px; }
.list-card { margin-top: 0; }
.list-heading { min-height: 44px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--van-border-color); }
.list-heading h2 { margin: 0; }
.list-heading button { padding: 0; border: 0; color: var(--van-primary-color-dark); background: transparent; font-size: 14px; }
.empty-list { padding: 12px 0; color: var(--van-text-color-3); font-size: 14px; }
.consent-list { display: flex; flex-direction: column; gap: 12px; padding: 4px 0; }
.consent-row { position: relative; min-height: 22px; display: flex; align-items: center; gap: 8px; color: var(--van-text-color); font-size: 14px; line-height: 22px; cursor: pointer; }
.consent-input { position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none; }
.consent-box { width: 14px; height: 14px; flex: 0 0 14px; box-sizing: border-box; display: inline-flex; align-items: center; justify-content: center; border: 2px solid #E5E6EB; border-radius: 2px; color: #FFFFFF; background: #FFFFFF; font-size: 11px; font-weight: 700; line-height: 14px; }
.consent-box.checked { border-color: #00AAA6; background: #00AAA6; }
.confirmation-card { padding-bottom: 16px; }
.summary-row { min-height: 44px; display: flex; align-items: center; justify-content: space-between; gap: 16px; border-bottom: 1px solid var(--van-border-color); font-size: 14px; }
.summary-row:last-child { border-bottom: 0; }
.summary-row span { color: var(--van-text-color-2); }
.summary-row strong { max-width: 65%; font-weight: 400; text-align: right; overflow-wrap: anywhere; }
.action-bar { display: flex; gap: 8px; margin: 0 0 32px; }
.primary-button, .secondary-button { width: 100%; min-height: 44px; border-radius: 20px; font-size: 14px; cursor: pointer; }
.primary-button { border: 0; color: #FFFFFF; background: #22BBB3 !important; }
.primary-button.disabled { background: #79DDD1 !important; }
.secondary-button { border: 1px solid var(--van-border-color); color: var(--van-text-color); background: #fff; }
.language-popup { padding: 12px 20px 28px; background: var(--van-background); }
.popup-handle { width: 48px; height: 5px; margin: 0 auto 16px; border-radius: 4px; background: var(--van-text-color-4); }
.popup-title-row { min-height: 48px; display: flex; align-items: center; justify-content: center; }
.popup-title-row h2 { margin: 0; font-size: 20px; }
.close-button { position: absolute; top: 24px; right: 20px; width: 44px; height: 44px; border: 0; border-radius: 50%; color: var(--van-text-color-2); background: #fff; font-size: 20px; }
.language-option { width: 100%; min-height: 56px; padding: 0 20px; display: flex; align-items: center; justify-content: space-between; border: 0; color: var(--van-text-color); background: #fff; font-size: 16px; text-align: left; }
.language-option + .language-option { border-top: 1px solid var(--van-border-color); }
.language-option:first-of-type { border-radius: 16px 16px 0 0; }
.language-option:last-of-type { border-radius: 0 0 16px 16px; }
.language-option .van-icon { color: var(--van-primary-color-dark); font-size: 22px; }
@media (min-width: 500px) { body { padding: 24px 0; } #app { border-radius: 16px; overflow: hidden; box-shadow: 0 8px 32px rgba(29, 33, 41, 0.08); } }
</style>

.managed-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 0 12px;
}

.outline-action {
  width: 100%;
  min-height: 44px;
  border: 1px solid #E5E6EB;
  border-radius: 20px;
  color: #1D2129;
  background: #FFFFFF;
  font-size: 16px;
}

.confirmation-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.confirmation-list-card {
  padding-bottom: 16px;
}

.confirmation-list-card .list-heading strong {
  color: #86909C;
  font-size: 14px;
  font-weight: 400;
}
