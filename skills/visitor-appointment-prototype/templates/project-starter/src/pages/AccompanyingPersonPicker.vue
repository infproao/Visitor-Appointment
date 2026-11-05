<template>
  <main class="page-shell"><header class="page-header"><h1>{{ title }}</h1><span>{{ selectedMembers.length }}{{ countSuffix }}</span></header><section class="picker-card"><HisenseMemberPicker v-model="selectedMembers" :members="members" :multiple="multiple" :searchable="searchable" /></section><HisenseButton :disabled="!selectedMembers.length" @click="emit('confirm', selectedMembers)">{{ confirmText }}</HisenseButton><slot /></main>
</template>

<script setup>
import { ref } from 'vue'
import HisenseButton from '../components/HisenseButton.vue'
import HisenseMemberPicker from '../components/HisenseMemberPicker.vue'
defineProps({ title: { type: String, default: '选择同行人' }, countSuffix: { type: String, default: ' 人已选' }, members: { type: Array, default: () => [] }, multiple: { type: Boolean, default: true }, searchable: { type: Boolean, default: true }, confirmText: { type: String, default: '确认选择' } })
const emit = defineEmits(['confirm'])
const selectedMembers = ref([])
</script>

<style scoped>
.page-shell { min-height: 100vh; padding: 16px; display: grid; align-content: start; gap: 16px; box-sizing: border-box; background: var(--van-background); color: var(--van-text-color); }
.page-header { min-height: 48px; display: flex; align-items: center; justify-content: space-between; }
.page-header h1 { margin: 0; font-size: 20px; line-height: 28px; }
.page-header span { color: var(--van-text-color-2); font-size: 14px; }
.picker-card { padding: 16px; border-radius: 12px; background: var(--van-background-2); }
</style>
