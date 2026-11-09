<template>
  <div class="gallery-shell">
    <!-- 左侧导航 -->
    <aside class="sidebar">
      <div class="brand">
        <p class="brand__eyebrow">Component Library</p>
        <h1 class="brand__title">海外版访客预约<br />组件库预览</h1>
        <p class="brand__sub">375px 设计基准 · 组件独立预览</p>
      </div>

      <label class="filter">
        <span class="filter__icon">⌕</span>
        <input v-model="keyword" type="search" placeholder="搜索组件名 / Node ID" />
      </label>

      <nav class="nav">
        <section v-for="group in filteredGroups" :key="group.title" class="nav__group">
          <p class="nav__group-title">{{ group.title }}<span>{{ group.items.length }}</span></p>
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
        <p>独立组件 22 个 · 均待 Figma 截图对照</p>
      </footer>
    </aside>

    <!-- 右侧展示：组件视图一屏展示；设计规范面板为长文档，保留滚动 -->
    <main class="main" :class="{ 'main--fit': !isSpec && !isSpecial, 'main--special': isSpecial }">
      <DesignSpecPanel v-if="isSpec" />
      <SpecialPagesPreview v-else-if="isSpecial" />
      <template v-else>
        <header class="main__header">
          <div>
            <p class="main__crumb">{{ currentGroupTitle }} / {{ current.name }}</p>
            <h2 class="main__title"><code>{{ current.id }}</code></h2>
          </div>
          <span class="badge" :class="current.kind === 'page' ? 'badge--prototype' : 'badge--pending'">{{ current.kind === 'page' ? 'prototype · mock' : 'pending · 未完成 Figma 截图对照' }}</span>
        </header>

        <section class="meta">
          <div class="meta__primary"><span>所在页面 / 位置</span><strong>{{ current.at }}</strong></div>
          <div><span>Figma Node（检索值）</span><strong>{{ current.node }}</strong></div>
          <div v-if="figmaLinks.length"><span>在 Figma 打开</span><strong class="meta__links"><a v-for="l in figmaLinks" :key="l.id" :href="l.url" target="_blank" rel="noopener">{{ l.id }} ↗</a></strong></div>
          <div><span>代码路径</span><strong>{{ codePath }}</strong></div>
          <div><span>说明</span><strong>{{ current.note }}</strong></div>
        </section>

        <section class="stage">
          <div class="phone-frame">
            <div class="phone figma-phone">
              <div class="phone__bar">375 × 812 · 1:1</div>
              <div class="phone__screen">
      <template v-if="current.kind === 'page'">
        <component :is="current.component" />
      </template>
      <template v-else-if="current.id === 'Field'">
                  <p class="demo__state">默认</p>
                  <Field label="labe" placeholder="请输入" state="default" />
                  <p class="demo__state">聚焦</p>
                  <Field label="labe" placeholder="请输入" state="focus" />
                  <p class="demo__state">填充</p>
                  <Field label="labe" model-value="内容" required link state="filled" />
                  <p class="demo__state">只读</p>
                  <Field label="来访日期" model-value="2026-07-09" state="readonly" />
                  <p class="demo__state">禁用</p>
                  <Field label="labe" model-value="已禁用" required link state="disabled" />
                  <p class="demo__state">成员 · 默认 / 填充 / 只读</p>
                  <Field label="入园人员" placeholder="请选择" required link state="default" />
                  <Field label="入园人员" :members="chipMembers" required link state="filled" deletable />
                  <Field label="入园人员" :members="chipMembers" required state="readonly" />
                </template>

                <template v-else-if="current.id === 'FieldDate'">
                  <Field v-model="visitDate" label="来访日期" placeholder="请选择日期" required readonly link state="readonly" @click="showDate = true" />
                  <Field label="结束日期" model-value="2026-07-12" state="readonly" />
                  <p class="demo__hint">只读 Field 整行点击 → 独立 Popup（DatePicker）在手机画布内弹出，选完回填。</p>
                </template>

                <template v-else-if="current.id === 'FieldLanguage'">
                  <Field :model-value="currentLanguage" label="语言" placeholder="请选择" required readonly link state="readonly" @click="showLanguage = true" />
                  <p class="demo__hint">语言选择放在 Field 只读态里，弹层由独立 Popup 组件承载。</p>
                </template>

                <template v-else-if="current.id === 'FieldInput'">
                  <Field label="单行输入" placeholder="请输入" />
                  <Field label="手机号" prefix="+84" placeholder="请输入" required />
                  <Field label="多行输入" placeholder="请输入" textarea :maxlength="200" />
                  <Field label="单行输入" placeholder="请输入" error="错误信息" />
                  <p class="demo__hint">Figma 1551:11096 / 1718:20281：单行 311×76、带错误提示 311×98、多行 311×100（多行另有 word-limit 计数）。</p>
                  <p class="demo__state">ContentRow · 列表内容行</p>
                  <ContentRow />
                  <ContentRow title="中国" code="+86" :checked="false" />
                  <p class="demo__state">InlineInput · 行内状态标签</p>
                  <div class="demo__row">
                    <InlineInput />
                    <InlineInput text="待入园" background="#EF8432" :after="false" />
                  </div>
                </template>

                <!-- 通用组件 -->
                <template v-else-if="current.id === 'Steps'"><Steps :items="steps" :active="1" /></template>

                <template v-else-if="current.id === 'Button'">
                  <p class="demo__state">尺寸 · 大 / 中 / 小</p>
                  <div class="demo__row matrix__size">
                    <Button label="主要按钮" size="large" :block="false" />
                    <Button label="主要按钮" :block="false" />
                    <Button label="主要按钮" size="small" :block="false" />
                  </div>
                  <p class="demo__state">5 色系 × 3 形态</p>
                  <div class="matrix__head"><span>实心</span><span>描边</span><span>禁用</span></div>
                  <div v-for="tone in tones" :key="tone.key" class="matrix__row">
                    <Button v-for="form in forms" :key="form" :tone="tone.key" :form="form" label="主要按钮" :block="false" />
                  </div>
                </template>

                <template v-else-if="current.id === 'Checkbox'">
                  <div class="demo__stack"><Checkbox v-model="checked">已选</Checkbox><Checkbox>未选</Checkbox></div>
                </template>

                <template v-else-if="current.id === 'Tag'">
                  <div class="demo__row">
                    <Tag label="已通过" status="success" /><Tag label="待确认" status="warning" />
                    <Tag label="已退回" status="danger" /><Tag label="已过期" status="neutral" />
                  </div>
                </template>

                <template v-else-if="current.id === 'Tabs'"><Tabs :items="['审批内容', '审批记录']" /></template>
                <template v-else-if="current.id === 'SelectList'"><SelectList v-model="selectValue" :options="selectOptions" /></template>
                <template v-else-if="current.id === 'Uploader'"><Uploader label="本人照片上传" required hint="支持拍照或相册上传" /></template>
                <template v-else-if="current.id === 'EmptyState'"><EmptyState title="暂无预约记录" /></template>
                <template v-else-if="current.id === 'QRCode'"><QRCode caption="二维码占位（展示用）" /></template>
                <template v-else-if="current.id === 'ContentRow'">
                  <ContentRow />
                  <ContentRow title="中国" code="+86" :checked="false" />
                  <ContentRow title="越南" code="+84" required />
                  <p class="demo__hint">Figma 1686:23205「content」：国旗 + 国家名 + 区号 + 勾选。</p>
                </template>
                <template v-else-if="current.id === 'InlineInput'">
                  <div class="demo__row">
                    <InlineInput /><InlineInput text="待入园" background="#EF8432" :after="false" />
                    <InlineInput text="已退回" background="#E24F48" :after="false" />
                  </div>
                  <p class="demo__hint">Figma 1893:20270「input」：视觉是行内状态标签，不是文本输入框。</p>
                </template>

                <!-- 业务组件 -->
                <template v-else-if="current.id === 'UserCard'">
                  <p class="demo__state">默认</p>
                  <UserCard />
                  <p class="demo__state">填充 · 可编辑</p>
                  <UserCard :name="userCardName" :state="userCardName ? 'filled' : 'default'" editable @edit="userCardEditRequested = true" @update:name="userCardName = $event" @remove="userCardName = ''" />
                  <p class="demo__state">详情 · 更多</p>
                  <UserCard state="detail" :members="people" count="11" @more="userCardMoreRequested = true" />
                  <p class="demo__hint">默认、填充、详情共用同一个列表卡片；填充态支持编辑和删除，详情态通过“更多”打开人员列表。</p>
                </template>
                <template v-else-if="current.id === 'VehicleCard'">
                  <p class="demo__state">默认</p>
                  <VehicleCard />
                  <p class="demo__state">填充 · 可编辑</p>
                  <VehicleCard :plate="vehiclePlate" :state="vehiclePlate ? 'filled' : 'default'" editable @update:plate="vehiclePlate = $event" @remove="vehiclePlate = ''" />
                  <p class="demo__state">详情 · 更多</p>
                  <VehicleCard state="detail" :plates="vehicleRows" count="0" @more="vehicleMoreRequested = true" />
                  <p class="demo__hint">默认、填充、详情共用同一个列表卡片；填充态支持编辑和删除，Popup 的间距由统一容器提供。</p>
                </template>
                <template v-else-if="current.id === 'CardVariants'">
                  <CardVariants :registration="registration" />
                  <p class="demo__hint">四种业务卡片样式：带图片摘要、访客摘要、来访记录和预约登记卡片。</p>
                </template>
                <template v-else-if="current.id === 'RegistrationCard'"><RegistrationCard :record="registration" /></template>
                <template v-else-if="current.id === 'ApprovalRecord'">
                  <ApprovalRecord :groups="approvalGroups" />
                  <p class="demo__hint">按直属领导审批、一级审批人、二级审批人分组；每组展示审批人、状态、时间和审批意见，支持顶部整体折叠。</p>
                </template>
                <template v-else-if="current.id === 'ApprovalTimeline'">
                  <ApprovalTimeline :items="flowItems" :people="people" />
                  <p class="demo__hint">入园显示绿色「入园（5）」；出园显示中性「出园（10）」；「更多」紧跟人员文本显示，点击打开对应的入园人 / 出园人列表。</p>
                </template>

                <!-- Popup 独立组件展示 -->
                <template v-else-if="current.kind === 'popup'">
                  <div class="popup-demo">
                    <p class="popup-demo__label">{{ current.name }}</p>
                    <p class="popup-demo__hint">弹层与遮罩只覆盖 375×812 手机画布。弹层最大高度 = 画布高 − 顶部预留 80px；成员选择与已选列表直接撑到上限，其余按内容自适应。</p>
                    <Button v-if="current.id === 'Popup'" label="打开底部抽屉" @click="showPopup = true" />
                    <Button v-else-if="current.id === 'DatePicker'" label="打开日期弹层" @click="showDate = true" />
                    <Button v-else-if="current.id === 'LanguagePopup'" label="打开语言弹层" @click="showLanguage = true" />
                    <Button v-else-if="current.id === 'PersonListPopup'" label="打开已选列表（最大高度）" @click="showPerson = true" />
                    <Button v-else-if="current.id === 'SelectListSheet'" label="打开列表选择抽屉" @click="showSelect = true" />
                  </div>
                </template>
              </div>

              <!-- 弹层实例挂在手机画布内 -->
              <DatePicker v-model:show="showDate" @confirm="onDateConfirm" />
              <van-popup v-model:show="showSelect" position="bottom" round class="figma-popup-375">
                <SelectList :options="selectOptions" model-value="学术访问" />
              </van-popup>
              <LanguagePopup v-model:show="showLanguage" :languages="languages" :model-value="languageCode" @select="onLanguageSelect" />
              <PersonListPopup v-model:show="showPerson" title="已选择" :members="people" deletable />
              <Popup v-model:show="showPopup" title="添加同行人">
                <Field label="姓名" placeholder="请输入" />
                <div class="popup-buttons">
                  <Button variant="secondary">保存并继续</Button>
                  <Button>保存</Button>
                </div>
              </Popup>
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
      </template>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import HomePage from './pages/HomePage.vue'
