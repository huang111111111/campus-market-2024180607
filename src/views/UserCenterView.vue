<template>
  <section class="page">
    <!-- 个人卡片 -->
    <div class="profile-card">
      <div class="profile-bg" />
      <div class="profile-content">
        <div class="avatar-row">
          <div class="avatar">🧑‍🎓</div>
          <div class="profile-main">
            <h2>软件工程 2023 级 李明</h2>
            <p>东区 3 号楼 · 活跃用户</p>
          </div>
          <button class="edit-btn">✏️ 编辑资料</button>
        </div>
        <div class="stats-row">
          <div class="stat">
            <span class="stat-num">12</span>
            <span class="stat-label">已发布</span>
          </div>
          <div class="stat">
            <span class="stat-num">5</span>
            <span class="stat-label">进行中</span>
          </div>
          <div class="stat">
            <span class="stat-num">7</span>
            <span class="stat-label">已完成</span>
          </div>
          <div class="stat">
            <span class="stat-num">98%</span>
            <span class="stat-label">好评率</span>
          </div>
          <div class="stat">
            <span class="stat-num">3</span>
            <span class="stat-label">未读消息</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 快捷操作 -->
    <div class="quick-actions">
      <RouterLink to="/publish" class="quick-btn">
        <span class="quick-icon">✍️</span>
        <span>发布信息</span>
      </RouterLink>
      <RouterLink to="/message" class="quick-btn">
        <span class="quick-icon">💬</span>
        <span>我的消息</span>
        <span class="quick-badge">3</span>
      </RouterLink>
      <button class="quick-btn">
        <span class="quick-icon">⭐</span>
        <span>我的收藏</span>
      </button>
      <button class="quick-btn">
        <span class="quick-icon">⚙️</span>
        <span>账号设置</span>
      </button>
    </div>

    <!-- 我的发布 -->
    <div class="section-header">
      <h3>我的发布</h3>
      <div class="sub-tabs">
        <button :class="{ active: tab === 'all' }" @click="tab = 'all'">全部</button>
        <button :class="{ active: tab === 'active' }" @click="tab = 'active'">进行中</button>
        <button :class="{ active: tab === 'done' }" @click="tab = 'done'">已完成</button>
      </div>
    </div>

    <div v-if="myItems.length > 0" class="list">
      <article v-for="item in myItems" :key="item.id" class="my-card">
        <div class="my-card-body">
          <div class="my-card-top">
            <h4>{{ item.title }}</h4>
            <span class="status-dot" :class="item.statusType">{{ item.statusText }}</span>
          </div>
          <p class="my-card-desc">{{ item.description }}</p>
          <div class="my-card-meta">
            <span>{{ item.tag }}</span>
            <span>📍 {{ item.location }}</span>
            <span>🕐 {{ item.time }}</span>
          </div>
        </div>
        <div class="my-card-actions">
          <button class="act-btn">编辑</button>
          <button class="act-btn danger">下架</button>
        </div>
      </article>
    </div>

    <div v-else class="empty-box">
      <p>还没有发布过任何信息</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tab = ref('all')

const myItems = ref([
  {
    id: 1, title: '九成新 Cherry 机械键盘',
    description: '键盘使用半年，轴体正常，因升级设备转让，送拔键器。',
    tag: '数码配件', location: '东区 3 号楼', time: '2026-06-20',
    statusText: '在售中', statusType: 'active',
  },
  {
    id: 2, title: '寻找黑色校园卡',
    description: '黑色卡套，内有校园卡和学生证，名字：张晓明。',
    tag: '寻物', location: '一食堂二楼', time: '2026-06-22',
    statusText: '寻找中', statusType: 'active',
  },
  {
    id: 3, title: '《高等数学（第七版）》上下册',
    description: '上册有少量笔记，下册几乎全新，两本一起出。',
    tag: '教材资料', location: '图书馆门口', time: '2026-06-15',
    statusText: '已售出', statusType: 'done',
  },
  {
    id: 4, title: '帮取快递到宿舍楼下',
    description: '一个小包裹，送到楼下快递架即可。',
    tag: '取快递', location: '菜鸟驿站', time: '2026-06-24',
    statusText: '已被接单', statusType: 'active',
  },
  {
    id: 5, title: '周五晚火锅 AA 拼单',
    description: '人均预算 60-80，已有 3 人（2 男 1 女），再找 3 位。',
    tag: '拼餐', location: '学校南门', time: '2026-06-23',
    statusText: '招募中', statusType: 'active',
  },
])
</script>

<style scoped>
.page { display: flex; flex-direction: column; gap: 24px; }

