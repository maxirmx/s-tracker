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

import '@fortawesome/fontawesome-free/css/all.css'

import { storeToRefs } from 'pinia'
import moment from 'moment'

import HistoryItem from '@/components/HistoryItem.vue'
import { statuses, stcodes } from '@/helpers/statuses.js'
import DeliveryTimeIcon from '@/components/icons/IconDeliveryTime.vue'

import { useAuthStore } from '@/stores/auth.store.js'
const authStore = useAuthStore()

const props = defineProps({
  shipmentNumber: {
    type: String,
    required: true
  }
})

import { useShipmentsStore } from '@/stores/shipments.store.js'
const shipmentStore = useShipmentsStore()
const { shipment } = storeToRefs(shipmentStore)
shipmentStore.getByNumber(props.shipmentNumber)

import { useHistoryStore } from '@/stores/history.store.js'
const historyStore = useHistoryStore()
const { history } = storeToRefs(historyStore)

historyStore.getByNumber(props.shipmentNumber)
</script>

<template>
  <h1 class="orange btn-wrapper">
    <span>История отправления {{ props.shipmentNumber }}</span>
    <button @click="$router.push('/shipments')">
      <font-awesome-icon size="1x" icon="fa-solid fa-arrow-right-from-bracket" class="btn" />
    </button>
  </h1>
  <div class="orange customer" v-if="authStore.user?.isManager">
    Клиент: {{ shipment.name }}
  </div>
  <hr class="hr" />
  <div class="wrapper" v-if="authStore.user?.isManager">
    <router-link
      v-if="shipment.status != stcodes.DELIVERED"
      :to="'/status/add/' + props.shipmentNumber"
      class="link"
    >
      <font-awesome-icon size="1x" icon="fa-solid fa-calendar-plus" class="link" />
      Добавить новый статус
    </router-link>
    &nbsp;&nbsp;&nbsp;
    <router-link :to="'/status/edit/' + shipment.statusId + '/' + props.shipmentNumber" class="link"
      ><font-awesome-icon size="1x" icon="fa-solid fa-pen-to-square" class="link" /> Изменить
      последний статус</router-link
    >
  </div>
  <br /><br />

  <div v-if="shipment.status != stcodes.DELIVERED">
    <HistoryItem>
      <template #icon>
        <component :is="DeliveryTimeIcon"></component>
      </template>
      <template #heading> Ожидаемая дата прибытия в пункт назначения</template>
      {{
        shipment.ddate ? moment(shipment.ddate, 'YYYY-MM-DD').format('DD.MM.YYYY') : ''
      }}&nbsp;&nbsp;&nbsp;{{ shipment.dest }}
    </HistoryItem>
    <hr class="hr-light" />
  </div>
  <HistoryItem v-for="item in history" :key="item">
    <template #icon>
      <component :is="statuses.getIcon(item.status)"></component>
    </template>
    <template #heading> {{ statuses.getName(item.status) }} </template>
    {{ item.date ? moment(item.date, 'YYYY-MM-DD').format('DD.MM.YYYY') : '' }}&nbsp;&nbsp;&nbsp;{{
      item.location
    }}
    <br />
    <span v-if="item.comment">{{ item.comment }}</span>
  </HistoryItem>
  <div v-if="history?.loading || shipment?.loading" class="text-center m-5">
    <span class="spinner-border spinner-border-lg align-center"></span>
  </div>
  <div v-if="history?.error" class="text-center m-5">
    <div class="text-danger">Ошибка при загрузке истории отправления: {{ history.error }}</div>
  </div>
  <div v-if="shipment?.error" class="text-center m-5">
    <div class="text-danger">
      Ошибка при загрузке информации об отправлении: {{ shipment.error }}
    </div>
  </div>
</template>

<style>
.customer {
  font-size: 1.5 rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
}
</style>
