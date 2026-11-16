<template>
  <div class="select-list" :class="{ 'select-list--padded': padded }">
    <button
      v-for="option in options"
      :key="option.value || option"
      class="select-item"
      :class="{ selected: (option.value || option) === modelValue }"
      type="button"
      @click="select(option)"
    >
      <span>{{ option.text || option }}</span>
      <span v-if="(option.value || option) === modelValue" class="check">✓</span>
    </button>
  </div>
</template>

<script setup>
// Figma「——模板—— > 通用组件 > Select List」1721:27132：343×156、pad 0、gap 12、r12、无分割线；
// 行 content 343×44（padding 16/16/10/10）。组件本体保持 padding 0。
// 弹层里的卡片另按「底部抽屉」1623:20325 > Slot 343×184（padding 16 四边）补上下 16 内边距，
// 由 padded 开启（用户 2026-11-10「卡片的边距不对」）。
defineProps({
  options: { type: Array, default: () => [] },
  modelValue: { type: [String, Number], default: '' },
  padded: Boolean
})
const emit = defineEmits(['update:modelValue', 'select'])
function select(option) {
  const value = option.value || option
  emit('update:modelValue', value)
  emit('select', option)
}
</script>

<style scoped>
.select-list { width: 100%; display: flex; flex-direction: column; gap: 12px; padding: 0; background: #fff; border-radius: 12px; overflow: hidden; }
.select-list--padded { padding: 16px 0; }
.select-item { width: 100%; min-height: 44px; padding: 10px 16px; box-sizing: border-box; display: flex; align-items: center; justify-content: space-between; border: 0; color: #1D2129; background: #fff; font: 500 16px/24px "PingFang SC", sans-serif; text-align: left; }
/* Figma 1721:27132：行间只有 12 间距，没有分割线 */
.select-item .check { color: #00AAA6; font-size: 20px; font-weight: 600; }
</style>
