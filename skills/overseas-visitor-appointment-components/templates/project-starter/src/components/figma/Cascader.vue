<template>
  <div class="cascader">
    <button class="cascader__trigger" type="button" @click="open">
      <span class="cascader__label">{{ triggerText }}</span>
      <svg class="cascader__arrow" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d="M2.5 4.5L6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
    </button>

    <van-popup v-model:show="show" position="bottom" round class="cascader-sheet figma-popup-375" :teleport="popupTarget">
      <span class="cascader-sheet__handle" aria-hidden="true" />

      <label class="cascader-sheet__search">
        <svg viewBox="585.5 666.5 15.5 15.5" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M588.009 669.01C590.352 666.667 594.151 666.667 596.495 669.01C598.678 671.194 598.828 674.642 596.941 676.998L599.324 679.381L598.38 680.323L595.998 677.941C593.642 679.827 590.193 679.679 588.009 677.495C585.666 675.152 585.666 671.353 588.009 669.01ZM595.552 669.953C593.73 668.131 590.775 668.131 588.953 669.953C587.13 671.776 587.13 674.73 588.953 676.553C590.775 678.375 593.73 678.375 595.552 676.553C597.375 674.73 597.374 671.776 595.552 669.953Z" fill="#86909C" /></svg>
        <input v-model="keyword" type="text" :placeholder="searchPlaceholder" />
      </label>

      <div class="cascader-sheet__tabs">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          type="button"
          class="cascader-sheet__tab"
          :class="{ 'cascader-sheet__tab--active': index === activeLevel }"
          @click="switchLevel(index)"
        >{{ tab }}</button>
      </div>

      <div class="cascader-sheet__list">
        <button
          v-for="option in currentOptions"
          :key="option.value"
          type="button"
          class="cascader-sheet__option"
          :class="{ 'cascader-sheet__option--selected': selectedValueAt(activeLevel) === option.value }"
          @click="pick(option)"
        >
          <span>{{ option.label }}</span>
          <!-- 用户 2026-11-10：重新打开抽屉时保留已选末级的选中态（tab 仍按设计稿显示「请选择」等待重选）。 -->
          <svg v-if="selectedValueAt(activeLevel) === option.value" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M3 8.5l3.2 3.2L13 5" fill="none" stroke="#00AAA6" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
          <svg v-else-if="option.children && option.children.length" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d="M4.5 2.5L8 6l-3.5 3.5" fill="none" stroke="#C9CDD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </button>
        <p v-if="!currentOptions.length" class="cascader-sheet__empty">没有匹配的选项</p>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { usePopupTeleport } from './usePopupTeleport.js'

/**
 * 级联选择（两级：园区 → 门）。
 * 视觉依据：整合页面 > 泰国 >「搜索园区精确到门」1822:38307 /「选择园区」1822:36720
 * —— 底部抽屉内依次为 handle、搜索框（32 高 / r17）、层级 tab（已选一级 + 当前「请选择」）、当前层级选项列表。
 * 2026-11-10 用户裁决：层级 tab 高 44、tab 与选项之间均无分割线（list 1822:38315 无 stroke）。
 * options 为树形：[{ label, value, children: [{ label, value }] }]
 */
const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  options: { type: Array, default: () => [] },
  title: { type: String, default: '选择园区' },
  placeholder: { type: String, default: '请选择园区' },
  levelPlaceholders: { type: Array, default: () => ['请选择园区', '请选择'] },
  searchPlaceholder: { type: String, default: '请输入搜索关键词' },
  separator: { type: String, default: '（' }
})
const emit = defineEmits(['update:modelValue', 'change', 'open', 'close'])
const popupTarget = usePopupTeleport()

const show = ref(false)
const keyword = ref('')
const draft = ref([])
const activeLevel = ref(0)

const labelsOf = (values, short = false) => {
  let level = props.options
  const labels = []
  values.forEach(value => {
    const hit = level.find(item => item.value === value)
    if (!hit) return
    // 设计稿 1822:38307：触发器显示短名「泰国工厂（南门）」，层级 tab 显示全名「HHA泰国-Rayong」
    labels.push(short ? (hit.shortLabel || hit.label) : hit.label)
    level = hit.children || []
  })
  return labels
}
const triggerText = computed(() => {
  const labels = labelsOf(props.modelValue, true)
  if (!labels.length) return props.placeholder
  // 设计稿示例：泰国工厂（南门） —— 一级 + 括号内的二级
  return labels.length > 1
    ? `${labels[0]}${props.separator}${labels.slice(1).join(' / ')}）`
    : labels[0]
})
const tabs = computed(() => {
  const list = labelsOf(draft.value)
  const count = Math.min(draft.value.length + 1, props.levelPlaceholders.length)
  return Array.from({ length: count }, (_, index) => list[index] || props.levelPlaceholders[index] || '请选择')
})
const levelOptions = computed(() => {
  if (activeLevel.value === 0) return props.options
  const parent = props.options.find(item => item.value === draft.value[0])
  return parent?.children || []
})
const currentOptions = computed(() => {
  const q = keyword.value.trim().toLowerCase()
  if (!q) return levelOptions.value
  return levelOptions.value.filter(item => String(item.label).toLowerCase().includes(q))
})

