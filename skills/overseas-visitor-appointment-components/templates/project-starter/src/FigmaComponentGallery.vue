<template>
  <div class="gallery-shell">
    <!-- 左侧导航 -->
    <aside class="sidebar">
      <div class="brand">
        <p class="brand__eyebrow">Figma Component Library</p>
        <h1 class="brand__title">海外版访客预约<br />组件库预览</h1>
        <p class="brand__sub">375px 设计基准 · 组件独立预览</p>
      </div>

      <label class="filter">
        <span class="filter__icon">⌕</span>
        <input v-model="keyword" type="search" placeholder="搜索组件名 / Node ID" />
      </label>

      <nav class="nav">
        <section v-for="group in filteredGroups" :key="group.title" class="nav__group">
          <p class="nav__group-title">
            {{ group.title }}<span>{{ group.items.length }}</span>
          </p>
          <button
            v-for="item in group.items"
            :key="item.id"
            type="button"
            class="nav__item"
            :class="{ active: current.id === item.id }"
            @click="select(item)"
          >
            <span class="nav__name">{{ item.name }}</span>
            <span class="nav__id">{{ item.id }}</span>
          </button>
        </section>
        <p v-if="!filteredGroups.length" class="nav__empty">没有匹配的组件</p>
      </nav>

      <footer class="sidebar__footer">
        <p>Figma 文件 <code>JRpDmIIybR17xUVA8s9sK4</code></p>
        <p>已落地组件 21 个 · 均待 Figma 截图对照</p>
      </footer>
    </aside>

    <!-- 右侧展示 -->
    <main class="main">
      <header class="main__header">
        <div>
          <p class="main__crumb">{{ currentGroupTitle }} / {{ current.name }}</p>
          <h2 class="main__title"><code>{{ current.id }}</code></h2>
        </div>
        <span class="badge badge--pending">pending · 未完成 Figma 截图对照</span>
      </header>

      <section class="meta">
        <div><span>Figma Node</span><strong>{{ current.node }}</strong></div>
        <div><span>代码路径</span><strong>src/components/figma/{{ current.id }}.vue</strong></div>
        <div><span>说明</span><strong>{{ current.note }}</strong></div>
      </section>

      <section class="stage">
        <div class="phone">
          <div class="phone__bar">375 × 812</div>
          <div class="phone__screen">
            <!-- 通用组件 -->
            <template v-if="current.id === 'FigmaSteps'">
              <FigmaSteps :items="steps" :active="1" />
            </template>

            <template v-else-if="current.id === 'FigmaButton'">
              <h3 class="demo__title">主次 / 禁用</h3>
              <div class="demo__stack">
                <FigmaButton label="主按钮" />
                <FigmaButton label="次按钮" variant="secondary" />
                <FigmaButton label="禁用按钮" disabled />
              </div>
            </template>

            <template v-else-if="current.id === 'FigmaField'">
              <FigmaField label="来访日期" placeholder="请输入" required readonly link />
              <FigmaField label="手机号" prefix="+84" placeholder="请输入" required />
            </template>

            <template v-else-if="current.id === 'FigmaCheckbox'">
              <div class="demo__stack">
                <FigmaCheckbox v-model="checked">已选</FigmaCheckbox>
                <FigmaCheckbox>未选</FigmaCheckbox>
              </div>
            </template>

            <template v-else-if="current.id === 'FigmaTag'">
              <div class="demo__row">
                <FigmaTag label="已通过" status="success" />
                <FigmaTag label="待确认" status="warning" />
                <FigmaTag label="已退回" status="danger" />
                <FigmaTag label="已过期" status="neutral" />
              </div>
            </template>

            <template v-else-if="current.id === 'FigmaTabs'">
              <FigmaTabs :items="['审批内容', '审批记录']" />
            </template>

            <template v-else-if="current.id === 'FigmaSelectList'">
              <FigmaSelectList v-model="selectValue" :options="selectOptions" />
            </template>

            <template v-else-if="current.id === 'FigmaUploader'">
              <FigmaUploader label="本人照片上传" required hint="支持拍照或相册上传" />
            </template>

            <template v-else-if="current.id === 'FigmaEmptyState'">
              <FigmaEmptyState title="暂无预约记录" />
            </template>

            <template v-else-if="current.id === 'FigmaQRCode'">
              <FigmaQRCode caption="二维码占位" />
            </template>

            <template v-else-if="current.id === 'FigmaMemberPicker'">
              <FigmaMemberPicker v-model="selected" :members="members" :multiple="true" />
            </template>

            <!-- 业务组件 -->
            <template v-else-if="current.id === 'FigmaUserCard'">
              <FigmaUserCard name="何引琪" />
            </template>

            <template v-else-if="current.id === 'FigmaVehicleCard'">
              <FigmaVehicleCard plate="39A-12345" />
            </template>

            <template v-else-if="current.id === 'FigmaRegistrationCard'">
              <FigmaRegistrationCard :record="registration" />
            </template>

            <template v-else-if="current.id === 'FigmaFlowRecordCard'">
              <FigmaFlowRecordCard :items="flowItems" :people="people" />
            </template>

            <template v-else-if="current.id === 'FigmaApprovalTimeline'">
              <FigmaApprovalTimeline :items="flowItems" />
            </template>

            <template v-else-if="current.id === 'FigmaMemberSelectionFlow'">
              <FigmaMemberSelectionFlow v-model="selected" :members="members" />
            </template>

            <!-- 弹层与组合 -->
            <template v-else-if="current.kind === 'popup'">
              <div class="popup-demo">
                <p class="popup-demo__label">弹层组件</p>
                <p class="popup-demo__hint">
                  点击下方按钮，弹层以 <strong>375px</strong> 宽度在视口底部展示。
                  弹层挂载在 body 上，不受预览画布裁剪影响。
                </p>
                <FigmaButton v-if="current.id === 'FigmaPopup'" label="打开底部抽屉" @click="showPopup = true" />
                <FigmaButton v-else-if="current.id === 'FigmaDatePicker'" label="打开日期弹层" @click="showDate = true" />
                <FigmaButton v-else-if="current.id === 'FigmaLanguagePopup'" label="打开语言弹层" @click="showLanguage = true" />
                <FigmaButton v-else-if="current.id === 'FigmaPersonListPopup'" label="打开人员列表弹层" @click="showPerson = true" />
                <FigmaButton v-else-if="current.id === 'SelectListSheet'" label="打开列表选择抽屉" @click="showSelect = true" />
              </div>
            </template>
          </div>
        </div>

        <aside class="stage__note">
          <h3>待确认项</h3>
          <ul>
            <li>尚未完成与 Figma 节点的截图逐项对照</li>
            <li>组件状态保持 <code>pending</code>，不得用于页面模板</li>
            <li v-if="current.pendingNote">{{ current.pendingNote }}</li>
          </ul>
        </aside>
      </section>
    </main>

    <!-- 弹层实例：统一 375px -->
    <FigmaDatePicker v-model:show="showDate" />
    <van-popup v-model:show="showSelect" position="bottom" round class="figma-popup-375">
      <FigmaSelectList :options="selectOptions" model-value="学术访问" />
    </van-popup>
    <FigmaLanguagePopup v-model:show="showLanguage" :languages="languages" model-value="CN" />
    <FigmaPersonListPopup v-model:show="showPerson" title="入园人员" :members="people" deletable />
    <FigmaPopup v-model:show="showPopup" title="添加同行人">
      <FigmaField label="姓名" placeholder="请输入" />
      <div class="popup-buttons">
        <FigmaButton variant="secondary">保存并继续</FigmaButton>
        <FigmaButton>保存</FigmaButton>
      </div>
    </FigmaPopup>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import FigmaSteps from './components/figma/FigmaSteps.vue'
