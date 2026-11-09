<template>
  <article class="registration-card">
    <header>
      <strong>{{ record.title || '2026/3/23日访问瑞嘉工业园区' }}</strong>
      <Tag :label="record.status || '审批中'" :status="record.status === '已通过' ? 'success' : 'warning'" />
    </header>
    <div class="details">
      <span>访问园区：{{ record.park || '瑞嘉工业园区' }}</span>
      <span>接访人：{{ record.host || 'zhansna' }}</span>
      <span>预约编号：{{ record.number || 'VS20250728001' }}</span>
    </div>
    <button class="qr" type="button" aria-label="查看二维码" @click="$emit('qr')">
      <img :src="qrPlaceholder" alt="二维码占位" />
    </button>
  </article>
</template>

<script setup>
import Tag from './Tag.vue'
import qrPlaceholder from '../../assets/qr-placeholder.png'

defineProps({ record: { type: Object, default: () => ({}) } })
defineEmits(['qr'])
</script>

<style scoped>
.registration-card { position: relative; width: 351px; min-height: 156px; padding: 12px; box-sizing: border-box; border-radius: 12px; background: #FFFFFF; }
.registration-card header { display: flex; flex-direction: column; align-items: flex-start; gap: 8px; }
.registration-card header strong { color: #1D2129; font: 600 16px/24px "PingFang SC", sans-serif; }
.details { display: flex; flex-direction: column; gap: 4px; margin-top: 8px; color: #86909C; font: 400 14px/22px "PingFang SC", sans-serif; }
.qr { position: absolute; right: 12px; bottom: 28px; width: 40px; height: 40px; padding: 0; border: 0; background: transparent; }
.qr img { display: block; width: 40px; height: 40px; object-fit: contain; }
</style>