import AppointmentFormPage from './pages/AppointmentFormPage.vue'
import AppointmentDetailPage from './pages/AppointmentDetailPage.vue'
import SpecialPagesPreview from './pages/SpecialPagesPreview.vue'
import Steps from './components/figma/Steps.vue'
import Button from './components/figma/Button.vue'
import Field from './components/figma/Field.vue'
import Checkbox from './components/figma/Checkbox.vue'
import Tabs from './components/figma/Tabs.vue'
import Tag from './components/figma/Tag.vue'
import UserCard from './components/figma/UserCard.vue'
import VehicleCard from './components/figma/VehicleCard.vue'
import ApprovalRecord from './components/figma/ApprovalRecord.vue'
import ApprovalTimeline from './components/figma/ApprovalTimeline.vue'
import CardVariants from './components/figma/CardVariants.vue'
import RegistrationCard from './components/figma/RegistrationCard.vue'
import Uploader from './components/figma/Uploader.vue'
import EmptyState from './components/figma/EmptyState.vue'
import QRCode from './components/figma/QRCode.vue'
import LanguagePopup from './components/figma/LanguagePopup.vue'
import Popup from './components/figma/Popup.vue'
import DatePicker from './components/figma/DatePicker.vue'
import SelectList from './components/figma/SelectList.vue'
import PersonListPopup from './components/figma/PersonListPopup.vue'
import ContentRow from './components/figma/ContentRow.vue'
import InlineInput from './components/figma/InlineInput.vue'
import DesignSpecPanel from './DesignSpecPanel.vue'

