<template>
  <div class="list-box">
    <h1>📦 全部闲置商品</h1>
    <div class="goods-item" v-for="item in 6" :key="item">
      <h4>闲置商品 {{ item }}</h4>
      <p>价格：¥{{ item * 10 }} | 发布于今日</p>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
<style scoped>
.list-box {
  max-width: 1000px;
  margin: 0 auto;
}
.goods-item {
  padding: 16px;
  border-bottom: 1px solid #eee;
}
.goods-item:hover {
  background: #f8f9fa;
}
</style>