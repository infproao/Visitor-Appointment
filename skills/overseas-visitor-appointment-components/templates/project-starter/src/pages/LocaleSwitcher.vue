<template>
  <div class="locale-switcher">
    <button class="locale-button" :class="{ outlined }" type="button" @click="show = true">
      {{ outlined ? locale.toUpperCase() : currentLabel }}<svg v-if="outlined" class="locale-arrow" viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5L6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
    </button>
    <LanguagePopup v-model:show="show" :teleport="popupTarget" :languages="languages" :model-value="locale" :title="t('home.switchLanguage')" @select="selectLanguage" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import LanguagePopup from '../components/figma/LanguagePopup.vue'

defineProps({ outlined: Boolean })
const { locale, t } = useI18n()
const show = ref(false)
const languageKeys = ['zh', 'en', 'th']
const popupTarget = ref('body')
onMounted(() => {
  if (document.querySelector('.figma-phone')) popupTarget.value = '.figma-phone'
})
const languages = computed(() => languageKeys.map(code => ({ code, label: t(`language.${code}`) })))
const languageLabelMap = { zh: '中文', en: '英语', th: '泰语' }
const currentLabel = computed(() => {
  const key = `language.${locale.value}`
  const translated = t(key)
  return translated === key ? languageLabelMap[locale.value] : translated
})
function selectLanguage(language) { locale.value = language.code }
</script>

<style scoped>
.locale-button { position: absolute; right: 16px; min-width: 40px; height: 28px; padding: 0 6px; border: 0; color: #00AAA6; background: transparent; font: 400 12px/20px "PingFang SC", sans-serif; }
.locale-button.outlined { position: absolute; top: 14px; right: 16px; z-index: 3; min-width: 64px; height: 36px; padding: 0 10px; display: inline-flex; align-items: center; justify-content: center; gap: 6px; border: 1px solid #1D2129; border-radius: 4px; color: #1D2129; font: 400 16px/24px "PingFang SC", sans-serif; }
.locale-arrow { width: 12px; height: 12px; display: block; }
</style>