// 2026-11-06：Field 菜单收纳输入类演示；Popup 作为独立组件分组展示。
const groups = [
  {
    title: '设计规范',
    items: [
      { id: 'DesignSpec', name: '设计规范总览', kind: 'spec', node: '1723:27897 / 1722:27845 / 1550:3803 / 1824:42919', note: '颜色 · 字体与行高 · 间距 · 圆角 · 阴影 · 控件尺寸 · 范围约定', at: '——模板—— > Color Guidance / Elevation 规范画板 + 整合页面 > 泰国' }
    ]
  },
  {
    title: '典型页面',
    items: [
      { id: 'VisitorHomePage', name: '访客预约首页', kind: 'page', component: HomePage, node: '访客预约首页 · 中国版 mock', note: '首页、语言切换、新建预约和预约记录入口', at: '典型页面 · visitor-home' },
      { id: 'AppointmentFormPage', name: '新建预约流程', kind: 'page', component: AppointmentFormPage, node: '访客预约02 · 中国版 mock', note: '预约信息 → 访客信息 → 信息确认三步流程', at: '典型页面 · appointment-form' },
      { id: 'AppointmentDetailPage', name: '预约详情页', kind: 'page', component: AppointmentDetailPage, node: '预约详情 · 中国版 mock', note: '详情头、审批记录和出入记录', at: '典型页面 · appointment-detail' },
      { id: 'SpecialPagesPreview', name: '特殊页面平铺', kind: 'special', component: SpecialPagesPreview, node: '用户提供的特殊页面设计稿', note: '提交成功、通行证、空记录、安保登记、预约详情等页面平铺预览', at: '典型页面 · special-pages' }
    ]
  },
  {
    title: 'Field',
    items: [
      { id: 'Field', name: '输入框 · 5 态', node: '5:374 field-input 组件集；实例 1551:11096 等 · 311×76 / 311×98', note: '默认 / 聚焦 / 填充 / 只读 / 禁用；视觉依据为用户 11-06 提供的状态截图', pendingNote: 'Figma 组件集无「聚焦」变体，聚焦态按截图实现', at: '——模板—— > 通用组件 > field-input' },
      { id: 'FieldDate', name: '日期选择', kind: 'demo', node: 'Field 只读态 + DatePicker', note: '日期选择放在输入框里，弹层拆为独立 Popup', at: '组合演示 · Field 只读态 + DatePicker 弹层' },
      { id: 'FieldLanguage', name: '语言选择', kind: 'demo', node: 'Field 只读态 + LanguagePopup', note: '语言选择放在输入框里，弹层拆为独立 Popup', at: '组合演示 · Field 只读态 + LanguagePopup 弹层' },
      { id: 'FieldInput', name: '输入类', kind: 'demo', node: 'Field / ContentRow 1686:23205 / InlineInput 1893:20270', note: '单行、多行、手机号前缀、列表内容行、行内状态标签', at: '——模板—— > 通用组件 > content' }
    ]
  },
  {
    title: '通用组件',
    items: [
      { id: 'Steps', name: '步骤条', node: '1686:11131 · steps-dot 303×36', note: '三步流程指示', at: '——模板—— > 通用组件 > steps-dot' },
      { id: 'Button', name: '按钮', node: '用户 11-06 变体截图（5 色系 × 3 形态）+ Figma 1623:15263 等 4 实例', note: '色系 × 形态结构取自变体截图；主色（teal）= Figma 实测 #22BBB3（84 处），其余 4 色仍为截图取色', pendingNote: '5 色系的业务语义名称待确认，现按颜色命名；红/橙/绿与各禁用色仅有截图来源、无节点依据', at: '——模板—— > 通用组件 > button' },
      { id: 'Checkbox', name: '复选框', node: '1551:11134 · 162×22', note: '协议与核查选择', at: '——模板—— > 通用组件 > checkbox' },
      { id: 'Tag', name: '状态标签', node: '1623:15312 / 1623:20316', note: 'tag / tag-fill 两组', at: '——模板—— > 通用组件 > tag' },
      { id: 'Tabs', name: '页签', node: '1623:20291 · tabs-line 343×42', note: '审批内容 / 审批记录', at: '——模板—— > 通用组件 > tabs-line' },
      { id: 'SelectList', name: '列表选择', node: '1721:27132 · Select List 343×156', note: '单选列表行与选中态', at: '——模板—— > 通用组件 > Select List' },
      { id: 'Uploader', name: '图片上传', node: '1686:20447 · field-upload 311×132', note: 'Vant 仅提供上传行为', at: '——模板—— > 通用组件 > field-upload' },
      { id: 'EmptyState', name: '空状态', node: '1723:28234 · 311×316', note: '使用本地 no-data 资源', at: '——模板—— > 通用组件 > 空状态' },
      { id: 'QRCode', name: '二维码', node: '无独立 Figma 节点（本地占位资源）', note: '假码仅展示用，最小 160；样式沿用用户提供的资源', pendingNote: '所用资源是否即 qr-placeholder.png 待确认', at: '无独立 Figma 节点 · 本地占位资源' },
      { id: 'ContentRow', name: '列表内容行', node: '1686:23205 · content 343×44（主组件 36:3918）', note: '国旗 + 国家名 + 区号 + 勾选；已从 Figma 导出截图核对', at: '——模板—— > 通用组件 > content' },
      { id: 'InlineInput', name: '行内状态标签', node: '1893:20270 · input 62×22（主组件 13:8238）', note: '绿色胶囊 + 白字 + 前后图标；视觉是状态标签，名称沿用 Figma 节点名', at: '——模板—— > 业务组件 > input' }
    ]
  },
  {
    title: '业务组件',
    items: [
      { id: 'UserCard', name: '人员卡片', node: '1623:15330 / 1623:13303 / 1623:15088', note: '默认 / 填充两种状态；填充态支持编辑和删除事件', at: '——模板—— > 业务组件 > user-card-default' },
      { id: 'VehicleCard', name: '车辆卡片', node: '1623:15278 / 1722:27597 · 311×56', note: '默认 / 填充两种状态；填充态支持编辑弹层和删除', at: '——模板—— > 业务组件 > 车辆card-edit' },
      { id: 'CardVariants', name: '卡片四种样式', node: '用户提供的四种卡片截图', note: '图片摘要、访客摘要、来访记录、预约登记四种业务卡片样式组合预览', at: '组合演示 · 业务卡片样式' },
      { id: 'RegistrationCard', name: '登记卡片', node: '1723:28208 · llistcard 351×156（归属已确认）', note: '安保登记列表卡片', at: '——模板—— > 业务组件 > llistcard' },
      { id: 'ApprovalRecord', name: '审批记录', node: '1722:27401 · 审批记录 343×330', note: '折叠列表 + 直属领导审批 / 一级审批人 / 二级审批人；展示审批人、状态、时间和意见', at: '——模板—— > 业务组件 > 审批记录' },
      { id: 'ApprovalTimeline', name: '出入记录', node: '1687:24064 · 流程记录 343×530', note: '入园 / 出园时间线；“更多”打开入园人或出园人只读列表', at: '——模板—— > 通用组件 > 出入记录' }

    ]
  },
  {
    title: 'Popup',
    items: [
      { id: 'Popup', name: '底部抽屉', node: '1623:20325 · popup 375×328', note: '通用底部弹层容器；内容自适应，最大高度 = 画布高 − 顶部 80px', kind: 'popup', at: '——模板—— > 通用组件 > 底部抽屉' },
      { id: 'DatePicker', name: '日期弹层', node: '无确认 Figma 节点（van-calendar 行为）', note: 'Field 只读态点击后弹出的独立 Popup', kind: 'popup', at: '无确认 Figma 节点 · van-calendar 行为' },
      { id: 'LanguagePopup', name: '语言弹层', node: '4:4202 · 切换语言 375×812（cascader 375×357）', note: '标题「切换语言」；卡片上下 20、行高 44、行间 12、无分割线；关闭按钮 36×36', kind: 'popup', at: '越南版-用户端 > 越南版访客预约填报 > 切换语言' },
      { id: 'PersonListPopup', name: '已选列表弹层', node: '1803:33841 · 已选列表 375×801', note: '撑到最大高度（画布高 − 80px）；左上返回、右上清空、行内单个删除', kind: 'popup', at: '——模板—— > 通用组件 > 已选列表' },
      { id: 'SelectListSheet', name: '列表选择抽屉', node: '1721:27132 + 1623:20325', note: '组合演示：SelectList 放入底部抽屉', kind: 'popup', at: '——模板—— > 通用组件 > Select List' }
    ]
  }
]

