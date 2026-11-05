<template>
  <section class="empty-state"><HisenseEmptyState :title="title" :action-text="actionText" @action="emit('create')" /><slot /></section>
</template>

<script setup>
import HisenseEmptyState from '../components/HisenseEmptyState.vue'
defineProps({ title: { type: String, default: '暂无数据' }, actionText: { type: String, default: '' } })
const emit = defineEmits(['create'])
</script>

<style scoped>
.empty-state { min-height: 360px; padding: 32px 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; box-sizing: border-box; }
.empty-state :deep(.hisense-button) { min-width: 160px; }
</style>
