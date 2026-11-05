<template>
  <figure class="hisense-qr" :class="{ 'hisense-qr--disabled': disabled }">
    <div class="hisense-qr__surface" role="img" :aria-label="altText">
      <span class="hisense-qr__finder hisense-qr__finder--top-left" />
      <span class="hisense-qr__finder hisense-qr__finder--top-right" />
      <span class="hisense-qr__finder hisense-qr__finder--bottom-left" />
      <span class="hisense-qr__pattern" aria-hidden="true" />
    </div>
    <figcaption v-if="caption">{{ caption }}</figcaption>
    <slot />
  </figure>
</template>

<script setup>
defineProps({
  caption: { type: String, default: '' },
  altText: { type: String, default: '二维码占位图，待注入业务二维码' },
  disabled: { type: Boolean, default: false }
})
</script>

<style scoped>
.hisense-qr { width: 232px; margin: 0 auto; text-align: center; }
.hisense-qr__surface { position: relative; width: 232px; height: 232px; padding: 16px; box-sizing: border-box; overflow: hidden; background: var(--van-background-2); }
.hisense-qr__pattern { position: absolute; inset: 16px; background: repeating-linear-gradient(45deg, var(--van-text-color) 0 3px, transparent 3px 7px), repeating-linear-gradient(-45deg, var(--van-text-color) 0 2px, transparent 2px 6px); opacity: 0.9; }
.hisense-qr__finder { position: absolute; z-index: 1; width: 48px; height: 48px; box-sizing: border-box; border: 8px solid var(--van-text-color); background: var(--van-background-2); }
.hisense-qr__finder::after { content: ''; position: absolute; inset: 8px; background: var(--van-text-color); }
.hisense-qr__finder--top-left { top: 16px; left: 16px; }
.hisense-qr__finder--top-right { top: 16px; right: 16px; }
.hisense-qr__finder--bottom-left { bottom: 16px; left: 16px; }
.hisense-qr figcaption { margin-top: 12px; color: var(--van-text-color-2); font-size: 14px; line-height: 20px; }
.hisense-qr--disabled { opacity: 0.45; }
</style>
