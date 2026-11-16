<template>
  <main class="special-view" :class="`special-view--${kind}`">
    <!-- 渐变青 header：泰国同行人（文字深色，设计稿为黑字叠青色背景图）；链接已过期页复用同一标题栏 -->
    <header v-if="kind === 'companions' || kind === 'link-expired'" class="grad-header">
      <h1>{{ kind === 'link-expired' ? '访客预约' : title }}</h1>
      <button class="grad-header__lang" type="button" @click="showLanguage = true">{{ languageShort }}<IconBox name="down" :size="12" /></button>
    </header>

    <!-- 主访客提交成功：顶部为设计稿背景图（见 .special-view--share-success），无标题 -->

    <!-- 凭证：相机取景灰底 + 底部白色弹层 -->
    <section v-if="kind === 'pass'" class="sheet-page">
      <div class="sheet">
        <span class="sheet__handle" aria-hidden="true"></span>
        <div class="pass">
          <span class="pass__tag">待入园</span>
          <h2>仅 2026年04月09日 当日有效</h2>
          <strong>瑞嘉工业园区</strong>
          <p>456新境， Đồng Nai省, 越南 810000</p>
          <div class="pass__qr"><QRCode :size="180" /></div>
          <small>预约编号：VS20250728001</small>
          <button class="ghost-link" type="button" @click="go('appointment-detail')">查看更多</button>
        </div>
      </div>
    </section>

    <!-- 暂无凭证 -->
    <section v-else-if="kind === 'empty-pass'" class="sheet-page">
      <div class="sheet">
        <span class="sheet__handle" aria-hidden="true"></span>
        <div class="empty-pass">
          <img :src="emptyImage" alt="暂无凭证" />
          <p>当前暂无审批中、已通过的通行凭证<br />您可以前往预约记录核对预约状态</p>
          <button class="ghost-link" type="button" @click="go('appointment-detail')">预约记录</button>
        </div>
      </div>
    </section>

    <!-- 安保端出入登记（2026-11-13）：原为整页设计稿切图，两个下拉 / 搜索都只是像素、无法交互。
         按本轮需求改为组件拼装：Cascader（园区 → 门）+ Dropdown（部门，走 Search #prefix）+ Search（扫码样式）
         + 模糊搜索结果列表（复用 AppointmentRecordCard）。原图仍保留在 src/assets/design-security-entry.png。 -->
    <section v-else-if="kind === 'security-entry'" class="security-live">
      <SecurityHeader title="访客出入登记" @back="notify('返回')" @close="notify('关闭')" />
      <div class="security-live__filters">
        <Cascader v-model="securityPark" :options="securityParkOptions" />
        <Search v-model="securityKeyword" scan placeholder="请输入搜索关键词" @scan="notify('扫码：请对准访客凭证')" @search="securityQuery = $event">
          <template #prefix>
            <Dropdown v-model="securityDepartment" :options="securityDepartments" :trigger-width="80" popup-title="选择部门" />
          </template>
        </Search>
      </div>
      <div class="security-live__list">
        <p class="security-live__count">搜索结果 · {{ filteredSecurityRecords.length }} 条</p>
        <!-- 用户 2026-11-15：安保端出入登记用业务卡片样式①「带图片摘要」（泰国安保端），不再用用户端预约记录卡 -->
        <VisitorImageCard
          v-for="record in filteredSecurityRecords"
          :key="record.number"
          :date="record.date"
          :title="record.title"
          :status="record.status"
          :company="record.park"
          :department="record.department"
          :number="record.number"
          @open="openRecord(record)"
        />
        <p v-if="!filteredSecurityRecords.length" class="security-live__empty">没有匹配的来访记录</p>
      </div>
    </section>

    <!-- 入园操作（安保端，2026-11-13 两张截图）：两步底部弹层，内容全部复用组件库组件，不新建页面 .vue。
         stage="select" = 搜索 + 人员复选；下一步 = 信息确认（同一条流程的第二步，不再是两个分开的页面）。
         用户 2026-11-15：标题按步骤切换（入园操作 → 信息确认），第二步「入园人员」回显第一步勾选的人。 -->
    <section v-else-if="kind === 'entry'" class="entry-page">
      <div class="entry-sheet">
        <header class="entry-sheet__header">
          <span class="sheet__handle" aria-hidden="true"></span>
          <h2>{{ entryStage === 'select' ? '入园操作' : '信息确认' }}</h2>
          <button type="button" aria-label="关闭" @click="notify('已关闭入园操作')"><IconBox name="close" :size="14" color="#1D2129" /></button>
        </header>

        <div v-if="entryStage === 'select'" class="entry-card">
          <Search v-model="entryKeyword" placeholder="请输入姓名或证件号" />
          <div class="entry-person-list">
            <div
              v-for="person in filteredEntryPeople"
              :key="person.id"
              class="entry-person"
              :class="{ 'entry-person--disabled': isEntryDisabled(person) }"
              role="button"
              tabindex="0"
              :aria-disabled="isEntryDisabled(person)"
              @click="selectEntryPerson(person)"
              @keydown.enter="selectEntryPerson(person)"
            >
              <span class="entry-person__avatar" :class="{ 'entry-person__avatar--photo': person.photo }">{{ person.name.slice(0, 1) }}</span>
              <div class="entry-person__info">
                <div class="entry-person__line">
                  <strong>{{ person.name }}</strong>
                  <Tag v-for="tag in person.tags" :key="tag.label" :label="tag.label" :status="tag.status" :variant="tag.variant || 'solid'" />
                </div>
                <p class="entry-person__id"><IconBox name="user" :size="12" color="#86909C" />{{ person.idNo }}</p>
                <p v-if="person.hint" class="entry-person__hint">{{ person.hint }}</p>
              </div>
              <span class="entry-person__check" @click.stop>
                <Checkbox
                  :model-value="entrySelected.includes(person.id)"
                  :disabled="isEntryDisabled(person)"
                  size="lg"
                  @update:model-value="selectEntryPerson(person)"
                />
              </span>
            </div>
          </div>
        </div>

        <div v-else class="entry-card entry-card--plain">
          <CollapseItem title="访客信息">
            <Field label="入园人员" required :members="entryMembers" />
            <Uploader label="访客照片上传" required />
            <Uploader label="车辆牌照" />
            <FieldCheckbox v-model="entryChecks" label="检查项确认" required select-all :options="entryCheckOptions" />
            <Field v-model="entryRemark" label="备注" placeholder="请输入" />
          </CollapseItem>
        </div>

        <!-- 动作栏三种样式中的 dual / auth：统一走 ActionBar，页面不再自己拼按钮 -->
        <footer class="entry-sheet__footer">
          <ActionBar
            :variant="entryStage === 'select' ? 'auth' : 'dual'"
            :cancel-text="entryStage === 'select' ? '取消' : '上一步'"
            :confirm-text="entryStage === 'select' ? '下一步' : '提交'"
            @scan="notify('附加授权')"
            @cancel="entryBack"
            @confirm="entryNext"
          />
        </footer>
      </div>
    </section>

    <!-- 审批页（2026-11-13 截图）：访客信息字段与用户详情页一致 + 动作栏（支持操作）+ 近一年来访 → 来访历史记录弹层
         用户 2026-11-15「审批页少了页头和车辆卡片」：补上预约详情页同款页头（标题 / 状态 / 来访人·时间·园区·编号）
         与车辆卡片（无车辆时显示「车辆（0）」空态）。 -->
    <section v-else-if="kind === 'approval'" class="approval-view">
      <SecurityHeader title="访客预约" @back="notify('返回')" @close="notify('关闭')" />
      <div class="approval-view__head">
        <h2>张三等3月23日因商务洽谈来访海信国际中心</h2>
        <Tag label="审批中" status="approving" />
        <div class="approval-view__head-meta">
          <span>来访人：张三</span>
          <span>时间：2026/3/23</span>
          <span>访问园区：瑞嘉工业园区</span>
          <span>预约编号：VS20250728001</span>
        </div>
      </div>
      <!-- 用户 2026-11-15「图2 审批页也有 tab」：页头下补 tabs-line「审批内容 / 审批记录」，
           「审批记录」用组件库 ApprovalRecord 渲染审批时间线（发起节点 → 产品经理审核 → 部门长审批）。 -->
      <Tabs v-model="approvalTab" :items="approvalTabs" full :height="40" background="#FFFFFF" />
      <div class="approval-view__body">
        <template v-if="currentApprovalTab === approvalTabs[0]">
          <CollapseItem title="访问事由">
            <Field label="事由类型" model-value="参观拜访" state="readonly" />
            <Field label="事由描述" model-value="增程式汽车修改方案" state="readonly" />
          </CollapseItem>
          <CollapseItem title="访客信息">
            <Uploader label="本人照片上传" />
            <Field label="姓名" model-value="陈明翰" state="readonly" />
            <Field label="手机号" model-value="+66 12345" state="readonly" />
            <Field label="公司名称" model-value="VinFast" state="readonly" />
            <Field label="证件类型" model-value="越南公民身份证" state="readonly" />
            <Field label="证件号" model-value="52********018" state="readonly" />
            <button class="approval-view__history-link" type="button" @click="showVisitHistory = true"><IconBox name="info" :size="14" color="#00AAA6" />近一年来访 2 次</button>
          </CollapseItem>
          <UserCard state="detail" :members="approvalMembers" count="10" full :padding="16" />
          <VehicleCard state="detail" :plates="approvalVehicles" count="0" full :padding="16" />
        </template>
        <ApprovalRecord v-else :groups="approvalGroups" />
      </div>
      <div class="approval-view__actions">
        <ActionBar variant="dual" cancel-text="驳回" confirm-text="通过" @cancel="notify('已驳回')" @confirm="notify('审批通过')" />
      </div>
    </section>

    <!-- 同行人链接已过期（2026-11-13 截图）：白卡 + EmptyState 失效空态 + 主色「新建预约」；不新建页面 .vue -->
    <section v-else-if="kind === 'link-expired'" class="expired">
      <div class="expired__card">
        <p class="expired__invite">2026/3/23张三邀您一同访问瑞嘉工业园区</p>
        <p class="expired__addr"><IconBox name="location" :size="14" color="#86909C" />456新塘， Đồng Nai省，越南 810000</p>
        <EmptyState title="2026/3/23 23:59 已失效">
          <div class="expired__action"><Button label="新建预约" tone="teal" form="solid" @click="go('appointment-form')" /></div>
        </EmptyState>
      </div>
    </section>

    <!-- 泰国同行人 ②：布局与间距按设计稿 1822:40540 还原（① 1822:39636 为另一国家版本） -->
    <section v-else-if="kind === 'companions'" class="companion">
      <p class="companion__notice"><IconBox name="info" :size="16" />同行人须完成个人数据同意后方可入园</p>
      <div class="companion__card">
        <h2 class="companion__title">同意授权</h2>
        <p class="companion__invite">2026/3/23张三邀您一同访问瑞嘉工业园区</p>
        <p class="companion__addr"><IconBox name="location" :size="16" />456新塘， Đồng Nai省，越南 810000</p>
        <div class="companion__fields">
          <!-- 组件库 Field 的只读态自带 click 事件，接 Popup + SelectList，页面搭建时保留组件交互 -->
          <Field label="您的姓名" :model-value="companionName" placeholder="请选择" required readonly link @click="showName = true" />
          <Field label="证件类型" :model-value="companionIdType" required readonly link @click="showIdType = true" />
          <Field v-model="companionIdNo" label="证件号" placeholder="请输入" required />
        </div>
        <button class="companion__confirm" type="button" @click="confirmCompanion">确认同行</button>
        <div class="companion__agreements">
          <Checkbox v-model="agreePrivacy">我已阅读并同意<a class="ghost-link" href="javascript:void(0)" @click.stop.prevent="showPrivacy = true">《隐私政策》</a></Checkbox>
          <Checkbox v-model="agreeData">我明确同意《个人数据的收集、使用和披露同意书》</Checkbox>
        </div>
      </div>
      <div class="regulations" role="button" tabindex="0" @click="showRegulations = true" @keydown.enter="showRegulations = true">
        <div class="regulations__text"><em>Visitor<br />Regulations</em><strong>访客须知</strong></div>
      </div>
    </section>

    <!-- 主访客提交成功（分享给同行人）：1:1 对照 Figma「——模板—— > 模板页 > 提交成功页」1553:22119
         card 343×922 / 白底 r12 / padding 16,40 / gap16；check 80×80；标题 20/28 w600；
         文案展示 311×442 r16 描边 #E5E6EB；Frame 33 311×212 #F7F8FA r8；底部双按钮 150×44 -->
    <section v-else-if="kind === 'share-success'" class="share">
      <div class="share__card">
        <span class="share__check" aria-hidden="true">
          <svg viewBox="0 0 80 80" width="80" height="80"><circle cx="40" cy="40" r="40" fill="#23C343" /><path d="M23 41L34 52L57 28" fill="none" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </span>
        <h2 class="share__title">提交成功</h2>

        <div class="share__inner">
          <strong>分享给同行人</strong>
          <p>同行人须完成个人数据同意后方可入园</p>
          <div class="share__qr"><QRCode :size="180" /></div>
          <button class="share__save" type="button" @click="notify('已保存到相册')">保存到相册</button>
          <div class="share__pair">
            <button type="button" @click="copyLink">复制链接</button>
            <button type="button" @click="notify('已唤起 Line 分享')">分享到 Line</button>
          </div>
          <small>请于到访前完成</small>
        </div>

        <div class="share__info">
          <p>预约编号：VS20250728001</p>
          <p>访问日期：2026-7-11</p>
          <p>访问园区：瑞嘉工业园区</p>
          <p>地址：456 Nhon Trach, Dong Nai, Vietnam</p>
          <span class="share__rule" aria-hidden="true"></span>
          <button class="share__regulations" type="button" @click="showRegulations = true">
            <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true"><circle cx="7" cy="7" r="6" fill="none" stroke="#00AAA6" stroke-width="1.2" /><path d="M7 6.2v4M7 3.9v.1" stroke="#00AAA6" stroke-width="1.4" stroke-linecap="round" /></svg>
            访客须知
          </button>
        </div>

        <div class="share__actions">
          <button type="button" @click="go('visitor-home')">返回首页</button>
          <button type="button" @click="go('appointment-detail')">查看详情</button>
        </div>
      </div>
    </section>

    <!-- 旧版提交成功（保留） -->
    <section v-else class="special-content success-content">
      <div class="success-card"><div class="success-icon">✓</div><h2>提交成功</h2><p>审核结果将通过短信通知</p></div>
    </section>

    <!-- 2026-11-10：页面级组合全部复用组件库组件，交互在组件库 / 模板工作台里同样有效。
         Popup / LanguagePopup 内部已自动把弹层挂进 .figma-phone 手机画布，不会相对桌面视口偏移。 -->
    <Popup v-model:show="showName" title="选择您的姓名">
      <SelectList :model-value="companionName" :options="companionNames" padded @select="pickName" />
    </Popup>
    <Popup v-model:show="showIdType" title="证件类型">
      <SelectList :model-value="companionIdType" :options="idTypes" padded @select="pickIdType" />
    </Popup>
    <Popup v-model:show="showRegulations" title="访客须知">
      <div class="sheet-card"><ol class="sheet-list"><li v-for="(item, index) in regulations" :key="index">{{ item }}</li></ol></div>
    </Popup>
    <Popup v-model:show="showPrivacy" title="隐私政策">
      <div class="sheet-card"><p class="sheet-text">我们仅在处理访客预约所必需的范围内收集您的姓名、证件信息与到访记录，并按适用法规保存与保护，不会用于约定目的之外的用途。</p></div>
    </Popup>
    <!-- 来访历史记录：复用 Popup 外层 #F2F3F5 + 内容卡白底，状态标签复用 Tag -->
    <Popup v-model:show="showVisitHistory" title="来访历史记录">
      <div class="visit-history">
        <p class="visit-history__total">近一年来访：{{ visitHistory.length }} 次</p>
        <article v-for="item in visitHistory" :key="item.date" class="visit-history__card">
          <div class="visit-history__head">
            <strong>{{ item.date }}</strong>
            <Tag :label="item.status" :status="item.statusKey" />
          </div>
          <p class="visit-history__meta">审批人：{{ item.approver }}　人数：{{ item.count }}</p>
          <p class="visit-history__desc">{{ item.desc }}</p>
        </article>
      </div>
    </Popup>
    <LanguagePopup v-model:show="showLanguage" :model-value="languageCode" title="切换语言" :languages="languageOptions" @select="onLanguage" />

    <Teleport :to="toastTarget">
      <div v-if="toast" class="page-toast" role="status">{{ toast }}</div>
    </Teleport>
  </main>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import ActionBar from '../components/figma/ActionBar.vue'
