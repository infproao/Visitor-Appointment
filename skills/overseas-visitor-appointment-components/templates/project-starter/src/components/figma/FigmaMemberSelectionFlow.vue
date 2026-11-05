<template>
  <section class="member-flow">
    <button class="member-field" type="button" :disabled="readonly" @click="openPicker">
      <span class="member-field__title"><i>*</i> {{ label }}</span>
      <div v-if="selectedMembers.length" class="member-field__chips">
        <span v-for="member in selectedMembers" :key="member.id" class="chip">
          <span class="chip__avatar">{{ firstLetter(member.name) }}</span>
          <span>{{ member.name }}</span>
          <img v-if="!readonly" class="chip__close" :src="closeIcon" alt="" @click.stop="remove(member.id)" />
        </span>
      </div>
      <span v-else class="member-field__placeholder">请选择</span>
      <span v-if="!readonly" class="member-field__arrow">›</span>
    </button>

    <van-popup v-model:show="showPicker" position="bottom" round class="member-popup figma-popup-375">
      <div v-if="popupMode === 'available'" class="member-popup__content">
        <header class="member-popup__header">
          <button type="button" class="header-action" @click="showPicker = false">×</button>
          <h2>选择入园人员</h2>
        </header>
        <div class="member-popup__list">
          <button type="button" class="member-row member-row--all" @click="toggleAll">
            <span>全选（{{ members.length }}）</span>
            <span class="checkbox" :class="{ checked: allSelected }">{{ allSelected ? '✓' : '' }}</span>
          </button>
          <button v-for="member in members" :key="member.id" type="button" class="member-row" @click="toggle(member.id)">
            <span class="avatar">{{ firstLetter(member.name) }}</span>
            <span class="member-name">{{ member.name }}</span>
            <span class="checkbox" :class="{ checked: selectedIds.includes(member.id) }">{{ selectedIds.includes(member.id) ? '✓' : '' }}</span>
          </button>
        </div>
        <footer class="member-popup__footer">
          <button type="button" class="selected-summary" @click="popupMode = 'selected'">已选择：{{ selectedIds.length }}项 <span>⌃</span></button>
          <button type="button" class="confirm-button" @click="confirmSelection">确定({{ selectedIds.length }})</button>
        </footer>
      </div>

      <div v-else class="member-popup__content member-popup__content--selected">
        <header class="member-popup__header member-popup__header--selected">
          <button type="button" class="back-button" @click="popupMode = 'available'">‹ <span>已选择</span></button>
          <button type="button" class="clear-button" @click="clearSelection">清空</button>
        </header>
        <div class="member-popup__list">
          <button v-for="member in selectedMembers" :key="member.id" type="button" class="member-row" @click="remove(member.id)">
            <span class="avatar">{{ firstLetter(member.name) }}</span>
            <span class="member-name">{{ member.name }}</span>
            <img class="delete-icon" :src="deleteIcon" alt="删除" />
          </button>
        </div>
      </div>
    </van-popup>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import closeIcon from '../../assets/figma-close-circle.svg'
import deleteIcon from '../../assets/figma-vehicle-delete.svg'

