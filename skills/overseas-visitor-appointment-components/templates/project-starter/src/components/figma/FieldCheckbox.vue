<template>
  <section class="figma-field-checkbox">
    <div class="figma-field-checkbox__title"><i v-if="required">*</i><span>{{ label }}</span></div>
    <div class="figma-field-checkbox__options">
      <Checkbox v-if="selectAll" :model-value="allSelected" size="lg" @update:model-value="toggleAll">{{ selectAllLabel }}</Checkbox>
      <Checkbox
        v-for="option in normalizedOptions"
        :key="option.value"
        :model-value="selected.includes(option.value)"
        size="lg"
        @update:model-value="toggle(option.value, $event)"
      >{{ option.label }}</Checkbox>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import Checkbox from './Checkbox.vue'

// Figma「——模板—— > 通用组件 > field-checkbox」1687:24203（319×168 = field-title 319×24 + Right 319×116）。
// 复选框一律复用 Checkbox.vue（size="lg" 20×20 / r4），本组件只做「字段标题 + 复选组 + 全选」的编排，不自绘勾选框。
const props = defineProps({
  label: { type: String, default: '' },
  required: Boolean,
  options: { type: Array, default: () => [] },
  modelValue: { type: Array, default: () => [] },
  selectAll: Boolean,
  selectAllLabel: { type: String, default: '全选' }
})
const emit = defineEmits(['update:modelValue', 'change'])

const normalizedOptions = computed(() => props.options.map((item) => (
  typeof item === 'string' ? { label: item, value: item } : { label: item.label ?? item.text, value: item.value ?? item.label }
)))
const selected = computed(() => (Array.isArray(props.modelValue) ? props.modelValue : []))
const allSelected = computed(() => normalizedOptions.value.length > 0 && normalizedOptions.value.every((o) => selected.value.includes(o.value)))

function commit(next) {
  emit('update:modelValue', next)
  emit('change', next)
}
function toggle(value, checked) {
  const next = new Set(selected.value)
  if (checked) next.add(value)
  else next.delete(value)
  commit([...next])
}
function toggleAll(checked) {
  commit(checked ? normalizedOptions.value.map((o) => o.value) : [])
}
</script>

<style scoped>
.figma-field-checkbox { width: 100%; }
.figma-field-checkbox__title { min-height: 24px; display: flex; align-items: center; gap: 2px; color: #4E5969; font: 500 16px/24px "PingFang SC", sans-serif; white-space: normal; overflow-wrap: anywhere; word-break: break-word; }
.figma-field-checkbox__title i { flex: 0 0 auto; color: #F53F3F; font: 400 14px/24px "PingFang SC", sans-serif; font-style: normal; }
.figma-field-checkbox__options { margin-top: 8px; display: grid; gap: 12px; }
</style>
