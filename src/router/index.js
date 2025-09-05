import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import AdminView from '../views/AdminView.vue'
import DashboardView from '../views/DashboardView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/register', name: 'FirebaseRegister', component: FirebaseRegisterView },
  { path: '/signin', name: 'FirebaseSignin', component: FirebaseSigninView },
  { path: '/admin', name: 'Admin', component: AdminView },
  { path: '/dashboard', name: 'Dashboard', component: DashboardView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router