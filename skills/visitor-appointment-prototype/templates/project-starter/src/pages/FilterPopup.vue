<template>
  <van-popup v-model:show="visible" position="bottom" round class="filter-popup">
    <div class="filter-popup__header"><h2>{{ title }}</h2><button type="button" aria-label="关闭筛选" @click="visible = false"><van-icon name="cross" /></button></div>
    <section v-for="group in groups" :key="group.key" class="filter-popup__group"><h3>{{ group.label }}</h3><div class="filter-popup__options"><button v-for="option in group.options || []" :key="option.value || option" type="button" :class="{ selected: selected[group.key] === (option.value || option) }" @click="select(group.key, option.value || option)">{{ option.label || option }}</button></div></section>
    <div class="filter-popup__footer"><HisenseButton variant="secondary" size="normal" @click="reset">{{ resetText }}</HisenseButton><HisenseButton size="normal" @click="apply">{{ applyText }}</HisenseButton></div>
  </van-popup>
</template>

<script setup>
import { computed, reactive } from 'vue'
import HisenseButton from '../components/HisenseButton.vue'
const props = defineProps({ show: { type: Boolean, default: false }, title: { type: String, default: '筛选' }, groups: { type: Array, default: () => [] }, modelValue: { type: Object, default: () => ({}) }, resetText: { type: String, default: '重置' }, applyText: { type: String, default: '确定' } })
const emit = defineEmits(['update:show', 'update:modelValue', 'apply'])
const visible = computed({ get: () => props.show, set: value => emit('update:show', value) })
const selected = reactive({ ...props.modelValue })
function select(key, value) { selected[key] = value }
function reset() { Object.keys(selected).forEach(key => delete selected[key]); emit('update:modelValue', {}); emit('apply', {}) }
function apply() { const result = { ...selected }; emit('update:modelValue', result); emit('apply', result); visible.value = false }
</script>

<style scoped>
.filter-popup { overflow: hidden; padding-bottom: 20px; background: var(--van-background-2); }
.filter-popup__header { position: relative; min-height: 56px; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid var(--van-line-color); }
.filter-popup__header h2 { margin: 0; font-size: 18px; line-height: 24px; }
.filter-popup__header button { position: absolute; top: 6px; right: 8px; width: 44px; height: 44px; padding: 0; border: 0; color: var(--van-text-color-3); background: transparent; font-size: 18px; }
.filter-popup__group { padding: 16px; }
.filter-popup__group h3 { margin: 0 0 12px; color: var(--van-text-color-2); font-size: 14px; font-weight: 500; line-height: 20px; }
.filter-popup__options { display: flex; flex-wrap: wrap; gap: 8px; }
.filter-popup__options button { min-height: 32px; padding: 4px 12px; border: 1px solid var(--van-border-color); border-radius: 16px; color: var(--van-text-color-2); background: var(--van-background-2); font: inherit; font-size: 14px; }
.filter-popup__options button.selected { border-color: var(--van-primary-color); color: var(--van-primary-color-dark); background: color-mix(in srgb, var(--van-primary-color) 12%, var(--van-background-2)); }
.filter-popup__footer { padding: 12px 16px 0; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; border-top: 1px solid var(--van-line-color); }
.filter-popup__footer :deep(.hisense-button) { min-height: 44px; }
</style>
