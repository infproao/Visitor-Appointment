<template>
  <nav class="hisense-tabs" role="tablist">
    <button v-for="item in items" :key="item.key || item.label" class="hisense-tabs__item" :class="{ active: current === (item.key || item.label) }" type="button" role="tab" @click="select(item.key || item.label)">
      {{ item.label || item }}
    </button>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ items: { type: Array, default: () => [] }, modelValue: { type: [String, Number], default: '' } })
const emit = defineEmits(['update:modelValue', 'change'])
const current = computed(() => props.modelValue || props.items[0]?.key || props.items[0]?.label || props.items[0] || '')
function select(value) { emit('update:modelValue', value); emit('change', value) }
</script>

<style scoped>
.hisense-tabs { width: 100%; height: 42px; display: flex; border-bottom: 1px solid #E5E6EB; }
.hisense-tabs__item { position: relative; flex: 1; height: 42px; padding: 0 8px; border: 0; color: #86909C; background: transparent; font-family: "PingFang SC", sans-serif; font-size: 14px; line-height: 22px; }
.hisense-tabs__item.active { color: #00AAA6; font-weight: 600; }
.hisense-tabs__item.active::after { content: ''; position: absolute; left: 50%; bottom: -1px; width: 40px; height: 2px; transform: translateX(-50%); background: #00AAA6; }
</style>
