<template>
  <div
    class="figma-field"
    :class="[`figma-field--${effectiveState}`, { textarea, clickable }]"
    @click="clickable && emit('click')"
  >
    <div class="figma-field__title"><i v-if="required">*</i><span>{{ label }}</span></div>
    <div class="figma-field__value">
      <template v-if="members && members.length">
        <div class="figma-field__chips">
          <span v-for="m in members" :key="m.id" class="chip">
            <span class="chip__avatar">{{ (m.name || '?').slice(0, 1) }}</span>
            <span>{{ m.name }}</span>
            <button v-if="deletable" type="button" class="chip__close" @click.stop="emit('remove', m.id)">×</button>
          </span>
        </div>
      </template>
      <textarea
        v-else-if="textarea"
        :value="modelValue"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :disabled="effectiveState === 'disabled'"
        @input="emit('update:modelValue', $event.target.value)"
      />
      <div v-else-if="prefix" class="figma-field__phone">
        <button type="button" class="figma-field__prefix" :disabled="effectiveState === 'disabled'" @click="emit('prefix-click')">
          {{ prefix }}<span>⌄</span>
        </button>
        <input
          :value="modelValue"
          :placeholder="placeholder"
          :readonly="isReadonly"
          :disabled="effectiveState === 'disabled'"
          @focus="focused = true"
          @blur="focused = false"
          @input="emit('update:modelValue', $event.target.value)"
        />
      </div>
      <template v-else>
        <input
          :value="modelValue"
          :placeholder="placeholder"
          :readonly="isReadonly"
          :disabled="effectiveState === 'disabled'"
          @focus="focused = true"
          @blur="focused = false"
          @input="emit('update:modelValue', $event.target.value)"
        />
      </template>
      <img v-if="link" class="figma-field__arrow" src="../../assets/field-arrow.svg" alt="" />
    </div>
    <p v-if="showCount" class="figma-field__count">{{ (modelValue || '').length }}/{{ maxlength }}</p>
    <p v-if="error" class="figma-field__error">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

// 视觉依据：用户 2026-11-06 提供的 Field 状态截图，共 5 行：默认 / 聚焦 / 填充 / 只读 / 禁用。
// Figma 组件集 5:374 field-input 只有「填充 / 禁用」变体，无「聚焦」变体；聚焦态按截图实现。
const props = defineProps({
  label: String,
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  required: Boolean,
  readonly: Boolean,
  disabled: Boolean,
  link: Boolean,
  textarea: Boolean,
  prefix: String,
  error: String,
  maxlength: [String, Number],
  state: { type: String, default: '' },
  members: { type: Array, default: null },
  deletable: Boolean
})
const emit = defineEmits(['update:modelValue', 'click', 'prefix-click', 'remove'])
const focused = ref(false)

const effectiveState = computed(() => {
  if (props.state) return props.state
  if (props.disabled) return 'disabled'
  if (props.readonly) return 'readonly'
  if (focused.value) return 'focus'
  if (props.modelValue || (props.members && props.members.length)) return 'filled'
  return 'default'
})
const isReadonly = computed(() => ['readonly', 'disabled'].includes(effectiveState.value))
const clickable = computed(() => props.readonly && !props.textarea && !props.disabled)
// Figma 1687:23533「field-textarea」：right 内除正文外还有 word-limit「0/50」12/16/w400/#4E5969
const showCount = computed(() => props.textarea && !!props.maxlength)
</script>

<style scoped>
.figma-field { min-height: 76px; padding: 10px 0; box-sizing: border-box; box-shadow: inset 0 -1px 0 #F2F3F5; color: #1D2129; }
.figma-field.textarea { min-height: 100px; }
.figma-field.clickable { cursor: pointer; }
.figma-field.clickable:active { background: #F7F8FA; }
.figma-field__title { min-height: 24px; display: flex; align-items: center; gap: 2px; color: #4E5969; font: 500 16px/24px "PingFang SC", sans-serif; }
.figma-field__title i { color: #F53F3F; font: 400 14px/24px "PingFang SC", sans-serif; font-style: normal; }
.figma-field__value { min-height: 24px; margin-top: 8px; display: flex; align-items: center; gap: 8px; }
.figma-field input, .figma-field textarea { width: 100%; min-width: 0; min-height: 24px; padding: 0; border: 0; outline: 0; color: #1D2129; background: transparent; font: 400 16px/24px "PingFang SC", sans-serif; resize: none; appearance: none; }
.figma-field textarea { min-height: 48px; }
.figma-field input::placeholder, .figma-field textarea::placeholder { color: #C9CDD4; opacity: 1; }
.figma-field input:disabled, .figma-field textarea:disabled { -webkit-text-fill-color: #C9CDD4; opacity: 1; }
.figma-field--disabled .figma-field__title, .figma-field--disabled input::placeholder { color: #C9CDD4; }
/* 聚焦态只显示一条聚焦线 #00AAA6；非聚焦态底部 border 仍为 #F2F3F5。 */
.figma-field--focus { box-shadow: inset 0 -1px 0 #00AAA6; }
.figma-field__arrow { flex: 0 0 16px; width: 16px; height: 16px; }
.figma-field--disabled .figma-field__arrow { opacity: .4; }
.figma-field__phone { width: 100%; display: flex; align-items: center; gap: 8px; }
.figma-field__prefix { min-height: 24px; padding: 0; display: inline-flex; gap: 4px; border: 0; color: #1D2129; background: transparent; font: 400 16px/24px "PingFang SC", sans-serif; }
.figma-field__prefix span { color: #86909C; font-size: 12px; }
.figma-field__count { margin: 4px 0 0; color: #4E5969; font: 400 12px/16px "PingFang SC", sans-serif; }
.figma-field__error { margin: 4px 0 0; color: #F53F3F; font: 400 12px/18px "PingFang SC", sans-serif; }
.figma-field__chips { display: flex; flex-wrap: wrap; gap: 8px; padding-right: 20px; }
.chip { min-height: 28px; padding: 4px 8px; box-sizing: border-box; display: inline-flex; align-items: center; gap: 4px; border: 1px solid #E5E6EB; border-radius: 999px; background: #FFFFFF; font: 400 12px/20px "PingFang SC", sans-serif; }
.chip__avatar { width: 16px; height: 16px; display: inline-flex; align-items: center; justify-content: center; border-radius: 50%; color: #FFFFFF; background: #C9CDD4; font-size: 10px; }
.chip__close { width: 14px; height: 14px; padding: 0; border: 0; border-radius: 50%; color: #FFFFFF; background: #C9CDD4; font: 400 10px/14px "PingFang SC", sans-serif; cursor: pointer; }
.figma-field--disabled .chip { opacity: .5; }
</style>
