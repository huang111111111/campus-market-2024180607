import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('../views/ListView.vue')
  },
  {
    path: '/publish',
    name: 'Publish',
    component: () => import('../views/PublishView.vue')
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('../views/MessageView.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/ProfileView.vue')
  },
  {
    path: '/board',
    name: 'Board',
    component: () => import('../views/BoardView.vue')
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('../views/DetailView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router