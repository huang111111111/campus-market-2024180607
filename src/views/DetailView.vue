<template>
  <div class="detail-box">
    <h1>商品详情页</h1>
    <div class="detail-card">
      <h2>九成新笔记本电脑</h2>
      <p class="price">售价：¥1200</p>
      <p>成色很好，无维修，配件齐全</p>
      <button class="chat-btn">联系卖家</button>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
<style scoped>
.detail-box {
  max-width: 700px;
  margin: 0 auto;
}
.detail-card {
  padding: 30px;
  background: #f7f8fa;
  border-radius: 14px;
}
.price {
  font-size: 22px;
  color: #f56c6c;
  font-weight: bold;
}
.chat-btn {
  margin-top:20px;
  padding:10px 24px;
  background:#409eff;
  color:#fff;
  border:none;
  border-radius:6px;
}
</style>