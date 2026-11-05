<template>
  <div class="hisense-field" :class="{ 'hisense-field--textarea': textarea }">
    <div class="hisense-field__title">
      <i v-if="required">*</i>
      <span>{{ label }}</span>
    </div>

    <div class="hisense-field__value">
      <textarea
        v-if="textarea"
        :value="modelValue"
        :placeholder="placeholder"
        :maxlength="maxlength"
        @input="emit('update:modelValue', $event.target.value)"
      />
      <div v-else-if="prefix" class="hisense-field__phone">
        <button type="button" class="hisense-field__prefix" @click.stop="emit('prefix-click')">
          <span>{{ prefix }}</span>
          <span class="hisense-field__prefix-arrow">⌄</span>
        </button>
        <input
          :value="modelValue"
          :placeholder="placeholder"
          :readonly="readonly"
          :maxlength="maxlength"
          @click="readonly ? emit('click') : undefined"
          @input="emit('update:modelValue', $event.target.value)"
        />
      </div>
      <input
        v-else
        :value="modelValue"
        :placeholder="placeholder"
        :readonly="readonly"
        :maxlength="maxlength"
        @click="readonly ? emit('click') : undefined"
        @input="emit('update:modelValue', $event.target.value)"
      />
      <img v-if="link" class="hisense-field__arrow" :src="fieldArrow" alt="" />
    </div>

    <p v-if="error" class="hisense-field__error">{{ error }}</p>
  </div>
</template>

<script setup>
import fieldArrow from '../assets/field-arrow.svg'

defineProps({
  label: { type: String, required: true },
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  required: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  link: { type: Boolean, default: false },
  textarea: { type: Boolean, default: false },
  prefix: { type: String, default: '' },
  error: { type: String, default: '' },
  maxlength: { type: [String, Number], default: undefined }
})

const emit = defineEmits(['update:modelValue', 'click', 'prefix-click'])
</script>

<style scoped>
.hisense-field {
  min-height: 76px;
  padding: 10px 0;
  box-sizing: border-box;
  border-bottom: 1px solid var(--van-line-color);
  color: var(--van-text-color);
}

.hisense-field--textarea {
  min-height: 100px;
}

.hisense-field:last-child {
  border-bottom: 0;
}

.hisense-field__title {
  display: flex;
  align-items: center;
  gap: 2px;
  min-height: 24px;
  color: var(--van-text-color-2);
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
}

.hisense-field__title i {
  color: var(--van-danger-color);
  font-size: 14px;
  font-style: normal;
  line-height: 24px;
}

.hisense-field__value {
  min-height: 24px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.hisense-field input,
.hisense-field textarea {
  width: 100%;
  min-width: 0;
  min-height: 24px;
  padding: 0;
  border: 0;
  outline: 0;
  color: var(--van-text-color);
  background: transparent;
  font-family: "PingFang SC", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  resize: none;
  appearance: none;
}

.hisense-field textarea {
  min-height: 48px;
}

.hisense-field input::placeholder,
.hisense-field textarea::placeholder {
  color: var(--van-text-color-4);
  opacity: 1;
}

.hisense-field__arrow {
  flex: 0 0 16px;
  width: 16px;
  height: 16px;
  display: block;
}

.hisense-field__phone {
  width: 100%;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.hisense-field__prefix {
  min-height: 24px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex: 0 0 auto;
  border: 0;
  color: var(--van-text-color);
  background: transparent;
  font: inherit;
  font-size: 16px;
  cursor: pointer;
}

.hisense-field__prefix-arrow {
  color: var(--van-text-color-3);
  font-size: 12px;
}

.hisense-field__error {
  margin: 4px 0 0;
  color: var(--van-danger-color);
  font-size: 12px;
  line-height: 20px;
}
</style>
