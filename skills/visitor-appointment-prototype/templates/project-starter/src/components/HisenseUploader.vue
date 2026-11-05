<template>
  <div class="hisense-uploader">
    <div v-if="label" class="hisense-uploader__label"><i v-if="required">*</i>{{ label }}</div>
    <van-uploader v-model="files" :max-count="maxCount" :accept="accept" :preview-size="previewSize" :deletable="deletable">
      <div class="hisense-uploader__trigger">
        <van-icon name="photograph" />
        <span>{{ actionText }}</span>
      </div>
    </van-uploader>
    <p v-if="hint" class="hisense-uploader__hint">{{ hint }}</p>
    <p v-if="error" class="hisense-uploader__error">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  label: { type: String, default: '' },
  required: { type: Boolean, default: false },
  hint: { type: String, default: '' },
  error: { type: String, default: '' },
  actionText: { type: String, default: '支持拍照或相册上传' },
  maxCount: { type: Number, default: 1 },
  accept: { type: String, default: 'image/*' },
  previewSize: { type: [String, Number], default: '80px' },
  deletable: { type: Boolean, default: true }
})
const emit = defineEmits(['update:modelValue', 'oversize', 'change'])
const files = computed({
  get: () => props.modelValue,
  set: value => { emit('update:modelValue', value); emit('change', value) }
})
</script>

<style scoped>
.hisense-uploader { padding: 4px 0 12px; }
.hisense-uploader__label { min-height: 24px; color: var(--van-text-color-2); font-size: 16px; line-height: 24px; }
.hisense-uploader__label i { margin-right: 2px; color: var(--van-danger-color); font-style: normal; }
.hisense-uploader__trigger { width: 112px; height: 88px; margin-top: 8px; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; border: 1px dashed var(--van-border-color); border-radius: 12px; color: var(--van-text-color-3); background: var(--van-background); font-size: 12px; line-height: 16px; text-align: center; }
.hisense-uploader__trigger .van-icon { color: var(--van-primary-color); font-size: 24px; }
.hisense-uploader__hint { margin: 8px 0 0; color: var(--van-text-color-3); font-size: 12px; line-height: 20px; }
.hisense-uploader__error { margin: 4px 0 0; color: var(--van-danger-color); font-size: 12px; line-height: 20px; }
:deep(.van-uploader__preview) { margin: 8px 8px 0 0; }
</style>
