<template>
  <van-popup v-model:show="visible" position="bottom" round class="popup figma-popup-375" :teleport="popupTarget">
    <header>
      <span class="handle" />
      <h2>{{ title }}</h2>
      <button type="button" aria-label="关闭" @click="visible = false"><van-icon name="cross" /></button>
    </header>
    <div class="body"><slot /></div>
  </van-popup>
</template>

<script setup>
import { computed } from 'vue'
import { usePopupTeleport } from './usePopupTeleport.js'

const props = defineProps({ show: Boolean, title: String })
const emit = defineEmits(['update:show'])
const visible = computed({ get: () => props.show, set: value => emit('update:show', value) })
// 2026-11-10：弹层挂进 375 手机画布，避免相对桌面视口居中造成偏移
const popupTarget = usePopupTeleport()
</script>

<style scoped>
/* 弹层结构规范（用户 2026-11-13）：
   容器 #F2F3F5；action-header 默认 64px（min-height + 自动增高），标题不截断不隐藏、超出换行且不被关闭按钮遮挡；
   内容区左右边距 16px，内容卡 padding 16、块间距 12 —— list / form 类组件自带间距时不再叠加（纯列表 0），搜索 + 列表这类组合间距 12px；
   底部操作区（Bottom operation）16px padding、总高度最高 80px，由 ActionBar 组件或页面 footer 落实。 */
.popup { overflow: hidden; background: #F2F3F5; }
.popup header { position: relative; min-height: 64px; height: auto; padding: 20px 60px 12px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; }
.popup h2 { min-width: 0; max-width: 100%; margin: 0; color: #1D2129; font: 600 18px/24px "PingFang SC", sans-serif; text-align: center; white-space: normal; overflow-wrap: anywhere; word-break: break-word; }
.popup .handle { position: absolute; top: 8px; width: 40px; height: 4px; border-radius: 100px; background: #C9CDD4; }
.popup header button { position: absolute; top: 14px; right: 16px; width: 36px; height: 36px; padding: 0; display: flex; align-items: center; justify-content: center; border: 0; border-radius: 50%; color: #86909C; background: #FFFFFF; font-size: 16px; }
.popup header button :deep(.van-icon) { display: block; font-size: 16px; line-height: 16px; }
.body { padding: 0 16px 16px; }
.body :deep(.popup-actions) { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
</style>