const keyword = ref('')
const current = ref(groups[0].items[0])
const filteredGroups = computed(() => {
  const q = keyword.value.trim().toLowerCase()
  if (!q) return groups
  return groups.map(g => ({ ...g, items: g.items.filter(i => [i.id, i.name, i.node, i.at].join(' ').toLowerCase().includes(q)) })).filter(g => g.items.length)
})
const currentGroupTitle = computed(() => groups.find(g => g.items.some(i => i.id === current.value.id))?.title || '')
const isSpec = computed(() => current.value.kind === 'spec')
const isSpecial = computed(() => current.value.kind === 'special')
const codePath = computed(() => {
  if (current.value.kind === 'page' || current.value.kind === 'special') return `src/pages/${current.value.id}.vue`
  if (current.value.kind === 'demo') return 'Field 菜单组合演示，无独立 .vue'
  if (current.value.id === 'SelectListSheet') return '画廊内组合演示，无独立 .vue'
  return `src/components/figma/${current.value.id}.vue`
})

// 编号本身看不出是哪个页面，这里给出直达 Figma 的链接，点开即可现场核对。
// 已核实为无效的编号（全文件 0 处 + /nodes NOT FOUND）不生成链接，避免跳到空节点。
const FIGMA_KEY = 'JRpDmIIybR17xUVA8s9sK4'
const INVALID_NODES = new Set(['1687:24188', '0:2331', '1042:20001', '309:10570', '309:10598', '324:11951', '324:11952', '4735:28958', '644:10040', '644:10066', '644:10131'])
const figmaLinks = computed(() => {
  const ids = (current.value.node || '').match(/\b\d{1,4}:\d{2,6}\b/g) || []
  return [...new Set(ids)]
    .filter(id => !INVALID_NODES.has(id))
    .slice(0, 4)
    .map(id => ({ id, url: `https://www.figma.com/design/${FIGMA_KEY}/?node-id=${id.replace(':', '-')}` }))
})

