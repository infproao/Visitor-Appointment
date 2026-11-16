<template>
  <PageFrame :title="t('app.title')" variant="detail" :embedded="embedded">
    <section class="detail-header-card">
      <h2>张三等2026/3/23日来访瑞嘉工业园区</h2>
      <Tag label="审批中" status="warning" />
      <div class="detail-header-card__rows">
        <span>来访人：张三</span>
        <span>时间：2026/3/23</span>
        <span>访问园区：瑞嘉工业园区</span>
        <span>预约编号：VS20250728001</span>
      </div>
      <Tabs v-model="activeTab" :items="tabs" />
    </section>

    <section v-if="currentTab === tabs[0]" class="detail-stack">
      <article class="info-card">
        <h3>{{ t('form.park') }}</h3>
        <strong>HHA Industrial Park,</strong>
        <p>123 Eastern Seaboard, Rayong, Thailand 21180</p>
      </article>
      <article class="info-card reservation-info">
        <h3>{{ t('form.appointmentInfo') }}</h3>
        <Field :label="t('form.date')" model-value="2026-07-09" state="readonly" />
        <Field :label="t('form.visitType')" model-value="商务拜访" state="readonly" />
        <Field :label="t('form.reason')" model-value="全球化智库（CCG）副主任郑金连表示，伴" state="readonly" />
      </article>
      <article class="info-card visitor-info">
        <h3>{{ t('form.visitorInfo') }}</h3>
        <p class="field-caption">{{ t('form.photo') }}</p>
        <div class="visitor-photo">照片</div>
        <Field :label="t('form.visitor')" model-value="陈明韬" state="readonly" />
        <Field :label="t('form.phone')" model-value="+66 12345" state="readonly" />
        <Field label="公司名称" model-value="VinFast" state="readonly" />
        <Field :label="t('form.idType')" model-value="越南公民身份证" state="readonly" />
        <Field :label="t('form.idNumber')" model-value="52********018" state="readonly" />
      </article>
      <UserCard state="detail" :members="people" count="10" full :padding="16" />
    </section>

    <section v-else class="approval-wrap">
      <ApprovalRecord :groups="approvalGroups" />
    </section>
  </PageFrame>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ApprovalRecord from '../components/figma/ApprovalRecord.vue'
import Field from '../components/figma/Field.vue'
import Tag from '../components/figma/Tag.vue'
import Tabs from '../components/figma/Tabs.vue'
import UserCard from '../components/figma/UserCard.vue'
import PageFrame from './PageFrame.vue'

const { t } = useI18n()
const props = defineProps({ embedded: Boolean })
const activeTab = ref('')
const tabs = computed(() => [t('detail.tabs.basic'), t('detail.tabs.flow')])
const currentTab = computed(() => activeTab.value || tabs.value[0])
const people = [{ id: 'p1', name: '何枢' }, { id: 'p2', name: '孙楠' }, { id: 'p3', name: '吴恒' }, { id: 'p4', name: '郑新' }, { id: 'p5', name: '钱佳仪' }, { id: 'p6', name: '何引琪' }, { id: 'p7', name: '周伟林' }, { id: 'p8', name: '赵英艳' }, { id: 'p9', name: '赵学海' }, { id: 'p10', name: '冯修岚' }]
const approvalGroups = [
  { id: 'direct', title: '直属领导审批', records: [{ id: 'a1', approver: { name: '张三' }, status: 'pending', statusLabel: '提交', handledAt: '2016-07-11 10:00' }] },
  { id: 'level-1', title: '一级审批人', records: [{ id: 'a2', approver: { name: '郭星睿' }, status: 'approved', statusLabel: '通过', handledAt: '2016-07-11 10:00', comment: '这个与XXX活动是一个吗?' }] },
  { id: 'level-2', title: '二级审批人', records: [{ id: 'a3', approver: { name: '张益达' }, status: 'approved', statusLabel: '通过', handledAt: '2016-07-11 10:00', comment: '这个与XXX活动是一个吗?' }] }
]
</script>

<style scoped>
.detail-header-card { width: 100%; padding: 16px 16px 0; box-sizing: border-box; border-radius: 12px; background: #FFFFFF; }
.detail-header-card h2 { margin: 0 0 8px; color: #1D2129; font: 600 20px/28px "PingFang SC", sans-serif; }
.detail-header-card__rows { display: flex; flex-direction: column; gap: 4px; margin-top: 8px; color: #86909C; font: 400 14px/22px "PingFang SC", sans-serif; }
.detail-header-card :deep(.tabs) { width: calc(100% + 32px); margin: 16px 0 0 -16px; }
.detail-stack { width: 100%; display: grid; gap: 12px; margin-top: 12px; }
/* UserCard 满宽与内边距由组件 full / padding prop 表达 */
.info-card { width: 100%; padding: 16px; box-sizing: border-box; border-radius: 12px; background: #FFFFFF; }
.info-card h3 { margin: 0 0 8px; color: #1D2129; font: 600 16px/24px "PingFang SC", sans-serif; }
.info-card strong { color: #1D2129; font: 600 16px/24px "PingFang SC", sans-serif; }
.info-card p { margin: 4px 0 0; color: #86909C; font: 400 14px/22px "PingFang SC", sans-serif; }
.reservation-info :deep(.figma-field), .visitor-info :deep(.figma-field) { width: 100%; }
.field-caption { color: #4E5969 !important; font-weight: 500 !important; }
.visitor-photo { width: 64px; height: 64px; margin: 8px 0; display: flex; align-items: center; justify-content: center; border-radius: 4px; color: #86909C; background: #F2F3F5; font: 400 12px/18px "PingFang SC", sans-serif; }
.approval-wrap { width: 100%; margin-top: 12px; padding: 12px 0 16px; box-sizing: border-box; border-radius: 12px; background: #FFFFFF; }
.approval-wrap :deep(.approval-record) { width: 100%; }
</style>
