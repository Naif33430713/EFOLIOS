import { createRouter, createWebHistory } from 'vue-router'
import GetBookCountView from '../views/GetBookCountView.vue'

const routes = [
  {
    path: '/',
    redirect: '/get-book-count'   // redirect homepage to book counter
  },
  {
    path: '/get-book-count',
    name: 'GetBookCount',
    component: GetBookCountView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router