import FigmaButton from './components/figma/FigmaButton.vue'
import FigmaField from './components/figma/FigmaField.vue'
import FigmaCheckbox from './components/figma/FigmaCheckbox.vue'
import FigmaTabs from './components/figma/FigmaTabs.vue'
import FigmaTag from './components/figma/FigmaTag.vue'
import FigmaUserCard from './components/figma/FigmaUserCard.vue'
import FigmaVehicleCard from './components/figma/FigmaVehicleCard.vue'
import FigmaMemberPicker from './components/figma/FigmaMemberPicker.vue'
import FigmaApprovalTimeline from './components/figma/FigmaApprovalTimeline.vue'
import FigmaFlowRecordCard from './components/figma/FigmaFlowRecordCard.vue'
import FigmaRegistrationCard from './components/figma/FigmaRegistrationCard.vue'
import FigmaMemberSelectionFlow from './components/figma/FigmaMemberSelectionFlow.vue'
import FigmaUploader from './components/figma/FigmaUploader.vue'
import FigmaEmptyState from './components/figma/FigmaEmptyState.vue'
import FigmaQRCode from './components/figma/FigmaQRCode.vue'
import FigmaLanguagePopup from './components/figma/FigmaLanguagePopup.vue'
import FigmaPopup from './components/figma/FigmaPopup.vue'
import FigmaDatePicker from './components/figma/FigmaDatePicker.vue'
import FigmaSelectList from './components/figma/FigmaSelectList.vue'
import FigmaPersonListPopup from './components/figma/FigmaPersonListPopup.vue'

