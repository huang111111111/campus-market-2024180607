<template>
  <section class="page">
    <!-- 页头横幅 -->
    <div class="page-hero lost-hero">
      <div class="hero-text">
        <h1>🔍 失物招领</h1>
        <p>发布寻物启事或失物认领，帮助物品尽快找到主人</p>
      </div>
      <RouterLink to="/publish" class="hero-publish-btn">+ 发布招领</RouterLink>
    </div>

    <!-- 类型筛选 -->
    <div class="filter-bar">
      <button class="filter-btn" :class="{ active: activeFilter === 'all' }" @click="activeFilter = 'all'">
        全部
      </button>
      <button class="filter-btn lost" :class="{ active: activeFilter === 'lost' }" @click="activeFilter = 'lost'">
        🔴 寻物启事
      </button>
      <button class="filter-btn found" :class="{ active: activeFilter === 'found' }" @click="activeFilter = 'found'">
        🟢 失物招领
      </button>
    </div>

    <EmptyState v-if="filteredItems.length === 0 && !loading" text="暂无失物招领信息" />

    <div v-if="filteredItems.length > 0" class="list">
      <article
        v-for="item in filteredItems"
        :key="item.id"
        class="lf-card"
        :class="item.type"
      >
        <div class="lf-left">
          <span class="lf-emoji">{{ item.type === 'lost' ? '😰' : '😊' }}</span>
        </div>
        <div class="lf-body">
          <div class="lf-top">
            <h3>{{ item.title }}</h3>
            <span class="type-badge" :class="item.type">
              {{ item.type === 'lost' ? '寻物' : '招领' }}
            </span>
          </div>
          <p class="desc">{{ item.description }}</p>
          <div class="lf-meta">
            <span>📦 物品：{{ item.itemName }}</span>
            <span>📍 {{ item.location }}</span>
            <span>🕐 {{ item.eventTime }}</span>
          </div>
          <div class="lf-bottom">
            <span class="contact-info">📞 {{ item.contact }}</span>
            <div class="lf-actions">
              <button class="favorite-btn" @click="favoriteStore.toggleFavorite({ id: item.id, type: 'lostFound', title: item.title, description: item.description, location: item.location })">
                {{ favoriteStore.isFavorite('lostFound', item.id) ? '❤️ 已收藏' : '🤍 收藏' }}
              </button>
              <button class="contact-btn">联系对方</button>
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
import { getLostFounds, type LostFoundItem } from '../api/lostFound'
import { useFavoriteStore } from '../stores/favorite'

const items = ref<LostFoundItem[]>([])
const loading = ref(true)
const activeFilter = ref<'all' | 'lost' | 'found'>('all')
const favoriteStore = useFavoriteStore()

const filteredItems = computed(() => {
  if (activeFilter.value === 'all') return items.value
  return items.value.filter(i => i.type === activeFilter.value)
})

onMounted(async () => {
  try {
    const res = await getLostFounds()
    items.value = res.data
  } catch (err) {
    console.error('获取失物招领数据失败:', err)
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
.lost-hero { background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); }
.hero-text h1 { margin: 0 0 6px; font-size: 26px; }
.hero-text p { margin: 0; opacity: 0.9; font-size: 14px; }
.hero-publish-btn {
  padding: 10px 22px; border-radius: 8px; background: #fff; color: #1d4ed8;
  font-size: 14px; font-weight: 600; text-decoration: none; transition: all 0.2s; white-space: nowrap;
}
.hero-publish-btn:hover { background: #eff6ff; }

.filter-bar { display: flex; gap: 8px; }
.filter-btn {
  padding: 8px 20px; border: 1px solid #e5e7eb; border-radius: 999px;
  background: #fff; font-size: 13px; font-family: inherit; color: #374151;
  cursor: pointer; transition: all 0.2s;
}
.filter-btn:hover { border-color: #3b82f6; }
.filter-btn.active { background: #eff6ff; border-color: #3b82f6; color: #2563eb; font-weight: 600; }
.filter-btn.lost.active { background: #fef2f2; border-color: #ef4444; color: #dc2626; }
.filter-btn.found.active { background: #f0fdf4; border-color: #22c55e; color: #16a34a; }

.list { display: flex; flex-direction: column; gap: 14px; }

.lf-card {
  display: flex; gap: 18px; padding: 20px; border-radius: 14px;
  background: #fff; border: 1px solid #e5e7eb; border-left: 4px solid #e5e7eb;
  transition: all 0.2s;
}
.lf-card.lost { border-left-color: #ef4444; }
.lf-card.found { border-left-color: #22c55e; }
.lf-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.06); }

.lf-left { flex-shrink: 0; }
.lf-emoji { font-size: 36px; }

.lf-body { flex: 1; display: flex; flex-direction: column; gap: 10px; min-width: 0; }
.lf-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
.lf-top h3 { margin: 0; font-size: 17px; }
.type-badge {
  padding: 3px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; white-space: nowrap;
}
.type-badge.lost { background: #fef2f2; color: #dc2626; }
.type-badge.found { background: #f0fdf4; color: #16a34a; }

.desc { margin: 0; color: #6b7280; font-size: 13px; line-height: 1.5; }
.lf-meta { display: flex; gap: 18px; font-size: 12px; color: #9ca3af; flex-wrap: wrap; }

.lf-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 10px; border-top: 1px solid #f3f4f6; }
.contact-info { font-size: 13px; color: #6b7280; }
.lf-actions { display: flex; align-items: center; gap: 10px; }
.favorite-btn {
  padding: 8px 16px; border: 1px solid #e5e7eb; border-radius: 8px;
  background: #fff; font-size: 13px; font-family: inherit; cursor: pointer; transition: all 0.2s;
}
.favorite-btn:hover { border-color: #f59e0b; background: #fffbeb; }
.contact-btn {
  padding: 8px 22px; border: 1px solid #2563eb; border-radius: 8px;
  background: #fff; color: #2563eb; font-size: 13px; font-weight: 600;
  font-family: inherit; cursor: pointer; transition: all 0.2s;
}
.contact-btn:hover { background: #2563eb; color: #fff; }
</style>
