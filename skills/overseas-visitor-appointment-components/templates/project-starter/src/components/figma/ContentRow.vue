<template>
  <div class="content-row">
    <span class="flag" />
    <i v-if="required" class="required">*</i>
    <strong class="title">{{ title }}</strong>
    <span v-if="code" class="code">{{ code }}</span>
    <svg v-if="checked" class="check" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3 10.5l4.5 4.5L17 5.5" fill="none" stroke="#22BBB3" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </div>
</template>

<script setup>
// Figma Node 1686:23205「content」343×44，主组件 36:3918，body slot。
// 实测子层：国旗 32×24、required 8×24、title「泰国」、title「+66」、check 20×20。
defineProps({
  title: { type: String, default: '泰国' },
  code: { type: String, default: '+66' },
  required: Boolean,
  checked: { type: Boolean, default: true }
})
</script>

<style scoped>
.content-row { width: 343px; height: 44px; display: flex; align-items: center; gap: 8px; background: #FFFFFF; color: #1D2129; }
.flag { width: 32px; height: 24px; flex: 0 0 32px; background: linear-gradient(to bottom, #A51931 0 16.67%, #F4F5F8 16.67% 33.33%, #2D2A4A 33.33% 66.67%, #F4F5F8 66.67% 83.33%, #A51931 83.33% 100%); }
.required { color: #F53F3F; font: 400 14px/24px "PingFang SC", sans-serif; font-style: normal; }
.title { font: 400 16px/24px "PingFang SC", sans-serif; }
.code { color: #86909C; font: 400 16px/24px "PingFang SC", sans-serif; }
.check { width: 20px; height: 20px; margin-left: auto; }
</style>
