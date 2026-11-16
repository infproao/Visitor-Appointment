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
      <button class="figma-action-bar__auth" type="button" :aria-label="authLabel" :title="authLabel" @click="emit('scan')">
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
// 附加授权入口在 84px 窄列里，英文两行是图标主标签的文字补充；无障碍名称给中文，避免读屏念出拆行英文
const authLabel = '附加授权'
</script>

<style scoped>
.figma-action-bar { width: 100%; display: grid; align-items: center; gap: 12px; }
.figma-action-bar--dual { grid-template-columns: 1fr 1fr; }
.figma-action-bar--selection { grid-template-columns: minmax(0, 1fr) 1fr; }
.figma-action-bar--auth { grid-template-columns: 84px minmax(0, 1fr) minmax(0, 1fr); }

/* 已选摘要：完整文案 + 换行，不做 ellipsis；箭头固定 14×14 不参与压缩 */
.figma-action-bar__selection { min-width: 0; display: flex; align-items: center; gap: 8px; padding: 0; border: 0; color: #22BBB3; background: transparent; text-align: left; font: 400 14px/20px "PingFang SC", sans-serif; cursor: pointer; }
.figma-action-bar__selection:disabled { opacity: .5; cursor: default; }
.figma-action-bar__summary { min-width: 0; white-space: normal; overflow-wrap: anywhere; word-break: break-word; }
.figma-action-bar__selection svg { flex: 0 0 auto; }

/* 附加授权：设计稿（图2）里它是「图标 + 两行英文」的纯入口，不画底色、不描边；
   两行英文是多语言适配的写法（用户 2026-11-15 明确保留），所以不改成中文、不缩成单行。
   之前几轮误当成「按钮没有背景」，上一版给过 #F2F3F5 / #E5E6EB 两块底色，这一版按设计去掉。
   高度口径：图标 20 + 两行文字 26 = 46 ≤ 页脚 80 减去上下 16 padding 的 48，文字完整显示、不被裁掉。 */
.figma-action-bar__auth { min-width: 0; height: 48px; padding: 0 4px; box-sizing: border-box; display: grid; justify-items: center; align-content: center; gap: 0; border: 0; border-radius: 8px; color: #1D2129; background: transparent; text-align: center; font: 400 11px/13px "PingFang SC", sans-serif; cursor: pointer; white-space: normal; overflow: hidden; }
.figma-action-bar__auth:hover { background: rgba(29, 33, 41, .06); }
</style>
