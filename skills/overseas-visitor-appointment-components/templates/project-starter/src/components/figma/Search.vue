<template>
  <div class="figma-search" :class="{ 'figma-search--disabled': disabled, 'figma-search--with-prefix': $slots.prefix, 'figma-search--with-scan': scan }">
    <!-- 图标 = 设计稿放大镜 path 原样提取（泰国.svg x588 y669 处，11.5px 圆环+柄），assets/figma-search-icon.svg 为同源文件 -->
    <svg class="figma-search__icon" viewBox="585.5 666.5 15.5 15.5" width="20" height="20" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M588.009 669.01C590.352 666.667 594.151 666.667 596.495 669.01C598.678 671.194 598.828 674.642 596.941 676.998L599.324 679.381L598.38 680.323L595.998 677.941C593.642 679.827 590.193 679.679 588.009 677.495C585.666 675.152 585.666 671.353 588.009 669.01ZM595.552 669.953C593.73 668.131 590.775 668.131 588.953 669.953C587.13 671.776 587.13 674.73 588.953 676.553C590.775 678.375 593.73 678.375 595.552 676.553C597.375 674.73 597.374 671.776 595.552 669.953Z" fill="#86909C" /></svg>
    <div v-if="$slots.prefix" class="figma-search__prefix"><slot name="prefix" /></div>
    <input
      class="figma-search__input"
      type="text"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="onInput"
      @keyup.enter="onEnter"
      @compositionstart="composing = true"
      @compositionend="onCompositionEnd"
    />
    <button v-if="clearable && modelValue" class="figma-search__clear" type="button" aria-label="清空" @click="clear">
      <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><circle cx="8" cy="8" r="7" fill="#C9CDD4" /><path d="M5.6 5.6l4.8 4.8M10.4 5.6l-4.8 4.8" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round" /></svg>
    </button>
    <!-- 2026-11-13 用户「搜索组件加入一个扫码样式」：右侧取景框图标复用 IconBox 的 scan-qr-code，不自绘 SVG -->
    <button v-if="scan" class="figma-search__scan" type="button" aria-label="扫码" @click="emit('scan')">
      <IconBox name="scan-frame" :size="20" color="#86909C" />
    </button>
    <slot />
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref } from 'vue'
import IconBox from './IconBox.vue'

// 2026-11-10 用户裁决：搜索框有**两种样式**，按是否带前置下拉区分（不再统一 56 高）：
//  · 不带下拉（默认）：高 32、圆角 17、padding 12 —— Figma「整合页面 > 泰国 > 搜索园区精确到门」
//    1822:38312 > content 343×32（padding 12/12/6/6、r17、icon 16、文字 14/20）。
//  · 带前置下拉（#prefix）：高 40、圆角 4、padding 12 —— Figma「安保端-搜索页」
//    1035:8201 > content 307×38（≈40，padding 12/12/8/8、r4）。
// 颜色取自 token：底 gray-2 #F2F3F5、正文 #1D2129、占位 #C9CDD4、分隔线 #E5E6EB。
// 图标取自设计稿 SVG 原始 path（用户 2026-11-09 裁决：搜索 icon 用设计稿的，不自绘）。
//
// 2026-11-13 新增：
//  · scan：右侧扫码入口，emit('scan')，图标走 IconBox 唯一来源。
//  · trigger：'input'（即时，默认）/ 'debounce'（防抖 debounceMs）/ 'enter'（回车或软键盘搜索键）。
//    「延迟触发还是回车触发」按使用场景的对比已交给用户裁决；做成 prop 是为了裁决后改一行即可，
//    不需要再改组件内部。三种模式下回车都作为立即搜索的兜底；输入法组合期间不触发，避免泰语 / 中文误发。
const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '请输入搜索关键词' },
  clearable: { type: Boolean, default: true },
  disabled: Boolean,
  scan: Boolean,
  trigger: { type: String, default: 'input' },
  debounceMs: { type: Number, default: 300 }
})
const emit = defineEmits(['update:modelValue', 'search', 'scan'])

let timer
const composing = ref(false)
function fire(value) {
  if (props.trigger === 'enter') return
  if (props.trigger === 'debounce') {
    clearTimeout(timer)
    timer = setTimeout(() => emit('search', value), props.debounceMs)
    return
  }
  emit('search', value)
}
function onInput(event) {
  const value = event.target.value
  emit('update:modelValue', value)
  if (!composing.value) fire(value)
}
function onCompositionEnd(event) {
  composing.value = false
  fire(event.target.value)
}
function onEnter(event) {
  if (composing.value) return
  clearTimeout(timer)
  emit('search', event.target.value)
}
function clear() {
  emit('update:modelValue', '')
  fire('')
}
onBeforeUnmount(() => clearTimeout(timer))
</script>

<style scoped>
/* 不带下拉：32 高 / r17（Figma 1822:38312） */
.figma-search { width: 100%; height: 32px; padding: 0 12px; box-sizing: border-box; display: flex; align-items: center; gap: 8px; border-radius: 17px; background: #F2F3F5; }
/* 带前置下拉：40 高 / r4（Figma 1035:8201） */
.figma-search--with-prefix { height: 40px; border-radius: 4px; }
.figma-search--disabled { opacity: .5; }
.figma-search__icon { flex: 0 0 auto; display: block; }
.figma-search__prefix { flex: 0 0 auto; display: flex; align-items: center; padding-right: 8px; border-right: 1px solid #E5E6EB; }
.figma-search__input { min-width: 0; flex: 1; height: 100%; border: 0; outline: none; color: #1D2129; background: transparent; font: 400 14px/20px "PingFang SC", sans-serif; }
.figma-search__input::placeholder { color: #C9CDD4; }
.figma-search__clear { flex: 0 0 auto; width: 16px; height: 16px; padding: 0; border: 0; background: transparent; cursor: pointer; }
.figma-search__clear svg { display: block; }
.figma-search__scan { flex: 0 0 auto; width: 20px; height: 20px; padding: 0; border: 0; display: flex; align-items: center; justify-content: center; background: transparent; cursor: pointer; }
.figma-search__scan svg { display: block; }
</style>
