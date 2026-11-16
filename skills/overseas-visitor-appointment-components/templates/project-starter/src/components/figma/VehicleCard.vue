<template>
  <div class="vehicle-card-flow" :class="{ 'vehicle-card-flow--full': full }">
    <ListCard
      title="车辆"
      :count="count"
      add-label="添加车辆"
      :show-add="showAdd"
      :show-more="showMore"
      :full="full"
      :padding="padding"
      @add="openAdd"
      @more="openMore"
    >
      <div v-for="item in rows" :key="item.id || item.plate" class="vehicle-row">
        <strong>{{ item.plate }}</strong>
        <span v-if="item.type" class="vehicle-type">{{ item.type }}</span>
        <div v-if="editable && state !== 'detail'" class="actions">
          <button type="button" aria-label="编辑车辆" @click="openEdit(item)"><img :src="editIcon" alt="" /></button>
          <button type="button" aria-label="删除车辆" @click="emit('remove', item)"><img :src="deleteIcon" alt="" /></button>
        </div>
      </div>
    </ListCard>

    <Popup v-model:show="showEdit" :title="popupTitle">
      <div class="popup-form-card">
        <Field ref="plateField" v-model="draft" label="车牌号" placeholder="请输入" />
      </div>
      <!-- 阻止按钮 mousedown 抢焦点：否则 input 先 blur，手机键盘会收起再弹回 -->
      <div class="popup-actions" @mousedown.prevent>
        <Button variant="secondary" @click="saveAndContinue">保存并继续</Button>
        <Button @click="save">保存</Button>
      </div>
    </Popup>

    <PersonListPopup v-model:show="showMoreList" title="车辆" :count="count || rows.length" :members="readonlyRows" closeable />
  </div>
</template>

<script setup>
import { computed, ref, nextTick } from 'vue'
import Button from './Button.vue'
import Field from './Field.vue'
import ListCard from './ListCard.vue'
import PersonListPopup from './PersonListPopup.vue'
import Popup from './Popup.vue'
import editIcon from '../../assets/figma-vehicle-edit.svg'
import deleteIcon from '../../assets/figma-vehicle-delete.svg'

const props = defineProps({
  plate: { type: String, default: '' },
  plates: { type: Array, default: () => [] },
  state: { type: String, default: 'default' },
  count: { type: [String, Number], default: null },
  editable: Boolean,
  // 透传给 ListCard：页面级宽度 / 内边距差异，避免页面用 CSS 覆盖组件
  full: Boolean,
  padding: { type: Number, default: 12 }
})
const emit = defineEmits(['update:plate', 'edit', 'remove', 'add', 'more', 'save', 'save-continue'])
const showEdit = ref(false)
const showMoreList = ref(false)
const draft = ref('')
const plateField = ref(null)
const popupTitle = ref('添加车辆')
const rows = computed(() => props.plates.length ? props.plates : props.plate ? [{ id: 'current', plate: props.plate }] : [])
const readonlyRows = computed(() => rows.value.map(item => ({ id: item.id || item.plate, name: item.plate })))
const showAdd = computed(() => props.state !== 'detail')
const showMore = computed(() => props.state === 'detail' && Number(props.count || props.plates.length) >= 10)

function openMore() {
  showMoreList.value = true
  emit('more')
}

function openAdd() {
  draft.value = ''
  popupTitle.value = '添加车辆'
  showEdit.value = true
  emit('add')
}
function openEdit(item) {
  draft.value = item.plate || ''
  popupTitle.value = '编辑车辆'
  showEdit.value = true
  emit('edit', item)
}
function save() {
  emit('update:plate', draft.value)
  emit('save', draft.value)
  showEdit.value = false
}
function saveAndContinue() {
  const value = draft.value
  emit('update:plate', value)
  emit('save-continue', value)
  // 与 UserCard 一致：保持弹层打开、输入框清空后重新聚焦，键盘不收起
  draft.value = ''
  nextTick(() => plateField.value?.$el?.querySelector('input')?.focus())
}
</script>

<style scoped>
.popup-form-card { padding: 12px 16px 4px; border-radius: 12px; background: #FFFFFF; }
.popup-form-card :deep(.figma-field), .popup-form-card :deep(.figma-field--focus) { box-shadow: none; }
.vehicle-card-flow { width: 311px; }
.vehicle-card-flow--full { width: 100%; }
.vehicle-row { min-height: 48px; padding: 8px 12px; box-sizing: border-box; display: flex; align-items: center; gap: 8px; border-radius: 8px; background: #E8F3FF; }
.vehicle-row strong { flex: 1; min-width: 0; color: #1D2129; font: 600 16px/24px "PingFang SC", sans-serif; }
/* 设计稿 tag 基线：32×16、圆角 2；颜色按车辆卡片中的蓝色文字标签处理。 */
.vehicle-type { width: 32px; height: 16px; min-width: 32px; margin-left: auto; padding: 0; box-sizing: border-box; display: inline-flex; align-items: center; justify-content: center; border-radius: 2px; color: #165DFF; background: #FFFFFF; font: 400 12px/16px "PingFang SC", sans-serif; text-align: center; }
.actions { display: flex; align-items: center; gap: 16px; }
.actions button { width: 18px; height: 18px; padding: 0; border: 0; background: transparent; }
.actions img { display: block; width: 18px; height: 18px; }
</style>