import AppointmentRecordCard from '../components/figma/AppointmentRecordCard.vue'
import ApprovalRecord from '../components/figma/ApprovalRecord.vue'
import Button from '../components/figma/Button.vue'
import Cascader from '../components/figma/Cascader.vue'
import Checkbox from '../components/figma/Checkbox.vue'
import CollapseItem from '../components/figma/CollapseItem.vue'
import Dropdown from '../components/figma/Dropdown.vue'
import EmptyState from '../components/figma/EmptyState.vue'
import Field from '../components/figma/Field.vue'
import FieldCheckbox from '../components/figma/FieldCheckbox.vue'
import IconBox from '../components/figma/IconBox.vue'
import LanguagePopup from '../components/figma/LanguagePopup.vue'
import Popup from '../components/figma/Popup.vue'
import QRCode from '../components/figma/QRCode.vue'
import Search from '../components/figma/Search.vue'
import SecurityHeader from '../components/figma/SecurityHeader.vue'
import SelectList from '../components/figma/SelectList.vue'
import Tag from '../components/figma/Tag.vue'
import Tabs from '../components/figma/Tabs.vue'
import Uploader from '../components/figma/Uploader.vue'
import UserCard from '../components/figma/UserCard.vue'
import VehicleCard from '../components/figma/VehicleCard.vue'
import VisitorImageCard from '../components/figma/VisitorImageCard.vue'
import { usePopupTeleport } from '../components/figma/usePopupTeleport.js'
import emptyImage from '../assets/empty-state.png'