const props = defineProps({
  label: { type: String, default: '入园人员' },
  members: { type: Array, default: () => [] },
  modelValue: { type: Array, default: () => [] },
  readonly: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue', 'confirm'])
const showPicker = ref(false)
const popupMode = ref('available')
const selectedIds = ref([...props.modelValue])
const selectedMembers = computed(() => props.members.filter(member => selectedIds.value.includes(member.id)))
const allSelected = computed(() => props.members.length > 0 && selectedIds.value.length === props.members.length)

function firstLetter(name) { return String(name || '?').slice(0, 1) }
function openPicker() { popupMode.value = selectedIds.value.length ? 'selected' : 'available'; showPicker.value = true }
function toggle(id) { selectedIds.value = selectedIds.value.includes(id) ? selectedIds.value.filter(value => value !== id) : [...selectedIds.value, id] }
function toggleAll() { selectedIds.value = allSelected.value ? [] : props.members.map(member => member.id) }
function remove(id) { selectedIds.value = selectedIds.value.filter(value => value !== id); emit('update:modelValue', selectedIds.value) }
function clearSelection() { selectedIds.value = []; emit('update:modelValue', []) }
function confirmSelection() { emit('update:modelValue', selectedIds.value); emit('confirm', selectedMembers.value); popupMode.value = 'selected' }
</script>

<style scoped>
.member-flow { width: 311px; color: #1D2129; }
.member-field { position: relative; width: 100%; min-height: 76px; padding: 10px 0; box-sizing: border-box; border: 0; border-bottom: 1px solid #F2F3F5; background: #FFFFFF; text-align: left; }
.member-field:disabled { opacity: 1; }
.member-field__title { display: block; color: #4E5969; font: 500 16px/24px "PingFang SC", sans-serif; }
.member-field__title i { color: #F53F3F; font-style: normal; }
.member-field__placeholder { display: block; margin-top: 8px; color: #C9CDD4; font: 400 16px/24px "PingFang SC", sans-serif; }
.member-field__chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; padding-right: 20px; }
.chip { min-height: 28px; padding: 4px 8px; box-sizing: border-box; display: inline-flex; align-items: center; gap: 4px; border: 1px solid #E5E6EB; border-radius: 40px; background: #FFFFFF; font: 400 12px/20px "PingFang SC", sans-serif; }
.chip__avatar, .avatar { display: inline-flex; align-items: center; justify-content: center; border-radius: 50%; color: #FFFFFF; background: #C9CDD4; }
.chip__avatar { width: 16px; height: 16px; font-size: 10px; }
.chip__close { width: 14px; height: 14px; }
.member-field__arrow { position: absolute; right: 0; top: 50%; color: #86909C; font-size: 24px; transform: translateY(-50%); }
.member-popup { max-height: 80vh; overflow: hidden; background: #F2F3F5; }
.member-popup__content { max-height: 80vh; padding-bottom: 16px; display: flex; flex-direction: column; }
.member-popup__header { position: relative; height: 64px; padding: 20px 16px; box-sizing: border-box; flex: 0 0 64px; display: flex; align-items: center; justify-content: center; }
.member-popup__header h2 { margin: 0; color: #1D2129; font: 600 18px/24px "PingFang SC", sans-serif; }
.header-action { position: absolute; left: 16px; width: 36px; height: 36px; border: 0; border-radius: 50%; color: #86909C; background: #FFFFFF; font-size: 22px; line-height: 36px; }
.member-popup__list { min-height: 0; margin: 0 16px; padding: 0 16px; border-radius: 12px; overflow-y: auto; background: #FFFFFF; }
.member-row { width: 100%; min-height: 56px; padding: 8px 0; display: flex; align-items: center; gap: 12px; border: 0; border-bottom: 1px solid #F2F3F5; color: #1D2129; background: #FFFFFF; font: 400 14px/20px "PingFang SC", sans-serif; text-align: left; }
.member-row:last-child { border-bottom: 0; }
.member-row--all { min-height: 44px; justify-content: space-between; }
.avatar { width: 24px; height: 24px; flex: 0 0 24px; font-size: 12px; }
.member-name { flex: 1; }
.checkbox { width: 14px; height: 14px; min-width: 14px; max-width: 14px; min-height: 14px; max-height: 14px; flex: 0 0 14px; box-sizing: border-box; display: inline-flex; align-items: center; justify-content: center; overflow: hidden; border: 2px solid #E5E6EB; border-radius: 2px; color: #FFFFFF; background: #FFFFFF; font-size: 10px; line-height: 12px; }
.checkbox.checked { border-color: #00AAA6; background: #00AAA6; }
.member-popup__footer { min-height: 52px; padding: 10px 16px 0; flex: 0 0 52px; display: flex; align-items: center; justify-content: space-between; gap: 12px; color: #00AAA6; font: 400 12px/20px "PingFang SC", sans-serif; }
.selected-summary { padding: 0; border: 0; color: #00AAA6; background: transparent; font: inherit; }
.selected-summary span { margin-left: 4px; font-size: 16px; }
.confirm-button { min-width: 116px; height: 44px; border: 0; border-radius: 20px; color: #FFFFFF; background: #22BBB3; font: 400 14px/20px "PingFang SC", sans-serif; }
.member-popup__header--selected { justify-content: space-between; }
.back-button, .clear-button { border: 0; color: #1D2129; background: transparent; font: 600 14px/20px "PingFang SC", sans-serif; }
.clear-button { color: #00AAA6; }
.delete-icon { width: 18px; height: 18px; }
</style>
