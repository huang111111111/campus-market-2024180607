<template>
  <section class="page">
    <!-- 页头横幅 -->
    <div class="page-hero group-hero">
      <div class="hero-text">
        <h1>👥 拼单搭子</h1>
        <p>找人一起拼团、拼餐、拼车、组队学习，校园生活不再孤单</p>
      </div>
      <RouterLink to="/publish" class="hero-publish-btn">+ 发起拼单</RouterLink>
    </div>

    <!-- 类型筛选 -->
    <div class="filter-bar">
      <button class="filter-btn" :class="{ active: activeFilter === '全部' }" @click="activeFilter = '全部'">全部</button>
      <button class="filter-btn" :class="{ active: activeFilter === '拼餐' }" @click="activeFilter = '拼餐'">🍲 拼餐</button>
      <button class="filter-btn" :class="{ active: activeFilter === '学习资料' }" @click="activeFilter = '学习资料'">📖 学习资料</button>
      <button class="filter-btn" :class="{ active: activeFilter === '运动搭子' }" @click="activeFilter = '运动搭子'">⚽ 运动</button>
      <button class="filter-btn" :class="{ active: activeFilter === '出行拼车' }" @click="activeFilter = '出行拼车'">🚗 拼车</button>
    </div>

    <EmptyState v-if="filteredItems.length === 0 && !loading" text="暂无拼单搭子信息" />

    <div v-if="filteredItems.length > 0" class="list">
      <article v-for="item in filteredItems" :key="item.id" class="gb-card">
        <div class="gb-left">
          <span class="gb-emoji">{{ item.type === '拼餐' ? '🍲' : item.type === '学习资料' ? '📖' : item.type === '运动搭子' ? '⚽' : item.type === '学习搭子' ? '📝' : item.type === '出行拼车' ? '🚗' : '👥' }}</span>
        </div>
        <div class="gb-body">
          <div class="gb-top">
            <h3>{{ item.title }}</h3>
            <span class="type-tag">{{ item.type }}</span>
          </div>
          <p class="desc">{{ item.description }}</p>
          <div class="gb-meta">
            <span>📍 {{ item.location }}</span>
            <span>⏰ 截止：{{ item.deadline }}</span>
            <span>👤 {{ item.publisher }}</span>
          </div>
          <div class="gb-bottom">
            <div class="progress-section">
              <div class="progress-header">
                <span class="progress-label">拼单进度</span>
                <span class="progress-count">
                  <strong>{{ item.currentCount }}</strong> / {{ item.targetCount }} 人
                </span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: (item.currentCount / item.targetCount * 100) + '%' }" />
              </div>
            </div>
            <button class="join-btn">我要加入</button>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import EmptyState from '../components/EmptyState.vue'
import { getGroupBuys, type GroupBuyItem } from '../api/groupBuy'

const items = ref<GroupBuyItem[]>([])
const loading = ref(true)
const activeFilter = ref('全部')

const filteredItems = computed(() => {
  if (activeFilter.value === '全部') return items.value
  return items.value.filter(i => i.type === activeFilter.value)
})

onMounted(async () => {
  try {
    const res = await getGroupBuys()
    items.value = res.data
  } catch (err) {
    console.error('获取拼单搭子数据失败:', err)
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
.group-hero { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
.hero-text h1 { margin: 0 0 6px; font-size: 26px; }
.hero-text p { margin: 0; opacity: 0.9; font-size: 14px; }
.hero-publish-btn {
  padding: 10px 22px; border-radius: 8px; background: #fff; color: #059669;
  font-size: 14px; font-weight: 600; text-decoration: none; transition: all 0.2s; white-space: nowrap;
}
.hero-publish-btn:hover { background: #ecfdf5; }

.filter-bar { display: flex; gap: 8px; flex-wrap: wrap; }
.filter-btn {
  padding: 8px 18px; border: 1px solid #e5e7eb; border-radius: 999px;
  background: #fff; font-size: 13px; font-family: inherit; color: #374151;
  cursor: pointer; transition: all 0.2s;
}
.filter-btn:hover { border-color: #10b981; color: #059669; }
.filter-btn.active { background: #ecfdf5; border-color: #10b981; color: #059669; font-weight: 600; }

.list { display: flex; flex-direction: column; gap: 14px; }

.gb-card {
  display: flex; gap: 18px; padding: 20px; border-radius: 14px;
  background: #fff; border: 1px solid #e5e7eb; transition: all 0.2s;
}
.gb-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.06); }

.gb-left { flex-shrink: 0; }
.gb-emoji { font-size: 36px; }

.gb-body { flex: 1; display: flex; flex-direction: column; gap: 10px; min-width: 0; }
.gb-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
.gb-top h3 { margin: 0; font-size: 17px; }
.type-tag {
  padding: 3px 10px; border-radius: 999px; background: #ecfdf5;
  color: #059669; font-size: 12px; white-space: nowrap;
}
.desc { margin: 0; color: #6b7280; font-size: 13px; line-height: 1.5; }
.gb-meta { display: flex; gap: 18px; font-size: 12px; color: #9ca3af; flex-wrap: wrap; }

.gb-bottom { display: flex; justify-content: space-between; align-items: flex-end; gap: 20px; padding-top: 12px; border-top: 1px solid #f3f4f6; }
.progress-section { flex: 1; }
.progress-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
.progress-label { font-size: 12px; color: #6b7280; }
.progress-count { font-size: 13px; color: #374151; }
.progress-count strong { color: #059669; }
.progress-bar { height: 8px; background: #e5e7eb; border-radius: 999px; overflow: hidden; }
.progress-fill { height: 100%; background: linear-gradient(90deg, #10b981, #059669); border-radius: 999px; transition: width 0.4s; }

.join-btn {
  padding: 10px 28px; border: none; border-radius: 10px;
  background: #10b981; color: #fff; font-size: 14px; font-weight: 600;
  font-family: inherit; cursor: pointer; transition: all 0.2s; white-space: nowrap;
}
.join-btn:hover { background: #059669; transform: translateY(-1px); }
</style>
