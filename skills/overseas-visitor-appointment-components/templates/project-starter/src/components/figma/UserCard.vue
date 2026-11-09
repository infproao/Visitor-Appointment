<template>
  <div class="user-card-flow">
    <ListCard
      title="同行人"
      :count="count"
      add-label="添加同行人"
      :show-add="showAdd"
      :show-more="showMore"
      @add="openAdd"
      @more="openMore"
    >
      <div v-for="member in rows" :key="member.id || member.name" class="user-card-row">
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
        <Field v-model="draft" label="姓名" placeholder="请输入" />
      </div>
      <div class="popup-actions">
        <Button variant="secondary" @click="saveAndContinue">保存并继续</Button>
        <Button @click="save">保存</Button>
      </div>
    </Popup>

    <PersonListPopup v-model:show="showMoreList" title="同行人" :count="count || rows.length" :members="rows" closeable />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
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
  editable: Boolean
})
const emit = defineEmits(['update:name', 'edit', 'remove', 'add', 'more', 'save', 'save-continue'])
const showEdit = ref(false)
const showMoreList = ref(false)
const draft = ref('')
const popupTitle = ref('添加同行人')
const rows = computed(() => props.members.length ? props.members : props.name ? [{ id: 'current', name: props.name, status: props.status }] : [])
const showAdd = computed(() => props.state !== 'detail')
const showMore = computed(() => props.state === 'detail' && Number(props.count || props.members.length) >= 10)

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
  emit('update:name', draft.value)
  emit('save-continue', draft.value)
  showEdit.value = false
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
