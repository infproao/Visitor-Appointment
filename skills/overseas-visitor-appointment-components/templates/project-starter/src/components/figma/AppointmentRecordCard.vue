<template>
  <!-- 预约记录卡片：展示一条预约记录（标题 / 审批状态 / 访问园区 / 接访人 / 预约编号 / 扫码入口）。
       模板页面与「卡片四种样式」复用同一组件，不在页面里各写一份。
       Figma 1723:28208 > llistcard 351×156：pad 12 / gap 8 / r12；
       header 327×24 标题 16/24 w600 #101828；card 327×100 gap 8；
       content 279×100 gap 4：状态胶囊 62×22 + 3 行 14/22 #86909C；
       右侧 scan-qr-code 图标 40×40（vector 33.3 #262626），不是二维码占位图。 -->
  <article class="registration-card">
    <header>
      <strong>{{ record.title || '2026/3/23日访问瑞嘉工业园区' }}</strong>
    </header>
    <div class="card">
      <div class="details">
        <InlineInput class="status" :text="record.status || '审批中'" :background="statusColor" :before="false" :after="false" :padding="10" :weight="600" />
        <span>访问园区：{{ record.park || '瑞嘉工业园区' }}</span>
        <span>接访人：{{ record.host || 'zhansna' }}</span>
        <span>预约编号：{{ record.number || 'VS20250728001' }}</span>
      </div>
      <button class="qr" type="button" aria-label="扫码核验" @click="$emit('qr')">
        <IconBox name="scan-qr-code" :size="40" color="#262626" />
      </button>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import IconBox from './IconBox.vue'
import InlineInput from './InlineInput.vue'

const props = defineProps({ record: { type: Object, default: () => ({}) } })
defineEmits(['qr'])

// 状态色：审批中 #F9CC45（Figma 1723:28208）、已通过 #23C343（Figma 1893:20270）、未通过 #F76560
const statusColor = computed(() => ({ 已通过: '#23C343', 未通过: '#F76560', 已拒绝: '#F76560' })[props.record.status] || '#F9CC45')
</script>

<style scoped>
.registration-card { width: 351px; padding: 12px; box-sizing: border-box; display: flex; flex-direction: column; gap: 8px; border-radius: 12px; background: #FFFFFF; }
.registration-card header strong { display: block; color: #101828; font: 600 16px/24px "PingFang SC", sans-serif; }
.card { display: flex; align-items: center; gap: 8px; }
.details { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; align-items: flex-start; gap: 4px; color: #86909C; font: 400 14px/22px "PingFang SC", sans-serif; }
.status { flex: 0 0 auto; }
.qr { flex: 0 0 40px; width: 40px; height: 40px; padding: 0; border: 0; display: inline-flex; align-items: center; justify-content: center; background: transparent; cursor: pointer; }
</style>
