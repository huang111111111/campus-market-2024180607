<template>
  <div class="pub-box">
    <h1>✍️ 发布闲置商品</h1>
    <div class="form-item">
      <label>商品名称</label>
      <input type="text" placeholder="输入你要出售的物品">
    </div>
    <div class="form-item">
      <label>出售价格</label>
      <input type="number" placeholder="填写价格">
    </div>
    <div class="form-item">
      <label>商品描述</label>
      <textarea placeholder="简单介绍物品成色、使用时长"></textarea>
    </div>
    <button class="submit-btn">提交发布</button>
  </div>
</template>
<script setup lang="ts">
</script>
<style scoped>
.pub-box {
  max-width: 600px;
  margin: 0 auto;
}
.form-item {
  margin: 20px 0;
}
label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}
input, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
}
.submit-btn {
  padding: 12px 30px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
}
</style>