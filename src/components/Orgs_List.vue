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

import { ref } from 'vue'

import { VDataTable } from 'vuetify/lib/labs/components.mjs'

import router from '@/router'
import { storeToRefs } from 'pinia'
import { useOrgsStore } from '@/stores/orgs.store.js'
import { itemsPerPageOptions } from '@/helpers/items.per.page.js'
import { mdiMagnify } from '@mdi/js'

const orgsStore = useOrgsStore()
const { orgs } = storeToRefs(orgsStore)
orgsStore.getAll()

function orgSettings(item) {
  var id = item['selectable']['id']
  router.push('org/edit/' + id)
}

const itemsPerPage = ref(10)
const search = ref('')
const headers = [
  { title: 'Организация', align: 'start', key: 'name', sortable: true },
  { title: '', align: 'center', key: 'actions', sortable: false }
]
</script>

<template>
  <div class="settings">
    <h1 class="orange">Организации</h1>
    <hr class="hr" />

    <div class="wrapper">
      <router-link to="/org/add" class="link"
        ><font-awesome-icon
          size="1x"
          icon="fa-solid fa-house-chimney-medical"
          class="link"
        />&nbsp;&nbsp;&nbsp;Зарегистрировать организацию
      </router-link>
    </div>

    <v-card>
      <v-data-table
        v-if="orgs?.length"
        v-model:items-per-page="itemsPerPage"
        items-per-page-text="Организаций на странице"
        page-text="{0}-{1} из {2}"
        :items-per-page-options="itemsPerPageOptions"
        :headers="headers"
        :items="orgs"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <font-awesome-icon
            size="1x"
            icon="fa-solid fa-pen"
            class="anti-btn"
            @click="orgSettings(item)"
          />
        </template>
      </v-data-table>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        :append-inner-icon="mdiMagnify"
        label="Поиск по названию организации"
        variant="solo"
        hide-details
      ></v-text-field>
    </v-card>
    <div v-if="orgs?.error" class="text-center m-5">
      <div class="text-danger">Ошибка при загрузке списка организаций: {{ orgs.error }}</div>
    </div>
    <div v-if="orgs?.loading" class="text-center m-5">
      <span class="spinner-border spinner-border-lg align-center"></span>
    </div>
  </div>
</template>
