<template>
  <h1 class="title orange">Отправления</h1>
  <v-data-table
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="shipments"
    item-value="name"
    class="elevation-1"
  >
    <template v-slot:[`item.status`]="{ item }">
      {{ getStatus(item) }}
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-icon size="small" class="fa fa-eye" @click="viewHistory(item)"> </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { VDataTable } from 'vuetify/lib/labs/components.mjs'
import router from '../router'
import { status } from '../status.js'

export default {
  components: {
    VDataTable
  },
  methods: {
    getStatus(item) {
      var statusCode = item['selectable']['statusCode']
      return status.getName(statusCode)
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
        { title: 'Статус', align: 'center', key: 'status' },
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