const groups = [
  {
    title: '通用组件',
    items: [
      { id: 'FigmaSteps', name: '步骤条', node: '1686:11131 · steps-dot 303×36', note: '三步流程指示' },
      { id: 'FigmaButton', name: '按钮', node: '1623:15263 / 1623:15264 / 1758:27929 / 1758:27931 · 200×44', note: '四个 button 变体' },
      { id: 'FigmaField', name: '输入框', node: '1551:11096 等 7 个 field-input · 311×76 / 311×98', note: '单行、多行、只读、手机号前缀' },
      { id: 'FigmaCheckbox', name: '复选框', node: '1551:11134 · 162×22', note: '协议与核查选择' },
      { id: 'FigmaTag', name: '状态标签', node: '1623:15312 / 1623:20316', note: 'tag / tag-fill 两组' },
      { id: 'FigmaTabs', name: '页签', node: '1623:20291 · tabs-line 343×42', note: '审批内容 / 审批记录' },
      { id: 'FigmaSelectList', name: '列表选择', node: '1721:27132 · Select List 343×156', note: '单选列表行与选中态' },
      { id: 'FigmaUploader', name: '图片上传', node: '1686:20447 · field-upload 311×132', note: 'Vant 仅提供上传行为' },
      { id: 'FigmaEmptyState', name: '空状态', node: '1723:28234 · 311×316', note: '使用本地 no-data 资源' },
      { id: 'FigmaQRCode', name: '二维码', node: '无独立 Figma 节点（本地占位资源）', note: '二维码占位', pendingNote: '二维码最小尺寸与真实图形来源待确认' },
      { id: 'FigmaMemberPicker', name: '成员胶囊', node: '1687:24188（API 未找到该节点）', note: '成员单选 / 多选胶囊', pendingNote: '需设计方提供正确 Node ID；候选 2165:15637 / 1718:20478' }
    ]
  },
  {
    title: '业务组件',
    items: [
      { id: 'FigmaUserCard', name: '人员卡片', node: '1623:15330 / 1623:13303 / 1623:15088', note: 'default / edit 两种形态' },
      { id: 'FigmaVehicleCard', name: '车辆卡片', node: '1623:15278 / 1722:27597 · 311×56', note: 'default / edit 两种形态' },
      { id: 'FigmaRegistrationCard', name: '登记卡片', node: '1723:28208 · card 351×156（归属待确认）', note: '安保登记列表卡片', pendingNote: '需确认该组件是否对应 Figma card 节点' },
      { id: 'FigmaFlowRecordCard', name: '流程记录卡片', node: '1687:24064 · 343×530', note: '入园 / 出园记录' },
      { id: 'FigmaApprovalTimeline', name: '审批时间线', node: '1722:27401 / 1687:24064', note: '纵向 dot-vertical 步骤' },
      { id: 'FigmaMemberSelectionFlow', name: '成员选择流程', node: '1803:33585 / 1803:33841 · 375×801', note: '选择入园人员 + 已选列表' }
    ]
  },
  {
    title: '弹层与组合',
    items: [
      { id: 'FigmaPopup', name: '底部抽屉', node: '1623:20325 · popup 375×328', note: '通用底部弹层容器', kind: 'popup' },
      { id: 'FigmaDatePicker', name: '日期弹层', node: '无确认 Figma 节点（van-calendar 行为）', note: '日期选择', kind: 'popup', pendingNote: '日期弹层的 Figma 节点与视觉状态待确认' },
      { id: 'FigmaLanguagePopup', name: '语言弹层', node: '无确认 Figma 节点', note: '中 / 英 / 越 / 泰切换', kind: 'popup', pendingNote: '语言弹层 Figma 节点待确认' },
      { id: 'FigmaPersonListPopup', name: '人员列表弹层', node: '1803:33841 · 已选列表（归属待确认）', note: '出园人 / 入园人列表', kind: 'popup', pendingNote: '需确认该弹层对应 Figma 节点' },
      { id: 'SelectListSheet', name: '列表选择抽屉', node: '1721:27132 + 1623:20325', note: '组合演示：SelectList 放入底部抽屉', kind: 'popup' }
    ]
  }
]

