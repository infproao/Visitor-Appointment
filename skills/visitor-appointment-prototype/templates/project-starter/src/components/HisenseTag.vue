<template>
  <span class="hisense-tag" :class="[`hisense-tag--${status}`, `hisense-tag--${size}`]">{{ label }}</span>
</template>

<script setup>
defineProps({
  label: { type: String, default: '' },
  status: { type: String, default: 'neutral' },
  size: { type: String, default: 'small' }
})
</script>

<style scoped>
.hisense-tag { display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; font-family: "PingFang SC", sans-serif; font-weight: 600; white-space: nowrap; }
.hisense-tag--small { min-height: 20px; padding: 2px 8px; border-radius: 4px; font-size: 12px; line-height: 16px; }
.hisense-tag--medium { min-height: 24px; padding: 2px 8px; border-radius: 4px; font-size: 12px; line-height: 20px; }
.hisense-tag--large { min-height: 28px; padding: 4px 12px; border-radius: 14px; font-size: 14px; line-height: 20px; }
.hisense-tag--success { color: #009A29; background: #E8FFEA; }
.hisense-tag--warning { color: #A26D0A; background: #FFFCE8; }
.hisense-tag--danger { color: #CB272D; background: #FFECE8; }
.hisense-tag--info { color: #0E42D2; background: #E8F3FF; }
.hisense-tag--neutral { color: #4E5969; background: #F2F3F5; }
.hisense-tag--primary { color: #00757B; background: #E8FFFB; }
</style>
