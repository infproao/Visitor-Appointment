<template>
  <figure class="qr" :style="{ width: qrSize + 'px' }">
    <img :src="qr" :style="{ width: qrSize + 'px', height: qrSize + 'px' }" alt="二维码占位（展示用）" />
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>
</template>

<script setup>
import { computed } from 'vue'
import qr from '../../assets/qr-placeholder.png'

// 用户 2026-11-06 裁决：最小尺寸 160；假二维码、仅展示用；样式沿用用户提供的 qr-placeholder.png。
// 默认展示尺寸仍为 200（未改动视觉），size 小于 160 时按 160 兜底。
const props = defineProps({
  caption: String,
  size: { type: [Number, String], default: 200 }
})
const qrSize = computed(() => Math.max(160, Number(props.size) || 200))
</script>

<style scoped>
.qr { margin: 0 auto; text-align: center; }
.qr img { display: block; min-width: 160px; min-height: 160px; margin: 0 auto; object-fit: contain; }
.qr figcaption { margin-top: 12px; color: #4E5969; font: 400 14px/22px "PingFang SC", sans-serif; }
</style>
