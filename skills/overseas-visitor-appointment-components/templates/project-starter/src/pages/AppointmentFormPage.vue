<template>
  <PageFrame :title="t('form.title')" variant="form" :embedded="embedded" back>
    <section class="steps-card">
      <Steps :items="steps" :active="step" clickable @change="step = $event" />
    </section>

    <section class="park-card">
      <Field v-model="form.park" :label="t('form.park')" placeholder="请选择拜访园区" required readonly link state="readonly" @click="showPark = true" />
    </section>

    <section v-if="step === 0" class="form-panel">
      <h2>{{ t('form.appointmentInfo') }}</h2>
      <Field v-model="form.date" :label="t('form.date')" :placeholder="t('form.datePlaceholder')" required readonly link state="readonly" @click="showDate = true" />
      <Field v-model="form.company" :label="t('form.company')" :placeholder="t('form.companyPlaceholder')" required />
      <Field v-model="form.department" :label="t('form.department')" :placeholder="t('form.departmentPlaceholder')" required />
      <Field v-model="form.visitType" :label="t('form.visitType')" :placeholder="t('form.choosePlaceholder')" required readonly link state="readonly" @click="showVisitType = true" />
      <Field v-model="form.reason" :label="t('form.reason')" :placeholder="t('form.reasonPlaceholder')" textarea :maxlength="200" />
      <Field v-model="form.hostPhone" :label="t('form.hostPhone')" placeholder="请输入" prefix="+86" required />
    </section>

    <section v-else-if="step === 1" class="form-panel">
      <h2>{{ t('form.visitorInfo') }}</h2>
      <p class="notice">ⓘ {{ t('form.identityNotice') }}</p>
      <Uploader v-model="photo" :label="t('form.photo')" required />
      <Field v-model="form.visitor" :label="t('form.visitor')" :placeholder="t('form.visitorPlaceholder')" required />
      <Field v-model="form.phone" :label="t('form.phone')" placeholder="请输入" prefix="+86" required />
      <Field v-model="form.idType" :label="t('form.idType')" placeholder="请选择证件类型" readonly link state="readonly" required @click="showIdType = true" />
      <Field v-model="form.idNumber" :label="t('form.idNumber')" placeholder="请输入" required />
      <Field v-model="form.foreignInfo" :label="t('form.foreignInfo')" :placeholder="t('form.foreignInfoPlaceholder')" textarea :maxlength="200" />
    </section>

    <!-- 同行人 / 车辆：设计稿 1087:25323 / 1087:25329 是两张独立白卡，343 撑满内容区、间距 12。
         full / padding 由组件 prop 表达，页面不再写 :deep 覆盖（会顶掉组件内部布局）。 -->
    <div v-if="step === 1" class="companion-stack">
      <UserCard state="default" full :padding="16" />
      <VehicleCard state="default" full :padding="16" />
    </div>

    <section v-if="step === 2" class="form-panel confirmation-panel">
      <h2>{{ t('form.confirmInfo') }}</h2>
      <Field :label="t('form.park')" model-value="HHA Industrial Park, 123 Eastern Seaboard" state="readonly" />
      <Field :label="t('form.date')" :model-value="form.date || '2026-08-01'" state="readonly" />
      <Field :label="t('form.company')" :model-value="form.company || '海信集团'" state="readonly" />
      <Field :label="t('form.visitor')" :model-value="form.visitor || '张益达'" state="readonly" />
      <Field :label="t('form.phone')" :model-value="form.phone || '13800138000'" state="readonly" />
      <Field :label="t('form.idType')" :model-value="form.idType || '居民身份证'" state="readonly" />
    </section>

    <section class="agreements">
      <!-- 用户 2026-11-12 裁决：三个协议名称统一 #00AAA6 且支持点击，复用组件库 Popup 展示正文。 -->
      <Checkbox v-model="agreements.notice">{{ t('form.noticeAgreementBefore') }}<a class="agreement-link" href="javascript:void(0)" @click.stop.prevent="openAgreement('notice')">{{ t('form.noticeAgreementLink') }}</a></Checkbox>
      <Checkbox v-model="agreements.privacy">{{ t('form.privacyAgreementBefore') }}<a class="agreement-link" href="javascript:void(0)" @click.stop.prevent="openAgreement('privacy')">{{ t('form.privacyAgreementLink') }}</a></Checkbox>
      <Checkbox v-model="agreements.security">{{ t('form.securityAgreementBefore') }}<a class="agreement-link" href="javascript:void(0)" @click.stop.prevent="openAgreement('security')">{{ t('form.securityAgreementLink') }}</a></Checkbox>
    </section>

    <div class="form-actions">
      <Button v-if="step > 0" variant="secondary" :label="t('form.previous')" :block="false" @click="step -= 1" />
      <Button :label="step === 2 ? t('form.submit') : t('form.next')" :block="false" @click="nextStep" />
    </div>

    <DatePicker v-model:show="showDate" @confirm="onDateConfirm" />
    <Popup v-model:show="showPark" :title="t('form.park')"><SelectList v-model="form.park" :options="parkOptions" padded @select="showPark = false" /></Popup>
    <Popup v-model:show="showVisitType" :title="t('form.visitType')"><SelectList v-model="form.visitType" :options="visitTypeOptions" padded @select="showVisitType = false" /></Popup>
    <Popup v-model:show="showIdType" :title="t('form.idType')"><SelectList v-model="form.idType" :options="idTypeOptions" padded @select="showIdType = false" /></Popup>
    <Popup v-model:show="showNotice" title="访客须知">
      <div class="agreement-card">
        <h3>入园须知</h3>
        <p>1.请在预约时间内到达园区，迟到超过30分钟预约将自动取消。</p>
        <p>2.请携带有效证件；“以便安保人员核验身份。</p>
        <p>3.进入园区后请佩戴访客证，并在指定区域活动。</p>
        <p>4. 禁止携带危险物品入园。</p>
        <p>5.请遵守园区安全规定，服从安保人员指引。</p>
        <p>6.离开时请在安保处签出并归还访客证。</p>
        <h3>注意事项</h3>
        <p>1.园区内禁止吸烟，请在指定区域吸烟。</p>
        <p>2. 请爱护园区环境和设施。</p>
        <p>3.如遇紧急情况，请拨打园区安保电话。</p>
      </div>
      <Button class="agreement-confirm" :label="t('form.readNotice')" @click="markAgreementRead('notice')" />
    </Popup>
    <Popup v-model:show="showPrivacy" title="隐私政策">
      <div class="agreement-card">
        <h3>隐私政策</h3>
        <p>我们仅在本次来访的身份核验与安全检查范围内使用您提交的信息，不会用于其它目的。</p>
      </div>
      <Button class="agreement-confirm" :label="t('form.readPrivacy')" @click="markAgreementRead('privacy')" />
    </Popup>
    <Popup v-model:show="showSecurity" :title="t('form.securityAgreementLink')">
      <div class="agreement-card">
        <h3>{{ t('form.securityAgreementLink') }}</h3>
        <p>{{ t('form.securityAgreement') }}</p>
      </div>
      <Button class="agreement-confirm" :label="t('form.readSecurity')" @click="markAgreementRead('security')" />
    </Popup>
    <!-- 第一步「下一步」校验：必填缺失 / 协议未勾选，复用组件库通用 Dialog，不另写弹窗。
         协议弹窗双按钮：返回（取消，左）/ 同意并继续（确认，右，自动勾选未勾选项并进入第二步）。
         协议名称用 #00AAA6 链接，点击打开对应白底 Popup。 -->
    <Dialog
      v-model:show="dialog.show"
      :title="dialog.title"
      :message="dialog.mode === 'required' ? [dialog.intro, ...dialog.items.map(item => `• ${item.label}`)].join('\n') : ''"
      :show-cancel="dialog.mode === 'agreement'"
      :confirm-text="dialog.mode === 'agreement' ? t('form.agreeAndContinue') : t('form.acknowledge')"
      :cancel-text="t('form.backToSelection')"
      @confirm="onDialogConfirm"
    >
      <template v-if="dialog.mode === 'agreement'">
        <p class="dialog-intro">{{ dialog.intro }}</p>
        <ul class="dialog-links">
          <li v-for="item in dialog.items" :key="item.key">
            <a href="javascript:void(0)" @click.stop.prevent="openAgreement(item.key)">{{ item.label }}</a>
          </li>
        </ul>
      </template>
    </Dialog>
  </PageFrame>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import Button from '../components/figma/Button.vue'
