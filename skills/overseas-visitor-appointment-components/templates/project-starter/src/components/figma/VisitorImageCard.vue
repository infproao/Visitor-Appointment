<template>
  <!-- 业务卡片样式①「带图片摘要」——泰国安保端出入登记列表用这条（用户 2026-11-15：
       四种卡片样式分别用于 ①泰国安保端 ②用户端预约记录 ③来访历史 ④越南安保端，安保端出入登记原先误用了预约记录卡）。
       结构：左侧访客照片 80×112 + 右侧日期/状态、标题 18/24 w600、来访公司 / 被访部门 / 预约编号 14/22 #86909C。
       Figma 组合演示「业务卡片样式」第 1 张；卡片 343×156 / padding 16 / radius 12 / 白底。 -->
  <article class="visitor-image-card" role="button" tabindex="0" @click="emit('open')" @keydown.enter="emit('open')" @keydown.space.prevent="emit('open')">
    <div class="visitor-image-card__photo" :class="{ 'visitor-image-card__photo--image': image }">
      <img v-if="image" :src="image" alt="" />
      <span v-else>访客</span>
    </div>
    <div class="visitor-image-card__copy">
      <div class="visitor-image-card__meta">
        <span>{{ date }}</span>
        <Tag :label="status" :status="statusKey" />
      </div>
      <h3>{{ title }}</h3>
      <p>来访公司：{{ company }}</p>
      <p>被访部门：{{ department }}</p>
      <p>预约编号：{{ number }}</p>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import Tag from './Tag.vue'

const props = defineProps({
  date: { type: String, default: '09–09' },
  title: { type: String, default: '张三等 10 人－车辆2' },
  status: { type: String, default: '已通过' },
  company: { type: String, default: '无限进步' },
  department: { type: String, default: '显示事业部' },
  number: { type: String, default: 'VS20250728001' },
  image: { type: String, default: '' }
})
const emit = defineEmits(['open'])

// 状态色沿用组件库 Tag 的业务键：已通过绿、审批中黄、未通过红、已过期灰
const statusKey = computed(() => ({ 已通过: 'approved', 审批中: 'approving', 未通过: 'rejected', 已取消: 'cancelled', 已过期: 'expired' })[props.status] || 'approving')
</script>

<style scoped>
.visitor-image-card { width: 343px; min-height: 156px; padding: 16px; box-sizing: border-box; display: flex; gap: 12px; border-radius: 12px; color: #1D2129; background: #FFFFFF; cursor: pointer; -webkit-tap-highlight-color: transparent; transition: background-color .15s ease; }
.visitor-image-card:hover { background: #F7F8FA; }
.visitor-image-card:active { background: #F2F3F5; }
.visitor-image-card:focus-visible { outline: 2px solid #22BBB3; outline-offset: 2px; }
/* 照片位：没有真实照片时用渐变占位 + 底部「访客」小条，尺寸与设计一致 80×112、r4 */
.visitor-image-card__photo { width: 80px; height: 112px; flex: 0 0 80px; display: flex; align-items: flex-end; justify-content: center; overflow: hidden; border-radius: 4px; color: rgba(255, 255, 255, .85); background: linear-gradient(160deg, #C6D5D3 0%, #8FA9A5 55%, #405D5C 100%); font: 500 12px/20px "PingFang SC", sans-serif; }
.visitor-image-card__photo span { width: 100%; padding: 4px 0; background: rgba(29, 33, 41, .28); text-align: center; }
.visitor-image-card__photo img { width: 100%; height: 100%; object-fit: cover; }
.visitor-image-card__copy { min-width: 0; flex: 1; }
.visitor-image-card__meta { min-height: 24px; display: flex; align-items: center; gap: 8px; color: #86909C; font: 400 16px/24px "PingFang SC", sans-serif; }
.visitor-image-card__meta :deep(.figma-tag) { flex: 0 0 auto; }
.visitor-image-card h3 { margin: 8px 0 4px; color: #1D2129; font: 600 18px/24px "PingFang SC", sans-serif; overflow-wrap: anywhere; word-break: break-word; }
.visitor-image-card p { margin: 4px 0 0; color: #86909C; font: 400 14px/22px "PingFang SC", sans-serif; overflow-wrap: anywhere; word-break: break-word; }
</style>
