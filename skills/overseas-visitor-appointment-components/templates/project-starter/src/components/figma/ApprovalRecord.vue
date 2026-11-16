<template>
  <section class="approval-record">
    <div class="approval-groups">
      <article v-for="group in groups" :key="group.id || group.title" class="approval-group">
        <div class="group-marker" />
        <h3>{{ group.title }}</h3>
        <div class="group-line" />
        <div v-for="record in group.records" :key="record.id" class="approval-item">
          <div class="avatar">
            <img v-if="record.approver?.avatar" :src="record.approver.avatar" alt="" />
            <span v-else>{{ (record.approver?.name || '?').slice(0, 1) }}</span>
          </div>
          <div class="approval-main">
            <strong>{{ record.approver?.name }}</strong>
            <span class="status" :class="`status--${record.status || 'pending'}`">{{ record.statusLabel }}</span>
            <p v-if="record.comment">{{ record.comment }}</p>
          </div>
          <time v-if="record.handledAt">{{ record.handledAt }}</time>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
defineProps({
  groups: { type: Array, default: () => [] }
})
</script>

<style scoped>
.approval-record { width: 343px; overflow: hidden; border-radius: 12px; color: #1D2129; background: #FFFFFF; }
.approval-groups { padding: 16px; }
.approval-group { position: relative; padding: 0 0 20px 44px; }
.approval-group:last-child { padding-bottom: 4px; }
.group-marker { position: absolute; top: 7px; left: 12px; width: 8px; height: 8px; border-radius: 50%; background: #C9CDD4; }
.group-line { position: absolute; top: 22px; bottom: 0; left: 15px; width: 1px; background: #E5E6EB; }
.approval-group:last-child .group-line { display: none; }
/* 用户 2026-11-13 裁决：审批节点标题 16px；姓名 / 审批状态 13px 加粗；意见 / 日期 13px 常规。 */
.approval-group h3 { margin: 0 0 12px; color: #1D2129; font: 500 16px/24px "PingFang SC", sans-serif; }
.approval-item { position: relative; min-height: 56px; padding-right: 0; display: flex; align-items: flex-start; gap: 12px; }
.avatar { width: 36px; height: 36px; flex: 0 0 36px; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 50%; color: #FFFFFF; background: #C9CDD4; font: 600 16px/24px "PingFang SC", sans-serif; }
.avatar img { width: 100%; height: 100%; object-fit: cover; }
.approval-main { min-width: 0; flex: 1; display: block; }
.approval-main strong { display: block; color: #1D2129; font: 600 13px/20px "PingFang SC", sans-serif; }
.status { display: block; font: 600 13px/20px "PingFang SC", sans-serif; }
.status--approved { color: #23C343; }
.status--pending { color: #86909C; }
.status--rejected { color: #F53F3F; }
.approval-main p { width: 100%; margin: 2px 0 0; color: #86909C; font: 400 13px/20px "PingFang SC", sans-serif; }
.approval-item time { flex: 0 0 auto; color: #86909C; font: 400 13px/20px "PingFang SC", sans-serif; white-space: nowrap; }
</style>
