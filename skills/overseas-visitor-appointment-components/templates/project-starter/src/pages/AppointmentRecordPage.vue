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
      <AppointmentRecordCard
        v-for="record in records"
        :key="record.number"
        :record="record"
        @open="openDetail(record)"
        @pass="openPass(record)"
      />
    </div>

    <!-- 用户 2026-11-15 图3：记录卡右侧 icon 可点 → 弹「查看通行凭证」。
         第一段是身份校验（姓名 / 手机号后四位 / 身份证后四位，全部必填，未填按图4 的红字报错样式提示），
         查询通过后才显示凭证卡片（待入园 + 当日有效 + 园区 / 地址 + 二维码 + 预约编号 + 查看更多）。 -->
    <Popup v-model:show="showPass" title="查看通行凭证">
      <section v-if="!passVerified" class="pass-form">
        <!-- 用户 2026-11-15「查看同行凭证内容的白底哪去了」：校验区整体是一张白卡（padding 16 / r12），
             操作按钮留在弹层灰底上，跟设计稿一致 -->
        <div class="pass-form__card">
          <Field v-model="passForm.name" label="姓名" placeholder="请输入" required help :error="passErrors.name" />
          <Field v-model="passForm.phone" label="手机号后四位" placeholder="请输入" required maxlength="4" :error="passErrors.phone" />
          <Field v-model="passForm.idNo" label="身份证后四位" placeholder="请输入" required maxlength="4" :error="passErrors.idNo" />
        </div>
        <div class="pass-form__actions">
          <Button label="取消" tone="teal" form="outline" @click="showPass = false" />
          <Button label="查询" tone="teal" form="solid" @click="queryPass" />
        </div>
      </section>
      <section v-else class="pass-card">
        <div class="pass-card__head">
          <Tag label="待入园" status="info" />
          <strong>仅 {{ passRecord.date }} 当日有效</strong>
        </div>
        <h3>{{ passRecord.park }}</h3>
        <p class="pass-card__addr">456新塘，Đồng Nai省，越南 810000</p>
        <div class="pass-card__qr"><QRCode :size="180" /></div>
        <p class="pass-card__number">预约编号：{{ passRecord.number }}</p>
        <button class="pass-card__more" type="button" @click="toast = '查看完整凭证信息'">查看更多</button>
      </section>
    </Popup>

    <div v-if="toast" class="record-page__toast" role="status">{{ toast }}</div>
  </main>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppointmentRecordCard from '../components/figma/AppointmentRecordCard.vue'
import Button from '../components/figma/Button.vue'
import Field from '../components/figma/Field.vue'
import IconBox from '../components/figma/IconBox.vue'
import Popup from '../components/figma/Popup.vue'
import QRCode from '../components/figma/QRCode.vue'
import Tag from '../components/figma/Tag.vue'

const props = defineProps({ embedded: Boolean })
const emit = defineEmits(['back', 'navigate'])
const router = useRouter()

function goBack() {
  if (props.embedded) emit('back')
  else router.push('/home')
}

// 用户 2026-11-15「用户端预约记录卡片的详情样式和预约详情页一样」：点卡进预约详情页（query 带上本条记录）
function openDetail(record) {
  if (props.embedded) {
    emit('navigate', 'appointment-detail')
    return
  }
  router.push({
    path: '/appointment/detail',
    query: {
      title: record.title,
      status: record.status,
      visitor: '张三',
      date: record.date,
      park: record.park,
      number: record.number
    }
  })
}

// icon → 查看通行凭证弹层；失效 / 禁用态不进弹层，直接给一句提示（用户原话「失效的禁用状态的 icon 弹出…」）
const showPass = ref(false)
const passVerified = ref(false)
const passForm = reactive({ name: '', phone: '', idNo: '' })
const passErrors = reactive({ name: '', phone: '', idNo: '' })
const toast = ref('')
let toastTimer = null
const passRecord = ref({ number: '', park: '', date: '', validity: '', members: 0 })
const INVALID_STATUS = ['已过期', '已取消', '未通过', '已拒绝']

function openPass(record) {
  if (INVALID_STATUS.includes(record.status)) {
    toast.value = `该预约${record.status}，暂无可用通行凭证`
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => { toast.value = '' }, 2000)
    return
  }
  passRecord.value = record
  passForm.name = ''
  passForm.phone = ''
  passForm.idNo = ''
  passErrors.name = ''
  passErrors.phone = ''
  passErrors.idNo = ''
  passVerified.value = false
  showPass.value = true
}

