<template>
  <section class="hisense-empty-state">
    <img class="hisense-empty-state__image" :src="emptyImage" alt="" />
    <p>{{ title }}</p>
    <HisenseButton v-if="actionText" class="hisense-empty-state__button" size="normal" :block="false" @click="$emit('action')">{{ actionText }}</HisenseButton>
    <slot />
  </section>
</template>

<script setup>
import emptyImage from '../assets/empty-state.png'
import HisenseButton from './HisenseButton.vue'

defineProps({ title: { type: String, default: '暂无预约记录' }, actionText: { type: String, default: '' } })
defineEmits(['action'])
</script>

<style scoped>
.hisense-empty-state { min-height: 316px; padding: 32px 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; box-sizing: border-box; text-align: center; }
.hisense-empty-state__image { width: 120px; height: 120px; object-fit: contain; }
.hisense-empty-state p { margin: 16px 0 0; color: #86909C; font-size: 14px; line-height: 22px; }
.hisense-empty-state__button { margin-top: 16px; min-width: 160px; }
</style>
