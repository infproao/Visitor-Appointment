<template>
  <van-popup v-model:show="visible" position="bottom" round class="language-popup figma-popup-375" :teleport="effectiveTeleport">
    <header class="language-popup__header">
      <span class="handle" />
      <div class="title-row">
        <h2>{{ title }}</h2>
      </div>
      <button class="close" type="button" @click="visible = false"><van-icon name="cross" /></button>
    </header>
    <div class="list">
      <button
        v-for="language in languages"
        :key="language.code"
        class="option"
        type="button"
        @click="select(language)"
      >
        <span>{{ language.label }}</span>
        <van-icon v-if="language.code === modelValue" name="success" />
      </button>
    </div>
  </van-popup>
</template>

<script setup>
import { computed } from 'vue'
import { usePopupTeleport } from './usePopupTeleport.js'

const props = defineProps({
  show: Boolean,
  title: { type: String, default: '切换语言' },
  // 不传时自动挂进 375 手机画布（组件库预览），独立页面挂 body
  teleport: { type: [String, Object], default: '' },
  languages: { type: Array, default: () => [] },
  modelValue: String
})
const emit = defineEmits(['update:show', 'update:modelValue', 'select'])
const visible = computed({ get: () => props.show, set: v => emit('update:show', v) })
const autoTeleport = usePopupTeleport()
const effectiveTeleport = computed(() => props.teleport || autoTeleport.value)
function select(x) {
  emit('update:modelValue', x.code)
  emit('select', x)
  visible.value = false
}
</script>

<!--
  Figma 依据：越南版-用户端 > 越南版访客预约填报 > 切换语言（4:4202）
  - cascader 375×357：背景 #F2F3F5、圆角 20 20 0 0
  - action-header 375×64：padding 8/16/8/16，标题「切换语言」18/24/w600
  - 关闭按钮 PillButton 36×36：白底、圆角 9999，距 header 顶 20、距右 16
  - body：padding 0/16/16/16
  - Frame 1 343×196：白底、圆角 12、gap 12、上下 padding 20
  - 每行 content 343×44：padding 10/16，文字 16/24/w500，勾选 #22BBB3
-->
<style scoped>
.language-popup { background: #F2F3F5; border-radius: 20px 20px 0 0; overflow: hidden; }
.language-popup__header { position: relative; height: 64px; padding: 8px 16px; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; gap: 8px; }
.handle { width: 40px; height: 4px; flex: 0 0 4px; border-radius: 100px; background: #C9CDD4; }
.title-row { flex: 1 1 auto; width: 100%; display: flex; align-items: center; justify-content: center; }
.title-row h2 { margin: 0; color: #1D2129; font: 600 18px/24px "PingFang SC", sans-serif; }
.close { position: absolute; top: 20px; right: 16px; width: 36px; height: 36px; padding: 0; display: flex; align-items: center; justify-content: center; border: 0; border-radius: 9999px; background: #FFFFFF; color: #262626; font-size: 16px; }
/* 用户 2026-11-09：圆形按钮里的 icon 要落在几何中心 —— icon 固定 16×16 的块级盒子，
   由 flex 居中，不再靠 van-icon 的行盒基线（Figma PillButton 内 Icon 36×36 里居中，偏移 10/10）。 */
.close :deep(.van-icon) { display: block; font-size: 16px; line-height: 16px; }

/* 列表卡片：上下 20、圆角 12、行间 12，无分割线 */
.list { margin: 0 16px 16px; padding: 20px 0; background: #FFFFFF; border-radius: 12px; }
.option { width: 100%; min-height: 44px; padding: 10px 16px; box-sizing: border-box; display: flex; align-items: center; justify-content: space-between; border: 0; background: transparent; color: #1D2129; font: 500 16px/24px "PingFang SC", sans-serif; text-align: left; }
.option + .option { margin-top: 12px; }
.option .van-icon { color: #22BBB3; font-size: 20px; }
</style>
