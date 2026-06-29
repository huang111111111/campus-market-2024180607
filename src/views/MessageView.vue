<template>
  <section class="page">
    <div class="page-header">
      <h1>消息中心</h1>
      <p>查看私信、系统通知和互动消息。</p>
    </div>

    <!-- 消息分类切换 -->
    <div class="msg-tabs">
      <button
        v-for="tab in msgTabs"
        :key="tab.key"
        class="msg-tab"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
        <span v-if="tab.badge" class="badge">{{ tab.badge }}</span>
      </button>
    </div>

    <!-- 消息列表 -->
    <div v-if="messages.length > 0" class="msg-list">
      <div
        v-for="msg in messages"
        :key="msg.id"
        class="msg-card"
        :class="{ unread: msg.unread }"
      >
        <div class="msg-avatar">{{ msg.avatar }}</div>
        <div class="msg-body">
          <div class="msg-top">
            <span class="msg-name">{{ msg.name }}</span>
            <span class="msg-time">{{ msg.time }}</span>
          </div>
          <p class="msg-preview">{{ msg.preview }}</p>
        </div>
        <div v-if="msg.unread" class="unread-dot" />
      </div>
    </div>

    <!-- 空状态 -->
    <div v-else class="empty-box">
      <p>暂无消息</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('all')

const msgTabs = [
  { key: 'all', label: '全部', badge: 3 },
  { key: 'chat', label: '私信', badge: 2 },
  { key: 'system', label: '系统通知', badge: 1 },
]

const messages = ref([
  {
    id: 1,
    avatar: '👤',
    name: '李明（软件工程）',
    time: '今天 10:20',
    preview: '你好，机械键盘还在吗？我想看看实物……',
    unread: true,
    type: 'chat',
  },
  {
    id: 2,
    avatar: '🔔',
    name: '系统通知',
    time: '今天 09:00',
    preview: '你发布的「高等数学教材」收到了 3 条新咨询。',
    unread: true,
    type: 'system',
  },
  {
    id: 3,
    avatar: '👤',
    name: '赵雪（电子信息）',
    time: '昨天 21:30',
    preview: 'iPad 还在吗？电池循环多少次？可以小刀吗？',
    unread: true,
    type: 'chat',
  },
  {
    id: 4,
    avatar: '👤',
    name: '王芳（数学学院）',
    time: '昨天 15:10',
    preview: '教材已经收到啦，质量不错，谢谢！',
    unread: false,
    type: 'chat',
  },
  {
    id: 5,
    avatar: '🔔',
    name: '系统通知',
    time: '06-24 12:00',
    preview: '你的跑腿任务「帮取快递」已被接单，请查看详情。',
    unread: false,
    type: 'system',
  },
  {
    id: 6,
    avatar: '👤',
    name: '周杰（计算机学院）',
    time: '06-23 18:45',
    preview: '火锅拼单还缺人吗？我和室友两个人想加入。',
    unread: false,
    type: 'chat',
  },
])
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

/* 消息分类 */
.msg-tabs {
  display: flex;
  gap: 8px;
}

.msg-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 20px;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  background: #fff;
  font-size: 14px;
  font-family: inherit;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
}

.msg-tab:hover {
  border-color: #93c5fd;
}

.msg-tab.active {
  background: #2563eb;
  color: #fff;
  border-color: #2563eb;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 999px;
  background: #ef4444;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
}

.msg-tab.active .badge {
  background: #fff;
  color: #2563eb;
}

/* 消息列表 */
.msg-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
}

.msg-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  cursor: pointer;
  transition: background 0.15s;
  position: relative;
}

.msg-card:hover {
  background: #f9fafb;
}

.msg-card + .msg-card {
  border-top: 1px solid #f3f4f6;
}

.msg-card.unread {
  background: #eff6ff;
}

.msg-card.unread:hover {
  background: #dbeafe;
}

.msg-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.msg-body {
  flex: 1;
  min-width: 0;
}

.msg-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.msg-name {
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
}

.msg-time {
  font-size: 12px;
  color: #9ca3af;
  flex-shrink: 0;
  margin-left: 12px;
}

.msg-preview {
  margin: 0;
  font-size: 13px;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.unread-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #2563eb;
  flex-shrink: 0;
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
