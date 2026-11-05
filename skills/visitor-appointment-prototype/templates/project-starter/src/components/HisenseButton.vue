<template>
  <van-button
    class="hisense-button"
    :class="[`hisense-button--${variant}`, `hisense-button--${size}`]"
    :block="block"
    :loading="loading"
    :disabled="disabled"
    :native-type="nativeType"
    @click="emit('click', $event)"
  >
    <slot>{{ label }}</slot>
  </van-button>
</template>

<script setup>
defineProps({
  label: { type: String, default: '' },
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'large' },
  block: { type: Boolean, default: true },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  nativeType: { type: String, default: 'button' }
})
const emit = defineEmits(['click'])
</script>

<style scoped>
.hisense-button {
  width: 100%;
  min-height: 44px;
  padding: 12px 16px;
  box-sizing: border-box;
  border: 1px solid transparent;
  border-radius: 20px;
  box-shadow: none;
  font-family: "PingFang SC", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
}

.hisense-button--primary {
  border-color: #22BBB3 !important;
  color: #FFFFFF !important;
  background: #22BBB3 !important;
}

.hisense-button--secondary {
  border-color: #E5E6EB !important;
  color: #1D2129 !important;
  background: #FFFFFF !important;
}

.hisense-button--tertiary {
  border-color: transparent !important;
  color: #00AAA6 !important;
  background: transparent !important;
}

.hisense-button--large { min-height: 48px; border-radius: 24px; }
.hisense-button--normal { min-height: 44px; border-radius: 20px; font-size: 14px; }
.hisense-button--small { min-height: 32px; padding: 6px 12px; border-radius: 16px; font-size: 12px; }

.hisense-button--primary:disabled,
.hisense-button--primary.van-button--disabled {
  border-color: #79DDD1 !important;
  color: #FFFFFF !important;
  background: #79DDD1 !important;
  opacity: 1 !important;
}

.hisense-button--secondary:disabled,
.hisense-button--tertiary:disabled { opacity: 0.5; }
</style>
