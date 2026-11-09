<template>
  <PageFrame :title="t('app.title')">
    <section class="success-card">
      <div class="success-icon">✓</div>
      <h2>{{ t('success.title') }}</h2>
      <p class="success-message">{{ t('success.message') }}</p>
      <dl class="summary">
        <div><dt>{{ t('success.number') }}</dt><dd>VS20250728001</dd></div>
        <div><dt>{{ t('success.date') }}</dt><dd>2026-07-11</dd></div>
        <div><dt>{{ t('success.park') }}</dt><dd>瑞嘉工业园区</dd></div>
        <div><dt>{{ t('success.address') }}</dt><dd>456 Nhon Trach, Dong Nai, Vietnam</dd></div>
      </dl>
      <Button :label="t('success.home')" @click="router.push('/')" />
      <Button class="secondary-button" variant="secondary" :label="t('success.details')" @click="viewDetails" />
    </section>
  </PageFrame>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import Button from '../components/figma/Button.vue'
import PageFrame from './PageFrame.vue'

const props = defineProps({ embedded: Boolean })
const emit = defineEmits(['view-details'])
const { t } = useI18n()
const router = useRouter()
function viewDetails() { props.embedded ? emit('view-details') : router.push('/appointment/detail') }
</script>

<style scoped>
.success-card { margin-top: 16px; padding: 40px 16px 32px; border-radius: 12px; background: #FFFFFF; text-align: center; }
.success-icon { width: 64px; height: 64px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; border-radius: 999px; color: #FFFFFF; background: #23C343; font: 600 40px/1 "PingFang SC", sans-serif; }
.success-card h2 { margin: 0; color: #1D2129; font: 600 24px/32px "PingFang SC", sans-serif; }
.success-message { margin: 16px 0 20px; color: #4E5969; font: 400 16px/24px "PingFang SC", sans-serif; }
.summary { margin: 0 0 20px; padding: 12px 16px; border-radius: 12px; color: #4E5969; background: #F7F8FA; text-align: left; font: 400 14px/22px "PingFang SC", sans-serif; }
.summary div { display: flex; gap: 8px; margin: 4px 0; }
.summary dt { flex: 0 0 auto; }
.summary dd { margin: 0; color: #4E5969; }
.secondary-button { margin-top: 12px; }
</style>
