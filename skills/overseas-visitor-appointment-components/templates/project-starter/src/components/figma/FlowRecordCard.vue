<template>
  <!-- 已按用户 2026-11-06 裁决合并：保留此文件作为旧调用方的兼容别名，不再是独立组件。 -->
  <ApprovalTimeline :items="items" :people="people" @more="emit('more', $event)" />
</template>

<script setup>
import ApprovalTimeline from './ApprovalTimeline.vue'
defineProps({ items: { type: Array, default: () => [] }, people: { type: Array, default: () => [] } })
const emit = defineEmits(['more'])
</script>
