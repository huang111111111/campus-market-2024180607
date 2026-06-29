# Day3 Evidence - Mock 数据建模与列表渲染

## 1. 今日完成内容

本日完成了"校园轻集市"项目的 Mock 数据建模、JSON Server 接口模拟、Axios 请求封装与页面列表渲染，具体包括：

- 在项目根目录创建 **db.json**，设计四类核心业务 Mock 数据（二手交易、失物招领、拼单搭子、跑腿委托），每类至少 6-7 条
- 安装并配置 **JSON Server**，在 package.json 中添加 `mock` 启动命令
- 创建 **src/api/http.ts** 封装 Axios 基础请求实例
- 创建四个业务 API 模块：**trade.ts、lostFound.ts、groupBuy.ts、errand.ts**
- 创建可复用组件 **ItemCard.vue**（列表卡片）和 **EmptyState.vue**（空数据状态）
- 更新 **TradeView.vue、LostFoundView.vue、GroupBuyView.vue、ErrandView.vue** 四个核心页面，实现接口数据请求和列表渲染
- 修复 HomeView.vue 中遗留的代码错误

## 2. Mock 数据结构说明

| 数据集合 | 对应业务 | 主要字段 | 页面用途 |
|---|---|---|---|
| trades | 二手交易 | title、category、price、condition、location、publisher、publishTime、status、description | 展示二手商品列表，按价格、成色、分类浏览 |
| lostFounds | 失物招领 | title、type、itemName、location、eventTime、contact、status、description | 展示寻物和招领信息，区分丢失/拾到类型 |
| groupBuys | 拼单搭子 | title、type、targetCount、currentCount、deadline、location、publisher、status、description | 展示拼单和搭子信息，显示人数进度 |
| errands | 跑腿委托 | title、taskType、reward、from、to、deadline、publisher、status、description | 展示跑腿任务列表，显示路线和酬劳 |

## 3. 我的设计

### 二手交易（trades）
- **为什么需要 price 和 condition**：二手交易的核心是价格和商品成色。price 用数字类型方便排序和筛选，condition 用文字描述（九五新/九成新/八成新等）直观反映商品状态
- **为什么需要 category**：校园二手商品类型多样（教材、数码、生活用品、运动出行等），分类字段帮助用户快速筛选感兴趣的商品
- **为什么需要 location**：校园内不同宿舍区、教学楼之间距离不同，地点信息影响交易意愿
- **为什么需要 status**：区分"在售"和"已售"状态，避免用户浏览已失效信息

### 失物招领（lostFounds）
- **为什么需要 type 字段**：失物招领分为"寻物（lost）"和"招领（found）"两种场景，type 字段让页面可以根据类型显示不同标签样式，用户一眼可区分
- **为什么需要 itemName**：与 title 区分，title 是概括描述（如"寻找黑色校园卡"），itemName 是物品本身名称（如"校园卡"），便于分类检索
- **为什么需要 contact**：失物招领的特殊性在于需要联系方式让双方对接，这是其他业务不需要的字段

### 拼单搭子（groupBuys）
- **为什么需要 targetCount 和 currentCount**：拼单的核心是"凑人数"，两个字段配合可以计算拼单进度百分比，在页面上用进度条直观展示
- **为什么需要 deadline**：拼单有时间限制，过期后自动失效，这是区分"紧急拼单"和"已过期拼单"的关键字段
- **为什么 type 覆盖范围广**：从"拼餐"到"学习搭子"到"出行拼车"，校园拼单场景多样，type 字段灵活分类

### 跑腿委托（errands）
- **为什么需要 from 和 to**：跑腿任务的核心是"从哪里到哪里"，from/to 两个字段清晰描述任务路线，在页面上用箭头连接展示
- **为什么需要 reward**：酬劳是接单方的直接动力，用数字类型方便排序
- **为什么需要 taskType**：区分取快递、代买、代办事、搬运等不同类型，每种类型的紧急程度和难度不同

## 4. AI 设计

本日通过 AI 工具辅助完成了以下内容：

### AI 生成内容
- **db.json 整体结构**：AI 帮助生成了四类业务的基础 JSON 结构，包括字段定义和 6-7 条校园场景 Mock 数据
- **API 模块封装**：AI 提供了 http.ts 和四个业务 API 模块的 TypeScript 代码，包含接口类型定义和请求方法
- **ItemCard.vue 通用组件**：AI 设计了卡片组件结构，使用具名插槽 footer 让各页面填充不同底部内容
- **四页面数据渲染**：AI 为四个核心视图页面编写了数据请求和列表渲染代码

