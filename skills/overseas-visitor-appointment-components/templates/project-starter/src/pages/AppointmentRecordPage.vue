<template>
  <!-- 预约记录页（用户端）：页头「预约记录」+ 仅展示最近 14 天提示条 + 多条预约记录。
       Figma「用户端 > 预约记录」1083:24323：
       · box 375×52 / pad 12/16：标题行 343×28，左侧 16×16 返回 + 「预约记录」20/28 w600 #1D2129（gap 8）
       · content pad 0 12 12 / gap 12：alert 351×40（r4 / #E8F3FF / pad 9/16 / icon 16 + 14/22 #1D2129）
       · 记录卡 351×156 ×N，全部复用组件库 AppointmentRecordCard，页面内不复制卡片样式 -->
  <main class="record-page">
    <header class="record-page__header">
      <button class="record-page__back" type="button" aria-label="返回" @click="goBack">
        <IconBox name="arrow-left" :size="16" color="#4E5969" />
      </button>
      <h1>预约记录</h1>
    </header>

    <p class="record-page__alert">
      <IconBox name="info" :size="16" color="#4E5969" />
      仅展示最近14天的预约单
    </p>

    <div class="record-page__list">
      <AppointmentRecordCard v-for="record in records" :key="record.number" :record="record" />
    </div>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'
import AppointmentRecordCard from '../components/figma/AppointmentRecordCard.vue'
import IconBox from '../components/figma/IconBox.vue'

const props = defineProps({ embedded: Boolean })
const emit = defineEmits(['back'])
const router = useRouter()

function goBack() {
  if (props.embedded) emit('back')
  else router.push('/')
}

const records = [
  { title: '2026/3/23日访问瑞嘉工业园区', status: '审批中', park: '瑞嘉工业园区', host: 'zhansna', number: 'VS20250728001' },
  { title: '2026/3/21日访问瑞嘉工业园区', status: '已通过', park: '瑞嘉工业园区', host: '陈明韬', number: 'VS20250728002' },
  { title: '2026/3/18日访问海信显示事业部', status: '未通过', park: '显示事业部', host: '张益达', number: 'VS20250728003' },
  { title: '2026/3/15日访问海信研发中心', status: '已通过', park: '研发中心', host: '郭星睿', number: 'VS20250728004' }
]
</script>

<style scoped>
.record-page { width: 375px; min-height: 812px; margin: 0 auto; overflow: hidden; background: #F2F3F5; }
.record-page__header { height: 52px; padding: 12px 16px; box-sizing: border-box; display: flex; align-items: center; gap: 8px; }
.record-page__back { width: 16px; height: 16px; padding: 0; border: 0; display: inline-flex; align-items: center; justify-content: center; background: transparent; cursor: pointer; }
.record-page__header h1 { margin: 0; color: #1D2129; font: 600 20px/28px "PingFang SC", sans-serif; }
.record-page__alert { height: 40px; margin: 0 12px; padding: 9px 16px; box-sizing: border-box; display: flex; align-items: center; gap: 8px; border-radius: 4px; color: #1D2129; background: #E8F3FF; font: 400 14px/22px "PingFang SC", sans-serif; }
.record-page__list { padding: 12px; display: flex; flex-direction: column; gap: 12px; }
.record-page__list :deep(.registration-card) { width: 100%; }
@media (max-width: 375px) { .record-page { width: 100%; } }
</style>
