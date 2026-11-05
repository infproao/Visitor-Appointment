<template>
  <section class="hisense-timeline">
    <article v-for="(item, index) in items" :key="item.id || index" class="hisense-timeline__item">
      <div class="hisense-timeline__track">
        <span class="hisense-timeline__dot" :class="`hisense-timeline__dot--${item.status || 'waiting'}`" />
        <span v-if="index < items.length - 1" class="hisense-timeline__line" />
      </div>
      <div class="hisense-timeline__content">
        <div class="hisense-timeline__meta"><span>{{ item.time }}</span><span>{{ item.operator }}</span></div>
        <HisenseTag :label="item.tag || item.title || '待补充'" :status="tagStatus(item.status)" />
        <p v-if="item.description" class="hisense-timeline__description">{{ item.description }}</p>
        <strong v-if="item.people" class="hisense-timeline__people">{{ item.people }}</strong>
        <div v-if="item.images?.length" class="hisense-timeline__images"><img v-for="image in item.images" :key="image" :src="image" alt="" /></div>
        <button v-if="item.more" class="hisense-timeline__more" type="button" @click="$emit('more', item)">更多</button>
      </div>
    </article>
  </section>
</template>

<script setup>
import HisenseTag from './HisenseTag.vue'

defineProps({ items: { type: Array, default: () => [] } })
defineEmits(['more'])
function tagStatus(status) { if (status === 'done') return 'success'; if (status === 'rejected') return 'danger'; if (status === 'current') return 'warning'; return 'neutral' }
</script>

<style scoped>
.hisense-timeline { width: 100%; padding: 0; color: #1D2129; }
.hisense-timeline__item { position: relative; min-height: 90px; display: flex; }
.hisense-timeline__track { position: relative; width: 32px; flex: 0 0 32px; display: flex; justify-content: center; padding-top: 18px; }
.hisense-timeline__dot { width: 5px; height: 5px; flex: 0 0 5px; border-radius: 50%; background: #C9CDD4; }
.hisense-timeline__dot--done, .hisense-timeline__dot--current { background: #00AAA6; }
.hisense-timeline__dot--rejected { background: #F76560; }
.hisense-timeline__line { position: absolute; top: 23px; bottom: 0; width: 1px; background: #F2F3F5; }
.hisense-timeline__content { flex: 1; min-width: 0; padding: 10px 10px 10px 0; border-bottom: 0.5px solid #F2F3F5; }
.hisense-timeline__meta { display: flex; justify-content: space-between; gap: 8px; color: #86909C; font-size: 14px; line-height: 20px; }
.hisense-timeline__content :deep(.hisense-tag) { margin-top: 8px; }
.hisense-timeline__description { margin: 8px 0 0; color: #86909C; font-size: 12px; line-height: 18px; }
.hisense-timeline__people { display: block; margin-top: 8px; font-size: 14px; line-height: 20px; }
.hisense-timeline__images { margin-top: 8px; display: flex; gap: 8px; }
.hisense-timeline__images img { width: 80px; height: 80px; object-fit: cover; border-radius: 4px; }
.hisense-timeline__more { padding: 0; border: 0; color: #00AAA6; background: transparent; font-size: 14px; line-height: 20px; }
</style>
