<template>
  <van-popup v-model:show="visible" position="bottom" round class="hisense-entry-popup">
    <div class="hisense-entry-popup__header">
      <h2>{{ title }}</h2>
      <button type="button" aria-label="关闭入境操作" @click="visible = false"><van-icon name="cross" /></button>
    </div>
    <div class="hisense-entry-popup__body">
      <div v-if="stepLabel" class="hisense-entry-popup__step">{{ stepLabel }}</div>
      <slot :step="step" :selected-member="selectedMember" />
    </div>
    <div class="hisense-entry-popup__footer">
      <HisenseButton variant="secondary" size="normal" @click="emit('cancel')">{{ cancelText }}</HisenseButton>
      <HisenseButton size="normal" :disabled="confirmDisabled" @click="emit('confirm', { step, selectedMember })">{{ confirmText }}</HisenseButton>
    </div>
  </van-popup>
</template>

<script setup>
import { computed } from 'vue'
import HisenseButton from './HisenseButton.vue'

const props = defineProps({
  show: { type: Boolean, default: false },
  title: { type: String, default: '入境操作' },
  step: { type: Number, default: 0 },
  stepLabel: { type: String, default: '' },
  selectedMember: { type: Object, default: null },
  confirmText: { type: String, default: '确认' },
  cancelText: { type: String, default: '取消' },
  confirmDisabled: { type: Boolean, default: false }
})
const emit = defineEmits(['update:show', 'confirm', 'cancel'])
const visible = computed({ get: () => props.show, set: value => emit('update:show', value) })
</script>

<style scoped>
.hisense-entry-popup { overflow: hidden; background: var(--van-background-2); }
.hisense-entry-popup__header { position: relative; min-height: 56px; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid var(--van-line-color); }
.hisense-entry-popup__header h2 { margin: 0; color: var(--van-text-color); font-size: 18px; line-height: 24px; }
.hisense-entry-popup__header button { position: absolute; top: 6px; right: 8px; width: 44px; height: 44px; padding: 0; border: 0; color: var(--van-text-color-3); background: transparent; font-size: 18px; }
.hisense-entry-popup__body { max-height: 60vh; overflow: auto; padding: 16px; }
.hisense-entry-popup__step { margin-bottom: 12px; color: var(--van-text-color-2); font-size: 14px; line-height: 20px; }
.hisense-entry-popup__footer { padding: 12px 16px 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; border-top: 1px solid var(--van-line-color); }
.hisense-entry-popup__footer :deep(.hisense-button) { min-height: 44px; }
</style>
