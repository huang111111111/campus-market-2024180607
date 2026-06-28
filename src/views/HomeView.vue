<template>
  <h1 style="color:red;font-size:40px;">测试文字</h1>
  <div class="home-box">
    <h1>校园集市首页</h1>
    <p class="desc">闲置物品交换、二手好物交易平台</p>
    <div class="card-list">
      <div class="card">
        <h3>课本教材</h3>
        <p>低价购入学长学姐专业书籍</p>
      </div>
      <div class="card">
        <h3>电子产品</h3>
        <p>耳机、平板、小家电二手转卖</p>
      </div>
      <div class="card">
        <h3>生活好物</h3>
        <p>宿舍收纳、服饰、运动器材</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.home-box {
  max-width: 1000px;
  margin: 0 auto;
}
h1 {
  color: #222;
}
.desc {
  font-size: 18px;
  color: #666;
  margin-bottom: 30px;
}
.card-list {
  display: flex;
  gap: 20px;
}
.card {
  flex: 1;
  padding: 24px;
  background: #f5f7fa;
  border-radius: 12px;
  transition: all 0.3s ease;
}
.card:hover {
  background: #e8f0fe;
  transform: translateY(-4px);
}
.card h3 {
  color: #1967d2;
  margin-top: 0;
}
</style>