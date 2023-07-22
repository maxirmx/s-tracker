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

<script setup>

import HistoryItem from '@/components/HistoryItem.vue'
import { statuses } from '@/helpers/statuses.js'
</script>

<template>
  <h1 class="orange">История отправления {{ $route.params.number }}</h1>

  <HistoryItem>
    <template #icon>
      <component :is="statuses.getIcon(statuses.DELIVERED)"></component>
    </template>
    <template #heading> {{ statuses.getName(statuses.DELIVERED) }} </template>
    21/07/2023&nbsp;&nbsp;&nbsp;Опочка, РФ
  </HistoryItem>

  <HistoryItem>
    <template #icon>
      <component :is="statuses.getIcon(statuses.OUT_OF_STORAGE)"></component>
    </template>
    <template #heading> {{ statuses.getName(statuses.OUT_OF_STORAGE) }} </template>
    21/07/2023&nbsp;&nbsp;&nbsp;Псков, РФ
  </HistoryItem>

  <HistoryItem>
    <template #icon>
      <component :is="statuses.getIcon(statuses.IN_STORAGE)"></component>
    </template>
    <template #heading> {{ statuses.getName(statuses.IN_STORAGE) }} </template>
    20/07/2023&nbsp;&nbsp;&nbsp;Псков, РФ
  </HistoryItem>

  <HistoryItem>
    <template #icon>
      <component :is="statuses.getIcon(statuses.CUSTOMS_END)"></component>
    </template>
    <template #heading> {{ statuses.getName(statuses.CUSTOMS_END) }} </template>
    19/07/2023&nbsp;&nbsp;&nbsp;Новороссийск, РФ
  </HistoryItem>

  <HistoryItem>
    <template #icon>
      <component :is="statuses.getIcon(statuses.CUSTOMS_START)"></component>
    </template>
    <template #heading> {{ statuses.getName(statuses.CUSTOMS_START) }} </template>
    16/07/2023&nbsp;&nbsp;&nbsp;Новороссийск, РФ
  </HistoryItem>

  <HistoryItem>
    <template #icon>
      <component :is="statuses.getIcon(statuses.OUT_OF_STORAGE)"></component>
    </template>
    <template #heading> {{ statuses.getName(statuses.OUT_OF_STORAGE) }} </template>
    14/07/2023&nbsp;&nbsp;&nbsp;Newark, US
  </HistoryItem>

  <HistoryItem>
    <template #icon>
      <component :is="statuses.getIcon(statuses.CUSTOMS_END)"></component>
    </template>
    <template #heading> {{ statuses.getName(statuses.CUSTOMS_END) }} </template>
    14/07/2023&nbsp;&nbsp;&nbsp;Newark, US
  </HistoryItem>

  <HistoryItem>
    <template #icon>
      <component :is="statuses.getIcon(statuses.CUSTOMS_START)"></component>
    </template>
    <template #heading> {{ statuses.getName(statuses.CUSTOMS_START) }} </template>
    11/07/2023&nbsp;&nbsp;&nbsp;Newark, US
  </HistoryItem>

  <HistoryItem>
    <template #icon>
      <component :is="statuses.getIcon(statuses.IN_STORAGE)"></component>
    </template>
    <template #heading> {{ statuses.getName(statuses.IN_STORAGE) }} </template>
    11/07/2023&nbsp;&nbsp;&nbsp;Newark, US
  </HistoryItem>

  <HistoryItem>
    <template #icon>
      <component :is="statuses.getIcon(statuses.OUT_OF_STORAGE)"></component>
    </template>
    <template #heading> {{ statuses.getName(statuses.OUT_OF_STORAGE) }} </template>
    11/07/2023&nbsp;&nbsp;&nbsp;Buffalo, US
  </HistoryItem>

  <HistoryItem>
    <template #icon>
      <component :is="statuses.getIcon(statuses.IN_STORAGE)"></component>
    </template>
    <template #heading> {{ statuses.getName(statuses.IN_STORAGE) }} </template>
    11/07/2023&nbsp;&nbsp;&nbsp;Buffalo, US
  </HistoryItem>

  <HistoryItem>
    <template #icon>
      <component :is="statuses.getIcon(statuses.COLLECTED)"></component>
    </template>
    <template #heading> {{ statuses.getName(statuses.COLLECTED) }} </template>
    11/07/2023&nbsp;&nbsp;&nbsp;Montreal, CA
  </HistoryItem>

  <HistoryItem>
    <template #icon>
      <component :is="statuses.getIcon(statuses.REGISTERED)"></component>
    </template>
    <template #heading> {{ statuses.getName(statuses.REGISTERED) }} </template>
    10/07/2023&nbsp;&nbsp;&nbsp;Montreal, CA
  </HistoryItem>
</template>
