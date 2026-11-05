<template>
  <main class="page-shell visitor-home">
    <header class="page-header"><div><p class="eyebrow">{{ eyebrow }}</p><h1>{{ title }}</h1></div><button class="language-trigger" type="button" @click="showLanguage = true">{{ currentLanguage.code }} <van-icon name="arrow-down" /></button></header>
    <section class="welcome-card"><h2>{{ welcomeTitle }}</h2><p>{{ welcomeDescription }}</p></section>
    <section v-if="showPassPreview" class="pass-preview"><HisenseQRCode :caption="passCaption" /></section>
    <div class="page-actions"><HisenseButton @click="emit('create')">{{ createText }}</HisenseButton><HisenseButton variant="secondary" @click="emit('records')">{{ recordsText }}</HisenseButton></div>
    <slot />
    <HisenseLanguagePopup v-model:show="showLanguage" :languages="languages" :model-value="currentLanguage.code" @select="emit('language-change', $event)" />
  </main>
</template>

<script setup>
import { ref } from 'vue'
import HisenseButton from '../components/HisenseButton.vue'
import HisenseLanguagePopup from '../components/HisenseLanguagePopup.vue'
import HisenseQRCode from '../components/HisenseQRCode.vue'

defineProps({
  title: { type: String, default: '访客预约' }, eyebrow: { type: String, default: 'Hisense Visitor' }, welcomeTitle: { type: String, default: '欢迎使用访客预约' }, welcomeDescription: { type: String, default: '页面字段、语言和业务规则由需求注入。' }, createText: { type: String, default: '新建预约' }, recordsText: { type: String, default: '查看预约记录' }, passCaption: { type: String, default: '通行证二维码占位' }, showPassPreview: { type: Boolean, default: false }, currentLanguage: { type: Object, default: () => ({ code: 'CN', label: '中文' }) }, languages: { type: Array, default: () => [] }
})
const emit = defineEmits(['create', 'records', 'language-change'])
const showLanguage = ref(false)
</script>

<style scoped>
.page-shell { min-height: 100vh; padding: 16px; box-sizing: border-box; color: var(--van-text-color); background: var(--van-background); }
.page-header { min-height: 56px; display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
.eyebrow { margin: 0 0 4px; color: var(--van-text-color-3); font-size: 12px; line-height: 16px; }
h1 { margin: 0; font-size: 24px; line-height: 32px; }
.language-trigger { min-height: 44px; padding: 0 8px; border: 0; color: var(--van-primary-color-dark); background: transparent; font-size: 14px; }
.welcome-card, .pass-preview { margin-top: 16px; padding: 20px 16px; border-radius: 16px; background: var(--van-background-2); }
.welcome-card h2 { margin: 0; font-size: 20px; line-height: 28px; }
.welcome-card p { margin: 8px 0 0; color: var(--van-text-color-2); font-size: 14px; line-height: 20px; }
.page-actions { margin-top: 24px; display: grid; gap: 12px; }
</style>
