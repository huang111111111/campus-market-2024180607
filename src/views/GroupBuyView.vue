<template>
  <section class="page">
    <div class="page-header">
      <h1>拼单搭子</h1>
      <p>找人一起拼团、拼餐、拼车、组队学习，校园生活不再孤单。</p>
    </div>

    <EmptyState
      v-if="items.length === 0 && !loading"
      text="暂无拼单搭子信息"
    />

    <div v-if="items.length > 0" class="list">
      <ItemCard
        v-for="item in items"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :tag="item.type"
        :location="item.location"
        :time="item.deadline"
      >
        <template #footer>
          <div class="group-buy-footer">
            <div class="progress-info">
              <span class="count">{{ item.currentCount }} / {{ item.targetCount }} 人</span>
              <div class="progress-bar">
                <div
                  class="progress-fill"
                  :style="{ width: (item.currentCount / item.targetCount * 100) + '%' }"
                />
              </div>
            </div>
            <span class="publisher">{{ item.publisher }}</span>
          </div>
        </template>
      </ItemCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ItemCard from '../components/ItemCard.vue'
import EmptyState from '../components/EmptyState.vue'
import { getGroupBuys, type GroupBuyItem } from '../api/groupBuy'

const items = ref<GroupBuyItem[]>([])
const loading = ref(true)

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
.page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.page-header {
  padding: 24px;
  border-radius: 16px;
  background: #fff;
}

.page-header h1 {
  margin: 0 0 8px;
}

.page-header p {
  margin: 0;
  color: #6b7280;
}

.list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.group-buy-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.progress-info {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.count {
  font-size: 13px;
  color: #2563eb;
  font-weight: 600;
  white-space: nowrap;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: #e5e7eb;
  border-radius: 999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #2563eb;
  border-radius: 999px;
  transition: width 0.3s;
}

.publisher {
  font-size: 12px;
  color: #9ca3af;
  white-space: nowrap;
}
</style>
