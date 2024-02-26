// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/',
        name: 'admin',
        component: () => import('@/views/login.vue'),
      },
      {
        path: '/admin/dashboard',
        name: 'dashboard',
        component: () => import('@/views/inicialSystem.vue'),
      },
      {
        path: '/admin/relatories',
        name: 'Relatories',
        component: () => import('@/views/formView.vue'),
      },
      {
        path: '/admin/individual',
        name: 'Individual Relatory',
        component: () => import('@/views/individualRelatory.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