/* 个人卡片 */
.profile-card {
  border-radius: 18px; overflow: hidden; background: #fff; border: 1px solid #e5e7eb;
}
.profile-bg {
  height: 80px;
  background: linear-gradient(135deg, #1e40af 0%, #2563eb 40%, #3b82f6 100%);
}
.profile-content { padding: 0 28px 24px; margin-top: -36px; }
.avatar-row {
  display: flex; align-items: flex-end; gap: 18px;
}
.avatar {
  width: 80px; height: 80px; border-radius: 50%; background: #f3f4f6;
  display: flex; align-items: center; justify-content: center; font-size: 40px;
  border: 4px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.1); flex-shrink: 0;
}
.profile-main { flex: 1; padding-bottom: 8px; }
.profile-main h2 { margin: 0 0 4px; font-size: 20px; }
.profile-main p { margin: 0; font-size: 13px; color: #6b7280; }
.edit-btn {
  padding: 8px 18px; border: 1px solid #e5e7eb; border-radius: 8px;
  background: #fff; font-size: 13px; font-family: inherit; color: #374151;
  cursor: pointer; transition: all 0.2s; margin-bottom: 8px;
}
.edit-btn:hover { border-color: #2563eb; color: #2563eb; }

.stats-row {
  display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 12px;
  margin-top: 20px; padding-top: 20px; border-top: 1px solid #f3f4f6;
}
.stat { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.stat-num { font-size: 22px; font-weight: 700; color: #2563eb; }
.stat-label { font-size: 12px; color: #6b7280; }

/* 快捷操作 */
.quick-actions { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
.quick-btn {
  display: flex; align-items: center; gap: 8px; padding: 16px;
  border-radius: 12px; background: #fff; border: 1px solid #e5e7eb;
  font-size: 14px; font-family: inherit; color: #374151; text-decoration: none;
  cursor: pointer; transition: all 0.2s; position: relative;
}
.quick-btn:hover { border-color: #2563eb; background: #f9fafb; }
.quick-icon { font-size: 20px; }
.quick-badge {
  position: absolute; top: 8px; right: 10px;
  min-width: 18px; height: 18px; border-radius: 999px;
  background: #ef4444; color: #fff; font-size: 11px; font-weight: 700;
  display: flex; align-items: center; justify-content: center; padding: 0 5px;
}

/* 区域标题 */
.section-header { display: flex; justify-content: space-between; align-items: center; }
.section-header h3 { margin: 0; font-size: 18px; }
.sub-tabs { display: flex; gap: 4px; }
.sub-tabs button {
  padding: 6px 16px; border: none; border-radius: 6px; background: transparent;
  font-size: 13px; font-family: inherit; color: #6b7280; cursor: pointer; transition: all 0.2s;
}
.sub-tabs button:hover { color: #2563eb; }
.sub-tabs button.active { background: #eff6ff; color: #2563eb; font-weight: 600; }

/* 我的发布列表 */
.list { display: flex; flex-direction: column; gap: 10px; }
.my-card {
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px 20px; border-radius: 12px; background: #fff;
  border: 1px solid #e5e7eb; transition: all 0.2s;
}
.my-card:hover { box-shadow: 0 2px 10px rgba(0,0,0,0.04); }
.my-card-body { flex: 1; min-width: 0; }
.my-card-top { display: flex; align-items: center; gap: 12px; margin-bottom: 6px; }
.my-card-top h4 { margin: 0; font-size: 15px; }
.status-dot {
  padding: 2px 10px; border-radius: 999px; font-size: 11px; font-weight: 600;
}
.status-dot.active { background: #dcfce7; color: #16a34a; }
.status-dot.done { background: #f3f4f6; color: #9ca3af; }
.my-card-desc { margin: 0 0 6px; font-size: 12px; color: #6b7280; }
.my-card-meta { display: flex; gap: 14px; font-size: 11px; color: #9ca3af; }
.my-card-actions { display: flex; gap: 8px; flex-shrink: 0; margin-left: 16px; }
.act-btn {
  padding: 6px 16px; border: 1px solid #e5e7eb; border-radius: 6px;
  background: #fff; font-size: 12px; font-family: inherit; color: #374151;
  cursor: pointer; transition: all 0.15s;
}
.act-btn:hover { border-color: #2563eb; color: #2563eb; }
.act-btn.danger:hover { border-color: #ef4444; color: #ef4444; }

.empty-box {
  padding: 48px; text-align: center; color: #9ca3af;
  background: #fff; border-radius: 16px; border: 1px dashed #d1d5db;
}
</style>
