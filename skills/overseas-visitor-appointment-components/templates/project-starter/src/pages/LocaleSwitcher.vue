<template>
  <div class="locale-switcher">
    <button class="locale-button" :class="{ outlined, light }" type="button" @click="show = true">
      {{ outlined || light ? locale.toUpperCase() : currentLabel }}<IconBox v-if="outlined || light" name="down" :size="12" class="locale-arrow" />
    </button>
    <LanguagePopup v-if="mounted" v-model:show="show" :teleport="popupTarget" :languages="languages" :model-value="locale" :title="t('home.switchLanguage')" @select="selectLanguage" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import LanguagePopup from '../components/figma/LanguagePopup.vue'
import IconBox from '../components/figma/IconBox.vue'

defineProps({ outlined: Boolean, light: Boolean })
const { locale, t } = useI18n()
const show = ref(false)
const languageKeys = ['zh', 'en', 'th']
const popupTarget = ref('body')
const mounted = ref(false)
onMounted(() => {
  popupTarget.value = document.querySelector('.figma-phone') || 'body'
  mounted.value = true
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
/* 渐变青 header 上的深色态：深色描边深字，与设计稿一致（越南版首页 / 泰国同行人均为黑字） */
.locale-button.light { position: static; min-width: 52px; height: 32px; padding: 0 8px; display: inline-flex; align-items: center; justify-content: center; gap: 4px; border: 1px solid #4E5969; border-radius: 4px; color: #1D2129; background: transparent; font: 400 14px/20px "PingFang SC", sans-serif; }
.locale-arrow { width: 12px; height: 12px; display: block; }
</style>
