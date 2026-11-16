<template>
  <section class="member-flow">
    <button class="member-field" type="button" :disabled="readonly" @click="showPicker = true">
      <span class="member-field__title"><i>*</i>{{ label }}</span>
      <div class="member-field__value">
        <div v-if="selectedMembers.length" class="member-field__chips">
          <span v-for="member in selectedMembers" :key="member.id" class="chip">
            <span class="chip__avatar">{{ firstLetter(member.name) }}</span>
            <span>{{ member.name }}</span>
            <button v-if="!readonly" type="button" class="chip__close" aria-label="删除" @click.stop="remove(member.id)"><svg viewBox="0 0 14 14" aria-hidden="true"><path d="M4 4l6 6M10 4l-6 6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" /></svg></button>
          </span>
        </div>
        <span v-else class="member-field__placeholder">请选择</span>
        <img v-if="!readonly" class="member-field__arrow" src="../../assets/field-arrow.svg" alt="" />
      </div>
    </button>

    <van-popup v-model:show="showPicker" position="bottom" round class="member-popup figma-popup-375" :teleport="popupTarget" @close="showSelected = false">
      <header class="member-popup__header"><span class="handle" /><div class="member-popup__title"><h2>选择入园人员</h2><button type="button" class="close" aria-label="关闭" @click="showPicker = false"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg></button></div></header>
      <div class="member-popup__list">
        <!-- 用户 2026-11-10 裁决：复选框统一复用组件库 Checkbox，不在弹层里自绘 .checkbox。 -->
        <div class="member-row member-row--all" role="button" tabindex="0" @click="toggleAll"><span>全选（{{ members.length }}）</span><span class="member-row__check" @click.stop><Checkbox :model-value="allSelected" size="lg" @update:model-value="toggleAll" /></span></div>
        <div v-for="member in members" :key="member.id" class="member-row" role="button" tabindex="0" @click="toggle(member.id)"><span class="avatar">{{ firstLetter(member.name) }}</span><span class="member-name">{{ member.name }}</span><span class="member-row__check" @click.stop><Checkbox :model-value="selectedIds.includes(member.id)" size="lg" @update:model-value="toggle(member.id)" /></span></div>
      </div>
      <footer class="member-popup__footer">
        <button type="button" class="member-popup__selected" :disabled="!selectedIds.length" aria-label="查看已选人员列表" @click="showSelected = true">
          <span class="member-popup__selected-text">已选人员：{{ selectedIds.length }}项</span>
          <IconBox name="up" :size="14" color="#22BBB3" />
        </button>
        <button type="button" class="confirm" @click="confirmSelection">确定({{ selectedIds.length }})</button>
      </footer>
    </van-popup>

    <!-- 底部「已选人员」入口的叠层：复用 Figma 1803:33841 已选列表，可返回、清空、单个删除。 -->
    <PersonListPopup
      v-model:show="showSelected"
      title="已选人员"
      :count="selectedIds.length"
      :members="selectedList"
      deletable
      @remove="removeFromSelected"
      @clear="clearSelected"
    />
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { usePopupTeleport } from './usePopupTeleport.js'
import PersonListPopup from './PersonListPopup.vue'
import Checkbox from './Checkbox.vue'
import IconBox from './IconBox.vue'

const props = defineProps({ label: { type: String, default: '入园人员' }, members: { type: Array, default: () => [] }, modelValue: { type: Array, default: () => [] }, readonly: Boolean })
const emit = defineEmits(['update:modelValue', 'confirm'])
const showPicker = ref(false)
const showSelected = ref(false)
const popupTarget = usePopupTeleport()
const selectedIds = ref([...props.modelValue])
const selectedMembers = computed(() => props.members.filter(member => selectedIds.value.includes(member.id)))
const selectedList = computed(() => selectedMembers.value.map(member => ({ id: member.id, name: member.name, avatar: firstLetter(member.name) })))
const allSelected = computed(() => props.members.length > 0 && selectedIds.value.length === props.members.length)
function firstLetter(name) { return String(name || '?').slice(0, 1) }
function remove(id) { selectedIds.value = selectedIds.value.filter(value => value !== id); emit('update:modelValue', selectedIds.value) }
function removeFromSelected(id) { remove(id); if (!selectedIds.value.length) showSelected.value = false }
function clearSelected() { selectedIds.value = []; emit('update:modelValue', []); showSelected.value = false }
function toggle(id) { selectedIds.value = selectedIds.value.includes(id) ? selectedIds.value.filter(value => value !== id) : [...selectedIds.value, id] }
function toggleAll() { selectedIds.value = allSelected.value ? [] : props.members.map(member => member.id) }
function confirmSelection() { emit('update:modelValue', selectedIds.value); emit('confirm', selectedMembers.value); showSelected.value = false; showPicker.value = false }
</script>

