<template>
  <!-- 样例需求生成页：访客须知确认（决策树分支 C）
       只做「375 布局 + 组件编排 + 数据」，全部控件来自 component-registry.md 2.0 表：
       Field / Checkbox / Button / Popup / Dialog；不复制组件内部 CSS，不自绘控件。 -->
  <main class="figma-phone regulations-page">
    <header class="regulations-page__header">
      <button type="button" class="regulations-page__back" @click="goBack">‹</button>
      <h1>{{ t('regulation.title') }}</h1>
    </header>

    <section class="regulations-card">
      <h2>{{ t('regulation.subtitle') }}</h2>
      <p class="regulations-card__intro">{{ t('regulation.intro') }}</p>

      <Field
        v-model="phone"
        :label="t('regulation.phone')"
        :placeholder="t('regulation.phonePlaceholder')"
      />

      <div class="agreements">
        <Checkbox v-model="agreements.notice">
          {{ t('regulation.noticeBefore') }}<a class="agreement-link" href="javascript:void(0)" @click.stop.prevent="openDoc('notice')">{{ t('regulation.noticeLink') }}</a>
        </Checkbox>
        <Checkbox v-model="agreements.privacy">
          {{ t('regulation.privacyBefore') }}<a class="agreement-link" href="javascript:void(0)" @click.stop.prevent="openDoc('privacy')">{{ t('regulation.privacyLink') }}</a>
        </Checkbox>
      </div>

      <Button :label="t('regulation.submit')" @click="nextStep" />

      <p v-if="confirmed" class="regulations-card__done" data-testid="confirmed">{{ t('regulation.done') }}</p>
    </section>

    <Popup v-model:show="doc.show" :title="doc.title">
      <div class="doc-sheet">
        <p v-for="(line, i) in doc.lines" :key="i">{{ line }}</p>
      </div>
    </Popup>

    <Dialog
      v-model:show="dialog.show"
      :title="t('regulation.dialogTitle')"
      :message="dialog.message"
      :confirm-text="t('common.save')"
      :cancel-text="t('common.cancel')"
      @confirm="dialog.show = false"
      @cancel="dialog.show = false"
    />
  </main>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import Field from '../components/figma/Field.vue'
import Checkbox from '../components/figma/Checkbox.vue'
import Button from '../components/figma/Button.vue'
import Popup from '../components/figma/Popup.vue'
import Dialog from '../components/figma/Dialog.vue'

const { t } = useI18n()
const router = useRouter()
const phone = ref('')
const confirmed = ref(false)
const agreements = reactive({ notice: false, privacy: false })
const dialog = reactive({ show: false, message: '' })
const doc = reactive({ show: false, title: '', lines: [] })

function goBack() { router.back() }

function openDoc(kind) {
  doc.title = kind === 'notice' ? t('regulation.noticeLink') : t('regulation.privacyLink')
  doc.lines = kind === 'notice'
    ? [t('regulation.noticeBody1'), t('regulation.noticeBody2')]
    : [t('regulation.privacyBody1'), t('regulation.privacyBody2')]
  doc.show = true
}

function nextStep() {
  const missing = []
  if (!agreements.notice) missing.push(t('regulation.noticeLink'))
  if (!agreements.privacy) missing.push(t('regulation.privacyLink'))
  if (missing.length) {
    dialog.message = t('regulation.dialogMessage') + missing.join('、')
    dialog.show = true
    confirmed.value = false
    return
  }
  dialog.show = false
  confirmed.value = true
}
</script>

<style scoped>
.regulations-page { position: relative; width: 375px; min-height: 812px; margin: 0 auto; padding: 0 16px 32px; box-sizing: border-box; overflow-x: clip; color: #1D2129; background: #F2F3F5 url('../assets/bg-image-2.svg') center top / 375px 486px no-repeat; }
.regulations-page__header { height: 68px; display: flex; align-items: center; gap: 8px; }
.regulations-page__back { width: 32px; height: 32px; border: 0; background: transparent; color: #1D2129; font-size: 24px; cursor: pointer; }
.regulations-page__header h1 { margin: 0; font: 600 24px/32px "PingFang SC", sans-serif; }
.regulations-card { margin-top: 16px; padding: 24px 16px; border-radius: 12px; background: #FFFFFF; display: grid; gap: 16px; }
.regulations-card h2 { margin: 0; font: 600 18px/24px "PingFang SC", sans-serif; }
.regulations-card__intro { margin: 0; color: #4E5969; font: 400 14px/22px "PingFang SC", sans-serif; }
.agreements { display: grid; gap: 12px; }
.agreements .agreement-link { color: #00AAA6; text-decoration: none; cursor: pointer; }
.doc-sheet { padding: 16px; border-radius: 12px; background: #FFFFFF; display: grid; gap: 12px; }
.doc-sheet p { margin: 0; color: #4E5969; font: 400 14px/22px "PingFang SC", sans-serif; }
.regulations-card__done { margin: 0; color: #00AAA6; font: 500 16px/24px "PingFang SC", sans-serif; text-align: center; }
@media (max-width: 375px) { .regulations-page { width: 100%; } }
</style>
