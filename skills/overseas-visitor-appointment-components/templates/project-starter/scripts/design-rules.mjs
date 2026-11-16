/**
 * 设计尺度的唯一口径（2026-11-15）
 *
 * 背景：工程里原本有两处判断设计值的地方——scripts/check-tokens.mjs（门禁，判断字号/padding/小数间距）
 * 和 scripts/spec-audit.mjs（报表，判断圆角/间距/高度）。两边各自写了一份刻度，字号口径不一致
 * （一条放行 11/15/28/32，另一条拦截），同一份代码能得出两种结论。
 * 所以把常量收进本文件，两个脚本都从这里引入：口径只有一个，谁改都改这一处。
 *
 * 依据：references/design-tokens.md（design-spec-from-figma.md 第九节 / 9.7 裁决）
 *   · 字号集合 12/13/14/16/18/20/24（9.7 裁决删掉 10 / 17 / 72）
 *   · padding 不用 13 / 23
 *   · 间距不含小数
 */
export const VALID_FONT_SIZES = new Set([12, 13, 14, 16, 18, 20, 24])
export const BANNED_PADDING_PX = new Set([13, 23])
export const ALLOWED_SPACING_DECIMALS = false

/** 圆角刻度：0/4/8/12/16/20/50（12 是卡片主口径，4 是 tag 口径，20 是底部弹层）
 *  另外 999 / 9999 / 100 / 50% 属「胶囊 / 全圆」语义值，按等价处理，不参与刻度校验 */
export const RADIUS_SCALE = [0, 2, 4, 6, 8, 10, 12, 16, 20, 24]
export const RADIUS_CAPSULE = new Set(['999px', '9999px', '100px', '50%', '100%'])

/** 间距刻度（gap / margin 的常用档位） */
export const SPACING_SCALE = [0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 32]

/** 元素高度刻度（组件里出现频次高的整数高度） */
export const HEIGHT_SCALE = [16, 20, 22, 24, 28, 32, 36, 40, 44, 48, 56, 60, 64, 72, 80]
