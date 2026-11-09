<template>
  <van-popup v-model:show="visible" position="bottom" round class="popup figma-popup-375">
    <header>
      <span class="handle" />
      <h2>{{ title }}</h2>
      <button type="button" aria-label="关闭" @click="visible = false"><van-icon name="cross" /></button>
    </header>
    <div class="body"><slot /></div>
  </van-popup>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ show: Boolean, title: String })
const emit = defineEmits(['update:show'])
const visible = computed({ get: () => props.show, set: value => emit('update:show', value) })
</script>

<style scoped>
.popup { overflow: hidden; background: #F2F3F5; }
.popup header { position: relative; height: 64px; padding: 20px 16px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; }
.popup h2 { margin: 0; color: #1D2129; font: 600 18px/24px "PingFang SC", sans-serif; }
.popup .handle { position: absolute; top: 8px; width: 40px; height: 4px; border-radius: 100px; background: #C9CDD4; }
.popup header button { position: absolute; top: 14px; right: 16px; width: 36px; height: 36px; padding: 0; display: flex; align-items: center; justify-content: center; border: 0; border-radius: 50%; color: #86909C; background: #FFFFFF; font-size: 16px; }
.popup header button :deep(.van-icon) { display: block; font-size: 16px; line-height: 16px; }
.body { padding: 0 16px 16px; }
.body :deep(.popup-actions) { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
</style>
