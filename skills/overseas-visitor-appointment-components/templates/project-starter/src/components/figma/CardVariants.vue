<template>
  <section class="card-variants">
    <article class="business-card business-card--visitor-image">
      <div class="card-photo" aria-hidden="true"><span>访客</span></div>
      <div class="card-copy">
        <div class="card-meta"><span>09–09</span><Tag label="已通过" status="success" /></div>
        <h3>张三等 10 人－车辆2</h3>
        <p>来访公司：无限进步</p>
        <p>被访部门：显示事业部</p>
        <p>预约编号：VS20250728001</p>
      </div>
    </article>

    <article class="business-card business-card--visitor">
      <div class="card-meta"><span>09–09</span><Tag label="已通过" status="success" /></div>
      <h3>张三等 10 人－车辆2</h3>
      <p>来访公司：无限进步</p>
      <p>来访人：张三</p>
      <p>预约编号：VS20250728001</p>
    </article>

    <article class="business-card business-card--entry">
      <div class="card-meta"><strong>2026/8/23来访</strong></div>
      <div class="entry-status"><Tag label="已到访" status="success" /><span>审批人：张三</span><span>人数：4</span></div>
      <p>与市场部团队洽谈 2026 年第二季度合作项目的详细方案，涵盖生产排期、交付时间节点，并实地参观生产车间与成品仓库</p>
    </article>

    <AppointmentRecordCard :record="registration" />
  </section>
</template>

<script setup>
import Tag from './Tag.vue'
import AppointmentRecordCard from './AppointmentRecordCard.vue'

defineProps({ registration: { type: Object, default: () => ({}) } })
</script>

<style scoped>
.card-variants { width: 343px; display: grid; gap: 16px; }
.business-card { width: 343px; min-height: 156px; padding: 16px; box-sizing: border-box; border-radius: 12px; color: #1D2129; background: #FFFFFF; }
.business-card--visitor-image { display: flex; gap: 12px; }
.card-photo { width: 80px; height: 112px; flex: 0 0 80px; display: flex; align-items: flex-end; justify-content: center; overflow: hidden; border-radius: 4px; color: rgba(255,255,255,.85); background: linear-gradient(160deg, #C6D5D3 0%, #8FA9A5 55%, #405D5C 100%); font: 500 12px/20px "PingFang SC", sans-serif; }
.card-photo span { width: 100%; padding: 4px 0; background: rgba(29,33,41,.28); text-align: center; }
.card-copy { min-width: 0; flex: 1; }
.card-meta { min-height: 24px; display: flex; align-items: center; gap: 8px; color: #86909C; font: 400 16px/24px "PingFang SC", sans-serif; }
.card-meta :deep(.figma-tag) { flex: 0 0 auto; }
.business-card h3 { margin: 8px 0 4px; color: #1D2129; font: 600 18px/24px "PingFang SC", sans-serif; }
.business-card p { margin: 4px 0 0; color: #86909C; font: 400 14px/22px "PingFang SC", sans-serif; }
.business-card--visitor { min-height: 156px; }
.business-card--entry { min-height: 156px; }
.business-card--entry .card-meta strong { color: #1D2129; font: 600 18px/24px "PingFang SC", sans-serif; }
.entry-status { display: flex; align-items: center; gap: 12px; margin-top: 8px; color: #86909C; font: 400 14px/22px "PingFang SC", sans-serif; }
.entry-status :deep(.figma-tag) { flex: 0 0 auto; }
.business-card--entry p { margin-top: 8px; line-height: 22px; }
.card-variants :deep(.registration-card) { width: 343px; }
</style>
