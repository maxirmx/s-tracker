<script setup>
// Copyright (C) 2023 Maxim [maxirmx] Samsonov (www.sw.consulting)
// All rights reserved.
// This file is a part of s-tracker applcation
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:
// 1. Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
// 2. Redistributions in binary form must reproduce the above copyright
// notice, this list of conditions and the following disclaimer in the
// documentation and/or other materials provided with the distribution.
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

import { computed } from 'vue'
import { ref } from 'vue'

import { VDataTable } from 'vuetify/lib/labs/components.mjs'
import router from '@/router'

import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/stores/users.store.js'
import { useOrgsStore } from '@/stores/orgs.store.js'
import { itemsPerPageOptions } from '@/helpers/items.per.page.js'
import { mdiMagnify } from '@mdi/js'

const usersStore = useUsersStore()
const { users } = storeToRefs(usersStore)
usersStore.getAll()

const orgsStore = useOrgsStore()
const { orgs } = storeToRefs(orgsStore)
orgsStore.getAll()

function userSettings(item) {
  var id = item['id']
  router.push('user/edit/' + id)
}

function getOrg(item) {
  if (item['orgId'] == -1) {
    return ''
  }
  let org = computed(() => {
    let org = null
    if (!orgs.value.loading) {
      org = orgs.value.find((o) => o.id === item['orgId'])
    }
    return org ? org.name : 'загружается...'
  })
  return org.value
}

function getCredentials(item) {
  let crd = null
  if (item) {
    crd = 'Пользователь'
    if (item['isManager']) {
      crd += '; менеджер'
    }
    if (item['isAdmin']) {
      crd += '; aдминистратор'
    }
  }
  return crd
}

const itemsPerPage = ref(10)
const search = ref('')

function filterUsers(value, query, item) {
  if (query == null) return false
  const q = query.toLocaleUpperCase()
  const u = users.value.find((x) => x.id === item.id)
  if (
    u != null &&
    (u.lastName.toLocaleUpperCase().indexOf(q) !== -1 ||
      u.firstName.toLocaleUpperCase().indexOf(q) !== -1 ||
      u.patronimic.toLocaleUpperCase().indexOf(q) !== -1 ||
      u.email.toLocaleUpperCase().indexOf(q) !== -1)
  )
    return true
  const o = orgs.value.find((x) => x.id === item.orgId)
  return o != null && o.name.toLocaleUpperCase().indexOf(q) !== -1
}

const headers = [
  { title: 'Пользователь', align: 'start', key: 'id' },
  { title: 'Организация', align: 'start', key: 'orgId' },
  { title: 'Права', align: 'start', key: 'credentials', sortable: false },
  { title: '', align: 'center', key: 'actions', sortable: false }
]
</script>

<template>
  <div class="settings">
    <h1 class="orange">Пользователи</h1>
    <hr class="hr" />

    <div class="wrapper">
      <router-link to="/register" class="link"
        ><font-awesome-icon
          size="1x"
          icon="fa-solid fa-user-plus"
          class="link"
        />&nbsp;&nbsp;&nbsp;Зарегистрировать пользователя
      </router-link>
    </div>

    <v-card>
      <v-data-table
        v-if="users?.length"
        v-model:items-per-page="itemsPerPage"
        items-per-page-text="Пользователей на странице"
        :items-per-page-options="itemsPerPageOptions"
        page-text="{0}-{1} из {2}"
        :headers="headers"
        :items="users"
        :search="search"
        :custom-filter="filterUsers"
        item-value="name"
        class="elevation-1"
      >
        <template v-slot:[`item.id`]="{ item }">
          {{ item['selectable']['lastName'] }} {{ item['selectable']['firstName'] }} ({{
            item['selectable']['email']
          }})
        </template>
        <template v-slot:[`item.orgId`]="{ item }">
          {{ getOrg(item['selectable']) }}
        </template>
        <template v-slot:[`item.credentials`]="{ item }">
          {{ getCredentials(item['selectable']) }}
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <font-awesome-icon
            size="1x"
            icon="fa-solid fa-pen"
            class="anti-btn"
            @click="userSettings(item['selectable'])"
          />
        </template>
      </v-data-table>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        :append-inner-icon="mdiMagnify"
        label="Поиск по любой информации о пользователе"
        variant="solo"
        hide-details
      />
    </v-card>
    <div v-if="users?.loading" class="text-center m-5">
      <span class="spinner-border spinner-border-lg align-center"></span>
    </div>
    <div v-if="users?.error" class="text-center m-5">
      <div class="text-danger">Ошибка при загрузке списка пользователей: {{ users.error }}</div>
    </div>
  </div>
</template>
