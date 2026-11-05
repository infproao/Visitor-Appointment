<template>
  <main class="page-shell"><header class="page-header"><h1>{{ title }}</h1><HisenseButton variant="tertiary" :block="false" size="small" @click="showFilter = true">{{ filterText }}</HisenseButton></header><van-search v-model="keyword" :placeholder="searchPlaceholder" /><section class="registration-list"><HisenseRegistrationCard v-for="record in filteredRecords" :key="record.id" :record="record" :fields="fields"><template #actions><HisenseButton size="small" :block="false" @click="emit('select', record)">{{ detailText }}</HisenseButton></template></HisenseRegistrationCard><van-empty v-if="!filteredRecords.length" :description="emptyText" /></section><FilterPopup v-model:show="showFilter" :groups="filterGroups" @apply="emit('filter', $event)" /></main>
</template>

<script setup>
import { computed, ref } from 'vue'
import HisenseButton from '../components/HisenseButton.vue'
import HisenseRegistrationCard from '../components/HisenseRegistrationCard.vue'
import FilterPopup from './FilterPopup.vue'
const props = defineProps({ title: { type: String, default: '出入登记' }, records: { type: Array, default: () => [] }, fields: { type: Array, default: () => [] }, filterGroups: { type: Array, default: () => [] }, searchPlaceholder: { type: String, default: '搜索访客姓名或编号' }, filterText: { type: String, default: '筛选' }, detailText: { type: String, default: '查看详情' }, emptyText: { type: String, default: '暂无登记记录' } })
const emit = defineEmits(['select', 'filter'])
const keyword = ref(''); const showFilter = ref(false)
const filteredRecords = computed(() => { const value = keyword.value.trim().toLowerCase(); return value ? props.records.filter(record => JSON.stringify(record).toLowerCase().includes(value)) : props.records })
</script>

<style scoped>
.page-shell { min-height: 100vh; padding: 16px; display: grid; align-content: start; gap: 12px; box-sizing: border-box; background: var(--van-background); color: var(--van-text-color); }
.page-header { min-height: 48px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
h1 { margin: 0; font-size: 20px; line-height: 28px; }
.registration-list { display: grid; gap: 12px; }
</style>