### AI 设计的优点
- 数据结构层次清晰，字段命名统一（驼峰命名）
- TypeScript 接口定义完整，有良好的类型提示
- 组件使用插槽机制实现可复用性
- 代码遵循 Vue3 Composition API 规范

### AI 设计的问题与调整
1. **AI 最初生成的数据条数不足**：初始只有 2 条示例数据，我补充到每类 6-7 条，覆盖更多校园场景
2. **AI 未区分 itemName 和 title**：在 lostFounds 中，AI 最初将物品名称和描述混在一起，我明确拆分为两个独立字段
3. **AI 生成的 HomeView 存在代码错误**：页面末尾出现 `</digit push -u origin master` 残留字符，我完整重写了该页面
4. **AI 初始未添加加载状态**：我增加了 loading 状态变量和 EmptyState 空数据组件，覆盖数据为空的情况
5. **AI 建议过度复杂的数据结构**：曾建议添加用户表、订单表、评论表等，Day3 阶段不需要，我明确拒绝了这些设计

## 5. 最终调整

| 调整内容 | 调整原因 |
|---|---|
| 每类数据补充到 6-7 条 | 满足"至少 5 条"要求，覆盖更多校园场景（含不同宿舍区、不同学院、不同商品类型） |
| 删除 AI 建议的用户/订单/评论表 | Day3 仅需四类核心业务数据，复杂关联关系留到后续 |
| 统一数据时间到 2026 年 6 月 | 让数据看起来真实，贴近学期末校园场景 |
| 增加丢失物品的 contact 字段多样化 | 包括 QQ、微信、站内私信、手机号等，模拟真实场景 |
| 跑腿任务增加 reward 数值多样化 | 从 3 元到 10 元，体现任务难度的差异 |
| 拼单搭子增加 currentCount/targetCount 比例多样化 | 有刚发起的（2/6）、进行中的（5/8）、快满的（7/10），体现不同进度 |
| 修复 HomeView.vue 的残留错误代码 | 原页面末尾有 git 命令残留，完整重写为标准 Vue SFC |
| 增加 loading 状态和 EmptyState 组件 | 覆盖数据加载中和数据为空两种状态，改善用户体验 |

## 6. 遇到的问题与解决方法

### 问题 1：pnpm 命令不可用
- **现象**：在 Git Bash 终端中执行 `pnpm add axios` 提示 `pnpm: command not found`
- **原因**：系统未全局安装 pnpm，或 pnpm 未加入 PATH 环境变量
- **解决**：改用 npm 执行安装命令，`npm install axios` 和 `npm install -D json-server`，安装成功

### 问题 2：代码文件编辑后工具提示文件未读取
- **现象**：使用 Edit 工具修改 package.json 时提示 "File has not been read yet"
- **原因**：工具要求在当前会话中 Read 过目标文件才能 Edit
- **解决**：重新 Read 文件后再执行 Edit，确保工具上下文包含文件内容

## 7. 今日反思

**Mock 数据**建模是前端开发从"静态页面"走向"数据驱动页面"的关键一步。通过分析"校园轻集市"的四类核心业务，我理解了数据字段不是随意定义的——二手交易需要价格和成色，失物招领需要区分寻物和招领类型，拼单搭子需要人数进度，跑腿任务需要路线描述。每类业务的字段选择都服务于页面展示和用户使用场景。

**JSON Server** 提供了一个轻量级的 Mock API 方案，让我们在不需要真实后端的情况下就能模拟完整的请求-响应流程。这种开发方式让前端可以独立验证页面渲染逻辑，也方便后续替换为真实后端接口。

**列表渲染**将数据驱动的理念落实到页面上。通过 ItemCard 组件的复用和具名插槽的设计，四个业务页面保持了统一的视觉风格，同时每个页面又能根据自身业务特点展示不同的底部信息（二手的价格和成色、拼单的进度条、跑腿的路线和酬劳）。

今天的实践让我理解了：好的数据结构设计是后续开发的基础。如果字段定义混乱，后面的状态管理、表单提交、数据筛选都会越来越困难。Day3 的 Mock 数据建模虽然不追求完整，但它为 Day4 的发布表单、Day5 的 Pinia 状态管理、Day6 的交互优化铺平了道路。

---

**关键词**：Mock 数据、JSON Server、列表渲染
