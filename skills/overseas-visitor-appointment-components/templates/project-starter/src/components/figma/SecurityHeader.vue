<template>
  <!-- 安保端页头（navbar-web）：白底 44 高、左「返回 + 关闭」、居中标题、右侧可选「更多」。
       Figma「安保端 > 详情」1042:17750 > navbar-web(375×88) > wrapper(375×44 / pad 12/16)：
       · wrapper：padding 12/16、主轴居中 → 标题 17/18 w500 #1D2129 落在水平正中
       · left：56×20（两个 20×20 图标 + 16 间距），距左 16
       · more：20×20（竖向三点），距右 16；访客端页面无此图标，默认不渲染
       原型不实现浏览器/系统状态栏，故只还原 44 高的导航条本体，与其余页面 header 口径一致。 -->
  <header class="security-header">
    <div class="security-header__left">
      <button class="security-header__icon" type="button" aria-label="返回" @click="emit('back')">
        <IconBox name="arrow-left" :size="20" color="#1D2129" />
      </button>
      <button class="security-header__icon" type="button" aria-label="关闭" @click="emit('close')">
        <IconBox name="close" :size="20" color="#1D2129" />
      </button>
    </div>
    <h1 class="security-header__title">{{ title }}</h1>
    <slot name="right" />
  </header>
</template>

<script setup>
import IconBox from './IconBox.vue'

defineProps({ title: { type: String, required: true } })
const emit = defineEmits(['back', 'close'])
</script>

<style scoped>
.security-header { position: relative; height: 44px; padding: 12px 16px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; background: #FFFFFF; }
.security-header__left { position: absolute; left: 16px; display: flex; align-items: center; gap: 16px; }
.security-header__icon { width: 20px; height: 20px; padding: 0; border: 0; display: inline-flex; align-items: center; justify-content: center; background: transparent; cursor: pointer; }
.security-header__title { margin: 0; color: #1D2129; font: 500 17px/18px "PingFang SC", sans-serif; }
</style>
