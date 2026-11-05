<template>
  <van-popup v-model:show="visible" position="bottom" round class="hisense-select-popup">
    <div class="hisense-select-popup__header">
      <h2>{{ title }}</h2>
      <button type="button" aria-label="关闭选择" @click="visible = false"><van-icon name="cross" /></button>
    </div>
    <div class="hisense-select-popup__list">
      <button v-for="option in normalizedColumns" :key="option.value" class="hisense-select-popup__item" type="button" @click="select(option)">
        <span>{{ option.text }}</span>
        <van-icon v-if="option.value === modelValue" name="success" />
      </button>
    </div>
  </van-popup>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  show: { type: Boolean, default: false },
  title: { type: String, default: '请选择' },
  columns: { type: Array, default: () => [] },
  modelValue: { type: [String, Number], default: '' }
})
const emit = defineEmits(['update:show', 'update:modelValue', 'confirm'])
const visible = computed({ get: () => props.show, set: value => emit('update:show', value) })
const normalizedColumns = computed(() => props.columns.map(option => typeof option === 'object' ? option : { text: option, value: option }))
function select(option) { emit('update:modelValue', option.value); emit('confirm', { selectedOptions: [option] }); visible.value = false }
</script>

<style scoped>
.hisense-select-popup { overflow: hidden; background: #FFFFFF; }
.hisense-select-popup__header { position: relative; height: 56px; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid #F2F3F5; }
.hisense-select-popup__header h2 { margin: 0; color: #1D2129; font-size: 18px; font-weight: 600; line-height: 24px; }
.hisense-select-popup__header button { position: absolute; top: 6px; right: 8px; width: 44px; height: 44px; padding: 0; border: 0; color: #86909C; background: transparent; font-size: 18px; }
.hisense-select-popup__list { padding: 0 16px 20px; background: #FFFFFF; }
.hisense-select-popup__item { width: 100%; min-height: 44px; padding: 10px 0; display: flex; align-items: center; justify-content: space-between; border: 0; border-bottom: 1px solid #F2F3F5; color: #1D2129; background: #FFFFFF; font-family: "PingFang SC", sans-serif; font-size: 16px; line-height: 24px; text-align: left; }
.hisense-select-popup__item .van-icon { color: #00AAA6; font-size: 20px; }
</style>
