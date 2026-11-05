<template>
  <div class="figma-field" :class="{ textarea }">
    <div class="figma-field__title"><i v-if="required">*</i><span>{{ label }}</span></div>
    <div class="figma-field__value">
      <textarea v-if="textarea" :value="modelValue" :placeholder="placeholder" :maxlength="maxlength" @input="emit('update:modelValue', $event.target.value)" />
      <div v-else-if="prefix" class="figma-field__phone"><button type="button" class="figma-field__prefix" @click="emit('prefix-click')">{{ prefix }}<span>⌄</span></button><input :value="modelValue" :placeholder="placeholder" :readonly="readonly" @input="emit('update:modelValue', $event.target.value)" /></div>
      <input v-else :value="modelValue" :placeholder="placeholder" :readonly="readonly" @click="readonly && emit('click')" @input="emit('update:modelValue', $event.target.value)" />
      <img v-if="link" class="figma-field__arrow" src="../../assets/field-arrow.svg" alt="" />
    </div>
    <p v-if="error" class="figma-field__error">{{ error }}</p>
  </div>
</template>

<script setup>
defineProps({ label: String, modelValue: { type: String, default: '' }, placeholder: { type: String, default: '' }, required: Boolean, readonly: Boolean, link: Boolean, textarea: Boolean, prefix: String, error: String, maxlength: [String, Number] })
const emit = defineEmits(['update:modelValue', 'click', 'prefix-click'])
</script>

<style scoped>
.figma-field { min-height: 76px; padding: 10px 0; box-sizing: border-box; border-bottom: 1px solid #F2F3F5; color: #1D2129; }
.figma-field.textarea { min-height: 100px; }
.figma-field__title { min-height: 24px; display: flex; align-items: center; gap: 2px; color: #4E5969; font: 500 16px/24px "PingFang SC", sans-serif; }
.figma-field__title i { color: #F53F3F; font: 400 14px/24px "PingFang SC", sans-serif; }
.figma-field__value { min-height: 24px; margin-top: 8px; display: flex; align-items: center; gap: 8px; }
.figma-field input, .figma-field textarea { width: 100%; min-width: 0; min-height: 24px; padding: 0; border: 0; outline: 0; color: #1D2129; background: transparent; font: 400 16px/24px "PingFang SC", sans-serif; resize: none; appearance: none; }
.figma-field textarea { min-height: 48px; }
.figma-field input::placeholder, .figma-field textarea::placeholder { color: #C9CDD4; opacity: 1; }
.figma-field__arrow { flex: 0 0 16px; width: 16px; height: 16px; }
.figma-field__phone { width: 100%; display: flex; align-items: center; gap: 8px; }
.figma-field__prefix { min-height: 24px; padding: 0; display: inline-flex; gap: 4px; border: 0; color: #1D2129; background: transparent; font: 400 16px/24px "PingFang SC", sans-serif; }
.figma-field__prefix span { color: #86909C; font-size: 12px; }
.figma-field__error { margin: 4px 0 0; color: #F53F3F; font: 400 12px/20px "PingFang SC", sans-serif; }
</style>
