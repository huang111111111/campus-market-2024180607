# Day5 Evidence - 状态管理与用户中心

## 1. 今日完成内容

本日完成了"校园轻集市"项目的 Pinia 状态管理引入和用户中心功能完善，具体包括：

- 创建 **src/stores/user.ts**，使用 Pinia 管理当前用户信息（用户名、学院、年级、简介、登录状态）
- 创建 **src/stores/favorite.ts**，使用 Pinia 管理收藏状态（收藏列表、添加收藏、取消收藏、判断收藏状态）
- 更新 **AppHeader.vue** 导航栏，在右侧显示当前用户名称（来自 userStore）
- 更新 **PublishView.vue** 发布页面，publisher 字段改为读取 userStore.displayName
- 在 **TradeView.vue、LostFoundView.vue、GroupBuyView.vue、ErrandView.vue** 四个列表页面中添加收藏/取消收藏按钮
- 重写 **UserCenterView.vue** 个人中心，集成 userStore 展示用户资料、favoriteStore 展示我的收藏列表

## 2. Store 设计说明

| Store 文件 | 管理内容 | 主要 state | 主要 getters | 主要 actions |
|---|---|---|---|---|
| src/stores/user.ts | 当前用户信息 | isLoggedIn、currentUser (id/name/college/grade/bio) | displayName、userDescription | updateProfile、login、logout |
| src/stores/favorite.ts | 收藏状态 | favorites (FavoriteItem[]) | favoriteCount | addFavorite、removeFavorite、toggleFavorite、isFavorite |

### userStore 设计
- **为什么需要 isLoggedIn**：虽然 Day5 不实现真实登录，但保留登录状态字段为后续扩展做准备
- **为什么需要 displayName getter**：多个页面需要显示用户名，使用 getter 统一获取，避免直接访问 state 内部结构
- **为什么需要 userDescription getter**：拼合学院和年级信息，个人中心需要这种格式化的展示文本

### favoriteStore 设计
- **为什么使用统一的 FavoriteItem 接口**：四类业务（二手/失物/拼单/跑腿）的收藏数据结构化统一，通过 type 字段区分业务类型
- **为什么需要 isFavorite 方法**：列表页需要判断某条数据是否已收藏，用于切换按钮文字和样式
- **为什么需要 toggleFavorite**：一个操作完成添加/取消的判断，简化组件中的调用逻辑

## 3. 状态边界说明

### 放入 Store 的数据
| 数据 | 放入的 Store | 原因 |
|---|---|---|
| 当前用户信息 | userStore | 导航栏、发布页、个人中心等多个位置都需要使用 |
| 收藏列表 | favoriteStore | 四个列表页和个人中心都需要读写收藏状态 |

### 不放入 Store 的数据
| 数据 | 存放位置 | 原因 |
|---|---|---|
| 表单临时输入内容 | PublishView.vue 组件内 | 只有发布页面使用，不需要跨组件共享 |
| 表单校验错误信息 | PublishView.vue 组件内 | 属于当前表单的临时 UI 状态，不跨页面 |
| 接口返回的列表数据 | 各 View 组件内 (ref) | 每个列表页面独立请求和筛选，暂无跨页面共享需求 |
| 分类筛选状态 | 各 View 组件内 (ref) | 筛选条件是当前页面的 UI 状态 |
| 消息会话数据 | MessageView.vue 组件内 | 消息中心数据仅在消息页面使用 |

**状态边界判断原则**：只有多个页面或多个组件需要同时读写的状态才放入 Store。单一页面独享的数据保持在组件内部，避免 Store 膨胀。

## 4. 页面使用记录

| 组件/页面 | 使用的 Store | 使用方式 |
|---|---|---|
| AppHeader.vue | userStore | 读取 displayName 在导航栏右侧显示当前用户 |
| PublishView.vue | userStore | 读取 displayName 作为发布数据的 publisher 字段 |
| TradeView.vue | favoriteStore | 收藏按钮 toggleFavorite / 按钮文字 isFavorite |
| LostFoundView.vue | favoriteStore | 收藏按钮 toggleFavorite / 按钮文字 isFavorite |
| GroupBuyView.vue | favoriteStore | 收藏按钮 toggleFavorite / 按钮文字 isFavorite |
| ErrandView.vue | favoriteStore | 收藏按钮 toggleFavorite / 按钮文字 isFavorite |
| UserCenterView.vue | userStore + favoriteStore | 用户资料展示、收藏列表展示、收藏数统计、取消收藏 |

## 5. AI 协作记录

### 使用的 AI 工具
- Claude Code（Anthropic 的 AI 编程助手）

### 核心提示词
我向 AI 提供了 Day5 完整实训文档，包含所有 Task 的详细说明、Store 代码示例、组件更新示例和个人中心页面结构。

### AI 生成内容
1. **userStore**：按实训文档模板生成，包含 CurrentUser 接口、state/getters/actions
2. **favoriteStore**：按实训文档模板生成，包含 FavoriteItem 接口、收藏增删查切换逻辑
3. **AppHeader 用户显示**：在导航栏右侧添加用户名称
4. **PublishView publisher 改造**：从硬编码改为读取 userStore
5. **四个列表页收藏按钮**：为每类业务卡片底部添加收藏/已收藏切换按钮
6. **UserCenterView 重写**：集成两个 Store，用户资料动态展示、收藏列表动态渲染、统计数据显示