import Checkbox from '../components/figma/Checkbox.vue'
import Dialog from '../components/figma/Dialog.vue'
import DatePicker from '../components/figma/DatePicker.vue'
import Field from '../components/figma/Field.vue'
import Steps from '../components/figma/Steps.vue'
import Uploader from '../components/figma/Uploader.vue'
import UserCard from '../components/figma/UserCard.vue'
import VehicleCard from '../components/figma/VehicleCard.vue'
import Popup from '../components/figma/Popup.vue'
import SelectList from '../components/figma/SelectList.vue'
import PageFrame from './PageFrame.vue'
const { t } = useI18n()
const props = defineProps({ embedded: Boolean })
const emit = defineEmits(['submitted'])
const router = useRouter()
const step = ref(0)
const steps = computed(() => [t('form.stepAppointment'), t('form.stepVisitor'), t('form.stepConfirm')])
const showDate = ref(false)
const showPark = ref(false)
const showVisitType = ref(false)
const showIdType = ref(false)
const showNotice = ref(false)
const showPrivacy = ref(false)
const showSecurity = ref(false)
const dialog = reactive({ show: false, mode: 'required', title: '', intro: '', items: [], pendingMissing: [] })
const photo = ref([])
// 用户 2026-11-12：初始三项均未同意，由「同意并继续」统一勾选
const agreements = reactive({ notice: false, privacy: false, security: false })
// 只列「未勾选 / 未填写」的项，已勾选的不提示
const agreementKeys = [
  { key: 'notice', label: () => t('form.noticeAgreementLink') },
  { key: 'privacy', label: () => t('form.privacyAgreementLink') },
  { key: 'security', label: () => t('form.securityAgreementLink') }
]
const requiredFields = [
  { key: 'park', label: () => t('form.park') },
  { key: 'date', label: () => t('form.date') },
  { key: 'company', label: () => t('form.company') },
  { key: 'department', label: () => t('form.department') },
  { key: 'visitType', label: () => t('form.visitType') },
  { key: 'hostPhone', label: () => t('form.hostPhone') }
]
const form = reactive({ park: 'HHA Industrial Park, 123 Eastern Seaboard', date: '', company: '', department: '', visitType: '', reason: '', hostPhone: '', visitor: '', phone: '', idType: '居民身份证', idNumber: '', foreignInfo: '' })
const parkOptions = ['HHA Industrial Park, 123 Eastern Seaboard', '瑞嘉工业园区']
const visitTypeOptions = ['商务拜访', '学术访问', '供应商沟通']
const idTypeOptions = ['居民身份证', '护照', '港澳居民来往内地通行证']
const agreementPopups = { notice: showNotice, privacy: showPrivacy, security: showSecurity }
function onDateConfirm(date) {
  const value = date instanceof Date ? date : new Date(date)
  if (Number.isNaN(value.getTime())) return
  const pad = number => String(number).padStart(2, '0')
  form.date = `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())}`
}
function openAgreement(key) {
  agreementPopups[key].value = true
}
function markAgreementRead(key) {
  agreements[key] = true
  agreementPopups[key].value = false
}
function showDialog(mode, title, intro, items, pendingMissing = []) {
  Object.assign(dialog, { show: true, mode, title, intro, items, pendingMissing })
}
function nextStep() {
  // 用户 2026-11-12：第一步「下一步」先校验必填，再校验协议，弹窗只列未通过项
  if (step.value === 0) {
    const missingRequired = requiredFields.filter(field => !String(form[field.key] || '').trim())
    if (missingRequired.length) {
      showDialog('required', t('form.requiredTitle'), t('form.requiredIntro'),
        missingRequired.map(field => ({ key: field.key, label: field.label() })))
      return
    }
    const missingAgreements = agreementKeys.filter(item => !agreements[item.key])
    if (missingAgreements.length) {
      showDialog('agreement', t('form.confirmTitle'), t('form.confirmIntro'),
        missingAgreements.map(item => ({ key: item.key, label: item.label() })),
        missingAgreements.map(item => item.key))
      return
    }
  }
  if (step.value < 2) step.value += 1
  else if (props.embedded) emit('submitted')
  else router.push('/appointment/success')
}
function onDialogConfirm() {
  // 「同意并继续」= 同意未勾选项并跳到第二步；必填提示只关闭
  if (dialog.mode !== 'agreement') return
  dialog.pendingMissing.forEach(key => { agreements[key] = true })
  step.value = 1
}
</script>

