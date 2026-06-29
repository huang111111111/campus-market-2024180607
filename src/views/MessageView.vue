<template>
  <section class="msg-page">
    <!-- 左侧会话列表 -->
    <div class="msg-sidebar">
      <div class="sidebar-header">
        <h2>消息</h2>
        <span class="unread-count" v-if="totalUnread > 0">{{ totalUnread }} 条未读</span>
      </div>
      <div class="conversation-list">
        <div
          v-for="conv in conversations"
          :key="conv.id"
          class="conv-item"
          :class="{ active: activeConv?.id === conv.id }"
          @click="openConversation(conv)"
        >
          <div class="conv-avatar">
            <span>{{ conv.avatar }}</span>
            <span v-if="conv.unread" class="dot" />
          </div>
          <div class="conv-body">
            <div class="conv-top">
              <span class="conv-name">{{ conv.name }}</span>
              <span class="conv-time">{{ conv.lastTime }}</span>
            </div>
            <p class="conv-preview">{{ conv.lastMessage }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧聊天面板 -->
    <div class="msg-chat">
      <!-- 未选择会话 -->
      <div v-if="!activeConv" class="chat-empty">
        <span class="empty-icon">💬</span>
        <h3>选择一条消息开始聊天</h3>
        <p>点击左侧会话进入对话</p>
      </div>

      <!-- 聊天内容 -->
      <template v-else>
        <div class="chat-header">
          <div class="chat-header-avatar">{{ activeConv.avatar }}</div>
          <div class="chat-header-info">
            <h3>{{ activeConv.name }}</h3>
            <p>{{ activeConv.subtitle }}</p>
          </div>
        </div>

        <div class="chat-messages" ref="msgListRef">
          <div
            v-for="msg in activeConv.messages"
            :key="msg.id"
            class="msg-bubble"
            :class="{ mine: msg.from === 'me' }"
          >
            <div class="bubble-text">{{ msg.text }}</div>
            <div class="bubble-time">{{ msg.time }}</div>
          </div>
        </div>

        <div class="chat-input-bar">
          <input
            v-model="newMsg"
            class="chat-input"
            placeholder="输入消息……"
            @keyup.enter="sendMessage"
          />
          <button class="send-btn" @click="sendMessage" :disabled="!newMsg.trim()">
            发送
          </button>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'

interface Message {
  id: number
  text: string
  time: string
  from: 'me' | 'them'
}

interface Conversation {
  id: number
  name: string
  avatar: string
  subtitle: string
  lastMessage: string
  lastTime: string
  unread: boolean
  messages: Message[]
}

const activeConv = ref<Conversation | null>(null)
const newMsg = ref('')
const msgListRef = ref<HTMLElement | null>(null)

const conversations = ref<Conversation[]>([
  {
    id: 1,
    name: '李明 · 软件工程',
    avatar: '👦',
    subtitle: '询问机械键盘',
    lastMessage: '好的，那明天下午见！',
    lastTime: '10:30',
    unread: true,
    messages: [
      { id: 1, text: '你好，机械键盘还在吗？我想看看实物', time: '10:05', from: 'them' },
      { id: 2, text: '在的，随时可以来看', time: '10:08', from: 'me' },
      { id: 3, text: '键盘有磨损吗？轴体都正常吗？', time: '10:12', from: 'them' },
      { id: 4, text: '没有磨损，轴体全部正常，你可以当面试试', time: '10:15', from: 'me' },
      { id: 5, text: '我明天下午有空，你在哪个宿舍？', time: '10:20', from: 'them' },
      { id: 6, text: '东区 3 号楼 512，到了给我发消息', time: '10:25', from: 'me' },
      { id: 7, text: '好的，那明天下午见！', time: '10:30', from: 'them' },
    ],
  },
  {
    id: 2,
    name: '赵雪 · 电子信息',
    avatar: '👩',
    subtitle: 'iPad 咨询',
    lastMessage: '那就 2000 吧，我要了',
    lastTime: '昨天',
    unread: true,
    messages: [
      { id: 1, text: 'iPad 还在吗？可以看看实物图吗？', time: '昨天 20:10', from: 'them' },
      { id: 2, text: '在的，我发几张照片给你', time: '昨天 20:12', from: 'me' },
      { id: 3, text: '电池循环多少次了？屏幕有划痕吗？', time: '昨天 20:15', from: 'them' },
      { id: 4, text: '电池健康 95%，屏幕完美无划痕，一直贴膜用', time: '昨天 20:18', from: 'me' },
      { id: 5, text: '价格能再便宜点吗？学生党预算有限😅', time: '昨天 20:25', from: 'them' },
      { id: 6, text: '最低 2000，真的很新了', time: '昨天 20:28', from: 'me' },
      { id: 7, text: '那就 2000 吧，我要了', time: '昨天 21:05', from: 'them' },
    ],
  },
  {
    id: 3,
    name: '系统通知',
    avatar: '🔔',
    subtitle: '平台官方',
    lastMessage: '你的「高等数学教材」收到 3 条新咨询',
    lastTime: '昨天',
    unread: false,
    messages: [
      { id: 1, text: '欢迎使用校园轻集市！🎉', time: '06-20 09:00', from: 'them' },
      { id: 2, text: '你的二手信息「高等数学教材」已发布成功，可以到"我的"页面查看。', time: '昨天 09:00', from: 'them' },
      { id: 3, text: '你的「高等数学教材」收到了 3 条新咨询，点击查看详情。', time: '昨天 14:30', from: 'them' },
    ],
  },
  {
    id: 4,
    name: '王芳 · 数学学院',
    avatar: '👩‍🏫',
    subtitle: '教材交易',
    lastMessage: '教材收到啦，质量不错，谢谢！',
    lastTime: '06-24',
    unread: false,
    messages: [
      { id: 1, text: '你好，高数教材还有吗？', time: '06-23 14:00', from: 'them' },
      { id: 2, text: '有的，两本一起 18', time: '06-23 14:05', from: 'me' },
      { id: 3, text: '我要了，在哪见面交易？', time: '06-23 14:10', from: 'them' },
      { id: 4, text: '图书馆门口怎么样？', time: '06-23 14:12', from: 'me' },
      { id: 5, text: '没问题，下午 3 点行吗？', time: '06-23 14:15', from: 'them' },
      { id: 6, text: 'OK，下午见', time: '06-23 14:16', from: 'me' },
      { id: 7, text: '教材收到啦，质量不错，谢谢！', time: '06-24 15:10', from: 'them' },
    ],
  },
  {
    id: 5,
    name: '周杰 · 计算机学院',
    avatar: '🧑‍💻',
    subtitle: '火锅拼单',
    lastMessage: '火锅拼单还缺人吗？我和室友两个人想加入',
    lastTime: '06-23',
    unread: false,
    messages: [
      { id: 1, text: '火锅拼单还缺人吗？', time: '06-23 18:30', from: 'them' },
      { id: 2, text: '缺的！目前 3 人，加上你们刚好 5 人', time: '06-23 18:32', from: 'me' },
      { id: 3, text: '我和室友两个人想加入，可以吗？', time: '06-23 18:35', from: 'them' },
      { id: 4, text: '完全可以！周五晚上 6 点南门集合，人均预算 60-80', time: '06-23 18:38', from: 'me' },
      { id: 5, text: '好的，我们准时到！', time: '06-23 18:45', from: 'them' },
    ],
  },
  {
    id: 6,
    name: '系统通知',
    avatar: '🔔',
    subtitle: '平台官方',
    lastMessage: '你的跑腿任务「帮取快递」已被接单',
    lastTime: '06-24',
    unread: false,
    messages: [
      { id: 1, text: '你的跑腿任务「帮取快递到西区 5 栋楼下」已被接单。', time: '06-24 12:00', from: 'them' },
      { id: 2, text: '接单人：张晓明（软件工程 2023 级），请保持联系。', time: '06-24 12:00', from: 'them' },
    ],
  },
])

const totalUnread = computed(() => conversations.value.filter(c => c.unread).length)

function openConversation(conv: Conversation) {
  conv.unread = false
  activeConv.value = conv
  newMsg.value = ''
  nextTick(() => {
    if (msgListRef.value) {
      msgListRef.value.scrollTop = msgListRef.value.scrollHeight
    }
  })
}

function sendMessage() {
  if (!newMsg.value.trim() || !activeConv.value) return
  const now = new Date()
  const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
  activeConv.value.messages.push({
    id: Date.now(),
    text: newMsg.value.trim(),
    time,
    from: 'me',
  })
  activeConv.value.lastMessage = newMsg.value.trim()
  activeConv.value.lastTime = time
  newMsg.value = ''
  nextTick(() => {
    if (msgListRef.value) {
      msgListRef.value.scrollTop = msgListRef.value.scrollHeight
    }
  })
}
</script>

<style scoped>
.msg-page {
  display: flex;
  height: calc(100vh - 89px);
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  border: 1px solid #e5e7eb;
}

/* ===== 左侧会话列表 ===== */
.msg-sidebar {
  width: 320px;
  flex-shrink: 0;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px;
  border-bottom: 1px solid #e5e7eb;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 20px;
}

.unread-count {
  font-size: 12px;
  color: #2563eb;
  background: #eff6ff;
  padding: 3px 10px;
  border-radius: 999px;
  font-weight: 600;
}

.conversation-list {
  flex: 1;
  overflow-y: auto;
}

.conv-item {
  display: flex;
  gap: 12px;
  padding: 14px 20px;
  cursor: pointer;
  transition: background 0.15s;
  position: relative;
}

.conv-item:hover {
  background: #f9fafb;
}

.conv-item.active {
  background: #eff6ff;
}

.conv-item + .conv-item {
  border-top: 1px solid #f3f4f6;
}

.conv-avatar {
  position: relative;
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

.dot {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #2563eb;
  border: 2px solid #fff;
}

.conv-body {
  flex: 1;
  min-width: 0;
}

.conv-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 3px;
}

.conv-name {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
}

.conv-time {
  font-size: 11px;
  color: #9ca3af;
  flex-shrink: 0;
  margin-left: 8px;
}

.conv-preview {
  margin: 0;
  font-size: 12px;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ===== 右侧聊天面板 ===== */
.msg-chat {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.chat-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
}

.empty-icon {
  font-size: 56px;
  margin-bottom: 16px;
}

.chat-empty h3 {
  margin: 0 0 6px;
  color: #6b7280;
  font-size: 18px;
}

.chat-empty p {
  margin: 0;
  font-size: 14px;
}

/* 聊天头部 */
.chat-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  border-bottom: 1px solid #e5e7eb;
  background: #fafbfc;
}

.chat-header-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.chat-header-info h3 {
  margin: 0 0 1px;
  font-size: 15px;
}

.chat-header-info p {
  margin: 0;
  font-size: 12px;
  color: #9ca3af;
}

/* 消息列表 */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  background: #f9fafb;
}

