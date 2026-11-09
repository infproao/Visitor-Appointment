<template>
  <PageFrame :title="t('form.title')" variant="form" back>
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
      <UserCard state="default" />
      <Field v-model="form.foreignInfo" :label="t('form.foreignInfo')" :placeholder="t('form.foreignInfoPlaceholder')" textarea :maxlength="200" />
      <VehicleCard state="default" />
    </section>

    <section v-else class="form-panel confirmation-panel">
      <h2>{{ t('form.confirmInfo') }}</h2>
      <Field :label="t('form.park')" model-value="HHA Industrial Park, 123 Eastern Seaboard" state="readonly" />
      <Field :label="t('form.date')" :model-value="form.date || '2026-08-01'" state="readonly" />
      <Field :label="t('form.company')" :model-value="form.company || '海信集团'" state="readonly" />
      <Field :label="t('form.visitor')" :model-value="form.visitor || '张益达'" state="readonly" />
      <Field :label="t('form.phone')" :model-value="form.phone || '13800138000'" state="readonly" />
      <Field :label="t('form.idType')" :model-value="form.idType || '居民身份证'" state="readonly" />
    </section>

    <section class="agreements">
      <Checkbox v-model="agreements.notice">{{ t('form.noticeAgreement') }}</Checkbox>
      <Checkbox v-model="agreements.privacy">{{ t('form.privacyAgreement') }}</Checkbox>
      <Checkbox v-model="agreements.security">{{ t('form.securityAgreement') }}</Checkbox>
    </section>

    <div class="form-actions">
      <Button v-if="step > 0" variant="secondary" :label="t('form.previous')" :block="false" @click="step -= 1" />
      <Button :label="step === 2 ? t('form.submit') : t('form.next')" :block="false" @click="nextStep" />
    </div>

    <DatePicker v-model:show="showDate" @confirm="onDateConfirm" />
    <Popup v-model:show="showPark" :title="t('form.park')"><SelectList v-model="form.park" :options="parkOptions" @select="showPark = false" /></Popup>
    <Popup v-model:show="showVisitType" :title="t('form.visitType')"><SelectList v-model="form.visitType" :options="visitTypeOptions" @select="showVisitType = false" /></Popup>
    <Popup v-model:show="showIdType" :title="t('form.idType')"><SelectList v-model="form.idType" :options="idTypeOptions" @select="showIdType = false" /></Popup>
  </PageFrame>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import Button from '../components/figma/Button.vue'
import Checkbox from '../components/figma/Checkbox.vue'
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
const router = useRouter()
const step = ref(0)
const showDate = ref(false)
const showPark = ref(false)
const showVisitType = ref(false)
const showIdType = ref(false)
const photo = ref([])
const agreements = reactive({ notice: true, privacy: true, security: false })
const form = reactive({ park: 'HHA Industrial Park, 123 Eastern Seaboard', date: '', company: '', department: '', visitType: '', reason: '', hostPhone: '', visitor: '', phone: '', idType: '居民身份证', idNumber: '', foreignInfo: '' })
const parkOptions = ['HHA Industrial Park, 123 Eastern Seaboard', '瑞嘉工业园区']
const visitTypeOptions = ['商务拜访', '学术访问', '供应商沟通']
const idTypeOptions = ['居民身份证', '护照', '港澳居民来往内地通行证']
function onDateConfirm(date) {
  const value = date instanceof Date ? date : new Date(date)
  if (Number.isNaN(value.getTime())) return
  const pad = number => String(number).padStart(2, '0')
  form.date = `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())}`
}
function nextStep() {
  if (step.value < 2) step.value += 1
  else router.push('/appointment/success')
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
.form-panel :deep(.user-card-flow), .form-panel :deep(.vehicle-card-flow) { width: 100%; margin-top: 8px; }
.form-panel :deep(.list-card) { width: 100%; padding: 0; }
.form-panel :deep(.list-card__header), .form-panel :deep(.list-card__add) { display: none; }
.form-panel :deep(.user-card-row), .form-panel :deep(.vehicle-row) { width: 100%; }
.notice { margin: 4px 0 8px; padding: 8px; color: #A26D0A; background: #FFFCE8; font: 400 12px/18px "PingFang SC", sans-serif; }
.confirmation-panel :deep(.figma-field) { width: 100%; }
.agreements { margin-top: 12px; padding: 0 4px; display: grid; gap: 8px; }
.form-actions { display: flex; gap: 12px; margin-top: 16px; }
.form-actions :deep(.figma-button) { flex: 1 1 0; }
</style>
