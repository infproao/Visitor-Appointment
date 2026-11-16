import { onMounted, ref } from 'vue'

/**
 * Vant Popup 默认 teleport 到 body，而 theme.css 的「375 手机画布内弹层」规则是
 * `.figma-phone .figma-popup-375.van-popup { position:absolute; left:0; width:100% }`
 * 的后代选择器。teleport 到 body 后该规则不生效，弹层退回「相对整个桌面视口居中 375px」，
 * 在组件库里表现为弹窗右移、看着像点击没触发。
 *
 * 统一处理：组件挂载时若存在 375 手机画布，就把弹层与遮罩一起挂进画布内；
 * 独立业务页面没有画布时仍挂 body，按视口居中（375 页面本身也是居中）。
 * 返回 ref，供 `<van-popup :teleport="target">` 使用。
 */
export function usePopupTeleport() {
  const target = ref('body')
  onMounted(() => {
    const phone = document.querySelector('.figma-phone')
    if (phone) target.value = phone
  })
  return target
}
