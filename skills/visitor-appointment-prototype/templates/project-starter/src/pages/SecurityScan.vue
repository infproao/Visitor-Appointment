<template>
  <main class="scan-page"><header class="scan-page__header"><h1>{{ title }}</h1><span>{{ modeLabel }}</span></header><HisenseScanFrame :status="status" :message="message" :hint="hint" @album="emit('album')" @retry="emit('retry')"><slot /></HisenseScanFrame></main>
</template>

<script setup>
import HisenseScanFrame from '../components/HisenseScanFrame.vue'
defineProps({ title: { type: String, default: '扫一扫' }, modeLabel: { type: String, default: '安保端' }, status: { type: String, default: 'scanning' }, message: { type: String, default: '请将二维码放入框内' }, hint: { type: String, default: '扫一扫仅提供前端模拟取景，待接入扫码能力' } })
const emit = defineEmits(['album', 'retry'])
</script>

<style scoped>
.scan-page { min-height: 100vh; display: flex; flex-direction: column; box-sizing: border-box; color: var(--van-background-2); background: var(--van-text-color); }
.scan-page__header { min-height: 56px; padding: 0 16px; display: flex; align-items: center; justify-content: space-between; }
.scan-page__header h1 { margin: 0; font-size: 20px; line-height: 28px; }
.scan-page__header span { color: var(--van-text-color-4); font-size: 12px; }
.scan-page :deep(.hisense-scan-frame) { flex: 1; }
</style>
