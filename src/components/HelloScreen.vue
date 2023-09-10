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

import { version } from '@/../package'
import { useAuthStore } from '@/stores/auth.store.js'

defineProps({
  appName: {
    type: String,
    required: true
  }
})

const authStore = useAuthStore()
</script>

<template>
  <div class="greetings">
    <h1 class="orange">{{ appName }}</h1>
    <div class="orange customer" v-if="authStore.user">
      {{ authStore.user.lastName }} {{ authStore.user.firstName }} {{ authStore.user.patronimic }}
    </div>
    <img alt="Сargo Management" class="logo" src="@/assets/logo.svg" width="250" height="125" />
    <div class="orange version">{{ version }}</div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.2rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

.version {
  font-size: 1rem;
  text-align: center;
}

.customer {
  font-size: 1.5 rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  text-align: center;
}

@media (min-width: 768px) {
  h1 {
    font-size: 2.6rem;
  }
}

@media (min-width: 1400px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }

  .version {
    text-align: left;
  }
  .customer {
    text-align: left;
  }
}
</style>
