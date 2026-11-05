<template>
  <div class="user-card" :class="{ editable }">
    <span class="user-card__avatar">{{ initials }}</span>
    <div class="user-card__content">
      <strong>{{ name }}</strong>
      <span v-if="status" class="user-card__status">{{ status }}</span>
    </div>
    <button v-if="editable" class="user-card__icon" type="button" aria-label="编辑同行人" @click="$emit('edit')">
      <van-icon name="edit" />
    </button>
    <button v-if="editable" class="user-card__icon" type="button" aria-label="删除同行人" @click="$emit('remove')">
      <van-icon name="delete-o" />
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  status: { type: String, default: '' },
  editable: { type: Boolean, default: false }
})

defineEmits(['edit', 'remove'])
const initials = computed(() => props.name.trim().slice(0, 1).toUpperCase() || '访')
</script>

<style scoped>
.user-card {
  min-height: 48px;
  padding: 12px 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 12px;
  color: #1D2129;
  background: #FFFFFF;
}

.user-card.editable {
  min-height: 56px;
  border: 1px solid #E5E6EB;
}

.user-card__avatar {
  width: 24px;
  height: 24px;
  flex: 0 0 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #FFFFFF;
  background: #C9CDD4;
  font-size: 14px;
  line-height: 24px;
}

.user-card__content {
  min-width: 0;
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-card__content strong {
  overflow: hidden;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-card__status {
  color: #00AAA6;
  font-size: 12px;
  line-height: 20px;
}

.user-card__icon {
  width: 44px;
  height: 44px;
  flex: 0 0 44px;
  padding: 0;
  border: 0;
  color: #86909C;
  background: transparent;
  font-size: 20px;
}
</style>
