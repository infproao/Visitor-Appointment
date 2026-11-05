<template>
  <article class="hisense-registration-card">
    <div class="hisense-registration-card__topline">
      <div class="hisense-registration-card__identity"><strong>{{ record.name || '待补充姓名' }}</strong><span v-if="record.company">{{ record.company }}</span></div>
      <HisenseTag :label="record.status || '待确认'" :status="tagStatus" />
    </div>
    <dl class="hisense-registration-card__details">
      <div v-for="field in fields" :key="field.key"><dt>{{ field.label }}</dt><dd>{{ record[field.key] || '待补充' }}</dd></div>
    </dl>
    <div v-if="$slots.actions" class="hisense-registration-card__actions"><slot name="actions" /></div>
    <slot />
  </article>
</template>

<script setup>
import { computed } from 'vue'
import HisenseTag from './HisenseTag.vue'

const props = defineProps({ record: { type: Object, default: () => ({}) }, fields: { type: Array, default: () => [{ key: 'visitDate', label: '预约日期' }, { key: 'visitorCount', label: '访客人数' }] } })
const tagStatus = computed(() => { const status = String(props.record.status || ''); if (/通过|入园|完成/.test(status)) return 'success'; if (/拒绝|退回|过期|取消/.test(status)) return 'danger'; return 'warning' })
</script>

<style scoped>
.hisense-registration-card { padding: 16px; border-radius: 12px; color: #1D2129; background: #FFFFFF; }
.hisense-registration-card__topline { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
.hisense-registration-card__identity { min-width: 0; display: flex; flex-direction: column; gap: 4px; }
.hisense-registration-card__identity strong { font-size: 16px; font-weight: 600; line-height: 24px; }
.hisense-registration-card__identity span { color: #4E5969; font-size: 14px; line-height: 20px; }
.hisense-registration-card__details { margin: 12px 0 0; display: grid; gap: 8px; }
.hisense-registration-card__details div { display: flex; justify-content: space-between; gap: 16px; font-size: 14px; line-height: 20px; }
.hisense-registration-card__details dt { color: #86909C; }
.hisense-registration-card__details dd { max-width: 65%; margin: 0; color: #1D2129; text-align: right; overflow-wrap: anywhere; }
.hisense-registration-card__actions { margin-top: 12px; padding-top: 12px; border-top: 1px solid #F2F3F5; }
</style>
