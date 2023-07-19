import { createRouter, createWebHistory } from 'vue-router'
import ShipmentsView from '../views/ShipmentsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shipments',
      component: ShipmentsView
    },
    {
      path: '/settings',
      name: 'Настройки',
      // route level code-splitting
      // this generates a separate chunk (Settings.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SettingsView.vue')
    }
  ]
})

export default router