const props = defineProps({
  kind: { type: String, required: true },
  title: { type: String, default: '访客预约' },
  // 入园操作是两步流程，工作台用 stage 指定初始步，便于两屏分别预览
  stage: { type: String, default: '' },
  embedded: Boolean
})
const emit = defineEmits(['navigate', 'back', 'submitted', 'view-details'])
const router = useRouter()

// 组件库 / 模板工作台内嵌时用页面间跳转事件，独立路由访问时直接 push
const routeMap = {
  'visitor-home': '/',
  'appointment-form': '/appointment/new',
  'appointment-detail': '/appointment/detail',
  'appointment-success': '/appointment/success',
  'visitor-pass': '/pass'
}
function go(id) {
  if (props.embedded) emit('navigate', id)
  else router.push(routeMap[id] || '/')
}

// 轻量反馈：同样挂进手机画布，避免桌面预览里相对视口居中
const toastTarget = usePopupTeleport()
const toast = ref('')
let toastTimer
function notify(message) {
  toast.value = message
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toast.value = '' }, 2000)
}
onBeforeUnmount(() => clearTimeout(toastTimer))
async function copyLink() {
  try {
    if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(window.location.href)
    notify('链接已复制')
  } catch {
    notify('复制失败，请手动复制')
  }
}

// 安保端出入登记（2026-11-13）：三个筛选控件都真正参与过滤，不再只是图片像素
const securityPark = ref(['rayong', 'south'])
const securityParkOptions = [
  { label: 'HHA泰国-Rayong', shortLabel: '泰国工厂', value: 'rayong', children: [
    { label: '南门', shortLabel: '南门', value: 'south' },
    { label: '北门', shortLabel: '北门', value: 'north' }
  ] },
  { label: 'HHA越南-DongNai', shortLabel: '越南工厂', value: 'dongnai', children: [
    { label: '正门', shortLabel: '正门', value: 'main' }
  ] }
]
const securityDepartment = ref('全部部门')
const securityDepartments = ['全部部门', '显示事业部', '营销部', '研发中心']
const securityKeyword = ref('')
// 只有 Search 发出 search 事件时才更新查询词，正好把「即时 / 防抖 / 回车」三种触发差异体现出来
const securityQuery = ref('')
// date 单独成字段（卡片左上角日期），title 只留访客摘要；公司 / 部门 / 编号照设计稿三行
const securityRecords = [
  { date: '09-09', title: '张三等 10人 - 车辆2', status: '已通过', park: '无限进步', host: '显示事业部', number: 'VS20250728001', department: '显示事业部', parkValue: 'rayong', gate: 'south' },
  { date: '09-08', title: '李四等 4人 - 车辆1', status: '审批中', park: 'VinFast', host: '营销部', number: 'VS20250728002', department: '营销部', parkValue: 'rayong', gate: 'south' },
  { date: '09-07', title: '王五等 2人', status: '已通过', park: '海信显示', host: '研发中心', number: 'VS20250728003', department: '研发中心', parkValue: 'rayong', gate: 'north' },
  { date: '09-06', title: '陈明翰 1人 - 车辆1', status: '未通过', park: 'VinFast', host: '营销部', number: 'VS20250728004', department: '营销部', parkValue: 'dongnai', gate: 'main' }
]
const filteredSecurityRecords = computed(() => {
  const q = securityQuery.value.trim().toLowerCase()
  const [park, gate] = securityPark.value
  return securityRecords.filter(record => {
    const deptOk = securityDepartment.value === '全部部门' || record.department === securityDepartment.value
    const parkOk = !park || record.parkValue === park
    const gateOk = !gate || record.gate === gate
    const keywordOk = !q || [record.date, record.title, record.status, record.park, record.host, record.number].join(' ').toLowerCase().includes(q)
    return deptOk && parkOk && gateOk && keywordOk
  })
})

