<template>
  <section class="page">
    <div class="page-header">
      <h1>发布信息</h1>
      <p>选择信息类型，填写详情，即可发布到校园轻集市。</p>
    </div>

    <!-- 类型选择 -->
    <div class="type-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="type-tab"
        :class="{ active: activeType === tab.key }"
        @click="activeType = tab.key"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        <span class="tab-label">{{ tab.label }}</span>
      </button>
    </div>

    <!-- 二手交易表单 -->
    <form v-if="activeType === 'trade'" class="publish-form" @submit.prevent="handleSubmit">
      <div class="form-row">
        <div class="form-group">
          <label>商品标题</label>
          <input v-model="form.trade.title" placeholder="例如：九成新机械键盘" />
        </div>
        <div class="form-group narrow">
          <label>分类</label>
          <select v-model="form.trade.category">
            <option value="">请选择</option>
            <option>数码配件</option>
            <option>教材资料</option>
            <option>宿舍生活</option>
            <option>运动出行</option>
            <option>服饰美妆</option>
            <option>其他</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group narrow">
          <label>价格 (元)</label>
          <input v-model.number="form.trade.price" type="number" placeholder="0" />
        </div>
        <div class="form-group narrow">
          <label>成色</label>
          <select v-model="form.trade.condition">
            <option value="">请选择</option>
            <option>全新</option>
            <option>九五新</option>
            <option>九成新</option>
            <option>八成新</option>
            <option>七成新</option>
          </select>
        </div>
        <div class="form-group">
          <label>交易地点</label>
          <input v-model="form.trade.location" placeholder="例如：东区 3 号楼" />
        </div>
      </div>
      <div class="form-group">
        <label>商品描述</label>
        <textarea v-model="form.trade.description" rows="3" placeholder="描述一下商品的使用情况、出售原因……" />
      </div>
      <button type="submit" class="submit-btn">发布二手信息</button>
    </form>

    <!-- 失物招领表单 -->
    <form v-if="activeType === 'lostFound'" class="publish-form" @submit.prevent="handleSubmit">
      <div class="form-row">
        <div class="form-group narrow">
          <label>类型</label>
          <select v-model="form.lostFound.type">
            <option value="">请选择</option>
            <option value="lost">寻物启事</option>
            <option value="found">失物招领</option>
          </select>
        </div>
        <div class="form-group">
          <label>物品名称</label>
          <input v-model="form.lostFound.itemName" placeholder="例如：校园卡、雨伞" />
        </div>
      </div>
      <div class="form-group">
        <label>标题</label>
        <input v-model="form.lostFound.title" placeholder="例如：寻找黑色校园卡" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>地点</label>
          <input v-model="form.lostFound.location" placeholder="例如：一食堂二楼" />
        </div>
        <div class="form-group narrow">
          <label>时间</label>
          <input v-model="form.lostFound.eventTime" type="datetime-local" />
        </div>
      </div>
      <div class="form-group">
        <label>联系方式</label>
        <input v-model="form.lostFound.contact" placeholder="QQ / 微信 / 手机号" />
      </div>
      <div class="form-group">
        <label>详细描述</label>
        <textarea v-model="form.lostFound.description" rows="3" placeholder="描述物品特征、丢失/拾到经过……" />
      </div>
      <button type="submit" class="submit-btn">发布招领信息</button>
    </form>

    <!-- 拼单搭子表单 -->
    <form v-if="activeType === 'groupBuy'" class="publish-form" @submit.prevent="handleSubmit">
      <div class="form-row">
        <div class="form-group">
          <label>拼单标题</label>
          <input v-model="form.groupBuy.title" placeholder="例如：周五晚南门火锅 AA 拼单" />
        </div>
        <div class="form-group narrow">
          <label>类型</label>
          <select v-model="form.groupBuy.type">
            <option value="">请选择</option>
            <option>拼餐</option>
            <option>学习资料</option>
            <option>运动搭子</option>
            <option>学习搭子</option>
            <option>出行拼车</option>
            <option>其他</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group narrow">
          <label>目标人数</label>
          <input v-model.number="form.groupBuy.targetCount" type="number" min="2" placeholder="6" />
        </div>
        <div class="form-group">
          <label>活动地点</label>
          <input v-model="form.groupBuy.location" placeholder="例如：学校南门" />
        </div>
        <div class="form-group narrow">
          <label>截止时间</label>
          <input v-model="form.groupBuy.deadline" type="datetime-local" />
        </div>
      </div>
      <div class="form-group">
        <label>详细描述</label>
        <textarea v-model="form.groupBuy.description" rows="3" placeholder="描述拼单详情、费用分摊方式……" />
      </div>
      <button type="submit" class="submit-btn">发布拼单信息</button>
    </form>

    <!-- 跑腿委托表单 -->
    <form v-if="activeType === 'errand'" class="publish-form" @submit.prevent="handleSubmit">
      <div class="form-row">
        <div class="form-group">
          <label>任务标题</label>
          <input v-model="form.errand.title" placeholder="例如：帮取快递到宿舍楼下" />
        </div>
        <div class="form-group narrow">
          <label>任务类型</label>
          <select v-model="form.errand.taskType">
            <option value="">请选择</option>
            <option>取快递</option>
            <option>代买</option>
            <option>代办事</option>
            <option>搬运</option>
            <option>其他</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>取件/出发地</label>
          <input v-model="form.errand.from" placeholder="例如：菜鸟驿站" />
        </div>
        <div class="form-group">
          <label>送达/目的地</label>
          <input v-model="form.errand.to" placeholder="例如：西区 5 栋楼下" />
        </div>
        <div class="form-group narrow">
          <label>酬劳 (元)</label>
          <input v-model.number="form.errand.reward" type="number" min="1" placeholder="5" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group narrow">
          <label>截止时间</label>
          <input v-model="form.errand.deadline" type="datetime-local" />
        </div>
      </div>
      <div class="form-group">
        <label>任务描述</label>
        <textarea v-model="form.errand.description" rows="3" placeholder="描述具体要求、注意事项……" />
      </div>
      <button type="submit" class="submit-btn">发布跑腿任务</button>
    </form>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const activeType = ref<'trade' | 'lostFound' | 'groupBuy' | 'errand'>('trade')

