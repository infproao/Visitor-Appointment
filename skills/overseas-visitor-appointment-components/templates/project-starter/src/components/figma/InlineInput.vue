<template>
  <span class="inline-input" :style="{ background }">
    <span v-if="before" class="icon icon--before" aria-hidden="true">
      <svg viewBox="0 0 14 14"><circle cx="7" cy="4.5" r="2.4" /><path d="M2.2 12c.4-2.6 2.3-4 4.8-4s4.4 1.4 4.8 4" /></svg>
    </span>
    <span class="text">{{ text }}</span>
    <span v-if="after" class="icon icon--after" aria-hidden="true">
      <svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="5.6" /><path d="M7 4.2v3.4M7 9.6v.1" /></svg>
    </span>
  </span>
</template>

<script setup>
// Figma Node 1893:20270「input」62×22，主组件 13:8238，属性「状态」。
// 实测：绿色胶囊 #23C343 + 白字「已通过」+ addBefore(user 14×14) / addAfter(info-circle 14×14)。
// 视觉上是一个「行内状态标签」，不是文本输入框；名称沿用 Figma 节点名，是否改名待确认。
defineProps({
  text: { type: String, default: '已通过' },
  background: { type: String, default: '#23C343' },
  before: Boolean,
  after: { type: Boolean, default: true }
})
</script>

<style scoped>
.inline-input { height: 22px; padding: 0 4px; box-sizing: border-box; display: inline-flex; align-items: center; gap: 2px; border-radius: 999px; color: #FFFFFF; font: 400 14px/22px "PingFang SC", sans-serif; }
.text { white-space: nowrap; }
.icon { width: 14px; height: 14px; flex: 0 0 14px; }
.icon svg { display: block; width: 14px; height: 14px; fill: none; stroke: #FFFFFF; stroke-width: 1.2; stroke-linecap: round; stroke-linejoin: round; }
.icon--after svg { fill: #FFFFFF; stroke: none; }
.icon--after svg path { stroke: #23C343; stroke-width: 1.4; }
</style>
