<template>
  <div class="vehicle-flow">
    <div class="vehicle-card">
      <strong>{{ plateValue }}</strong>
      <div class="actions">
        <button type="button" aria-label="编辑车辆" @click="openEdit"><img src="../../assets/figma-vehicle-edit.svg" alt="" /></button>
        <button type="button" aria-label="删除车辆" @click="$emit('remove')"><img src="../../assets/figma-vehicle-delete.svg" alt="" /></button>
      </div>
    </div>

    <FigmaPopup v-model:show="showEdit" :title="editTitle">
      <FigmaField v-model="draft" label="车牌号" placeholder="请输入" />
      <div class="popup-actions">
        <FigmaButton variant="secondary" @click="saveAndContinue">保存并继续</FigmaButton>
        <FigmaButton @click="save">保存</FigmaButton>
      </div>
    </FigmaPopup>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import FigmaButton from './FigmaButton.vue'
import FigmaField from './FigmaField.vue'
import FigmaPopup from './FigmaPopup.vue'

const props = defineProps({ plate: { type: String, default: '' }, editable: { type: Boolean, default: true }, editTitle: { type: String, default: '添加车辆' } })
const emit = defineEmits(['update:plate', 'edit', 'remove', 'save'])
const showEdit = ref(false)
const draft = ref(props.plate)
const plateValue = computed(() => props.plate || draft.value)

function openEdit() { draft.value = props.plate; showEdit.value = true; emit('edit') }
function save() { emit('update:plate', draft.value); emit('save', draft.value); showEdit.value = false }
function saveAndContinue() { emit('update:plate', draft.value); emit('save-continue', draft.value); showEdit.value = false }
</script>

<style scoped>
.vehicle-flow { width: 311px; }
.vehicle-card { width: 311px; min-height: 56px; padding: 16px; box-sizing: border-box; display: flex; align-items: center; justify-content: space-between; border: 1px solid #FFFFFF; border-radius: 12px; background: linear-gradient(90deg, #E4EFFF, #FFFFFF); }
.vehicle-card strong { color: #1D2129; font: 600 18px/24px "PingFang SC", sans-serif; }
.actions { display: flex; gap: 16px; }
.actions button { width: 18px; height: 18px; padding: 0; border: 0; background: transparent; }
.actions img { display: block; width: 18px; height: 18px; }
.popup-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 20px; }
</style>
