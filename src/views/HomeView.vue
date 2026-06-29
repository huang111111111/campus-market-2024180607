<template>
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
  text-align: center;
  padding: 48px 24px;
}

.home-box h1 {
  font-size: 28px;
  margin-bottom: 12px;
}

.desc {
  color: #6b7280;
  font-size: 16px;
  margin-bottom: 32px;
}

.card-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.card {
  padding: 24px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #e5e7eb;
}

.card h3 {
  font-size: 18px;
  margin-bottom: 8px;
}

.card p {
  color: #6b7280;
  font-size: 14px;
}
</style>
