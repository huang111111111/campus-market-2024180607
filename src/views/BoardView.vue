<template>
  <div class="board-box">
    <h1>📊 集市数据看板</h1>
    <div class="stat-row">
      <div class="stat-card">
        <h2>216</h2>
        <p>今日访问</p>
      </div>
      <div class="stat-card">
        <h2>58</h2>
        <p>今日发布</p>
      </div>
      <div class="stat-card">
        <h2>32</h2>
        <p>成交订单</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
<style scoped>
.board-box {
  max-width: 1000px;
  margin: 0 auto;
}
.stat-row {
  display: flex;
  gap: 20px;
  margin-top: 40px;
}
.stat-card {
  flex: 1;
  padding: 30px;
  text-align: center;
  background: #1967d2;
  color: white;
  border-radius: 12px;
}
.stat-card h2 {
  font-size: 36px;
  margin: 0;
}
</style>