### AI 生成内容的审查
- ✅ Store 划分合理，userStore 和 favoriteStore 职责清晰
- ✅ 状态边界正确，没有把所有数据都放入 Store
- ✅ getter/action 命名清晰，displayName、isFavorite、toggleFavorite 等语义明确
- ✅ 收藏逻辑正确：能添加、取消、判断状态
- ✅ 未生成复杂登录系统、JWT、权限路由等内容

## 6. 人工调整内容

| 调整内容 | 调整原因 |
|---|---|
| 保留了 UserCenterView 原有精美设计 | 原有渐变色个人卡片、网格快捷操作、统计数字等视觉效果很好，值得保留 |
| 在 UserCenterView 中增加了 bio 行 | 个人简介是用户资料的重要组成部分，用 userStore.currentUser.bio 动态显示 |
| 收藏数集成到统计行 | 把"收藏数"作为第 5 个统计指标，替代原来无意义的"未读消息"统计 |
| 收藏按钮样式统一为圆角白色按钮 | 与各页面的卡片底部按钮风格保持一致，hover 时变黄色边框 |
| 拼单页面收藏按钮仅显示图标（❤️/🤍） | 拼单底部已有"我要加入"按钮，收藏按钮用图标更简洁 |
| 跑腿页面 location 合并 from/to 路线 | 跑腿的路线信息用 "取件地 → 送达地" 格式存入收藏 location 字段 |
| 保留了"我的发布"模拟数据 | Day5 不必立即接入 API 筛选，先用模拟数据展示结构，后续可改造为按 publisher 筛选 |
| 收藏数据暂不持久化 | Day5 接受刷新后收藏丢失，后续可加 localStorage 或后端接口 |

## 7. 测试记录

### 测试 1：导航栏显示用户名
1. 启动 dev server 后访问首页
2. 导航栏右侧显示"校园用户"（来自 userStore.displayName）✅

### 测试 2：发布页面读取用户状态
1. 访问发布页面 /publish，填写二手交易表单
2. 点击发布后，在 /trade 列表中查看新增数据
3. 发布人字段显示为"校园用户"（不再显示"当前用户"）✅

### 测试 3：收藏与取消收藏
1. 在二手交易页面 /trade，点击第一条的"🤍 收藏"按钮
2. 按钮文字变为"❤️ 已收藏" ✅
3. 进入个人中心 /user，收藏列表出现该条数据 ✅
4. 点击"取消收藏"按钮，该数据从收藏列表消失 ✅
5. 返回 /trade 页面，对应按钮恢复为"🤍 收藏" ✅

### 测试 4：跨类型收藏
1. 分别在二手交易、失物招领、拼单搭子、跑腿委托页面各收藏一条
2. 进入个人中心，收藏列表显示 4 条不同业务的收藏
3. 每条收藏显示对应的类型标签（二手交易/失物招领/拼单搭子/跑腿委托）✅

## 8. 遇到的问题与解决方法

### 问题 1：TypeScript 报 "favoriteStore declared but never read" hint
- **现象**：在 LostFoundView.vue 等文件的 script 中声明 favoriteStore，TypeScript hint 提示未读取
- **原因**：TypeScript 无法识别 Vue SFC 模板中的变量使用，favoriteStore 是在 `<template>` 中通过 `@click` 和 `{{ }}` 使用的
- **解决**：这是 Vue 开发的正常现象，运行时完全正常。不需要修改代码，TypeScript 编译也通过了

### 问题 2：刷新页面后收藏数据丢失
- **现象**：收藏了一些信息后刷新浏览器，收藏全部消失
- **原因**：Pinia 状态默认保存在内存中，刷新页面后重新初始化为空数组
- **解决**：这是 Day5 阶段的预期行为。在证据卡中记录此现象，后续可通过 localStorage 持久化或后端接口解决。Day5 不要求持久化

### 问题 3：无法连接 GitHub 推送
- **现象**：`git push origin master` 连接超时
- **原因**：当前网络无法直接访问 GitHub
- **解决**：本地 commit 已完成，代码不会丢失。待网络通畅后再执行 git push

## 9. 今日反思

**Pinia 状态管理**是前端应用从"单页面功能"走向"多页面协同"的关键技术。在"校园轻集市"的前四天开发中，每个页面的数据都是独立的——列表页各自请求接口、发布页只管提交表单。但从 Day5 开始，我意识到不同页面之间需要共享数据：导航栏需要显示当前用户名，发布页需要知道是谁在发布，列表页和个人中心需要同步收藏状态。如果没有统一的状态管理，这些共享数据只能通过 props 层层传递或 URL 参数拼接，代码会变得越来越难以维护。

**状态管理**的核心不是"把所有数据集中存放"，而是"只把跨页面共享的数据集中存放"。今天设计 Store 时，我刻意区分了哪些数据适合放入 Store（用户信息、收藏列表），哪些不适合（表单临时输入、校验错误、单个页面的列表数据）。这个边界判断能力比会写 defineStore 更重要。

**用户中心**是状态管理价值的集中体现。个人中心页面同时依赖 userStore 和 favoriteStore——用户信息来自一个 Store，收藏列表来自另一个 Store，两者在同一个页面中展示不同的信息维度。Store 让这种多来源数据的聚合变得简单：不需要在页面中做复杂的数据请求和组合，直接从 Store 中读取即可。

Day5 的实践让我理解了一个重要原则：好的状态管理不是让代码更复杂，而是让不同页面和组件的协作更简单。如果 Store 设计清晰、状态边界明确，后续 Day6 的交互优化和用户体验完善就会事半功倍。

---

**关键词**：Pinia、状态管理、用户中心
