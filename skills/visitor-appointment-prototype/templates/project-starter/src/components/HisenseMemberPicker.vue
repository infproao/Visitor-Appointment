<template>
  <div class="hisense-member-picker">
    <div v-if="searchable" class="hisense-member-picker__search"><van-search v-model="keyword" :placeholder="searchPlaceholder" /></div>
    <div v-if="selectedMembers.length" class="hisense-member-picker__selected">
      <span v-for="member in selectedMembers" :key="member.id" class="hisense-member-picker__chip">
        <span class="hisense-member-picker__chip-avatar">{{ (member.name || '?').slice(0, 1) }}</span>
        <span>{{ member.name }}</span>
        <button type="button" aria-label="移除成员" @click="toggle(member)">×</button>
      </span>
    </div>
    <div class="hisense-member-picker__list">
      <button v-for="member in filteredMembers" :key="member.id" type="button" class="hisense-member-picker__item" @click="toggle(member)">
        <span class="hisense-member-picker__avatar">{{ (member.name || '?').slice(0, 1) }}</span>
        <span class="hisense-member-picker__name"><strong>{{ member.name || '待补充成员' }}</strong><small>{{ member.subtitle || '' }}</small></span>
        <span class="hisense-member-picker__indicator" :class="{ selected: isSelected(member), radio: !multiple }">{{ isSelected(member) ? '✓' : '' }}</span>
      </button>
      <p v-if="!filteredMembers.length" class="hisense-member-picker__empty">{{ emptyText }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  members: { type: Array, default: () => [] },
  multiple: { type: Boolean, default: true },
  searchable: { type: Boolean, default: true },
  searchPlaceholder: { type: String, default: '搜索成员' },
  emptyText: { type: String, default: '暂无可选成员' }
})
const emit = defineEmits(['update:modelValue', 'change'])
const keyword = ref('')
const filteredMembers = computed(() => { const value = keyword.value.trim().toLowerCase(); return value ? props.members.filter(member => `${member.name || ''}${member.subtitle || ''}`.toLowerCase().includes(value)) : props.members })
const selectedMembers = computed(() => props.members.filter(member => props.modelValue.includes(member.id)))
function isSelected(member) { return props.modelValue.includes(member.id) }
function toggle(member) { const next = isSelected(member) ? props.modelValue.filter(id => id !== member.id) : (props.multiple ? [...props.modelValue, member.id] : [member.id]); emit('update:modelValue', next); emit('change', next) }
</script>

<style scoped>
.hisense-member-picker { color: #1D2129; }
.hisense-member-picker__search { margin: -8px -8px 8px; }
.hisense-member-picker__search :deep(.van-search) { padding: 8px; background: transparent; }
.hisense-member-picker__selected { display: flex; flex-wrap: wrap; gap: 8px; padding: 4px 0 12px; }
.hisense-member-picker__chip { min-height: 28px; padding: 4px 8px; box-sizing: border-box; display: inline-flex; align-items: center; gap: 4px; border: 1px solid #E5E6EB; border-radius: 40px; color: #1D2129; background: #FFFFFF; font-size: 12px; line-height: 20px; }
.hisense-member-picker__chip-avatar { width: 16px; height: 16px; display: inline-flex; align-items: center; justify-content: center; border-radius: 50%; color: #FFFFFF; background: #C9CDD4; font-size: 10px; line-height: 16px; }
.hisense-member-picker__chip button { width: 14px; height: 14px; padding: 0; border: 0; color: #86909C; background: transparent; font-size: 14px; line-height: 14px; }
.hisense-member-picker__list { display: grid; gap: 4px; }
.hisense-member-picker__item { min-height: 56px; padding: 8px 0; display: flex; align-items: center; gap: 12px; border: 0; border-bottom: 1px solid #F2F3F5; color: inherit; background: transparent; font: inherit; text-align: left; }
.hisense-member-picker__avatar { width: 24px; height: 24px; flex: 0 0 24px; display: flex; align-items: center; justify-content: center; border-radius: 50%; color: #FFFFFF; background: #C9CDD4; font-size: 12px; }
.hisense-member-picker__name { min-width: 0; flex: 1; display: flex; flex-direction: column; gap: 2px; }
.hisense-member-picker__name strong { font-size: 14px; font-weight: 500; line-height: 20px; }
.hisense-member-picker__name small { color: #86909C; font-size: 12px; line-height: 16px; }
.hisense-member-picker__indicator { width: 14px; height: 14px; flex: 0 0 14px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid #E5E6EB; border-radius: 2px; color: #FFFFFF; background: #FFFFFF; font-size: 10px; line-height: 12px; }
.hisense-member-picker__indicator.radio { border-radius: 50%; }
.hisense-member-picker__indicator.selected { border-color: #00AAA6; background: #00AAA6; }
.hisense-member-picker__empty { margin: 16px 0; color: #86909C; font-size: 14px; text-align: center; }
</style>