// 用户 2026-11-15（第二轮 ⑦ / 第三轮 ⑥）：
// · 安保端出入登记点卡 → 进「安保端详情」（模板 id security-detail / 路由 /security/detail）
// · 用户端预约记录点卡 → 进「预约详情页」（模板 id appointment-detail / 路由 /appointment/detail）
// 两条都带 query 把当前这条记录的标题 / 状态 / 编号带过去，详情页按 query 渲染，缺省回落到 mock。
function openRecord(record) {
  if (props.embedded) {
    emit('navigate', 'security-detail')
    return
  }
  router.push({
    path: '/security/detail',
    query: {
      title: record.title,
      status: record.status,
      number: record.number
    }
  })
}

// 审批页：访客信息字段与用户详情页一致；「近一年来访 2 次」打开来访历史记录弹层
const showVisitHistory = ref(false)
// 页头下的 tabs-line（用户 2026-11-15 截图 2）：审批内容 / 审批记录
const approvalTabs = ['审批内容', '审批记录']
const approvalTab = ref('')
const currentApprovalTab = computed(() => approvalTab.value || approvalTabs[0])
// 审批记录时间线：与截图 2 的节点一致（发起节点 / 产品经理审核 / 部门长审批）
const approvalGroups = [
  { id: 'start', title: '发起节点', records: [{ id: 's1', approver: { name: '冯易' }, status: 'pending', statusLabel: '提交申请', comment: '提交流程', handledAt: '2016-07-11 10:00' }] },
  { id: 'pm', title: '产品经理审核', records: [{ id: 'p1', approver: { name: '郭星睿' }, status: 'approved', statusLabel: '通过', comment: '同意开展相关培训活动', handledAt: '2016-07-11 10:00' }] },
  { id: 'head', title: '部门长审批', records: [{ id: 'h1', approver: { name: '郭星睿' }, status: 'approved', statusLabel: '通过', comment: '同意开展相关培训活动', handledAt: '2016-07-11 10:00' }] }
]
const approvalMembers = Array.from({ length: 10 }, (_, index) => ({ id: `a${index}`, name: index === 0 ? '何方' : `同行人${index + 1}` }))
// 该笔预约没有登记车辆，车辆卡片走详情态空列表，显示「车辆（0）」
const approvalVehicles = []
const visitHistory = [
  { date: '2026/8/23来访', status: '已到访', statusKey: 'approved', approver: '张三', count: 4, desc: '与市场部团队洽谈 2026 年第二季度合作项目的详细方案，涵盖生产排期、交付时间节点，并实地参观生产车间与成品仓库' },
  { date: '2026/2/23来访', status: '未到访', statusKey: 'approving', approver: '张三', count: 4, desc: '会同生产部对新投产线进行验收与试运行测试，核查质量标准及安全规范，确认达标后方可正式投入使用' }
]