// 用户 2026-11-09 裁决「撑满一屏不要缩放」：画布保持 1:1 原尺寸，
// 由 stage 容器吃掉剩余视口高度，超出部分在手机屏内部滚动，不再做 transform scale。
function select(item) {
  current.value = item
  showDate.value = false; showSelect.value = false; showLanguage.value = false
  showPopup.value = false; showPerson.value = false
}

const steps = ['预约信息', '访客信息', '信息确认']
const tones = [
  { key: 'teal' }, { key: 'red' }, { key: 'orange' }, { key: 'green' }, { key: 'neutral' }
]
const forms = ['solid', 'outline', 'disabled']
const checked = ref(true)
const showDate = ref(false)
const showSelect = ref(false)
const showLanguage = ref(false)
const showPopup = ref(false)
const showPerson = ref(false)
const userCardName = ref('何引琪')
const userCardEditRequested = ref(false)
const userCardMoreRequested = ref(false)
const vehiclePlate = ref('39A-12345')
const vehicleMoreRequested = ref(false)
const vehicleRows = [{ id: 'v1', plate: '39A-12345', type: '大巴' }, { id: 'v2', plate: '39A-12345', type: '大巴' }]
const selectValue = ref('学术访问')
const visitDate = ref('')
const languageCode = ref('CN')
const currentLanguage = computed(() => languages.find(x => x.code === languageCode.value)?.label || '')
function onLanguageSelect(x) { languageCode.value = x.code }
function onDateConfirm(date) {
  const d = date instanceof Date ? date : new Date(date)
  if (Number.isNaN(d.getTime())) return
  const pad = n => String(n).padStart(2, '0')
  visitDate.value = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}
