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
import { storeToRefs } from 'pinia';
import { Form, Field } from 'vee-validate'
import * as Yup from 'yup'
//import router from '@/router'
import { useUsersStore } from '@/stores/users.store.js'
import { organizations } from '@/stores/demo.orgs.js'

const props = defineProps({
  register: {
    type: Boolean,
    required: true
  },
  id: {
    type: Number,
    required: false
  }
})

const schema = Yup.object().shape({
  firstName: Yup.string()
    .required('Необходимо указать имя'),
  lastName: Yup.string()
    .required('Необходимо указать фамилию'),
  patronimic: Yup.string(),
  email: Yup.string()
    .required('Необходимо указать электронную почту')
    .email('Неверный формат электронной почты'),
  password: Yup.string()
    // password optional in edit mode
    .concat(isRegister() ? Yup.string().required('Необходимо указать парoль') : null )
    .min(4, 'Пароль не может быть короче 4 симоволов'),
  password2: Yup.string()
    .concat(isRegister() ? Yup.string().required('Необходимо подтвердить пароль') : null )
    .concat(isRegister() ? Yup.string().oneOf([Yup.ref('password')], 'Пароли должны совпадать') : null )
})


function onSubmit(values /*, { setErrors } */) {
  console.log('Такой будет пользователь: ' + JSON.stringify(values))
}

const showPassword = ref(false);
const showPassword2 = ref(false);

const usersStore = useUsersStore();
let user = null;
let org = null;

if (!isRegister()) {
  ({ user } = storeToRefs(usersStore));
  usersStore.getById(props.id);
}

function isRegister() {
  return props.register
}

function getTitle() {
  return isRegister() ? 'Регистрация' : 'Настройки'
}

function getButton() {
  return isRegister() ? 'Зарегистрироваться' : 'Сохранить'
}

function getOrg() {
  if (user) {
    org = organizations.find((org) => org.id === user.value.organization)
  }
  return org ? org.name : null
}

function getCredentials() {
  let crd = null
  if (user) {
    crd = 'Пользователь'
    if (user.value.isManager) {
      crd += '; менеджер'
    }
    if (user.value.isAdmin) {
      crd += '; aдминистратор'
    }
    crd += '.'
  }
  return crd
}

</script>

<template>
<h1 class="orange">{{ getTitle() }}</h1>
<hr class="hr" />
  <div class="settings">
    <Form @submit="onSubmit" :initial-values="user" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
      <div class="form-group">
        <label for="lastName" class="label">Фамилия:</label>
        <Field
          name="lastName"
          type="text"
          class="form-control input"
          :class="{ 'is-invalid': errors.lastName }"
          placeholder="Фамилия"
        />
      </div>
    <div class="form-group">
        <label for="firstName" class="label">Имя:</label>
        <Field
          name="firstName"
          type="text"
          class="form-control input"
          :class="{ 'is-invalid': errors.firstName }"
          placeholder="Имя"
        />
      </div>
    <div class="form-group">
        <label for="patronimic" class="label">Отчество:</label>
        <Field
          name="patronimic"
          type="text"
          class="form-control input"
          :class="{ 'is-invalid': errors.patronimic }"
          placeholder="Отчество"
        />
      </div>
    <div class="form-group">
        <label for="email" class="label">Адрес электронной почты:</label>
        <Field
          name="email"
          type="text"
          class="form-control input"
          :class="{ 'is-invalid': errors.email }"
          placeholder="Адрес электронной почты"
        />
      </div>
      <div class="form-group">
        <label for="password" class="label">Пароль:</label>
        <Field
          name="password"
          ref="password"
          :type="showPassword ? 'text' : 'password'"
          class="form-control input password"
          :class="{ 'is-invalid': errors.password }"
          placeholder="Пароль"
        />
        <button
          @click="
            (event) => {
              event.preventDefault()
              showPassword = !showPassword
            }
          "
          :class="showPassword ? 'button button-s fa fa-eye-slash' : 'button button-s fa fa-eye'"
        ></button>
      </div>
      <div class="form-group">
        <label for="password2" class="label">Пароль ещё раз:</label>
        <Field
          name="password2"
          :type="showPassword2 ? 'text' : 'password'"
          class="form-control input password"
          :class="{ 'is-invalid': errors.password2 }"
          placeholder="Пароль"
        />
        <button
          @click="
            (event) => {
              event.preventDefault()
              showPassword2 = !showPassword2
            }
          "
          :class="showPassword2 ? 'button button-s fa fa-eye-slash' : 'button button-s fa fa-eye'"
        ></button>
      </div>
    <div v-if="getOrg()" class="form-group">
      <label for="organization" class="label">Организация:</label>
      <span id="organization"><em>{{ getOrg() }}</em></span>
    </div>
    <div v-if="getCredentials()" class="form-group">
      <label for="сredentials" class="label">Права:</label>
      <span id="сredentials"><em>{{ getCredentials() }}</em></span>
    </div>
    <div class="form-group">
        <button class="button" :disabled="isSubmitting">
          <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
          {{ getButton() }}
        </button>
      </div>
      <div v-if="errors.lastName" class="alert alert-danger mt-3 mb-0">{{ errors.lastName }}</div>
      <div v-if="errors.firstName" class="alert alert-danger mt-3 mb-0">{{ errors.firstName }}</div>
      <div v-if="errors.patronimic" class="alert alert-danger mt-3 mb-0">{{ errors.patronimic }}</div>
      <div v-if="errors.email" class="alert alert-danger mt-3 mb-0">{{ errors.email }}</div>
      <div v-if="errors.password" class="alert alert-danger mt-3 mb-0">{{ errors.password }}</div>
      <div v-if="errors.password2" class="alert alert-danger mt-3 mb-0">{{ errors.password2 }}</div>
      <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">{{ errors.apiError }}</div>

    </Form>
  </div>
  <div v-if="user?.loading" class="text-center m-5">
      <span class="spinner-border spinner-border-lg align-center"></span>
  </div>
  <div v-if="user?.error" class="text-center m-5">
      <div class="text-danger">Error loading user: {{user.error}}</div>
  </div>
</template>
