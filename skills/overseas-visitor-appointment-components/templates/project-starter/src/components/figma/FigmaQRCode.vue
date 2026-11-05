<template><figure class="qr"><img :src="qr" alt="二维码占位"/><figcaption v-if="caption">{{caption}}</figcaption></figure></template>
<script setup>import qr from'../../assets/qr-placeholder.png';defineProps({caption:String})</script>
<style scoped>.qr{width:200px;margin:0 auto;text-align:center}.qr img{display:block;width:200px;height:200px;object-fit:contain}.qr figcaption{margin-top:12px;color:#4E5969;font:400 14px/22px "PingFang SC",sans-serif}</style>
