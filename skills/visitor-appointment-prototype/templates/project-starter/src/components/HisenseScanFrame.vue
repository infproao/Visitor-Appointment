<template>
  <section class="hisense-scan-frame" :class="`hisense-scan-frame--${status}`" :aria-label="ariaLabel">
    <div class="hisense-scan-frame__viewport">
      <div class="hisense-scan-frame__corners" aria-hidden="true" />
      <div v-if="status === 'scanning'" class="hisense-scan-frame__line" aria-hidden="true" />
      <div class="hisense-scan-frame__message">{{ message }}</div>
    </div>
    <p class="hisense-scan-frame__hint">{{ hint }}</p>
    <div class="hisense-scan-frame__actions">
      <HisenseButton variant="secondary" size="normal" @click="emit('album')">{{ albumText }}</HisenseButton>
      <HisenseButton v-if="status !== 'scanning'" size="normal" @click="emit('retry')">{{ retryText }}</HisenseButton>
    </div>
    <slot />
  </section>
</template>

<script setup>
import HisenseButton from './HisenseButton.vue'

defineProps({
  status: { type: String, default: 'scanning' },
  message: { type: String, default: '请将二维码放入框内' },
  hint: { type: String, default: '扫一扫仅提供前端模拟取景，待接入扫码能力' },
  albumText: { type: String, default: '从相册选择' },
  retryText: { type: String, default: '重新扫码' },
  ariaLabel: { type: String, default: '扫码取景区域' }
})
const emit = defineEmits(['album', 'retry'])
</script>

<style scoped>
.hisense-scan-frame { min-height: 100%; padding: 32px 16px; box-sizing: border-box; color: var(--van-background-2); background: var(--van-text-color); text-align: center; }
.hisense-scan-frame__viewport { position: relative; width: min(280px, 100%); height: 280px; margin: 0 auto; display: flex; align-items: center; justify-content: center; border-radius: 16px; background: color-mix(in srgb, var(--van-text-color) 72%, var(--van-text-color-2)); }
.hisense-scan-frame__corners { position: absolute; inset: 36px; border: 3px solid var(--van-primary-color); border-radius: 8px; }
.hisense-scan-frame__line { position: absolute; left: 44px; right: 44px; top: 50%; height: 2px; background: var(--van-primary-color); box-shadow: 0 0 12px var(--van-primary-color); }
.hisense-scan-frame__message { position: absolute; bottom: 48px; left: 16px; right: 16px; color: var(--van-background-2); font-size: 14px; line-height: 20px; }
.hisense-scan-frame__hint { margin: 16px 0; color: var(--van-text-color-4); font-size: 12px; line-height: 20px; }
.hisense-scan-frame__actions { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.hisense-scan-frame__actions :deep(.hisense-button) { min-height: 44px; }
.hisense-scan-frame__actions :deep(.hisense-button--secondary) { color: var(--van-background-2); border-color: var(--van-background-2); background: transparent; }
</style>
