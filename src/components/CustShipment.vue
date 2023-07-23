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
import { shipment } from '@/stores/demo.shipment.js'

import { useAuthStore } from '@/stores/auth.store.js'
const authStore = useAuthStore()
</script>

<template>
  <h1 class="orange btn-wrapper">
    <span>История отправления {{ $route.params.number }}</span>
    <button @click="$router.push('/shipments')" class="btn fa fa-eye-slash"></button>
  </h1>
  <hr class="hr" />
  <HistoryItem v-for="item in shipment.history" :key="item">
    <template #icon>
      <component :is="statuses.getIcon(item.status)"></component>
    </template>
    <template #heading> {{ statuses.getName(item.status) }} </template>

    <span class="btn-wrapper">
      {{ item.date }}&nbsp;&nbsp;&nbsp;{{ item.location }}
      <h3 v-if="authStore.user.isManager">
        <button @click="$router.push('/shipments')" class="anti-btn fa fa-trash"></button>
        <button @click="$router.push('/shipments')" class="anti-btn fa fa-pen"></button>
      </h3>
    </span>
  </HistoryItem>
</template>

<style></style>
