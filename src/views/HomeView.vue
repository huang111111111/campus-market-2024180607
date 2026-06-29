<template>
  <section class="home">
    <!-- 主横幅 -->
    <div class="hero">
      <h1>🏫 校园轻集市</h1>
      <p class="hero-sub">二手交易 · 失物招领 · 拼单搭子 · 跑腿委托</p>
      <p class="hero-desc">轻量、可信、面向校园生活的互助平台</p>
      <div class="hero-actions">
        <RouterLink to="/publish" class="hero-btn primary">✍️ 发布信息</RouterLink>
        <RouterLink to="/trade" class="hero-btn">🔍 浏览好物</RouterLink>
      </div>
    </div>

    <!-- 四大业务入口 -->
    <div class="section-title">
      <h2>快捷入口</h2>
      <p>选择你需要的服务</p>
    </div>
    <div class="entry-grid">
      <RouterLink to="/trade" class="entry-card trade">
        <span class="entry-icon">📦</span>
        <div class="entry-text">
          <h3>二手交易</h3>
          <p>课本、数码、生活好物</p>
        </div>
        <span class="entry-arrow">→</span>
      </RouterLink>
      <RouterLink to="/lost-found" class="entry-card lost">
        <span class="entry-icon">🔍</span>
        <div class="entry-text">
          <h3>失物招领</h3>
          <p>寻物启事 & 失物认领</p>
        </div>
        <span class="entry-arrow">→</span>
      </RouterLink>
      <RouterLink to="/group-buy" class="entry-card group">
        <span class="entry-icon">👥</span>
        <div class="entry-text">
          <h3>拼单搭子</h3>
          <p>拼餐、拼车、组队学习</p>
        </div>
        <span class="entry-arrow">→</span>
      </RouterLink>
      <RouterLink to="/errand" class="entry-card errand">
        <span class="entry-icon">🏃</span>
        <div class="entry-text">
          <h3>跑腿委托</h3>
          <p>取快递、代买、代办</p>
        </div>
        <span class="entry-arrow">→</span>
      </RouterLink>
    </div>

    <!-- 热门分类 -->
    <div class="section-title">
      <h2>热门分类</h2>
      <p>大家都在看</p>
    </div>
    <div class="category-grid">
      <RouterLink to="/trade" class="cat-card">
        <span class="cat-icon">📚</span>
        <span>教材资料</span>
      </RouterLink>
      <RouterLink to="/trade" class="cat-card">
        <span class="cat-icon">💻</span>
        <span>数码配件</span>
      </RouterLink>
      <RouterLink to="/trade" class="cat-card">
        <span class="cat-icon">🏠</span>
        <span>宿舍生活</span>
      </RouterLink>
      <RouterLink to="/trade" class="cat-card">
        <span class="cat-icon">🚲</span>
        <span>运动出行</span>
      </RouterLink>
      <RouterLink to="/group-buy" class="cat-card">
        <span class="cat-icon">🍲</span>
        <span>拼餐搭子</span>
      </RouterLink>
      <RouterLink to="/errand" class="cat-card">
        <span class="cat-icon">📦</span>
        <span>代取快递</span>
      </RouterLink>
    </div>

    <!-- 底部数据 -->
    <div class="stats-bar">
      <div class="stat">
        <span class="stat-num">26</span>
        <span class="stat-label">条活跃信息</span>
      </div>
      <div class="stat">
        <span class="stat-num">4</span>
        <span class="stat-label">大服务板块</span>
      </div>
      <div class="stat">
        <span class="stat-num">100+</span>
        <span class="stat-label">校园用户</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* 横幅 */
.hero {
  text-align: center;
  padding: 52px 24px;
  border-radius: 20px;
  background: linear-gradient(135deg, #1e40af 0%, #2563eb 40%, #3b82f6 100%);
  color: #fff;
}

.hero h1 {
  margin: 0 0 8px;
  font-size: 36px;
}

.hero-sub {
  margin: 0 0 4px;
  font-size: 15px;
  opacity: 0.9;
}

.hero-desc {
  margin: 0 0 24px;
  font-size: 14px;
  opacity: 0.7;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  padding: 12px 28px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
}

.hero-btn.primary {
  background: #fff;
  color: #2563eb;
}

.hero-btn.primary:hover {
  background: #f0f5ff;
  transform: translateY(-1px);
}

.hero-btn:not(.primary) {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.hero-btn:not(.primary):hover {
  background: rgba(255, 255, 255, 0.25);
}

/* 区块标题 */
.section-title {
  text-align: center;
}

.section-title h2 {
  margin: 0 0 4px;
  font-size: 22px;
}

.section-title p {
  margin: 0;
  color: #6b7280;
  font-size: 14px;
}

/* 四大入口 */
.entry-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.entry-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 22px 18px;
  border-radius: 14px;
  background: #fff;
  border: 2px solid #e5e7eb;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
  cursor: pointer;
}

.entry-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.entry-card.trade:hover { border-color: #f59e0b; }
.entry-card.lost:hover { border-color: #3b82f6; }
.entry-card.group:hover { border-color: #10b981; }
.entry-card.errand:hover { border-color: #8b5cf6; }

.entry-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.entry-text {
  flex: 1;
  min-width: 0;
}

.entry-text h3 {
  margin: 0 0 2px;
  font-size: 16px;
}

.entry-text p {
  margin: 0;
  font-size: 12px;
  color: #6b7280;
}

.entry-arrow {
  font-size: 18px;
  color: #d1d5db;
  flex-shrink: 0;
  transition: all 0.2s;
}

.entry-card:hover .entry-arrow {
  color: #2563eb;
  transform: translateX(3px);
}

/* 热门分类 */
.category-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 12px;
}

.cat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px 12px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #e5e7eb;
  text-decoration: none;
  color: #374151;
  font-size: 13px;
  transition: all 0.2s;
}

.cat-card:hover {
  border-color: #2563eb;
  background: #eff6ff;
  color: #2563eb;
  transform: translateY(-2px);
}

.cat-icon {
  font-size: 28px;
}

/* 底部统计 */
.stats-bar {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 20px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #e5e7eb;
}

.stat-num {
  font-size: 28px;
  font-weight: 700;
  color: #2563eb;
}

.stat-label {
  font-size: 13px;
  color: #6b7280;
}
</style>
