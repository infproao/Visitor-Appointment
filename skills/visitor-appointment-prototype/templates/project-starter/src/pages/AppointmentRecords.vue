<template>
  <main class="page-shell">
    <header class="page-header"><h1>{{ title }}</h1><slot name="header-actions" /></header>
    <van-search v-model="keyword" :placeholder="searchPlaceholder" />
    <section v-if="filteredRecords.length" class="record-list">
      <article v-for="record in filteredRecords" :key="record.id" class="record-card" @click="emit('select', record)">
        <div class="record-card__header"><strong>{{ record.title || record.company || '待补充预约' }}</strong><HisenseTag :label="record.status || '待确认'" :status="record.tagStatus || 'warning'" size="small" /></div>
        <p>{{ record.visitDate || '待补充日期' }} · {{ record.visitorName || '待补充访客' }}</p>
        <div class="record-card__footer"><span>{{ record.id || '待补充编号' }}</span><HisenseButton variant="tertiary" size="small" :block="false" @click.stop="emit('pass', record)">{{ passText }}</HisenseButton></div>
      </article>
    </section>
    <slot v-else name="empty"><AppointmentRecordsEmpty :title="emptyTitle" :action-text="emptyActionText" @create="emit('create')" /></slot>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import HisenseButton from '../components/HisenseButton.vue'
import HisenseTag from '../components/HisenseTag.vue'
import AppointmentRecordsEmpty from './AppointmentRecordsEmpty.vue'

const props = defineProps({ title: { type: String, default: '预约记录' }, records: { type: Array, default: () => [] }, searchPlaceholder: { type: String, default: '搜索预约记录' }, passText: { type: String, default: '查看通行证' }, emptyTitle: { type: String, default: '暂无预约记录' }, emptyActionText: { type: String, default: '新建预约' } })
const emit = defineEmits(['select', 'pass', 'create'])
const keyword = ref('')
const filteredRecords = computed(() => { const value = keyword.value.trim().toLowerCase(); return value ? props.records.filter(record => JSON.stringify(record).toLowerCase().includes(value)) : props.records })
</script>

<style scoped>
.page-shell { min-height: 100vh; padding: 16px; box-sizing: border-box; background: var(--van-background); color: var(--van-text-color); }
.page-header { min-height: 48px; display: flex; align-items: center; justify-content: space-between; }
h1 { margin: 0; font-size: 20px; line-height: 28px; }
.record-list { margin-top: 12px; display: grid; gap: 12px; }
.record-card { padding: 16px; border-radius: 12px; background: var(--van-background-2); }
.record-card__header, .record-card__footer { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.record-card__header strong { font-size: 16px; line-height: 24px; }
.record-card p { margin: 12px 0; color: var(--van-text-color-2); font-size: 14px; line-height: 20px; }
.record-card__footer { border-top: 1px solid var(--van-line-color); padding-top: 8px; color: var(--van-text-color-3); font-size: 12px; }
.record-card__footer :deep(.hisense-button) { min-height: 32px; }
</style>
