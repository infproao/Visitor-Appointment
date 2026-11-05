<template>
  <main class="page-shell"><header class="page-header"><h1>{{ title }}</h1><span>{{ stepLabel }}</span></header><section class="operation-card"><HisenseMemberPicker v-model="selectedMembers" :members="members" :multiple="multiple" :searchable="searchable" /><HisenseUploader v-model="files" :label="uploadLabel" :hint="uploadHint" :max-count="1" /><HisenseCheckbox v-model="agreed">{{ agreementText }}</HisenseCheckbox></section><HisenseButton :disabled="!canSubmit" @click="emit('submit', { memberIds: selectedMembers, files, agreed })">{{ submitText }}</HisenseButton><slot /></main>
</template>

<script setup>
import { computed, ref } from 'vue'
import HisenseButton from '../components/HisenseButton.vue'
import HisenseCheckbox from '../components/HisenseCheckbox.vue'
import HisenseMemberPicker from '../components/HisenseMemberPicker.vue'
import HisenseUploader from '../components/HisenseUploader.vue'
const props = defineProps({ title: { type: String, default: '入境操作' }, stepLabel: { type: String, default: '选择人员并补充资料' }, members: { type: Array, default: () => [] }, multiple: { type: Boolean, default: true }, searchable: { type: Boolean, default: true }, uploadLabel: { type: String, default: '现场资料' }, uploadHint: { type: String, default: '上传字段由需求注入，当前仅提供前端占位。' }, agreementText: { type: String, default: '我已完成本页面要求的核查' }, submitText: { type: String, default: '提交操作' } })
const emit = defineEmits(['submit'])
const selectedMembers = ref([]); const files = ref([]); const agreed = ref(false)
const canSubmit = computed(() => selectedMembers.value.length > 0 && agreed.value)
</script>

<style scoped>
.page-shell { min-height: 100vh; padding: 16px; display: grid; align-content: start; gap: 16px; box-sizing: border-box; background: var(--van-background); color: var(--van-text-color); }
.page-header { min-height: 48px; display: flex; align-items: center; justify-content: space-between; }
.page-header h1 { margin: 0; font-size: 20px; line-height: 28px; }
.page-header span { color: var(--van-text-color-3); font-size: 12px; }
.operation-card { padding: 16px; display: grid; gap: 16px; border-radius: 12px; background: var(--van-background-2); }
</style>
