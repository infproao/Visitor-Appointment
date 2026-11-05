<template>
  <main class="page-shell"><header class="page-header"><h1>{{ title }}</h1><HisenseTag :label="record.status || '待确认'" :status="statusType" size="small" /></header><HisenseRegistrationCard :record="record" :fields="fields" /><section class="detail-card"><h2>{{ timelineTitle }}</h2><HisenseApprovalTimeline :items="record.timeline || []" /></section><HisenseButton @click="showOperation = true">{{ operationText }}</HisenseButton><HisenseEntryOperationPopup v-model:show="showOperation" :title="operationTitle" :step-label="operationStepLabel" :confirm-disabled="operationDisabled" @confirm="emit('operation', $event)" @cancel="emit('cancel-operation')"><slot name="operation" /></HisenseEntryOperationPopup><slot /></main>
</template>

<script setup>
import { computed, ref } from 'vue'
import HisenseApprovalTimeline from '../components/HisenseApprovalTimeline.vue'
import HisenseButton from '../components/HisenseButton.vue'
import HisenseEntryOperationPopup from '../components/HisenseEntryOperationPopup.vue'
import HisenseRegistrationCard from '../components/HisenseRegistrationCard.vue'
import HisenseTag from '../components/HisenseTag.vue'
const props = defineProps({ title: { type: String, default: '安保详情' }, record: { type: Object, default: () => ({}) }, fields: { type: Array, default: () => [] }, timelineTitle: { type: String, default: '操作记录' }, operationText: { type: String, default: '进行入境操作' }, operationTitle: { type: String, default: '入境操作' }, operationStepLabel: { type: String, default: '' }, operationDisabled: { type: Boolean, default: false } })
const emit = defineEmits(['operation', 'cancel-operation'])
const showOperation = ref(false)
const statusType = computed(() => /拒绝|退回/.test(props.record.status || '') ? 'danger' : 'warning')
</script>

<style scoped>
.page-shell { min-height: 100vh; padding: 16px; display: grid; gap: 12px; box-sizing: border-box; background: var(--van-background); color: var(--van-text-color); }
.page-header { min-height: 48px; display: flex; align-items: center; justify-content: space-between; }
h1 { margin: 0; font-size: 20px; line-height: 28px; }
.detail-card { padding: 16px; border-radius: 12px; background: var(--van-background-2); }
.detail-card h2 { margin: 0 0 16px; font-size: 16px; line-height: 24px; }
</style>
