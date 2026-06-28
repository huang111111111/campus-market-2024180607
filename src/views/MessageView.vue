<template>
  <div class="msg-box">
    <h1>💬 聊天消息</h1>
    <div class="chat-item">
      <div class="name">同学A</div>
      <p>你好，这个商品还在吗？可以小刀吗？</p>
    </div>
    <div class="chat-item self">
      <div class="name">我</div>
      <p>还在的，最低这个价格啦</p>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
<style scoped>
.msg-box {
  max-width: 800px;
  margin: 0 auto;
}
.chat-item {
  max-width: 70%;
  padding: 12px 16px;
  background: #f1f3f4;
  border-radius: 10px;
  margin: 10px 0;
}
.chat-item.self {
  margin-left: auto;
  background: #dceaff;
}
.name {
  font-size: 13px;
  color: #666;
  margin-bottom: 4px;
}
</style>