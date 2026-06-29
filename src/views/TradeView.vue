<template>
  <section class="page">
    <!-- 页头横幅 -->
    <div class="page-hero trade-hero">
      <div class="hero-text">
        <h1>📦 二手交易</h1>
        <p>浏览同学发布的闲置物品，发现校园内的实用好物</p>
      </div>
      <div class="hero-stats">
        <span>{{ trades.length }} 件在售</span>
        <RouterLink to="/publish" class="hero-publish-btn">+ 发布闲置</RouterLink>
      </div>
    </div>

    <!-- 分类筛选 -->
    <div class="filter-bar">
      <button
        v-for="cat in categories"
        :key="cat"
        class="filter-btn"
        :class="{ active: activeCategory === cat }"
        @click="activeCategory = cat"
      >
        {{ cat }}
      </button>
    </div>

    <!-- 列表 -->
    <EmptyState
      v-if="filteredTrades.length === 0 && !loading"
      text="暂无符合条件的二手交易信息"
    />

    <div v-if="filteredTrades.length > 0" class="list">
      <article
        v-for="item in filteredTrades"
        :key="item.id"
        class="trade-card"
      >
        <div class="card-image">
          <span class="image-placeholder">{{ item.category === '教材资料' ? '📚' : item.category === '数码配件' ? '💻' : item.category === '宿舍生活' ? '🏠' : item.category === '运动出行' ? '🚲' : '📦' }}</span>
        </div>
        <div class="card-content">
          <div class="card-top">
            <h3>{{ item.title }}</h3>
            <span class="tag">{{ item.category }}</span>
          </div>
          <p class="desc">{{ item.description }}</p>
          <div class="meta-row">
            <span>📍 {{ item.location }}</span>
            <span>🕐 {{ item.publishTime }}</span>
            <span>👤 {{ item.publisher }}</span>
          </div>
          <div class="card-bottom">
            <div class="price-block">
              <span class="price">¥{{ item.price }}</span>
              <span class="condition">{{ item.condition }}</span>
            </div>
            <button class="contact-btn">联系卖家</button>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import EmptyState from '../components/EmptyState.vue'
import { getTrades, type TradeItem } from '../api/trade'

const trades = ref<TradeItem[]>([])
const loading = ref(true)
const activeCategory = ref('全部')

const categories = ref(['全部', '数码配件', '教材资料', '宿舍生活', '运动出行', '其他'])

const filteredTrades = computed(() => {
  if (activeCategory.value === '全部') return trades.value
  return trades.value.filter(t => t.category === activeCategory.value)
})

onMounted(async () => {
  try {
    const res = await getTrades()
    trades.value = res.data
  } catch (err) {
    console.error('获取二手交易数据失败:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.page { display: flex; flex-direction: column; gap: 20px; }

.page-hero {
  display: flex; justify-content: space-between; align-items: center;
  padding: 28px 32px; border-radius: 16px; color: #fff;
}
.trade-hero { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }
.hero-text h1 { margin: 0 0 6px; font-size: 26px; }
.hero-text p { margin: 0; opacity: 0.9; font-size: 14px; }
.hero-stats { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; font-size: 14px; }
.hero-publish-btn {
  padding: 8px 20px; border-radius: 8px; background: #fff; color: #d97706;
  font-size: 13px; font-weight: 600; text-decoration: none; transition: all 0.2s;
}
.hero-publish-btn:hover { background: #fff7ed; }

.filter-bar { display: flex; gap: 8px; flex-wrap: wrap; }
.filter-btn {
  padding: 8px 18px; border: 1px solid #e5e7eb; border-radius: 999px;
  background: #fff; font-size: 13px; font-family: inherit; color: #374151;
  cursor: pointer; transition: all 0.2s;
}
.filter-btn:hover { border-color: #f59e0b; color: #d97706; }
.filter-btn.active { background: #fef3c7; border-color: #f59e0b; color: #d97706; font-weight: 600; }

.list { display: flex; flex-direction: column; gap: 14px; }

.trade-card {
  display: flex; gap: 20px; padding: 20px; border-radius: 14px;
  background: #fff; border: 1px solid #e5e7eb; transition: all 0.2s;
}
.trade-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.06); border-color: #d1d5db; }

.card-image {
  width: 120px; height: 120px; border-radius: 10px; background: #f9fafb;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.image-placeholder { font-size: 40px; }

.card-content { flex: 1; display: flex; flex-direction: column; gap: 10px; min-width: 0; }
.card-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
.card-top h3 { margin: 0; font-size: 17px; }
.tag {
  padding: 3px 10px; border-radius: 999px; background: #eff6ff;
  color: #2563eb; font-size: 12px; white-space: nowrap;
}
.desc { margin: 0; color: #6b7280; font-size: 13px; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.meta-row { display: flex; gap: 18px; font-size: 12px; color: #9ca3af; flex-wrap: wrap; }

.card-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 10px; border-top: 1px solid #f3f4f6; }
.price-block { display: flex; align-items: baseline; gap: 10px; }
.price { font-size: 22px; font-weight: 700; color: #dc2626; }
.condition { font-size: 13px; color: #6b7280; }
.contact-btn {
  padding: 8px 22px; border: 1px solid #2563eb; border-radius: 8px;
  background: #fff; color: #2563eb; font-size: 13px; font-weight: 600;
  font-family: inherit; cursor: pointer; transition: all 0.2s;
}
.contact-btn:hover { background: #2563eb; color: #fff; }
</style>
