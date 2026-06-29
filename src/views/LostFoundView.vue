<template>
  <section class="page">
    <div class="page-header">
      <h1>失物招领</h1>
      <p>帮助丢失物品快速找回，发布你发现的遗失物品。</p>
    </div>

    <EmptyState
      v-if="items.length === 0 && !loading"
      text="暂无失物招领信息"
    />

    <div v-if="items.length > 0" class="list">
      <ItemCard
        v-for="item in items"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :tag="item.type === 'lost' ? '寻物' : '招领'"
        :location="item.location"
        :time="item.eventTime"
      >
        <template #footer>
          <div class="lost-found-footer">
            <span class="item-name">{{ item.itemName }}</span>
            <span class="contact">{{ item.contact }}</span>
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
import { getLostFounds, type LostFoundItem } from '../api/lostFound'

const items = ref<LostFoundItem[]>([])
const loading = ref(true)

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

.lost-found-footer {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
}

.item-name {
  padding: 2px 8px;
  border-radius: 4px;
  background: #fef3c7;
  color: #d97706;
}

.contact {
  margin-left: auto;
  color: #6b7280;
}
</style>
