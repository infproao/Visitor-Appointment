<template>
  <section class="confirmation-card">
    <div class="confirmation-card__header">
      <h2>{{ title }}</h2>
      <button v-if="editable" type="button" @click="$emit('edit')">修改</button>
    </div>
    <div v-for="item in items" :key="item.label" class="confirmation-card__row">
      <span>{{ item.label }}</span>
      <strong>{{ item.value || '未填写' }}</strong>
    </div>
    <slot />
  </section>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  items: { type: Array, default: () => [] },
  editable: { type: Boolean, default: true }
})
defineEmits(['edit'])
</script>

<style scoped>
.confirmation-card {
  padding: 16px;
  border-radius: 12px;
  background: #FFFFFF;
}

.confirmation-card__header {
  min-height: 24px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.confirmation-card__header h2 {
  margin: 0;
  color: #1D2129;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}

.confirmation-card__header button {
  min-height: 44px;
  padding: 0;
  border: 0;
  color: #00AAA6;
  background: transparent;
  font-size: 14px;
}

.confirmation-card__row {
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid #F2F3F5;
  font-size: 14px;
}

.confirmation-card__row:last-of-type {
  border-bottom: 0;
}

.confirmation-card__row span {
  color: #4E5969;
}

.confirmation-card__row strong {
  max-width: 65%;
  color: #1D2129;
  font-weight: 400;
  text-align: right;
  overflow-wrap: anywhere;
}
</style>
