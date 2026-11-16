<template>
  <!-- tabs-line：默认 343×42（Figma 1623:20291）；安保端 tabs-line 为 375×40 白底，
       一律用 prop 表达，页面不得用 class 覆盖 display / width / height（会顶掉内部 flex 布局）。 -->
  <nav class="tabs" :style="navStyle">
    <button
      v-for="item in items"
      :key="keyOf(item)"
      :class="{ active: current === keyOf(item) }"
      type="button"
      @click="select(keyOf(item))"
    >
      {{ labelOf(item) }}
    </button>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  items: { type: Array, default: () => [] },
  modelValue: { type: [String, Number], default: '' },
  // 撑满父容器：安保端详情页 tabs-line 是 375 满宽，默认卡片内为 343
  full: { type: Boolean, default: false },
  // 条高：默认 42，安保端 tabs-line 为 40
  height: { type: Number, default: 42 },
  // 条体背景：默认透明（跟随页面），安保端为白底
  background: { type: String, default: 'transparent' }
})

const emit = defineEmits(['update:modelValue', 'change'])

const keyOf = item => (item && typeof item === 'object' ? item.key ?? item.label : item)
const labelOf = item => (item && typeof item === 'object' ? item.label ?? item.key : item)

const current = computed(() => props.modelValue || keyOf(props.items[0]) || '')

// 尺寸/底色只能由 prop 决定：页面 class 与组件 scoped 样式特异性相同，后声明者胜，
// 页面一旦写 display:block 就会让 button 的 flex:1 失效（按钮退回内容宽），tab 不再撑满。
const navStyle = computed(() => ({
  width: props.full ? '100%' : '343px',
  height: `${props.height}px`,
  background: props.background
}))

function select(value) {
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<style scoped>
.tabs {
  display: flex;
  box-sizing: border-box;
  /* 用 inset 阴影代替 border-bottom：既不占高度（height prop 可精确等于设计稿），
     也不会因为页面覆盖 height 而多出 1px */
  box-shadow: inset 0 -1px 0 #E5E6EB;
}
.tabs button {
  position: relative;
  flex: 1 1 0;
  height: 100%;
  padding: 0 8px;
  border: 0;
  color: #86909C;
  background: transparent;
  font: 400 14px/22px "PingFang SC", sans-serif;
  cursor: pointer;
}
.tabs button.active {
  color: #00AAA6;
  font-weight: 600;
}
.tabs button.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 40px;
  height: 2px;
  transform: translateX(-50%);
  background: #00AAA6;
}
</style>
