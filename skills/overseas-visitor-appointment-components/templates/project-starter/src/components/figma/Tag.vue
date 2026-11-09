<template><span class="figma-tag" :class="[`tag-${status}`, `size-${size}`]">{{ label }}</span></template>
<script setup>
defineProps({ label: String, status: { type: String, default: 'neutral' }, size: { type: String, default: 'small' } })
</script>
<style scoped>
.figma-tag { display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; color: #FFFFFF; font: 600 12px/20px "PingFang SC", sans-serif; white-space: nowrap; }
.size-small { min-height: 20px; padding: 0 8px; border-radius: 999px; }
.size-medium { min-height: 24px; padding: 2px 8px; border-radius: 999px; }
.size-large { min-height: 28px; padding: 4px 12px; border-radius: 999px; font-size: 14px; }
.tag-success { background: #23C343; }
.tag-warning { background: #F9CC45; }
.tag-danger { background: #F76560; }
.tag-info { background: #165DFF; }
.tag-neutral { background: #C9CDD4; }
.tag-primary { background: #22BBB3; }
</style>
