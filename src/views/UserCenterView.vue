<template>
  <section class="page">
    <!-- 用户信息卡片 -->
    <div class="profile-card">
      <div class="profile-top">
        <div class="avatar">🧑‍🎓</div>
        <div class="profile-info">
          <h2>软件工程 2023 级 李明</h2>
          <p class="bio">专注二手好物，诚信交易</p>
        </div>
        <button class="edit-btn">编辑资料</button>
      </div>
      <div class="stats">
        <div class="stat-item">
          <span class="stat-num">12</span>
          <span class="stat-label">已发布</span>
        </div>
        <div class="stat-item">
          <span class="stat-num">5</span>
          <span class="stat-label">进行中</span>
        </div>
        <div class="stat-item">
          <span class="stat-num">7</span>
          <span class="stat-label">已完成</span>
        </div>
        <div class="stat-item">
          <span class="stat-num">98%</span>
          <span class="stat-label">好评率</span>
        </div>
      </div>
    </div>

    <!-- 我的发布区域 -->
    <div class="section-header">
      <h3>我的发布</h3>
      <div class="section-tabs">
        <button
          v-for="tab in myTabs"
          :key="tab.key"
          class="section-tab"
          :class="{ active: activeTab === tab.key }"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <div v-if="myItems.length > 0" class="list">
      <ItemCard
        v-for="item in myItems"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :tag="item.tag"
        :location="item.location"
        :time="item.time"
      >
        <template #footer>
          <div class="item-footer">
            <span class="item-status" :class="item.statusType">
              {{ item.statusText }}
            </span>
            <div class="item-actions">
              <button class="action-btn">编辑</button>
              <button class="action-btn danger">下架</button>
            </div>
          </div>
        </template>
      </ItemCard>
    </div>

    <div v-else class="empty-box">
      <p>还没有发布过任何信息</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ItemCard from '../components/ItemCard.vue'

const activeTab = ref('all')

const myTabs = [
  { key: 'all', label: '全部' },
  { key: 'active', label: '进行中' },
  { key: 'done', label: '已完成' },
]

const myItems = ref([
  {
    id: 1,
    title: '九成新 Cherry 机械键盘',
    description: '键盘使用半年，轴体正常，因升级设备转让，送拔键器。',
    tag: '数码配件',
    location: '东区 3 号楼',
    time: '2026-06-20',
    statusText: '在售中',
    statusType: 'active',
  },
  {
    id: 2,
    title: '寻找黑色校园卡',
    description: '黑色卡套，内有校园卡和学生证，名字：张晓明。',
    tag: '寻物',
    location: '一食堂二楼',
    time: '2026-06-22',
    statusText: '寻找中',
    statusType: 'active',
  },
  {
    id: 3,
    title: '《高等数学（第七版）》上下册',
    description: '上册有少量笔记，下册几乎全新，两本一起出。',
    tag: '教材资料',
    location: '图书馆门口',
    time: '2026-06-15',
    statusText: '已售出',
    statusType: 'done',
  },
  {
    id: 4,
    title: '帮取快递到宿舍楼下',
    description: '一个小包裹，送到楼下快递架即可。',
    tag: '取快递',
    location: '菜鸟驿站',
    time: '2026-06-24',
    statusText: '已被接单',
    statusType: 'active',
  },
])
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* 用户卡片 */
.profile-card {
  padding: 28px;
  border-radius: 16px;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: #fff;
}

.profile-top {
  display: flex;
  align-items: center;
  gap: 18px;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  flex-shrink: 0;
}

.profile-info {
  flex: 1;
}

.profile-info h2 {
  margin: 0 0 4px;
  font-size: 20px;
}

.bio {
  margin: 0;
  font-size: 13px;
  opacity: 0.8;
}

.edit-btn {
  padding: 8px 20px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  font-size: 13px;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.2s;
}

.edit-btn:hover {
  background: rgba(255, 255, 255, 0.25);
}

/* 统计数据 */
.stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-num {
  font-size: 24px;
  font-weight: 700;
}

.stat-label {
  font-size: 12px;
  opacity: 0.75;
}

/* 区域标题 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-header h3 {
  margin: 0;
  font-size: 18px;
}

.section-tabs {
  display: flex;
  gap: 4px;
}

.section-tab {
  padding: 6px 16px;
  border: none;
  border-radius: 6px;
  background: transparent;
  font-size: 13px;
  font-family: inherit;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
}

.section-tab:hover {
  color: #2563eb;
}

.section-tab.active {
  background: #eff6ff;
  color: #2563eb;
  font-weight: 600;
}

/* 发布列表 */
.list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.item-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.item-status {
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
}

.item-status.active {
  background: #dcfce7;
  color: #16a34a;
}

.item-status.done {
  background: #f3f4f6;
  color: #9ca3af;
}

.item-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 4px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #fff;
  font-size: 12px;
  font-family: inherit;
  color: #374151;
  cursor: pointer;
  transition: all 0.15s;
}

.action-btn:hover {
  border-color: #2563eb;
  color: #2563eb;
}

.action-btn.danger:hover {
  border-color: #ef4444;
  color: #ef4444;
}

/* 空状态 */
.empty-box {
  padding: 48px;
  text-align: center;
  color: #9ca3af;
  background: #fff;
  border-radius: 16px;
  border: 1px dashed #d1d5db;
}
</style>
