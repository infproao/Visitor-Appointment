<template>
  <!-- 动作栏三种样式（用户 2026-11-13 截图）：
       · dual      取消 / 提交 —— 审批、表单提交等双操作
       · selection 已选择摘要 + up 箭头 / 确定(N) —— 成员选择（对齐 MemberSelectionFlow 的 46 高 action-bar 口径）
       · auth      Additional Authorization 扫码入口 + 取消 / 下一步 —— 入园操作
       按钮一律复用 Button（teal × outline/solid），图标一律复用 IconBox，不自绘胶囊与箭头。 -->
  <div class="figma-action-bar" :class="`figma-action-bar--${variant}`">
    <template v-if="variant === 'dual'">
      <Button :label="cancelText" tone="teal" form="outline" @click="emit('cancel')" />
      <Button :label="resolvedConfirm" tone="teal" form="solid" @click="emit('confirm')" />
    </template>

    <template v-else-if="variant === 'selection'">
      <button class="figma-action-bar__selection" type="button" :disabled="!count" @click="emit('selection')">
        <span class="figma-action-bar__summary">{{ resolvedSelectionText }}</span>
        <IconBox name="up" :size="14" color="#22BBB3" />
      </button>
      <Button :label="count ? `${resolvedConfirm}(${count})` : resolvedConfirm" tone="teal" form="solid" @click="emit('confirm')" />
    </template>

    <template v-else>
      <button class="figma-action-bar__auth" type="button" @click="emit('scan')">
        <IconBox name="scan-qr-code" :size="20" color="#1D2129" />
        <span>Additional<br />Authorization</span>
      </button>
      <Button :label="cancelText" tone="teal" form="outline" @click="emit('cancel')" />
      <Button :label="resolvedConfirm" tone="teal" form="solid" @click="emit('confirm')" />
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Button from './Button.vue'
import IconBox from './IconBox.vue'

const props = defineProps({
  variant: { type: String, default: 'dual' },
  cancelText: { type: String, default: '取消' },
  confirmText: { type: String, default: '' },
  // 已选摘要：可变文案一律完整展示并换行，不写省略号 / 截断（design-principles.md 第六节）
  selectionText: { type: String, default: '' },
  count: { type: Number, default: 0 }
})
const emit = defineEmits(['cancel', 'confirm', 'selection', 'scan'])

const CONFIRM_DEFAULTS = { dual: '提交', selection: '确定', auth: '下一步' }
const resolvedConfirm = computed(() => props.confirmText || CONFIRM_DEFAULTS[props.variant] || '提交')
const resolvedSelectionText = computed(() => props.selectionText || `已选择：${props.count}项`)
</script>

<style scoped>
.figma-action-bar { width: 100%; display: grid; align-items: center; gap: 12px; }
.figma-action-bar--dual { grid-template-columns: 1fr 1fr; }
.figma-action-bar--selection { grid-template-columns: minmax(0, 1fr) 1fr; }
.figma-action-bar--auth { grid-template-columns: 56px minmax(0, 1fr) minmax(0, 1fr); }

/* 已选摘要：完整文案 + 换行，不做 ellipsis；箭头固定 14×14 不参与压缩 */
.figma-action-bar__selection { min-width: 0; display: flex; align-items: center; gap: 8px; padding: 0; border: 0; color: #22BBB3; background: transparent; text-align: left; font: 400 14px/20px "PingFang SC", sans-serif; cursor: pointer; }
.figma-action-bar__selection:disabled { opacity: .5; cursor: default; }
.figma-action-bar__summary { min-width: 0; white-space: normal; overflow-wrap: anywhere; word-break: break-word; }
.figma-action-bar__selection svg { flex: 0 0 auto; }

/* 附加授权：20×20 扫码图标 + 两行完整文案（不截断）。
   高度预算（用户 2026-11-13 底部操作规范：16px padding、总高 ≤80px）：20 图标 + 28 两行文字 + 32 上下 padding = 80，图标与文字之间不额外加 gap */
.figma-action-bar__auth { min-width: 0; padding: 0; display: grid; justify-items: center; gap: 0; border: 0; color: #1D2129; background: transparent; text-align: center; font: 400 12px/14px "PingFang SC", sans-serif; cursor: pointer; white-space: normal; overflow-wrap: anywhere; word-break: break-word; }
</style>
