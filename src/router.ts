// src/router/index.js
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Home from '@/pages/Home/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { keepAlive: true }
  },
  {
    path: '/game/:name',
    name: 'Game',
    component: () => import('@/pages/Game/index.vue'),
  },
  {
    path: "/bug",
    name: "Bug",
    component: () => import('@/pages/Bug/index.vue'),
  },
  {
    path: "/bug/report",
    name: "Report",
    component: () => import('@/pages/Bug/report.vue'),
  },
  {
    path: "/bug/record",
    name: "Record",
    component: () => import('@/pages/Bug/record.vue'),
  },
  {
    path: "/bug/handle",
    name: "Handle",
    component: () => import('@/pages/Bug/handle.vue'),
  },
  // 未命中的全部redirect到/
  {
    path: "/:pathMatch(.*)*",
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
