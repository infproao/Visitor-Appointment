<template>
  <main class="page-shell"><header class="page-header"><h1>{{ title }}</h1><van-tag round :type="statusType">{{ appointment.status || '待确认' }}</van-tag></header><HisenseConfirmationCard v-for="section in sections" :key="section.title" :title="section.title" :items="section.items" :editable="false" /><section class="detail-card"><h2>{{ timelineTitle }}</h2><HisenseApprovalTimeline :items="appointment.timeline || []" /></section><HisenseButton v-if="showPass" variant="secondary" @click="emit('pass', appointment)">{{ passText }}</HisenseButton><slot /></main>
</template>

<script setup>
import { computed } from 'vue'
import HisenseButton from '../components/HisenseButton.vue'
import HisenseApprovalTimeline from '../components/HisenseApprovalTimeline.vue'
import HisenseConfirmationCard from '../components/HisenseConfirmationCard.vue'
const props = defineProps({ title: { type: String, default: '预约详情' }, appointment: { type: Object, default: () => ({}) }, sections: { type: Array, default: () => [] }, timelineTitle: { type: String, default: '审批记录' }, passText: { type: String, default: '查看通行证' }, showPass: { type: Boolean, default: true } })
const emit = defineEmits(['pass'])
const statusType = computed(() => /拒绝|退回|过期|取消/.test(props.appointment.status || '') ? 'danger' : 'warning')
</script>

<style scoped>
.page-shell { min-height: 100vh; padding: 16px; display: grid; gap: 12px; box-sizing: border-box; background: var(--van-background); color: var(--van-text-color); }
.page-header { min-height: 48px; display: flex; align-items: center; justify-content: space-between; }
h1 { margin: 0; font-size: 20px; line-height: 28px; }
.detail-card { padding: 16px; border-radius: 12px; background: var(--van-background-2); }
.detail-card h2 { margin: 0 0 16px; font-size: 16px; line-height: 24px; }
</style>
