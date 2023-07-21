<script setup>
import HistoryItem from './HistoryItem.vue'
import { status } from '../status.js'
</script>

<template>
  <h1 class="orange">История отправления {{ $route.params.number }}</h1>

  <HistoryItem>
    <template #icon>
      <component :is="status.getIcon(6)"></component>
    </template>
    <template #heading> {{ status.getName(6) }} </template>
    21/07/2023&nbsp;&nbsp;&nbsp;Опочка, РФ
  </HistoryItem>

  <HistoryItem>
    <template #icon>
      <component :is="status.getIcon(3)"></component>
    </template>
    <template #heading> {{ status.getName(3) }} </template>
    21/07/2023&nbsp;&nbsp;&nbsp;Псков, РФ
  </HistoryItem>

  <HistoryItem>
    <template #icon>
      <component :is="status.getIcon(2)"></component>
    </template>
    <template #heading> {{ status.getName(2) }} </template>
    20/07/2023&nbsp;&nbsp;&nbsp;Псков, РФ
  </HistoryItem>

  <HistoryItem>
    <template #icon>
      <component :is="status.getIcon(5)"></component>
    </template>
    <template #heading> {{ status.getName(5) }} </template>
    19/07/2023&nbsp;&nbsp;&nbsp;Новороссийск, РФ
  </HistoryItem>

  <HistoryItem>
    <template #icon>
      <component :is="status.getIcon(4)"></component>
    </template>
    <template #heading> {{ status.getName(4) }} </template>
    16/07/2023&nbsp;&nbsp;&nbsp;Новороссийск, РФ
  </HistoryItem>

  <HistoryItem>
    <template #icon>
      <component :is="status.getIcon(3)"></component>
    </template>
    <template #heading> {{ status.getName(3) }} </template>
    14/07/2023&nbsp;&nbsp;&nbsp;Newark, US
  </HistoryItem>

  <HistoryItem>
    <template #icon>
      <component :is="status.getIcon(5)"></component>
    </template>
    <template #heading> {{ status.getName(5) }} </template>
    14/07/2023&nbsp;&nbsp;&nbsp;Newark, US
  </HistoryItem>

  <HistoryItem>
    <template #icon>
      <component :is="status.getIcon(4)"></component>
    </template>
    <template #heading> {{ status.getName(4) }} </template>
    11/07/2023&nbsp;&nbsp;&nbsp;Newark, US
  </HistoryItem>

  <HistoryItem>
    <template #icon>
      <component :is="status.getIcon(2)"></component>
    </template>
    <template #heading> {{ status.getName(2) }} </template>
    11/07/2023&nbsp;&nbsp;&nbsp;Newark, US
  </HistoryItem>

  <HistoryItem>
    <template #icon>
      <component :is="status.getIcon(3)"></component>
    </template>
    <template #heading> {{ status.getName(3) }} </template>
    11/07/2023&nbsp;&nbsp;&nbsp;Buffalo, US
  </HistoryItem>

  <HistoryItem>
    <template #icon>
      <component :is="status.getIcon(2)"></component>
    </template>
    <template #heading> {{ status.getName(2) }} </template>
    11/07/2023&nbsp;&nbsp;&nbsp;Buffalo, US
  </HistoryItem>

  <HistoryItem>
    <template #icon>
      <component :is="status.getIcon(1)"></component>
    </template>
    <template #heading> {{ status.getName(1) }} </template>
    11/07/2023&nbsp;&nbsp;&nbsp;Montreal, CA
  </HistoryItem>

  <HistoryItem>
    <template #icon>
      <component :is="status.getIcon(0)"></component>
    </template>
    <template #heading> {{ status.getName(0) }} </template>
    10/07/2023&nbsp;&nbsp;&nbsp;Montreal, CA
  </HistoryItem>
</template>
