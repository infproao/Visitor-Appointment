<template>
  <div class="vehicle-card">
    <strong>{{ plate }}</strong>
    <div class="vehicle-card__actions">
      <button type="button" aria-label="编辑车辆" @click="$emit('edit')"><van-icon name="edit" /></button>
      <button type="button" aria-label="删除车辆" @click="$emit('remove')"><van-icon name="delete-o" /></button>
    </div>
  </div>
</template>

<script setup>
defineProps({ plate: { type: String, required: true } })
defineEmits(['edit', 'remove'])
</script>

<style scoped>
.vehicle-card {
  width: 100%;
  min-height: 56px;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #FFFFFF;
  border-radius: 12px;
  color: #1D2129;
  background: linear-gradient(90deg, #E4EFFF 0%, #FFFFFF 100%);
}

.vehicle-card strong {
  font-family: "PingFang SC", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
}

.vehicle-card__actions { display: flex; align-items: center; gap: 8px; }
.vehicle-card__actions button {
  width: 18px;
  height: 18px;
  padding: 0;
  border: 0;
  color: #86909C;
  background: transparent;
  font-size: 18px;
  line-height: 18px;
}
</style>
