// Copyright (C) 2023 Maxim [maxirmx] Samsonov  (www.sw.consulting)
// All rights reserved.
// This file is a part of s-tracker applcation
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:
// 1. Redistributions of source code must retain the above copyright
//    notice, this list of conditions and the following disclaimer.
// 2. Redistributions in binary form must reproduce the above copyright
//    notice, this list of conditions and the following disclaimer in the
//    documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
//# ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
// TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
// PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDERS OR CONTRIBUTORS
// BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.

import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store.js'
import { useAlertStore } from '@/stores/alert.store.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Вход',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/recover',
      name: 'Восстановление пароля',
      component: () => import('@/views/User_RecoverView.vue'),
      props: true
    },
    {
      path: '/register',
      name: 'Регистрация',
      component: () => import('@/views/User_RegisterView.vue')
    },
    {
      path: '/users',
      name: 'Пользователи',
      component: () => import('@/views/Users_View.vue')
    },
    {
      path: '/user/edit/:id',
      name: 'Настройки',
      component: () => import('@/views/User_EditView.vue'),
      props: true
    },
    {
      path: '/orgs',
      name: 'Организации',
      component: () => import('@/views/Orgs_View.vue')
    },
    {
      path: '/org/add',
      name: 'Добавить организацию',
      component: () => import('@/views/Org_AddView.vue')
    },
    {
      path: '/org/edit/:orgId',
      name: 'Редактировать информацию об организации',
      component: () => import('@/views/Org_EditView.vue'),
      props: true
    },
    {
      path: '/status/add/:shipmentNumber',
      name: 'Добавить статус отправления',
      component: () => import('@/views/ShipmentStatus_AddView.vue'),
      props: true
    },
    {
      path: '/status/edit/:statusId/:shipmentNumber',
      name: 'Изменить статус отправления',
      component: () => import('@/views/ShipmentStatus_EditView.vue'),
      props: true
    },
    {
      path: '/shipments',
      name: 'Отправления',
      component: () => import('@/views/Shipments_View.vue')
    },
    {
      path: '/shipment/:shipmentNumber',
      name: 'Отправлениe',
      component: () => import('@/views/Shipment_View.vue'),
      props: true
    },
    {
      path: '/shipment/add',
      name: 'Добавить отправлениe',
      component: () => import('@/views/Shipment_AddView.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()
  const alert = useAlertStore()
  alert.clear()

  if (auth.re_jwt) {
    return auth
      .re()
      .then(() => {
        return auth.re_tgt == 'register' ? '/shipments/' : '/user/edit/' + auth.user.id
      })
      .catch((error) => {
        router.push('/login').then(() => {
          alert.error(
            auth.re_tgt === 'register'
              ? 'Не удалось завершить регистрацию. '
              : 'Не удалось восстановить пароль. ' + error
          )
        })
      })
  }
  const publicPages = ['/login', '/recover', '/register']
  const authRequired = !publicPages.includes(to.path)

  if (authRequired && !auth.user) {
    auth.returnUrl = to.fullPath
    return '/login'
  }

//  if (!authRequired && auth.user) {
//    return '/shipments'
//  }
})

export default router
