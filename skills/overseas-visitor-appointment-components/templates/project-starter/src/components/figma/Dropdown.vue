<template>
  <div class="figma-dropdown">
    <button
      class="figma-dropdown__trigger"
      type="button"
      :style="triggerWidth ? { width: triggerWidth + 'px' } : undefined"
      @click="show = true"
    >
      <span class="figma-dropdown__label">{{ current ? current.label : placeholder }}</span>
      <svg class="figma-dropdown__arrow" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d="M2.5 4.5L6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
    </button>
    <Popup v-model:show="show" :title="popupTitle || placeholder">
      <SelectList :options="selectOptions" :model-value="modelValue" padded @select="select" />
    </Popup>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import Popup from './Popup.vue'
import SelectList from './SelectList.vue'

// 视觉依据：安保端「访客出入登记」筛选行 —— 触发文案最多 5 个字、超出省略，宽 80px（设计稿标注）。
// 2026-11-09 用户裁决：选项列表不用自绘浮层，统一走 Popup 底部抽屉 + SelectList（与语言/日期选择同模式）；
// 触发器文字与箭头用 flex 居中 + 12×12 SVG 箭头水平对齐（不用字符 ⌄，字形基线会导致箭头偏移）。
const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  options: { type: Array, default: () => [] },
  placeholder: { type: String, default: '请选择' },
  // 触发器固定宽度（px）；不传则自适应内容
  triggerWidth: { type: Number, default: 0 },
  // 抽屉标题；缺省用 placeholder
  popupTitle: { type: String, default: '' }
})
const emit = defineEmits(['update:modelValue', 'change'])
const show = ref(false)
const normalized = computed(() => props.options.map(option => {
  if (typeof option === 'object') return { label: option.label ?? option.text, value: option.value }
  return { label: String(option), value: option }
}))
const selectOptions = computed(() => normalized.value.map(option => ({ text: option.label, value: option.value })))
const current = computed(() => normalized.value.find(option => option.value === props.modelValue))
function select(option) {
  show.value = false
  emit('update:modelValue', option.value)
  emit('change', option.value)
}
</script>

<style scoped>
.figma-dropdown { position: relative; display: inline-flex; }
.figma-dropdown__trigger { width: 100%; min-height: 24px; padding: 0; border: 0; display: inline-flex; align-items: center; justify-content: space-between; gap: 4px; color: #1D2129; background: transparent; font: 400 14px/20px "PingFang SC", sans-serif; cursor: pointer; }
.figma-dropdown__label { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.figma-dropdown__arrow { flex: 0 0 auto; display: block; color: #86909C; }
</style>
