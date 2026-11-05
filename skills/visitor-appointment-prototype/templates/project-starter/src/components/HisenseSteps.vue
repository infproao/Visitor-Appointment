<template>
  <nav class="hisense-steps" :aria-label="ariaLabel">
    <button
      v-for="(item, index) in items"
      :key="item.key || item.label || index"
      class="hisense-step"
      :class="stepClass(index)"
      type="button"
      :disabled="!clickable"
      @click="clickable && emit('change', index)"
    >
      <span v-if="index > 0" class="hisense-step__line hisense-step__line--left" aria-hidden="true" />
      <span class="hisense-step__dot" aria-hidden="true" />
      <span v-if="index < items.length - 1" class="hisense-step__line hisense-step__line--right" aria-hidden="true" />
      <span class="hisense-step__label">{{ item.label || item }}</span>
    </button>
  </nav>
</template>

<script setup>
const props = defineProps({
  items: { type: Array, default: () => [] },
  active: { type: Number, default: 0 },
  clickable: { type: Boolean, default: false },
  ariaLabel: { type: String, default: '流程步骤' }
})
const emit = defineEmits(['change'])

function stepClass(index) {
  return {
    'hisense-step--active': index === props.active,
    'hisense-step--completed': index < props.active,
    'hisense-step--waiting': index > props.active
  }
}
</script>

<style scoped>
.hisense-steps {
  width: 303px;
  height: 36px;
  padding: 0;
  display: flex;
  box-sizing: border-box;
}

.hisense-step {
  position: relative;
  width: 101px;
  height: 36px;
  padding: 0;
  border: 0;
  color: #1D2129;
  background: transparent;
  font: inherit;
}

.hisense-step:disabled { opacity: 1; }

.hisense-step__dot {
  position: relative;
  z-index: 2;
  display: block;
  width: 8px;
  height: 8px;
  margin: 0 auto;
  border-radius: 50%;
  background: #C9CDD4;
}

.hisense-step--active .hisense-step__dot,
.hisense-step--completed .hisense-step__dot {
  background: #00AAA6;
}

.hisense-step__line {
  position: absolute;
  top: 3px;
  height: 1px;
  background: #E5E6EB;
}

.hisense-step__line--left { left: 0; right: calc(50% + 4px); }
.hisense-step__line--right { left: calc(50% + 4px); right: 0; }

.hisense-step--active .hisense-step__line--left,
.hisense-step--completed .hisense-step__line--left,
.hisense-step--completed .hisense-step__line--right {
  background: #00AAA6;
}

.hisense-step__label {
  display: block;
  margin-top: 8px;
  color: #1D2129;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  white-space: nowrap;
}
</style>