const tabs = [
  { key: 'trade' as const, label: '二手交易', icon: '📦' },
  { key: 'lostFound' as const, label: '失物招领', icon: '🔍' },
  { key: 'groupBuy' as const, label: '拼单搭子', icon: '👥' },
  { key: 'errand' as const, label: '跑腿委托', icon: '🏃' },
]

const form = reactive({
  trade: {
    title: '',
    category: '',
    price: 0,
    condition: '',
    location: '',
    description: '',
  },
  lostFound: {
    title: '',
    type: '' as 'lost' | 'found' | '',
    itemName: '',
    location: '',
    eventTime: '',
    contact: '',
    description: '',
  },
  groupBuy: {
    title: '',
    type: '',
    targetCount: 2,
    location: '',
    deadline: '',
    description: '',
  },
  errand: {
    title: '',
    taskType: '',
    from: '',
    to: '',
    reward: 1,
    deadline: '',
    description: '',
  },
})

function handleSubmit() {
  alert('发布成功！（功能将在 Day4 接入后端 API）')
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 24px;
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

/* 类型切换 */
.type-tabs {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.type-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 16px;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  background: #fff;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  font-size: 14px;
  color: #374151;
}

.type-tab:hover {
  border-color: #93c5fd;
  background: #eff6ff;
}

.type-tab.active {
  border-color: #2563eb;
  background: #eff6ff;
  color: #2563eb;
  font-weight: 600;
}

.tab-icon {
  font-size: 24px;
}

.tab-label {
  font-size: 13px;
}

/* 表单 */
.publish-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid #e5e7eb;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group.narrow {
  max-width: 200px;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  color: #1f2937;
  background: #f9fafb;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  background: #fff;
}

.form-group textarea {
  resize: vertical;
}

.submit-btn {
  align-self: flex-start;
  padding: 12px 32px;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.2s;
}

.submit-btn:hover {
  background: #1d4ed8;
}
</style>