const chipMembers = [{ id: 'c1', name: '张益达' }, { id: 'c2', name: '张益达' }, { id: 'c3', name: '张益达' }]
const languages = [{ code: 'CN', label: '中文' }, { code: 'EN', label: '英语' }, { code: 'TH', label: '泰语' }, { code: 'VN', label: '越南语' }]
const selectOptions = ['商务', '学术访问', '英语']
const flowItems = [{ id: 1, time: '2026-08-01 09:21', operator: '李彤运', tag: '入园（5）', status: 'done', description: '访客寄存物品：2 个打火机，1 部手机。', people: '郭星睿，战益达，陈三，战硕硕', more: false }, { id: 2, time: '2026-08-01 19:21', operator: '李彤运', tag: '出园（10）', peopleCount: 50, status: 'waiting', people: '郭星睿，战益达，陈三，战硕硕，张益达，战益达，陈三...', more: true }]
const people = [{ id: 'p1', name: '何枢' }, { id: 'p2', name: '王哇山' }, { id: 'p3', name: '李卓豫' }, { id: 'p4', name: '周家福' }, { id: 'p5', name: '郑文鉴' }, { id: 'p6', name: '何引琪' }, { id: 'p7', name: '周伟林' }, { id: 'p8', name: '赵英艳' }, { id: 'p9', name: '赵学海' }, { id: 'p10', name: '冯修岚' }, { id: 'p11', name: '冯修岚' }]
const registration = { title: '2026/3/23日访问瑞嘉工业园区', status: '审批中', park: '瑞嘉工业园区', host: 'zhansna', number: 'VS20250728001' }
const approvalGroups = [{ id: 'direct', title: '直属领导审批', records: [{ id: 'a1', approver: { name: '张三' }, status: 'pending', statusLabel: '提交', handledAt: '2016-07-11 10:00' }] }, { id: 'level-1', title: '一级审批人', records: [{ id: 'a2', approver: { name: '郭星睿' }, status: 'approved', statusLabel: '通过', handledAt: '2016-07-11 10:00', comment: '这个与XXX活动是一个吗?' }] }, { id: 'level-2', title: '二级审批人', records: [{ id: 'a3', approver: { name: '张益达' }, status: 'approved', statusLabel: '通过', handledAt: '2016-07-11 10:00', comment: '这个与XXX活动是一个吗?' }] }]
</script>

