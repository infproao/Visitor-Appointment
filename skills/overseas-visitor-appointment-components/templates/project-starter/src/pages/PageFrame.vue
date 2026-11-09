<template>
  <main class="page-frame" :class="`page-frame--${variant}`">
    <header class="page-header">
      <button v-if="back" class="page-header__back" type="button" :aria-label="t('common.back')" @click="router.back()">‹</button>
      <h1>{{ title }}</h1>
      <LocaleSwitcher :outlined="variant === 'detail' || variant === 'form'" />
    </header>
    <section class="page-content"><slot /></section>
  </main>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import LocaleSwitcher from './LocaleSwitcher.vue'

defineProps({ title: { type: String, required: true }, back: Boolean, variant: { type: String, default: 'default' } })
const { t } = useI18n()
const router = useRouter()
</script>

<style scoped>
.page-frame { width: 375px; min-height: 812px; margin: 0 auto; overflow: hidden; color: #1D2129; background: #F2F3F5; }
.page-header { position: relative; min-height: 64px; padding: 20px 16px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; background: #FFFFFF; }
.page-header h1 { margin: 0; color: #1D2129; font: 600 18px/24px "PingFang SC", sans-serif; }
.page-header__back { position: absolute; left: 16px; width: 24px; height: 24px; padding: 0; border: 0; color: #1D2129; background: transparent; font: 400 28px/20px "PingFang SC", sans-serif; }
.page-frame--detail { background-color: #F2F3F5; background-image: url('../assets/bg-image-2.svg'); background-position: center top; background-size: 375px 486px; background-repeat: no-repeat; }
.page-frame--form { background-color: #F2F3F5; background-image: url('../assets/bg-image-2.svg'); background-position: center top; background-size: 375px 486px; background-repeat: no-repeat; }
.page-frame--form .page-header { position: relative; z-index: 2; background: transparent; }
.page-frame--form .page-content { padding: 0 16px 16px; }
.page-frame--detail .page-header { position: relative; z-index: 2; justify-content: flex-start; background: transparent; }
.page-frame--detail .page-header h1 { font-size: 24px; line-height: 32px; }
.page-frame--detail .page-content { padding: 0 16px 16px; }
@media (max-width: 375px) { .page-frame { width: 100%; } }
</style>
