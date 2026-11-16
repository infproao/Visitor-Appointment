<template>
  <span class="figma-tag" :class="[`tag-${status}`, `size-${size}`, { 'figma-tag--soft': variant === 'soft' }]">
    <IconBox v-if="icon" class="figma-tag__icon" :name="icon" :size="iconSize" :color="iconColor" />
    {{ label }}
  </span>
</template>
<script setup>
import IconBox from './IconBox.vue'

// variant: solid（默认，实心色块）/ soft（Figma「安保端 > 详情」1042:17750 的灰底 tag：24 高 / pad 2·8 / r4 / #F2F3F5 底 + #1D2129 字 14/20）
// status: 通用 success/warning/danger/info/neutral/primary，或业务状态
//   approving / approved / rejected / cancelled / expired / entered / exited（见下方状态色表）
// icon: 可选前置图标（IconBox 图标名，14×14）；soft 变体内 icon 与文字 gap 4。
defineProps({
  label: String,
  status: { type: String, default: 'neutral' },
  size: { type: String, default: 'small' },
  variant: { type: String, default: 'solid' },
  icon: String,
  iconSize: { type: [Number, String], default: 14 },
  iconColor: { type: String, default: '#4E5969' }
})
</script>
<style scoped>
.figma-tag { display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; color: #FFFFFF; font: 600 12px/20px "PingFang SC", sans-serif; white-space: nowrap; }
.size-small { min-height: 20px; padding: 0 8px; border-radius: 999px; }
.size-medium { min-height: 24px; padding: 2px 8px; border-radius: 999px; }
.size-large { min-height: 28px; padding: 4px 12px; border-radius: 999px; font-size: 14px; }
/* soft 变体必须在 .tag-* 之后声明且提高特异性，否则默认 status=neutral 的 #C9CDD4 会盖掉灰底 */
.figma-tag.figma-tag--soft { min-height: 24px; padding: 2px 8px; border-radius: 4px; color: #1D2129; background: #F2F3F5; font: 400 14px/20px "PingFang SC", sans-serif; }
.figma-tag__icon { flex: 0 0 auto; margin-right: 4px; }
.tag-success { background: #23C343; }
.tag-warning { background: #F9CC45; }
.tag-danger { background: #F76560; }
.tag-info { background: #165DFF; }
.tag-neutral { background: #C9CDD4; }
.tag-primary { background: #22BBB3; }
/* 用户 2026-11-12 状态色截图（流程 tag / 人员状态 tag 各 5 种），颜色按截图像素取色。
   保留上面通用 status 不动，业务状态用独立键，避免影响既有页面。 */
.tag-approving { background: #F2CE5F; }   /* 审批中 / 未到访 */
.tag-approved { background: #5EC055; }    /* 已通过 / 已到访 */
.tag-rejected { background: #E66E66; }    /* 已拒绝 */
.tag-cancelled { background: #505968; }   /* 已取消 */
.tag-expired { background: #88909B; }     /* 已过期 / 已完成 */
.tag-entered { background: #ACDA4A; }     /* 已入园 */
.tag-exited { background: #8551D3; }      /* 已出园 */
</style>
