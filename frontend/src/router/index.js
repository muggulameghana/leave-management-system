import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth.js'
const routes = [
  { path: '/', component: () => import('../views/LandingPage.vue'), meta: { public: true } },
  { path: '/login', component: () => import('../views/LoginView.vue'), meta: { guest: true } },
  { path: '/signup', component: () => import('../views/SignupView.vue'), meta: { guest: true } },
  { path: '/employee', component: () => import('../views/EmployeeDashboard.vue'), meta: { auth: true, role: 'employee' } },
  { path: '/employer', component: () => import('../views/EmployerDashboard.vue'), meta: { auth: true, role: 'employer' } },
]
const router = createRouter({ history: createWebHistory(), routes })
router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.auth && !auth.isLoggedIn) return '/login'
  if (to.meta.guest && auth.isLoggedIn) return auth.isEmployer ? '/employer' : '/employee'
  if (to.meta.role === 'employer' && !auth.isEmployer) return '/employee'
  if (to.meta.role === 'employee' && !auth.isEmployee) return '/employer'
})
export default router