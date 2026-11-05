<template>
  <main class="page-shell"><header class="page-header"><h1>{{ title }}</h1><van-tag round :type="allowed ? 'success' : 'danger'">{{ allowed ? allowedText : blockedText }}</van-tag></header><section class="gate-card"><van-icon name="lock" class="gate-icon" /><h2>{{ gateName || '待注入门禁名称' }}</h2><p>{{ description }}</p><dl><div v-for="field in fields" :key="field.key"><dt>{{ field.label }}</dt><dd>{{ gate[field.key] || '待补充' }}</dd></div></dl></section><HisenseButton :disabled="!allowed" @click="emit('open', gate)">{{ actionText }}</HisenseButton><slot /></main>
</template>

<script setup>
import HisenseButton from '../components/HisenseButton.vue'
defineProps({ title: { type: String, default: '门禁控制' }, gate: { type: Object, default: () => ({}) }, gateName: { type: String, default: '' }, allowed: { type: Boolean, default: false }, allowedText: { type: String, default: '可通行' }, blockedText: { type: String, default: '暂不可通行' }, description: { type: String, default: '门禁状态和权限由需求或既有接口注入。' }, fields: { type: Array, default: () => [] }, actionText: { type: String, default: '执行开门' } })
const emit = defineEmits(['open'])
</script>

<style scoped>
.page-shell { min-height: 100vh; padding: 16px; display: grid; align-content: start; gap: 16px; box-sizing: border-box; background: var(--van-background); color: var(--van-text-color); }
.page-header { min-height: 48px; display: flex; align-items: center; justify-content: space-between; }
.page-header h1 { margin: 0; font-size: 20px; line-height: 28px; }
.gate-card { padding: 24px 16px; border-radius: 16px; background: var(--van-background-2); text-align: center; }
.gate-icon { color: var(--van-primary-color); font-size: 40px; }
.gate-card h2 { margin: 12px 0 0; font-size: 18px; line-height: 24px; }
.gate-card p { margin: 8px 0 20px; color: var(--van-text-color-2); font-size: 14px; line-height: 20px; }
.gate-card dl { margin: 0; display: grid; gap: 8px; text-align: left; }
.gate-card dl div { display: flex; justify-content: space-between; gap: 12px; font-size: 14px; line-height: 20px; }
.gate-card dt { color: var(--van-text-color-3); }
.gate-card dd { margin: 0; color: var(--van-text-color); text-align: right; }
</style>
