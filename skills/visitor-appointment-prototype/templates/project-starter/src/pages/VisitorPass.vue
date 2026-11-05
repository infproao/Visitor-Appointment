<template>
  <main class="page-shell visitor-pass"><header class="page-header"><h1>{{ title }}</h1><HisenseTag :label="status" :status="expired ? 'neutral' : 'success'" size="small" /></header><section class="pass-card"><HisenseQRCode :caption="qrCaption" :disabled="expired" /><p class="pass-number">{{ passNumber || '待注入通行证编号' }}</p><p class="pass-hint">{{ hint }}</p></section><HisenseButton :disabled="expired" @click="emit('share')">{{ actionText }}</HisenseButton><slot /></main>
</template>

<script setup>
import { computed } from 'vue'
import HisenseButton from '../components/HisenseButton.vue'
import HisenseQRCode from '../components/HisenseQRCode.vue'
import HisenseTag from '../components/HisenseTag.vue'
const props = defineProps({ title: { type: String, default: '访客通行证' }, status: { type: String, default: '待使用' }, passNumber: { type: String, default: '' }, qrCaption: { type: String, default: '二维码占位，待注入业务数据' }, hint: { type: String, default: '请在入园时向安保人员出示此二维码。' }, actionText: { type: String, default: '保存或分享通行证' }, expired: { type: Boolean, default: false } })
const emit = defineEmits(['share'])
const statusType = computed(() => props.expired ? 'default' : 'success')
</script>

<style scoped>
.page-shell { min-height: 100vh; padding: 16px; box-sizing: border-box; background: var(--van-background); color: var(--van-text-color); }
.page-header { min-height: 48px; display: flex; align-items: center; justify-content: space-between; }
h1 { margin: 0; font-size: 20px; line-height: 28px; }
.pass-card { margin: 24px 0; padding: 24px 16px; border-radius: 16px; background: var(--van-background-2); text-align: center; }
.pass-number { margin: 16px 0 0; color: var(--van-text-color); font-size: 16px; line-height: 24px; }
.pass-hint { margin: 8px 0 0; color: var(--van-text-color-2); font-size: 14px; line-height: 20px; }
</style>
