<script setup>
import { RouterLink, RouterView } from 'vue-router'
import router from './router'
import HelloScreen from './components/HelloScreen.vue'
import { state } from './auth.js'

function deauth() {
  state.deauthorize()
  router.push('')
}

deauth()

</script>

<template>
  <header>
    <div class="wrapper">
      <HelloScreen msg="Личный кабинет" width="250"/>
      <img alt="Сargo Management" class="logo" src="@/assets/logo.svg" width="250" height="125" />

      <nav v-if="state.authorized" width="250">
        <RouterLink to="/shipments" class="link">Отправления</RouterLink>
        <RouterLink to="/settings" class="link">Настройки</RouterLink>
        <RouterLink to="/" custom v-slot="{ href }">
          <a :href="href" @click="deauth()" class="link">Выход</a>
        </RouterLink>
      </nav>
      <nav v-if="!state.authorized" width="250">
        <RouterLink to="/" class="link">Вход</RouterLink>
        <RouterLink to="/register" class="link">Регистрация</RouterLink>
        <RouterLink to="/recover" class="link">Восстановление пароля</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
