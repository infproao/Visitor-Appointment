<template>
  <!-- 叠层时关闭自身蒙层，避免压暗下层的选择人员弹层。 -->
  <van-popup
    v-model:show="visible"
    position="bottom"
    round
    :class="['person-popup', 'figma-popup-375', { 'person-popup--timeline': closeable }]"
    :overlay="true"
  >
    <header>
      <span class="handle" />
      <div class="title-row">
        <button v-if="!closeable" type="button" class="back" aria-label="返回" @click="visible = false">
          <svg viewBox="0 0 22 22" aria-hidden="true"><path d="M13.5 5.5L8 11l5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </button>
        <h2>{{ title }}<span v-if="count !== null && count !== undefined">（{{ count }}）</span></h2>
        <button v-if="closeable" type="button" class="close" aria-label="关闭" @click="visible = false">
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
        </button>
        <button v-else-if="clearable" type="button" class="clear" @click="emit('clear')">清空</button>
      </div>
    </header>
    <div class="list">
      <div v-for="member in members" :key="member.id" class="row">
        <span class="avatar">{{ member.avatar || (member.name || '?').slice(0, 1) }}</span>
        <strong>{{ member.name }}</strong>
        <button v-if="deletable" type="button" class="delete" aria-label="删除" @click="emit('remove', member.id)">
          <img :src="deleteIcon" alt="" />
        </button>
      </div>
    </div>
  </van-popup>
</template>

<script setup>
import { computed } from 'vue'
import deleteIcon from '../../assets/figma-vehicle-delete.svg'

const props = defineProps({
  show: Boolean,
  title: { type: String, default: '出园人' },
  count: { type: [String, Number], default: null },
  members: { type: Array, default: () => [] },
  deletable: Boolean,
  clearable: { type: Boolean, default: true },
  closeable: Boolean
})
const emit = defineEmits(['update:show', 'remove', 'clear'])
const visible = computed({ get: () => props.show, set: v => emit('update:show', v) })
</script>

<style scoped>
/* 默认已选列表：返回 / 标题左对齐 / 清空；出入记录的“更多”入口通过 closeable 切换为关闭按钮和居中标题。 */
.person-popup { overflow: hidden; background: #F2F3F5; }
.person-popup header { position: relative; height: 64px; padding: 8px 16px; box-sizing: border-box; flex: 0 0 64px; display: flex; flex-direction: column; align-items: center; gap: 8px; }
.handle { width: 40px; height: 4px; border-radius: 100px; background: #C9CDD4; }
.title-row { position: relative; width: 100%; height: 36px; display: flex; align-items: center; gap: 8px; }
.back { width: 22px; height: 22px; flex: 0 0 22px; padding: 0; border: 0; background: transparent; color: #1D2129; }
.back svg { width: 22px; height: 22px; display: block; }
.person-popup header h2 { margin: 0; flex: 1 1 auto; min-width: 0; color: #1D2129; font: 600 16px/22px "PingFang SC", sans-serif; }
.person-popup header h2 span { white-space: nowrap; }
.clear { height: 32px; flex: 0 0 auto; padding: 5px 16px; box-sizing: border-box; border: 0; border-radius: 4px; color: #00AAA6; background: transparent; font: 400 14px/22px "PingFang SC", sans-serif; }
.close { position: absolute; right: 0; top: 0; width: 36px; height: 36px; padding: 0; display: flex; align-items: center; justify-content: center; border: 0; border-radius: 9999px; color: #86909C; background: #FFFFFF; }
.close svg { width: 16px; height: 16px; display: block; }
.person-popup--timeline .title-row { justify-content: center; }
.person-popup--timeline header h2 { flex: 0 0 auto; text-align: center; }
.list { flex: 1 1 auto; min-height: 0; margin: 0 16px 16px; padding: 12px 16px 16px; overflow-y: auto; border-radius: 12px; background: #FFFFFF; }
.row { min-height: 48px; padding: 8px 0; box-sizing: border-box; display: flex; align-items: center; gap: 12px; }
.avatar { width: 24px; height: 24px; flex: 0 0 24px; display: flex; align-items: center; justify-content: center; border-radius: 50%; color: #FFFFFF; background: #C9CDD4; font: 600 14px/14px "PingFang SC", sans-serif; }
.row strong { flex: 1; color: #1D2129; font: 500 16px/24px "PingFang SC", sans-serif; }
.delete { width: 18px; height: 18px; flex: 0 0 18px; padding: 0; border: 0; background: transparent; }
.delete img { width: 18px; height: 18px; display: block; }
</style>
