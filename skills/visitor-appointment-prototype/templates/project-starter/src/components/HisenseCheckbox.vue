<template>
  <label class="hisense-checkbox">
    <input
      class="hisense-checkbox__input"
      type="checkbox"
      :checked="modelValue"
      @change="emit('update:modelValue', $event.target.checked)"
    />
    <span class="hisense-checkbox__box" :class="{ checked: modelValue }">
      <span v-if="modelValue">✓</span>
    </span>
    <span class="hisense-checkbox__label"><slot /></span>
  </label>
</template>

<script setup>
defineProps({ modelValue: { type: Boolean, default: false } })
const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
.hisense-checkbox {
  position: relative;
  min-height: 22px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #1D2129;
  font-family: "PingFang SC", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 14px;
  line-height: 22px;
  cursor: pointer;
}

.hisense-checkbox__input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.hisense-checkbox__box {
  width: 14px;
  height: 14px;
  flex: 0 0 14px;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #E5E6EB;
  border-radius: 2px;
  color: #FFFFFF;
  background: #FFFFFF;
  font-size: 11px;
  font-weight: 700;
  line-height: 14px;
}

.hisense-checkbox__box.checked {
  border-color: #00AAA6;
  background: #00AAA6;
}

.hisense-checkbox__label {
  min-width: 0;
}
</style>
