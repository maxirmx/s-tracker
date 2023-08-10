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

import { VDataTable } from 'vuetify/lib/labs/components.mjs'
import router from '../router'

import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/stores/users.store.js'
import { organizations } from '@/stores/demo.orgs.js'

const usersStore = useUsersStore()
const { users } = storeToRefs(usersStore)
usersStore.getAll()

function userSettings(item) {
  var id = item['selectable']['id']
  router.push('settings/' + id)
}

function getOrg(item) {
  let org = null
  if (item) {
    org = organizations.find((org) => org.id === item['selectable']['organizationId'])
  }
  return org ? org.name : null
}

function getCredentials(item) {
  let crd = null
  if (item) {
    crd = 'Пользователь'
    if (item['selectable']['isManager']) {
      crd += '; менеджер'
    }
    if (item['selectable']['isAdmin']) {
      crd += '; aдминистратор'
    }
  }
  return crd
}

const itemsPerPage = 10

const headers = [
  { title: 'Пользователь', align: 'start', key: 'lastName', sortable: 'true' },
  { title: 'Организация', align: 'start', key: 'organizationId' },
  { title: 'Права', align: 'start', key: 'credentials', sortable: 'false' },
  { title: '', align: 'center', key: 'actions', sortable: 'false' }
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

    <v-data-table
      v-if="users?.length"
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="users"
      class="elevation-1"
    >
      <template v-slot:[`item.lastName`]="{ item }">
        {{ item['selectable']['lastName'] }} {{ item['selectable']['firstName'] }}
        {{ item['selectable']['patronimic'] }} ({{ item['selectable']['email'] }})
      </template>
      <template v-slot:[`item.organizationId`]="{ item }">
        {{ getOrg(item) }}
      </template>
      <template v-slot:[`item.credentials`]="{ item }">
        {{ getCredentials(item) }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <font-awesome-icon
          size="1x"
          icon="fa-solid fa-pen"
          class="anti-btn"
          @click="userSettings(item)"
        />
      </template>
    </v-data-table>
    <div v-if="users?.loading" class="text-center m-5">
      <span class="spinner-border spinner-border-lg align-center"></span>
    </div>
    <div v-if="users?.error" class="text-center m-5">
      <div class="text-danger">Error loading user: {{ users.error }}</div>
    </div>
  </div>
</template>
