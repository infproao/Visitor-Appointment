<template>
  <div class="timeline">
    <article v-for="(item, i) in items" :key="item.id || i" class="item">
      <div class="track"><span class="dot" /><span v-if="i < items.length - 1" class="line" /></div>
      <div class="content">
        <div class="meta"><span>{{ item.time }}</span><span>{{ item.operator }}</span></div>
        <Tag :label="item.tag || item.title" :status="eventStatus(item)" />
        <p v-if="item.description">{{ item.description }}</p>
        <div v-if="item.people" class="people-line">
          <strong>{{ item.people }}</strong>
          <button v-if="item.more" type="button" class="more" @click="openPeople(item)">更多</button>
        </div>
        <div v-if="item.images?.length" class="images"><img v-for="image in item.images" :key="image" :src="image" alt="" /></div>
      </div>
    </article>
    <PersonListPopup v-model:show="showPeople" :title="peopleTitle" :count="peopleCount" :members="people" closeable />
  </div>
</template>

<script setup>
// 出入记录组件：入园使用成功色，出园使用中性色；“更多”紧跟人员文本并打开对应人员列表。
import { ref } from 'vue'
import Tag from './Tag.vue'
import PersonListPopup from './PersonListPopup.vue'

defineProps({
  items: { type: Array, default: () => [] },
  people: { type: Array, default: () => [] }
})
const emit = defineEmits(['more'])
const showPeople = ref(false)
const peopleTitle = ref('出园人')
const peopleCount = ref(null)

function eventStatus(item) {
  if (String(item.tag || item.title || '').startsWith('入园')) return 'success'
  if (String(item.tag || item.title || '').startsWith('出园')) return 'neutral'
  return item.status === 'rejected' ? 'danger' : item.status === 'done' ? 'success' : 'neutral'
}
function eventCount(item) {
  if (item.peopleCount !== undefined && item.peopleCount !== null) return item.peopleCount
  const match = String(item.tag || item.title || '').match(/[（(](\d+)[）)]/)
  return match ? match[1] : null
}
function openPeople(item) {
  const eventName = String(item.tag || item.title || '')
  peopleTitle.value = eventName.startsWith('入园') ? '入园人' : '出园人'
  peopleCount.value = eventCount(item)
  showPeople.value = true
  emit('more', item)
}
</script>

<style scoped>
.timeline { width: 343px; padding: 0; background: #fff; border-radius: 12px; }
.item { min-height: 90px; display: flex; }
.track { position: relative; width: 32px; flex: 0 0 32px; display: flex; justify-content: center; padding-top: 18px; }
.dot { width: 5px; height: 5px; border-radius: 50%; background: #00AAA6; }
.line { position: absolute; top: 23px; bottom: 0; width: 1px; background: #F2F3F5; }
.content { position: relative; flex: 1; padding: 10px 10px 10px 0; border-bottom: .5px solid #F2F3F5; }
.meta { display: flex; justify-content: space-between; color: #86909C; font: 400 14px/20px "PingFang SC", sans-serif; }
.content :deep(.figma-tag) { margin-top: 8px; }
.content p { margin: 8px 0 0; color: #86909C; font: 400 12px/18px "PingFang SC", sans-serif; }
.people-line { margin-top: 8px; color: #1D2129; font: 500 14px/20px "PingFang SC", sans-serif; }
.people-line strong { font: inherit; }
.more { display: inline; margin-left: 4px; padding: 0; border: 0; color: #00AAA6; background: transparent; font: inherit; cursor: pointer; }
.images { display: flex; gap: 8px; margin-top: 8px; }
.images img { width: 80px; height: 80px; object-fit: cover; border-radius: 4px; }
</style>
