<template>
  <!-- UserCard / VehicleCard 的共享内部基座（不导出、不进画廊）。
       视觉基准：新建预约「同行人 / 车辆」卡片 1087:25323 / 1087:25329 —— 343×? / pad 16 / gap 12 / r12，
       添加按钮 311×40 / r20 / 1px #E5E6EB / 16-20 w500 / 左侧 16 加号。
       full 由页面传入以撑满 343 内容区；padding 也可由页面按设计稿给定，禁止用页面 CSS 覆盖。
       加号图标：Figma 1087:25328 的按钮实例带 16×16 plus，但用户 2026-11-11 截图（空态变体）只有居中文字，
       故 addIcon 默认 false，需要 Figma 原态时显式开启。 -->
  <article class="list-card" :class="{ 'list-card--full': full }" :style="{ padding: `${padding}px` }">
    <header class="list-card__header">
      <h3>{{ title }}<span v-if="count !== null && count !== undefined">（{{ count }}）</span></h3>
    </header>
    <div class="list-card__content">
      <slot />
    </div>
    <button v-if="showAdd" type="button" class="list-card__add" @click="emit('add')">
      <IconBox v-if="addIcon" class="list-card__add-icon" name="plus" :size="16" color="#1D2129" />
      {{ addLabel }}
    </button>
    <button v-if="showMore" type="button" class="list-card__more" aria-label="查看更多" @click="emit('more')">更多<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5L6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" /></svg></button>
  </article>
</template>

<script setup>
import IconBox from './IconBox.vue'

defineProps({
  title: { type: String, required: true },
  count: { type: [String, Number], default: null },
  addLabel: { type: String, default: '' },
  showAdd: Boolean,
  showMore: Boolean,
  // 添加按钮左侧 16×16 加号：默认关闭（用户 11-11 空态截图无加号）
  addIcon: Boolean,
  // 撑满父容器（内容区 343）：页面级宽度差异走 prop，不靠页面 CSS 覆盖
  full: Boolean,
  // 卡片内边距：默认 12（旧 311 卡片口径），新建预约设计稿为 16
  padding: { type: Number, default: 12 }
})
const emit = defineEmits(['add', 'more'])
</script>

<style scoped>
.list-card { width: 311px; box-sizing: border-box; border-radius: 12px; background: #FFFFFF; color: #1D2129; }
.list-card--full { width: 100%; }
.list-card__header { min-height: 24px; display: flex; align-items: center; }
.list-card__header h3 { margin: 0; color: #1D2129; font: 600 16px/24px "PingFang SC", sans-serif; }
.list-card__content { display: flex; flex-direction: column; gap: 12px; margin-top: 12px; }
.list-card__content:empty { display: none; }
.list-card__add {
  position: relative;
  width: 100%;
  height: 40px;
  margin-top: 12px;
  padding: 10px 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #E5E6EB;
  border-radius: 20px;
  color: #1D2129;
  background: #FFFFFF;
  font: 500 16px/20px "PingFang SC", sans-serif;
  cursor: pointer;
}
.list-card__add-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); }
.list-card__more { display: flex; width: max-content; align-items: center; justify-content: center; gap: 2px; margin: 12px auto 0; padding: 0; border: 0; color: #22BBB3; background: transparent; font: 400 16px/24px "PingFang SC", sans-serif; }
.list-card__more svg { width: 12px; height: 12px; display: block; }
</style>
