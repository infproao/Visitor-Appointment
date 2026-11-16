<template>
  <section class="figma-collapse" :class="{ 'figma-collapse--open': isOpen, 'figma-collapse--disabled': disabled }">
    <button class="figma-collapse__header" type="button" :aria-expanded="isOpen" :disabled="disabled" @click="toggle">
      <span class="figma-collapse__title">{{ title }}</span>
      <span v-if="$slots.extra" class="figma-collapse__extra"><slot name="extra" /></span>
      <IconBox v-if="showIcon" class="figma-collapse__arrow" :class="{ 'figma-collapse__arrow--open': isOpen }" name="down" :size="12" color="#86909C" />
    </button>
    <div v-show="isOpen" class="figma-collapse__body"><slot /></div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import IconBox from './IconBox.vue'

// Figma「——模板—— > 通用组件 > collapse-item」1722:27223 / 1688:24312（343×370 = header 343×40 + body slot 343×330）。
// 只做「标题行 + 可折叠内容槽」，不承载业务视觉；长标题一律换行（design-principles.md 第六节）。
const props = defineProps({
  title: { type: String, default: '' },
  defaultOpen: { type: Boolean, default: true },
  disabled: Boolean,
  showIcon: { type: Boolean, default: true }
})
const emit = defineEmits(['change'])
const isOpen = ref(props.defaultOpen)
function toggle() {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  emit('change', isOpen.value)
}
defineExpose({ toggle, isOpen })
</script>

<style scoped>
.figma-collapse { width: 100%; box-sizing: border-box; overflow: hidden; border-radius: 12px; background: #FFFFFF; }
.figma-collapse__header { width: 100%; min-height: 40px; padding: 8px 16px; box-sizing: border-box; display: flex; align-items: center; gap: 8px; border: 0; color: #1D2129; background: transparent; text-align: left; cursor: pointer; }
.figma-collapse__title { min-width: 0; flex: 1; font: 600 16px/24px "PingFang SC", sans-serif; white-space: normal; overflow-wrap: anywhere; word-break: break-word; }
.figma-collapse__extra { flex: 0 0 auto; color: #86909C; font: 400 13px/20px "PingFang SC", sans-serif; }
.figma-collapse__arrow { flex: 0 0 auto; display: block; transition: transform .2s ease; }
.figma-collapse__arrow--open { transform: rotate(180deg); }
.figma-collapse__body { padding: 0 16px 16px; }
.figma-collapse--disabled .figma-collapse__header { cursor: default; opacity: .5; }
</style>
