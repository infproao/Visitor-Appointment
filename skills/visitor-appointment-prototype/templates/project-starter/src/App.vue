<template>
  <div class="page">
    <!-- 渐变头部 -->
    <div class="header">
      <span class="header-title">访客预约</span>
      <button class="lang-btn">中文</button>
    </div>

    <!-- 提示条 -->
    <van-notice-bar
      left-icon="info-o"
      text="* 该模板仅用于本次访客预约使用"
      color="#F9CC45"
      background="#FFF7E8"
    />

    <!-- 步骤条 -->
    <van-steps :active="0" class="steps">
      <van-step>基本信息</van-step>
      <van-step>上传照片</van-step>
      <van-step>信息确认</van-step>
    </van-steps>

    <!-- 表单 -->
    <div class="card">
      <div class="section-title">访客信息</div>
      <van-form>
        <van-cell-group inset>
          <van-field
            v-model="name"
            label="姓名"
            placeholder="请输入"
            required
          />
          <van-field
            v-model="phone"
            type="tel"
            label="手机号"
            placeholder="请输入手机号"
            required
          >
            <template #left-icon><span class="area-code">+66</span></template>
          </van-field>
          <van-field
            v-model="idNo"
            label="证件号"
            placeholder="请输入"
            required
          />
        </van-cell-group>
      </van-form>
    </div>

    <!-- 同行人 -->
    <div class="card">
      <div class="section-title">同行人</div>
      <div class="companion">
        <span class="companion-name">Gian Juntac</span>
        <van-tag type="primary" plain>已添加</van-tag>
      </div>
      <van-button size="small" plain type="primary" icon="plus" class="add-btn">
        添加同行人
      </van-button>
    </div>

    <!-- 车辆 -->
    <div class="card">
      <div class="section-title">车辆</div>
      <div class="companion">
        <span class="companion-name">3GA-12345</span>
      </div>
      <van-button size="small" plain type="primary" icon="plus" class="add-btn">
        添加车辆
      </van-button>
    </div>

    <!-- 隐私协议 -->
    <van-checkbox v-model="agreed" shape="square" class="agree">
      我已阅读并同意
      <a class="link">《隐私政策》</a>和<a class="link">《隐私条款》</a>
    </van-checkbox>

    <!-- 按钮三档展示 -->
    <div class="btn-row">
      <van-button type="primary" size="large" round block>下一步</van-button>
    </div>
    <div class="btn-row">
      <van-button type="primary" round>中按钮 44px</van-button>
      <van-button type="primary" size="small" round>小按钮</van-button>
    </div>
    <div class="btn-row">
      <van-button type="primary" round disabled>禁用主按钮</van-button>
      <van-button round disabled>禁用次按钮</van-button>
    </div>

    <!-- 状态标签展示 -->
    <div class="card">
      <div class="section-title">状态标签</div>
      <div class="tag-row">
        <van-tag color="#23C343">已通过</van-tag>
        <van-tag color="#F9CC45" text-color="#4D3800">需审核</van-tag>
        <van-tag color="#F76560">已退回</van-tag>
        <van-tag color="#C9CDD4" text-color="#4E5969">已过期</van-tag>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const phone = ref('')
const idNo = ref('')
const agreed = ref(true)
</script>

<style scoped>
.page {
  max-width: 375px;
  margin: 0 auto;
  padding-bottom: 32px;
}

.header {
  height: 96px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #4ACCC1 0%, #22BBB3 60%, #00AAA6 100%);
}

.header-title {
  font-size: 24px;
  font-weight: bold;
  color: #FFFFFF;
}

.lang-btn {
  font-size: 14px;
  color: #FFFFFF;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 14px;
  padding: 6px 12px;
}

.steps {
  margin: 16px;
  background: #FFFFFF;
  border-radius: 12px;
  padding: 16px;
}

.card {
  margin: 16px;
  background: #FFFFFF;
  border-radius: 12px;
  padding: 16px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #1D2129;
  margin-bottom: 12px;
}

.area-code {
  margin-right: 8px;
  color: #1D2129;
  font-weight: 600;
}

.companion {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
}

.companion-name {
  font-size: 16px;
  color: #1D2129;
}

.add-btn {
  margin-top: 8px;
}

.agree {
  margin: 16px;
  font-size: 14px;
  color: #4E5969;
}

.link {
  color: #22BBB3;
}

.btn-row {
  display: flex;
  gap: 12px;
  margin: 8px 16px;
}

.tag-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
</style>
