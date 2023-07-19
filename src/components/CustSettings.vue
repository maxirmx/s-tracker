<script setup>
import { ref } from 'vue'

defineProps({
  title: {
    type: String,
    required: true
  },
  button: {
    type: String,
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
</script>

<template>
  <div class="settings">
    <h1 class="title orange">{{ title }}</h1>
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
    <button class="button">{{ button }}</button>
  </div>
</template>

<style></style>
