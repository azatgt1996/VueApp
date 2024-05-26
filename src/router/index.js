import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/', component: () => import('@/pages/MainPage.vue') },
  { path: '/lesson-session', component: () => import('@/pages/LessonSessionPage.vue') },
  { path: '/:pathMatch(.*)*', component: () => import('@/pages/EmptyPage.vue') },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})