.msg-bubble {
  display: flex;
  flex-direction: column;
  max-width: 70%;
  align-self: flex-start;
}

.msg-bubble.mine {
  align-self: flex-end;
}

.bubble-text {
  padding: 10px 16px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 1.6;
  word-break: break-word;
}

.msg-bubble:not(.mine) .bubble-text {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-bottom-left-radius: 4px;
  color: #1f2937;
}

.msg-bubble.mine .bubble-text {
  background: #2563eb;
  color: #fff;
  border-bottom-right-radius: 4px;
}

.bubble-time {
  font-size: 11px;
  color: #9ca3af;
  margin-top: 4px;
  padding: 0 4px;
}

.msg-bubble.mine .bubble-time {
  text-align: right;
}

/* 输入栏 */
.chat-input-bar {
  display: flex;
  gap: 10px;
  padding: 14px 20px;
  border-top: 1px solid #e5e7eb;
  background: #fff;
}

.chat-input {
  flex: 1;
  padding: 10px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 24px;
  font-size: 14px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s;
}

.chat-input:focus {
  border-color: #2563eb;
}

.send-btn {
  padding: 10px 24px;
  border: none;
  border-radius: 24px;
  background: #2563eb;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.2s;
}

.send-btn:hover:not(:disabled) {
  background: #1d4ed8;
}

.send-btn:disabled {
  background: #d1d5db;
  cursor: not-allowed;
}
</style>
