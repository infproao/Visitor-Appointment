<template>
  <button
    class="figma-button"
    :class="[`figma-button--${size}`, `figma-button--${form}`, { disabled: form === 'disabled' }]"
    :style="palette"
    :disabled="form === 'disabled' || loading"
    type="button"
    @click="emit('click', $event)"
  >
    <span v-if="loading">处理中</span>
    <slot v-else>{{ label }}</slot>
  </button>
</template>

<script setup>
import { computed } from 'vue'

// 视觉依据：用户 2026-11-06 提供的按钮变体截图（5 色系 × 3 形态）确定「色系 × 形态」结构。
// ⚠️ 2026-11-09 纠偏：teal 主色**不能**取自截图。截图逐格取色得到 #5AB9B2，与 Figma 实测差 47 个色阶，
// 而 #5AB9B2 在本仓库 token、SVG、Figma 节点里都**不存在**。
// 主色以 Figma / token 为准：Figma `button` 实例 fill #22BBB3 共 84 处（44 高 77 + 40 高 7），
// 对应 `design-tokens.md` 的主题色.primary-5 = #22BBB3（README / HANDOFF / 构建方案三处一致）。
// 其余 4 个色系与各色系禁用色**仍是截图取色，尚无节点或 token 依据**，保持原值、待确认。
const TONES = {
  teal:    { solid: '#22BBB3', text: '#FFFFFF', line: '#22BBB3', off: '#98D1CF', offBg: '#F5F5F5' },
  red:     { solid: '#E24F48', text: '#FFFFFF', line: '#E24F48', off: '#E39896', offBg: '#F5F5F5' },
  orange:  { solid: '#EF8432', text: '#FFFFFF', line: '#EF8432', off: '#EBB67F', offBg: '#F5F5F5' },
  green:   { solid: '#51B242', text: '#FFFFFF', line: '#51B242', off: '#8BCD90', offBg: '#F5F5F5' },
  neutral: { solid: '#F2F3F5', text: '#1E2128', line: '#E5E6EB', off: '#848589', offBg: '#F1F1F2' }
}

const props = defineProps({
  label: String,
  // 新口径：tone 色系 + form 形态
  tone: { type: String, default: '' },
  form: { type: String, default: '' },
  // 旧口径兼容：variant / disabled / size / block
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'normal' },
  disabled: Boolean,
  loading: Boolean,
  block: { type: Boolean, default: true }
})
const emit = defineEmits(['click'])

const resolvedTone = computed(() => props.tone || 'teal')
const resolvedForm = computed(() => {
  if (props.form) return props.form
  if (props.disabled) return 'disabled'
  if (props.variant === 'secondary') return 'outline'
  if (props.variant === 'tertiary') return 'outline'
  return 'solid'
})
const palette = computed(() => {
  const t = TONES[resolvedTone.value] || TONES.teal
  const f = resolvedForm.value
  const base = { width: props.block ? '100%' : 'auto' }
  if (f === 'outline') return { ...base, '--btn-bg': '#FFFFFF', '--btn-color': resolvedTone.value === 'neutral' ? t.text : t.line, '--btn-border': t.line }
  if (f === 'disabled') return { ...base, '--btn-bg': t.offBg, '--btn-color': t.off, '--btn-border': t.off }
  return { ...base, '--btn-bg': t.solid, '--btn-color': t.text, '--btn-border': t.solid }
})
</script>

<style scoped>
.figma-button {
  width: 100%;
  height: 44px;
  padding: 0 16px;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--btn-border);
  border-radius: 999px;
  color: var(--btn-color);
  background: var(--btn-bg);
  font: 500 16px/20px "PingFang SC", sans-serif;
  cursor: pointer;
}
.figma-button--solid { border-color: transparent; }
.figma-button.disabled { opacity: 1; }
/* 用户 2026-11-09 裁决：按钮分大 / 中 / 小三档，文字统一 16px（Figma label-text 16/20/w500）。
   用固定 height 而非 min-height，避免 border 撑高导致 44 变成 46。 */
.figma-button--large { height: 48px; padding: 0 20px; }
.figma-button--small { height: 32px; padding: 0 12px; }
</style>
