<template>
  <section class="page">
    <!-- 页头横幅 -->
    <div class="page-hero errand-hero">
      <div class="hero-text">
        <h1>🏃 跑腿委托</h1>
        <p>发布或接取校园跑腿任务：取快递、代买物品、代办小事</p>
      </div>
      <RouterLink to="/publish" class="hero-publish-btn">+ 发布任务</RouterLink>
    </div>

    <!-- 类型筛选 -->
    <div class="filter-bar">
      <button class="filter-btn" :class="{ active: activeFilter === '全部' }" @click="activeFilter = '全部'">全部</button>
      <button class="filter-btn" :class="{ active: activeFilter === '取快递' }" @click="activeFilter = '取快递'">📦 取快递</button>
      <button class="filter-btn" :class="{ active: activeFilter === '代买' }" @click="activeFilter = '代买'">🛒 代买</button>
      <button class="filter-btn" :class="{ active: activeFilter === '代办事' }" @click="activeFilter = '代办事'">📋 代办</button>
      <button class="filter-btn" :class="{ active: activeFilter === '搬运' }" @click="activeFilter = '搬运'">💪 搬运</button>
    </div>

    <EmptyState v-if="filteredItems.length === 0 && !loading" text="暂无跑腿委托信息" />

    <div v-if="filteredItems.length > 0" class="list">
      <article v-for="item in filteredItems" :key="item.id" class="errand-card">
        <div class="errand-badge" :class="getUrgencyClass(item.reward)">
          <span class="reward-amount">¥{{ item.reward }}</span>
          <span class="reward-label">酬劳</span>
        </div>
        <div class="errand-body">
          <div class="errand-top">
            <h3>{{ item.title }}</h3>
            <span class="type-tag">{{ item.taskType }}</span>
          </div>
          <p class="desc">{{ item.description }}</p>
          <div class="route-line">
            <span class="route-dot start" />
            <span class="route-from">{{ item.from }}</span>
            <span class="route-arrow">→</span>
            <span class="route-dot end" />
            <span class="route-to">{{ item.to }}</span>
          </div>
          <div class="errand-bottom">
            <div class="errand-meta">
              <span>⏰ 截止：{{ item.deadline }}</span>
              <span>👤 {{ item.publisher }}</span>
            </div>
            <div class="errand-actions">
              <button class="favorite-btn" @click="favoriteStore.toggleFavorite({ id: item.id, type: 'errand', title: item.title, description: item.description, location: item.from + ' → ' + item.to })">
                {{ favoriteStore.isFavorite('errand', item.id) ? '❤️ 已收藏' : '🤍 收藏' }}
              </button>
              <button class="take-btn">接单</button>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import EmptyState from '../components/EmptyState.vue'
import { getErrands, type ErrandItem } from '../api/errand'
import { useFavoriteStore } from '../stores/favorite'

const items = ref<ErrandItem[]>([])
const loading = ref(true)
const activeFilter = ref('全部')
const favoriteStore = useFavoriteStore()

const filteredItems = computed(() => {
  if (activeFilter.value === '全部') return items.value
  return items.value.filter(i => i.taskType === activeFilter.value)
})

function getUrgencyClass(reward: number) {
  if (reward >= 8) return 'urgent'
  if (reward >= 5) return 'normal'
  return 'easy'
}

onMounted(async () => {
  try {
    const res = await getErrands()
    items.value = res.data
  } catch (err) {
    console.error('获取跑腿委托数据失败:', err)
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
.errand-hero { background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%); }
.hero-text h1 { margin: 0 0 6px; font-size: 26px; }
.hero-text p { margin: 0; opacity: 0.9; font-size: 14px; }
.hero-publish-btn {
  padding: 10px 22px; border-radius: 8px; background: #fff; color: #6d28d9;
  font-size: 14px; font-weight: 600; text-decoration: none; transition: all 0.2s; white-space: nowrap;
}
.hero-publish-btn:hover { background: #f5f3ff; }

.filter-bar { display: flex; gap: 8px; flex-wrap: wrap; }
.filter-btn {
  padding: 8px 18px; border: 1px solid #e5e7eb; border-radius: 999px;
  background: #fff; font-size: 13px; font-family: inherit; color: #374151;
  cursor: pointer; transition: all 0.2s;
}
.filter-btn:hover { border-color: #8b5cf6; color: #6d28d9; }
.filter-btn.active { background: #f5f3ff; border-color: #8b5cf6; color: #6d28d9; font-weight: 600; }

.list { display: flex; flex-direction: column; gap: 14px; }

.errand-card {
  display: flex; gap: 18px; padding: 20px; border-radius: 14px;
  background: #fff; border: 1px solid #e5e7eb; transition: all 0.2s;
}
.errand-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.06); }

.errand-badge {
  width: 72px; height: 72px; border-radius: 14px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  flex-shrink: 0; color: #fff;
}
.errand-badge.urgent { background: linear-gradient(135deg, #ef4444, #dc2626); }
.errand-badge.normal { background: linear-gradient(135deg, #f59e0b, #d97706); }
.errand-badge.easy { background: linear-gradient(135deg, #10b981, #059669); }

.reward-amount { font-size: 18px; font-weight: 700; }
.reward-label { font-size: 10px; opacity: 0.85; }

.errand-body { flex: 1; display: flex; flex-direction: column; gap: 10px; min-width: 0; }
.errand-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
.errand-top h3 { margin: 0; font-size: 17px; }
.type-tag {
  padding: 3px 10px; border-radius: 999px; background: #f5f3ff;
  color: #6d28d9; font-size: 12px; white-space: nowrap;
}
.desc { margin: 0; color: #6b7280; font-size: 13px; line-height: 1.5; }

.route-line {
  display: flex; align-items: center; gap: 8px; padding: 10px 14px;
  background: #f9fafb; border-radius: 10px; font-size: 13px;
}
.route-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.route-dot.start { background: #22c55e; }
.route-dot.end { background: #ef4444; }
.route-arrow { color: #9ca3af; font-weight: 600; }
.route-from { color: #374151; }
.route-to { color: #374151; }

.errand-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 10px; border-top: 1px solid #f3f4f6; }
.errand-meta { display: flex; gap: 18px; font-size: 12px; color: #9ca3af; }
.errand-actions { display: flex; align-items: center; gap: 10px; }
.favorite-btn {
  padding: 8px 16px; border: 1px solid #e5e7eb; border-radius: 8px;
  background: #fff; font-size: 13px; font-family: inherit; cursor: pointer; transition: all 0.2s;
}
.favorite-btn:hover { border-color: #f59e0b; background: #fffbeb; }
.take-btn {
  padding: 10px 28px; border: none; border-radius: 10px;
  background: #8b5cf6; color: #fff; font-size: 14px; font-weight: 600;
  font-family: inherit; cursor: pointer; transition: all 0.2s;
}
.take-btn:hover { background: #6d28d9; transform: translateY(-1px); }
</style>
