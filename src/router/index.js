import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RecoverView from '../views/RecoverView.vue'
import RegisterView from '../views/RegisterView.vue'
import CustShipmentsView from '../views/ShipmentsView.vue'
import CustShipmentView from '../views/ShipmentView.vue'
import SettingsView from '../views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Вход',
      component: LoginView
    },
    {
      path: '/recover',
      name: 'Восстановление пароля',
      component: RecoverView
    },
    {
      path: '/register',
      name: 'Регистрация',
      component: RegisterView
    },
    {
      path: '/shipments',
      name: 'Отправления',
      component: CustShipmentsView
    },
    {
      path: '/shipment/:number',
      name: 'Отправлениe',
      component: CustShipmentView,
      props: true
    },
    {
      path: '/settings',
      name: 'Настройки',
      component: SettingsView
    }
  ]
})

export default router
