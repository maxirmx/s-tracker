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
// ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
// TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
// PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDERS OR CONTRIBUTORS
// BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.

import { defineStore } from 'pinia'
import { fetchWrapper } from '@/helpers/fetch.wrapper.js'
import { useAuthStore } from '@/stores/auth.store.js'

const baseUrl = `${import.meta.env.VITE_API_URL}/users`

export const useUsersStore = defineStore({
  id: 'users',
  state: () => ({
    users: {},
    user: {}
  }),
  actions: {
    async register(user) {
      await fetchWrapper.post(`${baseUrl}/register`, user)
    },
    async getAll() {
      this.users = { loading: true }
      try {
        this.users = await fetchWrapper.get(baseUrl)
      } catch (error) {
        this.users = { error }
      }
    },
    async getById(id) {
      this.user = { loading: true }
      try {
        this.user = await fetchWrapper.get(`${baseUrl}/${id}`)
      } catch (error) {
        this.user = { error }
      }
    },
    async update(id, params) {
      await fetchWrapper.put(`${baseUrl}/${id}`, params)

      // update stored user if the logged in user updated their own record
      const authStore = useAuthStore()
      if (id === authStore.user.id) {
        // update local storage
        const user = { ...authStore.user, ...params }
        localStorage.setItem('user', JSON.stringify(user))

        // update auth user in pinia state
        authStore.user = user
      }
    },
    async delete(id) {
      // add isDeleting prop to user being deleted
      this.users.find((x) => x.id === id).isDeleting = true

      await fetchWrapper.delete(`${baseUrl}/${id}`)

      // remove user from list after deleted
      this.users = this.users.filter((x) => x.id !== id)

      // auto logout if the logged in user deleted their own record
      const authStore = useAuthStore()
      if (id === authStore.user.id) {
        authStore.logout()
      }
    }
  }
})