// 入园操作（2026-11-13 截图）：只用模拟数据 + 组件库组件，不引入未在需求里出现过的业务上限 / 校验规则
const entryStage = ref(props.stage === 'form' ? 'form' : 'select')
const entryKeyword = ref('')
const entrySelected = ref([])
const entryPeople = [
  { id: 'p1', name: '王桂山', idNo: '1234567890123', tags: [{ label: '已认证', status: 'approved' }] },
  { id: 'p2', name: '李卓豫', idNo: '1234567890123', tags: [{ label: '已认证', status: 'approved' }, { label: '已出园', status: 'exited' }] },
  { id: 'p3', name: '李卓豫', idNo: '1234567890123', photo: true, tags: [{ label: '主', status: 'neutral', variant: 'soft' }, { label: '已入园', status: 'entered' }] },
  { id: 'p4', name: '李卓豫', idNo: '', hint: '补同意授权', tags: [{ label: '未认证', status: 'neutral' }] }
]
const filteredEntryPeople = computed(() => {
  const q = entryKeyword.value.trim().toLowerCase()
  if (!q) return entryPeople
  return entryPeople.filter(p => [p.name, p.idNo].join(' ').toLowerCase().includes(q))
})
function toggleEntryPerson(id) {
  entrySelected.value = entrySelected.value.includes(id)
    ? entrySelected.value.filter(item => item !== id)
    : [...entrySelected.value, id]
}
// 用户 2026-11-15「图1 未认证、已入园的无法勾选」＝ 这两类人员按设计稿是禁用态：
// 已入园的人已经在厂区内、未认证的人没有授权，都不能进本单入园名单，所以勾选框灰底、整行点不动。
function isEntryDisabled(person) {
  return person.tags.some(tag => tag.label === '已入园' || tag.label === '未认证')
}
function selectEntryPerson(person) {
  if (isEntryDisabled(person)) {
    const reason = person.tags.some(tag => tag.label === '已入园') ? '已入园' : '未认证，需先补同意授权'
    notify(`「${person.name}」${reason}，无法勾选`)
    return
  }
  toggleEntryPerson(person.id)
}
// 入园人员回显第一步勾选的人（用户 2026-11-15：原来写死 5 个「张益达」）；
// 工作台直接把 stage 定到第二步、没有任何勾选时，回落到列表里的前两位，避免出现空名单。
const entryMembers = computed(() => {
  const picked = entryPeople.filter(person => entrySelected.value.includes(person.id))
  const source = picked.length ? picked : entryPeople.slice(0, 2)
  return source.map(person => ({ id: person.id, name: person.name }))
})
const entryCheckOptions = ['已完成证件核验', '已完成危险品确认', '已完成违禁物检查']
const entryChecks = ref([])
const entryRemark = ref('')
function entryBack() {
  if (entryStage.value === 'form') entryStage.value = 'select'
  else notify('已取消入园操作')
}
function entryNext() {
  if (entryStage.value === 'select') {
    if (!entrySelected.value.length) return notify('请先选择入园人员')
    entryStage.value = 'form'
  } else {
    notify('已提交入园登记')
  }
}

// 泰国同行人条款与字段
const agreePrivacy = ref(true)
const agreeData = ref(false)
const companionName = ref('')
const companionIdType = ref('国家身份证')
const companionIdNo = ref('')
const companionNames = ['张三', '李四', '王五', '赵六']
const idTypes = ['国家身份证', '护照', '驾照']
const showName = ref(false)
const showIdType = ref(false)
function pickName(option) {
  companionName.value = option.text || option
  showName.value = false
}
function pickIdType(option) {
  companionIdType.value = option.text || option
  showIdType.value = false
}
function confirmCompanion() {
  if (!companionName.value) return notify('请选择您的姓名')
  if (!companionIdNo.value.trim()) return notify('请输入证件号')
  if (!agreePrivacy.value || !agreeData.value) return notify('请先阅读并同意全部条款')
  notify('已确认同行，等待主访客审核')
}

const showRegulations = ref(false)
const showPrivacy = ref(false)
const regulations = [
  '来访须提前完成预约，并携带与预约信息一致的有效证件。',
  '请在门岗出示通行凭证，配合安保人员完成身份核验与出入登记。',
  '园区内禁止吸烟，未经许可不得拍照、录像或进入生产区域。',
  '请按指定路线通行，随身物品须接受安全检查。',
  '离园时请在门岗完成出园登记，凭证仅限预约当日有效。'
]

// 语言切换：复用组件库 LanguagePopup，按钮显示当前语言缩写（设计稿默认 EN）
const showLanguage = ref(false)
const languageCode = ref('EN')
const languageOptions = [
  { code: 'ZH', label: '中文', short: '中' },
  { code: 'EN', label: '英语', short: 'EN' },
  { code: 'TH', label: '泰语', short: 'TH' },
  { code: 'VN', label: '越南语', short: 'VN' }
]
const languageShort = computed(() => languageOptions.find(item => item.code === languageCode.value)?.short || 'EN')
function onLanguage(language) {
  languageCode.value = language.code
  notify(`已切换为${language.label}`)
}
</script>

