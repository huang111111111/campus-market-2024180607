<template>
  <section class="page">
    <div class="page-header">
      <h1>跑腿委托</h1>
      <p>发布或接取校园跑腿任务：取快递、代买物品、代办小事，互助更便捷。</p>
    </div>

    <EmptyState
      v-if="items.length === 0 && !loading"
      text="暂无跑腿委托信息"
    />

    <div v-if="items.length > 0" class="list">
      <ItemCard
        v-for="item in items"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :tag="item.taskType"
        :time="item.deadline"
      >
        <template #footer>
          <div class="errand-footer">
            <div class="route">
              <span>{{ item.from }}</span>
              <span class="arrow">→</span>
              <span>{{ item.to }}</span>
            </div>
            <strong class="reward">￥{{ item.reward }}</strong>
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
import { getErrands, type ErrandItem } from '../api/errand'

const items = ref<ErrandItem[]>([])
const loading = ref(true)

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

.errand-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.route {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #6b7280;
}

.arrow {
  color: #9ca3af;
}

.reward {
  color: #dc2626;
  font-size: 18px;
  white-space: nowrap;
}
</style>
