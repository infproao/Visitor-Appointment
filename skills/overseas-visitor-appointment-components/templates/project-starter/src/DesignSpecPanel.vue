<template>
  <div class="spec">
    <!-- 顶部 -->
    <header class="hero">
      <div class="hero__left">
        <p class="hero__eyebrow">Design Specification · Figma 实测</p>
        <h1 class="hero__title">海外版访客预约<br />设计规范</h1>
        <div class="hero__tags">
          <span class="tag tag--solid">用户裁决 2026-11-05 / 修订 11-06</span>
          <span class="tag">渲染口径 · 可见 5123 节点</span>
          <span class="tag">隐藏节点不采集</span>
          <span class="tag">375 手机画布基准</span>
        </div>
      </div>
      <div class="hero__source">
        <p class="hero__source-label">数据来源</p>
        <p><code>JRpDmIIybR17xUVA8s9sK4</code></p>
        <p><code>1550:3803</code> ——模板—— · 5316 节点</p>
        <p><code>1824:42919</code> 泰国 · 7331 节点</p>
        <p><code>1723:27897</code> Color Guidance</p>
        <p><code>1722:27845</code> Elevation</p>
      </div>
    </header>

    <!-- 锚点导航 -->
    <nav class="anchors">
      <a v-for="a in anchors" :key="a.id" :href="`#${a.id}`">{{ a.label }}</a>
    </nav>

    <!-- 1 颜色 -->
    <section id="color" class="block">
      <div class="block__head">
        <div><span class="block__no">01</span><h2>颜色 Color</h2></div>
        <p>11 色 · 8 灰阶 · 7 渐变</p>
      </div>

      <div class="card">
        <h3 class="card__title">基本色 Basic <small>11 色</small></h3>
        <div class="swatches">
          <div v-for="c in basic" :key="c.name" class="swatch">
            <div class="swatch__chip" :style="{ background: c.hex }"></div>
            <p class="swatch__name">{{ c.name }}</p>
            <p class="swatch__hex">{{ c.hex }}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="card__title">中性灰 Neutral <small>Gray-1…8</small></h3>
        <div class="graybar">
          <div v-for="g in grays" :key="g.name" class="graybar__cell" :style="{ background: g.hex }">
            <span :class="{ 'is-dark': g.dark }">{{ g.name }}</span>
          </div>
        </div>
        <div class="graybar__legend">
          <span v-for="g in grays" :key="g.name"><code>{{ g.hex }}</code></span>
        </div>
      </div>

      <div class="two-col">
        <div class="card">
          <h3 class="card__title">文字 / 语义色</h3>
          <div class="semantic">
            <div v-for="s in semantic" :key="s.name" class="semantic__row">
              <span class="semantic__dot" :style="{ background: s.hex }"></span>
              <span class="semantic__name">{{ s.name }}</span>
              <code class="semantic__hex">{{ s.hex }}</code>
            </div>
          </div>
        </div>
        <div class="card">
          <h3 class="card__title">状态色 / 组件实测</h3>
          <div class="statuses">
            <span v-for="s in statuses" :key="s.label" class="status" :style="{ background: s.hex, color: s.text || '#1D2129' }">{{ s.label }}</span>
          </div>
          <h3 class="card__title card__title--sub">设计稿实际用色</h3>
          <div class="chips">
            <span v-for="u in usedColors" :key="u" class="chip">{{ u }}</span>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="card__title">渐变 Gradient</h3>
        <div class="gradients">
          <div v-for="g in gradients" :key="g.name" class="gradient">
            <div class="gradient__bar" :style="{ background: g.css }"></div>
            <p class="gradient__name">{{ g.name }}</p>
            <p class="gradient__stops">{{ g.stops }}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="card__title">描边色 Border <small>只取 Gray 系列</small></h3>
        <div class="strokes">
          <div v-for="s in strokeGrays" :key="s.hex" class="stroke">
            <div class="stroke__line" :style="{ borderColor: s.hex }"></div>
            <code>{{ s.hex }}</code>
            <span>{{ s.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 2 字体 -->
    <section id="type" class="block">
      <div class="block__head">
        <div><span class="block__no">02</span><h2>字体与行高 Typography</h2></div>
        <p>PingFang SC · 字重 400 / 500 / 600 · 组件内字距 0</p>
      </div>

      <div class="card">
        <h3 class="card__title">组件字号集合 <small>7 档</small></h3>
        <div class="types">
          <div v-for="f in fontSizes" :key="f" class="type">
            <span class="type__label">{{ f }}px</span>
            <span class="type__sample" :style="{ fontSize: f + 'px' }">访客预约 Visitor 2026</span>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="card__title">行高 = 字号 × 1.5</h3>
        <div class="types">
          <div v-for="r in lineRules" :key="r.size" class="type">
            <span class="type__label" style="flex: 0 0 92px">{{ r.size }} / {{ r.lh }}</span>
            <span class="type__sample" :style="{ fontSize: r.size + 'px', lineHeight: r.lh + 'px', background: '#F7F8FA', borderRadius: '4px', padding: '0 6px' }">访客预约 Visitor 2026</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 3 间距 -->
    <section id="spacing" class="block">
      <div class="block__head">
        <div><span class="block__no">03</span><h2>间距 Spacing</h2></div>
        <p>主梯度 · 允许值 · padding</p>
      </div>
      <div class="two-col">
        <div class="card">
          <h3 class="card__title">主梯度 itemSpacing</h3>
          <div class="spaces">
            <div v-for="s in spacings" :key="s.v" class="space">
              <span class="space__label">{{ s.v }}px</span>
              <div class="space__track"><div class="space__fill" :style="{ width: (s.n / 612 * 100) + '%' }"></div></div>
              <span class="space__count">{{ s.n }}</span>
            </div>
          </div>
        </div>
        <div class="card">
          <h3 class="card__title">允许值</h3>
          <div class="chips">
            <span v-for="v in spacingOthers" :key="v" class="chip">{{ v }}</span>
          </div>
          <h3 class="card__title card__title--sub">padding 主值</h3>
          <div class="chips">
            <span v-for="v in paddings" :key="v" class="chip">{{ v }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 4 圆角 -->
    <section id="radius" class="block">
      <div class="block__head">
        <div><span class="block__no">04</span><h2>圆角 Radius</h2></div>
        <p>3 组 · 全圆角 999</p>
      </div>
      <div class="card">
        <div v-for="g in radii" :key="g.group" class="radius-group">
          <h3 class="card__title">{{ g.group }} <small>{{ g.items.join(' / ') }} px</small></h3>
          <div class="radii">
            <div v-for="r in g.items" :key="r" class="radius">
              <div class="radius__box" :style="{ borderRadius: r + 'px' }"></div>
              <code>{{ r }}</code>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5 阴影 -->
    <section id="shadow" class="block">
      <div class="block__head">
        <div><span class="block__no">05</span><h2>阴影 Elevation</h2></div>
        <p>Elevation 0–4</p>
      </div>
      <div class="card">
        <div class="elevations">
          <div v-for="e in elevations" :key="e.name" class="elevation">
            <div class="elevation__box" :style="{ boxShadow: e.css }"></div>
            <p class="elevation__name">{{ e.name }}</p>
            <code class="elevation__css">{{ e.css }}</code>
          </div>
        </div>
      </div>
    </section>

    <!-- 6 控件 -->
    <section id="controls" class="block">
      <div class="block__head">
        <div><span class="block__no">06</span><h2>控件尺寸 Components</h2></div>
        <p>7 项实测尺寸</p>
      </div>
      <div class="card">
        <div class="controls">
          <div v-for="c in controls" :key="c.name" class="control">
            <div class="control__shape" :style="{ width: c.w + 'px', height: c.h + 'px' }"></div>
            <p class="control__name">{{ c.name }}</p>
            <code>{{ c.size }}</code>
            <span class="control__note">{{ c.note }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 7 范围与限制 -->
    <section id="scope" class="block">
      <div class="block__head">
        <div><span class="block__no">07</span><h2>范围与约定 Scope</h2></div>
        <p>已确认 / 待确认</p>
      </div>
      <div class="two-col">
        <div class="card">
          <h3 class="card__title">已确认</h3>
          <ul class="rules">
            <li><strong>页面范围</strong>限 375 手机画布；「泰国」24 个页面中 <code>主访客提交成功</code>(1024×974) 为 PC 适配，<strong>不在本次范围</strong>。</li>
            <li><strong>同名页面</strong>4 组（详情 ×2、同行人 ×2、入园操作 ×3、image-preview ×2）「<strong>都是有效版本，分了不同的国家</strong>」，全部纳入映射范围，不合并、不去重、不排优先级。</li>
            <li><strong>描边色</strong>只取 Gray 系列；色板外值与隐藏描边排除。</li>
            <li><strong>隐藏节点不采集</strong>「线框-暂无对应/envelop-o / 有赞私信」整支不渲染；统计口径统一为<strong>渲染口径</strong>，只取可见节点，属性口径仅作回溯。</li>
            <li><strong>规范基准</strong>以设计稿节点实际渲染属性为准；<code>design-tokens.md</code> 保留为历史记录，冲突处以第九节 / 9.7 为准。</li>
          </ul>
        </div>
        <div class="card">
          <h3 class="card__title">待确认 / 未执行</h3>
          <ul class="rules rules--muted">
            <li><code>src/theme.css</code> 与 Vant <code>--van-*</code> 变量、以及组件内样式<strong>尚未按 11-06 裁决同步</strong>，改代码前需确认。</li>
            <li><code>13 × 1.5 = 19.5px</code> 半像素如何处理；padding 小数 <code>86.8</code> 与其余奇数是否清除；<code>17 / 20</code> 圆角是否也归一为 999。</li>
            <li>可见页面中 <code>10px</code> 客服小字、<code>17px</code> navbar 标题删除后该用哪档字号；4 组同名版本各自对应哪个国家。</li>
            <li>23 个 375 页面与组件库的<strong>逐组件映射</strong>尚未盘点（用户已同意，先出计划不改代码）。</li>
            <li><code>#165DFF</code> 与 <code>#4080FF</code> 的语义分工；切渲染口径后 <code>#4080FF</code> 用色 0 次，是否仍算设计稿用色。</li>
            <li>所有组件状态仍为 <code>pending</code>，未完成 Figma 截图对照。</li>
          </ul>
          <div class="api403">
            <p class="api403__title">什么是「变量定义 API 403」？</p>
            <p>Figma 的 <code>/variables/local</code> 等接口返回 <strong>403 Forbidden</strong>，表示当前访问令牌<strong>没有读取变量定义的权限</strong>（需 <code>file_variables:read</code>）。节点上能看到「绑定了某个变量」（VariableID），但读不到这个变量叫什么名字、有哪些模式值。</p>
            <p>所以 <code>Gray-1…8</code>、<code>Primary</code>、<code>Elevation 0…4</code> 这些名字来自画板文字标注，<strong>不是 Figma 变量系统里的正式 token 名</strong>。只影响命名对齐 —— 颜色、字号、间距、圆角、阴影的数值都从节点属性直接读取，不受影响。补权限、换有权限账号，或提供变量面板截图即可核对。</p>
          </div>
        </div>
      </div>
      <div class="card">
        <h3 class="card__title">2026-11-06 本版修订</h3>
        <div class="chips">
          <span v-for="r in revisions" :key="r" class="chip chip--revision">{{ r }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
/**
 * 可视化设计规范面板（组件库预览页的一部分，非业务页面、非可复用 Figma 组件）
 * 数据来源：references/design-spec-from-figma.md 第九节「最终规范值」/ 9.7 / 11.6
 * Figma Node：1723:27897 Color Guidance / 1722:27845 Elevation / 1550:3803 / 1824:42919
 * 用户裁决 2026-11-05：以设计稿中的为准
 * 用户裁决 2026-11-06：隐藏不采集（渲染口径）、同名页面为不同国家的有效版本、
 *   字号删 10/17/72、行高 = 字号×1.5、间距无小数、padding 删 13/23、
 *   允许值删 5/3.14/11、全圆角统一 999
 */
const anchors = [
  { id: 'color', label: '颜色' }, { id: 'type', label: '字体与行高' },
  { id: 'spacing', label: '间距' }, { id: 'radius', label: '圆角' },
  { id: 'shadow', label: '阴影' }, { id: 'controls', label: '控件尺寸' },
  { id: 'scope', label: '范围与约定' }
]

const basic = [
  { name: 'Primary', hex: '#22BBB3' }, { name: 'Cyan', hex: '#14C9C9' },
  { name: 'Green', hex: '#00B42A' }, { name: 'Orange Light', hex: '#FFF7E8' },
  { name: 'Yellow', hex: '#F7BA1E' }, { name: 'Orange', hex: '#FF7D00' },
  { name: 'Orange Dark', hex: '#F77234' }, { name: 'Red', hex: '#F53F3F' },
  { name: 'Blue', hex: '#165DFF' }, { name: 'White', hex: '#FFFFFF' },
  { name: 'Black', hex: '#000000' }
]
const grays = [
  { name: 'Gray-1', hex: '#F7F8FA' }, { name: 'Gray-2', hex: '#F2F3F5' },
  { name: 'Gray-3', hex: '#E5E6EB' }, { name: 'Gray-4', hex: '#C9CDD4' },
  { name: 'Gray-5', hex: '#A9AEB8', dark: true }, { name: 'Gray-6', hex: '#86909C', dark: true },
  { name: 'Gray-7', hex: '#4E5969', dark: true }, { name: 'Gray-8', hex: '#1D2129', dark: true }
]
const semantic = [
  { name: 'Text Color', hex: '#1D2129' }, { name: 'Secondary', hex: '#86909C' },
  { name: 'Placeholder', hex: '#C9CDD4' }, { name: 'Link', hex: '#22BBB3' },
  { name: 'Danger', hex: '#F53F3F' }, { name: 'Success', hex: '#00B42A' },
  { name: 'Warning', hex: '#FF7D00' }, { name: 'Background 2', hex: '#FFFFFF' },
  { name: 'Border / Active / Background', hex: '#F2F3F5' }
]
const usedColors = ['#00AAA6', '#5F6368', '#262626', '#D7D9DA', '#101828', '#165DFF']
const statuses = [
  { label: '已通过', hex: '#23C343', text: '#FFFFFF' },
  { label: '需审核', hex: '#F9CC45' },
  { label: '未通过', hex: '#F76560', text: '#FFFFFF' },
  { label: '已过期 / 取消', hex: '#C9CDD4' },
  { label: '信息提示', hex: '#E8F3FF' },
  { label: '禁用主按钮', hex: '#79DDD1', text: '#FFFFFF' }
]
const gradients = [
  { name: 'Gradient Hisense', stops: '#36CFC9 → #00AAA6', css: 'linear-gradient(90deg,#36CFC9,#00AAA6)' },
  { name: 'Gradient Gold', stops: '#E9A986 → #F3D1AE', css: 'linear-gradient(90deg,#E9A986,#F3D1AE)' },
  { name: 'Gradient Red', stops: '#F77234 → #F53F3F', css: 'linear-gradient(90deg,#F77234,#F53F3F)' },
  { name: 'Gradient Orange', stops: '#FF7D00 → #F7BA1E', css: 'linear-gradient(90deg,#FF7D00,#F7BA1E)' },
  { name: 'Gradient Gray', stops: '#3A3A46 → #9192A5', css: 'linear-gradient(90deg,#3A3A46,#9192A5)' },
  { name: 'Gradient White', stops: '#FFFFFF/0.65 → #FFFFFF', css: 'linear-gradient(90deg,rgba(255,255,255,.65),#FFFFFF)' },
  { name: '车辆卡片', stops: '#E4EFFF → #FFFFFF', css: 'linear-gradient(90deg,#E4EFFF,#FFFFFF)' }
]
const strokeGrays = [
  { name: 'Gray-3', hex: '#E5E6EB' }, { name: 'Gray-4', hex: '#C9CDD4' },
  { name: 'Gray-2', hex: '#F2F3F5' }, { name: 'Gray-8', hex: '#1D2129' },
  { name: 'Gray-6', hex: '#86909C' }, { name: 'Gray-7', hex: '#4E5969' }
]

// 2026-11-06 用户裁决后的可落地值；频次均为两页渲染口径合计，见 design-spec-from-figma.md 11.6
const fontSizes = [12, 13, 14, 16, 18, 20, 24]
const lineRules = [
  { size: 12, lh: 18 }, { size: 13, lh: 19.5 }, { size: 14, lh: 21 },
  { size: 16, lh: 24 }, { size: 18, lh: 27 }, { size: 20, lh: 30 }, { size: 24, lh: 36 }
]
const spacings = [{ v: 8, n: 612 }, { v: 12, n: 328 }, { v: 4, n: 298 }, { v: 16, n: 145 }]
const spacingOthers = [2, 6, 10, 20, 24, 32, 36, 40, 46, 60, 70, 80]
const paddings = [16, 12, 10, 8, 4, 6, 14, 20, 24]
const radii = [
  { group: '小圆角', items: [2, 3, 4, 8, 10] },
  { group: '卡片 / 容器', items: [12, 16, 20, 24] },
  { group: '全圆角', items: [999] }
]
const revisions = [
  '隐藏节点不采集 → 渲染口径',
  '同名页面：有效版本 / 分不同国家',
  '字号删 10 / 17 / 72',
  '行高 = 字号 × 1.5',
  '间距不含小数',
  'padding 删 13 / 23',
  '允许值删 5 / 3.14 / 11',
  '全圆角统一 999'
]
const elevations = [
  { name: 'Elevation 0', css: '0 0 4px 0 rgba(0,0,0,.10)' },
  { name: 'Elevation 1', css: '0 2px 4px -1px rgba(0,0,0,.12), 0 4px 5px 0 rgba(0,0,0,.08), 0 1px 10px 0 rgba(0,0,0,.05)' },
  { name: 'Elevation 2', css: '0 5px 5px -3px rgba(0,0,0,.10), 0 8px 10px 1px rgba(0,0,0,.06), 0 3px 14px 2px rgba(0,0,0,.05)' },
  { name: 'Elevation 3', css: '0 8px 10px -5px rgba(0,0,0,.08), 0 16px 24px 2px rgba(0,0,0,.04), 0 6px 30px 5px rgba(0,0,0,.05)' },
  { name: 'Elevation 4', css: '0 2px 12px 0 rgba(100,101,102,.12)' }
]
// 色块为视觉示意尺寸（大控件按约 1/2 缩放），文字一律保留 Figma 实测原值
const controls = [
  { name: '按钮 button', size: '200 × 44', note: '圆角 20', w: 100, h: 22 },
  { name: '输入框 field-input', size: '311 × 76', note: '311 × 98 变体', w: 155, h: 38 },
  { name: '搜索框 search', size: '343 × 56', note: '343 × 52 变体', w: 171, h: 28 },
  { name: 'dialog', size: '311 × 176', note: '圆角 16', w: 155, h: 56 },
  { name: 'Select List', size: '343 × 156', note: '圆角 12', w: 171, h: 56 },
  { name: 'tag', size: '32 × 16', note: '圆角 2', w: 32, h: 16 },
  { name: 'selected-item', size: '90 × 28', note: '圆角 999（原实测 40，已归一）', w: 90, h: 28 }
]
</script>

<style scoped>
.spec { max-width: 1080px; margin: 0 auto; font-family: "PingFang SC", -apple-system, BlinkMacSystemFont, sans-serif; color: #1D2129; }
code, .swatch__hex, .semantic__hex, .gradient__stops, .pair code, .radius code, .elevation__css, .control code, .chip { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }

/* hero */
.hero { display: flex; gap: 32px; align-items: stretch; justify-content: space-between; padding: 32px; border-radius: 20px; background: linear-gradient(120deg, #FFFFFF 0%, #F7F8FA 100%); border: 1px solid #E5E6EB; }
.hero__left { flex: 1; min-width: 0; }
.hero__eyebrow { margin: 0 0 12px; color: #00AAA6; font: 600 12px/16px "PingFang SC", sans-serif; letter-spacing: .08em; }
.hero__title { margin: 0; font: 600 34px/44px "PingFang SC", sans-serif; letter-spacing: -.01em; }
.hero__tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
.tag { padding: 5px 12px; border: 1px solid #E5E6EB; border-radius: 20px; color: #4E5969; background: #FFFFFF; font: 500 12px/18px "PingFang SC", sans-serif; }
.tag--solid { border-color: #22BBB3; color: #FFFFFF; background: #22BBB3; }
.hero__source { flex: 0 0 290px; padding: 18px 20px; border-radius: 14px; background: #1D2129; color: #C9CDD4; }
.hero__source-label { margin: 0 0 12px; color: #86909C; font: 600 11px/16px "PingFang SC", sans-serif; letter-spacing: .08em; }
.hero__source p { margin: 0 0 6px; font: 400 11px/18px "PingFang SC", sans-serif; }
.hero__source code { color: #4ACCC1; font-size: 11px; }

/* anchors */
.anchors { position: sticky; top: 0; z-index: 5; display: flex; flex-wrap: wrap; gap: 4px; margin: 20px 0 8px; padding: 10px 12px; border: 1px solid #E5E6EB; border-radius: 12px; background: rgba(255,255,255,.94); backdrop-filter: blur(8px); }
.anchors a { padding: 6px 12px; border-radius: 8px; color: #4E5969; text-decoration: none; font: 500 12px/18px "PingFang SC", sans-serif; }
.anchors a:hover { color: #00AAA6; background: #E8FFFB; }

/* blocks */
.block { margin-top: 40px; scroll-margin-top: 70px; }
.block__head { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-bottom: 16px; }
.block__head > div { display: flex; align-items: baseline; gap: 12px; }
.block__no { color: #22BBB3; font: 600 13px/20px ui-monospace, monospace; }
.block__head h2 { margin: 0; font: 600 22px/30px "PingFang SC", sans-serif; }
.block__head > p { margin: 0; color: #86909C; font: 400 12px/20px "PingFang SC", sans-serif; }
.card { margin-bottom: 16px; padding: 20px 24px 24px; box-sizing: border-box; border: 1px solid #E5E6EB; border-radius: 16px; background: #FFFFFF; }
.card__title { margin: 0 0 18px; font: 600 15px/22px "PingFang SC", sans-serif; }
.card__title--sub { margin-top: 22px; }
.card__title small { margin-left: 8px; color: #86909C; font: 400 11px/18px "PingFang SC", sans-serif; }
.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

/* swatches */
.swatches { display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; }
.swatch__chip { height: 68px; border: 1px solid rgba(29,33,41,.08); border-radius: 10px; }
.swatch__name { margin: 8px 0 2px; font: 500 12px/18px "PingFang SC", sans-serif; }
.swatch__hex { margin: 0; color: #86909C; font-size: 11px; line-height: 16px; }

/* grays */
.graybar { display: flex; overflow: hidden; border-radius: 10px; border: 1px solid rgba(29,33,41,.08); }
.graybar__cell { flex: 1; height: 72px; display: flex; align-items: flex-end; padding: 8px; box-sizing: border-box; }
.graybar__cell span { color: #4E5969; font: 500 10px/14px "PingFang SC", sans-serif; }
.graybar__cell span.is-dark { color: #FFFFFF; }
.graybar__legend { display: flex; margin-top: 10px; }
.graybar__legend span { flex: 1; text-align: center; color: #86909C; font-size: 10px; }

/* semantic & status */
.semantic__row { display: flex; align-items: center; gap: 10px; padding: 7px 0; border-bottom: 1px solid #F7F8FA; }
.semantic__row:last-child { border-bottom: 0; }
.semantic__dot { width: 22px; height: 22px; flex: 0 0 22px; border: 1px solid rgba(29,33,41,.08); border-radius: 6px; }
.semantic__name { flex: 1; font: 400 12px/18px "PingFang SC", sans-serif; }
.semantic__hex { color: #86909C; font-size: 11px; }
.statuses { display: flex; flex-wrap: wrap; gap: 8px; }
.status { padding: 6px 12px; border-radius: 16px; font: 500 12px/18px "PingFang SC", sans-serif; }

/* gradients */
.gradients { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.gradient__bar { height: 56px; border-radius: 10px; background-color: #E5E6EB; border: 1px solid rgba(29,33,41,.06); }
.gradient__name { margin: 8px 0 2px; font: 500 12px/18px "PingFang SC", sans-serif; }
.gradient__stops { margin: 0; color: #86909C; font-size: 10px; line-height: 16px; word-break: break-all; }

/* strokes */
.strokes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.stroke { display: flex; align-items: center; gap: 8px; padding: 10px 12px; border-radius: 10px; background: #F7F8FA; }
.stroke__line { width: 36px; height: 24px; flex: 0 0 36px; border: 2px solid; border-radius: 4px; background: #FFFFFF; }
.stroke code { color: #4E5969; font-size: 11px; }
.stroke span { color: #86909C; font: 400 10px/16px "PingFang SC", sans-serif; }

/* type */
.types { display: grid; gap: 4px; }
.type { display: flex; align-items: baseline; gap: 20px; padding: 8px 0; border-bottom: 1px solid #F7F8FA; }
.type:last-child { border-bottom: 0; }
.type__label { flex: 0 0 48px; color: #86909C; font: 500 11px/18px ui-monospace, monospace; }
.type__sample { color: #1D2129; font-family: "PingFang SC", sans-serif; line-height: 1.4; }
.pairs { display: grid; gap: 8px; }
.pair { display: flex; align-items: center; gap: 12px; }
.pair code { flex: 0 0 66px; color: #4E5969; font-size: 11px; }
.pair__track { flex: 1; height: 8px; border-radius: 4px; background: #F2F3F5; overflow: hidden; }
.pair__fill { height: 100%; border-radius: 4px; background: #22BBB3; }
.pair > span { flex: 0 0 36px; color: #86909C; font: 400 11px/16px ui-monospace, monospace; text-align: right; }

/* spacing */
.spaces { display: grid; gap: 14px; }
.space { display: flex; align-items: center; gap: 12px; }
.space__label { flex: 0 0 44px; font: 600 12px/18px ui-monospace, monospace; color: #1D2129; }
.space__track { flex: 1; height: 12px; border-radius: 6px; background: #F2F3F5; overflow: hidden; }
.space__fill { height: 100%; border-radius: 6px; background: linear-gradient(90deg, #22BBB3, #14C9C9); }
.space__count { flex: 0 0 34px; color: #86909C; font: 400 11px/16px ui-monospace, monospace; text-align: right; }
.chips { display: flex; flex-wrap: wrap; gap: 6px; }
.chip { padding: 4px 10px; border: 1px solid #E5E6EB; border-radius: 6px; color: #4E5969; background: #F7F8FA; font-size: 11px; }
.chip--new { border-color: #22BBB3; color: #00AAA6; background: #E8FFFB; }
.chip--revision { border-color: #22BBB3; color: #00857F; background: #E8FFFB; font-family: "PingFang SC", sans-serif; }

/* radius */
.radius-group { margin-bottom: 22px; }
.radius-group:last-of-type { margin-bottom: 0; }
.radii { display: flex; flex-wrap: wrap; gap: 14px; }
.radius { text-align: center; }
.radius__box { width: 56px; height: 56px; background: #E8FFFB; border: 1px solid #22BBB3; }
.radius code { display: block; margin-top: 6px; color: #86909C; font-size: 10px; }

/* elevation */
.elevations { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; padding: 20px 18px; border-radius: 12px; background: #F2F3F5; }
.elevation__box { height: 88px; border-radius: 12px; background: #FFFFFF; }
.elevation__name { margin: 14px 0 4px; font: 600 12px/18px "PingFang SC", sans-serif; }
.elevation__css { display: block; color: #86909C; font-size: 9px; line-height: 15px; word-break: break-all; }

/* controls */
.controls { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.control { padding: 14px; border-radius: 12px; background: #F7F8FA; }
.control__shape { max-width: 100%; border-radius: 10px; background: linear-gradient(135deg, #ADEEE4, #22BBB3); }
.control__name { margin: 12px 0 4px; font: 500 12px/18px "PingFang SC", sans-serif; }
.control code { display: block; color: #4E5969; font-size: 11px; }
.control__note { display: block; margin-top: 4px; color: #86909C; font: 400 10px/16px "PingFang SC", sans-serif; }

/* rules & 403 */
.rules { margin: 0; padding-left: 18px; }
.rules li { margin-bottom: 10px; color: #1D2129; font: 400 12px/20px "PingFang SC", sans-serif; }
.rules code { color: #00AAA6; font-size: 11px; }
.rules--muted li { color: #4E5969; }
.api403 { margin-top: 18px; padding: 14px 16px; border-left: 3px solid #F7BA1E; border-radius: 0 10px 10px 0; background: #FFF7E8; }
.api403 p { margin: 0 0 8px; color: #4E5969; font: 400 11px/19px "PingFang SC", sans-serif; }
.api403 p:last-child { margin-bottom: 0; }
.api403__title { color: #1D2129 !important; font-weight: 600 !important; font-size: 12px !important; }
.api403 code { color: #B35C00; font-size: 10px; }


@media (max-width: 1000px) {
  .hero { flex-direction: column; }
  .hero__source { flex: 0 0 auto; }
  .two-col { grid-template-columns: 1fr; }
  .swatches { grid-template-columns: repeat(4, 1fr); }
  .gradients, .controls { grid-template-columns: repeat(2, 1fr); }
  .elevations { grid-template-columns: repeat(2, 1fr); }
  .strokes { grid-template-columns: repeat(2, 1fr); }
}
</style>