<style scoped>
/* ============ 外壳 ============ */
.special-view { position: relative; width: 375px; min-height: 812px; margin: 0 auto; overflow: hidden; color: #1D2129; background: #F2F3F5; }
@media (max-width: 375px) { .special-view { width: 100%; } }

/* 渐变青 header（泰国同行人 ②1822:40540 / ①1822:39636 骨架相同）：
   box 88..140 → 0..52（paddingTop 20），header TEXT 24/32 落在 20..52；
   main 140 → 52，paddingTop 16 → alert 顶 68，alert 36 高，itemSpacing 16 → 白卡顶 120。 */
.grad-header { position: relative; height: 52px; padding: 20px 16px 0; box-sizing: border-box; display: flex; align-items: flex-start; justify-content: space-between; background: transparent; }
.grad-header h1 { margin: 0; color: #1D2129; font: 600 24px/32px "PingFang SC", sans-serif; }
.grad-header__lang { width: 52px; height: 32px; display: inline-flex; align-items: center; justify-content: center; gap: 4px; border: 1px solid #4E5969; border-radius: 4px; color: #1D2129; background: transparent; font: 400 14px/20px "PingFang SC", sans-serif; cursor: pointer; }

/* 通用青色链接 */
.ghost-link { border: 0; padding: 0; color: #00AAA6; background: transparent; font: 400 14px/22px "PingFang SC", sans-serif; cursor: pointer; text-decoration: none; }

/* ============ 凭证 / 暂无凭证：底部弹层 ============ */
.special-view--pass, .special-view--empty-pass { background: #7F838C; }
.sheet-page { min-height: 812px; display: flex; flex-direction: column; justify-content: flex-end; }
.sheet { background: #FFFFFF; border-radius: 20px 20px 0 0; }
.sheet__handle { display: block; width: 36px; height: 4px; margin: 12px auto 20px; border-radius: 2px; background: #E5E6EB; }
.pass { display: flex; flex-direction: column; align-items: center; padding: 0 24px 32px; text-align: center; }
.pass__tag { padding: 4px 12px; border-radius: 999px; color: #00AAA6; background: #E8F8F7; font: 600 12px/20px "PingFang SC", sans-serif; }
.pass h2 { margin: 12px 0 8px; color: #00AAA6; font: 600 16px/24px "PingFang SC", sans-serif; }
.pass strong { font: 600 18px/26px "PingFang SC", sans-serif; }
.pass p { margin: 4px 0 0; color: #86909C; font: 400 12px/18px "PingFang SC", sans-serif; }
.pass__qr { margin: 8px 0 0; }
.pass__qr :deep(.qr) { margin: 0; }
.pass small { margin-top: 8px; color: #86909C; font: 400 12px/18px "PingFang SC", sans-serif; }
.pass .ghost-link { margin-top: 16px; }
.empty-pass { display: flex; flex-direction: column; align-items: center; padding: 24px 32px 40px; text-align: center; }
.empty-pass img { width: 160px; height: 160px; object-fit: contain; }
.empty-pass p { margin: 0; color: #86909C; font: 400 14px/22px "PingFang SC", sans-serif; }
.empty-pass .ghost-link { margin-top: 20px; }

/* ============ 安保端出入登记：2026-11-13 由整页设计稿切图改为组件拼装（两个下拉与搜索都可交互） ============ */
.special-view--security-entry { background: #F2F3F5; }
.security-live__filters { padding: 12px 16px 16px; box-sizing: border-box; display: grid; gap: 12px; background: #FFFFFF; }
.security-live__list { padding: 12px 12px 24px; box-sizing: border-box; display: grid; justify-items: center; gap: 12px; }
.security-live__count { width: 100%; margin: 0; color: #86909C; font: 400 13px/20px "PingFang SC", sans-serif; }
.security-live__empty { width: 100%; margin: 24px 0 0; color: #86909C; text-align: center; font: 400 14px/22px "PingFang SC", sans-serif; }

/* ============ 入园操作 / 链接已过期（2026-11-13 截图）：只用组件库组件，不自绘勾选框 / 上传格 / 状态色块 ============ */
.special-view--entry { background: #2B2F38; }
.entry-page { min-height: 812px; display: flex; flex-direction: column; justify-content: flex-end; }
/* 表单步内容较长：把弹层限定在画布内，让白卡内部滚动，底部「上一步 / 提交」始终可见 */
.entry-sheet { display: flex; flex-direction: column; max-height: calc(812px - 80px); overflow: hidden; border-radius: 20px 20px 0 0; background: #F2F3F5; }
/* 弹层规范（用户 2026-11-13）：容器 #F2F3F5；action-header 默认 64px、标题不截断隐藏、超出换行；
   内容区左右 16px、内容卡 padding 16、块间距 12（list/form 自带间距不叠加）；
   底部操作 16px padding、总高度最高 80px。与 Popup.vue 组件保持同一口径。
   用户 2026-11-15「间距不对」：把手原先是 header 外的独立元素（12+20 外边距），叠加 header 的 20px 上内边距，
   把手到标题实际空了 40px。改用 Popup 同一口径：把手绝对定位在 header 顶部 8px，header 上内边距 8px，
   把手 8..12、标题 24..48，两者间距回到 12px。
   用户 2026-11-15「图4 标题和卡片间间距 8px」：标题 24..48 后，原 12px 下内边距 + 卡片 12px 外边距 = 24px，
   压成 header 下内边距 0 + 卡片上外边距 8px，标题底到卡片正好 8px（其余三边仍是 16/12 的既有口径）。 */
/* 用户 2026-11-15「入园操作标题默认 36px，和卡片的间距 8px」（Figma 标注 36 / 8）：
   · 标题行固定 36 高，标题文字在行内垂直居中；
   · 标题行距卡片上边 8px（.entry-card margin-top 8，仍是既有口径）；
   · 把手绝对定位在标题行上方的 8px 处，close 按钮撑满标题行高、贴右 16px。
   相比上一版的 16px 上内边距 + 24px 行高（标题块只有 24 高），这一版标题块正好 36。 */
.entry-sheet__header { flex: 0 0 auto; position: relative; height: 36px; margin-top: 20px; padding: 0 60px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; background: transparent; }
.entry-sheet__header > .sheet__handle { position: absolute; top: -12px; left: 50%; margin: 0; transform: translateX(-50%); }
.entry-sheet__header h2 { margin: 0; color: #1D2129; text-align: center; font: 600 18px/24px "PingFang SC", sans-serif; white-space: normal; overflow-wrap: anywhere; word-break: break-word; }
.entry-sheet__header button { position: absolute; top: 0; right: 16px; width: 36px; height: 36px; padding: 0; display: flex; align-items: center; justify-content: center; border: 0; border-radius: 50%; color: #86909C; background: #FFFFFF; cursor: pointer; }
.entry-card { flex: 1 1 auto; min-height: 0; overflow-y: auto; margin: 8px 16px 12px; padding: 16px; box-sizing: border-box; border-radius: 12px; background: #FFFFFF; }
/* 表单步的内容白卡由 CollapseItem 自身提供 padding，避免双层内边距 */
.entry-card--plain { padding: 0; }
.entry-person-list { margin-top: 12px; display: grid; gap: 16px; }
.entry-person { display: flex; align-items: flex-start; gap: 12px; cursor: pointer; }
.entry-person--disabled { cursor: not-allowed; }
.entry-person__avatar { width: 32px; height: 32px; flex: 0 0 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; color: #86909C; background: #F2F3F5; font: 400 14px/20px "PingFang SC", sans-serif; }
.entry-person__avatar--photo { color: #FFFFFF; background: #5A9E9B; }
.entry-person__info { min-width: 0; flex: 1; }
.entry-person__line { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }
.entry-person__line strong { color: #1D2129; font: 500 16px/24px "PingFang SC", sans-serif; }
.entry-person__id { display: flex; align-items: center; gap: 4px; margin: 4px 0 0; color: #86909C; font: 400 13px/20px "PingFang SC", sans-serif; overflow-wrap: anywhere; word-break: break-word; }
.entry-person__hint { margin: 4px 0 0; color: #86909C; font: 400 13px/20px "PingFang SC", sans-serif; }
.entry-person__check { flex: 0 0 auto; padding-top: 6px; }
/* 页脚只负责留白：底部操作 16px padding、总高度最高 80px（含 padding），内容垂直居中 */
/* 用户 2026-11-15「图1 底部操作栏没有背景，如图2」：设计稿的底部操作栏底色是 gray-2 #F2F3F5，
   原来这里是白底 #FFFFFF，看起来像「操作栏没有背景」。改成 #F2F3F5 后与弹层容器同色，
   只在按钮区域靠按钮本身区分（附加授权是纯图标 + 两行英文，不留底色）。 */
.entry-sheet__footer { flex: 0 0 auto; max-height: 80px; padding: 16px; box-sizing: border-box; display: flex; align-items: center; background: #F2F3F5; }

/* ============ 审批页 / 来访历史记录（2026-11-13 截图） ============ */
.special-view--approval { background: #F2F3F5; }
/* 页头（用户 2026-11-15「审批页少了页头」）：与预约详情页同款——标题 20/28 + 状态标签 +
   来访人 / 时间 / 访问园区 / 预约编号四行 14/22 #86909C，行间 4、与标签间距 8、底部 1px 分隔 */
.approval-view__head { padding: 16px; box-sizing: border-box; display: grid; gap: 8px; background: #FFFFFF; }
.approval-view__head h2 { margin: 0; color: #1D2129; font: 600 20px/28px "PingFang SC", sans-serif; white-space: normal; overflow-wrap: anywhere; word-break: break-word; }
/* grid 默认 stretch 会把 Tag 拉成整行色带，标签必须按内容宽度左对齐 */
.approval-view__head > .figma-tag { justify-self: start; }
.approval-view__head-meta { display: flex; flex-direction: column; gap: 4px; padding-top: 12px; border-top: 1px solid #F2F3F5; color: #86909C; font: 400 14px/22px "PingFang SC", sans-serif; white-space: normal; overflow-wrap: anywhere; word-break: break-word; }
.approval-view__body { padding: 12px 12px 16px; box-sizing: border-box; display: grid; gap: 12px; }
.approval-view__history-link { margin: 4px 0 0; padding: 0; display: inline-flex; align-items: center; gap: 4px; border: 0; color: #00AAA6; background: transparent; font: 400 14px/22px "PingFang SC", sans-serif; cursor: pointer; white-space: normal; overflow-wrap: anywhere; word-break: break-word; }
.approval-view__actions { max-height: 80px; padding: 16px; box-sizing: border-box; display: flex; align-items: center; background: #FFFFFF; }
.visit-history { display: grid; gap: 12px; }
.visit-history__total { margin: 0; color: #86909C; font: 400 13px/20px "PingFang SC", sans-serif; }
.visit-history__card { padding: 16px; box-sizing: border-box; border-radius: 12px; background: #FFFFFF; display: grid; gap: 8px; }
.visit-history__head { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; }
.visit-history__head strong { color: #1D2129; font: 600 16px/24px "PingFang SC", sans-serif; }
.visit-history__meta { margin: 0; color: #86909C; font: 400 13px/20px "PingFang SC", sans-serif; white-space: normal; overflow-wrap: anywhere; word-break: break-word; }
.visit-history__desc { margin: 0; color: #86909C; font: 400 13px/20px "PingFang SC", sans-serif; white-space: normal; overflow-wrap: anywhere; word-break: break-word; }

.special-view--link-expired { background: #F2F3F5; }
.expired { padding: 16px; }
.expired__card { padding: 24px 16px 16px; box-sizing: border-box; border-radius: 16px; background: #FFFFFF; }
.expired__invite { margin: 0; color: #86909C; text-align: center; font: 600 18px/28px "PingFang SC", sans-serif; white-space: normal; overflow-wrap: anywhere; word-break: break-word; }
.expired__addr { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 4px; margin: 8px 0 0; color: #86909C; text-align: center; font: 400 13px/20px "PingFang SC", sans-serif; white-space: normal; overflow-wrap: anywhere; word-break: break-word; }
.expired__action { width: 100%; margin-top: 16px; }

/* ============ 泰国同行人：间距按设计稿 1822:40540（②，与 ①1822:39636 骨架相同） ============ */
.special-view--companions { background: #F2F3F5 url('../assets/bg-image-2.svg') center top / 375px 486px no-repeat; }
.companion { padding: 16px 16px 24px; }
.companion__notice { display: flex; align-items: center; gap: 8px; height: 36px; box-sizing: border-box; margin: 0 0 16px; padding: 8px; border-radius: 10px; color: #B94D01; background: #FFF7E8; font: 400 13px/20px "PingFang SC", sans-serif; }
.companion__card { padding: 24px 16px; border-radius: 16px; background: #FFFFFF; }
.companion__title { margin: 0; color: #1D2129; text-align: center; font: 600 16px/24px "PingFang SC", sans-serif; }
.companion__invite { margin: 12px 0 0; color: #00AAA6; text-align: center; font: 600 18px/28px "PingFang SC", sans-serif; }
.companion__addr { display: flex; align-items: center; justify-content: center; gap: 4px; margin: 8px 0 0; color: #86909C; text-align: center; font: 400 12px/18px "PingFang SC", sans-serif; }
.companion__fields { margin-top: 24px; }
.companion__fields :deep(.figma-field) { width: 100%; }
.companion__confirm { width: 100%; height: 44px; margin-top: 24px; border: 0; border-radius: 999px; color: #FFFFFF; background: #22BBB3; font: 500 16px/24px "PingFang SC", sans-serif; cursor: pointer; }
.companion__agreements { display: grid; gap: 12px; margin-top: 16px; }
.companion__agreements :deep(.figma-checkbox > span:last-child) { white-space: normal; }

/* 访客须知横幅：用户 2026-11-10 提供完整背景图 regulations-banner.png（686×320 = 343×160 @2x），
   对应设计稿 1747:24891 / 1822:39663；背景图自带渐变、气泡与吉祥物，不再单独裁切插画。 */
.regulations { position: relative; min-height: 160px; margin-top: 16px; padding: 20px 16px; box-sizing: border-box; overflow: hidden; border-radius: 12px; background: #00757B url('../assets/regulations-banner.png') center center / 100% 100% no-repeat; display: flex; align-items: center; cursor: pointer; }
.regulations__text { position: relative; z-index: 1; }
.regulations__text em { display: block; color: rgba(255,255,255,.42); font: 600 24px/28px "PingFang SC", sans-serif; font-style: normal; }
.regulations__text strong { display: block; margin-top: 8px; color: #FFFFFF; font: 600 20px/26px "PingFang SC", sans-serif; }

/* 弹层正文（Popup slot） */
.sheet-card { padding: 16px; border-radius: 12px; background: #FFFFFF; }
.sheet-list { margin: 0; padding-left: 20px; display: grid; gap: 12px; color: #4E5969; font: 400 14px/22px "PingFang SC", sans-serif; }
.sheet-list li::marker { color: #00AAA6; }
.sheet-text { margin: 0; color: #4E5969; font: 400 14px/22px "PingFang SC", sans-serif; }

/* ============ 提交成功 · 分享给同行人 ============ */
/* Figma「——模板—— > 模板页 > 提交成功页」1553:22119（375×1145，含 navbar 88 / 底部工具栏 81）。
   原型不实现浏览器 chrome，故 card 顶 = 133 - 88 = 45px。
   顶部背景 = 设计稿背景图 bg-image-2.svg（375×486），非 CSS 渐变。 */
.special-view--share-success { background: #F2F3F5 url('../assets/bg-image-2.svg') center top / 375px 486px no-repeat; }
.share { padding: 45px 16px 32px; }
.share__card { padding: 40px 16px 16px; border-radius: 12px; background: #FFFFFF; display: flex; flex-direction: column; gap: 16px; }
.share__check { display: block; width: 80px; height: 80px; margin: 0 auto; }
.share__check svg { display: block; }
.share__title { margin: 0; color: #1D2129; text-align: center; font: 600 20px/28px "PingFang SC", sans-serif; }

/* 文案展示 311×442：白底 + 1px #E5E6EB 描边 + r16 + padding 24/16 + gap12 */
.share__inner { padding: 24px 16px; border: 1px solid #E5E6EB; border-radius: 16px; background: #FFFFFF; display: grid; justify-items: center; gap: 12px; }
.share__inner strong { color: #1D2129; text-align: center; font: 600 16px/22px "PingFang SC", sans-serif; }
.share__inner p { margin: 0; color: #86909C; text-align: center; font: 400 14px/22px "PingFang SC", sans-serif; }
.share__qr :deep(.qr) { margin: 0; }
.share__save { width: 100%; height: 44px; border: 0; border-radius: 999px; color: #FFFFFF; background: #22BBB3; font: 500 16px/20px "PingFang SC", sans-serif; cursor: pointer; }
.share__pair { width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.share__pair button { height: 44px; border: 1px solid #E5E6EB; border-radius: 999px; color: #1D2129; background: #FFFFFF; font: 500 16px/20px "PingFang SC", sans-serif; cursor: pointer; }
.share__inner small { color: #86909C; font: 400 14px/22px "PingFang SC", sans-serif; }

/* Frame 33 311×212：灰底 #F7F8FA + r8 + padding12 + gap8；label:value 连写左对齐 16/24 */
.share__info { padding: 12px; border-radius: 8px; background: #F7F8FA; display: grid; gap: 8px; }
.share__info p { margin: 0; color: #4E5969; font: 400 16px/24px "PingFang SC", sans-serif; }
.share__rule { height: 1px; background: #E5E6EB; }
.share__regulations { justify-self: center; display: inline-flex; align-items: center; gap: 8px; height: 32px; border: 0; padding: 0 16px; border-radius: 4px; color: #00AAA6; background: transparent; font: 400 14px/22px "PingFang SC", sans-serif; cursor: pointer; }
.share__regulations svg { display: block; }

/* 底部 311×44：两个 150×44 白底 + #22BBB3 描边胶囊 */
.share__actions { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.share__actions button { height: 44px; border: 1px solid #22BBB3; border-radius: 999px; color: #22BBB3; background: #FFFFFF; font: 500 16px/20px "PingFang SC", sans-serif; cursor: pointer; }

/* ============ 旧提交成功 ============ */
.special-content { padding: 12px 16px 32px; box-sizing: border-box; }
.success-content { padding-top: 80px; }
.success-card { padding: 16px; border-radius: 12px; background: #FFFFFF; text-align: center; }
/* 成功页对勾：字面色值走设计字号集合（原先 36px 不在 12/13/14/16/18/20/24 集合内，
   check-tokens 会拦；这里收到 24，圆形 56 不变，视觉上对勾居中即可） */
.success-icon { width: 56px; height: 56px; margin: 0 auto 12px; display: flex; align-items: center; justify-content: center; border-radius: 999px; color: #FFFFFF; background: #23C343; font-size: 24px; }
.success-card h2 { margin: 0; font: 600 20px/28px "PingFang SC", sans-serif; }
.success-card > p { margin: 8px 0 0; color: #4E5969; font: 400 14px/22px "PingFang SC", sans-serif; }

/* ============ 轻量反馈：与弹层一样收进手机画布，不相对桌面视口居中 ============ */
.page-toast { position: fixed; left: 50%; bottom: 80px; transform: translateX(-50%); z-index: 3000; max-width: 300px; padding: 10px 16px; box-sizing: border-box; border-radius: 8px; color: #FFFFFF; background: rgba(29,33,41,.88); font: 400 14px/22px "PingFang SC", sans-serif; text-align: center; }
.figma-phone .page-toast { position: absolute; bottom: 72px; }
</style>
