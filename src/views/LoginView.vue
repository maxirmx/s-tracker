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
import router from '../router'
import { useAuthStore } from '@/stores/auth.store.js'

const showPassword = ref(false)
const email = ref('')
const password = ref('')
const errors = ref({})

function setErrors(err) {
  errors.value = err
  console.log(err)
}

function authorize() {
  const authStore = useAuthStore()
  authStore
    .login(email.value, password.value)
    .then(() => {
      router.push('/shipments')
    })
    .catch((error) => setErrors({ apiError: error }))
}
</script>

<template>
  <div class="settings">
    <h1 class="title orange">Вход</h1>
    <div class="form-group">
      <label for="email" class="label">Адрес электронной почты:</label>
      <input v-model="email" class="input" id="email" placeholder="Адрес электронной почты" />
    </div>
    <div class="form-group">
      <label for="password" class="label">Пароль:</label>
      <input
        :type="showPassword ? 'text' : 'password'"
        v-model="password"
        placeholder="Пароль"
        class="input password"
        id="password"
      />
      <button
        @click="showPassword = !showPassword"
        :class="showPassword ? 'button button-s fa fa-eye-slash' : 'button button-s fa fa-eye'"
      ></button>
    </div>
    <button class="button" @click="authorize()">Войти</button>
    <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">{{ errors.apiError }}</div>
  </div>
</template>
