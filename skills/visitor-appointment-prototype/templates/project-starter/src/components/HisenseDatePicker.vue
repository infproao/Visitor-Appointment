<template>
  <van-popup v-model:show="visible" position="bottom" round class="hisense-date-picker">
    <div class="hisense-date-picker__header">
      <h2>{{ title }}</h2>
      <button type="button" aria-label="关闭日期选择" @click="visible = false"><van-icon name="cross" /></button>
    </div>
    <van-calendar
      :poppable="false"
      :show-title="false"
      :show-subtitle="true"
      :show-confirm="showConfirm"
      :confirm-text="confirmText"
      :color="primaryColor"
      :min-date="minDate || undefined"
      :max-date="maxDate || undefined"
      @confirm="handleConfirm"
    />
  </van-popup>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  show: { type: Boolean, default: false },
  modelValue: { type: String, default: '' },
  title: { type: String, default: '日期选择' },
  confirmText: { type: String, default: '确认' },
  minDate: { type: Date, default: undefined },
  maxDate: { type: Date, default: undefined },
  showConfirm: { type: Boolean, default: true },
  primaryColor: { type: String, default: 'var(--van-primary-color)' }
})
const emit = defineEmits(['update:show', 'update:modelValue', 'confirm'])
const visible = computed({ get: () => props.show, set: value => emit('update:show', value) })

function formatDate(date) {
  if (!(date instanceof Date)) return ''
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
function handleConfirm(value) {
  const date = Array.isArray(value) ? value[0] : value
  const formatted = formatDate(date)
  emit('update:modelValue', formatted)
  emit('confirm', { date, value: formatted })
  visible.value = false
}
</script>

<style scoped>
.hisense-date-picker { overflow: hidden; background: var(--van-background-2); }
.hisense-date-picker__header {
  position: relative;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--van-background-2);
}
.hisense-date-picker__header h2 { margin: 0; color: var(--van-text-color); font-size: 14px; font-weight: 600; line-height: 20px; }
.hisense-date-picker__header button {
  position: absolute;
  top: 4px;
  right: 8px;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 0;
  color: var(--van-text-color-3);
  background: transparent;
  font-size: 18px;
}
:deep(.van-calendar) { color: var(--van-text-color); background: var(--van-background-2); }
:deep(.van-calendar__confirm) { border-radius: 20px; background: var(--van-primary-color); }
</style>
