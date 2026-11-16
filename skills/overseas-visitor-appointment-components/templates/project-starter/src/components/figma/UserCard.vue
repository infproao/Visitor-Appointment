<template>
  <div class="user-card-flow">
    <ListCard
      title="同行人"
      :count="count"
      add-label="添加同行人"
      :show-add="showAdd"
      :show-more="showMore"
      :full="full"
      :padding="padding"
      @add="openAdd"
      @more="openMore"
    >
      <!-- 用户 2026-11-10 裁决：同行人列表最多展示 5 个，其余通过「更多」进入已选/人员列表查看；人名统一 16px。 -->
      <div v-for="member in visibleRows" :key="member.id || member.name" class="user-card-row">
        <span class="avatar">{{ (member.name || '?').slice(0, 1) }}</span>
        <span class="name">{{ member.name }}</span>
        <Tag v-if="member.status" :label="member.status" status="primary" size="small" />
        <div v-if="editable && state !== 'detail'" class="actions">
          <button type="button" aria-label="编辑人员" @click="openEdit(member)"><img :src="editIcon" alt="" /></button>
          <button type="button" aria-label="删除人员" @click="emit('remove', member)"><img :src="deleteIcon" alt="" /></button>
        </div>
      </div>
    </ListCard>

    <Popup v-model:show="showEdit" :title="popupTitle">
      <div class="popup-form-card">
        <Field ref="nameField" v-model="draft" label="姓名" placeholder="请输入" />
      </div>
      <!-- 阻止按钮 mousedown 抢焦点：否则 input 先 blur，手机键盘会收起再弹回 -->
      <div class="popup-actions" @mousedown.prevent>
        <Button variant="secondary" @click="saveAndContinue">保存并继续</Button>
        <Button @click="save">保存</Button>
      </div>
    </Popup>

    <PersonListPopup v-model:show="showMoreList" title="同行人" :count="totalCount" :members="rows" closeable />
  </div>
</template>

<script setup>
import { computed, ref, nextTick } from 'vue'
import Button from './Button.vue'
import Field from './Field.vue'
import ListCard from './ListCard.vue'
import PersonListPopup from './PersonListPopup.vue'
import Popup from './Popup.vue'
import Tag from './Tag.vue'
import editIcon from '../../assets/figma-vehicle-edit.svg'
import deleteIcon from '../../assets/figma-vehicle-delete.svg'

const props = defineProps({
  name: { type: String, default: '' },
  status: String,
  state: { type: String, default: 'default' },
  members: { type: Array, default: () => [] },
  count: { type: [String, Number], default: null },
  editable: Boolean,
  // 透传给 ListCard：页面级宽度 / 内边距差异，避免页面用 CSS 覆盖组件
  full: Boolean,
  padding: { type: Number, default: 12 }
})
const emit = defineEmits(['update:name', 'edit', 'remove', 'add', 'more', 'save', 'save-continue'])
const showEdit = ref(false)
const showMoreList = ref(false)
const draft = ref('')
const nameField = ref(null)
const popupTitle = ref('添加同行人')
const rows = computed(() => props.members.length ? props.members : props.name ? [{ id: 'current', name: props.name, status: props.status }] : [])
const MAX_VISIBLE = 5
const visibleRows = computed(() => rows.value.slice(0, MAX_VISIBLE))
const totalCount = computed(() => Math.max(Number(props.count || 0), rows.value.length))
const showAdd = computed(() => props.state !== 'detail')
const showMore = computed(() => props.state === 'detail' && totalCount.value > MAX_VISIBLE)

function openAdd() {
  draft.value = ''
  popupTitle.value = '添加同行人'
  showEdit.value = true
  emit('add')
}
function openEdit(member) {
  draft.value = member.name || ''
  popupTitle.value = '编辑同行人'
  showEdit.value = true
  emit('edit', member)
}
function openMore() {
  showMoreList.value = true
  emit('more')
}

function save() {
  emit('update:name', draft.value)
  emit('save', draft.value)
  showEdit.value = false
}
function saveAndContinue() {
  const value = draft.value
  emit('update:name', value)
  emit('save-continue', value)
  // 用户 2026-11-12：弹层保持打开、输入框清空后重新聚焦，手机键盘不收起，可直接连续添加
  draft.value = ''
  nextTick(() => nameField.value?.$el?.querySelector('input')?.focus())
}
</script>

<style scoped>
.popup-form-card { padding: 12px 16px 4px; border-radius: 12px; background: #FFFFFF; }
.popup-form-card :deep(.figma-field), .popup-form-card :deep(.figma-field--focus) { box-shadow: none; }
.user-card-row { min-height: 48px; padding: 8px 0; box-sizing: border-box; display: flex; align-items: center; gap: 12px; border: 1px solid #E5E6EB; border-radius: 12px; }
.avatar { width: 24px; height: 24px; margin-left: 12px; display: flex; align-items: center; justify-content: center; flex: 0 0 24px; border-radius: 50%; color: #FFFFFF; background: #C9CDD4; font: 600 14px/24px "PingFang SC", sans-serif; }
.name { flex: 1; min-width: 0; overflow: hidden; color: #1D2129; font: 500 16px/24px "PingFang SC", sans-serif; text-overflow: ellipsis; white-space: nowrap; }
.actions { display: flex; align-items: center; gap: 16px; margin-right: 12px; }
.actions button { width: 18px; height: 18px; padding: 0; border: 0; background: transparent; }
.actions img { display: block; width: 18px; height: 18px; }
</style>
