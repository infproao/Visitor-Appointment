<template>
  <van-popup v-model:show="visible" position="bottom" round class="hisense-language-popup">
    <div class="hisense-language-popup__handle" />
    <div class="hisense-language-popup__header">
      <h2>{{ title }}</h2>
      <button type="button" aria-label="关闭语言选择" @click="visible = false"><van-icon name="cross" /></button>
    </div>
    <button
      v-for="language in languages"
      :key="language.code"
      class="hisense-language-popup__option"
      type="button"
      @click="selectLanguage(language)"
    >
      <span>{{ language.label }}</span>
      <van-icon v-if="currentCode === language.code" name="success" />
    </button>
    <slot />
  </van-popup>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  show: { type: Boolean, default: false },
  languages: { type: Array, default: () => [] },
  modelValue: { type: [String, Object], default: '' },
  title: { type: String, default: '语言' }
})
const emit = defineEmits(['update:show', 'update:modelValue', 'select'])
const visible = computed({ get: () => props.show, set: value => emit('update:show', value) })
const currentCode = computed(() => typeof props.modelValue === 'object' ? props.modelValue?.code : props.modelValue)

function selectLanguage(language) {
  emit('update:modelValue', language)
  emit('select', language)
  visible.value = false
}
</script>

<style scoped>
.hisense-language-popup { overflow: hidden; padding: 8px 16px 16px; background: var(--van-background-2); }
.hisense-language-popup__handle { width: 36px; height: 4px; margin: 0 auto 8px; border-radius: 2px; background: var(--van-border-color); }
.hisense-language-popup__header { position: relative; height: 48px; display: flex; align-items: center; justify-content: center; }
.hisense-language-popup__header h2 { margin: 0; color: var(--van-text-color); font-size: 18px; font-weight: 600; }
.hisense-language-popup__header button { position: absolute; top: 2px; right: -8px; width: 44px; height: 44px; padding: 0; border: 0; color: var(--van-text-color-3); background: transparent; font-size: 18px; }
.hisense-language-popup__option { width: 100%; min-height: 48px; padding: 0 8px; display: flex; align-items: center; justify-content: space-between; border: 0; border-bottom: 1px solid var(--van-line-color); color: var(--van-text-color); background: transparent; font: inherit; font-size: 16px; text-align: left; }
.hisense-language-popup__option .van-icon { color: var(--van-primary-color); font-size: 20px; }
</style>
