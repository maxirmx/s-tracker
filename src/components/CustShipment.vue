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

import HistoryItem from '@/components/HistoryItem.vue'
import { statuses } from '@/helpers/statuses.js'
import { stcodes } from '@/helpers/statuses.js'
import { shipments } from '@/stores/demo.shipments.js'
import { shipment } from '@/stores/demo.shipment.js'
import DeliveryTimeIcon from '@/components/icons/IconDeliveryTime.vue'

import { useAuthStore } from '@/stores/auth.store.js'
const authStore = useAuthStore()

const props = defineProps({
  shipmentNumber: {
    type: String,
    required: true
  }
})

const shp = shipments.items.find((x) => x.shipmentNumber === props.shipmentNumber)
const history = shipment.history.filter(function (historyItem) {
  return historyItem.shipmentNumber === props.shipmentNumber
})
const lastStatus = history.reduce((last, status) => (last.id > status.id ? last : status))
</script>

<template>
  <h1 class="orange btn-wrapper">
    <span>История отправления {{ props.shipmentNumber }}</span>
    <button @click="$router.push('/shipments')">
      <font-awesome-icon size="1x" icon="fa-solid fa-arrow-right-from-bracket" class="btn" />
    </button>
  </h1>
  <hr class="hr" />
  <div class="wrapper" v-if="authStore.user.isManager">
    <router-link
      v-if="lastStatus.status != stcodes.DELIVERED"
      :to="'/status/add/' + props.shipmentNumber"
      class="link"
    >
      <font-awesome-icon size="1x" icon="fa-solid fa-calendar-plus" class="link" /> Добавить новый
      статус
    </router-link>
    &nbsp;&nbsp;&nbsp;
    <router-link :to="'/status/edit/' + lastStatus.id" class="link"
      ><font-awesome-icon size="1x" icon="fa-solid fa-pen-to-square" class="link" /> Изменить
      последний статус</router-link
    >
  </div>
  <br /><br />

  <div v-if="lastStatus.status != stcodes.DELIVERED">
    <HistoryItem>
      <template #icon>
        <component :is="DeliveryTimeIcon"></component>
      </template>
      <template #heading> Ожидаемая дата прибытия в пункт назначения</template>
      {{ shp.ddate }}&nbsp;&nbsp;&nbsp;{{ shp.dest }}
    </HistoryItem>
    <hr class="hr-light" />
  </div>
  <HistoryItem v-for="item in history" :key="item">
    <template #icon>
      <component :is="statuses.getIcon(item.status)"></component>
    </template>
    <template #heading> {{ statuses.getName(item.status) }} </template>
    {{ item.date }}&nbsp;&nbsp;&nbsp;{{ item.location }} <br />
    <span v-if="item.comment">{{ item.comment }}</span>
  </HistoryItem>
</template>

<style></style>