<style scoped>
.gallery-shell { min-height: 100vh; display: flex; color: #1D2129; background: #F2F3F5; }
/* 左侧导航 */
.sidebar { width: 248px; flex: 0 0 248px; height: 100vh; position: sticky; top: 0; box-sizing: border-box; padding: 20px 14px; display: flex; flex-direction: column; background: #FFFFFF; border-right: 1px solid #E5E6EB; }
.brand { padding: 0 8px; }
.brand__eyebrow { margin: 0 0 6px; color: #00AAA6; font: 600 12px/16px "PingFang SC", sans-serif; letter-spacing: .04em; }
.brand__title { margin: 0; font: 600 18px/26px "PingFang SC", sans-serif; }
.brand__sub { margin: 6px 0 0; color: #86909C; font: 400 12px/18px "PingFang SC", sans-serif; }
.filter { margin: 16px 0 6px; height: 34px; padding: 0 10px; box-sizing: border-box; display: flex; align-items: center; gap: 6px; border-radius: 12px; background: #F2F3F5; }
.filter__icon { color: #86909C; font-size: 18px; line-height: 1; }
.filter input { width: 100%; border: 0; outline: 0; color: #1D2129; background: transparent; font: 400 14px/20px "PingFang SC", sans-serif; }
.filter input::placeholder { color: #C9CDD4; }
.page-nav { padding-top: 12px; border-top: 1px solid #F2F3F5; }
.page-nav .nav__item { text-decoration: none; }
.nav { flex: 1 1 auto; min-height: 0; overflow-y: auto; padding-right: 4px; scrollbar-width: thin; }
.nav::-webkit-scrollbar { width: 4px; }
.nav::-webkit-scrollbar-thumb { border-radius: 999px; background: #C9CDD4; }
.nav__group { margin-top: 14px; }
.nav__group-title { margin: 0 0 6px; padding: 0 8px; display: flex; align-items: center; justify-content: space-between; color: #86909C; font: 600 12px/18px "PingFang SC", sans-serif; }
.nav__group-title span { min-width: 20px; height: 20px; border-radius: 6px; color: #4E5969; background: #F2F3F5; font: 500 12px/20px "PingFang SC", sans-serif; text-align: center; }
.nav__item { width: 100%; margin-bottom: 1px; padding: 6px 10px; box-sizing: border-box; display: flex; flex-direction: column; gap: 1px; border: 0; border-radius: 10px; color: #1D2129; background: transparent; text-align: left; cursor: pointer; }
.nav__item:hover { background: #F2F3F5; }
.nav__item.active { color: #00AAA6; background: #E8FFFB; }
.nav__name { font: 500 13px/18px "PingFang SC", sans-serif; }
.nav__id { color: #86909C; font: 400 10px/14px ui-monospace, SFMono-Regular, Menlo, monospace; }
.nav__item.active .nav__id { color: #4ACCC1; }
.nav__empty { padding: 16px 8px; color: #86909C; font-size: 14px; }
.sidebar__footer { padding: 10px 8px 0; border-top: 1px solid #F2F3F5; color: #86909C; font: 400 11px/16px "PingFang SC", sans-serif; }
.sidebar__footer p { margin: 0 0 3px; }
code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }

/* 右侧展示：左「展示」/ 右「说明」两栏，画布 1:1 不缩放，整体撑满一屏。
   stage 用 display:contents 把手机画布与说明项提升为主网格项，无需改模板层级。 */
.main { flex: 1; min-width: 0; padding: 20px 28px 16px; }
.main--special { min-height: 100vh; overflow-y: auto; }.main--fit {
  height: 100vh; box-sizing: border-box; overflow: hidden;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 420px);
  grid-template-rows: auto auto minmax(0, 1fr);
  grid-template-areas:
    "phone header"
    "phone meta"
    "phone note";
  column-gap: 20px;
  row-gap: 12px;
}
.main__header { grid-area: header; display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: space-between; gap: 8px 12px; }
.main__crumb { margin: 0 0 4px; color: #86909C; font: 400 12px/16px "PingFang SC", sans-serif; }
.main__title { margin: 0; font: 600 22px/28px "PingFang SC", sans-serif; }
.main__title code { color: #1D2129; font-size: 22px; font-weight: 600; }
.badge { flex: 0 0 auto; padding: 5px 10px; border-radius: 20px; font: 500 12px/18px "PingFang SC", sans-serif; }
.badge--pending { color: #86909C; background: #E5E6EB; }
.badge--prototype { color: #00757B; background: #E8FFFB; }
.meta { grid-area: meta; margin: 0; padding: 10px 16px; box-sizing: border-box; display: grid; gap: 6px; border-radius: 12px; background: #FFFFFF; }
.meta div { display: grid; grid-template-columns: 92px 1fr; gap: 10px; align-items: baseline; }
.meta span { color: #86909C; font: 400 12px/16px "PingFang SC", sans-serif; word-break: keep-all; }
.meta strong { color: #1D2129; font: 400 12px/18px ui-monospace, SFMono-Regular, Menlo, monospace; word-break: break-all; }
.meta__primary { padding-bottom: 6px; border-bottom: 1px solid #F2F3F5; margin-bottom: 4px; }
.meta__primary strong { color: #00AAA6; font: 600 13px/20px "PingFang SC", sans-serif; }
.meta__links { display: flex; flex-wrap: wrap; gap: 6px 12px; }
.meta__links a { color: #00AAA6; text-decoration: none; font: 500 12px/18px ui-monospace, SFMono-Regular, Menlo, monospace; }
.meta__links a:hover { text-decoration: underline; }
.stage { display: contents; }

/* 嵌入典型页面时，复用同一个 375px 手机画布而不再额外撑开桌面布局。 */
.phone__screen :deep(.page-frame) { width: calc(100% + 32px); min-height: 100%; margin: -16px; }
.phone__screen :deep(.page-content) { min-height: 0; }

.phone-frame { grid-area: phone; position: relative; width: 375px; justify-self: center; align-self: stretch; min-height: 0; }
.phone { position: relative; width: 375px; height: 100%; box-sizing: border-box; border-radius: 20px; background: #FFFFFF; box-shadow: 0 8px 32px rgba(29, 33, 41, .10); overflow: hidden; }
.phone__bar { height: 28px; display: flex; align-items: center; justify-content: center; color: #C9CDD4; background: #F7F8FA; font: 500 11px/28px ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .06em; }
/* 手机屏内部滚动：隐藏滚动条占位，保证内容宽度恒定 343（375 − 16×2），
   与 Figma 页面的 body padding 16 一致；否则出现滚动条时会掉到 328。 */
.phone__screen { height: calc(100% - 28px); padding: 16px; box-sizing: border-box; overflow-y: auto; scrollbar-width: none; }
.phone__screen::-webkit-scrollbar { width: 0; height: 0; }
.demo__title, .demo__state { margin: 10px 0 0; color: #86909C; font: 400 11px/16px "PingFang SC", sans-serif; }
.demo__state:first-child { margin-top: 0; }
.demo__hint { margin: 12px 0 0; padding: 8px 10px; border-radius: 8px; color: #4E5969; background: #F7F8FA; font: 400 12px/18px "PingFang SC", sans-serif; }
.demo__stack { display: grid; gap: 12px; }
.demo__row { display: flex; flex-wrap: wrap; gap: 8px; }
.matrix__head { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 8px; color: #86909C; font: 400 11px/16px "PingFang SC", sans-serif; text-align: center; }
.matrix__row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 8px; }
.matrix__row :deep(.figma-button) { padding: 0 4px; }
.matrix__size { margin-bottom: 12px; align-items: flex-start; }
.popup-demo { padding: 16px 0; text-align: center; }
.popup-demo__label { margin: 0 0 8px; color: #4E5969; font: 600 16px/24px "PingFang SC", sans-serif; }
.popup-demo__hint { margin: 0 auto 20px; max-width: 300px; color: #86909C; font: 400 12px/18px "PingFang SC", sans-serif; text-align: left; }
.popup-demo__hint strong { color: #00AAA6; }
.popup-demo :deep(.figma-button) { width: 200px; margin: 0 auto; }
.popup-buttons { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 20px; }
.stage__note { grid-area: note; align-self: stretch; min-height: 0; overflow-y: auto; padding: 14px 18px; box-sizing: border-box; border-radius: 12px; background: #FFFFFF; }
.stage__note h3 { margin: 0 0 8px; font: 600 14px/20px "PingFang SC", sans-serif; }
.stage__note ul { margin: 0; padding-left: 18px; color: #4E5969; font: 400 13px/20px "PingFang SC", sans-serif; }
.stage__note li { margin-bottom: 6px; }

/* 窄屏：左右两栏放不下 375 画布 + 说明栏时，降级为上下排列，允许页面滚动 */
@media (max-width: 1040px) {
  .main--fit {
    height: auto; min-height: 100vh; overflow: visible;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto;
    grid-template-areas: "header" "meta" "phone" "note";
  }
  .phone-frame { height: 812px; }
}
@media (max-width: 760px) {
  .gallery-shell { flex-direction: column; }
  .sidebar { width: 100%; height: auto; flex: 0 0 auto; position: static; padding: 16px; }
  .nav { max-height: 200px; }
  .main, .main--fit { padding: 16px; height: auto; overflow: visible; }
  .phone-frame, .phone { width: 100%; }
  .phone-frame { height: 812px; }
  .meta div { grid-template-columns: 1fr; gap: 2px; }
}
</style>
