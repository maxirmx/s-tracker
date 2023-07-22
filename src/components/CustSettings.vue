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

const props = defineProps({
  register: {
    type: Boolean,
    required: true
  }
})

const firstName = ref('Петров')
const lastName = ref('Михаил')
const patronymic = ref('Иванович')
const email = ref('petrov@example.com')
const password = ref('пароль')
const showPassword = ref(false)
const showPassword2 = ref(false)

function isRegister() {
  return props.register
}

function getTitle() {
  return isRegister() ? 'Регистрация' : 'Настройки'
}

function getButton() {
  return isRegister() ? 'Зарегистрироваться' : 'Сохранить'
}
</script>

<template>
  <div class="settings">
    <h1 class="title orange">{{ getTitle() }}</h1>
    <div class="form-group">
      <label for="firstName" class="label">Фамилия:</label>
      <input v-model="firstName" class="input" id="firstName" placeholder="Введите фамилию" />
    </div>
    <div class="form-group">
      <label for="lastName" class="label">Имя:</label>
      <input v-model="lastName" class="input" id="lastName" placeholder="Введите имя" />
    </div>
    <div class="form-group">
      <label for="patronymic" class="label">Отчество:</label>
      <input v-model="patronymic" class="input" id="patronymic" placeholder="Введите отчество" />
    </div>
    <div class="form-group">
      <label for="email" class="label">Адрес электронной почты:</label>
      <input
        v-model="email"
        class="input"
        id="email"
        placeholder="Введите адрес электронной почты"
      />
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
      <button class="button button-s" @click="showPassword = !showPassword">
        <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
      </button>
    </div>
    <div class="form-group">
      <label for="password" class="label">Пароль ещё раз:</label>
      <input
        :type="showPassword2 ? 'text' : 'password'"
        v-model="password"
        placeholder="Пароль ещё раз"
        class="input password"
        id="password2"
      />
      <button class="button button-s" @click="showPassword2 = !showPassword2">
        <i :class="showPassword2 ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
      </button>
    </div>
    <div v-if="!isRegister()" class="form-group">
      <label for="organization" class="label">Ваша организация:</label>
      <span id="organization"><em>ООО "Братан-Турбодизель"</em>.</span>
    </div>
    <button class="button">{{ getButton() }}</button>
  </div>
</template>

<style></style>
