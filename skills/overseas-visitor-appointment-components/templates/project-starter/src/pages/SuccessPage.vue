<template>
  <!-- 1:1 对照 Figma「整合页面 > 泰国 > 提交成功」1822:39622（375×812）
       card 343×416 / 白底 r12 / padding 24,40 / gap16；check 80×80；标题 20/28 w600；
       Frame 33 295×212 #F7F8FA r8 / padding12 / gap8；无二维码、无返回按钮。
       顶部背景 = 设计稿 bg-image-2.svg（375×486），原型不含 navbar 88，故 card 顶 = 133-88 = 45px -->
  <main class="success-page">
    <section class="success-card">
      <span class="success-icon" aria-hidden="true">
        <svg viewBox="0 0 80 80" width="80" height="80"><circle cx="40" cy="40" r="40" fill="#23C343" /><path d="M23 41L34 52L57 28" fill="none" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" /></svg>
      </span>
      <h2>{{ t('success.title') }}</h2>
      <div class="summary">
        <p>{{ t('success.number') }}：VS20250728001</p>
        <p>{{ t('success.date') }}：2026-7-11</p>
        <p>{{ t('success.park') }}：瑞嘉工业园区</p>
        <p>{{ t('success.address') }}：456 Nhon Trach, Dong Nai, Vietnam</p>
        <span class="summary__rule" aria-hidden="true"></span>
        <button class="summary__regulations" type="button" @click="viewRegulations">
          <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true"><circle cx="7" cy="7" r="6" fill="none" stroke="#00AAA6" stroke-width="1.2" /><path d="M7 6.2v4M7 3.9v.1" stroke="#00AAA6" stroke-width="1.4" stroke-linecap="round" /></svg>
          {{ t('home.regulations') }}
        </button>
      </div>
    </section>

    <!-- 2026-11-10：访客须知不再空实现，复用组件库 Popup 承载点击交互 -->
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
import Popup from '../components/figma/Popup.vue'

const { t } = useI18n()
const showRegulations = ref(false)
const regulations = [
  '来访须提前完成预约，并携带与预约信息一致的有效证件。',
  '请在门岗出示通行凭证，配合安保人员完成身份核验与出入登记。',
  '园区内禁止吸烟，未经许可不得拍照、录像或进入生产区域。',
  '请按指定路线通行，随身物品须接受安全检查。',
  '离园时请在门岗完成出园登记，凭证仅限预约当日有效。'
]
function viewRegulations() { showRegulations.value = true }
</script>

<style scoped>
.success-page { width: 375px; min-height: 812px; margin: 0 auto; padding: 45px 16px 32px; box-sizing: border-box; color: #1D2129; background: #F2F3F5 url('../assets/bg-image-2.svg') center top / 375px 486px no-repeat; }
.success-card { padding: 40px 24px 24px; border-radius: 12px; background: #FFFFFF; display: flex; flex-direction: column; gap: 16px; }
.success-icon { display: block; width: 80px; height: 80px; margin: 0 auto; }
.success-icon svg { display: block; }
.success-card h2 { margin: 0; color: #1D2129; text-align: center; font: 600 20px/28px "PingFang SC", sans-serif; }
.summary { padding: 12px; border-radius: 8px; background: #F7F8FA; display: grid; gap: 8px; }
.summary p { margin: 0; color: #4E5969; font: 400 16px/24px "PingFang SC", sans-serif; }
.summary__rule { height: 1px; background: #E5E6EB; }
.summary__regulations { justify-self: center; display: inline-flex; align-items: center; gap: 8px; height: 32px; padding: 0 16px; border: 0; border-radius: 4px; color: #00AAA6; background: transparent; font: 400 14px/22px "PingFang SC", sans-serif; cursor: pointer; }
.summary__regulations svg { display: block; }
.regulations-sheet { padding: 16px; border-radius: 12px; background: #FFFFFF; }
.regulations-sheet ol { margin: 0; padding-left: 20px; display: grid; gap: 12px; color: #4E5969; font: 400 14px/22px "PingFang SC", sans-serif; }
.regulations-sheet li::marker { color: #00AAA6; }
@media (max-width: 375px) { .success-page { width: 100%; } }
</style>
