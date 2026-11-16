<template>
  <!-- 安保端详情页：页头「详情」（返回 + 关闭）+ 预约摘要 + 三个页签。
       依据 Figma「安保端 > 详情」1042:17750（375×812）：
       · navbar-web > wrapper 375×44 → 复用组件库 SecurityHeader（返回 + 关闭 + 居中标题）
       · page-header 375×142 白底 + 1px #E5E6EB 底边 / pad 12·20：标题 20/28 w600 #101828、
         状态胶囊 62×22 #23C343「已通过」+ 两个灰底 tag 24 高（10 人 / 2 车）、预约编号 14/22 #86909C
       · tabs-line 375×40：基础信息 / 审批记录 / 出入记录（激活 14/22 w600 #00AAA6 + 2px 下划线），
         三个 tab 均分撑满 375 宽（用户 2026-11-10 裁决「tab 撑满容器」）
       · body pad 16 / gap 12：访客信息、预约信息、同行人（10）、车辆（0）
       页面只做组件组合，卡片样式一律来自组件库（Field 只读态 / UserCard / VehicleCard / ApprovalRecord / ApprovalTimeline）。 -->
  <main class="security-detail">
    <SecurityHeader title="详情" @back="goHome" @close="goHome" />

    <section class="sd-head">
      <h1 class="sd-head__title">{{ headTitle }}</h1>
      <div class="sd-head__meta">
        <InlineInput :text="headStatus" background="#23C343" :before="false" :after="false" :padding="10" :weight="600" />
        <Tag variant="soft" icon="user" label="10" />
        <Tag variant="soft" icon="car" label="2" />
      </div>
      <p class="sd-head__number">预约编号：{{ headNumber }}</p>
    </section>

    <Tabs v-model="activeTab" :items="tabs" full :height="40" background="#FFFFFF" />

    <section class="sd-body">
      <template v-if="currentTab === tabs[0]">
        <article class="sd-card">
          <h2>访客信息</h2>
          <Field label="姓名" model-value="张三" state="readonly" />
          <Field label="手机号" model-value="+66 81234 5678" state="readonly" />
          <Field label="公司名称" model-value="VinFast" state="readonly" />
          <Field label="证件类型" model-value="越南公民身份证" state="readonly" />
          <Field label="证件号" model-value="52********018" state="readonly" />
        </article>

        <article class="sd-card">
          <h2>预约信息</h2>
          <Field label="来访日期" model-value="2026-07-29" state="readonly" />
          <Field label="来访时间" model-value="09:00 - 18:00" state="readonly" />
          <Field label="拜访园区" model-value="HHA泰国-Rayong" state="readonly" />
          <Field label="来访事由" model-value="商务洽谈" state="readonly" />
          <Field label="备注" model-value="需携带样品进入厂区，请协助安排会议室。" state="readonly" />
        </article>

        <UserCard state="detail" :members="people" count="10" full :padding="16" @more="showMore = true" />
        <VehicleCard state="detail" :plates="cars" count="2" full :padding="16" @more="showMore = true" />
      </template>

      <ApprovalRecord v-else-if="currentTab === tabs[1]" :groups="approvalGroups" />
      <ApprovalTimeline v-else :items="flowItems" :people="people" />
    </section>

    <!-- 人员 / 车辆「更多」用底部抽屉查看全部，复用组件库 Popup + SelectList 列表 -->
    <Popup v-model:show="showMore" title="入园人员">
      <SelectList :options="moreOptions" padded />
    </Popup>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ApprovalRecord from '../components/figma/ApprovalRecord.vue'
import ApprovalTimeline from '../components/figma/ApprovalTimeline.vue'
import Field from '../components/figma/Field.vue'
import InlineInput from '../components/figma/InlineInput.vue'
import Popup from '../components/figma/Popup.vue'
import SecurityHeader from '../components/figma/SecurityHeader.vue'
import SelectList from '../components/figma/SelectList.vue'
import Tabs from '../components/figma/Tabs.vue'
import Tag from '../components/figma/Tag.vue'
import UserCard from '../components/figma/UserCard.vue'
import VehicleCard from '../components/figma/VehicleCard.vue'

const props = defineProps({ embedded: Boolean })
const emit = defineEmits(['back'])
const router = useRouter()

