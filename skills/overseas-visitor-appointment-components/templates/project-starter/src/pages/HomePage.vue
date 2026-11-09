<template>
  <PageFrame :title="t('app.title')">
    <section class="hero-card">
      <p class="eyebrow">HISENSE</p>
      <h2>{{ t('app.subtitle') }}</h2>
      <p>{{ t('home.recent') }}</p>
    </section>
    <div class="home-actions">
      <button class="action-card action-card--primary" type="button" @click="router.push('/appointment/new')">
        <strong>{{ t('home.newAppointment') }}</strong><span>＋</span>
      </button>
      <button class="action-card" type="button" @click="router.push('/appointment/detail')">
        <strong>{{ t('home.records') }}</strong><span>›</span>
      </button>
    </div>
    <section class="empty-card">
      <div class="empty-card__icon">□</div>
      <p>{{ t('home.empty') }}</p>
    </section>
  </PageFrame>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import PageFrame from './PageFrame.vue'

const { t } = useI18n()
const router = useRouter()
</script>

<style scoped>
.hero-card { padding: 24px 20px; border-radius: 12px; color: #FFFFFF; background: linear-gradient(135deg, #00AAA6, #22BBB3); }
.eyebrow { margin: 0 0 12px; font: 600 12px/16px "PingFang SC", sans-serif; letter-spacing: .08em; }
.hero-card h2 { margin: 0; font: 600 24px/32px "PingFang SC", sans-serif; }
.hero-card p:last-child { margin: 20px 0 0; color: rgba(255,255,255,.82); font: 400 14px/22px "PingFang SC", sans-serif; }
.home-actions { display: grid; gap: 12px; margin-top: 16px; }
.action-card { min-height: 64px; padding: 16px; display: flex; align-items: center; justify-content: space-between; border: 0; border-radius: 12px; color: #1D2129; background: #FFFFFF; text-align: left; font: 500 16px/24px "PingFang SC", sans-serif; }
.action-card span { color: #00AAA6; font-size: 24px; }
.action-card--primary { color: #FFFFFF; background: #22BBB3; }
.action-card--primary span { color: #FFFFFF; }
.empty-card { margin-top: 16px; padding: 32px 16px; border-radius: 12px; color: #86909C; background: #FFFFFF; text-align: center; font: 400 14px/22px "PingFang SC", sans-serif; }
.empty-card__icon { color: #C9CDD4; font-size: 32px; line-height: 40px; }
.empty-card p { margin: 8px 0 0; }
</style>
