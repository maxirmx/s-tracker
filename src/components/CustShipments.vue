<script>
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
import { statuses } from '@/helpers/statuses.js'

export default {
  components: {
    VDataTable
  },
  methods: {
    getStatus(item) {
      var statusCode = item['selectable']['statusCode']
      return statuses.getName(statusCode)
    },
    viewHistory(item) {
      var number = item['selectable']['number']
      router.push('shipment/' + number)
    }
  },

  data() {
    return {
      itemsPerPage: 5,
      headers: [
        { title: 'Номер', align: 'start', key: 'number' },
        { title: 'Место', align: 'center', key: 'location' },
        { title: 'Статус', align: 'center', key: 'statuses' },
        { title: 'Дата', align: 'center', key: 'date' },
        { title: '', align: 'center', key: 'actions', sortable: 'false' }
      ],
      shipments: [
        {
          number: '1234A1',
          location: 'Kuala Lumpur, ML',
          statusCode: 1,
          date: '12/07/2023'
        },
        {
          number: '2234A1',
          location: 'Тикси, РФ',
          statusCode: 0,
          date: '14/07/2023'
        },
        {
          number: '2274A1',
          location: 'Струги Красные, РФ',
          statusCode: 3,
          date: '15/07/2023'
        },
        {
          number: '2274A4',
          location: 'Лесосибирск, РФ',
          statusCode: 6,
          date: '15/07/2023'
        }
      ]
    }
  }
}
</script>

<template>
  <h1 class="title orange">Отправления</h1>
  <v-data-table
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="shipments"
    item-value="name"
    class="elevation-1"
  >
    <template v-slot:[`item.statuses`]="{ item }">
      {{ getStatus(item) }}
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-icon size="small" class="fa fa-eye" @click="viewHistory(item)"> </v-icon>
    </template>
  </v-data-table>
</template>