<style scoped>
.member-flow { width: 311px; color: #1D2129; }
.member-field { width: 100%; min-height: 76px; padding: 10px 0; border: 0; box-shadow: inset 0 -1px 0 #F2F3F5; background: #FFFFFF; text-align: left; }
.member-field__title { display: block; color: #4E5969; font: 500 16px/24px "PingFang SC", sans-serif; }
.member-field__title i { margin-right: 2px; color: #F53F3F; font-style: normal; }
.member-field__value { display: flex; align-items: center; gap: 8px; margin-top: 8px; }
.member-field__chips { flex: 1; display: flex; flex-wrap: wrap; gap: 8px; }
.member-field__placeholder { flex: 1; color: #C9CDD4; font: 400 16px/24px "PingFang SC", sans-serif; }
/* 用户 2026-11-10 裁决：已选人员 tag 精确 28px 高（固定高度 + border-box，不再因 padding 溢出到 30）。 */
.chip { height: 28px; box-sizing: border-box; padding: 0 8px; display: inline-flex; align-items: center; gap: 4px; border: 1px solid #E5E6EB; border-radius: 999px; background: #FFFFFF; font: 400 12px/20px "PingFang SC", sans-serif; }
.chip__avatar, .avatar { display: inline-flex; align-items: center; justify-content: center; border-radius: 50%; color: #FFFFFF; background: #C9CDD4; }
.chip__avatar { width: 16px; height: 16px; font-size: 10px; }
.chip__close { width: 14px; height: 14px; padding: 0; border: 0; color: #86909C; background: transparent; }
.chip__close svg { display: block; width: 14px; height: 14px; }
.member-field__arrow { width: 16px; height: 16px; flex: 0 0 16px; }
.member-popup { height: calc(100% - 80px); max-height: calc(100% - 80px); overflow: hidden; background: #F2F3F5; }
.member-popup__header { height: 64px; padding: 8px 16px; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; gap: 8px; }
.handle { width: 40px; height: 4px; border-radius: 999px; background: #C9CDD4; }
.member-popup__title { position: relative; width: 100%; height: 36px; display: flex; align-items: center; justify-content: center; }
.member-popup__title h2 { margin: 0; font: 600 16px/22px "PingFang SC", sans-serif; }
.close { position: absolute; top: 0; right: 0; width: 36px; height: 36px; padding: 0; display: flex; align-items: center; justify-content: center; border: 0; border-radius: 999px; color: #86909C; background: #FFFFFF; }
.close svg { width: 16px; height: 16px; }
.member-popup__list { flex: 1; min-height: 0; margin: 0 16px; padding: 12px 16px 16px; overflow-y: auto; border-radius: 12px; background: #FFFFFF; }
/* Figma 1803:33585：全选行 cell-radio 311×44、人员行 user-card 311×48，form 无 itemSpacing → 逐行紧贴。
   此前 min-height + padding 8 在 content-box 下把行撑到 60/64，是同截图里行距过大的根因。
   2026-11-10 17:3x 用户裁决（截图红框「无分割线」）：删除全选行底部 1px #F2F3F5 分割线。 */
.member-row { width: 100%; height: 48px; box-sizing: border-box; padding: 0; display: flex; align-items: center; gap: 12px; border: 0; border-radius: 12px; background: #FFFFFF; text-align: left; cursor: pointer; }
.member-row--all { height: 44px; justify-content: space-between; border-radius: 0; }
.avatar { width: 24px; height: 24px; flex: 0 0 24px; font: 600 14px/24px "PingFang SC", sans-serif; }
.member-name { flex: 1; font: 500 16px/24px "PingFang SC", sans-serif; }
/* 复用 Checkbox 组件（size="lg" = 20×20 / r4 / 1px #C9CDD4，对应 Figma .radio-icon），
   只负责右对齐与阻止点击冒泡（避免整行 @click 二次切换）。 */
.member-row__check { flex: 0 0 auto; display: inline-flex; align-items: center; }
.member-row__check :deep(.figma-checkbox > span:last-child:empty) { display: none; }
/* 底部操作栏：Figma .components/action-bar 343×46；
   左侧 .selected-trigger 171.5×46（pad 0/12）内为 14/20 #22BBB3「已选择: 选项…」+ 14×14 up 箭头；
   右侧 action 171.5×46 内为 r999 #22BBB3「确定(10)」16/22 w600。
   2026-11-10 17:3x 用户裁决（截图红框「无背景」）：去掉上边框与白色底，让底部栏直接落在弹层底色上。 */
.member-popup__footer { flex: 0 0 46px; height: 46px; margin: 12px 16px 16px; box-sizing: border-box; display: flex; align-items: center; background: transparent; }
/* 「已选人员：N项」是可点击入口，打开已选列表叠层；0 项时禁用，避免空弹层。 */
.member-popup__selected { flex: 1 1 0; min-width: 0; height: 46px; padding: 0 12px; display: inline-flex; align-items: center; gap: 8px; border: 0; background: transparent; color: #22BBB3; font: 400 14px/20px "PingFang SC", sans-serif; cursor: pointer; }
.member-popup__selected-text { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.member-popup__selected:disabled { cursor: default; opacity: 0.45; }
.member-popup__selected:active:not(:disabled) { opacity: 0.6; }
.confirm { flex: 0 0 50%; height: 46px; padding: 0 24px; border: 0; border-radius: 999px; color: #FFFFFF; background: #22BBB3; font: 600 16px/22px "PingFang SC", sans-serif; cursor: pointer; }
</style>