<style scoped>
.steps-card { min-height: 60px; margin-top: 0; padding: 12px 16px; display: flex; align-items: center; justify-content: center; border-radius: 12px; background: #FFFFFF; }
.steps-card :deep(.figma-steps) { width: 100%; }
.park-card, .form-panel { margin-top: 12px; padding: 12px 16px; border-radius: 12px; background: #FFFFFF; }
.park-card :deep(.figma-field), .park-card :deep(.figma-field--focus), .form-panel :deep(.figma-field:last-of-type) { box-shadow: none; }
.park-card :deep(.figma-field), .form-panel :deep(.figma-field) { width: 100%; }
.form-panel h2 { margin: 0 0 4px; color: #1D2129; font: 600 16px/24px "PingFang SC", sans-serif; }
.form-panel :deep(.upload) { width: 100%; }
/* 两张独立白卡：343 撑满内容区、间距 12，宽度与内边距全部由组件 prop 传入 */
.companion-stack { margin-top: 12px; display: grid; gap: 12px; }
.notice { margin: 4px 0 8px; padding: 8px; color: #A26D0A; background: #FFFCE8; font: 400 12px/18px "PingFang SC", sans-serif; }
.confirmation-panel :deep(.figma-field) { width: 100%; }
.agreements { margin-top: 12px; padding: 0 4px; display: grid; gap: 8px; }
/* 海信绿协议链接（与组件库 ghost-link 同色 #00AAA6） */
.agreements .agreement-link { color: #00AAA6; text-decoration: none; cursor: pointer; }
.agreement-card { padding: 16px; box-sizing: border-box; border-radius: 12px; background: #FFFFFF; box-shadow: 0 0 0 1px #E5E6EB; color: #4E5969; font: 400 14px/22px "PingFang SC", sans-serif; }
.agreement-card h3 { margin: 0 0 8px; color: #1D2129; font: 600 16px/24px "PingFang SC", sans-serif; }
.agreement-card h3:not(:first-child) { margin-top: 16px; }
.agreement-card p { margin: 0 0 4px; }
.agreement-confirm { margin-top: 12px; }
/* 协议确认 Dialog：说明左对齐，未勾选项用 #00AAA6 链接，可点开对应白底 Popup。 */
.dialog-intro { margin: 0; color: #86909C; font: 400 16px/22px "PingFang SC", sans-serif; text-align: left; }
.dialog-links { margin: 0; padding: 0; list-style: none; display: grid; gap: 8px; text-align: left; }
.dialog-links li { position: relative; min-width: 0; padding-left: 16px; color: #00AAA6; font: 400 16px/22px "PingFang SC", sans-serif; overflow-wrap: anywhere; word-break: break-word; }
.dialog-links li::before { content: "•"; position: absolute; left: 2px; color: #00AAA6; }
.dialog-links a { color: #00AAA6; text-decoration: none; cursor: pointer; }
.form-actions { display: flex; gap: 12px; margin-top: 16px; }
.form-actions :deep(.figma-button) { flex: 1 1 0; }
</style>