// 用户 2026-11-15「安保端出入登记的详情是安保端详情」：从出入登记列表点进来时用 query 带本条的
// 标题 / 状态 / 编号，页头按真实记录渲染；直接打开模板页（无 query）仍回落到设计稿文案。
const route = useRoute()
const headTitle = computed(() => route.query.title || '张三等7月29日因商务洽谈来访显示事业部')
const headStatus = computed(() => route.query.status || '已通过')
const headNumber = computed(() => route.query.number || 'VS20250728001')

function goHome() {
  if (props.embedded) emit('back')
  else router.push('/security/entry')
}

const activeTab = ref('')
const tabs = ['基础信息', '审批记录', '出入记录']
const currentTab = computed(() => activeTab.value || tabs[0])

const people = [
  { id: 'p1', name: '何枢' }, { id: 'p2', name: '孙楠' }, { id: 'p3', name: '吴恒' },
  { id: 'p4', name: '郑新' }, { id: 'p5', name: '钱佳仪' }, { id: 'p6', name: '何引琪' },
  { id: 'p7', name: '周伟林' }, { id: 'p8', name: '赵英艳' }, { id: 'p9', name: '赵学海' },
  { id: 'p10', name: '冯修岚' }
]
const cars = [
  { id: 'v1', plate: '39A-12345' },
  { id: 'v2', plate: '39A-67890' }
]
const showMore = ref(false)
const moreOptions = people.map(item => item.name)

const approvalGroups = [
  { id: 'direct', title: '直属领导审批', records: [{ id: 'a1', approver: { name: '张三' }, status: 'pending', statusLabel: '提交', handledAt: '2026-07-28 10:00' }] },
  { id: 'level-1', title: '一级审批人', records: [{ id: 'a2', approver: { name: '郭星睿' }, status: 'approved', statusLabel: '通过', handledAt: '2026-07-28 14:30', comment: '同意来访，请门岗核对证件。' }] },
  { id: 'level-2', title: '二级审批人', records: [{ id: 'a3', approver: { name: '张益达' }, status: 'approved', statusLabel: '通过', handledAt: '2026-07-29 08:10' }] }
]

const flowItems = [
  { id: 1, time: '2026-07-29 09:21', operator: '李彤运', tag: '入园（1）', status: 'done', description: '访客寄存物品：2 个打火机，1 部手机。', people: '张三', more: false },
  { id: 2, time: '2026-07-29 17:48', operator: '李彤运', tag: '出园（1）', status: 'waiting', peopleCount: 1, people: '张三', more: false }
]
</script>

<style scoped>
.security-detail { width: 375px; min-height: 812px; margin: 0 auto; overflow: hidden; background: #F2F3F5; }
/* page-header 375×142 = 12 + 118 + 12；Container gap 8（标题 56 / 状态行 24 / 编号 22） */
.sd-head { padding: 12px 20px; box-sizing: border-box; display: flex; flex-direction: column; gap: 8px; background: #FFFFFF; box-shadow: inset 0 -1px 0 #E5E6EB; }
.sd-head__title { margin: 0; color: #101828; font: 600 20px/28px "PingFang SC", sans-serif; }
.sd-head__meta { display: flex; align-items: center; gap: 8px; }
.sd-head__number { margin: 0; color: #86909C; font: 400 14px/22px "PingFang SC", sans-serif; }
/* tabs-line 375×40 白底：尺寸与底色全部由 Tabs 的 prop 表达（full / height / background），
   页面不再写任何覆盖样式 —— 上一版在这里写 display:block 顶掉了组件内部的 display:flex，
   导致 button 的 flex:1 失效、三个 tab 退回内容宽 72 挤在左边。 */
.sd-body { padding: 16px; display: flex; flex-direction: column; gap: 12px; }
.sd-card { padding: 16px 16px 6px; box-sizing: border-box; border-radius: 12px; background: #FFFFFF; }
.sd-card h2 { margin: 0 0 12px; color: #1D2129; font: 600 16px/24px "PingFang SC", sans-serif; }
.sd-card :deep(.figma-field) { width: 100%; }
/* UserCard / VehicleCard 的满宽与内边距由组件 full / padding prop 表达 */
@media (max-width: 375px) { .security-detail { width: 100%; } }
</style>