const keyword = ref('')
const current = ref(groups[0].items[0])

const filteredGroups = computed(() => {
  const q = keyword.value.trim().toLowerCase()
  if (!q) return groups
  return groups
    .map(g => ({
      ...g,
      items: g.items.filter(i =>
        [i.id, i.name, i.node].join(' ').toLowerCase().includes(q)
      )
    }))
    .filter(g => g.items.length)
})

const currentGroupTitle = computed(() =>
  groups.find(g => g.items.some(i => i.id === current.value.id))?.title || ''
)

function select(item) {
  current.value = item
}

const steps = ['预约信息', '访客信息', '信息确认']
const checked = ref(true)
const showDate = ref(false)
const showSelect = ref(false)
const showLanguage = ref(false)
const showPopup = ref(false)
const showPerson = ref(false)
const selected = ref(['1'])
const selectValue = ref('学术访问')
const members = [{ id: '1', name: '张益达' }, { id: '2', name: '何引琪' }, { id: '3', name: '张三' }]
const languages = [{ code: 'CN', label: '中文' }, { code: 'EN', label: '英语' }, { code: 'TH', label: '泰语' }, { code: 'VN', label: '越南语' }]
const selectOptions = ['商务', '学术访问', '英语']
const flowItems = [{ id: 1, time: '2026-08-01 09:21', operator: '李彤运', tag: '入园（5）', status: 'done', description: '访客寄存物品：2 个打火机，1 部手机。', people: '郭星睿，战益达，陈三，战硕硕', more: false }, { id: 2, time: '2026-08-01 19:21', operator: '李彤运', tag: '出园（10）', status: 'waiting', people: '郭星睿，战益达，陈三，战硕硕，张益达，战益达，陈三...', more: true }]
const people = [{ id: 'p1', name: '何枢' }, { id: 'p2', name: '王哇山' }, { id: 'p3', name: '李卓豫' }, { id: 'p4', name: '周家福' }, { id: 'p5', name: '郑文鉴' }, { id: 'p6', name: '何引琪' }, { id: 'p7', name: '周伟林' }]
const registration = { title: '2026/3/23日访问瑞嘉工业园区', status: '审批中', park: '瑞嘉工业园区', host: 'zhansna', number: 'VS20250728001' }
</script>

