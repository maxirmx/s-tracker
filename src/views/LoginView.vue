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
      <button class="button button-s" @click="showPassword = !showPassword">
        <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
      </button>
    </div>
    <button
      class="button"
      @click="state.authorize();$router.push('shipments')"
    >
      Войти
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { state } from '../auth.js'

const showPassword = ref(false)
const email = ref('')
const password = ref('')
</script>

<style></style>
