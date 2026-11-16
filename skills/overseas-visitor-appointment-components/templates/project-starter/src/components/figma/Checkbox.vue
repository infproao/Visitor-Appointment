<template>
  <label class="figma-checkbox" :class="[`figma-checkbox--${size}`, { 'figma-checkbox--disabled': disabled }]">
    <input class="hidden" type="checkbox" :checked="modelValue" :disabled="disabled" @change="emit('update:modelValue', $event.target.checked)" />
    <span class="box" :class="{ checked: modelValue }">{{ modelValue ? '✓' : '' }}</span>
    <span><slot /></span>
  </label>
</template>

<script setup>
// 视觉依据：Figma「——模板—— > 通用组件 > checkbox」1551:11134（162×22，勾选框 14×14 / r2）。
// size="lg"：成员选择等列表场景用 Figma「选择入园人员」1803:33585 的 .radio-icon —— 20×20 / r4 / 1px #C9CDD4。
// 只改尺寸与描边规格，选中色与打勾方式保持一致，避免页面里再自绘复选框。
// disabled（用户 2026-11-15「未认证 / 已入园的无法勾选」）：灰底 + 灰描边 + 不可点，对齐设计稿里的禁用态。
defineProps({
  modelValue: Boolean,
  size: { type: String, default: 'md' },
  disabled: Boolean
})
const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
.figma-checkbox{min-height:22px;display:flex;align-items:center;gap:8px;color:#1D2129;font:400 14px/22px "PingFang SC",sans-serif;cursor:pointer}
.hidden{position:absolute;width:1px;height:1px;opacity:0}
.box{width:14px;height:14px;flex:0 0 14px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;overflow:hidden;border:2px solid #E5E6EB;border-radius:2px;color:#fff;background:#fff;font-size:11px;font-weight:700;line-height:14px}
.box.checked{border-color:#00AAA6;background:#00AAA6}
.figma-checkbox--lg{min-height:20px}
.figma-checkbox--lg .box{width:20px;height:20px;flex:0 0 20px;border-width:1px;border-color:#C9CDD4;border-radius:4px;font-size:13px;line-height:20px}
.figma-checkbox--lg .box.checked{border-color:#00AAA6}
/* 禁用态（已入园 / 未认证）：整行不可点，勾选框灰底灰边 */
.figma-checkbox--disabled{cursor:not-allowed}
.figma-checkbox--disabled .box,.figma-checkbox--lg.figma-checkbox--disabled .box{border-color:#E5E6EB;background:#F2F3F5}
.figma-checkbox--disabled>span{color:#86909C}
/* 多语言长文案（泰语 / 英语）不截断、不隐藏、不溢出：允许换行。
   勾选框贴首行顶部，单行时仍与原来居中位置一致（22 行高 − 14 盒 = 8，上下各 4）。 */
.figma-checkbox>span:last-child{min-width:0;white-space:normal;overflow-wrap:anywhere;word-break:break-word}
.figma-checkbox .box{align-self:flex-start;margin-top:4px}
.figma-checkbox--lg .box{margin-top:0}
</style>