// 当前层级的选中值：草稿优先；草稿为空但已选链前缀与草稿一致时，回退到已选值。
// 这样重新打开抽屉（draft 只保留一级、第二级 tab 显示「请选择」）时，末级仍能看到选中态。
function selectedValueAt(level) {
  if (draft.value[level] !== undefined) return draft.value[level]
  for (let i = 0; i < level; i++) {
    if (draft.value[i] !== props.modelValue[i]) return undefined
  }
  return props.modelValue[level]
}

function open() {
  // 设计稿 1822:38307：打开时保留已选一级，第二级回到「请选择」等待重选，
  // 因此层级 tab 呈现「HHA泰国-Rayong / 请选择」，列表列出该园区下的所有门。
  draft.value = props.modelValue.length ? props.modelValue.slice(0, 1) : []
  activeLevel.value = props.modelValue.length ? 1 : 0
  keyword.value = ''
  show.value = true
  emit('open')
}
function switchLevel(index) {
  if (index === activeLevel.value) return
  activeLevel.value = index
  draft.value = draft.value.slice(0, index)
  keyword.value = ''
}
function pick(option) {
  const next = draft.value.slice(0, activeLevel.value)
  next.push(option.value)
  draft.value = next
  keyword.value = ''
  if (option.children?.length && activeLevel.value < props.levelPlaceholders.length - 1) {
    activeLevel.value += 1
    return
  }
  emit('update:modelValue', [...next])
  emit('change', [...next])
  show.value = false
  emit('close')
}
</script>

<style scoped>
.cascader { display: block; width: 100%; }
.cascader__trigger { width: 100%; height: 44px; padding: 0 12px; box-sizing: border-box; display: flex; align-items: center; justify-content: space-between; gap: 8px; border: 1px solid #E5E6EB; border-radius: 4px; background: #FFFFFF; color: #1D2129; font: 400 14px/20px "PingFang SC", sans-serif; text-align: left; cursor: pointer; }
.cascader__label { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.cascader__arrow { flex: 0 0 auto; color: #86909C; }

.cascader-sheet { background: #FFFFFF; border-radius: 20px 20px 0 0; overflow: hidden; }
.cascader-sheet__handle { display: block; width: 40px; height: 4px; margin: 8px auto 16px; border-radius: 100px; background: #C9CDD4; }
/* 搜索框：Figma「整合页面 > 泰国 > 搜索园区精确到门」1822:38312 > content 343×32（r17、padding 12/12/6/6） */
.cascader-sheet__search { display: flex; align-items: center; gap: 8px; height: 32px; margin: 0 16px 12px; padding: 0 12px; box-sizing: border-box; border-radius: 17px; background: #F7F8FA; }
.cascader-sheet__search input { flex: 1 1 auto; min-width: 0; border: 0; outline: 0; background: transparent; color: #1D2129; font: 400 14px/20px "PingFang SC", sans-serif; }
.cascader-sheet__search input::placeholder { color: #86909C; }
/* 2026-11-10 用户裁决：层级 tab 高 44、无分割线（设计稿 1822:38307 / list 1822:38315 无 stroke） */
.cascader-sheet__tabs { display: flex; align-items: center; gap: 16px; height: 44px; padding: 0 16px; box-sizing: border-box; }
/* 已选层级为浅灰，当前层级为深色文字 + 主色下划线 */
.cascader-sheet__tab { align-self: stretch; display: inline-flex; align-items: center; padding: 0; border: 0; border-bottom: 2px solid transparent; background: transparent; color: #86909C; font: 500 14px/20px "PingFang SC", sans-serif; white-space: nowrap; cursor: pointer; }
.cascader-sheet__tab--active { color: #1D2129; border-bottom-color: #00AAA6; }
.cascader-sheet__list { max-height: 320px; overflow-y: auto; padding: 0 16px 16px; }
.cascader-sheet__option { width: 100%; min-height: 52px; padding: 0; display: flex; align-items: center; justify-content: space-between; border: 0; background: transparent; color: #1D2129; font: 400 16px/24px "PingFang SC", sans-serif; text-align: left; cursor: pointer; }
.cascader-sheet__option--selected { color: #00AAA6; }
.cascader-sheet__empty { margin: 24px 0; color: #86909C; text-align: center; font: 400 14px/22px "PingFang SC", sans-serif; }
</style>
