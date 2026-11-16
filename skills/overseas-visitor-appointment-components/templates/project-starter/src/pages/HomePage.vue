<template>
  <main class="home-view">
    <header class="home-header">
      <h1>{{ t('app.title') }}</h1>
      <LocaleSwitcher light />
    </header>

    <section class="home-card">
      <strong class="home-card__hello">👋 {{ t('home.welcome') }}</strong>
      <div class="home-card__split">
        <div class="home-cell">
          <span>{{ t('home.today') }}</span>
          <b>{{ t('home.todayValue') }}</b>
        </div>
        <button class="home-cell home-cell--link" type="button" @click="router.push('/pass')">
          <span>{{ t('home.viewPass') }}</span>
          <IconBox name="scan-qr-code" :size="60" color="#1D2129" class="home-cell__qr" />
        </button>
      </div>
      <Button size="large" @click="openNew"><span class="home-card__cta"><IconBox name="plus" :size="18" color="#FFFFFF" />{{ t('home.newAppointment') }}</span></Button>
      <Button :label="t('home.records')" variant="secondary" size="large" @click="openDetail" />
    </section>

    <div class="regulations" role="button" tabindex="0" @click="showRegulations = true" @keydown.enter="showRegulations = true">
      <div class="regulations__text"><em>Visitor<br />Regulations</em><strong>{{ t('home.regulations') }}</strong></div>
    </div>

    <!-- 2026-11-10：横幅复用组件库 Popup 承载点击交互（页面由组件搭建时保留组件已有交互） -->
    <Popup v-model:show="showRegulations" :title="t('home.regulations')">
      <div class="regulations-sheet">
        <ol>
          <li v-for="(item, index) in regulations" :key="index">{{ item }}</li>
        </ol>
      </div>
    </Popup>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import Button from '../components/figma/Button.vue'
import IconBox from '../components/figma/IconBox.vue'
import Popup from '../components/figma/Popup.vue'
import LocaleSwitcher from './LocaleSwitcher.vue'

const { t } = useI18n()
const showRegulations = ref(false)
const regulations = [
  '来访须提前完成预约，并携带与预约信息一致的有效证件。',
  '请在门岗出示通行凭证，配合安保人员完成身份核验与出入登记。',
  '园区内禁止吸烟，未经许可不得拍照、录像或进入生产区域。',
  '请按指定路线通行，随身物品须接受安全检查。',
  '离园时请在门岗完成出园登记，凭证仅限预约当日有效。'
]
const props = defineProps({ embedded: Boolean })
const emit = defineEmits(['navigate'])
const router = useRouter()
function openNew() { props.embedded ? emit('navigate', 'appointment-form') : router.push('/appointment/new') }
function openDetail() { props.embedded ? emit('navigate', 'appointment-detail') : router.push('/appointment/detail') }
</script>

<style scoped>
/* 视觉依据：整合页面 > 首页 1747:24881（navbar-mp 88 不实现，以下坐标已减去 88）
   box 88..140 → 0..52（paddingTop 20，header 文字 24/32 落在 20..52）
   main 140 → 52（paddingTop 16），slider/card 顶 = 156 → 68
   故标题文字底 52 → 白卡顶 68，间距 16px（此前 -32px 负 margin 让卡片贴住标题）。 */
.home-view { width: 375px; min-height: 812px; margin: 0 auto; overflow: hidden; color: #1D2129; background: #F2F3F5 url('../assets/bg-image-2.svg') center top / 375px 486px no-repeat; }
.home-header { height: 52px; padding: 20px 16px 0; box-sizing: border-box; display: flex; align-items: flex-start; justify-content: space-between; background: transparent; }
.home-header h1 { margin: 0; color: #1D2129; font: 600 24px/32px "PingFang SC", sans-serif; }
.home-card { position: relative; z-index: 1; margin: 16px 16px 0; padding: 20px 16px; box-sizing: border-box; border-radius: 16px; background: #FFFFFF; display: grid; gap: 16px; box-shadow: 0 4px 16px rgba(29,33,41,.08); }
.home-card__hello { font: 600 18px/26px "PingFang SC", sans-serif; }
.home-card__split { display: grid; grid-template-columns: 1fr 1fr; }
.home-cell { border: 0; padding: 0; background: transparent; text-align: center; }
.home-cell + .home-cell { border-left: 1px solid #E5E6EB; }
.home-cell span { display: block; color: #4E5969; font: 400 12px/18px "PingFang SC", sans-serif; }
.home-cell b { display: block; margin-top: 8px; color: #1D2129; font: 600 24px/32px "PingFang SC", sans-serif; }
.home-cell em, .home-cell__qr { display: block; margin: 8px auto 0; color: #1D2129; }
.home-cell--link { cursor: pointer; }
.home-card__cta { display: inline-flex; align-items: center; justify-content: center; gap: 4px; }
/* 访客须知横幅：用户 2026-11-10 提供完整背景图 regulations-banner.png（686×320 = 343×160 @2x）。
   背景图自带深青渐变、右侧气泡与吉祥物，直接铺满整块横幅，不再单独裁切插画 / CSS 造背景。 */
.regulations { position: relative; min-height: 160px; margin: 16px 16px 24px; padding: 20px 16px; box-sizing: border-box; overflow: hidden; border-radius: 12px; background: #00757B url('../assets/regulations-banner.png') center center / 100% 100% no-repeat; display: flex; align-items: center; cursor: pointer; }
.regulations__text { position: relative; z-index: 1; }
.regulations__text em { display: block; color: rgba(255,255,255,.42); font: 600 24px/28px "PingFang SC", sans-serif; font-style: normal; }
.regulations__text strong { display: block; margin-top: 8px; color: #FFFFFF; font: 600 20px/26px "PingFang SC", sans-serif; }
/* 点击横幅后由组件库 Popup 承载的须知正文 */
.regulations-sheet { padding: 16px; border-radius: 12px; background: #FFFFFF; }
.regulations-sheet ol { margin: 0; padding-left: 20px; display: grid; gap: 12px; color: #4E5969; font: 400 14px/22px "PingFang SC", sans-serif; }
.regulations-sheet li::marker { color: #00AAA6; }
@media (max-width: 375px) { .home-view { width: 100%; } }
</style>
