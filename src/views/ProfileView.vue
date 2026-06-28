<template>
  <div class="user-box">
    <div class="avatar">👤</div>
    <h2>校园用户</h2>
    <p>普通集市会员 | 发布商品 12 件</p>
    <div class="func-list">
      <div class="func-item">我的发布</div>
      <div class="func-item">我的收藏</div>
      <div class="func-item">交易记录</div>
      <div class="func-item">设置</div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.user-box {
  text-align: center;
}
.avatar {
  font-size: 60px;
  margin: 20px 0;
}
.func-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  max-width: 500px;
  margin: 40px auto;
}
.func-item {
  padding: 20px;
  background: #f5f7fa;
  border-radius: 10px;
}
</style>