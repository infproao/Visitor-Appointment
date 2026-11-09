<template>
  <article class="list-card">
    <header class="list-card__header">
      <h3>{{ title }}<span v-if="count !== null && count !== undefined">（{{ count }}）</span></h3>
    </header>
    <div class="list-card__content">
      <slot />
    </div>
    <button v-if="showAdd" type="button" class="list-card__add" @click="emit('add')">{{ addLabel }}</button>
    <button v-if="showMore" type="button" class="list-card__more" aria-label="查看更多" @click="emit('more')">更多<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5L6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" /></svg></button>
  </article>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  count: { type: [String, Number], default: null },
  addLabel: { type: String, default: '' },
  showAdd: Boolean,
  showMore: Boolean
})
const emit = defineEmits(['add', 'more'])
</script>

<style scoped>
.list-card { width: 311px; padding: 12px; box-sizing: border-box; border-radius: 12px; background: #FFFFFF; color: #1D2129; }
.list-card__header { min-height: 24px; display: flex; align-items: center; }
.list-card__header h3 { margin: 0; color: #1D2129; font: 600 16px/24px "PingFang SC", sans-serif; }
.list-card__content { display: flex; flex-direction: column; gap: 8px; margin-top: 8px; }
.list-card__content:empty { display: none; }
.list-card__add { width: 100%; min-height: 40px; margin-top: 8px; padding: 8px 16px; border: 1px solid #E5E6EB; border-radius: 20px; color: #1D2129; background: #FFFFFF; font: 400 14px/20px "PingFang SC", sans-serif; }
.list-card__more { display: flex; width: max-content; align-items: center; justify-content: center; gap: 2px; margin: 8px auto 0; padding: 0; border: 0; color: #22BBB3; background: transparent; font: 400 16px/24px "PingFang SC", sans-serif; }
.list-card__more svg { width: 12px; height: 12px; display: block; }</style>