<style scoped>
.gallery-shell { min-height: 100vh; display: flex; color: #1D2129; background: #F2F3F5; }

/* 左侧导航 */
.sidebar { width: 264px; flex: 0 0 264px; height: 100vh; position: sticky; top: 0; box-sizing: border-box; padding: 24px 16px; display: flex; flex-direction: column; background: #FFFFFF; border-right: 1px solid #E5E6EB; }
.brand { padding: 0 8px; }
.brand__eyebrow { margin: 0 0 8px; color: #00AAA6; font: 600 12px/16px "PingFang SC", sans-serif; letter-spacing: .04em; }
.brand__title { margin: 0; font: 600 20px/28px "PingFang SC", sans-serif; }
.brand__sub { margin: 8px 0 0; color: #86909C; font: 400 12px/18px "PingFang SC", sans-serif; }
.filter { margin: 20px 0 8px; height: 36px; padding: 0 10px; box-sizing: border-box; display: flex; align-items: center; gap: 6px; border-radius: 12px; background: #F2F3F5; }
.filter__icon { color: #86909C; font-size: 18px; line-height: 1; }
.filter input { width: 100%; border: 0; outline: 0; color: #1D2129; background: transparent; font: 400 14px/20px "PingFang SC", sans-serif; }
.filter input::placeholder { color: #C9CDD4; }
.nav { flex: 1; min-height: 0; overflow-y: auto; padding-right: 4px; }
.nav__group { margin-top: 20px; }
.nav__group-title { margin: 0 0 8px; padding: 0 8px; display: flex; align-items: center; justify-content: space-between; color: #86909C; font: 600 12px/18px "PingFang SC", sans-serif; }
.nav__group-title span { min-width: 20px; height: 20px; border-radius: 6px; color: #4E5969; background: #F2F3F5; font: 500 12px/20px "PingFang SC", sans-serif; text-align: center; }
.nav__item { width: 100%; margin-bottom: 2px; padding: 8px 10px; box-sizing: border-box; display: flex; flex-direction: column; gap: 2px; border: 0; border-radius: 10px; color: #1D2129; background: transparent; text-align: left; cursor: pointer; }
.nav__item:hover { background: #F2F3F5; }
.nav__item.active { color: #00AAA6; background: #E8FFFB; }
.nav__name { font: 500 14px/20px "PingFang SC", sans-serif; }
.nav__id { color: #86909C; font: 400 11px/16px ui-monospace, SFMono-Regular, Menlo, monospace; }
.nav__item.active .nav__id { color: #4ACCC1; }
.nav__empty { padding: 16px 8px; color: #86909C; font-size: 14px; }
.sidebar__footer { padding: 12px 8px 0; border-top: 1px solid #F2F3F5; color: #86909C; font: 400 11px/18px "PingFang SC", sans-serif; }
.sidebar__footer p { margin: 0 0 4px; }
code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }

/* 右侧展示 */
.main { flex: 1; min-width: 0; padding: 32px 40px 56px; }
.main__header { max-width: 1000px; margin: 0 auto; display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; }
.main__crumb { margin: 0 0 6px; color: #86909C; font: 400 12px/18px "PingFang SC", sans-serif; }
.main__title { margin: 0; font: 600 24px/32px "PingFang SC", sans-serif; }
.main__title code { color: #1D2129; font-size: 24px; font-weight: 600; }
.badge { flex: 0 0 auto; padding: 6px 10px; border-radius: 20px; font: 500 12px/18px "PingFang SC", sans-serif; }
.badge--pending { color: #86909C; background: #E5E6EB; }
.meta { max-width: 1000px; margin: 20px auto 0; padding: 16px 20px; box-sizing: border-box; display: grid; gap: 10px; border-radius: 12px; background: #FFFFFF; }
.meta div { display: grid; grid-template-columns: 88px 1fr; gap: 12px; align-items: baseline; }
.meta span { color: #86909C; font: 400 12px/18px "PingFang SC", sans-serif; }
.meta strong { color: #1D2129; font: 400 13px/20px ui-monospace, SFMono-Regular, Menlo, monospace; word-break: break-all; }
.stage { max-width: 1000px; margin: 24px auto 0; display: flex; align-items: flex-start; gap: 24px; }

/* 375px 手机画布 */
.phone { width: 375px; flex: 0 0 375px; box-sizing: border-box; padding: 0 0 8px; border-radius: 20px; background: #FFFFFF; box-shadow: 0 8px 32px rgba(29, 33, 41, .10); overflow: hidden; }
.phone__bar { height: 28px; display: flex; align-items: center; justify-content: center; color: #C9CDD4; background: #F7F8FA; font: 500 11px/28px ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .06em; }
.phone__screen { min-height: 480px; padding: 16px; box-sizing: border-box; }
.demo__title { margin: 0 0 12px; color: #86909C; font: 400 12px/18px "PingFang SC", sans-serif; }
.demo__stack { display: grid; gap: 12px; }
.demo__row { display: flex; flex-wrap: wrap; gap: 8px; }
.popup-demo { padding: 16px 0; text-align: center; }
.popup-demo__label { margin: 0 0 8px; color: #4E5969; font: 600 16px/24px "PingFang SC", sans-serif; }
.popup-demo__hint { margin: 0 auto 24px; max-width: 300px; color: #86909C; font: 400 12px/20px "PingFang SC", sans-serif; text-align: left; }
.popup-demo__hint strong { color: #00AAA6; }
.popup-demo :deep(.figma-button) { width: 200px; margin: 0 auto; }
.popup-buttons { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 20px; }
.stage__note { flex: 1; min-width: 0; padding: 16px 20px; box-sizing: border-box; border-radius: 12px; background: #FFFFFF; }
.stage__note h3 { margin: 0 0 10px; font: 600 14px/22px "PingFang SC", sans-serif; }
.stage__note ul { margin: 0; padding-left: 18px; color: #4E5969; font: 400 13px/22px "PingFang SC", sans-serif; }
.stage__note li { margin-bottom: 6px; }

@media (max-width: 1100px) {
  .stage { flex-direction: column; }
  .stage__note { width: 375px; flex: 0 0 auto; box-sizing: border-box; }
}
@media (max-width: 760px) {
  .gallery-shell { flex-direction: column; }
  .sidebar { width: 100%; height: auto; flex: 0 0 auto; position: static; padding: 16px; }
  .nav { max-height: 240px; }
  .main { padding: 20px 16px 40px; }
  .phone, .stage__note { width: 100%; flex: 0 0 auto; }
  .phone { max-width: 375px; }
  .meta div { grid-template-columns: 1fr; gap: 2px; }
}
</style>
