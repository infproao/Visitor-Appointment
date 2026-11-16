<template>
  <!-- 通用确认弹窗：Figma「——模板—— > 通用组件 > dialog」1623:20467（311×176 / r16 / #FFFFFF）。
       结构：文案展示 311×128（pad 26/24、gap 8；标题 18/24 w600 #1D2129，正文 16/22 w400 #86909C，居中）
             + 操作区 311×48（两个 155.5×48 按钮）。
       2026-11-12 用户裁决：左「返回」#1D2129、右「同意并继续」#00AAA6（取消在左、确认在右）。
       操作区按钮是 Figma `button` 实例的「白底 + 1px #F2F3F5 描边」变体，不在 Button 组件的 5 色系 × 3 形态内，
       因此在本组件内按实例实现，避免为这一个变体污染 Button 的 15 个既有变体。 -->
  <van-popup
    v-model:show="visible"
    position="center"
    class="figma-dialog"
    :teleport="popupTarget"
    :close-on-click-overlay="false"
  >
    <div class="figma-dialog__content">
      <h2 v-if="title">{{ title }}</h2>
      <p v-if="message">{{ message }}</p>
      <slot />
    </div>
    <div class="figma-dialog__actions">
      <button v-if="showCancel" type="button" class="figma-dialog__button" @click="onCancel">{{ cancelText }}</button>
      <button type="button" class="figma-dialog__button figma-dialog__button--confirm" @click="onConfirm">{{ confirmText }}</button>
    </div>
  </van-popup>
</template>

<script setup>
import { computed } from 'vue'
import { usePopupTeleport } from './usePopupTeleport.js'

const props = defineProps({
  show: Boolean,
  title: { type: String, default: '提示' },
  message: { type: String, default: '' },
  confirmText: { type: String, default: '确定' },
  cancelText: { type: String, default: '取消' },
  showCancel: { type: Boolean, default: true }
})
const emit = defineEmits(['update:show', 'confirm', 'cancel'])
const popupTarget = usePopupTeleport()
const visible = computed({
  get: () => props.show,
  set: value => emit('update:show', value)
})
function onConfirm() { emit('confirm'); visible.value = false }
function onCancel() { emit('cancel'); visible.value = false }
</script>

<style scoped>
.figma-dialog { width: 311px; max-width: calc(100% - 32px); box-sizing: border-box; overflow: hidden; border-radius: 16px; background: #FFFFFF; }
/* 文案展示：pad 26/24/26/24、gap 8；标题 24 + 正文 2×22 + 8 + 52 = 128，加操作区 48 = 176 */
.figma-dialog__content { min-height: 128px; padding: 26px 24px; box-sizing: border-box; display: flex; flex-direction: column; gap: 8px; text-align: center; }
.figma-dialog__content h2 { margin: 0; color: #1D2129; font: 600 18px/24px "PingFang SC", sans-serif; }
.figma-dialog__content p { margin: 0; color: #86909C; font: 400 16px/22px "PingFang SC", sans-serif; white-space: pre-line; }
/* 操作区：311×48；两个按钮各占一半，白底 + 1px #F2F3F5 描边，中间一条竖分隔线。
   上边框用 inset box-shadow 而不是 border-top：Figma 是 INSIDE 0.5–1px 描边，用 border 会把 176 撑成 177。 */
.figma-dialog__actions { display: flex; height: 48px; box-shadow: inset 0 1px 0 #F2F3F5; }
.figma-dialog__button { flex: 1 1 0; min-width: 0; height: 48px; padding: 0 16px; box-sizing: border-box; border: 0; background: #FFFFFF; color: #1D2129; font: 500 16px/22px "PingFang SC", sans-serif; cursor: pointer; }
.figma-dialog__button + .figma-dialog__button { border-left: 1px solid #F2F3F5; }
.figma-dialog__button--confirm { color: #00AAA6; }
.figma-dialog__button:active { background: #F7F8FA; }
</style>
