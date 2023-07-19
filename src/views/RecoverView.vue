<template>
  <div class="settings">
    <h1 class="title orange">Восстановление пароля</h1>
    <div class="form-group">
      <label for="email" class="label">Адрес электронной почты:</label>
      <input v-model="email" class="input" id="email" placeholder="Адрес электронной почты">
    </div>
    <button class="button" @click="state.authorize()">Выслать ссылку</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { state } from '../auth.js'

const email = ref('')
</script>

<style>

</style>