// 必填未填 → 图4 那条红字报错样式；三位信息齐全才进入凭证页
function queryPass() {
  passErrors.name = passForm.name.trim() ? '' : '请输入姓名'
  passErrors.phone = /^\d{4}$/.test(passForm.phone.trim()) ? '' : '请输入手机号后四位（4 位数字）'
  passErrors.idNo = /^\d{4}$/.test(passForm.idNo.trim()) ? '' : '请输入身份证后四位（4 位数字）'
  if (passErrors.name || passErrors.phone || passErrors.idNo) return
  passVerified.value = true
}

const records = [
  { title: '2026/3/23日访问瑞嘉工业园区', status: '审批中', park: '瑞嘉工业园区', host: 'zhansna', number: 'VS20250728001', date: '2026/3/23', validity: '2026/3/23 09:00 - 18:00', members: 3 },
  { title: '2026/3/21日访问瑞嘉工业园区', status: '已通过', park: '瑞嘉工业园区', host: '陈明韬', number: 'VS20250728002', date: '2026/3/21', validity: '2026/3/21 09:00 - 18:00', members: 10 },
  { title: '2026/3/18日访问海信显示事业部', status: '未通过', park: '显示事业部', host: '张益达', number: 'VS20250728003', date: '2026/3/18', validity: '2026/3/18 09:00 - 18:00', members: 2 },
  { title: '2026/3/15日访问海信研发中心', status: '已通过', park: '研发中心', host: '郭星睿', number: 'VS20250728004', date: '2026/3/15', validity: '2026/3/15 09:00 - 18:00', members: 4 },
  // 备用一条已过期记录：验证「失效 → icon 灰掉、点了只给提示」，同时验证标题两行省略
  { title: '2026/2/28日带领供应商团队访问海信研发中心并与采购部对接年度框架协议续签事宜', status: '已过期', park: '研发中心', host: '郭星睿', number: 'VS20250728005', date: '2026/2/28', validity: '2026/2/28 09:00 - 18:00', members: 6 }
]
</script>

<style scoped>
.record-page { position: relative; width: 375px; min-height: 812px; margin: 0 auto; overflow: hidden; background: #F2F3F5; }
.record-page__header { height: 52px; padding: 12px 16px; box-sizing: border-box; display: flex; align-items: center; gap: 8px; }
.record-page__back { width: 16px; height: 16px; padding: 0; border: 0; display: inline-flex; align-items: center; justify-content: center; background: transparent; cursor: pointer; }
.record-page__header h1 { margin: 0; color: #1D2129; font: 600 20px/28px "PingFang SC", sans-serif; }
.record-page__alert { height: 40px; margin: 0 12px; padding: 9px 16px; box-sizing: border-box; display: flex; align-items: center; gap: 8px; border-radius: 4px; color: #1D2129; background: #E8F3FF; font: 400 14px/22px "PingFang SC", sans-serif; }
.record-page__list { padding: 12px; display: flex; flex-direction: column; gap: 12px; }
.record-page__list :deep(.registration-card) { width: 100%; }
/* 查看通行凭证弹层（图3）：第一段是校验表单（Field 自带必填 * / ? / 红字报错），
   第二段是凭证卡：白卡 + 待入园蓝标 + 「仅 X 当日有效」+ 园区 / 地址 + 二维码 + 编号 + 查看更多 */
.pass-form__card { padding: 16px; display: grid; gap: 8px; border-radius: 12px; background: #FFFFFF; }
.pass-form__actions { margin-top: 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.pass-card { padding: 16px; box-sizing: border-box; border-radius: 12px; background: #FFFFFF; text-align: center; }
.pass-card__head { display: flex; align-items: center; gap: 8px; }
.pass-card__head strong { color: #00AAA6; font: 400 14px/22px "PingFang SC", sans-serif; }
.pass-card h3 { margin: 12px 0 0; color: #1D2129; font: 600 16px/24px "PingFang SC", sans-serif; }
.pass-card__addr { margin: 4px 0 0; color: #86909C; font: 400 12px/18px "PingFang SC", sans-serif; overflow-wrap: anywhere; word-break: break-word; }
.pass-card__qr { margin-top: 16px; display: flex; justify-content: center; }
.pass-card__number { margin: 16px 0 0; color: #86909C; font: 400 14px/22px "PingFang SC", sans-serif; }
.pass-card__more { width: 100%; margin-top: 16px; padding: 12px 0 0; border: 0; border-top: 1px solid #F2F3F5; color: #00AAA6; background: transparent; font: 400 14px/22px "PingFang SC", sans-serif; cursor: pointer; }
/* 失效提示：固定在 375 画布底部上方，页面滚动后仍可见 */
.record-page__toast { position: fixed; left: 50%; bottom: 80px; z-index: 2000; max-width: 300px; padding: 10px 16px; border-radius: 8px; color: #FFFFFF; background: rgba(29, 33, 41, .88); font: 400 14px/22px "PingFang SC", sans-serif; transform: translateX(-50%); }
@media (max-width: 375px) { .record-page { width: 100%; } }
</style>
